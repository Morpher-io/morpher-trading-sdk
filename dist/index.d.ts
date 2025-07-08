import { TRPCClient } from '@trpc/client';
import { AnyRouter } from '@trpc/server';

export declare function subscribeToMarket(market_id: string): void;
export declare function createTradingClient<TRouter extends AnyRouter>(wsUrl: string): TRPCClient<TRouter>;
