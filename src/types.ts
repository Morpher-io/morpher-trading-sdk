
export type TExchangeRate = {
    mph_price: any;
    eth_price: any;
    usdc_price: any;
} | undefined

export type TMarketType =  "stock" | "forex" | "commodity" | "index"  // | "crypto" | "prediction" | "f1" | "mlb" | "unique" |
export type TCurrency = 'MPH' | 'USDC' | 'ETH'

export type TCurrencyDetails = {
    symbol: TCurrency;
    balance?: bigint;
    usd?: number;
    decimals?: number;
  }

export type TCurrencyList = {
  [currency in TCurrency] : TCurrencyDetails
}| undefined