import { Account, encodeFunctionData, getAddress, getContract, hexToSignature, keccak256, parseEventLogs, parseSignature, PublicClient, toHex, WalletClient } from "viem";
import { morpherOracleAbi, morpherTokenAbi } from "./abi";
import { TAddress, TMessageDomain, TSignMessage } from "./types";
import { calculateUserOperationMaxGasCost, CandidePaymaster, MetaTransaction, SafeAccountV0_3_0 as SafeAccount } from "abstractionkit";


export const soliditySha3 = (data: string) => {
    const return_data = keccak256(toHex(data));
    return return_data
}

export const formatError = (error: Error) => {
    let errorMessage = error.message.toString() || error.toString();
    if (errorMessage.includes('TRPCClientError:')) {
        errorMessage = errorMessage.replace('TRPCClientError:', '').trim();
    }

    return errorMessage;

}

export const formatPosition = (position: any) => {
    if (!position) return null;

    if (position._longShares) {
        // Ensure all expected fields are present and are BigInts
        return {
            _longShares: BigInt(position._longShares || 0),
            _shortShares: BigInt(position._shortShares || 0),
            _meanEntryPrice: BigInt(position._meanEntryPrice || 0),
            _meanEntrySpread: BigInt(position._meanEntrySpread || 0),
            _meanEntryLeverage: BigInt(position._meanEntryLeverage || 0),
            _liquidationPrice: BigInt(position._liquidationPrice || 0),
        };

    } else {
    return {
        _longShares: position[0],
        _shortShares: position[1],
        _meanEntryPrice: position[2],
        _meanEntrySpread: position[3],
        _meanEntryLeverage: position[4],
        _liquidationPrice: position[5],
      }
    }
}


const convertToString = (object: any) => {
    if (object == null || object == undefined) {
        return null
    }
    const keys = Object.keys(object);

    keys.forEach((key) => {
        if (typeof object[key] == 'object') {
            object[key] = convertToString(object[key])
        } else {
            if (typeof object[key] == 'bigint') {

                object[key] = toHex(object[key]);
            }
        }
    })

    return object;
}

export const sendCreateOrderGasToken = async (walletClient: WalletClient, publicClient: PublicClient, account: Account, oracle_address: TAddress, market: string, close_shares_amount: any, open_mph_token_amount: any, direction: boolean, leverage: any, priceAbove: any, priceBelow: any, good_until: any, good_from: any, timeOut: any, submit_date: any, transaction_data: any) => {


    if (Number(close_shares_amount) > 0) {
        open_mph_token_amount = BigInt(0).toString()
    } else {
        open_mph_token_amount = BigInt(open_mph_token_amount).toString()
    }
    

    const createOrder = 
    {
        _marketId: market as `0x${string}`,
        _closeSharesAmount: BigInt(close_shares_amount),
        _openMPHTokenAmount: BigInt(open_mph_token_amount),
        _tradeDirection: direction,
        _orderLeverage: BigInt(leverage),
        _onlyIfPriceAbove: BigInt(priceAbove),
        _onlyIfPriceBelow: BigInt(priceBelow),
        _goodUntil: BigInt(good_until),
        _goodFrom: BigInt(good_from)
    }



    const morpherOracleContract = getContract({
        abi: morpherOracleAbi,
        address: oracle_address,
        client: { public: publicClient, wallet: walletClient },
    });

    console.log('createOrder', createOrder)

    try {
        const transaction_hash = await morpherOracleContract.write
            .createOrderFromGasToken(
                [createOrder],
                { chain: publicClient.chain, value: createOrder._openMPHTokenAmount,  gas: BigInt(2000000), account: account.address as TAddress }


            )
        console.log('transaction_hash', transaction_hash)	
        clearTimeout(timeOut);
        let order_id = '';
            
        const receipt = await publicClient.waitForTransactionReceipt({ hash: transaction_hash })
        if (receipt.status !== 'success') {
            throw new Error(`Transaction failed with status: ${receipt.status}`);
        }

         if (receipt) {
            if (
                receipt &&
                receipt.transactionHash &&
                receipt.logs
                
            ) {

                const logs = parseEventLogs({ 
                    abi: morpherOracleAbi, 
                    logs: receipt.logs,
                    eventName: ['OrderCreated'], 

                    })

                logs.forEach((log: any) => {
                    order_id = log?.args?._orderId
                })
            

            }
        }

        return { transaction_hash, order_id }
    } catch (err: any) {
        console.log('err', err.toString())
        clearTimeout(timeOut);
        throw new Error(`Transaction failed: ${formatError(err)}`);
    }

				
}

const getOracleCancelCallPermitCallData = async (walletClient: WalletClient, account: Account, oracle_address: TAddress, nonce: bigint, deadline: bigint, order_id: string) => {
    try {



        const chainId = walletClient.chain?.id || 1; // Default to mainnet if chain ID is not available

        // set the domain parameters
        const domain = {
            name: "MorpherOracle",
            version: "1",
            chainId: Number(chainId),
            verifyingContract: oracle_address
        };

        // set the Permit type parameters
        
        const types = {
            EIP712Domain: [
                {
                    name: 'name',
                    type: 'string',
                },
                {
                    name: 'version',
                    type: 'string',
                },
                {
                    name: 'chainId',
                    type: 'uint256',
                },
                {
                    name: 'verifyingContract',
                    type: 'address',
                },
            ],
            Person: [
                {
                    name: 'name',
                    type: 'string',
                },
                {
                    name: 'wallet',
                    type: 'address',
                },
            ],
            CancelOrder: [{
                name: "_orderId",
                type: "bytes32"
            },
            {
                name: "_msgSender",
                type: "address"
            },
            {
                name: "nonce",
                type: "uint256"
            },
            {
                name: "deadline",
                type: "uint256"
            },
            ],
        };


        // set the Permit type values
        
        const values = {
            _orderId: order_id,
            _msgSender: getAddress(account.address || ''),
            nonce: nonce.toString(),
            deadline: deadline.toString(),
        };

        const signature = await walletClient.signTypedData({
            account:account.address,
            domain: domain as any,
            types,
            primaryType: 'CancelOrder',
            message: values,
        });



        if (signature) {
            const hexToSig = await parseSignature(signature);
            const oracleCalldata = encodeFunctionData({
                abi: morpherOracleAbi,
                functionName: "initiateCancelOrderPermitted",
                args: [
                        order_id as TAddress, account.address as TAddress, deadline, Number(hexToSig.v), hexToSig.r, hexToSig.s]
            })


            return oracleCalldata;

        }
        return "0x";
    } catch (err) {
        console.log('error in getOracleCancelCallPermitCallData', err)
        return "0x";
    }
}

