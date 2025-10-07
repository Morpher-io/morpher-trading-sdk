import { Account, PublicClient, WalletClient } from 'viem';
import { TAddress } from './types';

export declare const soliditySha3: (data: string) => `0x${string}`;
export declare const formatError: (error: Error) => string;
export declare const formatPosition: (position: any) => {
    _longShares: any;
    _shortShares: any;
    _meanEntryPrice: any;
    _meanEntrySpread: any;
    _meanEntryLeverage: any;
    _liquidationPrice: any;
} | null;
export declare const sendCreateOrderGasToken: (walletClient: WalletClient, publicClient: PublicClient, account: Account, oracle_address: TAddress, market: string, close_shares_amount: any, open_mph_token_amount: any, direction: boolean, leverage: any, priceAbove: any, priceBelow: any, good_until: any, good_from: any, timeOut: any, submit_date: any, transaction_data: any) => Promise<{
    transaction_hash: `0x${string}`;
    order_id: string;
}>;
export declare const sendCreateOrderSmartWallet: (walletClient: WalletClient, account: Account, oracle_address: TAddress, market: string, close_shares_amount: any, open_mph_token_amount: any, direction: boolean, leverage: any, priceAbove: any, priceBelow: any, good_until: any, good_from: any, timeOut: any, paymasterAddress: any) => Promise<{
    transaction_hash: `0x${string}`;
    order_id: string;
}>;
export declare const sendCreateOrderTokenWallet: (walletClient: WalletClient, publicClient: PublicClient, account: Account, oracle_address: TAddress, tradeTokenAddress: TAddress, morpherTokenAddress: TAddress, positionValue: BigInt, market: string, close_shares_amount: any, open_mph_token_amount: any, direction: any, leverage: any, priceAbove: any, priceBelow: any, good_until: any, good_from: any, timeOut: any, paymasterAddress: any) => Promise<{
    transaction_hash: `0x${string}`;
    order_id: string;
}>;
export declare const sendCancelOrderSmartWallet: (walletClient: WalletClient, account: Account, oracle_address: TAddress, order_id: TAddress, timeOut: any, paymasterAddress: any) => Promise<{
    transaction_hash: `0x${string}`;
    order_id: `0x${string}`;
}>;
export declare const sendCancelOrderGasless: (walletClient: WalletClient, publicClient: PublicClient, account: Account, oracle_address: TAddress, bundler: string, paymasterAddress: string, order_id: string, currentTimestamp: number) => Promise<boolean>;
export declare const sendCancelOrderDirect: (walletClient: WalletClient, publicClient: PublicClient, account: Account, oracle_address: TAddress, order_id: TAddress) => Promise<{
    transaction_hash: any;
    order_id: `0x${string}`;
}>;
export declare const sendCreateOrderDirect: (walletClient: WalletClient, publicClient: PublicClient, account: Account, oracle_address: TAddress, market: string, close_shares_amount: any, open_mph_token_amount: any, direction: boolean, leverage: any, priceAbove: any, priceBelow: any, good_until: any, good_from: any, timeOut: any, submit_date: any, transaction_data: any) => Promise<{
    transaction_hash: `0x${string}`;
    order_id: string;
}>;
export declare const sendCreateOrderGasless: (walletClient: WalletClient, publicClient: PublicClient, account: Account, oracle_address: TAddress, bundler: string, paymasterAddress: string, market: string, close_shares_amount: any, open_mph_token_amount: any, direction: any, leverage: any, priceAbove: any, priceBelow: any, good_until: any, good_from: any, timeOut: any, submit_date: any, transaction_data: any, currentTimestamp: any) => Promise<{
    transaction_hash: any;
    order_id: string;
} | undefined>;
export declare const sendCreateOrderToken: (walletClient: WalletClient, publicClient: PublicClient, account: Account, oracle_address: TAddress, tradeTokenAddress: TAddress, morpherTokenAddress: TAddress, positionValue: BigInt, market: string, close_shares_amount: any, open_mph_token_amount: any, direction: any, leverage: any, priceAbove: any, priceBelow: any, good_until: any, good_from: any, timeOut: any, submit_date: any, transaction_data: any) => Promise<{
    transaction_hash: `0x${string}`;
    order_id: string;
}>;
export declare const sendCreateOrderTokenGasless: (walletClient: WalletClient, publicClient: PublicClient, account: Account, oracle_address: TAddress, tradeTokenAddress: TAddress, bundler: string, paymasterAddress: string, market: string, close_shares_amount: any, open_mph_token_amount: any, direction: any, leverage: any, priceAbove: any, priceBelow: any, good_until: any, good_from: any, timeOut: any, submit_date: any, transaction_data: any, currentTimestamp: any) => Promise<{
    transaction_hash: any;
    order_id: string;
} | undefined>;
