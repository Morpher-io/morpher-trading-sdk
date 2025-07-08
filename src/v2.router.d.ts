import * as trpc from '@trpc/server';
import { Order, Position } from '../../database/models';
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
export type StrictOHLCArray = [number, number, number, number, number];
export interface TMarketDetail extends TMarket {
    pending_order_id?: string;
    position_id?: string;
    data_minutely?: StrictOHLCArray[];
    data_hourly?: StrictOHLCArray[];
    data_daily?: StrictOHLCArray[];
}
export declare const v2Router: trpc.TRPCBuiltRouter<{
    ctx: object;
    meta: object;
    errorShape: trpc.TRPCDefaultErrorShape;
    transformer: false;
}, trpc.TRPCDecorateCreateRouterOptions<{
    getExchangeRates: trpc.TRPCQueryProcedure<{
        input: void;
        output: {
            mph_price: any;
            eth_price: any;
            usdc_price: any;
        };
        meta: object;
    }>;
    getMarketList: trpc.TRPCQueryProcedure<{
        input: {
            type?: "unique" | "stock" | "crypto" | "forex" | "commodity" | "index" | "prediction" | "f1" | "mlb" | undefined;
            market_id?: string | undefined;
            cursor?: number | null | undefined;
        } | undefined;
        output: {
            markets: {
                [key: string]: any;
            };
            nextCursor: number | null;
        };
        meta: object;
    }>;
    getMarketData: trpc.TRPCQueryProcedure<{
        input: {
            eth_address: string;
            market_id: string;
        };
        output: TMarketDetail;
        meta: object;
    }>;
    getOrders: trpc.TRPCQueryProcedure<{
        input: {
            eth_address: string;
            tx_hash?: string | undefined;
            order_id?: string | undefined;
            market_id?: string | undefined;
        } | undefined;
        output: Order[];
        meta: object;
    }>;
    getPortfolio: trpc.TRPCQueryProcedure<{
        input: {
            eth_address: string;
        } | undefined;
        output: {
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
        };
        meta: object;
    }>;
    getPositions: trpc.TRPCQueryProcedure<{
        input: {
            eth_address: string;
            market_id?: string | undefined;
            position_id?: string | undefined;
        } | undefined;
        output: Position[];
        meta: object;
    }>;
    getReturns: trpc.TRPCQueryProcedure<{
        input: {
            eth_address: string;
        };
        output: {
            timestamp: number;
            cash: number;
            stake: number;
            positions: number;
            total: number;
            returns: number;
        }[];
        meta: object;
    }>;
}>>;
export type V2RouterDefinition = typeof v2Router;
export {};
