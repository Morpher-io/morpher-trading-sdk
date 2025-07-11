export const morpherOracleAbi = [
	{
	  "type": "function",
	  "name": "_CANCEL_ORDER_TYPEHASH",
	  "inputs": [],
	  "outputs": [{ "name": "", "type": "bytes32", "internalType": "bytes32" }],
	  "stateMutability": "view"
	},
	{
	  "type": "function",
	  "name": "_PERMIT_TYPEHASH",
	  "inputs": [],
	  "outputs": [{ "name": "", "type": "bytes32", "internalType": "bytes32" }],
	  "stateMutability": "view"
	},
	{
	  "type": "function",
	  "name": "__callback",
	  "inputs": [
		{ "name": "_orderId", "type": "bytes32", "internalType": "bytes32" },
		{ "name": "_price", "type": "uint256", "internalType": "uint256" },
		{
		  "name": "_unadjustedMarketPrice",
		  "type": "uint256",
		  "internalType": "uint256"
		},
		{ "name": "_spread", "type": "uint256", "internalType": "uint256" },
		{
		  "name": "_liquidationTimestamp",
		  "type": "uint256",
		  "internalType": "uint256"
		},
		{ "name": "_timeStamp", "type": "uint256", "internalType": "uint256" },
		{
		  "name": "_gasForNextCallback",
		  "type": "uint256",
		  "internalType": "uint256"
		}
	  ],
	  "outputs": [
		{
		  "name": "createdPosition",
		  "type": "tuple",
		  "internalType": "struct MorpherTradeEngine.position",
		  "components": [
			{
			  "name": "lastUpdated",
			  "type": "uint256",
			  "internalType": "uint256"
			},
			{
			  "name": "longShares",
			  "type": "uint256",
			  "internalType": "uint256"
			},
			{
			  "name": "shortShares",
			  "type": "uint256",
			  "internalType": "uint256"
			},
			{
			  "name": "meanEntryPrice",
			  "type": "uint256",
			  "internalType": "uint256"
			},
			{
			  "name": "meanEntrySpread",
			  "type": "uint256",
			  "internalType": "uint256"
			},
			{
			  "name": "meanEntryLeverage",
			  "type": "uint256",
			  "internalType": "uint256"
			},
			{
			  "name": "liquidationPrice",
			  "type": "uint256",
			  "internalType": "uint256"
			},
			{
			  "name": "positionHash",
			  "type": "bytes32",
			  "internalType": "bytes32"
			}
		  ]
		}
	  ],
	  "stateMutability": "nonpayable"
	},
	{
	  "type": "function",
	  "name": "adminLiquidationOrder",
	  "inputs": [
		{ "name": "_address", "type": "address", "internalType": "address" },
		{ "name": "_marketId", "type": "bytes32", "internalType": "bytes32" }
	  ],
	  "outputs": [
		{ "name": "_orderId", "type": "bytes32", "internalType": "bytes32" }
	  ],
	  "stateMutability": "nonpayable"
	},
	{
	  "type": "function",
	  "name": "callBackAddress",
	  "inputs": [{ "name": "", "type": "address", "internalType": "address" }],
	  "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
	  "stateMutability": "view"
	},
	{
	  "type": "function",
	  "name": "callBackCollectionAddress",
	  "inputs": [],
	  "outputs": [
		{ "name": "", "type": "address", "internalType": "address payable" }
	  ],
	  "stateMutability": "view"
	},
	{
	  "type": "function",
	  "name": "cancelOrder",
	  "inputs": [
		{ "name": "_orderId", "type": "bytes32", "internalType": "bytes32" }
	  ],
	  "outputs": [],
	  "stateMutability": "nonpayable"
	},
	{
	  "type": "function",
	  "name": "checkOrderConditions",
	  "inputs": [
		{ "name": "_orderId", "type": "bytes32", "internalType": "bytes32" },
		{ "name": "_price", "type": "uint256", "internalType": "uint256" }
	  ],
	  "outputs": [
		{ "name": "_conditionsMet", "type": "bool", "internalType": "bool" }
	  ],
	  "stateMutability": "view"
	},
	{
	  "type": "function",
	  "name": "createLiquidationOrder",
	  "inputs": [
		{ "name": "_address", "type": "address", "internalType": "address" },
		{ "name": "_marketId", "type": "bytes32", "internalType": "bytes32" }
	  ],
	  "outputs": [
		{ "name": "_orderId", "type": "bytes32", "internalType": "bytes32" }
	  ],
	  "stateMutability": "payable"
	},
	{
	  "type": "function",
	  "name": "createOrder",
	  "inputs": [
		{
		  "name": "createOrderParams",
		  "type": "tuple",
		  "internalType": "struct MorpherOracle.CreateOrderStruct",
		  "components": [
			{
			  "name": "_marketId",
			  "type": "bytes32",
			  "internalType": "bytes32"
			},
			{
			  "name": "_closeSharesAmount",
			  "type": "uint256",
			  "internalType": "uint256"
			},
			{
			  "name": "_openMPHTokenAmount",
			  "type": "uint256",
			  "internalType": "uint256"
			},
			{
			  "name": "_tradeDirection",
			  "type": "bool",
			  "internalType": "bool"
			},
			{
			  "name": "_orderLeverage",
			  "type": "uint256",
			  "internalType": "uint256"
			},
			{
			  "name": "_onlyIfPriceAbove",
			  "type": "uint256",
			  "internalType": "uint256"
			},
			{
			  "name": "_onlyIfPriceBelow",
			  "type": "uint256",
			  "internalType": "uint256"
			},
			{
			  "name": "_goodUntil",
			  "type": "uint256",
			  "internalType": "uint256"
			},
			{
			  "name": "_goodFrom",
			  "type": "uint256",
			  "internalType": "uint256"
			}
		  ]
		}
	  ],
	  "outputs": [
		{ "name": "_orderId", "type": "bytes32", "internalType": "bytes32" }
	  ],
	  "stateMutability": "payable"
	},
	{
	  "type": "function",
	  "name": "createOrder",
	  "inputs": [
		{ "name": "_marketId", "type": "bytes32", "internalType": "bytes32" },
		{
		  "name": "_closeSharesAmount",
		  "type": "uint256",
		  "internalType": "uint256"
		},
		{
		  "name": "_openMPHTokenAmount",
		  "type": "uint256",
		  "internalType": "uint256"
		},
		{ "name": "_tradeDirection", "type": "bool", "internalType": "bool" },
		{
		  "name": "_orderLeverage",
		  "type": "uint256",
		  "internalType": "uint256"
		},
		{
		  "name": "_onlyIfPriceAbove",
		  "type": "uint256",
		  "internalType": "uint256"
		},
		{
		  "name": "_onlyIfPriceBelow",
		  "type": "uint256",
		  "internalType": "uint256"
		},
		{ "name": "_goodUntil", "type": "uint256", "internalType": "uint256" },
		{ "name": "_goodFrom", "type": "uint256", "internalType": "uint256" }
	  ],
	  "outputs": [
		{ "name": "_orderId", "type": "bytes32", "internalType": "bytes32" }
	  ],
	  "stateMutability": "payable"
	},
	{
	  "type": "function",
	  "name": "createOrderFromGasToken",
	  "inputs": [
		{
		  "name": "createOrderParams",
		  "type": "tuple",
		  "internalType": "struct MorpherOracle.CreateOrderStruct",
		  "components": [
			{
			  "name": "_marketId",
			  "type": "bytes32",
			  "internalType": "bytes32"
			},
			{
			  "name": "_closeSharesAmount",
			  "type": "uint256",
			  "internalType": "uint256"
			},
			{
			  "name": "_openMPHTokenAmount",
			  "type": "uint256",
			  "internalType": "uint256"
			},
			{
			  "name": "_tradeDirection",
			  "type": "bool",
			  "internalType": "bool"
			},
			{
			  "name": "_orderLeverage",
			  "type": "uint256",
			  "internalType": "uint256"
			},
			{
			  "name": "_onlyIfPriceAbove",
			  "type": "uint256",
			  "internalType": "uint256"
			},
			{
			  "name": "_onlyIfPriceBelow",
			  "type": "uint256",
			  "internalType": "uint256"
			},
			{
			  "name": "_goodUntil",
			  "type": "uint256",
			  "internalType": "uint256"
			},
			{
			  "name": "_goodFrom",
			  "type": "uint256",
			  "internalType": "uint256"
			}
		  ]
		}
	  ],
	  "outputs": [
		{ "name": "orderId", "type": "bytes32", "internalType": "bytes32" }
	  ],
	  "stateMutability": "payable"
	},
	{
	  "type": "function",
	  "name": "createOrderFromToken",
	  "inputs": [
		{
		  "name": "createOrderParams",
		  "type": "tuple",
		  "internalType": "struct MorpherOracle.CreateOrderStruct",
		  "components": [
			{
			  "name": "_marketId",
			  "type": "bytes32",
			  "internalType": "bytes32"
			},
			{
			  "name": "_closeSharesAmount",
			  "type": "uint256",
			  "internalType": "uint256"
			},
			{
			  "name": "_openMPHTokenAmount",
			  "type": "uint256",
			  "internalType": "uint256"
			},
			{
			  "name": "_tradeDirection",
			  "type": "bool",
			  "internalType": "bool"
			},
			{
			  "name": "_orderLeverage",
			  "type": "uint256",
			  "internalType": "uint256"
			},
			{
			  "name": "_onlyIfPriceAbove",
			  "type": "uint256",
			  "internalType": "uint256"
			},
			{
			  "name": "_onlyIfPriceBelow",
			  "type": "uint256",
			  "internalType": "uint256"
			},
			{
			  "name": "_goodUntil",
			  "type": "uint256",
			  "internalType": "uint256"
			},
			{
			  "name": "_goodFrom",
			  "type": "uint256",
			  "internalType": "uint256"
			}
		  ]
		},
		{
		  "name": "inputToken",
		  "type": "tuple",
		  "internalType": "struct MorpherOracle.TokenPermitEIP712Struct",
		  "components": [
			{
			  "name": "tokenAddress",
			  "type": "address",
			  "internalType": "address"
			},
			{ "name": "owner", "type": "address", "internalType": "address" },
			{ "name": "value", "type": "uint256", "internalType": "uint256" },
			{
			  "name": "minOutValue",
			  "type": "uint256",
			  "internalType": "uint256"
			},
			{
			  "name": "deadline",
			  "type": "uint256",
			  "internalType": "uint256"
			},
			{ "name": "v", "type": "uint8", "internalType": "uint8" },
			{ "name": "r", "type": "bytes32", "internalType": "bytes32" },
			{ "name": "s", "type": "bytes32", "internalType": "bytes32" }
		  ]
		}
	  ],
	  "outputs": [],
	  "stateMutability": "nonpayable"
	},
	{
	  "type": "function",
	  "name": "createOrderFromToken",
	  "inputs": [
		{
		  "name": "createOrderParams",
		  "type": "tuple",
		  "internalType": "struct MorpherOracle.CreateOrderStruct",
		  "components": [
			{
			  "name": "_marketId",
			  "type": "bytes32",
			  "internalType": "bytes32"
			},
			{
			  "name": "_closeSharesAmount",
			  "type": "uint256",
			  "internalType": "uint256"
			},
			{
			  "name": "_openMPHTokenAmount",
			  "type": "uint256",
			  "internalType": "uint256"
			},
			{
			  "name": "_tradeDirection",
			  "type": "bool",
			  "internalType": "bool"
			},
			{
			  "name": "_orderLeverage",
			  "type": "uint256",
			  "internalType": "uint256"
			},
			{
			  "name": "_onlyIfPriceAbove",
			  "type": "uint256",
			  "internalType": "uint256"
			},
			{
			  "name": "_onlyIfPriceBelow",
			  "type": "uint256",
			  "internalType": "uint256"
			},
			{
			  "name": "_goodUntil",
			  "type": "uint256",
			  "internalType": "uint256"
			},
			{
			  "name": "_goodFrom",
			  "type": "uint256",
			  "internalType": "uint256"
			}
		  ]
		},
		{
		  "name": "inputToken",
		  "type": "tuple",
		  "internalType": "struct MorpherOracle.TokenPermitEIP712Struct",
		  "components": [
			{
			  "name": "tokenAddress",
			  "type": "address",
			  "internalType": "address"
			},
			{ "name": "owner", "type": "address", "internalType": "address" },
			{ "name": "value", "type": "uint256", "internalType": "uint256" },
			{
			  "name": "minOutValue",
			  "type": "uint256",
			  "internalType": "uint256"
			},
			{
			  "name": "deadline",
			  "type": "uint256",
			  "internalType": "uint256"
			},
			{ "name": "v", "type": "uint8", "internalType": "uint8" },
			{ "name": "r", "type": "bytes32", "internalType": "bytes32" },
			{ "name": "s", "type": "bytes32", "internalType": "bytes32" }
		  ]
		},
		{
		  "name": "_addressPositionOwner",
		  "type": "address",
		  "internalType": "address"
		},
		{ "name": "deadline", "type": "uint256", "internalType": "uint256" },
		{ "name": "v", "type": "uint8", "internalType": "uint8" },
		{ "name": "r", "type": "bytes32", "internalType": "bytes32" },
		{ "name": "s", "type": "bytes32", "internalType": "bytes32" }
	  ],
	  "outputs": [],
	  "stateMutability": "nonpayable"
	},
	{
	  "type": "function",
	  "name": "createOrderPermittedBySignature",
	  "inputs": [
		{
		  "name": "createOrderParams",
		  "type": "tuple",
		  "internalType": "struct MorpherOracle.CreateOrderStruct",
		  "components": [
			{
			  "name": "_marketId",
			  "type": "bytes32",
			  "internalType": "bytes32"
			},
			{
			  "name": "_closeSharesAmount",
			  "type": "uint256",
			  "internalType": "uint256"
			},
			{
			  "name": "_openMPHTokenAmount",
			  "type": "uint256",
			  "internalType": "uint256"
			},
			{
			  "name": "_tradeDirection",
			  "type": "bool",
			  "internalType": "bool"
			},
			{
			  "name": "_orderLeverage",
			  "type": "uint256",
			  "internalType": "uint256"
			},
			{
			  "name": "_onlyIfPriceAbove",
			  "type": "uint256",
			  "internalType": "uint256"
			},
			{
			  "name": "_onlyIfPriceBelow",
			  "type": "uint256",
			  "internalType": "uint256"
			},
			{
			  "name": "_goodUntil",
			  "type": "uint256",
			  "internalType": "uint256"
			},
			{
			  "name": "_goodFrom",
			  "type": "uint256",
			  "internalType": "uint256"
			}
		  ]
		},
		{
		  "name": "_addressPositionOwner",
		  "type": "address",
		  "internalType": "address"
		},
		{ "name": "deadline", "type": "uint256", "internalType": "uint256" },
		{ "name": "v", "type": "uint8", "internalType": "uint8" },
		{ "name": "r", "type": "bytes32", "internalType": "bytes32" },
		{ "name": "s", "type": "bytes32", "internalType": "bytes32" }
	  ],
	  "outputs": [
		{ "name": "orderId", "type": "bytes32", "internalType": "bytes32" }
	  ],
	  "stateMutability": "nonpayable"
	},
	{
	  "type": "function",
	  "name": "initiateCancelOrder",
	  "inputs": [
		{ "name": "_orderId", "type": "bytes32", "internalType": "bytes32" }
	  ],
	  "outputs": [],
	  "stateMutability": "nonpayable"
	},
	{
	  "type": "function",
	  "name": "initiateCancelOrderPermitted",
	  "inputs": [
		{ "name": "_orderId", "type": "bytes32", "internalType": "bytes32" },
		{ "name": "_owner", "type": "address", "internalType": "address" },
		{ "name": "deadline", "type": "uint256", "internalType": "uint256" },
		{ "name": "v", "type": "uint8", "internalType": "uint8" },
		{ "name": "r", "type": "bytes32", "internalType": "bytes32" },
		{ "name": "s", "type": "bytes32", "internalType": "bytes32" }
	  ],
	  "outputs": [],
	  "stateMutability": "nonpayable"
	},
	{
	  "type": "function",
	  "name": "nonces",
	  "inputs": [
		{ "name": "owner", "type": "address", "internalType": "address" }
	  ],
	  "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
	  "stateMutability": "view"
	},
	{
	  "type": "function",
	  "name": "orderCancellationRequested",
	  "inputs": [{ "name": "", "type": "bytes32", "internalType": "bytes32" }],
	  "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
	  "stateMutability": "view"
	},
	{
	  "type": "function",
	  "name": "setCallbackCollectionAddress",
	  "inputs": [
		{
		  "name": "_address",
		  "type": "address",
		  "internalType": "address payable"
		}
	  ],
	  "outputs": [],
	  "stateMutability": "nonpayable"
	},
	{
	  "type": "function",
	  "name": "setMorpherSwapHelperAddress",
	  "inputs": [
		{
		  "name": "_helperAddress",
		  "type": "address",
		  "internalType": "address"
		}
	  ],
	  "outputs": [],
	  "stateMutability": "nonpayable"
	},
	{
	  "type": "function",
	  "name": "setStateAddress",
	  "inputs": [
		{ "name": "_address", "type": "address", "internalType": "address" }
	  ],
	  "outputs": [],
	  "stateMutability": "nonpayable"
	},
	{
	  "type": "function",
	  "name": "uniswapRouter",
	  "inputs": [],
	  "outputs": [{ "name": "", "type": "address", "internalType": "address" }],
	  "stateMutability": "view"
	},
	{
	  "type": "function",
	  "name": "useWhiteList",
	  "inputs": [],
	  "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
	  "stateMutability": "view"
	},
	{
	  "type": "function",
	  "name": "wMaticAddress",
	  "inputs": [],
	  "outputs": [{ "name": "", "type": "address", "internalType": "address" }],
	  "stateMutability": "view"
	},
	{
	  "type": "function",
	  "name": "whiteList",
	  "inputs": [{ "name": "", "type": "address", "internalType": "address" }],
	  "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
	  "stateMutability": "view"
	},
	{
	  "type": "event",
	  "name": "AddressBlackListed",
	  "inputs": [
		{
		  "name": "_address",
		  "type": "address",
		  "indexed": false,
		  "internalType": "address"
		}
	  ],
	  "anonymous": false
	},
	{
	  "type": "event",
	  "name": "AddressWhiteListed",
	  "inputs": [
		{
		  "name": "_address",
		  "type": "address",
		  "indexed": false,
		  "internalType": "address"
		}
	  ],
	  "anonymous": false
	},
	{
	  "type": "event",
	  "name": "AdminLiquidationOrderCreated",
	  "inputs": [
		{
		  "name": "_orderId",
		  "type": "bytes32",
		  "indexed": true,
		  "internalType": "bytes32"
		},
		{
		  "name": "_address",
		  "type": "address",
		  "indexed": true,
		  "internalType": "address"
		},
		{
		  "name": "_marketId",
		  "type": "bytes32",
		  "indexed": true,
		  "internalType": "bytes32"
		},
		{
		  "name": "_closeSharesAmount",
		  "type": "uint256",
		  "indexed": false,
		  "internalType": "uint256"
		},
		{
		  "name": "_openMPHTokenAmount",
		  "type": "uint256",
		  "indexed": false,
		  "internalType": "uint256"
		},
		{
		  "name": "_tradeDirection",
		  "type": "bool",
		  "indexed": false,
		  "internalType": "bool"
		},
		{
		  "name": "_orderLeverage",
		  "type": "uint256",
		  "indexed": false,
		  "internalType": "uint256"
		}
	  ],
	  "anonymous": false
	},
	{
	  "type": "event",
	  "name": "AdminOrderCancelled",
	  "inputs": [
		{
		  "name": "_orderId",
		  "type": "bytes32",
		  "indexed": true,
		  "internalType": "bytes32"
		},
		{
		  "name": "_sender",
		  "type": "address",
		  "indexed": true,
		  "internalType": "address"
		},
		{
		  "name": "_oracleAddress",
		  "type": "address",
		  "indexed": true,
		  "internalType": "address"
		}
	  ],
	  "anonymous": false
	},
	{
	  "type": "event",
	  "name": "LiquidationOrderCreated",
	  "inputs": [
		{
		  "name": "_orderId",
		  "type": "bytes32",
		  "indexed": true,
		  "internalType": "bytes32"
		},
		{
		  "name": "_sender",
		  "type": "address",
		  "indexed": false,
		  "internalType": "address"
		},
		{
		  "name": "_address",
		  "type": "address",
		  "indexed": true,
		  "internalType": "address"
		},
		{
		  "name": "_marketId",
		  "type": "bytes32",
		  "indexed": true,
		  "internalType": "bytes32"
		}
	  ],
	  "anonymous": false
	},
	{
	  "type": "event",
	  "name": "OrderCancellationRequestedEvent",
	  "inputs": [
		{
		  "name": "_orderId",
		  "type": "bytes32",
		  "indexed": true,
		  "internalType": "bytes32"
		},
		{
		  "name": "_sender",
		  "type": "address",
		  "indexed": true,
		  "internalType": "address"
		}
	  ],
	  "anonymous": false
	},
	{
	  "type": "event",
	  "name": "OrderCancelled",
	  "inputs": [
		{
		  "name": "_orderId",
		  "type": "bytes32",
		  "indexed": true,
		  "internalType": "bytes32"
		},
		{
		  "name": "_sender",
		  "type": "address",
		  "indexed": true,
		  "internalType": "address"
		},
		{
		  "name": "_oracleAddress",
		  "type": "address",
		  "indexed": true,
		  "internalType": "address"
		}
	  ],
	  "anonymous": false
	},
	{
	  "type": "event",
	  "name": "OrderCreated",
	  "inputs": [
		{
		  "name": "_orderId",
		  "type": "bytes32",
		  "indexed": true,
		  "internalType": "bytes32"
		},
		{
		  "name": "_address",
		  "type": "address",
		  "indexed": true,
		  "internalType": "address"
		},
		{
		  "name": "_marketId",
		  "type": "bytes32",
		  "indexed": true,
		  "internalType": "bytes32"
		},
		{
		  "name": "_closeSharesAmount",
		  "type": "uint256",
		  "indexed": false,
		  "internalType": "uint256"
		},
		{
		  "name": "_openMPHTokenAmount",
		  "type": "uint256",
		  "indexed": false,
		  "internalType": "uint256"
		},
		{
		  "name": "_tradeDirection",
		  "type": "bool",
		  "indexed": false,
		  "internalType": "bool"
		},
		{
		  "name": "_orderLeverage",
		  "type": "uint256",
		  "indexed": false,
		  "internalType": "uint256"
		},
		{
		  "name": "_onlyIfPriceBelow",
		  "type": "uint256",
		  "indexed": false,
		  "internalType": "uint256"
		},
		{
		  "name": "_onlyIfPriceAbove",
		  "type": "uint256",
		  "indexed": false,
		  "internalType": "uint256"
		},
		{
		  "name": "_goodFrom",
		  "type": "uint256",
		  "indexed": false,
		  "internalType": "uint256"
		},
		{
		  "name": "_goodUntil",
		  "type": "uint256",
		  "indexed": false,
		  "internalType": "uint256"
		}
	  ],
	  "anonymous": false
	},
	{
	  "type": "event",
	  "name": "OrderFailed",
	  "inputs": [
		{
		  "name": "_orderId",
		  "type": "bytes32",
		  "indexed": true,
		  "internalType": "bytes32"
		},
		{
		  "name": "_address",
		  "type": "address",
		  "indexed": true,
		  "internalType": "address"
		},
		{
		  "name": "_marketId",
		  "type": "bytes32",
		  "indexed": true,
		  "internalType": "bytes32"
		},
		{
		  "name": "_closeSharesAmount",
		  "type": "uint256",
		  "indexed": false,
		  "internalType": "uint256"
		},
		{
		  "name": "_openMPHTokenAmount",
		  "type": "uint256",
		  "indexed": false,
		  "internalType": "uint256"
		},
		{
		  "name": "_tradeDirection",
		  "type": "bool",
		  "indexed": false,
		  "internalType": "bool"
		},
		{
		  "name": "_orderLeverage",
		  "type": "uint256",
		  "indexed": false,
		  "internalType": "uint256"
		},
		{
		  "name": "_onlyIfPriceBelow",
		  "type": "uint256",
		  "indexed": false,
		  "internalType": "uint256"
		},
		{
		  "name": "_onlyIfPriceAbove",
		  "type": "uint256",
		  "indexed": false,
		  "internalType": "uint256"
		},
		{
		  "name": "_goodFrom",
		  "type": "uint256",
		  "indexed": false,
		  "internalType": "uint256"
		},
		{
		  "name": "_goodUntil",
		  "type": "uint256",
		  "indexed": false,
		  "internalType": "uint256"
		}
	  ],
	  "anonymous": false
	},
	{
	  "type": "event",
	  "name": "OrderProcessed",
	  "inputs": [
		{
		  "name": "_orderId",
		  "type": "bytes32",
		  "indexed": true,
		  "internalType": "bytes32"
		},
		{
		  "name": "_price",
		  "type": "uint256",
		  "indexed": false,
		  "internalType": "uint256"
		},
		{
		  "name": "_unadjustedMarketPrice",
		  "type": "uint256",
		  "indexed": false,
		  "internalType": "uint256"
		},
		{
		  "name": "_spread",
		  "type": "uint256",
		  "indexed": false,
		  "internalType": "uint256"
		},
		{
		  "name": "_positionLiquidationTimestamp",
		  "type": "uint256",
		  "indexed": false,
		  "internalType": "uint256"
		},
		{
		  "name": "_timeStamp",
		  "type": "uint256",
		  "indexed": false,
		  "internalType": "uint256"
		},
		{
		  "name": "_newLongShares",
		  "type": "uint256",
		  "indexed": false,
		  "internalType": "uint256"
		},
		{
		  "name": "_newShortShares",
		  "type": "uint256",
		  "indexed": false,
		  "internalType": "uint256"
		},
		{
		  "name": "_newMeanEntry",
		  "type": "uint256",
		  "indexed": false,
		  "internalType": "uint256"
		},
		{
		  "name": "_newMeanSprad",
		  "type": "uint256",
		  "indexed": false,
		  "internalType": "uint256"
		},
		{
		  "name": "_newMeanLeverage",
		  "type": "uint256",
		  "indexed": false,
		  "internalType": "uint256"
		},
		{
		  "name": "_liquidationPrice",
		  "type": "uint256",
		  "indexed": false,
		  "internalType": "uint256"
		}
	  ],
	  "anonymous": false
	},
  ] as const;

