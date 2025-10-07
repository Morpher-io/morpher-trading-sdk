import { createTRPCClient, type TRPCClient, httpBatchLink } from "@trpc/client";
import type { AnyRouter } from "@trpc/server";
import { createClient } from "graphql-ws";

import type {
  V2RouterDefinition,
  TMarketDetail,
} from "./v2.router";
import {
  ContractPosition,
  TAddress,
  TMarketType,
  TTradeCallback,
} from "./types";
import { Account, erc20Abi, PublicClient, WalletClient } from "viem";
import {
  formatError,
  formatPosition,
  sendCancelOrderDirect,
  sendCancelOrderGasless,
  sendCancelOrderSmartWallet,
  sendCreateOrderDirect,
  sendCreateOrderGasless,
  sendCreateOrderGasToken,
  sendCreateOrderToken,
  sendCreateOrderTokenGasless,
  sendCreateOrderTokenWallet,
  soliditySha3,
  sendCreateOrderSmartWallet
} from "./helpers";
import { morpherStateAbi } from "./abi";
export type TradeCallback = TTradeCallback;
export type MarketDetail = TMarketDetail;
export type TCurrency = "MPH" | "USDC" | "ETH";

export class MorpherTradeSDK {
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

  /**
   * Initialise the trading SDK and fetch the contract addresses and other configuration information from the backend API.
   * @param endpoint Address of the Morpher backend API that all internal functions will connect to, usually https://api.morpher.com
   */
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

  /**
   * Set up the tRPC client for all backend API calls.
   * @param wsUrl 
   * @returns 
   */
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

