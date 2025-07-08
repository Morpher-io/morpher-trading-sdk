import {
  createTRPCClient,
  type TRPCClient,
  httpBatchLink,
} from "@trpc/client";
import type { AnyRouter } from "@trpc/server";
import { createClient } from 'graphql-ws'
import type { V2RouterDefinition, TMarketData, TMarketDetail } from "./v2.router";
import { TCurrencyList, TExchangeRate, TMarketType } from "./types";
import { erc20Abi, PublicClient, WalletClient } from "viem";
export type RouterDefinition = V2RouterDefinition;



let clientURLHttps = '';
let clientURLWs = '';
let rpcClient: TRPCClient<RouterDefinition>;

// const MARKET_SUBSCRIPTION = gql`
//   subscription updateMarket($event: String) {
//     updateMarket(event: $event)
//   }
// `;

let unsubscribeFromMarket: () => void;

export const trading = {
    tradeMarket: (market_id: string,)=> {
      console.log('execute trade', market_id)
    }
}

export type TTradeCallback = {
  result: 'success'| 'error'
  err: string
}

export async function executeTrade({walletClient, market_id, currency, callback, tradeAmount}: {walletClient: WalletClient, market_id: string, currency: string, tradeAmount: string, callback: (result: TTradeCallback) => {}})  {
  callback({result: 'error', err: 'No trade amount'})
}

export async function getCurrencyList({
  endpoint,
  address,
  publicClient,
  tokenAddresses,
}: {
  endpoint: string;
  address: `0x${string}`;
  publicClient: any;
  tokenAddresses: { symbol: string; address: `0x${string}` }[];
}) {
  if (!rpcClient) {
    rpcClient = createTradingClient(endpoint);
  }

  let client = publicClient as PublicClient;

  const exchangeRates = await rpcClient.getExchangeRates.query();
  let ethBalance = await client.getBalance({ address });

  let currencyList: {
    [symbol: string]: {
      symbol: string;
      balance?: bigint;
      usd?: number;
      decimals?: number;
    };
  } = {};

  currencyList = {
    ETH: {
      symbol: "ETH",
      balance: ethBalance,
      usd: ethBalance
        ? (Number(ethBalance) / 10 ** 18) * exchangeRates.eth_price
        : undefined,
      decimals: 18,
    },
  };

  for (var i = 0; i < tokenAddresses.length; i++) {
    const tokenAddress = tokenAddresses[i];
    const decimals = (await client.readContract({
      address: tokenAddress.address,
      abi: erc20Abi,
      functionName: "decimals",
    })) as number;

    const tokenBalance = await client.readContract({
      address: tokenAddress.address,
      abi: erc20Abi,
      functionName: "balanceOf",
      args: [address],
    });

    //  const balance = await publicClient.getL1TokenBalance({
    //   account:address,
    //   token: tokenAddress.address,
    // })
    currencyList[tokenAddress.symbol] = {
      symbol: tokenAddress.symbol,
      balance: tokenBalance,
      usd:
        tokenBalance &&
        (exchangeRates as any)[tokenAddress.symbol.toLowerCase() + "_price"]
          ? (Number(tokenBalance) / 10 ** decimals) *
            (exchangeRates as any)[tokenAddress.symbol.toLowerCase() + "_price"]
          : undefined,
      decimals: decimals,
    };
  }

  return currencyList;
}

export async function getMarketList({endpoint, type}: {endpoint: string, type?: TMarketType}) {
  if (!rpcClient) {
    rpcClient = createTradingClient(endpoint);
  }

  const result = await rpcClient.getMarketList.query({ type: type || 'stock' });
  return result.markets;

}

export async function getMarketData({endpoint, eth_address, market_id}: {endpoint: string, eth_address: `0x${string}` | undefined, market_id: string | undefined}) {
  if (!rpcClient) {
    rpcClient = createTradingClient(endpoint);
  }

  if (eth_address && market_id) {
    const result = await rpcClient.getMarketData.query({ eth_address, market_id });
    return result
  } else {
    return undefined
  }
  

}

export const usdFormatter = (input: any) =>{
  	const price = parseFloat(input || 0);

    return price.toFixed(2)
}
 export const tokenValueFormatter = (param: any) => {
	const price = parseFloat(param);
	const abs = Math.abs(price);
	let round = 0;
	if (10000 > abs && abs >= 10) round = 2;
	else if (10 > abs && abs >= 1) round = 3;
	else if (1 > abs && abs >= 0.1) round = 4;
	else if (0.1 > abs && abs >= 0.01) round = 5;
	else if (0.01 > abs && abs >= 0.001) round = 6;
	else if (0.001 > abs && abs >= 0.0001) round = 7;
	else if (0.0001 > abs && abs >= 0.00001) round = 8;
	else if (0.00001 > abs) round = 9;
	return price ? price.toFixed(round) : '0';
}

export function subscribeToMarket(market_id: string, callback: any) {
  const client = createClient({
    url: clientURLWs,
    retryAttempts: Infinity,
    shouldRetry: () => true,
    keepAlive: 10000,
  })

  if (unsubscribeFromMarket) {
    unsubscribeFromMarket()
  }

  unsubscribeFromMarket = client.subscribe(
      {

        query: `  subscription marketDataV2($market_id: String) {
          marketDataV2(market_id: $market_id)
        }`,
        variables: { market_id }
      },
      {
        next: (dat:any) => {
          callback(dat?.data?.marketDataV2)
        },
        error: (err) => {
          console.log('err', err)
        },
        complete: () => {

        },
      }
    )

}

export function createTradingClient<TRouter extends AnyRouter>(
  wsUrl: string,
): TRPCClient<TRouter> {
  if (!wsUrl || wsUrl.length < 5) {
    throw 'URL not specified'
  }
  if (wsUrl[wsUrl.length -1] !== '/') {
    wsUrl += '/'
  }
  if (!wsUrl.includes('/v2')) {
    wsUrl += 'v2/'
  }

  clientURLHttps = wsUrl

  clientURLWs = clientURLHttps.replace('http://', 'ws://').replace('https://', 'wss://').replace('/v2/', '/graphql')

  rpcClient = createTRPCClient<RouterDefinition>({
    links: [
     httpBatchLink({
        url: clientURLHttps
     }) as any,
    ],
  });
  return rpcClient;
}