export const sendCreateOrderSmartWallet = async (walletClient: WalletClient, account: Account, oracle_address: TAddress, market: string, close_shares_amount: any, open_mph_token_amount: any, direction: boolean, leverage: any, priceAbove: any, priceBelow: any, good_until: any, good_from: any, timeOut: any, paymasterAddress: any) => {

    let order_id = '';
    let transaction_hash: TAddress = '0x';
    

    try {

        type TCreateOrderParams = [`0x${string}`, bigint, bigint, boolean, bigint, bigint, bigint, bigint, bigint]

        const createOrderParams: TCreateOrderParams = [market as `0x${string}`, BigInt(close_shares_amount), BigInt(open_mph_token_amount), direction, BigInt(leverage), BigInt(priceAbove), BigInt(priceBelow), BigInt(good_until), BigInt(good_from)				]

        const hash = await walletClient.sendCalls({
            account: account.address as TAddress,
            calls: [
                {
                    to: oracle_address,
                    abi: morpherOracleAbi,
                    functionName: 'createOrder',
                    args: createOrderParams,
                }
            ],
            capabilities: { 
                paymasterService: { 
                    url: paymasterAddress
                } 
            } 
        })

        let callResult = await walletClient.waitForCallsStatus({ 
            id: hash.id,
        })

        if (callResult.status === 'success' && callResult.receipts && callResult.receipts.length > 0) {

			transaction_hash =callResult.receipts[0].transactionHash


            clearTimeout(timeOut);
                

			const receipt = callResult.receipts[0]

            if (receipt.status !== 'success') {
                throw new Error(`Transaction failed with status: ${receipt.status}`);
            }
            window.clearTimeout(timeOut);

            // load order data (after blockchain worker has been sorted) - set completed percentage and wait for order to be created in DB
            if (receipt) {
                if (
                    receipt &&
                    receipt.transactionHash &&
                    receipt.logs
                    
                ) {

                    const logs = parseEventLogs({ 
                        abi: morpherOracleAbi, 
                        logs: receipt.logs as any,
                        eventName: ['OrderCreated'], 

                        })

                    logs.forEach((log: any) => {
                        order_id = log?.args?._orderId
                    })
                

                }
            }

   
        }

        return { transaction_hash, order_id }

    } catch (err: any) {
        console.log('err', err.toString())
        clearTimeout(timeOut);
        throw new Error(`Transaction failed: ${formatError(err)}`);
    }

}

export const sendCreateOrderTokenWallet = async (walletClient: WalletClient, publicClient: PublicClient, account: Account, oracle_address: TAddress, tradeTokenAddress: TAddress, morpherTokenAddress: TAddress, positionValue: BigInt, market: string, close_shares_amount: any, open_mph_token_amount: any, direction: any, leverage: any, priceAbove: any, priceBelow: any, good_until: any, good_from: any, timeOut: any, paymasterAddress: any) => {
			
    let order_id = '';
    let transaction_hash: TAddress = '0x';

    try {
        const deadline = Math.round(Date.now() / 1000) + 4200;

    
        const tokenContract = getContract({
            abi: morpherTokenAbi,
            address: tradeTokenAddress,
            client: { public: publicClient, wallet: walletClient },
        });

        const nonce = await tokenContract.read.nonces([account.address]);
        const name = await tokenContract.read.name([]);


        if (Number(close_shares_amount) > 0) {
            open_mph_token_amount = BigInt(0).toString()
        } else {
            open_mph_token_amount = BigInt(open_mph_token_amount).toString()
        }
        

        const createOrder = 
        {
            _marketId: market,
            _closeSharesAmount: close_shares_amount,
            _openMPHTokenAmount: open_mph_token_amount,
            _tradeDirection: direction,
            _orderLeverage: leverage,
            _onlyIfPriceAbove: priceAbove,
            _onlyIfPriceBelow: priceBelow,
            _goodUntil: good_until,
            _goodFrom: good_from
        }

        
        const chainId = walletClient.chain?.id || 1; // Default to mainnet if chain ID is not available

        let signature: any
        console.log('Number(close_shares_amount)', Number(close_shares_amount))
        if (Number(close_shares_amount) > 0) {

            const morpherTokenContract = getContract({
                abi: morpherTokenAbi,
                address: morpherTokenAddress,
                client: { public: publicClient, wallet: walletClient },
            });

            const nonce = await morpherTokenContract.read.nonces([account.address]);

            
            // set the domain parameters
            const domain:TMessageDomain = {
                name: "MorpherToken",
                version: "1",
                chainId: Number(chainId),
                verifyingContract: morpherTokenAddress as TAddress
            };

            // set the Permit type parameters
            const types = {
                EIP712Domain: [
                    {
                        name: 'name',
                        type: 'string',
                    },
                    {
                        name: 'version',
                        type: 'string',
                    },
                    {
                        name: 'chainId',
                        type: 'uint256',
                    },
                    {
                        name: 'verifyingContract',
                        type: 'address',
                    },
                ],
                Person: [
                    {
                        name: 'name',
                        type: 'string',
                    },
                    {
                        name: 'wallet',
                        type: 'address',
                    },
                ],
                Permit: [{
                    name: "owner",
                    type: "address"
                },
                {
                    name: "spender",
                    type: "address"
                },
                {
                    name: "value",
                    type: "uint256"
                },
                {
                    name: "nonce",
                    type: "uint256"
                },
                {
                    name: "deadline",
                    type: "uint256"
                },
                ],
            };

            const values = {
                owner: getAddress(account.address || ''),
                spender: getAddress(oracle_address || ''),
                value:  positionValue.toString(),
                nonce: toHex(nonce as bigint),
                deadline: deadline.toString(),
            };

            signature = await signTypedData(walletClient, { account: account.address, types, domain, message: values, primaryType: 'Permit' })


        } else {
            
            // set the domain parameters
            const domain:TMessageDomain = {
                name: name as string,
                version: "2",
                chainId: Number(chainId),
                verifyingContract: tradeTokenAddress as TAddress
            };

            // set the Permit type parameters
            const types = {
                EIP712Domain: [
                    {
                        name: 'name',
                        type: 'string',
                    },
                    {
                        name: 'version',
                        type: 'string',
                    },
                    {
                        name: 'chainId',
                        type: 'uint256',
                    },
                    {
                        name: 'verifyingContract',
                        type: 'address',
                    },
                ],
                Person: [
                    {
                        name: 'name',
                        type: 'string',
                    },
                    {
                        name: 'wallet',
                        type: 'address',
                    },
                ],
                Permit: [{
                    name: "owner",
                    type: "address"
                },
                {
                    name: "spender",
                    type: "address"
                },
                {
                    name: "value",
                    type: "uint256"
                },
                {
                    name: "nonce",
                    type: "uint256"
                },
                {
                    name: "deadline",
                    type: "uint256"
                },
                ],
            };

            const values = {
                owner: getAddress(account.address || ''),
                spender: getAddress(oracle_address || ''),
                value:  open_mph_token_amount.toString(),
                nonce: toHex(nonce as bigint),
                deadline: deadline.toString(),
            };

            signature = await signTypedData(walletClient, { account: account.address, types, domain, message: values, primaryType: 'Permit' })

        }			


        const hexToSig = await hexToSignature(signature);

        

        const tokenPermit = {
            tokenAddress: tradeTokenAddress,
            owner: getAddress(account.address || ''),
            value: open_mph_token_amount.toString(),
            minOutValue: open_mph_token_amount,
            deadline,
            v: hexToSig.v,
            r: hexToSig.r,
            s: hexToSig.s,
        }

        const hash = await walletClient.sendCalls({
            account: account.address as TAddress,
            calls: [
                {
                    to: oracle_address,
                    abi: morpherOracleAbi,
                    functionName: 'createOrderFromToken',
                    args: [createOrder as any, tokenPermit as any],
                }
            ],
            capabilities: { 
                paymasterService: { 
                    url: paymasterAddress
                } 
            } 
        })

        let callResult = await walletClient.waitForCallsStatus({ 
            id: hash.id,
        })

        if (callResult.status === 'success' && callResult.receipts && callResult.receipts.length > 0) {

			transaction_hash =callResult.receipts[0].transactionHash


            clearTimeout(timeOut);
                

			const receipt = callResult.receipts[0]

            if (receipt.status !== 'success') {
                throw new Error(`Transaction failed with status: ${receipt.status}`);
            }
            window.clearTimeout(timeOut);

            // load order data (after blockchain worker has been sorted) - set completed percentage and wait for order to be created in DB
            if (receipt) {
                if (
                    receipt &&
                    receipt.transactionHash &&
                    receipt.logs
                    
                ) {

                    const logs = parseEventLogs({ 
                        abi: morpherOracleAbi, 
                        logs: receipt.logs as any,
                        eventName: ['OrderCreated'], 

                        })

                    logs.forEach((log: any) => {
                        order_id = log?.args?._orderId
                    })
                

                }
            }

   
        }

        return { transaction_hash, order_id }

    } catch (err: any) {
        console.log('err', err.toString())
        clearTimeout(timeOut);
        throw new Error(`Transaction failed: ${formatError(err)}`);
    }

}