  /**
   * Fetch a list of tradable currencies along with the current USD exchange rate and the current balance for each for the given ETH address.
   * @param options - The options for fetching the currency list.
   * @param options.address - The user's ETH address.
   * @param options.publicClient - The viem public client.
   * @param options.tokenAddresses - A list of token addresses to fetch balances for.
   * @returns 
   */
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
        usd_exchange_rate?: number;
      };
    } = {};

    currencyList = {
      ETH: {
        symbol: "ETH",
        balance: ethBalance,
        usd: ethBalance
          ? (Number(ethBalance) / 10 ** 18) * Number(exchangeRates.eth_price)
          : undefined,
        decimals: 18,
        usd_exchange_rate: Number(exchangeRates.eth_price)
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
        usd_exchange_rate: Number((exchangeRates as any)[
          tokenAddress.symbol.toLowerCase() + "_price" || 0
        ])

      };
    }

    return currencyList;
  }

  /**
   * Fetch the market information for tradable markets from the Morpher API. This includes the market's current status and also current OHLC pricing for the markets.
   * @param options - The options to filter the market list.
   * @param options.type - Optional filter for market type.
   * @returns 
   */
  async getMarketList({ type }: { type?: TMarketType }) {
    if (!this.rpcClient) {
      throw new Error("No RPC Client");
    }

    const result = await this.rpcClient.getMarketList.query({
      type: type || "stock",
    });
    return result.markets;
  }

  /**
   * Fetch the detailed information for a specific market and the chart data for the market. This will also include the position ID if the given ETH address has an open position in the market.
   * @param options - The options for fetching market data.
   * @param options.eth_address - The user's ETH address.
   * @param options.market_id - The ID of the market to fetch data for.
   * @returns 
   */
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

  /**
   * Fetch a list of orders for a specific ETH address. Can also fetch a specific order by ID or `tx_hash`, or all orders for a specific market for a user.
   * @param options - The options for fetching orders.
   * @param options.eth_address - The user's ETH address.
   * @param options.tx_hash - Optional transaction hash to fetch a specific order.
   * @param options.order_id - Optional order ID to fetch a specific order.
   * @param options.market_id - Optional market ID to fetch all orders for a specific market.
   * @returns 
   */
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

  /**
   * Fetch a list of trending markets from the Morpher API.
   * @returns 
   */
  async getTrendingMarkets() {
    if (!this.rpcClient) {
      throw new Error("No RPC Client");
    }

    const result = await this.rpcClient.getTrendingMarkets.query();
    return result;
  }


  /**
   * Get the portfolio details for a given ETH address.
   * @param options - The options for fetching the portfolio.
   * @param options.eth_address - The user's ETH address.
   * @returns 
   */
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

  /**
   * Fetch all the open positions for a given ETH address.
   * @param options - The options for fetching positions.
   * @param options.eth_address - The user's ETH address.
   * @param options.market_id - Optional market ID to fetch a specific position.
   * @param options.position_id - Optional position ID to fetch a specific position.
   * @returns 
   */
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

  /**
   * Fetch the returns breakdown for a specific user. Used for showing portfolio charts or calculating returns over a specific period.
   * @param options - The options for fetching returns.
   * @param options.eth_address - The user's ETH address.
   * @param options.type - The period to fetch returns for ('d', 'w', 'm', 'y').
   * @returns 
   */
  async getReturns({
    eth_address,
    type,
  }: {
    eth_address: TAddress;
    type?: "d" | "w" | "m" | "y";
  }) {
    if (!this.rpcClient) {
      throw new Error("No RPC Client");
    }

    const result = await this.rpcClient.getReturns.query({
      eth_address,
      type,
    });
    return result;
  }

  /**
   * Fetch the leaderboard information to show where the given ETH address is on the leaderboards and the top users on each leaderboard. The leaderboards are separated by app, i.e., each app has its own leaderboards.
   * @param options - The options for fetching the leaderboard.
   * @param options.type - The type of leaderboard ('order' or 'returns').
   * @param options.eth_address - The user's ETH address.
   * @param options.app - The application identifier.
   * @returns 
   */
  async getLeaderboard({
    type,
    eth_address,
    app,
  }: {
    type: "order" | "returns";
    eth_address: TAddress;
    app: string;
  }) {
    if (!this.rpcClient) {
      throw new Error("No RPC Client");
    }

    const result = await this.rpcClient.getLeaderboard.query({
      type,
      eth_address,
      app,
    });
    return result;
  }

  /**
   * Retrieve the application-specific context for the given ETH address.
   * @param options - The options for fetching the context.
   * @param options.eth_address - The user's ETH address.
   * @param options.app - The application identifier.
   * @returns 
   */
  async getContext({
    eth_address,
    app,
  }: {
    eth_address: TAddress;
    app: string;
  }) {
    if (!this.rpcClient) {
      throw new Error("No RPC Client");
    }

    const result = await this.rpcClient.getContext.query({
      eth_address,
      app,
    });
    return result;
  }

  /**
   * Link application-specific context to an ETH address. This will link the local username, ID, etc., to an ETH address for display on leaderboards etc.
   * The context does not need to be set by an application if the users should remain completely anonymous - this will only be used for social interactions.
   * @param options - The context data to set.
   * @param options.eth_address - The user's ETH address.
   * @param options.id - The application-specific user ID.
   * @param options.app - The application identifier.
   * @param options.user_name - Optional username.
   * @param options.display_name - Optional display name.
   * @param options.profile_image - Optional URL to a profile image.
   * @returns 
   */
  async setContext({
    eth_address,
    id,
    app,
    user_name,
    display_name,
    profile_image,
    platformType,
    clientFid,
    added
  }: {
    eth_address: TAddress;
    id: string;
    app: string;
    user_name?: string;
    display_name?: string;
    profile_image?: string;
    platformType?: string;
    clientFid?: number;
    added?: boolean;
  }) {
    if (!this.rpcClient) {
      throw new Error("No RPC Client");
    }

    const result = await this.rpcClient.setContext.mutate({
      eth_address,
      id,
      app,
      user_name,
      display_name,
      profile_image,
      platformType,
      clientFid,
      added
    });
    return result;
  }

  private marketSubscriptions: {
    [market_id:string]: () => void;
  } = {}
  
  /**
   * Unsubscribe from the pricing updates for a specific market. 
   * This should be done any time the subscription is no longer required or the pricing is not visible on the fronten
   * @param market_id 
   * @param callback 
   */
  public unsubscribeFromMarket(market_id: string) {
    if (this.marketSubscriptions[market_id]) {
      this.marketSubscriptions[market_id]();
      delete this.marketSubscriptions[market_id]
    }
  }

  /**
   * Subscribe to pricing updates for a specific market.
   * @param market_id 
   * @param callback 
   */
  public subscribeToMarket(market_id: string, callback: any) {
    const client = createClient({
      url: this.clientURLWs,
      retryAttempts: Infinity,
      shouldRetry: () => true,
      keepAlive: 10000,
    });

    if (this.marketSubscriptions[market_id]) {
      this.marketSubscriptions[market_id]();
      delete this.marketSubscriptions[market_id]
    }

    this.marketSubscriptions[market_id] = client.subscribe(
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

  /**
   * Subscribe to order execution updates for a specific ETH address. Used to see when an order executes, as this could be some time after it is initially placed.
   * @param eth_address 
   * @param callback 
   * @returns 
   */
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

  /**
   * Cancel a pending order that is still awaiting execution. Pending open orders place the user's tokens in escrow, so the order needs to be cancelled to release the tokens if the user no longer wants to execute the trade.
   * @param options - The options for cancelling an order.
   * @param options.account - The user's account object.
   * @param options.walletClient - The viem wallet client.
   * @param options.publicClient - The viem public client.
   * @param options.order_id - The ID of the order to cancel.
   * @param options.market_id - The ID of the market the order is for.
   * @param options.callback - Optional callback function for trade results.
   * @returns 
   */
  async cancelOrder({
    account,
    walletClient,
    publicClient,
    order_id,
    market_id,
    callback,
    gaslessOverride,
  }: {
    account: Account;
    walletClient: WalletClient;
    publicClient: PublicClient;
    order_id: string;
    market_id: string;
    callback?: (result: TTradeCallback) => void;
    gaslessOverride?: boolean;
  }) {
    if (!this.rpcClient) {
      throw new Error("No RPC Client");
    }

    if (!this.oracleAddress) {
      if (callback) {
        callback({ result: "error", err: "SDK not ready", error_code: 'SDK_NOT_READY' });
      }
      return;
    }

       
    let ethBalance = await publicClient.getBalance({ address: account.address as TAddress });

    let gasless: boolean;
    if (gaslessOverride === true) {
      gasless = true;
    } else {
      gasless = ethBalance < 8 * 10 ** 12;
    }

   

    if (!gasless) { //
      const result = await sendCancelOrderDirect(
        walletClient,
        publicClient,
        account,
        this.oracleAddress || "0x",
        order_id as TAddress)


      if (callback) {
        callback({ result: 'success', callback_result: result, tx_hash: result.transaction_hash });
      }
      return;

    } else {
      let paymasterWallet = false;
      try {
        const capabilities: any = await walletClient.getCapabilities({
          account,
          chainId: walletClient.chain?.id,
        });
        
        console.log('capabilities', capabilities)

        if (capabilities && capabilities?.paymasterService?.supported === true) {
          paymasterWallet = true;
        }
      } catch (err) {
        paymasterWallet = false;
      }

      if (paymasterWallet) {
        let timeOut = setTimeout(() => {
          if (callback) {
            callback({
              result: "error",
              err: `Something went wrong - Order cancellation timeout.`,
              error_code: 'ORDER_TIMEOUT'
            });
          }
        }, 15000);

        const result = await sendCancelOrderSmartWallet(
          walletClient,
          account,
          this.oracleAddress || "0x",
          order_id as TAddress,
          timeOut,
          this.paymaster
        );

        if (callback) {
          callback({ result: 'success', callback_result: result, tx_hash: result.transaction_hash });
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
        
        const callback_result = await sendCancelOrderGasless(
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
          callback({ result: 'success', callback_result });
        }
        return;
      }
    }
			
  }

   /**
   * Open a new position on a market or extend an existing position. If a position already exists, then you can only extend in the same direction.
   * i.e., if you have a long position, you can't execute a short trade on the same market.
   * You cannot execute any trades on a market that already has a pending trade - the pending trade must be cancelled first.
   * @param options - The options for opening a position.
   * @param options.account - The user's account object.
   * @param options.walletClient - The viem wallet client.
   * @param options.publicClient - The viem public client.
   * @param options.market_id - The ID of the market to open a position on.
   * @param options.currency - The currency to use for the trade ('MPH', 'USDC' or 'ETH').
   * @param options.direction - The direction of the trade ('long' or 'short').
   * @param options.leverage - The leverage to use for the trade.
   * @param options.tradeAmount - The amount of the specidied currency to trade. For USDC or Eth the currency is converted to MPH as part of the trade execution.
   * @param options.callback - Optional callback function for trade results. This callback will only show that the order was created. the orderSubscription is required to see when the trade is actually executed and the position is created. This could be a much later for stock markets that are only ticking durin market hours. Between order ceation and execution there is a pending order and the MPH that was sent for the order is in escrow. The pending order must be cancelled if the order is no longer required and tokens are to be returned to the users account.
   * @returns 
   */
  async openPosition({
    account,
    walletClient,
    publicClient,
    market_id,
    currency,
    direction,
    tradeAmount,
    leverage,
    callback,
    gaslessOverride,

  }: {
    account: Account;
    walletClient: WalletClient;
    publicClient: PublicClient;
    market_id: string;
    currency: TCurrency;
    direction: "long" | "short";
    leverage: number;
    tradeAmount: bigint;
    callback?: (result: TTradeCallback) => void;
    gaslessOverride?: boolean;
  }) {

    if (!this.rpcClient) {
      throw new Error("No RPC Client");
    }

    if (!this.oracleAddress) {
      if (callback) {
        callback({ result: "error", err: "SDK not ready", error_code: 'SDK_NOT_READY' });
      }
      return;
    }

    if (!tradeAmount || tradeAmount <= 0n) {
      this.orderCreating = false;
      if (callback) {
        callback({
          result: "error",
          err: "No trade amount was specified",
          error_code: 'INVALID_TRADE_AMOUNT'
        });
      }
      return;
    }

    await this.executeTrade({
      account,
      walletClient,
      publicClient,
      market_id,
      currency,
      direction,
      tradeAmount,
      leverage,
      callback,
      gaslessOverride
    })

  }

   /**
   * Add a Stop-Loss or Take-Profit protection order on a market where you have a current open position.
   * You cannot add a protection order to a market that already has a pending trade (open or close) - the pending trade must be cancelled first.
   * For a long/buy position, `priceAbove` is specified for a Take-Profit limit order and `priceBelow` is specified for a Stop-Loss limit order. Both can be specified to create both protection orders at the same time.
   * For a short/sell position, `priceBelow` is specified for a Take-Profit limit order and `priceAbove` is specified for a Stop-Loss limit order. Both can be specified to create both protection orders at the same time.
   * @param options - The options for setting SL/TP.
   * @param options.account - The user's account object.
   * @param options.walletClient - The viem wallet client.
   * @param options.publicClient - The viem public client.
   * @param options.market_id - The ID of the market to set the SL/TP on.
   * @param options.priceAbove - The take-profit price (for long) or stop-loss price (for short).
   * @param options.priceBelow - The stop-loss price (for long) or take-profit price (for short).
   * @param options.callback - Optional callback function for trade results.
   * @returns 
   */
  async setSLTP({
    account,
    walletClient,
    publicClient,
    market_id,
    priceAbove,
    priceBelow,
    callback,
    gaslessOverride,
  }: {
    account: Account;
    walletClient: WalletClient;
    publicClient: PublicClient;
    market_id: string;
    priceAbove?: number;
    priceBelow?: number;
    callback?: (result: TTradeCallback) => void;
    gaslessOverride?: boolean;
  }) {

    if (!this.rpcClient) {
      throw new Error("No RPC Client");
    }

    if (!this.oracleAddress) {
      if (callback) {
        callback({ result: "error", err: "SDK not ready", error_code: 'SDK_NOT_READY' });
      }
      return;
    }

    if (!priceAbove) priceAbove = 0;
    if (!priceBelow) priceBelow = 0;

    if (priceAbove == 0 && priceBelow == 0) {
      this.orderCreating = false;
      if (callback) {
        callback({
          result: "error",
          err: "No limit price was specified. Please specify a priceAbove or priceBelow",
          error_code: 'INVALID_LIMIT_PRICE'
          
        });
      }
      return;
    }

    await this.executeTrade({
      account,
      walletClient,
      publicClient,
      market_id,
      currency: 'MPH',
      direction: "short",
      leverage: 1,
      priceAbove,
      priceBelow,
      callback,
      gaslessOverride
    })

  }

  /**
   * Execute a closing trade on a market where you have a current open position.
   * You cannot close a position on a market that already has a pending trade (open or close) - the pending trade must be cancelled first.
   * @param options - The options for closing a position.
   * @param options.account - The user's account object.
   * @param options.walletClient - The viem wallet client.
   * @param options.publicClient - The viem public client.
   * @param options.market_id - The ID of the market to close the position on.
   * @param options.closePercentage - The percentage of the position to close (1-100) if 100 then the position will be fully closed otherwise the close shares are calculated based on the percentage and the remaining shares will be left on an open position after the close order executes.
   * @param options.callback - Optional callback function for trade results.
   * @returns 
   */
  async closePosition({
    account,
    walletClient,
    publicClient,
    market_id,
    closePercentage,
    callback,
    gaslessOverride,
  }: {
    account: Account;
    walletClient: WalletClient;
    publicClient: PublicClient;
    market_id: string;
    closePercentage: number;
    callback?: (result: TTradeCallback) => void;
    gaslessOverride?: boolean;
  }) {

    if (!this.rpcClient) {
      throw new Error("No RPC Client");
    }

    if (!this.oracleAddress) {
      if (callback) {
        callback({ result: "error", err: "SDK not ready", error_code: 'SDK_NOT_READY' });
      }
      return;
    }

    if (!closePercentage) {
      this.orderCreating = false;
      if (callback) {
        callback({
          result: "error",
          err: "No close percentage specified",
          error_code: 'INVALID_CLOSE_PERCENTAGE'
        });
      }
      return;
    }

    if (Number(closePercentage) < 0) {
      this.orderCreating = false;
      if (callback) {
        callback({
          result: "error",
          err: "Close percentage cannot be negative",
          error_code: 'INVALID_CLOSE_PERCENTAGE'
        });
      }
      return;
    }

    if (Number(closePercentage) > 100) {
      this.orderCreating = false;
      if (callback) {
        callback({
          result: "error",
          err: "Close percentage cannot be more than 100",
          error_code: 'INVALID_CLOSE_PERCENTAGE'
        });
      }
      return;
    }

    await this.executeTrade({
      account,
      walletClient,
      publicClient,
      market_id,
      currency: 'MPH',
      direction: 'short',
      leverage: 1,
      closePercentage,
      callback,
      gaslessOverride
    })
  }

  /**
   * Internal function to execute a trade.
   * This function contains all the trading logic and calls the correct contract functions based on the specific trade type, currency, and gas status of the user.
   * @param options - The options for executing a trade.
   * @param options.account - The user's account object.
   * @param options.walletClient - The viem wallet client.
   * @param options.publicClient - The viem public client.
   * @param options.market_id - The ID of the market.
   * @param options.currency - The currency for the trade.
   * @param options.direction - The direction of the trade.
   * @param options.tradeAmount - The amount to trade.
   * @param options.leverage - The leverage for the trade.
   * @param options.priceAbove - The take-profit/stop-loss price above the current price.
   * @param options.priceBelow - The take-profit/stop-loss price below the current price.
   * @param options.closePercentage - The percentage of the position to close.
   * @param options.callback - Optional callback function for trade results.
   * @returns 
   */
  private async executeTrade({
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
    gaslessOverride,
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
    gaslessOverride?: boolean;
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
        callback({ result: "error", err: "SDK not ready", error_code: 'SDK_NOT_READY' });
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
          error_code: formatError(err)
        });
      }
      return;
    }

    if (tradeAmount && Number(tradeAmount) < 0) {
      this.orderCreating = false;
      if (callback) {
        callback({ result: "error", err: "Trade amount cannot be negative", error_code: 'INVALID_TRADE_AMOUNT' });
      }
      return;
    }

    if (closePercentage && Number(closePercentage) < 0) {
      this.orderCreating = false;
      if (callback) {
        callback({
          result: "error",
          err: "Close percentage cannot be negative",
          error_code: 'INVALID_CLOSE_PERCENTAGE'
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
          error_code: 'INVALID_TRADE_AMOUNT'
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
          error_code: 'INVALID_TRADE_AMOUNT'
        });
      }
      return;
    }

    let ethBalance = await publicClient.getBalance({
      address: account.address as TAddress,
    });

    if (tradeAmount && Number(tradeAmount) > 0) {
      let balance = 0n;
      if (currency === 'ETH') {
        balance = ethBalance - BigInt(10**14)
        if (balance < 0n) {
          balance = 0n
        }
      } else if (currency === 'USDC') {
        if (!this.usdcAddress) {
          if (callback) {
            callback({
              result: "error",
              err: `No eth address was set `,
              error_code: 'MISSING_ADDRESSES'
            });
          }
          return;
        }
        balance = await publicClient.readContract({
          address: this.usdcAddress,
          abi: erc20Abi,
          functionName: "balanceOf",
          args: [account.address as TAddress],
        });
      } else {
        if (!this.tokenAddress) {
          if (callback) {
            callback({
              result: "error",
              err: `No eth address was set `,
              error_code: 'MISSING_ADDRESSES'
            });
          }
          return;
        }
        balance = await publicClient.readContract({
          address: this.tokenAddress,
          abi: erc20Abi,
          functionName: "balanceOf",
          args: [account.address as TAddress],
        });
      }
      if (balance == 0n) {
        
        if (callback) {
          callback({
            result: "error",
            err: `You do not have enough ${currency} to process this order. `,
            error_code: 'BALANCE_TOO_LOW'
          });
        }
        return;
        
      }
      if (tradeAmount > balance) {
        tradeAmount = balance
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
          error_code: 'TRADE_DIRECTION_ERROR'
        });
      }
      return;
    }

    if (this.orderCreating) {
      if (callback) {
        callback({
          result: "error",
          err: `An order is already executing. Can only execute one order at a time `,
          error_code: 'UNPROCESSED_DELAYED_ORDER'
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
          direction = 'short'
          leverage = (Number(currentPosition.average_leverage || 100000000) / 10**8);
          close_shares_amount = (
            (BigInt(currentPosition.long_shares) *
              BigInt(closePercentage || 0)) /
            BigInt(100)
          ).toString();
        } else if (currentPosition.direction === "short") {
          leverage = (Number(currentPosition.average_leverage || 100000000) / 10**8);
          direction = 'long'
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
          err: `Somehting went wrong. Could not resolve a open trade amount or a close shares amount from the parameters provided.`,
          error_code: 'INVALID_TRADE_AMOUNT'
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
          callback({ result: "error", err: `Position contract mismatch.`, error_code: 'POSITION_CONTRACT_MISMATCH' });
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
          callback({ result: "error", err: `Position contract mismatch.`, error_code: 'POSITION_CONTRACT_MISMATCH' });
        }
      }
    }

    // create the order using the sidechain smart contract


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
            callback({ result: "error", err: `Position Contract Mismatch`, error_code: 'POSITION_CONTRACT_MISMATCH' });
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
            error_code: 'MARKET_SPLIT'
          });
        }
      }
    }

    const good_until = 0;
    const good_from = 0;

    this.transactionNumber += 1;
    const submit_date = Date.now();
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
            callback({ result: "error", err: `POSITION_CONTRACT_MISMATCH`, error_code: 'POSITION_CONTRACT_MISMATCH' });
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
            callback({ result: "error", err: `POSITION_CONTRACT_MISMATCH`, error_code: 'POSITION_CONTRACT_MISMATCH' });
          }
        }
      }



      let gasless: boolean;
      if (gaslessOverride === true) {
        gasless = true;
      } else {
        gasless = ethBalance < 8 * 10 ** 12;
      }

      let timeOut = setTimeout(() => {
        this.orderCreating = false;
        if (callback) {
          callback({
            result: "error",
            err: `Something went wrong - ORder creation timeout.`,
            error_code: 'ORDER_TIMEOUT'
          });
        }
      }, 15000);

      let order_result: {
        transaction_hash: `0x${string}`;
        order_id: string;
      } | undefined
      if (currency !== "MPH") {
        if (currency == "ETH") {
           order_result = await sendCreateOrderGasToken(
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
            order_result = await sendCreateOrderToken(
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
            let paymasterWallet = false;
            try {
              const capabilities: any = await walletClient.getCapabilities({
                account,
                chainId: walletClient.chain?.id,
              });

                          console.log('capabilities', capabilities)
              if (
                capabilities &&
                capabilities?.paymasterService?.supported === true
              ) {
                paymasterWallet = true;
              }
            } catch (err) {
              paymasterWallet = false;
            }

            if (paymasterWallet) {
              order_result = await sendCreateOrderTokenWallet(
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
                this.paymaster
              );
            } else {
              order_result = await sendCreateOrderTokenGasless(
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
        }
      } else if (!gasless) {
        //
        order_result = await sendCreateOrderDirect(
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
        let paymasterWallet = false;

        try{
		      const capabilities:any = await walletClient.getCapabilities({
							account,
							chainId: walletClient.chain?.id, 
						})
            console.log('capabilities', capabilities)

          if (capabilities && capabilities?.paymasterService?.supported === true) {
            paymasterWallet = true;
          }

        } catch (err) {
          paymasterWallet = false
        }

      
        if (paymasterWallet) {
          order_result = await sendCreateOrderSmartWallet(
            walletClient,
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
            this.paymaster
          );

        } else {

          order_result = await sendCreateOrderGasless(
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
      }

      if (callback) {
        callback({
          result: "success",
          tx_hash: order_result?.transaction_hash,
          order_id: order_result?.order_id,
        });
      }

    } catch (err: any) {
      this.orderCreating = false;
      if (callback) {
        callback({
          result: "error",
          err: `Error executing order: ${formatError(err)}`,
          error_code: 'EXECUTION_ERROR'
        });
      }
    }
  }
}

export type RouterDefinition = V2RouterDefinition;

/**
 * Format a number as a currency string (e.g., 0.00).
 * @param input 
 * @returns 
 */
export const usdFormatter = (input: any) => {
  const price = parseFloat(input || 0);

  return price.toFixed(2);
};

/**
 * Format a token value for display - show only as many digits as are necessary and round the rest, e.g., 1.2345655647357 will show "1.2346" but 1234.5655647357 will show "1234.57".
 * @param input 
 * @returns 
 */
export const tokenValueFormatter = (param: any) => {
  let price = parseFloat(param);
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
  if (round > 0) {
     price = Math.floor(price * 10**round) / 10**round
  }
  
  return price ? price.toFixed(round) : "0";
};
