import { V2RouterDefinition, TMarketDetail } from './v2.router';
import { TAddress, TMarketType, TTradeCallback } from './types';
import { Account, PublicClient, WalletClient } from 'viem';

export * from './types';
export * from './v2.router';

export type TradeCallback = TTradeCallback;
export type MarketDetail = TMarketDetail;
export type TCurrency = "MPH" | "USDC" | "ETH";
export declare class MorpherTradeSDK {
    private endpoint;
    private rpcClient?;
    private transactionNumber;
    private stateAddress?;
    private oracleAddress?;
    usdcAddress?: TAddress;
    tokenAddress?: TAddress;
    private clientURLHttps;
    private clientURLWs;
    private bundler?;
    private paymaster?;
    ready: boolean;
    /**
     * Initialise the trading SDK and fetch the contract addresses and other configuration information from the backend API.
     * @param endpoint Address of the Morpher backend API that all internal functions will connect to, usually https://api.morpher.com
     */
    constructor(endpoint: string);
    /**
     * Set up the tRPC client for all backend API calls.
     * @param wsUrl
     * @returns
     */
    private createTradingClient;
    /**
     * Fetch a list of tradable currencies along with the current USD exchange rate and the current balance for each for the given ETH address.
     * @param options - The options for fetching the currency list.
     * @param options.address - The user's ETH address.
     * @param options.publicClient - The viem public client.
     * @param options.tokenAddresses - A list of token addresses to fetch balances for.
     * @returns
     */
    getCurrencyList({ address, publicClient, tokenAddresses, }: {
        address: `0x${string}`;
        publicClient: any;
        tokenAddresses: {
            symbol: string;
            address: `0x${string}`;
        }[];
    }): Promise<{
        [symbol: string]: {
            symbol: string;
            balance?: bigint;
            usd?: number;
            decimals?: number;
            usd_exchange_rate?: number;
        };
    }>;
    /**
     * Fetch the market information for tradable markets from the Morpher API. This includes the market's current status and also current OHLC pricing for the markets.
     * @param options - The options to filter the market list.
     * @param options.type - Optional filter for market type.
     * @returns
     */
    getMarketList({ type }: {
        type?: TMarketType;
    }): Promise<Record<string | number, {
        symbol: string;
        name: string;
        type: string;
        status: string;
        market_id: string;
        open: number;
        high: number;
        low: number;
        close: number;
        change_percent: number;
        is_paused: boolean;
        exchange: string;
        exchangeTimezone: string;
        exchangeOpen: string;
        exchangeClose: string;
        pause_reason?: string | undefined;
        volume?: number | undefined;
        spread?: number | undefined;
        change?: number | undefined;
        timestamp?: number | undefined;
        nextStatus?: string | undefined;
        nextStatusTimestamp?: number | undefined;
        market_delay?: number | undefined;
        sector?: string | undefined;
        limit_direction?: string | undefined;
        max_leverage?: number | undefined;
        min_position_age?: number | undefined;
        country?: string | undefined;
        market_cap?: number | undefined;
        logo_image?: number | undefined;
    }>>;
    /**
     * Fetch the detailed information for a specific market and the chart data for the market. This will also include the position ID if the given ETH address has an open position in the market.
     * @param options - The options for fetching market data.
     * @param options.eth_address - The user's ETH address.
     * @param options.market_id - The ID of the market to fetch data for.
     * @returns
     */
    getMarketData({ eth_address, market_id, }: {
        eth_address: `0x${string}` | undefined;
        market_id: string | undefined;
    }): Promise<{
        symbol: string;
        name: string;
        type: string;
        status: string;
        market_id: string;
        open: number;
        high: number;
        low: number;
        close: number;
        change_percent: number;
        is_paused: boolean;
        exchange: string;
        exchangeTimezone: string;
        exchangeOpen: string;
        exchangeClose: string;
        pause_reason?: string | undefined;
        volume?: number | undefined;
        spread?: number | undefined;
        change?: number | undefined;
        timestamp?: number | undefined;
        nextStatus?: string | undefined;
        nextStatusTimestamp?: number | undefined;
        market_delay?: number | undefined;
        sector?: string | undefined;
        limit_direction?: string | undefined;
        max_leverage?: number | undefined;
        min_position_age?: number | undefined;
        country?: string | undefined;
        market_cap?: number | undefined;
        logo_image?: number | undefined;
        pending_order_id?: string | undefined;
        position_id?: string | undefined;
        data_minutely?: import('./v2.router').StrictOHLCArray[] | undefined;
        data_hourly?: import('./v2.router').StrictOHLCArray[] | undefined;
        data_daily?: import('./v2.router').StrictOHLCArray[] | undefined;
    } | undefined>;
    /**
     * Fetch a list of orders for a specific ETH address. Can also fetch a specific order by ID or `tx_hash`, or all orders for a specific market for a user.
     * @param options - The options for fetching orders.
     * @param options.eth_address - The user's ETH address.
     * @param options.tx_hash - Optional transaction hash to fetch a specific order.
     * @param options.order_id - Optional order ID to fetch a specific order.
     * @param options.market_id - Optional market ID to fetch all orders for a specific market.
     * @returns
     */
    getOrders({ eth_address, tx_hash, order_id, market_id, }: {
        eth_address: TAddress;
        tx_hash?: string;
        order_id?: string;
        market_id?: string;
    }): Promise<import('./v2.router').TORders>;
    /**
     * Fetch a list of trending markets from the Morpher API.
     * @returns
     */
    getTrendingMarkets(): Promise<Record<string | number, {
        symbol: string;
        name: string;
        type: string;
        status: string;
        market_id: string;
        open: number;
        high: number;
        low: number;
        close: number;
        change_percent: number;
        is_paused: boolean;
        exchange: string;
        exchangeTimezone: string;
        exchangeOpen: string;
        exchangeClose: string;
        pause_reason?: string | undefined;
        volume?: number | undefined;
        spread?: number | undefined;
        change?: number | undefined;
        timestamp?: number | undefined;
        nextStatus?: string | undefined;
        nextStatusTimestamp?: number | undefined;
        market_delay?: number | undefined;
        sector?: string | undefined;
        limit_direction?: string | undefined;
        max_leverage?: number | undefined;
        min_position_age?: number | undefined;
        country?: string | undefined;
        market_cap?: number | undefined;
        logo_image?: number | undefined;
    }>[]>;
    /**
     * Get the portfolio details for a given ETH address.
     * @param options - The options for fetching the portfolio.
     * @param options.eth_address - The user's ETH address.
     * @returns
     */
    getPortfolio({ eth_address, }: {
        eth_address: TAddress;
    }): Promise<{
        status: "email" | "airdrop" | "kyc" | "confirmed" | "email updated" | "migrated" | "migrating";
        chain_id: number;
        timestamp: number;
        eth_address: string;
        user_id: string;
        email: string;
        current_value: never;
        cash_balance: never;
        eth_balance: never;
        tradeable_balance: never;
        locked_rewards: never;
        transferable_balance: never;
        usdc_balance: string;
        position_count: number;
        returns_rank?: number | undefined;
        order_rank?: number | undefined;
        profile_base64?: string | undefined;
    }>;
    /**
     * Fetch all the open positions for a given ETH address.
     * @param options - The options for fetching positions.
     * @param options.eth_address - The user's ETH address.
     * @param options.market_id - Optional market ID to fetch a specific position.
     * @param options.position_id - Optional position ID to fetch a specific position.
     * @returns
     */
    getPositions({ eth_address, market_id, position_id, }: {
        eth_address: TAddress;
        market_id?: string;
        position_id?: string;
    }): Promise<import('./v2.router').TPosition[]>;
    /**
     * Fetch the returns breakdown for a specific user. Used for showing portfolio charts or calculating returns over a specific period.
     * @param options - The options for fetching returns.
     * @param options.eth_address - The user's ETH address.
     * @param options.type - The period to fetch returns for ('d', 'w', 'm', 'y').
     * @returns
     */
    getReturns({ eth_address, type, }: {
        eth_address: TAddress;
        type?: "d" | "w" | "m" | "y";
    }): Promise<{
        timestamp: number;
        cash: number;
        stake: number;
        positions: number;
        total: number;
        returns: number;
    }[] | null>;
    /**
     * Fetch the leaderboard information to show where the given ETH address is on the leaderboards and the top users on each leaderboard. The leaderboards are separated by app, i.e., each app has its own leaderboards.
     * @param options - The options for fetching the leaderboard.
     * @param options.type - The type of leaderboard ('order' or 'returns').
     * @param options.eth_address - The user's ETH address.
     * @param options.app - The application identifier.
     * @returns
     */
    getLeaderboard({ type, eth_address, app, }: {
        type: "order" | "returns";
        eth_address: TAddress;
        app: string;
    }): Promise<import('./v2.router').TLeaderBoard[]>;
    /**
     * Retrieve the application-specific context for the given ETH address.
     * @param options - The options for fetching the context.
     * @param options.eth_address - The user's ETH address.
     * @param options.app - The application identifier.
     * @returns
     */
    getContext({ eth_address, app, }: {
        eth_address: TAddress;
        app: string;
    }): Promise<import('./v2.router').TContext>;
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
    setContext({ eth_address, id, app, user_name, display_name, profile_image, }: {
        eth_address: TAddress;
        id: string;
        app: string;
        user_name?: string;
        display_name?: string;
        profile_image?: string;
    }): Promise<import('./v2.router').TContext>;
    private marketSubscriptions;
    /**
     * Unsubscribe from the pricing updates for a specific market.
     * This should be done any time the subscription is no longer required or the pricing is not visible on the fronten
     * @param market_id
     * @param callback
     */
    unsubscribeFromMarket(market_id: string): void;
    /**
     * Subscribe to pricing updates for a specific market.
     * @param market_id
     * @param callback
     */
    subscribeToMarket(market_id: string, callback: any): void;
    private unsubscribeFromOrder?;
    /**
     * Subscribe to order execution updates for a specific ETH address. Used to see when an order executes, as this could be some time after it is initially placed.
     * @param eth_address
     * @param callback
     * @returns
     */
    subscribeToOrder(eth_address: string, callback: any): void;
    private orderCreating;
    private orderCreatingTimeout?;
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
    cancelOrder({ account, walletClient, publicClient, order_id, market_id, callback, }: {
        account: Account;
        walletClient: WalletClient;
        publicClient: PublicClient;
        order_id: string;
        market_id: string;
        callback?: (result: TTradeCallback) => void;
    }): Promise<void>;
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
    openPosition({ account, walletClient, publicClient, market_id, currency, direction, tradeAmount, leverage, callback, }: {
        account: Account;
        walletClient: WalletClient;
        publicClient: PublicClient;
        market_id: string;
        currency: TCurrency;
        direction: "long" | "short";
        leverage: number;
        tradeAmount: bigint;
        callback?: (result: TTradeCallback) => void;
    }): Promise<void>;
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
    setSLTP({ account, walletClient, publicClient, market_id, priceAbove, priceBelow, callback, }: {
        account: Account;
        walletClient: WalletClient;
        publicClient: PublicClient;
        market_id: string;
        priceAbove?: number;
        priceBelow?: number;
        callback?: (result: TTradeCallback) => void;
    }): Promise<void>;
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
    closePosition({ account, walletClient, publicClient, market_id, closePercentage, callback, }: {
        account: Account;
        walletClient: WalletClient;
        publicClient: PublicClient;
        market_id: string;
        closePercentage: number;
        callback?: (result: TTradeCallback) => void;
    }): Promise<void>;
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
    private executeTrade;
}
export type RouterDefinition = V2RouterDefinition;
/**
 * Format a number as a currency string (e.g., 0.00).
 * @param input
 * @returns
 */
export declare const usdFormatter: (input: any) => string;
/**
 * Format a token value for display - show only as many digits as are necessary and round the rest, e.g., 1.2345655647357 will show "1.2346" but 1234.5655647357 will show "1234.57".
 * @param input
 * @returns
 */
export declare const tokenValueFormatter: (param: any) => string;