export const morpherStateAbi = [
  {
    inputs: [
      {
        internalType: 'bool',
        name: '_mainChain',
        type: 'bool'
      },
      {
        internalType: 'address',
        name: '_sideChainOperator',
        type: 'address'
      },
      {
        internalType: 'address',
        name: '_morpherTreasury',
        type: 'address'
      }
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'administratorAddress',
        type: 'address'
      }
    ],
    name: 'AdministratorChange',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: '_bridgeAddress',
        type: 'address'
      }
    ],
    name: 'BridgeChange',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'recipient',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'totalToken',
        type: 'uint256'
      }
    ],
    name: 'Burn',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [],
    name: 'FastWithdrawsDisabled',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'governanceAddress',
        type: 'address'
      }
    ],
    name: 'GovernanceChange',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: '_periodLength',
        type: 'uint256'
      }
    ],
    name: 'InactivityPeriodUpdated',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [],
    name: 'Last24HoursAmountWithdrawnReset',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'rewardsTime',
        type: 'uint256'
      }
    ],
    name: 'LastRewardTime',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [],
    name: 'LastWithdrawAt',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'mainChainWithdrawLimit24',
        type: 'uint256'
      }
    ],
    name: 'MainChainWithdrawLimitUpdate',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'activateMarket',
        type: 'bytes32'
      }
    ],
    name: 'MarketActivated',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'deActivateMarket',
        type: 'bytes32'
      }
    ],
    name: 'MarketDeActivated',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'maxLeverage',
        type: 'uint256'
      }
    ],
    name: 'MaximumLeverageChange',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'recipient',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'totalToken',
        type: 'uint256'
      }
    ],
    name: 'Mint',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: '_transferNonce',
        type: 'uint256'
      }
    ],
    name: 'NewBridgeNonce',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'sideChainOperator',
        type: 'address'
      }
    ],
    name: 'NewSideChainOperator',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'newTotalOnOtherChain',
        type: 'uint256'
      }
    ],
    name: 'NewTotalInPositions',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'newTotalOnOtherChain',
        type: 'uint256'
      }
    ],
    name: 'NewTotalOnOtherChain',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'newTotalSupply',
        type: 'uint256'
      }
    ],
    name: 'NewTotalSupply',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: '_numberOfRequests',
        type: 'uint256'
      }
    ],
    name: 'NumberOfRequestsLimitUpdate',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'recipient',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      }
    ],
    name: 'OperatingRewardMinted',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'oracleContract',
        type: 'address'
      }
    ],
    name: 'OracleChange',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address'
      }
    ],
    name: 'OwnershipTransferred',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'rewardsAddress',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'rewardsBasisPoints',
        type: 'uint256'
      }
    ],
    name: 'RewardsChange',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: '_last24HoursAmountWithdrawn',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_lastWithdrawLimitReductionTime',
        type: 'uint256'
      }
    ],
    name: 'RollingWithdrawnAmountUpdated',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'spender',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'tokens',
        type: 'uint256'
      }
    ],
    name: 'SetAllowance',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'account',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'balance',
        type: 'uint256'
      },
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'balanceHash',
        type: 'bytes32'
      }
    ],
    name: 'SetBalance',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'positionHash',
        type: 'bytes32'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'marketId',
        type: 'bytes32'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'timeStamp',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'longShares',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'shortShares',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'meanEntryPrice',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'meanEntrySpread',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'meanEntryLeverage',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'liquidationPrice',
        type: 'uint256'
      }
    ],
    name: 'SetPosition',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'sideChainMerkleRoot',
        type: 'bytes32'
      }
    ],
    name: 'SideChainMerkleRootUpdate',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'blackList',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'blockNumber',
        type: 'uint256'
      }
    ],
    name: 'StateAccessDenied',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'whiteList',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'blockNumber',
        type: 'uint256'
      }
    ],
    name: 'StateAccessGranted',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'administrator',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'bool',
        name: '_paused',
        type: 'bool'
      }
    ],
    name: 'StatePaused',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'tokenAddress',
        type: 'address'
      }
    ],
    name: 'TokenChange',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: '_address',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_token',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_totalTokenSent',
        type: 'uint256'
      },
      {
        indexed: true,
        internalType: 'bytes32',
        name: '_tokenSentToLinkedChainHash',
        type: 'bytes32'
      }
    ],
    name: 'TokenSentToLinkedChain',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'account',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'tokenTransferredToOtherChain',
        type: 'uint256'
      },
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'transferHash',
        type: 'bytes32'
      }
    ],
    name: 'TokenTransferredToOtherChain',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'recipient',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      }
    ],
    name: 'Transfer',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: '_address',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_token',
        type: 'uint256'
      }
    ],
    name: 'TransferredTokenClaimed',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'blackList',
        type: 'address'
      }
    ],
    name: 'TransfersDisabled',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'whiteList',
        type: 'address'
      }
    ],
    name: 'TransfersEnabled',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256'
      }
    ],
    name: 'WithdrawLimitUpdated',
    type: 'event'
  },
  {
    constant: true,
    inputs: [],
    name: '_owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'administrator',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'fastTransfersEnabled',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'inactivityPeriod',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'isOwner',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'last24HoursAmountWithdrawn',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'lastRewardTime',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'lastWithdrawLimitReductionTime',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'mainChain',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'mainChainWithdrawLimit24',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'maximumLeverage',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'morpherBridge',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'morpherGovernance',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'morpherRewards',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'morpherToken',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'numberOfRequestsLimit',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'oracleContract',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'paused',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'rewardBasisPoints',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'sideChainMerkleRoot',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'sideChainMerkleRootWrittenAtTime',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'sideChainOperator',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'totalInPositions',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'totalOnOtherChain',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'totalSupply',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'totalToken',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'address',
        name: '_tokenAddress',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: '_tokens',
        type: 'uint256'
      }
    ],
    name: 'transferAnyERC20Token',
    outputs: [
      {
        internalType: 'bool',
        name: '_success',
        type: 'bool'
      }
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'transferNonce',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address'
      }
    ],
    name: 'transferOwnership',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'withdrawLimit24Hours',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'bytes32',
        name: '_marketId',
        type: 'bytes32'
      }
    ],
    name: 'getMaxMappingIndex',
    outputs: [
      {
        internalType: 'uint256',
        name: '_maxMappingIndex',
        type: 'uint256'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'bytes32',
        name: '_marketId',
        type: 'bytes32'
      },
      {
        internalType: 'address',
        name: '_address',
        type: 'address'
      }
    ],
    name: 'getExposureMappingIndex',
    outputs: [
      {
        internalType: 'uint256',
        name: '_mappingIndex',
        type: 'uint256'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'bytes32',
        name: '_marketId',
        type: 'bytes32'
      },
      {
        internalType: 'uint256',
        name: '_mappingIndex',
        type: 'uint256'
      }
    ],
    name: 'getExposureMappingAddress',
    outputs: [
      {
        internalType: 'address',
        name: '_address',
        type: 'address'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'bytes32',
        name: '_marketId',
        type: 'bytes32'
      },
      {
        internalType: 'uint256',
        name: '_maxMappingIndex',
        type: 'uint256'
      }
    ],
    name: 'setMaxMappingIndex',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'bytes32',
        name: '_marketId',
        type: 'bytes32'
      },
      {
        internalType: 'address',
        name: '_address',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: '_index',
        type: 'uint256'
      }
    ],
    name: 'setExposureMapping',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'bytes32',
        name: '_marketId',
        type: 'bytes32'
      },
      {
        internalType: 'address',
        name: '_address',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: '_index',
        type: 'uint256'
      }
    ],
    name: 'setExposureMappingIndex',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'bytes32',
        name: '_marketId',
        type: 'bytes32'
      },
      {
        internalType: 'address',
        name: '_address',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: '_index',
        type: 'uint256'
      }
    ],
    name: 'setExposureMappingAddress',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'address',
        name: '_address',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: '_token',
        type: 'uint256'
      }
    ],
    name: 'setTokenClaimedOnThisChain',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'address',
        name: '_address',
        type: 'address'
      }
    ],
    name: 'getTokenClaimedOnThisChain',
    outputs: [
      {
        internalType: 'uint256',
        name: '_token',
        type: 'uint256'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'address',
        name: '_address',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: '_token',
        type: 'uint256'
      }
    ],
    name: 'setTokenSentToLinkedChain',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'address',
        name: '_address',
        type: 'address'
      }
    ],
    name: 'getTokenSentToLinkedChain',
    outputs: [
      {
        internalType: 'uint256',
        name: '_token',
        type: 'uint256'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'address',
        name: '_address',
        type: 'address'
      }
    ],
    name: 'getTokenSentToLinkedChainTime',
    outputs: [
      {
        internalType: 'uint256',
        name: '_timeStamp',
        type: 'uint256'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256'
      }
    ],
    name: 'add24HoursWithdrawn',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256'
      }
    ],
    name: 'update24HoursWithdrawLimit',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'uint256',
        name: '_limit',
        type: 'uint256'
      }
    ],
    name: 'set24HourWithdrawLimit',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [],
    name: 'resetLast24HoursAmountWithdrawn',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'uint256',
        name: '_periodLength',
        type: 'uint256'
      }
    ],
    name: 'setInactivityPeriod',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [],
    name: 'getBridgeNonce',
    outputs: [
      {
        internalType: 'uint256',
        name: '_nonce',
        type: 'uint256'
      }
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [],
    name: 'disableFastWithdraws',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'bytes32',
        name: '_positionHash',
        type: 'bytes32'
      }
    ],
    name: 'setPositionClaimedOnMainChain',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'bytes32',
        name: '_positionHash',
        type: 'bytes32'
      }
    ],
    name: 'getPositionClaimedOnMainChain',
    outputs: [
      {
        internalType: 'bool',
        name: '_alreadyClaimed',
        type: 'bool'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'address',
        name: '_address',
        type: 'address'
      }
    ],
    name: 'setLastRequestBlock',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'address',
        name: '_address',
        type: 'address'
      }
    ],
    name: 'getLastRequestBlock',
    outputs: [
      {
        internalType: 'uint256',
        name: '_lastRequestBlock',
        type: 'uint256'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'address',
        name: '_address',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: '_numberOfRequests',
        type: 'uint256'
      }
    ],
    name: 'setNumberOfRequests',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'address',
        name: '_address',
        type: 'address'
      }
    ],
    name: 'increaseNumberOfRequests',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'address',
        name: '_address',
        type: 'address'
      }
    ],
    name: 'getNumberOfRequests',
    outputs: [
      {
        internalType: 'uint256',
        name: '_numberOfRequests',
        type: 'uint256'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'uint256',
        name: '_numberOfRequestsLimit',
        type: 'uint256'
      }
    ],
    name: 'setNumberOfRequestsLimit',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'getNumberOfRequestsLimit',
    outputs: [
      {
        internalType: 'uint256',
        name: '_numberOfRequestsLimit',
        type: 'uint256'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'uint256',
        name: '_mainChainWithdrawLimit24',
        type: 'uint256'
      }
    ],
    name: 'setMainChainWithdrawLimit',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'getMainChainWithdrawLimit',
    outputs: [
      {
        internalType: 'uint256',
        name: '_mainChainWithdrawLimit24',
        type: 'uint256'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'address',
        name: '_address',
        type: 'address'
      }
    ],
    name: 'grantAccess',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'address',
        name: '_address',
        type: 'address'
      }
    ],
    name: 'denyAccess',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'address',
        name: '_address',
        type: 'address'
      }
    ],
    name: 'getStateAccess',
    outputs: [
      {
        internalType: 'bool',
        name: '_hasAccess',
        type: 'bool'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'address',
        name: '_address',
        type: 'address'
      }
    ],
    name: 'enableTransfers',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'address',
        name: '_address',
        type: 'address'
      }
    ],
    name: 'disableTransfers',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'address',
        name: '_address',
        type: 'address'
      }
    ],
    name: 'getCanTransfer',
    outputs: [
      {
        internalType: 'bool',
        name: '_hasAccess',
        type: 'bool'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'address',
        name: '_from',
        type: 'address'
      },
      {
        internalType: 'address',
        name: '_to',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: '_token',
        type: 'uint256'
      }
    ],
    name: 'transfer',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'address',
        name: '_address',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: '_token',
        type: 'uint256'
      }
    ],
    name: 'mint',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'address',
        name: '_address',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: '_token',
        type: 'uint256'
      }
    ],
    name: 'burn',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'uint256',
        name: '_totalInPositions',
        type: 'uint256'
      }
    ],
    name: 'setTotalInPositions',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'uint256',
        name: '_newTotalOnOtherChain',
        type: 'uint256'
      }
    ],
    name: 'setTotalOnOtherChain',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'address',
        name: '_tokenOwner',
        type: 'address'
      }
    ],
    name: 'balanceOf',
    outputs: [
      {
        internalType: 'uint256',
        name: 'balance',
        type: 'uint256'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'address',
        name: '_from',
        type: 'address'
      },
      {
        internalType: 'address',
        name: '_spender',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: '_tokens',
        type: 'uint256'
      }
    ],
    name: 'setAllowance',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'address',
        name: '_tokenOwner',
        type: 'address'
      },
      {
        internalType: 'address',
        name: 'spender',
        type: 'address'
      }
    ],
    name: 'getAllowance',
    outputs: [
      {
        internalType: 'uint256',
        name: 'remaining',
        type: 'uint256'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'address',
        name: '_newGovernanceContractAddress',
        type: 'address'
      }
    ],
    name: 'setGovernanceContract',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'getGovernance',
    outputs: [
      {
        internalType: 'address',
        name: '_governanceContract',
        type: 'address'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'address',
        name: '_newBridge',
        type: 'address'
      }
    ],
    name: 'setMorpherBridge',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'getMorpherBridge',
    outputs: [
      {
        internalType: 'address',
        name: '_currentBridge',
        type: 'address'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'address',
        name: '_newOracleContract',
        type: 'address'
      }
    ],
    name: 'setOracleContract',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'getOracleContract',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'address',
        name: '_newTokenContract',
        type: 'address'
      }
    ],
    name: 'setTokenContract',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'getTokenContract',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'address',
        name: '_newAdministrator',
        type: 'address'
      }
    ],
    name: 'setAdministrator',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'getAdministrator',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'address',
        name: '_newRewardsAddress',
        type: 'address'
      }
    ],
    name: 'setRewardAddress',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'uint256',
        name: '_newRewardBasisPoints',
        type: 'uint256'
      }
    ],
    name: 'setRewardBasisPoints',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'bytes32',
        name: '_activateMarket',
        type: 'bytes32'
      }
    ],
    name: 'activateMarket',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'bytes32',
        name: '_deActivateMarket',
        type: 'bytes32'
      }
    ],
    name: 'deActivateMarket',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'bytes32',
        name: '_marketId',
        type: 'bytes32'
      }
    ],
    name: 'getMarketActive',
    outputs: [
      {
        internalType: 'bool',
        name: '_active',
        type: 'bool'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'uint256',
        name: '_newMaximumLeverage',
        type: 'uint256'
      }
    ],
    name: 'setMaximumLeverage',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'getMaximumLeverage',
    outputs: [
      {
        internalType: 'uint256',
        name: '_maxLeverage',
        type: 'uint256'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [],
    name: 'pauseState',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [],
    name: 'unPauseState',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'bytes32',
        name: '_sideChainMerkleRoot',
        type: 'bytes32'
      }
    ],
    name: 'setSideChainMerkleRoot',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'getSideChainMerkleRoot',
    outputs: [
      {
        internalType: 'bytes32',
        name: '_sideChainMerkleRoot',
        type: 'bytes32'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'address',
        name: '_address',
        type: 'address'
      }
    ],
    name: 'setSideChainOperator',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'getSideChainOperator',
    outputs: [
      {
        internalType: 'address',
        name: '_address',
        type: 'address'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'getSideChainMerkleRootWrittenAtTime',
    outputs: [
      {
        internalType: 'uint256',
        name: '_sideChainMerkleRoot',
        type: 'uint256'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        internalType: 'address',
        name: '_address',
        type: 'address'
      },
      {
        internalType: 'bytes32',
        name: '_marketId',
        type: 'bytes32'
      },
      {
        internalType: 'uint256',
        name: '_timeStamp',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '_longShares',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '_shortShares',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '_meanEntryPrice',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '_meanEntrySpread',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '_meanEntryLeverage',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '_liquidationPrice',
        type: 'uint256'
      }
    ],
    name: 'setPosition',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'address',
        name: '_address',
        type: 'address'
      },
      {
        internalType: 'bytes32',
        name: '_marketId',
        type: 'bytes32'
      }
    ],
    name: 'getPosition',
    outputs: [
      {
        internalType: 'uint256',
        name: '_longShares',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '_shortShares',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '_meanEntryPrice',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '_meanEntrySpread',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '_meanEntryLeverage',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '_liquidationPrice',
        type: 'uint256'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'address',
        name: '_address',
        type: 'address'
      },
      {
        internalType: 'bytes32',
        name: '_marketId',
        type: 'bytes32'
      },
      {
        internalType: 'uint256',
        name: '_timeStamp',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '_longShares',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '_shortShares',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '_meanEntryPrice',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '_meanEntrySpread',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '_meanEntryLeverage',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '_liquidationPrice',
        type: 'uint256'
      }
    ],
    name: 'getPositionHash',
    outputs: [
      {
        internalType: 'bytes32',
        name: '_hash',
        type: 'bytes32'
      }
    ],
    payable: false,
    stateMutability: 'pure',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'address',
        name: '_address',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: '_balance',
        type: 'uint256'
      }
    ],
    name: 'getBalanceHash',
    outputs: [
      {
        internalType: 'bytes32',
        name: '_hash',
        type: 'bytes32'
      }
    ],
    payable: false,
    stateMutability: 'pure',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'address',
        name: '_address',
        type: 'address'
      },
      {
        internalType: 'bytes32',
        name: '_marketId',
        type: 'bytes32'
      }
    ],
    name: 'getLastUpdated',
    outputs: [
      {
        internalType: 'uint256',
        name: '_lastUpdated',
        type: 'uint256'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'address',
        name: '_address',
        type: 'address'
      },
      {
        internalType: 'bytes32',
        name: '_marketId',
        type: 'bytes32'
      }
    ],
    name: 'getLongShares',
    outputs: [
      {
        internalType: 'uint256',
        name: '_longShares',
        type: 'uint256'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'address',
        name: '_address',
        type: 'address'
      },
      {
        internalType: 'bytes32',
        name: '_marketId',
        type: 'bytes32'
      }
    ],
    name: 'getShortShares',
    outputs: [
      {
        internalType: 'uint256',
        name: '_shortShares',
        type: 'uint256'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'address',
        name: '_address',
        type: 'address'
      },
      {
        internalType: 'bytes32',
        name: '_marketId',
        type: 'bytes32'
      }
    ],
    name: 'getMeanEntryPrice',
    outputs: [
      {
        internalType: 'uint256',
        name: '_meanEntryPrice',
        type: 'uint256'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'address',
        name: '_address',
        type: 'address'
      },
      {
        internalType: 'bytes32',
        name: '_marketId',
        type: 'bytes32'
      }
    ],
    name: 'getMeanEntrySpread',
    outputs: [
      {
        internalType: 'uint256',
        name: '_meanEntrySpread',
        type: 'uint256'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'address',
        name: '_address',
        type: 'address'
      },
      {
        internalType: 'bytes32',
        name: '_marketId',
        type: 'bytes32'
      }
    ],
    name: 'getMeanEntryLeverage',
    outputs: [
      {
        internalType: 'uint256',
        name: '_meanEntryLeverage',
        type: 'uint256'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'address',
        name: '_address',
        type: 'address'
      },
      {
        internalType: 'bytes32',
        name: '_marketId',
        type: 'bytes32'
      }
    ],
    name: 'getLiquidationPrice',
    outputs: [
      {
        internalType: 'uint256',
        name: '_liquidationPrice',
        type: 'uint256'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [],
    name: 'payOperatingReward',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  }
] as const;

