import { createTRPCClient, httpBatchLink } from "@trpc/client";
import type {
  V2RouterDefinition,
} from "./v2.router";

export const getExchangeRates = async (endpointURL: string) => {
	const rpcClient = createTRPCClient<V2RouterDefinition>({
		  links: [
			httpBatchLink({
			  url: endpointURL
			}) as any,
		  ],
		});
		
	const exchangeRates = await rpcClient.getExchangeRates.query();

	return exchangeRates

}