export const sendCancelOrderSmartWallet = async (walletClient: WalletClient, account: Account, oracle_address: TAddress, order_id: TAddress, timeOut: any, paymasterAddress: any) => {
    let transaction_hash: TAddress = '0x';

    try {
        const hash = await walletClient.sendCalls({
            account: account.address as TAddress,
            calls: [
                {
                    to: oracle_address,
                    abi: morpherOracleAbi,
                    functionName: 'initiateCancelOrder',
                    args: [order_id],
                }
            ],
            capabilities: { 
                paymasterService: { 
                    url: paymasterAddress
                } 
            } 
        })

        let callResult = await walletClient.waitForCallsStatus({ 
            id: hash.id,
        })

        if (callResult.status === 'success' && callResult.receipts && callResult.receipts.length > 0) {
            transaction_hash = callResult.receipts[0].transactionHash;
            clearTimeout(timeOut);
            const receipt = callResult.receipts[0];
            if (receipt.status !== 'success') {
                throw new Error(`Transaction failed with status: ${receipt.status}`);
            }
        }

        return { transaction_hash, order_id };

    } catch (err: any) {
        console.log('err', err.toString());
        clearTimeout(timeOut);
        throw new Error(`Transaction failed: ${formatError(err)}`);
    }
}

export const sendCancelOrderGasless = async (walletClient: WalletClient, publicClient: PublicClient, account: Account, oracle_address: TAddress, bundler: string, paymasterAddress: string, order_id: string, currentTimestamp: number) => {

    

    try {

        let smartAccount = SafeAccount.initializeNewAccount(
            [account.address.toLowerCase()],
        );
        
        const oracleContract = getContract({
            abi: morpherOracleAbi,
            address: oracle_address,
            client: { public: publicClient, wallet: walletClient },
        });

        const nonce: any = await oracleContract.read.nonces([account.address as TAddress]);

  
        const deadline = BigInt(Math.round(currentTimestamp/1000) + 180);


        const oracleCallPermitCalldata = await getOracleCancelCallPermitCallData(walletClient,account, oracle_address, nonce, deadline, order_id);

        

        if (!oracleCallPermitCalldata || oracleCallPermitCalldata == "0x") {
            throw new Error(`ORACLE_CALL_GENERATION_FAILED`);
        }


        const transaction :MetaTransaction ={
            to: oracle_address,
            value: 0n,
            data: oracleCallPermitCalldata,
        }


        //createUserOperation will determine the nonce, fetch the gas prices,
        //estimate gas limits and return a useroperation to be signed.
        //you can override all these values using the overrides parameter.
        let userOperation = await smartAccount.createUserOperation(
            [   
                transaction, //transaction2,
            ],
            publicClient.transport.url, //the node rpc is used to fetch the current nonce and fetch gas prices.
            bundler, //the bundler rpc is used to estimate the gas limits.
        )


        const sponsorshipPolicyId = ''

        
        let paymaster: CandidePaymaster = new CandidePaymaster(
            paymasterAddress
        )

        let [paymasterUserOperation, _sponsorMetadata] = await paymaster.createSponsorPaymasterUserOperation(
            userOperation, bundler, sponsorshipPolicyId) // sponsorshipPolicyId will have no effect if empty
        userOperation = paymasterUserOperation; 

        //console.log('paymasterUserOperation', paymasterUserOperation);

        const cost = calculateUserOperationMaxGasCost(paymasterUserOperation)
        const chainId = walletClient.chain?.id || 1; // Default to mainnet if chain ID is not available

        let userOperationData = SafeAccount.getUserOperationEip712Data(
            paymasterUserOperation,
            BigInt(chainId),
            {
                validAfter: BigInt(0),
                validUntil: BigInt(0),
                entrypointAddress: smartAccount.entrypointAddress,
                safe4337ModuleAddress: smartAccount.safe4337ModuleAddress,
            },
        );



        const signature = await walletClient.signTypedData({
            account: account.address,
            domain:userOperationData.domain as any,
            types:userOperationData.types,
            primaryType: 'SafeOp',
            message: userOperationData.messageValue as any,
        });



        paymasterUserOperation.signature = SafeAccount.formatEip712SignaturesToUseroperationSignature([account.address as TAddress],
            [signature],
            {
                validAfter: BigInt(0),
                validUntil: BigInt(0),
            },);



        //use the bundler rpc to send a userOperation
        //sendUserOperation will return a SendUseroperationResponse object
        //that can be awaited for the useroperation to be included onchain
        const sendUserOperationResponse = await smartAccount.sendUserOperation(
            paymasterUserOperation, bundler || ''
        );

        console.log("Useroperation sent. Waiting to be included ......")
        //included will return a UserOperationReceiptResult when 
        //useroperation is included onchain
        let userOperationReceiptResult = await sendUserOperationResponse.included()

        console.log("Useroperation receipt received.")
        console.log(userOperationReceiptResult)
        if(userOperationReceiptResult.success){
            console.log("Order cancel user operation successful. The transaction hash is : " + userOperationReceiptResult.receipt.transactionHash)
        }else{
            console.log("Useroperation execution failed")
        }

        console.log('cost', cost)


        return true

    } catch (err: any) {
        console.log('err', err.toString())
        throw new Error(`Transaction failed: ${formatError(err)}`);
    }


}