export const morpherTokenAbi = [
	{
	  "type": "function",
	  "name": "allowance",
	  "inputs": [
		{
		  "name": "owner",
		  "type": "address",
		  "internalType": "address"
		},
		{
		  "name": "spender",
		  "type": "address",
		  "internalType": "address"
		}
	  ],
	  "outputs": [
		{
		  "name": "",
		  "type": "uint256",
		  "internalType": "uint256"
		}
	  ],
	  "stateMutability": "view"
	},
	{
	  "type": "function",
	  "name": "approve",
	  "inputs": [
		{
		  "name": "spender",
		  "type": "address",
		  "internalType": "address"
		},
		{
		  "name": "value",
		  "type": "uint256",
		  "internalType": "uint256"
		}
	  ],
	  "outputs": [
		{
		  "name": "",
		  "type": "bool",
		  "internalType": "bool"
		}
	  ],
	  "stateMutability": "nonpayable"
	},
	{
	  "type": "function",
	  "name": "balanceOf",
	  "inputs": [
		{
		  "name": "account",
		  "type": "address",
		  "internalType": "address"
		}
	  ],
	  "outputs": [
		{
		  "name": "",
		  "type": "uint256",
		  "internalType": "uint256"
		}
	  ],
	  "stateMutability": "view"
	},
	{
	  "type": "function",
	  "name": "burn",
	  "inputs": [
		{
		  "name": "from",
		  "type": "address",
		  "internalType": "address"
		},
		{
		  "name": "amount",
		  "type": "uint256",
		  "internalType": "uint256"
		}
	  ],
	  "outputs": [],
	  "stateMutability": "nonpayable"
	},
	{
	  "type": "function",
	  "name": "decimals",
	  "inputs": [],
	  "outputs": [
		{
		  "name": "",
		  "type": "uint8",
		  "internalType": "uint8"
		}
	  ],
	  "stateMutability": "view"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "version",
		"outputs": [
		  {
			"name": "",
			"type": "string"
		  }
		],
		"payable": false,
		"type": "function"
	},
	{
	  "type": "function",
	  "name": "deposit",
	  "inputs": [
		{
		  "name": "user",
		  "type": "address",
		  "internalType": "address"
		},
		{
		  "name": "depositData",
		  "type": "bytes",
		  "internalType": "bytes"
		}
	  ],
	  "outputs": [],
	  "stateMutability": "nonpayable"
	},
	{
	  "type": "function",
	  "name": "getDailyMintedTransferLimit",
	  "inputs": [],
	  "outputs": [
		{
		  "name": "",
		  "type": "uint256",
		  "internalType": "uint256"
		}
	  ],
	  "stateMutability": "view"
	},
	{
	  "type": "function",
	  "name": "getDailyMintedTransfers",
	  "inputs": [
		{
		  "name": "account",
		  "type": "address",
		  "internalType": "address"
		}
	  ],
	  "outputs": [
		{
		  "name": "",
		  "type": "uint256",
		  "internalType": "uint256"
		}
	  ],
	  "stateMutability": "view"
	},
	{
	  "type": "function",
	  "name": "getLockedRewards",
	  "inputs": [
		{
		  "name": "account",
		  "type": "address",
		  "internalType": "address"
		}
	  ],
	  "outputs": [
		{
		  "name": "",
		  "type": "uint256",
		  "internalType": "uint256"
		}
	  ],
	  "stateMutability": "view"
	},
	{
	  "type": "function",
	  "name": "getRestrictTransfers",
	  "inputs": [],
	  "outputs": [
		{
		  "name": "",
		  "type": "bool",
		  "internalType": "bool"
		}
	  ],
	  "stateMutability": "view"
	},
	{
	  "type": "function",
	  "name": "getTimeLock",
	  "inputs": [
		{
		  "name": "account",
		  "type": "address",
		  "internalType": "address"
		}
	  ],
	  "outputs": [
		{
		  "name": "amount",
		  "type": "uint256",
		  "internalType": "uint256"
		},
		{
		  "name": "lockedUntil",
		  "type": "uint256",
		  "internalType": "uint256"
		}
	  ],
	  "stateMutability": "view"
	},
	{
	  "type": "function",
	  "name": "getTotalLockedRewards",
	  "inputs": [],
	  "outputs": [
		{
		  "name": "",
		  "type": "uint256",
		  "internalType": "uint256"
		}
	  ],
	  "stateMutability": "view"
	},
	{
	  "type": "function",
	  "name": "getTotalTimeLocked",
	  "inputs": [],
	  "outputs": [
		{
		  "name": "",
		  "type": "uint256",
		  "internalType": "uint256"
		}
	  ],
	  "stateMutability": "view"
	},
	{
	  "type": "function",
	  "name": "getTotalTokensInPositions",
	  "inputs": [],
	  "outputs": [
		{
		  "name": "",
		  "type": "uint256",
		  "internalType": "uint256"
		}
	  ],
	  "stateMutability": "view"
	},
	{
	  "type": "function",
	  "name": "getTradeableBalanceOf",
	  "inputs": [
		{
		  "name": "account",
		  "type": "address",
		  "internalType": "address"
		}
	  ],
	  "outputs": [
		{
		  "name": "",
		  "type": "uint256",
		  "internalType": "uint256"
		}
	  ],
	  "stateMutability": "view"
	},
	{
	  "type": "function",
	  "name": "getTransferredInTokens",
	  "inputs": [
		{
		  "name": "account",
		  "type": "address",
		  "internalType": "address"
		}
	  ],
	  "outputs": [
		{
		  "name": "",
		  "type": "uint256",
		  "internalType": "uint256"
		}
	  ],
	  "stateMutability": "view"
	},
	{
	  "type": "function",
	  "name": "initialize",
	  "inputs": [
		{
		  "name": "_morpherAccessControlAddress",
		  "type": "address",
		  "internalType": "address"
		},
		{
		  "name": "_morpherStateAddress",
		  "type": "address",
		  "internalType": "address"
		},
		{
		  "name": "_permitName",
		  "type": "string",
		  "internalType": "string"
		}
	  ],
	  "outputs": [],
	  "stateMutability": "nonpayable"
	},
	{
	  "type": "function",
	  "name": "lockRewards",
	  "inputs": [
		{
		  "name": "account",
		  "type": "address",
		  "internalType": "address"
		},
		{
		  "name": "amount",
		  "type": "uint256",
		  "internalType": "uint256"
		}
	  ],
	  "outputs": [],
	  "stateMutability": "nonpayable"
	},
	{
	  "type": "function",
	  "name": "lockTokensForTime",
	  "inputs": [
		{
		  "name": "account",
		  "type": "address",
		  "internalType": "address"
		},
		{
		  "name": "amount",
		  "type": "uint256",
		  "internalType": "uint256"
		},
		{
		  "name": "lockDuration",
		  "type": "uint256",
		  "internalType": "uint256"
		}
	  ],
	  "outputs": [],
	  "stateMutability": "nonpayable"
	},
	{
	  "type": "function",
	  "name": "mint",
	  "inputs": [
		{
		  "name": "to",
		  "type": "address",
		  "internalType": "address"
		},
		{
		  "name": "amount",
		  "type": "uint256",
		  "internalType": "uint256"
		}
	  ],
	  "outputs": [],
	  "stateMutability": "nonpayable"
	},
	{
	  "type": "function",
	  "name": "morpherAccessControl",
	  "inputs": [],
	  "outputs": [
		{
		  "name": "",
		  "type": "address",
		  "internalType": "contract MorpherAccessControl"
		}
	  ],
	  "stateMutability": "view"
	},
	{
	  "type": "function",
	  "name": "morpherState",
	  "inputs": [],
	  "outputs": [
		{
		  "name": "",
		  "type": "address",
		  "internalType": "contract MorpherState"
		}
	  ],
	  "stateMutability": "view"
	},
	{
	  "type": "function",
	  "name": "name",
	  "inputs": [],
	  "outputs": [
		{
		  "name": "",
		  "type": "string",
		  "internalType": "string"
		}
	  ],
	  "stateMutability": "view"
	},
	{
	  "type": "function",
	  "name": "nonces",
	  "inputs": [
		{
		  "name": "owner",
		  "type": "address",
		  "internalType": "address"
		}
	  ],
	  "outputs": [
		{
		  "name": "",
		  "type": "uint256",
		  "internalType": "uint256"
		}
	  ],
	  "stateMutability": "view"
	},
	{
	  "type": "function",
	  "name": "pause",
	  "inputs": [],
	  "outputs": [],
	  "stateMutability": "nonpayable"
	},
	{
	  "type": "function",
	  "name": "paused",
	  "inputs": [],
	  "outputs": [
		{
		  "name": "",
		  "type": "bool",
		  "internalType": "bool"
		}
	  ],
	  "stateMutability": "view"
	},
	{
	  "type": "function",
	  "name": "permit",
	  "inputs": [
		{
		  "name": "owner",
		  "type": "address",
		  "internalType": "address"
		},
		{
		  "name": "spender",
		  "type": "address",
		  "internalType": "address"
		},
		{
		  "name": "value",
		  "type": "uint256",
		  "internalType": "uint256"
		},
		{
		  "name": "deadline",
		  "type": "uint256",
		  "internalType": "uint256"
		},
		{
		  "name": "v",
		  "type": "uint8",
		  "internalType": "uint8"
		},
		{
		  "name": "r",
		  "type": "bytes32",
		  "internalType": "bytes32"
		},
		{
		  "name": "s",
		  "type": "bytes32",
		  "internalType": "bytes32"
		}
	  ],
	  "outputs": [],
	  "stateMutability": "nonpayable"
	},
	{
	  "type": "function",
	  "name": "proxiableUUID",
	  "inputs": [],
	  "outputs": [
		{
		  "name": "",
		  "type": "bytes32",
		  "internalType": "bytes32"
		}
	  ],
	  "stateMutability": "view"
	},
	{
	  "type": "function",
	  "name": "setDailyMintedTransferLimit",
	  "inputs": [
		{
		  "name": "limit",
		  "type": "uint256",
		  "internalType": "uint256"
		}
	  ],
	  "outputs": [],
	  "stateMutability": "nonpayable"
	},
	{
	  "type": "function",
	  "name": "setMorpherStateAddress",
	  "inputs": [
		{
		  "name": "_morpherState",
		  "type": "address",
		  "internalType": "address"
		}
	  ],
	  "outputs": [],
	  "stateMutability": "nonpayable"
	},
	{
	  "type": "function",
	  "name": "setRestrictTransfers",
	  "inputs": [
		{
		  "name": "restrictTransfers",
		  "type": "bool",
		  "internalType": "bool"
		}
	  ],
	  "outputs": [],
	  "stateMutability": "nonpayable"
	},
	{
	  "type": "function",
	  "name": "setTotalInPositions",
	  "inputs": [
		{
		  "name": "totalTokensInPositions",
		  "type": "uint256",
		  "internalType": "uint256"
		}
	  ],
	  "outputs": [],
	  "stateMutability": "nonpayable"
	},
	{
	  "type": "function",
	  "name": "symbol",
	  "inputs": [],
	  "outputs": [
		{
		  "name": "",
		  "type": "string",
		  "internalType": "string"
		}
	  ],
	  "stateMutability": "view"
	},
	{
	  "type": "function",
	  "name": "totalSupply",
	  "inputs": [],
	  "outputs": [
		{
		  "name": "",
		  "type": "uint256",
		  "internalType": "uint256"
		}
	  ],
	  "stateMutability": "view"
	},
	{
	  "type": "function",
	  "name": "transfer",
	  "inputs": [
		{
		  "name": "to",
		  "type": "address",
		  "internalType": "address"
		},
		{
		  "name": "value",
		  "type": "uint256",
		  "internalType": "uint256"
		}
	  ],
	  "outputs": [
		{
		  "name": "",
		  "type": "bool",
		  "internalType": "bool"
		}
	  ],
	  "stateMutability": "nonpayable"
	},
	{
	  "type": "function",
	  "name": "transferFrom",
	  "inputs": [
		{
		  "name": "from",
		  "type": "address",
		  "internalType": "address"
		},
		{
		  "name": "to",
		  "type": "address",
		  "internalType": "address"
		},
		{
		  "name": "value",
		  "type": "uint256",
		  "internalType": "uint256"
		}
	  ],
	  "outputs": [
		{
		  "name": "",
		  "type": "bool",
		  "internalType": "bool"
		}
	  ],
	  "stateMutability": "nonpayable"
	},
	{
	  "type": "function",
	  "name": "unlockExpiredTokens",
	  "inputs": [
		{
		  "name": "account",
		  "type": "address",
		  "internalType": "address"
		}
	  ],
	  "outputs": [],
	  "stateMutability": "nonpayable"
	},
	{
	  "type": "function",
	  "name": "unlockRewards",
	  "inputs": [
		{
		  "name": "account",
		  "type": "address",
		  "internalType": "address"
		},
		{
		  "name": "amount",
		  "type": "uint256",
		  "internalType": "uint256"
		}
	  ],
	  "outputs": [],
	  "stateMutability": "nonpayable"
	},
	{
	  "type": "function",
	  "name": "unpause",
	  "inputs": [],
	  "outputs": [],
	  "stateMutability": "nonpayable"
	},
	{
	  "type": "function",
	  "name": "upgradeToAndCall",
	  "inputs": [
		{
		  "name": "newImplementation",
		  "type": "address",
		  "internalType": "address"
		},
		{
		  "name": "data",
		  "type": "bytes",
		  "internalType": "bytes"
		}
	  ],
	  "outputs": [],
	  "stateMutability": "payable"
	},
	{
	  "type": "function",
	  "name": "withdraw",
	  "inputs": [
		{
		  "name": "amount",
		  "type": "uint256",
		  "internalType": "uint256"
		}
	  ],
	  "outputs": [],
	  "stateMutability": "nonpayable"
	},
	{
	  "type": "event",
	  "name": "Approval",
	  "inputs": [
		{
		  "name": "owner",
		  "type": "address",
		  "indexed": true,
		  "internalType": "address"
		},
		{
		  "name": "spender",
		  "type": "address",
		  "indexed": true,
		  "internalType": "address"
		},
		{
		  "name": "value",
		  "type": "uint256",
		  "indexed": false,
		  "internalType": "uint256"
		}
	  ],
	  "anonymous": false
	},
	{
	  "type": "event",
	  "name": "DailyMintedTransferLimitUpdated",
	  "inputs": [
		{
		  "name": "oldLimit",
		  "type": "uint256",
		  "indexed": false,
		  "internalType": "uint256"
		},
		{
		  "name": "newLimit",
		  "type": "uint256",
		  "indexed": false,
		  "internalType": "uint256"
		}
	  ],
	  "anonymous": false
	},
	{
	  "type": "event",
	  "name": "EIP712DomainChanged",
	  "inputs": [],
	  "anonymous": false
	},
	{
	  "type": "event",
	  "name": "Initialized",
	  "inputs": [
		{
		  "name": "version",
		  "type": "uint64",
		  "indexed": false,
		  "internalType": "uint64"
		}
	  ],
	  "anonymous": false
	},
	{
	  "type": "event",
	  "name": "MigrationTokensLocked",
	  "inputs": [
		{
		  "name": "account",
		  "type": "address",
		  "indexed": true,
		  "internalType": "address"
		},
		{
		  "name": "amount",
		  "type": "uint256",
		  "indexed": false,
		  "internalType": "uint256"
		},
		{
		  "name": "lockedUntil",
		  "type": "uint256",
		  "indexed": false,
		  "internalType": "uint256"
		}
	  ],
	  "anonymous": false
	},
	{
	  "type": "event",
	  "name": "MintedTokensTransferred",
	  "inputs": [
		{
		  "name": "from",
		  "type": "address",
		  "indexed": true,
		  "internalType": "address"
		},
		{
		  "name": "to",
		  "type": "address",
		  "indexed": true,
		  "internalType": "address"
		},
		{
		  "name": "amount",
		  "type": "uint256",
		  "indexed": false,
		  "internalType": "uint256"
		}
	  ],
	  "anonymous": false
	},
	{
	  "type": "event",
	  "name": "Paused",
	  "inputs": [
		{
		  "name": "account",
		  "type": "address",
		  "indexed": false,
		  "internalType": "address"
		}
	  ],
	  "anonymous": false
	},
	{
	  "type": "event",
	  "name": "RewardsLocked",
	  "inputs": [
		{
		  "name": "account",
		  "type": "address",
		  "indexed": true,
		  "internalType": "address"
		},
		{
		  "name": "amount",
		  "type": "uint256",
		  "indexed": false,
		  "internalType": "uint256"
		}
	  ],
	  "anonymous": false
	},
	{
	  "type": "event",
	  "name": "RewardsUnlocked",
	  "inputs": [
		{
		  "name": "account",
		  "type": "address",
		  "indexed": true,
		  "internalType": "address"
		},
		{
		  "name": "amount",
		  "type": "uint256",
		  "indexed": false,
		  "internalType": "uint256"
		}
	  ],
	  "anonymous": false
	},
	{
	  "type": "event",
	  "name": "SetRestrictTransfers",
	  "inputs": [
		{
		  "name": "_oldValue",
		  "type": "bool",
		  "indexed": false,
		  "internalType": "bool"
		},
		{
		  "name": "_newValue",
		  "type": "bool",
		  "indexed": false,
		  "internalType": "bool"
		}
	  ],
	  "anonymous": false
	},
	{
	  "type": "event",
	  "name": "SetTotalTokensInPositions",
	  "inputs": [
		{
		  "name": "_oldValue",
		  "type": "uint256",
		  "indexed": false,
		  "internalType": "uint256"
		},
		{
		  "name": "_newValue",
		  "type": "uint256",
		  "indexed": false,
		  "internalType": "uint256"
		}
	  ],
	  "anonymous": false
	},
	{
	  "type": "event",
	  "name": "SetTotalTokensOnOtherChain",
	  "inputs": [
		{
		  "name": "_oldValue",
		  "type": "uint256",
		  "indexed": false,
		  "internalType": "uint256"
		},
		{
		  "name": "_newValue",
		  "type": "uint256",
		  "indexed": false,
		  "internalType": "uint256"
		}
	  ],
	  "anonymous": false
	},
	{
	  "type": "event",
	  "name": "TokensLocked",
	  "inputs": [
		{
		  "name": "account",
		  "type": "address",
		  "indexed": true,
		  "internalType": "address"
		},
		{
		  "name": "amount",
		  "type": "uint256",
		  "indexed": false,
		  "internalType": "uint256"
		},
		{
		  "name": "lockedUntil",
		  "type": "uint256",
		  "indexed": false,
		  "internalType": "uint256"
		}
	  ],
	  "anonymous": false
	},
	{
	  "type": "event",
	  "name": "TokensTransferredIn",
	  "inputs": [
		{
		  "name": "to",
		  "type": "address",
		  "indexed": true,
		  "internalType": "address"
		},
		{
		  "name": "amount",
		  "type": "uint256",
		  "indexed": false,
		  "internalType": "uint256"
		}
	  ],
	  "anonymous": false
	},
	{
	  "type": "event",
	  "name": "TokensUnlocked",
	  "inputs": [
		{
		  "name": "account",
		  "type": "address",
		  "indexed": true,
		  "internalType": "address"
		},
		{
		  "name": "amount",
		  "type": "uint256",
		  "indexed": false,
		  "internalType": "uint256"
		}
	  ],
	  "anonymous": false
	},
	{
	  "type": "event",
	  "name": "Transfer",
	  "inputs": [
		{
		  "name": "from",
		  "type": "address",
		  "indexed": true,
		  "internalType": "address"
		},
		{
		  "name": "to",
		  "type": "address",
		  "indexed": true,
		  "internalType": "address"
		},
		{
		  "name": "value",
		  "type": "uint256",
		  "indexed": false,
		  "internalType": "uint256"
		}
	  ],
	  "anonymous": false
	},
	{
	  "type": "event",
	  "name": "Unpaused",
	  "inputs": [
		{
		  "name": "account",
		  "type": "address",
		  "indexed": false,
		  "internalType": "address"
		}
	  ],
	  "anonymous": false
	},
	{
	  "type": "event",
	  "name": "Upgraded",
	  "inputs": [
		{
		  "name": "implementation",
		  "type": "address",
		  "indexed": true,
		  "internalType": "address"
		}
	  ],
	  "anonymous": false
	},
	{
	  "type": "error",
	  "name": "AddressEmptyCode",
	  "inputs": [
		{
		  "name": "target",
		  "type": "address",
		  "internalType": "address"
		}
	  ]
	},
	{
	  "type": "error",
	  "name": "ECDSAInvalidSignature",
	  "inputs": []
	},
	{
	  "type": "error",
	  "name": "ECDSAInvalidSignatureLength",
	  "inputs": [
		{
		  "name": "length",
		  "type": "uint256",
		  "internalType": "uint256"
		}
	  ]
	},
	{
	  "type": "error",
	  "name": "ECDSAInvalidSignatureS",
	  "inputs": [
		{
		  "name": "s",
		  "type": "bytes32",
		  "internalType": "bytes32"
		}
	  ]
	},
	{
	  "type": "error",
	  "name": "ERC1967InvalidImplementation",
	  "inputs": [
		{
		  "name": "implementation",
		  "type": "address",
		  "internalType": "address"
		}
	  ]
	},
	{
	  "type": "error",
	  "name": "ERC1967NonPayable",
	  "inputs": []
	},
	{
	  "type": "error",
	  "name": "ERC20InsufficientAllowance",
	  "inputs": [
		{
		  "name": "spender",
		  "type": "address",
		  "internalType": "address"
		},
		{
		  "name": "allowance",
		  "type": "uint256",
		  "internalType": "uint256"
		},
		{
		  "name": "needed",
		  "type": "uint256",
		  "internalType": "uint256"
		}
	  ]
	},
	{
	  "type": "error",
	  "name": "ERC20InsufficientBalance",
	  "inputs": [
		{
		  "name": "sender",
		  "type": "address",
		  "internalType": "address"
		},
		{
		  "name": "balance",
		  "type": "uint256",
		  "internalType": "uint256"
		},
		{
		  "name": "needed",
		  "type": "uint256",
		  "internalType": "uint256"
		}
	  ]
	},
	{
	  "type": "error",
	  "name": "ERC20InvalidApprover",
	  "inputs": [
		{
		  "name": "approver",
		  "type": "address",
		  "internalType": "address"
		}
	  ]
	},
	{
	  "type": "error",
	  "name": "ERC20InvalidReceiver",
	  "inputs": [
		{
		  "name": "receiver",
		  "type": "address",
		  "internalType": "address"
		}
	  ]
	},
	{
	  "type": "error",
	  "name": "ERC20InvalidSender",
	  "inputs": [
		{
		  "name": "sender",
		  "type": "address",
		  "internalType": "address"
		}
	  ]
	},
	{
	  "type": "error",
	  "name": "ERC20InvalidSpender",
	  "inputs": [
		{
		  "name": "spender",
		  "type": "address",
		  "internalType": "address"
		}
	  ]
	},
	{
	  "type": "error",
	  "name": "ERC2612ExpiredSignature",
	  "inputs": [
		{
		  "name": "deadline",
		  "type": "uint256",
		  "internalType": "uint256"
		}
	  ]
	},
	{
	  "type": "error",
	  "name": "ERC2612InvalidSigner",
	  "inputs": [
		{
		  "name": "signer",
		  "type": "address",
		  "internalType": "address"
		},
		{
		  "name": "owner",
		  "type": "address",
		  "internalType": "address"
		}
	  ]
	},
	{
	  "type": "error",
	  "name": "EnforcedPause",
	  "inputs": []
	},
	{
	  "type": "error",
	  "name": "ExpectedPause",
	  "inputs": []
	},
	{
	  "type": "error",
	  "name": "FailedCall",
	  "inputs": []
	},
	{
	  "type": "error",
	  "name": "InvalidAccountNonce",
	  "inputs": [
		{
		  "name": "account",
		  "type": "address",
		  "internalType": "address"
		},
		{
		  "name": "currentNonce",
		  "type": "uint256",
		  "internalType": "uint256"
		}
	  ]
	},
	{
	  "type": "error",
	  "name": "InvalidInitialization",
	  "inputs": []
	},
	{
	  "type": "error",
	  "name": "NotInitializing",
	  "inputs": []
	},
	{
	  "type": "error",
	  "name": "UUPSUnauthorizedCallContext",
	  "inputs": []
	},
	{
	  "type": "error",
	  "name": "UUPSUnsupportedProxiableUUID",
	  "inputs": [
		{
		  "name": "slot",
		  "type": "bytes32",
		  "internalType": "bytes32"
		}
	  ]
	}
  ] as const;