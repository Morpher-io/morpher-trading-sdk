# Morpher Trading SDK

The Morpher Trading SDK provides a comprehensive library for developers to integrate with the Morpher trading platform. It allows you to execute trades, manage orders, query market data, and check portfolio status programmatically.

This SDK is built with TypeScript and utilises `viem` for blockchain interactions and `tRPC` for communicating with the Morpher backend.

For full documentation, visit [https://api-docs.morpher.com/trading-sdk](https://api-docs.morpher.com/trading-sdk).

## Installation

Install the SDK using npm or yarn:

```bash
npm install morpher-trading-sdk
```
or
```bash
yarn add morpher-trading-sdk
```

## Getting Started

Here's a quick example to get you started.

### 1. Initialise the SDK

First, you need to create an instance of the `MorpherTradeSDK` with the appropriate endpoint.

```typescript
import { MorpherTradeSDK } from 'morpher-trading-sdk';

const sdk = new MorpherTradeSDK('https://api.morpher.com/v2');

// The SDK needs to fetch its configuration. You can wait for it to be ready.
await new Promise(resolve => {
  const interval = setInterval(() => {
    if (sdk.ready) {
      clearInterval(interval);
      resolve(true);
    }
  }, 100);
});
```

### 2. Set up `viem` Clients

The SDK requires `viem` `PublicClient` and `WalletClient` instances to interact with the blockchain (e.g., sending transactions, reading contract state).

```typescript
import { createPublicClient, createWalletClient, http } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { mainnet } from 'viem/chains'; // Or your target chain

// Replace with your desired chain
const publicClient = createPublicClient({
  chain: mainnet,
  transport: http()
});

const account = privateKeyToAccount('0xYOUR_PRIVATE_KEY');
const walletClient = createWalletClient({
  account,
  chain: mainnet,
  transport: http()
});
```

### 3. Using the SDK

Now you can call the SDK methods.

```typescript
async function exampleUsage() {
  try {
    // Get a list of available stock markets
    const markets = await sdk.getMarketList({ type: 'stock' });
    console.log('Available Stock Markets:', markets);

    // Get your open positions
    const positions = await sdk.getPositions({ eth_address: account.address });
    console.log('Your Positions:', positions);

    // Get your portfolio summary
    const portfolio = await sdk.getPortfolio({ eth_address: account.address });
    console.log('Your Portfolio:', portfolio);

    // Get your daily returns
    const returns = await sdk.getReturns({ eth_address: account.address, type: 'd' });
    console.log('Your Daily Returns:', returns);

  } catch (error) {
    console.error('An error occurred:', error);
  }
}

exampleUsage();
```

## API Reference

### `new MorpherTradeSDK(endpoint: string)`
Creates a new SDK instance. The endpoint should point to the Morpher API.

### Data Fetching

#### `getMarketList({ type: TMarketType })`
Fetches a list of available markets.
- `type`: (Optional) Filter markets by type (e.g., `"stock"`, `"forex"`, `"commodity"`).

#### `getMarketData({ eth_address, market_id })`
Fetches detailed data for a specific market.
- `eth_address`: The user's Ethereum address.
- `market_id`: The ID of the market.

#### `getPositions({ eth_address, market_id?, position_id? })`
Fetches a user's open positions.
- `eth_address`: The user's Ethereum address.
- `market_id`: (Optional) Filter by market ID.
- `position_id`: (Optional) Filter by position ID.

#### `getPortfolio({ eth_address })`
Fetches the portfolio summary for a given user.
- `eth_address`: The user's Ethereum address.

#### `getReturns({ eth_address, type? })`
Fetches the portfolio returns history for a given user.
- `eth_address`: The user's Ethereum address.
- `type`: (Optional) The time frame for the returns history: `'d'` (day), `'w'` (week), `'m'` (month), or `'y'` (year). Defaults to day.

#### `getOrders({ eth_address, market_id?, order_id?, tx_hash? })`
Fetches a user's order history.
- `eth_address`: The user's Ethereum address.
- `market_id`: (Optional) Filter by market ID.
- `order_id`: (Optional) Filter by order ID.
- `tx_hash`: (Optional) Filter by transaction hash.

#### `getCurrencyList({ address, publicClient, tokenAddresses })`
Fetches balances for different currencies (ETH, USDC, MPH) for a given address.
- `address`: The user's Ethereum address.
- `publicClient`: A `viem` PublicClient instance.
- `tokenAddresses`: An array of token address objects with `symbol` and `address`.

### Trading

#### `openPosition({ ... })`
Executes a trade. This can be opening or increasing a position.
- `account`: A `viem` Account object.
- `walletClient`: A `viem` WalletClient instance.
- `publicClient`: A `viem` PublicClient instance.
- `market_id`: The ID of the market to trade.
- `currency`: The currency to use for the trade (`'MPH'`, `'USDC'`, `'ETH'`).
- `direction`: `"long"` or `"short"`.
- `leverage`: The desired leverage.
- `tradeAmount`: The amount of currency to invest.
- `callback`: (Optional) A function to call with the trade result.

#### `closePosition({ ... })`
Closes a percentage of an existing open position (reduce the position or close it if closePercentage is 100%).
- `account`: A `viem` Account object.
- `walletClient`: A `viem` WalletClient instance.
- `publicClient`: A `viem` PublicClient instance.
- `market_id`: The ID of the market of the position to close.
- `closePercentage`: The percentage of the position to close (e.g., `50` for 50%).
- `callback`: (Optional) A function to call with the result.

#### `setSLTP({ ... })`
Adds a Stop-Loss and/or Take-Profit protection to an existing position.
- `account`: A `viem` Account object.
- `walletClient`: A `viem` WalletClient instance.
- `publicClient`: A `viem` PublicClient instance.
- `market_id`: The ID of the market of the position.
- `priceAbove`: (Optional) The price for a take-profit on a long position, or a stop-loss on a short position.
- `priceBelow`: (Optional) The price for a stop-loss on a long position, or a take-profit on a short position.
- `callback`: (Optional) A function to call with the result.


#### `cancelOrder({ ... })`
Cancels a pending order.
- `account`: A `viem` Account object.
- `walletClient`: A `viem` WalletClient instance.
- `publicClient`: A `viem` PublicClient instance.
- `order_id`: The ID of the order to cancel.
- `market_id`: The ID of the market for the order.
- `callback`: (Optional) A function to call with the cancellation result.

### Subscriptions

#### `subscribeToMarket(market_id, callback)`
Subscribes to real-time price and data updates for a specific market.
- `market_id`: The ID of the market.
- `callback`: A function that will be called with new market data.

#### `subscribeToOrder(eth_address, callback)`
Subscribes to real-time updates on order executions for a user.
- `eth_address`: The user's Ethereum address.
- `callback`: A function that will be called with order updates.

## Contributing

Contributions are welcome! Please adhere to the coding conventions outlined in `CONVENTIONS.md`.