export const sendCancelOrderDirect = async (walletClient: WalletClient, publicClient: PublicClient, account: Account, oracle_address: TAddress, order_id: TAddress) => {
    let tx_hash: any = null;

    try {
         const morpherOracleContract = getContract({
            abi: morpherOracleAbi,
            address: oracle_address,
            client: { public: publicClient, wallet: walletClient },
        });


        const transaction_hash = await morpherOracleContract.write
                        .initiateCancelOrder([order_id]
                            , { chain: publicClient.chain, gas: BigInt(800000), account: account.address as TAddress }

                        )

        tx_hash = transaction_hash;
    
        const receipt = await publicClient.waitForTransactionReceipt({ hash: transaction_hash })

        if (receipt.status !== 'success') {
            throw new Error(`Transaction failed with status: ${receipt.status}`);
        }

        return { transaction_hash: tx_hash, order_id: order_id }

    } catch (err: any) {
        console.log('err', err.toString())
        throw new Error(`Transaction failed: ${formatError(err)}`);
    }

}

export const sendCreateOrderDirect = async (walletClient: WalletClient, publicClient: PublicClient, account: Account, oracle_address: TAddress, market: string, close_shares_amount: any, open_mph_token_amount: any, direction: boolean, leverage: any, priceAbove: any, priceBelow: any, good_until: any, good_from: any, timeOut: any, submit_date: any, transaction_data: any) => {

    let order_id = '';
    
    const morpherOracleContract = getContract({
        abi: morpherOracleAbi,
        address: oracle_address,
        client: { public: publicClient, wallet: walletClient },
    });
    
    try {

        type TCreateOrderParams = [`0x${string}`, bigint, bigint, boolean, bigint, bigint, bigint, bigint, bigint]

        const createOrderParams: TCreateOrderParams = [market as `0x${string}`, BigInt(close_shares_amount), BigInt(open_mph_token_amount), direction, BigInt(leverage), BigInt(priceAbove), BigInt(priceBelow), BigInt(good_until), BigInt(good_from)				]

        const transaction_hash = await morpherOracleContract.write
            .createOrder(createOrderParams
                , { chain: publicClient.chain, gas: BigInt(800000), account: account.address as TAddress }
                
                // ,
                // {
                // 	account: this.activePortfolio?.eth_address || '' as TAddress,
                // 	gasPrice: getSidechainGasPrice(this.user?.blockchain_info?.chain_id),
                // 	gas: 5000000
                // }

            )

        clearTimeout(timeOut);
            

        const receipt = await publicClient.waitForTransactionReceipt({ hash: transaction_hash })

        if (receipt.status !== 'success') {
            throw new Error(`Transaction failed with status: ${receipt.status}`);
        }
        window.clearTimeout(timeOut);

        // load order data (after blockchain worker has been sorted) - set completed percentage and wait for order to be created in DB
        if (receipt) {
            if (
                receipt &&
                receipt.transactionHash &&
                receipt.logs
                
            ) {

                const logs = parseEventLogs({ 
                    abi: morpherOracleAbi, 
                    logs: receipt.logs,
                    eventName: ['OrderCreated'], 

                    })

                logs.forEach((log: any) => {
                    order_id = log?.args?._orderId
                })
            

            }
        }

        return { transaction_hash, order_id }

    } catch (err: any) {
        console.log('err', err.toString())
        clearTimeout(timeOut);
        throw new Error(`Transaction failed: ${formatError(err)}`);
    }

}

const getOracleCallPermitCalldata = async (walletClient: WalletClient, account: Account, oracle_address: TAddress, nonce: bigint, deadline: bigint, market: string, close_shares_amount: any, open_mph_token_amount: any, direction: any, leverage: any, priceAbove: any, priceBelow: any, good_until: any, good_from: any) => {
    try {


        const chainId = walletClient.chain?.id || 1; // Default to mainnet if chain ID is not available

        // set the domain parameters
        const domain: any = {
            name: "MorpherOracle",
            version: "1",
            chainId: Number(chainId),
            verifyingContract: oracle_address 
        };

        // set the Permit type parameters
        
        const types = {
            EIP712Domain: [
                {
                    name: 'name',
                    type: 'string',
                },
                {
                    name: 'version',
                    type: 'string',
                },
                {
                    name: 'chainId',
                    type: 'uint256',
                },
                {
                    name: 'verifyingContract',
                    type: 'address',
                },
            ],
            // Person: [
            // 	{
            // 		name: 'name',
            // 		type: 'string',
            // 	},
            // 	{
            // 		name: 'wallet',
            // 		type: 'address',
            // 	},
            // ],
            CreateOrder: [{
                name: "_marketId",
                type: "bytes32"
                },
                {
                    name: "_closeSharesAmount",
                    type: "uint256"
                },
                {
                    name: "_openMPHTokenAmount",
                    type: "uint256"
                },
                {
                    name: "_msgSender",
                    type: "address"
                },
                {
                    name: "nonce",
                    type: "uint256"
                },
                {
                    name: "deadline",
                    type: "uint256"
                },
            ],
        };

        // set the Permit type values
        
        const values = {
            _marketId: market,
            _closeSharesAmount: close_shares_amount,
            _openMPHTokenAmount: open_mph_token_amount,
            _msgSender: account.address,
            nonce: nonce.toString(),
            deadline: deadline.toString(),
        };

        const signature = await walletClient.signTypedData({
                account: account.address,
                domain,
                types,
                primaryType: 'CreateOrder',
                message: values,
                });

        

        if (signature) {
            const hexToSig = await parseSignature(signature);
            const oracleCalldata = encodeFunctionData({
                abi: morpherOracleAbi,
                functionName: "createOrderPermittedBySignature",
                args: [{
                    _marketId: market as TAddress,
                    _closeSharesAmount: close_shares_amount,
                    _openMPHTokenAmount: open_mph_token_amount,
                    _tradeDirection: direction,
                    _orderLeverage: leverage,
                    _onlyIfPriceAbove: priceAbove,
                    _onlyIfPriceBelow: priceBelow,
                    _goodUntil: good_until,
                    _goodFrom: good_from
                }, account.address as TAddress, deadline, Number(hexToSig.v), hexToSig.r, hexToSig.s]
            })

            return {
                data: oracleCalldata,
                success: true,
                error: ''
            };

        }
        return {
                data: '0x',
                success: false,
                error: 'no signature'
            };
    } catch (err: any) {
        console.log('error in getOracleCallPermitCalldata', err)
        return {
            data: '0x',
            success: false,
            error: err.toString()
        };
    }
}

