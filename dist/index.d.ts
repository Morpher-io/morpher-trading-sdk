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
    constructor(endpoint: string);
    private createTradingClient;
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
    getOrders({ eth_address, tx_hash, order_id, market_id, }: {
        eth_address: TAddress;
        tx_hash?: string;
        order_id?: string;
        market_id?: string;
    }): Promise<import('./v2.router').TORders>;
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
    }>;
    getPositions({ eth_address, market_id, position_id, }: {
        eth_address: TAddress;
        market_id?: string;
        position_id?: string;
    }): Promise<import('./v2.router').TPosition[]>;
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
    private unsubscribeFromMarket?;
    subscribeToMarket(market_id: string, callback: any): void;
    private unsubscribeFromOrder?;
    subscribeToOrder(eth_address: string, callback: any): void;
    private orderCreating;
    private orderCreatingTimeout?;
    cancelOrder({ account, walletClient, publicClient, order_id, market_id, callback, }: {
        account: Account;
        walletClient: WalletClient;
        publicClient: PublicClient;
        order_id: string;
        market_id: string;
        callback?: (result: TTradeCallback) => void;
    }): Promise<void>;
    executeTrade({ account, walletClient, publicClient, market_id, currency, direction, tradeAmount, leverage, priceAbove, priceBelow, closePercentage, callback, }: {
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
    }): Promise<void>;
}
export type RouterDefinition = V2RouterDefinition;
export declare const usdFormatter: (input: any) => string;
export declare const tokenValueFormatter: (param: any) => string;
