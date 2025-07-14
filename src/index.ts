import { createTRPCClient, type TRPCClient, httpBatchLink } from "@trpc/client";
import type { AnyRouter } from "@trpc/server";
import { createClient } from "graphql-ws";
import type {
  V2RouterDefinition,
  TMarketData,
  TMarketDetail,
} from "./v2.router";
import {
  ContractPosition,
  TAddress,
  TCurrencyList,
  TExchangeRate,
  TMarketType,
  TTradeCallback,
} from "./types";
import { Account, erc20Abi, PublicClient, WalletClient } from "viem";
import {
  checkBalance,
  formatError,
  formatPosition,
  sendCancelOrderDirect,
  sendCancelOrderGasless,
  sendCreateOrderDirect,
  sendCreateOrderGasless,
  sendCreateOrderGasToken,
  sendCreateOrderToken,
  sendCreateOrderTokenGasless,
  soliditySha3,
} from "./helpers";
import { morpherStateAbi } from "./abi";
export type TradeCallback = TTradeCallback;
export type MarketDetail = TMarketDetail;
export type TCurrency = "MPH" | "USDC" | "ETH";

export default class MorpherTradeSDK {
  private endpoint: string;
  private rpcClient?: TRPCClient<RouterDefinition>;
  private transactionNumber: number = 0;
  private stateAddress?: TAddress;
  private oracleAddress?: TAddress;
  public usdcAddress?: TAddress;
  public tokenAddress?: TAddress;
  private clientURLHttps = "";
  private clientURLWs = "";
  private bundler?: string;
  private paymaster?: string;
  public ready: boolean = false;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
    this.rpcClient = this.createTradingClient(this.endpoint);
    this.rpcClient.getConfig.query().then((config) => {
      this.stateAddress = config.stateAddress;
      this.oracleAddress = config.oracleAddress;
      this.usdcAddress = config.usdcAddress;
      this.tokenAddress = config.tokenAddress;
      this.bundler = config.bundler;
      this.paymaster = config.paymaster;
      this.ready = true;
    });
  }

  private createTradingClient<TRouter extends AnyRouter>(
    wsUrl: string
  ): TRPCClient<TRouter> {
    if (!wsUrl || wsUrl.length < 5) {
      throw "URL not specified";
    }
    if (wsUrl[wsUrl.length - 1] !== "/") {
      wsUrl += "/";
    }
    if (!wsUrl.includes("/v2")) {
      wsUrl += "v2/";
    }

    this.clientURLHttps = wsUrl;

    this.clientURLWs = this.clientURLHttps
      .replace("http://", "ws://")
      .replace("https://", "wss://")
      .replace("/v2/", "/graphql");

    const rpcClient = createTRPCClient<RouterDefinition>({
      links: [
        httpBatchLink({
          url: this.clientURLHttps,
        }) as any,
      ],
    });
    return rpcClient;
  }

  async getCurrencyList({
    address,
    publicClient,
    tokenAddresses,
  }: {
    address: `0x${string}`;
    publicClient: any;
    tokenAddresses: { symbol: string; address: `0x${string}` }[];
  }) {
    if (!this.rpcClient) {
      throw new Error("No RPC Client");
    }

    let client = publicClient as PublicClient;

    const exchangeRates = await this.rpcClient.getExchangeRates.query();
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
              (exchangeRates as any)[
                tokenAddress.symbol.toLowerCase() + "_price"
              ]
            : undefined,
        decimals: decimals,
      };
    }

    return currencyList;
  }

  async getMarketList({ type }: { type?: TMarketType }) {
    if (!this.rpcClient) {
      throw new Error("No RPC Client");
    }

    const result = await this.rpcClient.getMarketList.query({
      type: type || "stock",
    });
    return result.markets;
  }

  async getMarketData({
    eth_address,
    market_id,
  }: {
    eth_address: `0x${string}` | undefined;
    market_id: string | undefined;
  }) {
    if (!this.rpcClient) {
      throw new Error("No RPC Client");
    }

    if (eth_address && market_id) {
      const result = await this.rpcClient.getMarketData.query({
        eth_address,
        market_id,
      });
      return result;
    } else {
      return undefined;
    }
  }

  async getOrders({
    eth_address,
    tx_hash,
    order_id,
    market_id,
  }: {
    eth_address: TAddress;
    tx_hash?: string;
    order_id?: string;
    market_id?: string;
  }) {
    if (!this.rpcClient) {
      throw new Error("No RPC Client");
    }

    const result = await this.rpcClient.getOrders.query({
      eth_address,
      tx_hash,
      order_id,
      market_id,
    });
    return result;
  }

  async getPortfolio({
    eth_address,
  }: {
    eth_address: TAddress;
  }) {
    if (!this.rpcClient) {
      throw new Error("No RPC Client");
    }

    const result = await this.rpcClient.getPortfolio.query({
      eth_address,
    });
    return result;
  }

  async getPositions({
    eth_address,
    market_id,
    position_id,
  }: {
    eth_address: TAddress;
    market_id?: string;
    position_id?: string;
  }) {
    if (!this.rpcClient) {
      throw new Error("No RPC Client");
    }

    const result = await this.rpcClient.getPositions.query({
      eth_address,
      market_id,
      position_id,
    });
    return result;
  }

  private unsubscribeFromMarket?: () => void;

  public subscribeToMarket(market_id: string, callback: any) {
    const client = createClient({
      url: this.clientURLWs,
      retryAttempts: Infinity,
      shouldRetry: () => true,
      keepAlive: 10000,
    });

    if (this.unsubscribeFromMarket) {
      this.unsubscribeFromMarket();
    }

    this.unsubscribeFromMarket = client.subscribe(
      {
        query: `  subscription marketDataV2($market_id: String) {
          marketDataV2(market_id: $market_id)
        }`,
        variables: { market_id },
      },
      {
        next: (dat: any) => {
          callback(dat?.data?.marketDataV2);
        },
        error: (err) => {
          console.log("err", err);
        },
        complete: () => {},
      }
    );
  }

  private unsubscribeFromOrder?: () => void;

  public subscribeToOrder(eth_address: string, callback: any) {
    const client = createClient({
      url: this.clientURLWs,
      retryAttempts: Infinity,
      shouldRetry: () => true,
      keepAlive: 10000,
    });

    if (this.unsubscribeFromOrder) {
      this.unsubscribeFromOrder();
    }

    if (!eth_address) {
      return
    }

    this.unsubscribeFromOrder = client.subscribe(
      {
        query: `  subscription orderExecutionV2($eth_address: String) {
          orderExecutionV2(eth_address: $eth_address)
        }`,
        variables: { eth_address },
      },
      {
        next: (dat: any) => {
          console.log('order dat', dat )
          callback(dat?.data?.orderExecutionV2);
        },
        error: (err) => {
          console.log("err", err);
        },
        complete: () => {},
      }
    );
  }

  private orderCreating: boolean = false;
  private orderCreatingTimeout?: NodeJS.Timeout;

  async cancelOrder({
    account,
    walletClient,
    publicClient,
    order_id,
    market_id,
    callback,
  }: {
    account: Account;
    walletClient: WalletClient;
    publicClient: PublicClient;
    order_id: string;
    market_id: string;
    callback?: (result: TTradeCallback) => void;
  }) {
    if (!this.rpcClient) {
      throw new Error("No RPC Client");
    }

    if (!this.oracleAddress) {
      if (callback) {
        callback({ result: "error", err: "SDK not ready" });
      }
      return;
    }

       
    let ethBalance = await publicClient.getBalance({ address: account.address as TAddress });

    let gasless = false;
    if (ethBalance < 8* 10**12) {
      gasless = true;
    }

   

    if (!gasless) { //
      console.log('sendCancelOrderDirect', order_id)
      let result = await sendCancelOrderDirect(
        walletClient,
        publicClient,
        account,
        this.oracleAddress || "0x",
        order_id as TAddress)

      console.log('result', result.transaction_hash)

      if (callback) {
        callback({ result: 'success' });
      }
      return;

    } else {
      let currentTimestamp = 0;
      try {
        const currentPosition = await this.rpcClient.getPositionValue.query({
            eth_address: account.address as TAddress,
            market_id,
        });


        currentTimestamp = currentPosition?.timestamp || 0;


      } catch (err: any) {
        currentTimestamp = Date.now()

      }

      if (!currentTimestamp || currentTimestamp == 0) {
        currentTimestamp = Date.now()
      }	
      
      let result = await sendCancelOrderGasless(
          walletClient,
          publicClient,
          account,
          this.oracleAddress || "0x",
          this.bundler || "",
          this.paymaster || "",
          order_id as TAddress,
          currentTimestamp
        )

          
      if (callback) {
        callback({ result: 'success' });
      }
      return;
    }
			
  }

  async executeTrade({
    account,
    walletClient,
    publicClient,
    market_id,
    currency,
    direction,
    tradeAmount,
    leverage,
    priceAbove,
    priceBelow,
    closePercentage,
    callback,
  }: {
    account: Account;
    walletClient: WalletClient;
    publicClient: PublicClient;
    market_id: string;
    currency: TCurrency;
    direction: "long" | "short";
    leverage: number;
    tradeAmount?: bigint;
    closePercentage?: number;
    priceAbove?: number;
    priceBelow?: number;
    callback?: (result: TTradeCallback) => void;
  }) {
    if (!closePercentage) {
      closePercentage = 0;
    }
    if (!tradeAmount) {
      tradeAmount = BigInt(0);
    }

    if (!this.rpcClient) {
      throw new Error("No RPC Client");
    }

    if (!this.oracleAddress) {
      if (callback) {
        callback({ result: "error", err: "SDK not ready" });
      }
      return;
    }

    let currentPosition: any;
    try {
      currentPosition = await this.rpcClient.getPositionValue.query({
        eth_address: account.address as TAddress,
        market_id,
      });
      if (
        Number(currentPosition.long_shares) == 0 &&
        Number(currentPosition.short_shares) == 0
      ) {
        currentPosition = undefined;
      }
    } catch (err: any) {
      console.log("ERROR", err);
      this.orderCreating = false;
      if (callback) {
        callback({
          result: "error",
          err: "Error Fetching Market-Position - " + formatError(err),
        });
      }
      return;
    }

    if (tradeAmount && Number(tradeAmount) < 0) {
      this.orderCreating = false;
      if (callback) {
        callback({ result: "error", err: "Trade amount cannot be negative" });
      }
      return;
    }

    if (closePercentage && Number(closePercentage) < 0) {
      this.orderCreating = false;
      if (callback) {
        callback({
          result: "error",
          err: "Close percentage cannot be negative",
        });
      }
      return;
    }

    if (
      (!tradeAmount || Number(tradeAmount) == 0) &&
      (!closePercentage || Number(closePercentage) == 0)
    ) {
      this.orderCreating = false;
      if (callback) {
        callback({
          result: "error",
          err: "Must specify either a tradeAmount or a closePercentage",
        });
      }
      return;
    }

    if (
      tradeAmount &&
      Number(tradeAmount) > 0 &&
      closePercentage &&
      Number(closePercentage) > 0
    ) {
      this.orderCreating = false;
      if (callback) {
        callback({
          result: "error",
          err: "You cannot specify both a tradeAmount and a closePercentage together",
        });
      }
      return;
    }

    if (tradeAmount && Number(tradeAmount) > 0) {
      if (!checkBalance(currency, tradeAmount)) {
        this.orderCreating = false;
        if (callback) {
          callback({
            result: "error",
            err: `You do not have enough ${currency} to process this order. `,
          });
        }
        return;
      }
    }

    let limitOrder = false;
    if ((priceAbove && priceAbove > 0) || (priceBelow && priceBelow > 0)) {
      limitOrder = true;
    }

    let isCorrectDirection = true;
    if (
      tradeAmount &&
      tradeAmount > 0 &&
      currentPosition &&
      currentPosition.long_shares + currentPosition.short_shares > 0
    ) {
      if (direction === "long" && currentPosition.direction === "short") {
        isCorrectDirection = false;
      }

      if (direction === "short" && currentPosition.direction === "long") {
        isCorrectDirection = false;
      }
    }

    if (!isCorrectDirection) {
      this.orderCreating = false;
      if (callback) {
        callback({
          result: "error",
          err: `You cannot trade in the opposite direction to an existing position. PLease close the existing position first. `,
        });
      }
      return;
    }

    if (this.orderCreating) {
      if (callback) {
        callback({
          result: "error",
          err: `An order is already executing. Can only execute one order at a time `,
        });
      }
      return;
      return;
    }

    this.orderCreating = true;
    if (this.orderCreatingTimeout) {
      clearTimeout(this.orderCreatingTimeout);
      this.orderCreatingTimeout = undefined;
    }
    this.orderCreatingTimeout = setTimeout(() => {
      this.orderCreatingTimeout = undefined;
      this.orderCreating = false;
    }, 5000);

    let open_mph_token_amount = Number(tradeAmount);
    if (!open_mph_token_amount) {
      open_mph_token_amount = 0;
    }
    let close_shares_amount = "0";
    if (limitOrder && currentPosition) {
      open_mph_token_amount = 0;
      if (currentPosition.direction === "long") {
        close_shares_amount = String(currentPosition.long_shares);
      } else if (currentPosition.direction === "short") {
        close_shares_amount = String(currentPosition.short_shares);
      }
    } else {
      if (closePercentage && (closePercentage || 0) > 0 && currentPosition) {
        // If user submitting over 100%
        if ((closePercentage || 0) > 100) {
          return;
        }

        if (currentPosition.direction === "long") {
          close_shares_amount = (
            (BigInt(currentPosition.long_shares) *
              BigInt(closePercentage || 0)) /
            BigInt(100)
          ).toString();
        } else if (currentPosition.direction === "short") {
          close_shares_amount = (
            (BigInt(currentPosition.short_shares) *
              BigInt(closePercentage || 0)) /
            BigInt(100)
          ).toString();
        }
      }
    }

    if (
      (!open_mph_token_amount || open_mph_token_amount <= 0) &&
      (!close_shares_amount || Number(close_shares_amount) <= 0)
    ) {
      this.orderCreating = false;
      if (callback) {
        callback({
          result: "error",
          err: `Somehting went wrong. Could not resolve a open trade amount or a close shareds amount from the parameters provided.`,
        });
      }
      return;
    }

    const market = soliditySha3(market_id);

    this.orderCreating = false;

    let currentTimestamp = currentPosition?.timestamp || 0;

    const contract_position = formatPosition(
      await publicClient.readContract({
        address: this.stateAddress || "0x",
        abi: morpherStateAbi,
        functionName: "getPosition",
        args: [account.address, market],
      })
    ) as ContractPosition;

    if (contract_position && currentPosition && !currentPosition.error) {
      if (
        Number(currentPosition.long_shares || 0) !==
          Number(contract_position._longShares) ||
        Number(currentPosition.short_shares || 0) !==
          Number(contract_position._shortShares)
      ) {
        this.orderCreating = false;
        if (callback) {
          callback({ result: "error", err: `Position contract mismatch.` });
        }
      }
    } else {
      if (
        currentPosition &&
        (Number(currentPosition.long_shares) !== 0 ||
          Number(currentPosition.short_shares) !== 0)
      ) {
        this.orderCreating = false;
        if (callback) {
          callback({ result: "error", err: `Position contract mismatch.` });
        }
      }
    }

    // create the order using the sidechain smart contract

    let direction_sltp = "";

    let priceAboveFormatted = BigInt(
      Math.round((priceAbove || 0) * 10 ** 8)
    ).toString();
    let priceBelowFormatted = BigInt(
      Math.round((priceBelow || 0) * 10 ** 8)
    ).toString();

    if (Number(priceAbove) < 0) priceAbove = 0;
    if (Number(priceBelow) < 0) priceBelow = 0;

    if (limitOrder) {
      try {
        let splitValue = await this.rpcClient.getPositionSplitValue.query({
          eth_address: account.address as TAddress,
          market_id,
          price_above: BigInt(
            Math.round((priceAbove || 0) * 10 ** 8)
          ).toString(),
          price_below: BigInt(
            Math.round((priceBelow || 0) * 10 ** 8)
          ).toString(),
        });

        if (!splitValue.price_above || !splitValue.price_below) {
          this.orderCreating = false;
          if (callback) {
            callback({ result: "error", err: `Position Contract Mismatch` });
          }
        }
        priceAboveFormatted = splitValue.price_above;
        priceBelowFormatted = splitValue.price_below;
      } catch (err: any) {
        this.orderCreating = false;
        if (callback) {
          callback({
            result: "error",
            err: `Error fetching position split data`,
          });
        }
      }
    }

    const good_until = 0;
    const good_from = 0;

    this.transactionNumber += 1;
    const transactionNumber = this.transactionNumber;
    const submit_date = Date.now();
    const tx_hash = "";
    const order_id = "";
    const transaction_data = {
      market,
      close_shares_amount: String(close_shares_amount),
      open_mph_token_amount: BigInt(open_mph_token_amount).toString(),
      direction: direction === "long" ? true : false,
      leverage: BigInt(Math.round(leverage * 10 ** 8)).toString(),
      priceAbove: limitOrder ? priceAboveFormatted : "0",
      priceBelow: limitOrder ? priceBelowFormatted : "0",
      good_until: good_until,
      good_from: good_from,
    };
    try {
      // if this is a close oder then check the current position close shares amount against the requested close shares amount.
      if (
        !limitOrder &&
        (!priceAboveFormatted || priceAboveFormatted == "0") &&
        (!priceBelowFormatted || priceBelowFormatted == "0") &&
        close_shares_amount &&
        String(close_shares_amount) !== "0"
      ) {
        const closeSharesValue = BigInt(String(close_shares_amount));

        if (!currentPosition) {
          this.orderCreating = false;
          if (callback) {
            callback({ result: "error", err: `POSITION_CONTRACT_MISMATCH` });
          }
        }

        const longSharesValue = BigInt(
          String(currentPosition.long_shares) || "0"
        );

        const shortSharesValue = BigInt(
          String(currentPosition.short_shares) || "0"
        );

        const totalSharesValue = longSharesValue + shortSharesValue;

        if (totalSharesValue < closeSharesValue) {
          this.orderCreating = false;
          if (callback) {
            callback({ result: "error", err: `POSITION_CONTRACT_MISMATCH` });
          }
        }
      }

      let ethBalance = await publicClient.getBalance({
        address: account.address as TAddress,
      });

      let gasless = false;
      if (ethBalance < 8 * 10 ** 12) {
        gasless = true;
      }

      let timeOut = setTimeout(() => {
        this.orderCreating = false;
        if (callback) {
          callback({
            result: "error",
            err: `Something went wrong - ORder creation timeout.`,
          });
        }
      }, 15000);

      if (currency !== "MPH") {
        if (currency == "ETH") {
          sendCreateOrderGasToken(
            walletClient,
            publicClient,
            account,
            this.oracleAddress || "0x",
            market,
            String(close_shares_amount),
            open_mph_token_amount,
            direction === "long" ? true : false,
            BigInt(Math.round(leverage * 10 ** 8)).toString(),
            limitOrder ? priceAboveFormatted : "0",
            limitOrder ? priceBelowFormatted : "0",
            good_until,
            good_from,
            timeOut,
            submit_date,
            transaction_data
          );
        } else {
          if (!gasless) {
            //
            sendCreateOrderToken(
              walletClient,
              publicClient,
              account,
              this.oracleAddress || "0x",
              this.usdcAddress || "0x",
              this.tokenAddress || "0x",
              currentPosition?.value || 0n,
              market,
              String(close_shares_amount),
              open_mph_token_amount,
              direction === "long" ? true : false,
              BigInt(Math.round(leverage * 10 ** 8)).toString(),
              limitOrder ? priceAboveFormatted : "0",
              limitOrder ? priceBelowFormatted : "0",
              good_until,
              good_from,
              timeOut,
              submit_date,
              transaction_data
            );
          } else {
            sendCreateOrderTokenGasless(
              walletClient,
              publicClient,
              account,
              this.oracleAddress || "0x",
              this.usdcAddress || "0x",
              this.bundler || "",
              this.paymaster || "",

              market,
              String(close_shares_amount),
              open_mph_token_amount,
              direction === "long" ? true : false,
              BigInt(Math.round(leverage * 10 ** 8)).toString(),
              limitOrder ? priceAboveFormatted : "0",
              limitOrder ? priceBelowFormatted : "0",
              good_until,
              good_from,
              timeOut,
              submit_date,
              transaction_data,
              currentTimestamp
            );
          }
        }
      } else if (!gasless) {
        console.log("transport", walletClient.transport);
        //
        sendCreateOrderDirect(
          walletClient,
          publicClient,
          account,
          this.oracleAddress || "0x",
          market,
          String(close_shares_amount),
          BigInt(Number(open_mph_token_amount)).toString(),
          direction === "long" ? true : false,
          BigInt(Math.round(leverage * 10 ** 8)).toString(),
          limitOrder ? priceAboveFormatted : "0",
          limitOrder ? priceBelowFormatted : "0",
          good_until,
          good_from,
          timeOut,
          submit_date,
          transaction_data
        );
      } else {
        sendCreateOrderGasless(
          walletClient,
          publicClient,
          account,
          this.oracleAddress || "0x",
          this.bundler || "",
          this.paymaster || "",
          market,
          String(close_shares_amount),
          BigInt(Number(open_mph_token_amount)).toString(),
          direction === "long" ? true : false,
          BigInt(Math.round(leverage * 10 ** 8)).toString(),
          limitOrder ? priceAboveFormatted : "0",
          limitOrder ? priceBelowFormatted : "0",
          good_until,
          good_from,
          timeOut,
          submit_date,
          transaction_data,
          currentTimestamp
        );
      }
    } catch (err: any) {
      this.orderCreating = false;
      if (callback) {
        callback({
          result: "error",
          err: `Error executing order: ${formatError(err)}`,
        });
      }
    }
  }
}
export type RouterDefinition = V2RouterDefinition;

export const usdFormatter = (input: any) => {
  const price = parseFloat(input || 0);

  return price.toFixed(2);
};
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
  return price ? price.toFixed(round) : "0";
};