export const sendCreateOrderGasless = async (walletClient: WalletClient, publicClient: PublicClient, account: Account, oracle_address: TAddress, bundler: string, paymasterAddress: string, market: string, close_shares_amount: any, open_mph_token_amount: any, direction: any, leverage: any, priceAbove: any, priceBelow: any, good_until: any, good_from: any, timeOut: any, submit_date: any, transaction_data: any, currentTimestamp: any) => {


    try {

        let smartAccount = SafeAccount.initializeNewAccount(
            [account.address.toLowerCase()],
        );
        
        const oracleContract = getContract({
            abi: morpherOracleAbi,
            address: oracle_address,
            client: { public: publicClient, wallet: walletClient },
        });

        const nonce: any = await oracleContract.read.nonces([account.address as TAddress]);


        if (!currentTimestamp || currentTimestamp == 0) {
            currentTimestamp = Date.now()
        }
        const deadline = BigInt(Math.round(currentTimestamp/1000) + 180);

        const oracleCallPermitCalldata = await getOracleCallPermitCalldata(walletClient, account, oracle_address, nonce, deadline, market, close_shares_amount, open_mph_token_amount, direction, leverage, priceAbove, priceBelow, good_until, good_from);

        clearTimeout(timeOut);
        

        if (!oracleCallPermitCalldata) return;
        if (oracleCallPermitCalldata.success == false || oracleCallPermitCalldata.data == '0x') {
            clearTimeout(timeOut);
            throw new Error(oracleCallPermitCalldata.error || `ORACLE_CALL_GENERATION_FAILED`);
        }

        const chainId = walletClient.chain?.id || 1; // Default to mainnet if chain ID is not available
        
        const transaction :MetaTransaction ={
            to: oracle_address,
            value: 0n,
            data: oracleCallPermitCalldata.data,
        }


        //createUserOperation will determine the nonce, fetch the gas prices,
        //estimate gas limits and return a useroperation to be signed.
        //you can override all these values using the overrides parameter.
        let userOperation = await smartAccount.createUserOperation(
            [   
                transaction, //transaction2,
            ],
            publicClient.transport.url, //the node rpc is used to fetch the current nonce and fetch gas prices.
            bundler, //the bundler rpc is used to estimate the gas limits.
        )

        console.log('Create ORder')
        console.log(convertToString(userOperation))
        
        

            const sponsorshipPolicyId = ''

        
        let paymaster: CandidePaymaster = new CandidePaymaster(
            paymasterAddress
        )
        
        let [paymasterUserOperation, _sponsorMetadata] = await paymaster.createSponsorPaymasterUserOperation(
            userOperation, bundler, sponsorshipPolicyId) // sponsorshipPolicyId will have no effect if empty
        userOperation = paymasterUserOperation; 

        //console.log('paymasterUserOperation', paymasterUserOperation);

        const cost = calculateUserOperationMaxGasCost(paymasterUserOperation)

        let userOperationData = SafeAccount.getUserOperationEip712Data(
            paymasterUserOperation,
            BigInt(chainId),
            {
                validAfter: BigInt(0),
                validUntil: BigInt(0),
                entrypointAddress: smartAccount.entrypointAddress,
                safe4337ModuleAddress: smartAccount.safe4337ModuleAddress,
            },
        );


        const signature = await walletClient.signTypedData({
            account: account.address,
            domain:userOperationData.domain as any,
            types:userOperationData.types,
            primaryType: 'SafeOp',
            message: userOperationData.messageValue as any,
            });

        clearTimeout(timeOut);


        paymasterUserOperation.signature = SafeAccount.formatEip712SignaturesToUseroperationSignature([account.address as TAddress],
            [signature],
            {
                validAfter: BigInt(0),
                validUntil: BigInt(0),
            },);


        console.log('paymasterUserOperation',  bundler, paymasterUserOperation)

        //use the bundler rpc to send a userOperation
        //sendUserOperation will return a SendUseroperationResponse object
        //that can be awaited for the useroperation to be included onchain
        const sendUserOperationResponse = await smartAccount.sendUserOperation(
            paymasterUserOperation, bundler || ''
        );


        console.log("Useroperation sent. Waiting to be included ......")
        //included will return a UserOperationReceiptResult when 
        //useroperation is included onchain
        let userOperationReceiptResult = await sendUserOperationResponse.included()

        console.log("Useroperation receipt received.")
        console.log(userOperationReceiptResult)
        if(userOperationReceiptResult.success){
            console.log("Order create user operation successful. The transaction hash is : " + userOperationReceiptResult.receipt.transactionHash)
        }else{
            console.log("Useroperation execution failed")
        }

        console.log('cost', cost)

        const receipt = await publicClient.waitForTransactionReceipt({ hash: userOperationReceiptResult.receipt.transactionHash })

        let order_id = ''

        // load order data (after blockchain worker has been sorted) - set completed percentage and wait for order to be created in DB
        if (receipt) {
            if (
                receipt &&
                receipt.transactionHash &&
                receipt.logs
                
            ) {

                const logs = parseEventLogs({ 
                    abi: morpherOracleAbi, 
                    logs: receipt.logs,
                    eventName: ['OrderCreated'], 

                    })

                logs.forEach((log: any) => {
                    order_id = log?.args?._orderId
                })
            }
        }


        return {
            transaction_hash: userOperationReceiptResult.receipt.transactionHash,
            order_id: order_id
        }


    } catch (err: any) {
        console.log('err', err.toString())
        clearTimeout(timeOut);
        throw new Error(`Transaction failed: ${formatError(err)}`);
    }


}

