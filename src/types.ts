
export type TExchangeRate = {
    mph_price: any;
    eth_price: any;
    usdc_price: any;
} | undefined

export type TMarketType =  "stock" | "forex" | "commodity" | "index"  // | "crypto" | "prediction" | "f1" | "mlb" | "unique" |
export type TCurrency = 'MPH' | 'USDC' | 'ETH'

export type TAddress = `0x${string}`;

export type TCurrencyDetails = {
    symbol: TCurrency;
    balance?: bigint;
    usd?: number;
    decimals?: number;
    usd_exchange_rate?: number;
  }

export type TCurrencyList = {
  [currency in TCurrency] : TCurrencyDetails
}| undefined

export interface ContractPosition {
    _longShares: bigint;
    _shortShares: bigint;
    _meanEntryPrice: bigint;
    _meanEntrySpread: bigint;
    _meanEntryLeverage: bigint;
    _liquidationPrice: bigint;
}

export type TTradeCallback = {
  result: "success" | "error";
  err?: string;
};

export interface TMessageDomain {
  name: string;
  version: string;
  chainId: number,
  verifyingContract: TAddress
}

export interface TSignMessage {
  account: TAddress,
  types: any,
  domain: TMessageDomain,
  message: any,
  primaryType: string
}