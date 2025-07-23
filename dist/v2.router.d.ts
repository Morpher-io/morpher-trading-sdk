import * as trpc from '@trpc/server';
export interface TMarket {
    market_id: string;
    name: string;
    type: string;
    symbol: string;
    open: number;
    high: number;
    low: number;
    close: number;
    change_percent: number;
    is_paused: boolean;
    pause_reason?: string;
    volume?: number;
    spread?: number;
    change?: number;
    timestamp?: number;
    exchange: string;
    status: string;
    nextStatus?: string;
    nextStatusTimestamp?: number;
    exchangeTimezone: string;
    exchangeOpen: string;
    exchangeClose: string;
    market_delay?: number;
    sector?: string;
    limit_direction?: string;
    max_leverage?: number;
    min_position_age?: number;
    country?: string;
    market_cap?: number;
    logo_image?: number;
}
export interface TMarketData {
    [market: string]: TMarket;
}
export type TORders = TOrder[];
export type TOrder = {
    id: string;
    position_id?: string;
    eth_address: string;
    market_id?: string;
    direction: string;
    status: string;
    type: string;
    created_at: number;
    oracle_called_at?: number;
    completed_at?: number;
    tx_hash?: string;
    callback_hash?: string;
    price?: string;
    shares?: string;
    leverage?: string;
    spread?: string;
    liquidation_timestamp?: number;
    token_amount?: string;
    price_above?: string;
    price_below?: string;
    good_from?: string;
    good_until?: string;
    open_mph_token_amount?: string;
    close_shares_amount?: string;
    mph_price?: string;
    unadjusted_price?: string;
    chain_id?: number;
};
export type TPosition = {
    id: string;
    eth_address: string;
    market_id: string;
    direction: string;
    average_price: string;
    average_spread: string;
    average_leverage: string;
    long_shares: string;
    short_shares: string;
    liquidation_price?: string;
    liquidation_timestamp?: number;
    timestamp?: number;
    created_at?: number;
    chain_id?: number;
    value?: string;
    total_return?: string;
    total_return_percent?: string;
    total_interest?: string;
    logo_image?: string;
    name?: string;
    symbol?: string;
};
export interface TConfig {
    chain_id: number;
    tokenAddress: `0x${string}`;
    usdcAddress: `0x${string}`;
    stateAddress: `0x${string}`;
    oracleAddress: `0x${string}`;
    bundler: string;
    paymaster: string;
}
export type TLeaderBoard = {
    id: string;
    app: string;
    eth_address: string;
    display_name?: string;
    profile_image?: string;
    rank?: number;
    returns?: number;
    order_id?: string;
    market_name?: string;
};
export type TContext = {
    id: string;
    eth_address: string;
    user_name: string;
    display_name: string;
    profile_image: string;
};
export type StrictOHLCArray = [number, number, number, number, number];
export interface TMarketDetail extends TMarket {
    pending_order_id?: string;
    position_id?: string;
    data_minutely?: StrictOHLCArray[];
    data_hourly?: StrictOHLCArray[];
    data_daily?: StrictOHLCArray[];
}
export interface TPositionSplit {
    eth_address: `0x${string}`;
    market_id: string;
    price_above: string;
    price_below: string;
    price_multiplier: number;
    splits: any[];
}
export interface TExchangeRates {
    mph_price: string;
    eth_price: string;
    usdc_price: string;
}
export interface TPortfolio {
    user_id: string;
    eth_address: string;
    email: string;
    timestamp: number;
    status: "email" | "airdrop" | "kyc" | "confirmed" | "email updated" | "migrated" | "migrating";
    chain_id: number;
    current_value: bigint;
    cash_balance: bigint;
    eth_balance: bigint;
    tradeable_balance: bigint;
    locked_rewards: bigint;
    transferable_balance: bigint;
    usdc_balance: string;
    position_count: number;
}
export interface TPortfolioDataPoint {
    timestamp: number;
    cash: number;
    stake: number;
    positions: number;
    total: number;
    returns: number;
}
export declare const v2Router: trpc.TRPCBuiltRouter<{
    ctx: object;
    meta: object;
    errorShape: trpc.TRPCDefaultErrorShape;
    transformer: false;
}, trpc.TRPCDecorateCreateRouterOptions<{
    /**
     * Fetch current USD exchange rates for all supported tokens (MPH/ETH/USDC)
     */
    getExchangeRates: trpc.TRPCQueryProcedure<{
        input: void;
        output: TExchangeRates;
        meta: object;
    }>;
    /**
     * Fetch a list of supported markets for a given market type
     */
    getMarketList: trpc.TRPCQueryProcedure<{
        input: {
            type?: "unique" | "stock" | "crypto" | "forex" | "position" | "commodity" | "index" | "prediction" | "f1" | "mlb" | undefined;
            market_id?: string | undefined;
            cursor?: number | null | undefined;
        } | undefined;
        output: {
            markets: TMarketData;
            nextCursor: number | null;
        };
        meta: object;
    }>;
    /**
     * Fetch market detail data and history data points for a given market - normally used when a merket is selected or the market detils are required
     */
    getMarketData: trpc.TRPCQueryProcedure<{
        input: {
            eth_address: string;
            market_id: string;
        };
        output: TMarketDetail;
        meta: object;
    }>;
    /**
     *  Fetch the order history for a given eth address.
     */
    getOrders: trpc.TRPCQueryProcedure<{
        input: {
            eth_address: string;
            tx_hash?: string | undefined;
            order_id?: string | undefined;
            market_id?: string | undefined;
        } | undefined;
        output: TORders;
        meta: object;
    }>;
    /**
     *  Fetch the portfolio summary for a given eth address. The portfolio is created once the eth address "signs up" or first trades (this will auto sign up the user with no email address when the trade executes)
     */
    getPortfolio: trpc.TRPCQueryProcedure<{
        input: {
            eth_address: string;
        } | undefined;
        output: TPortfolio;
        meta: object;
    }>;
    /**
     * Fetch a list of open positions and details for a given eth address.
     */
    getPositions: trpc.TRPCQueryProcedure<{
        input: {
            eth_address: string;
            market_id?: string | undefined;
            position_id?: string | undefined;
        } | undefined;
        output: TPosition[];
        meta: object;
    }>;
    /**
     * Fetch the returns history for a given eth address. Getch the returns history for the last day, week, month or year as dpecified in the type parameter. If no type is specified then it defaults to day.
     */
    getReturns: trpc.TRPCQueryProcedure<{
        input: {
            eth_address: string;
            type?: "d" | "w" | "m" | "y" | undefined;
        };
        output: TPortfolioDataPoint[] | null;
        meta: object;
    }>;
    /**
     * Get the current value of the given position to be validated when the user creates an open or a close order. Also checks market status and current position to make sure the trade should be executable.
     */
    getPositionValue: trpc.TRPCQueryProcedure<{
        input: {
            eth_address: string;
            market_id?: string | undefined;
        } | undefined;
        output: TPosition | undefined;
        meta: object;
    }>;
    /**
     * Get the market splits for a position - to be used to display the correct opening price and position history for a position that had market splits after opening.
     */
    getPositionSplitValue: trpc.TRPCQueryProcedure<{
        input: {
            eth_address: string;
            market_id: string;
            price_above: string;
            price_below: string;
        } | undefined;
        output: TPositionSplit;
        meta: object;
    }>;
    /**
     * Get the current addresses for the tokens and relavant contracts from the backend. Also fetches the paymaster and chain info. Everything required to execute trades.
     */
    getConfig: trpc.TRPCQueryProcedure<{
        input: void;
        output: TConfig;
        meta: object;
    }>;
    /**
     * Get the external user context for a given application.
     */
    getContext: trpc.TRPCQueryProcedure<{
        input: {
            eth_address: string;
            app: string;
        };
        output: TContext;
        meta: object;
    }>;
    /**
     * Set the external user context for a given application.
     */
    setContext: trpc.TRPCMutationProcedure<{
        input: {
            eth_address: string;
            id: string;
            app: string;
            user_name?: string | undefined;
            display_name?: string | undefined;
            profile_image?: string | undefined;
        };
        output: TContext;
        meta: object;
    }>;
    /**
     * Get the leaderboard for a given application.
     */
    getLeaderboard: trpc.TRPCQueryProcedure<{
        input: {
            type: "order" | "returns";
            eth_address: string;
            app: string;
        };
        output: TLeaderBoard[];
        meta: object;
    }>;
    /**
     * Get a list of trending markets.
     */
    getTrendingMarkets: trpc.TRPCQueryProcedure<{
        input: void;
        output: TMarketData[];
        meta: object;
    }>;
}>>;
export type V2RouterDefinition = typeof v2Router;