const signTypedData = async (walletClient: WalletClient, message: TSignMessage) => {
	const signature = await walletClient.signTypedData(message);

	return signature


}

export const sendCreateOrderToken = async (walletClient: WalletClient, publicClient: PublicClient, account: Account, oracle_address: TAddress, tradeTokenAddress: TAddress, morpherTokenAddress: TAddress, positionValue: BigInt, market: string, close_shares_amount: any, open_mph_token_amount: any, direction: any, leverage: any, priceAbove: any, priceBelow: any, good_until: any, good_from: any, timeOut: any, submit_date: any, transaction_data: any) => {
			
    const deadline = Math.round(Date.now() / 1000) + 4200;

    
    const tokenContract = getContract({
        abi: morpherTokenAbi,
        address: tradeTokenAddress,
        client: { public: publicClient, wallet: walletClient },
    });

    const nonce = await tokenContract.read.nonces([account.address]);
    const name = await tokenContract.read.name([]);


    if (Number(close_shares_amount) > 0) {
        open_mph_token_amount = BigInt(0).toString()
    } else {
        open_mph_token_amount = BigInt(open_mph_token_amount).toString()
    }
    

    const createOrder = 
    {
        _marketId: market,
        _closeSharesAmount: close_shares_amount,
        _openMPHTokenAmount: open_mph_token_amount,
        _tradeDirection: direction,
        _orderLeverage: leverage,
        _onlyIfPriceAbove: priceAbove,
        _onlyIfPriceBelow: priceBelow,
        _goodUntil: good_until,
        _goodFrom: good_from
    }

    
    const chainId = walletClient.chain?.id || 1; // Default to mainnet if chain ID is not available

    let signature: any
    console.log('Number(close_shares_amount)', Number(close_shares_amount))
    if (Number(close_shares_amount) > 0) {

        const morpherTokenContract = getContract({
            abi: morpherTokenAbi,
            address: morpherTokenAddress,
            client: { public: publicClient, wallet: walletClient },
        });

        const nonce = await morpherTokenContract.read.nonces([account.address]);

        
        // set the domain parameters
        const domain:TMessageDomain = {
            name: "MorpherToken",
            version: "1",
            chainId: Number(chainId),
            verifyingContract: morpherTokenAddress as TAddress
        };

        // set the Permit type parameters
        const types = {
            EIP712Domain: [
                {
                    name: 'name',
                    type: 'string',
                },
                {
                    name: 'version',
                    type: 'string',
                },
                {
                    name: 'chainId',
                    type: 'uint256',
                },
                {
                    name: 'verifyingContract',
                    type: 'address',
                },
            ],
            Person: [
                {
                    name: 'name',
                    type: 'string',
                },
                {
                    name: 'wallet',
                    type: 'address',
                },
            ],
            Permit: [{
                name: "owner",
                type: "address"
            },
            {
                name: "spender",
                type: "address"
            },
            {
                name: "value",
                type: "uint256"
            },
            {
                name: "nonce",
                type: "uint256"
            },
            {
                name: "deadline",
                type: "uint256"
            },
            ],
        };

        const values = {
            owner: getAddress(account.address || ''),
            spender: getAddress(oracle_address || ''),
            value:  positionValue.toString(),
            nonce: toHex(nonce as bigint),
            deadline: deadline.toString(),
        };

        signature = await signTypedData(walletClient, { account: account.address, types, domain, message: values, primaryType: 'Permit' })


    } else {
        
        // set the domain parameters
        const domain:TMessageDomain = {
            name: name as string,
            version: "2",
            chainId: Number(chainId),
            verifyingContract: tradeTokenAddress as TAddress
        };

        // set the Permit type parameters
        const types = {
            EIP712Domain: [
                {
                    name: 'name',
                    type: 'string',
                },
                {
                    name: 'version',
                    type: 'string',
                },
                {
                    name: 'chainId',
                    type: 'uint256',
                },
                {
                    name: 'verifyingContract',
                    type: 'address',
                },
            ],
            Person: [
                {
                    name: 'name',
                    type: 'string',
                },
                {
                    name: 'wallet',
                    type: 'address',
                },
            ],
            Permit: [{
                name: "owner",
                type: "address"
            },
            {
                name: "spender",
                type: "address"
            },
            {
                name: "value",
                type: "uint256"
            },
            {
                name: "nonce",
                type: "uint256"
            },
            {
                name: "deadline",
                type: "uint256"
            },
            ],
        };

        const values = {
            owner: getAddress(account.address || ''),
            spender: getAddress(oracle_address || ''),
            value:  open_mph_token_amount.toString(),
            nonce: toHex(nonce as bigint),
            deadline: deadline.toString(),
        };

        signature = await signTypedData(walletClient, { account: account.address, types, domain, message: values, primaryType: 'Permit' })

    }			


    const hexToSig = await hexToSignature(signature);

    

    const tokenPermit = {
        tokenAddress: tradeTokenAddress,
        owner: getAddress(account.address || ''),
        value: open_mph_token_amount.toString(),
        minOutValue: open_mph_token_amount,
        deadline,
        v: hexToSig.v,
        r: hexToSig.r,
        s: hexToSig.s,
    }

  const morpherOracleContract = getContract({
        abi: morpherOracleAbi,
        address: oracle_address,
        client: { public: publicClient, wallet: walletClient },
    });

    const transaction_hash = await morpherOracleContract.write
        .createOrderFromToken(
            [createOrder as any, tokenPermit as any],
            { chain: publicClient.chain, gas: BigInt(800000), account: account.address as TAddress }
        )
    
    clearTimeout(timeOut);
        
    const receipt = await publicClient.waitForTransactionReceipt({ hash: transaction_hash })

    let order_id = '';
    if (receipt.status !== 'success') {
        throw new Error(`Transaction failed with status: ${receipt.status}`);
    }

        if (receipt) {
        if (
            receipt &&
            receipt.transactionHash &&
            receipt.logs
            
        ) {

            const logs = parseEventLogs({ 
                abi: morpherOracleAbi, 
                logs: receipt.logs,
                eventName: ['OrderCreated'], 

                })

            logs.forEach((log: any) => {
                order_id = log?.args?._orderId
            })
        

        }
    }

    return { transaction_hash, order_id }


}

const getTokenPermit = async (walletClient: WalletClient, publicClient: PublicClient, tokenAddress: TAddress, account: Account, oracle_address: TAddress, open_mph_token_amount: any) => {

    const chainId = walletClient.chain?.id || 1; // Default to mainnet if chain ID is not available

    const deadline = Math.round(Date.now() / 1000) + 4200;

    const tokenContract = getContract({
        abi: morpherTokenAbi,
        address: tokenAddress,
        client: { public: publicClient, wallet: walletClient },
    });

    const nonce = await tokenContract.read.nonces([account.address as TAddress]);
    const name = await tokenContract.read.name([]);

        // set the domain parameters
        const domain:TMessageDomain = {
            name: name as string,
            version: "2",
            chainId: Number(chainId),
            verifyingContract: tokenAddress as TAddress
        };

        // set the Permit type parameters
        const types = {
            EIP712Domain: [
                {
                    name: 'name',
                    type: 'string',
                },
                {
                    name: 'version',
                    type: 'string',
                },
                {
                    name: 'chainId',
                    type: 'uint256',
                },
                {
                    name: 'verifyingContract',
                    type: 'address',
                },
            ],
            Person: [
                {
                    name: 'name',
                    type: 'string',
                },
                {
                    name: 'wallet',
                    type: 'address',
                },
            ],
            Permit: [{
                    name: "owner",
                    type: "address"
                },
                {
                    name: "spender",
                    type: "address"
                },
                {
                    name: "value",
                    type: "uint256"
                },
                {
                    name: "nonce",
                    type: "uint256"
                },
                {
                    name: "deadline",
                    type: "uint256"
                },
            ],
        };


        const values = {
            owner: getAddress(account.address || ''),
            spender: getAddress(oracle_address || ''),
            value:  BigInt(open_mph_token_amount).toString(),
            nonce: toHex(nonce as bigint),
            deadline: deadline.toString(),
        };

        const signature = await signTypedData(walletClient, { account: getAddress(account.address || ''), types, domain, message: values, primaryType: 'Permit' })

        


    const hexToSig = await hexToSignature(signature);

    

    const tokenPermit = {
        tokenAddress: tokenAddress,
        owner: getAddress(account.address || ''),
        value: open_mph_token_amount.toString(),
        minOutValue: open_mph_token_amount,
        deadline,
        v: hexToSig.v,
        r: hexToSig.r,
        s: hexToSig.s,
    }

    return tokenPermit
}

	const getCreateOrderTokenPermit = async (
            walletClient: WalletClient, 
            publicClient: PublicClient, 
            tokenAddress: TAddress, 
            account: Account, 
            oracle_address: TAddress, 
			nonce_order_permit: bigint, 
			deadline_order_permit: bigint, 
			market_id_bytes32: string, 
			close_shares_amount_scaled: any, 
			open_mph_token_amount_unscaled: any, // This is the unscaled amount of the input token for getTokenPermit
			direction_bool: boolean, 
			leverage_scaled: any, 
			price_above_scaled: any, 
			price_below_scaled: any, 
			good_until_timestamp: any, 
			good_from_timestamp: any
		) => {
			try {
			
              
				// 1. Get the permit for the input token
				const inputTokenPermit = await getTokenPermit(walletClient, publicClient, tokenAddress, account, oracle_address, open_mph_token_amount_unscaled);
				if (!inputTokenPermit) {
					throw new Error('Failed to get input token permit');
				}

				const chainId = walletClient.chain?.id || 1; // Default to mainnet if chain ID is not available
				const oracleAddress = oracle_address;
				const userAddress = account.address;

				// This is the scaled MPH amount for the order struct and signature.
				// Assuming open_mph_token_amount_unscaled can be directly scaled to an 18-decimal MPH value if it's not already.
				// For consistency with how sendCreateOrderGasless prepares amounts, we'll scale the unscaled input.
				// This part might need adjustment depending on whether open_mph_token_amount_unscaled is already MPH or needs conversion.
				const open_mph_amount_for_order_scaled = BigInt((Number(open_mph_token_amount_unscaled) / 10**6) * 10**18).toString()

				// 2. Prepare EIP-712 domain and types for CreateOrder signature
				const domain_order: TMessageDomain = {
					name: "MorpherOracle",
					version: "1",
					chainId: Number(chainId),
					verifyingContract: oracleAddress,
				};

				const types_order = {
					EIP712Domain: [
						{ name: 'name', type: 'string' },
						{ name: 'version', type: 'string' },
						{ name: 'chainId', type: 'uint256' },
						{ name: 'verifyingContract', type: 'address' },
					],
					CreateOrder: [
						{ name: "_marketId", type: "bytes32" },
						{ name: "_closeSharesAmount", type: "uint256" },
						{ name: "_openMPHTokenAmount", type: "uint256" },
						{ name: "_msgSender", type: "address" },
						{ name: "nonce", type: "uint256" },
						{ name: "deadline", type: "uint256" },
					],
				};

				// 3. Prepare EIP-712 message values for CreateOrder signature
				const values_order = {
					_marketId: market_id_bytes32, // Expected to be bytes32
					_closeSharesAmount: close_shares_amount_scaled.toString(),
					_openMPHTokenAmount: open_mph_amount_for_order_scaled.toString(), // Scaled MPH amount
					_msgSender: userAddress,
					nonce: nonce_order_permit.toString(),
					deadline: deadline_order_permit.toString(),
				};

				// 4. Sign the CreateOrder message
				const signature_order_hex = await signTypedData(walletClient, {
					account: userAddress,
					domain: domain_order,
					types: types_order,
					primaryType: 'CreateOrder',
					message: values_order,
				});

				if (!signature_order_hex) {
					throw new Error('Failed to sign CreateOrder message');
					return null;
				}

				// 5. Parse the signature
				const hexToSig_order = await parseSignature(signature_order_hex);

				// 6. Prepare the CreateOrderStruct (this is what's passed to the contract function, without nonce/deadline/_msgSender)
				const createOrderParamsStruct = {
					_marketId: market_id_bytes32 as TAddress, // Ensure it's typed as THexString if it's bytes32
					_closeSharesAmount: BigInt(close_shares_amount_scaled),
					_openMPHTokenAmount: BigInt(open_mph_amount_for_order_scaled), // Scaled MPH amount
					_tradeDirection: direction_bool,
					_orderLeverage: BigInt(leverage_scaled),
					_onlyIfPriceAbove: BigInt(price_above_scaled),
					_onlyIfPriceBelow: BigInt(price_below_scaled),
					_goodUntil: BigInt(good_until_timestamp),
					_goodFrom: BigInt(good_from_timestamp),
				};

				// 7. Prepare the inputTokenPermit struct for ABI encoding
				// Note: inputTokenPermit.value is already a scaled string. minOutValue is overridden here.
				const inputTokenPermitStructForAbi = {
					tokenAddress: inputTokenPermit.tokenAddress as TAddress,
					owner: inputTokenPermit.owner as TAddress,
					value: BigInt(inputTokenPermit.value),
					minOutValue: BigInt(open_mph_amount_for_order_scaled), // Scaled MPH amount expected
					deadline: BigInt(inputTokenPermit.deadline),
					v: Number(inputTokenPermit.v), // Ensure v is uint8
					r: inputTokenPermit.r as TAddress,
					s: inputTokenPermit.s as TAddress,
				};


				// 8. Encode function data for createOrderFromToken
				const oracleCalldata = encodeFunctionData({
					abi: morpherOracleAbi,
					functionName: 'createOrderFromToken',
					args: [
						createOrderParamsStruct,
						inputTokenPermitStructForAbi,
						userAddress,
						deadline_order_permit, // This is the deadline used for the CreateOrder EIP-712 signature (bigint)
						Number(hexToSig_order.v), // v from CreateOrder signature (uint8)
						hexToSig_order.r,       // r from CreateOrder signature (bytes32)
						hexToSig_order.s,       // s from CreateOrder signature (bytes32)
					],
				});
				
				return oracleCalldata;

			} catch (err: any) {
				console.error('Error in getCreateOrderTokenPermit:', err);
                throw new Error(`GET_CREATE_ORDER_TOKEN_PERMIT_FAILED: ${err.message || 'Unknown error'}`);

			}
		}

export const sendCreateOrderTokenGasless = async (walletClient: WalletClient, publicClient: PublicClient, account: Account, oracle_address: TAddress, tradeTokenAddress: TAddress, bundler: string, paymasterAddress: string, market: string, close_shares_amount: any, open_mph_token_amount: any, direction: any, leverage: any, priceAbove: any, priceBelow: any, good_until: any, good_from: any, timeOut: any, submit_date: any, transaction_data: any, currentTimestamp: any) => {
   
    try {

        let smartAccount = SafeAccount.initializeNewAccount(
            [account.address.toLowerCase()],
        );

        
        const oracleContract = getContract({
            abi: morpherOracleAbi,
            address: oracle_address,
            client: { public: publicClient, wallet: walletClient },
        });

        const nonce: any = await oracleContract.read.nonces([account.address as TAddress]);


        if (!currentTimestamp || currentTimestamp == 0) {
            currentTimestamp = Date.now()
        }
        const deadline = BigInt(Math.round(currentTimestamp/1000) + 180);

        const oracleCallPermitCalldata = await getCreateOrderTokenPermit(walletClient, publicClient, tradeTokenAddress, account, oracle_address, nonce, deadline, market, close_shares_amount, open_mph_token_amount, direction, leverage, priceAbove, priceBelow, good_until, good_from);

        clearTimeout(timeOut);
        

        if (!oracleCallPermitCalldata) return;
        if (oracleCallPermitCalldata == "0x") {
            clearTimeout(timeOut);
            throw new Error(`ORACLE_CALL_GENERATION_FAILED`);
        }

        const chainId = walletClient.chain?.id || 1; // Default to mainnet if chain ID is not available
        const transaction :MetaTransaction ={
            to: oracle_address|| '0x00',
            value: 0n,
            data: oracleCallPermitCalldata,
        }


        //createUserOperation will determine the nonce, fetch the gas prices,
        //estimate gas limits and return a useroperation to be signed.
        //you can override all these values using the overrides parameter.
         let userOperation = await smartAccount.createUserOperation(
            [   
                transaction, //transaction2,
            ],
            publicClient.transport.url, //the node rpc is used to fetch the current nonce and fetch gas prices.
            bundler, //the bundler rpc is used to estimate the gas limits.
        )

        console.log('Create ORder Token')
        console.log(convertToString(userOperation))


            const sponsorshipPolicyId = ''

        
        let paymaster: CandidePaymaster = new CandidePaymaster(
            paymasterAddress
        )
        
        let [paymasterUserOperation, _sponsorMetadata] = await paymaster.createSponsorPaymasterUserOperation(
            userOperation, bundler, sponsorshipPolicyId) // sponsorshipPolicyId will have no effect if empty
        userOperation = paymasterUserOperation; 

        //console.log('paymasterUserOperation', paymasterUserOperation);

        const cost = calculateUserOperationMaxGasCost(paymasterUserOperation)

        let userOperationData = SafeAccount.getUserOperationEip712Data(
            paymasterUserOperation,
            BigInt(chainId),
            {
                validAfter: BigInt(0),
                validUntil: BigInt(0),
                entrypointAddress: smartAccount.entrypointAddress,
                safe4337ModuleAddress: smartAccount.safe4337ModuleAddress,
            },
        );

        const signature = await walletClient.signTypedData({
            account: account.address,
            domain: userOperationData.domain as any,
            types:userOperationData.types,
            primaryType: 'SafeOp',
            message: userOperationData.messageValue as any
        });

        clearTimeout(timeOut);
            

        paymasterUserOperation.signature = SafeAccount.formatEip712SignaturesToUseroperationSignature([account.address as TAddress],
            [signature],
            {
                validAfter: BigInt(0),
                validUntil: BigInt(0),
            },);


        //use the bundler rpc to send a userOperation
        //sendUserOperation will return a SendUseroperationResponse object
        //that can be awaited for the useroperation to be included onchain
        const sendUserOperationResponse = await smartAccount.sendUserOperation(
            paymasterUserOperation, bundler || ''
        );


        console.log("Useroperation sent. Waiting to be included ......")
        //included will return a UserOperationReceiptResult when 
        //useroperation is included onchain
        let userOperationReceiptResult = await sendUserOperationResponse.included()

        console.log("Useroperation receipt received.")
        console.log(userOperationReceiptResult)
        if(userOperationReceiptResult.success){
            console.log("Order create user operation successful. The transaction hash is : " + userOperationReceiptResult.receipt.transactionHash)
        }else{
            console.log("Useroperation execution failed")
        }

        console.log('cost', cost)

        const receipt = await publicClient.waitForTransactionReceipt({ hash: userOperationReceiptResult.receipt.transactionHash })

        let order_id = ''

        // load order data (after blockchain worker has been sorted) - set completed percentage and wait for order to be created in DB
        if (receipt) {
            if (
                receipt &&
                receipt.transactionHash &&
                receipt.logs
            ) {
                const logs = parseEventLogs({ 
                    abi: morpherOracleAbi, 
                    logs: receipt.logs,
                    eventName: ['OrderCreated'], 

                    })

                logs.forEach((log: any) => {
                    order_id = log?.args?._orderId
                })
            }
        }

        return {
            transaction_hash: userOperationReceiptResult.receipt.transactionHash,
            order_id: order_id
        }
  
    } catch (err: any) {
        console.log('err', err.toString())
        clearTimeout(timeOut);
        throw new Error(`Transaction failed: ${formatError(err)}`);
    }
}
