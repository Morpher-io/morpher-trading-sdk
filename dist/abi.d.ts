export declare const morpherOracleAbi: readonly [{
    readonly type: "function";
    readonly name: "_CANCEL_ORDER_TYPEHASH";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "bytes32";
        readonly internalType: "bytes32";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "_PERMIT_TYPEHASH";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "bytes32";
        readonly internalType: "bytes32";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "__callback";
    readonly inputs: readonly [{
        readonly name: "_orderId";
        readonly type: "bytes32";
        readonly internalType: "bytes32";
    }, {
        readonly name: "_price";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }, {
        readonly name: "_unadjustedMarketPrice";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }, {
        readonly name: "_spread";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }, {
        readonly name: "_liquidationTimestamp";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }, {
        readonly name: "_timeStamp";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }, {
        readonly name: "_gasForNextCallback";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly outputs: readonly [{
        readonly name: "createdPosition";
        readonly type: "tuple";
        readonly internalType: "struct MorpherTradeEngine.position";
        readonly components: readonly [{
            readonly name: "lastUpdated";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }, {
            readonly name: "longShares";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }, {
            readonly name: "shortShares";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }, {
            readonly name: "meanEntryPrice";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }, {
            readonly name: "meanEntrySpread";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }, {
            readonly name: "meanEntryLeverage";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }, {
            readonly name: "liquidationPrice";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }, {
            readonly name: "positionHash";
            readonly type: "bytes32";
            readonly internalType: "bytes32";
        }];
    }];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "adminLiquidationOrder";
    readonly inputs: readonly [{
        readonly name: "_address";
        readonly type: "address";
        readonly internalType: "address";
    }, {
        readonly name: "_marketId";
        readonly type: "bytes32";
        readonly internalType: "bytes32";
    }];
    readonly outputs: readonly [{
        readonly name: "_orderId";
        readonly type: "bytes32";
        readonly internalType: "bytes32";
    }];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "callBackAddress";
    readonly inputs: readonly [{
        readonly name: "";
        readonly type: "address";
        readonly internalType: "address";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "bool";
        readonly internalType: "bool";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "callBackCollectionAddress";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "address";
        readonly internalType: "address payable";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "cancelOrder";
    readonly inputs: readonly [{
        readonly name: "_orderId";
        readonly type: "bytes32";
        readonly internalType: "bytes32";
    }];
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "checkOrderConditions";
    readonly inputs: readonly [{
        readonly name: "_orderId";
        readonly type: "bytes32";
        readonly internalType: "bytes32";
    }, {
        readonly name: "_price";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly outputs: readonly [{
        readonly name: "_conditionsMet";
        readonly type: "bool";
        readonly internalType: "bool";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "createLiquidationOrder";
    readonly inputs: readonly [{
        readonly name: "_address";
        readonly type: "address";
        readonly internalType: "address";
    }, {
        readonly name: "_marketId";
        readonly type: "bytes32";
        readonly internalType: "bytes32";
    }];
    readonly outputs: readonly [{
        readonly name: "_orderId";
        readonly type: "bytes32";
        readonly internalType: "bytes32";
    }];
    readonly stateMutability: "payable";
}, {
    readonly type: "function";
    readonly name: "createOrder";
    readonly inputs: readonly [{
        readonly name: "createOrderParams";
        readonly type: "tuple";
        readonly internalType: "struct MorpherOracle.CreateOrderStruct";
        readonly components: readonly [{
            readonly name: "_marketId";
            readonly type: "bytes32";
            readonly internalType: "bytes32";
        }, {
            readonly name: "_closeSharesAmount";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }, {
            readonly name: "_openMPHTokenAmount";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }, {
            readonly name: "_tradeDirection";
            readonly type: "bool";
            readonly internalType: "bool";
        }, {
            readonly name: "_orderLeverage";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }, {
            readonly name: "_onlyIfPriceAbove";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }, {
            readonly name: "_onlyIfPriceBelow";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }, {
            readonly name: "_goodUntil";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }, {
            readonly name: "_goodFrom";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }];
    }];
    readonly outputs: readonly [{
        readonly name: "_orderId";
        readonly type: "bytes32";
        readonly internalType: "bytes32";
    }];
    readonly stateMutability: "payable";
}, {
    readonly type: "function";
    readonly name: "createOrder";
    readonly inputs: readonly [{
        readonly name: "_marketId";
        readonly type: "bytes32";
        readonly internalType: "bytes32";
    }, {
        readonly name: "_closeSharesAmount";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }, {
        readonly name: "_openMPHTokenAmount";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }, {
        readonly name: "_tradeDirection";
        readonly type: "bool";
        readonly internalType: "bool";
    }, {
        readonly name: "_orderLeverage";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }, {
        readonly name: "_onlyIfPriceAbove";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }, {
        readonly name: "_onlyIfPriceBelow";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }, {
        readonly name: "_goodUntil";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }, {
        readonly name: "_goodFrom";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly outputs: readonly [{
        readonly name: "_orderId";
        readonly type: "bytes32";
        readonly internalType: "bytes32";
    }];
    readonly stateMutability: "payable";
}, {
    readonly type: "function";
    readonly name: "createOrderFromGasToken";
    readonly inputs: readonly [{
        readonly name: "createOrderParams";
        readonly type: "tuple";
        readonly internalType: "struct MorpherOracle.CreateOrderStruct";
        readonly components: readonly [{
            readonly name: "_marketId";
            readonly type: "bytes32";
            readonly internalType: "bytes32";
        }, {
            readonly name: "_closeSharesAmount";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }, {
            readonly name: "_openMPHTokenAmount";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }, {
            readonly name: "_tradeDirection";
            readonly type: "bool";
            readonly internalType: "bool";
        }, {
            readonly name: "_orderLeverage";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }, {
            readonly name: "_onlyIfPriceAbove";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }, {
            readonly name: "_onlyIfPriceBelow";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }, {
            readonly name: "_goodUntil";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }, {
            readonly name: "_goodFrom";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }];
    }];
    readonly outputs: readonly [{
        readonly name: "orderId";
        readonly type: "bytes32";
        readonly internalType: "bytes32";
    }];
    readonly stateMutability: "payable";
}, {
    readonly type: "function";
    readonly name: "createOrderFromToken";
    readonly inputs: readonly [{
        readonly name: "createOrderParams";
        readonly type: "tuple";
        readonly internalType: "struct MorpherOracle.CreateOrderStruct";
        readonly components: readonly [{
            readonly name: "_marketId";
            readonly type: "bytes32";
            readonly internalType: "bytes32";
        }, {
            readonly name: "_closeSharesAmount";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }, {
            readonly name: "_openMPHTokenAmount";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }, {
            readonly name: "_tradeDirection";
            readonly type: "bool";
            readonly internalType: "bool";
        }, {
            readonly name: "_orderLeverage";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }, {
            readonly name: "_onlyIfPriceAbove";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }, {
            readonly name: "_onlyIfPriceBelow";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }, {
            readonly name: "_goodUntil";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }, {
            readonly name: "_goodFrom";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }];
    }, {
        readonly name: "inputToken";
        readonly type: "tuple";
        readonly internalType: "struct MorpherOracle.TokenPermitEIP712Struct";
        readonly components: readonly [{
            readonly name: "tokenAddress";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "owner";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "value";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }, {
            readonly name: "minOutValue";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }, {
            readonly name: "deadline";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }, {
            readonly name: "v";
            readonly type: "uint8";
            readonly internalType: "uint8";
        }, {
            readonly name: "r";
            readonly type: "bytes32";
            readonly internalType: "bytes32";
        }, {
            readonly name: "s";
            readonly type: "bytes32";
            readonly internalType: "bytes32";
        }];
    }];
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "createOrderFromToken";
    readonly inputs: readonly [{
        readonly name: "createOrderParams";
        readonly type: "tuple";
        readonly internalType: "struct MorpherOracle.CreateOrderStruct";
        readonly components: readonly [{
            readonly name: "_marketId";
            readonly type: "bytes32";
            readonly internalType: "bytes32";
        }, {
            readonly name: "_closeSharesAmount";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }, {
            readonly name: "_openMPHTokenAmount";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }, {
            readonly name: "_tradeDirection";
            readonly type: "bool";
            readonly internalType: "bool";
        }, {
            readonly name: "_orderLeverage";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }, {
            readonly name: "_onlyIfPriceAbove";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }, {
            readonly name: "_onlyIfPriceBelow";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }, {
            readonly name: "_goodUntil";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }, {
            readonly name: "_goodFrom";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }];
    }, {
        readonly name: "inputToken";
        readonly type: "tuple";
        readonly internalType: "struct MorpherOracle.TokenPermitEIP712Struct";
        readonly components: readonly [{
            readonly name: "tokenAddress";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "owner";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "value";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }, {
            readonly name: "minOutValue";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }, {
            readonly name: "deadline";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }, {
            readonly name: "v";
            readonly type: "uint8";
            readonly internalType: "uint8";
        }, {
            readonly name: "r";
            readonly type: "bytes32";
            readonly internalType: "bytes32";
        }, {
            readonly name: "s";
            readonly type: "bytes32";
            readonly internalType: "bytes32";
        }];
    }, {
        readonly name: "_addressPositionOwner";
        readonly type: "address";
        readonly internalType: "address";
    }, {
        readonly name: "deadline";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }, {
        readonly name: "v";
        readonly type: "uint8";
        readonly internalType: "uint8";
    }, {
        readonly name: "r";
        readonly type: "bytes32";
        readonly internalType: "bytes32";
    }, {
        readonly name: "s";
        readonly type: "bytes32";
        readonly internalType: "bytes32";
    }];
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "createOrderPermittedBySignature";
    readonly inputs: readonly [{
        readonly name: "createOrderParams";
        readonly type: "tuple";
        readonly internalType: "struct MorpherOracle.CreateOrderStruct";
        readonly components: readonly [{
            readonly name: "_marketId";
            readonly type: "bytes32";
            readonly internalType: "bytes32";
        }, {
            readonly name: "_closeSharesAmount";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }, {
            readonly name: "_openMPHTokenAmount";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }, {
            readonly name: "_tradeDirection";
            readonly type: "bool";
            readonly internalType: "bool";
        }, {
            readonly name: "_orderLeverage";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }, {
            readonly name: "_onlyIfPriceAbove";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }, {
            readonly name: "_onlyIfPriceBelow";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }, {
            readonly name: "_goodUntil";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }, {
            readonly name: "_goodFrom";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }];
    }, {
        readonly name: "_addressPositionOwner";
        readonly type: "address";
        readonly internalType: "address";
    }, {
        readonly name: "deadline";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }, {
        readonly name: "v";
        readonly type: "uint8";
        readonly internalType: "uint8";
    }, {
        readonly name: "r";
        readonly type: "bytes32";
        readonly internalType: "bytes32";
    }, {
        readonly name: "s";
        readonly type: "bytes32";
        readonly internalType: "bytes32";
    }];
    readonly outputs: readonly [{
        readonly name: "orderId";
        readonly type: "bytes32";
        readonly internalType: "bytes32";
    }];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "initiateCancelOrder";
    readonly inputs: readonly [{
        readonly name: "_orderId";
        readonly type: "bytes32";
        readonly internalType: "bytes32";
    }];
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "initiateCancelOrderPermitted";
    readonly inputs: readonly [{
        readonly name: "_orderId";
        readonly type: "bytes32";
        readonly internalType: "bytes32";
    }, {
        readonly name: "_owner";
        readonly type: "address";
        readonly internalType: "address";
    }, {
        readonly name: "deadline";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }, {
        readonly name: "v";
        readonly type: "uint8";
        readonly internalType: "uint8";
    }, {
        readonly name: "r";
        readonly type: "bytes32";
        readonly internalType: "bytes32";
    }, {
        readonly name: "s";
        readonly type: "bytes32";
        readonly internalType: "bytes32";
    }];
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "nonces";
    readonly inputs: readonly [{
        readonly name: "owner";
        readonly type: "address";
        readonly internalType: "address";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "orderCancellationRequested";
    readonly inputs: readonly [{
        readonly name: "";
        readonly type: "bytes32";
        readonly internalType: "bytes32";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "bool";
        readonly internalType: "bool";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "setCallbackCollectionAddress";
    readonly inputs: readonly [{
        readonly name: "_address";
        readonly type: "address";
        readonly internalType: "address payable";
    }];
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "setMorpherSwapHelperAddress";
    readonly inputs: readonly [{
        readonly name: "_helperAddress";
        readonly type: "address";
        readonly internalType: "address";
    }];
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "setStateAddress";
    readonly inputs: readonly [{
        readonly name: "_address";
        readonly type: "address";
        readonly internalType: "address";
    }];
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "uniswapRouter";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "address";
        readonly internalType: "address";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "useWhiteList";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "bool";
        readonly internalType: "bool";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "wMaticAddress";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "address";
        readonly internalType: "address";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "whiteList";
    readonly inputs: readonly [{
        readonly name: "";
        readonly type: "address";
        readonly internalType: "address";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "bool";
        readonly internalType: "bool";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "event";
    readonly name: "AddressBlackListed";
    readonly inputs: readonly [{
        readonly name: "_address";
        readonly type: "address";
        readonly indexed: false;
        readonly internalType: "address";
    }];
    readonly anonymous: false;
}, {
    readonly type: "event";
    readonly name: "AddressWhiteListed";
    readonly inputs: readonly [{
        readonly name: "_address";
        readonly type: "address";
        readonly indexed: false;
        readonly internalType: "address";
    }];
    readonly anonymous: false;
}, {
    readonly type: "event";
    readonly name: "AdminLiquidationOrderCreated";
    readonly inputs: readonly [{
        readonly name: "_orderId";
        readonly type: "bytes32";
        readonly indexed: true;
        readonly internalType: "bytes32";
    }, {
        readonly name: "_address";
        readonly type: "address";
        readonly indexed: true;
        readonly internalType: "address";
    }, {
        readonly name: "_marketId";
        readonly type: "bytes32";
        readonly indexed: true;
        readonly internalType: "bytes32";
    }, {
        readonly name: "_closeSharesAmount";
        readonly type: "uint256";
        readonly indexed: false;
        readonly internalType: "uint256";
    }, {
        readonly name: "_openMPHTokenAmount";
        readonly type: "uint256";
        readonly indexed: false;
        readonly internalType: "uint256";
    }, {
        readonly name: "_tradeDirection";
        readonly type: "bool";
        readonly indexed: false;
        readonly internalType: "bool";
    }, {
        readonly name: "_orderLeverage";
        readonly type: "uint256";
        readonly indexed: false;
        readonly internalType: "uint256";
    }];
    readonly anonymous: false;
}, {
    readonly type: "event";
    readonly name: "AdminOrderCancelled";
    readonly inputs: readonly [{
        readonly name: "_orderId";
        readonly type: "bytes32";
        readonly indexed: true;
        readonly internalType: "bytes32";
    }, {
        readonly name: "_sender";
        readonly type: "address";
        readonly indexed: true;
        readonly internalType: "address";
    }, {
        readonly name: "_oracleAddress";
        readonly type: "address";
        readonly indexed: true;
        readonly internalType: "address";
    }];
    readonly anonymous: false;
}, {
    readonly type: "event";
    readonly name: "LiquidationOrderCreated";
    readonly inputs: readonly [{
        readonly name: "_orderId";
        readonly type: "bytes32";
        readonly indexed: true;
        readonly internalType: "bytes32";
    }, {
        readonly name: "_sender";
        readonly type: "address";
        readonly indexed: false;
        readonly internalType: "address";
    }, {
        readonly name: "_address";
        readonly type: "address";
        readonly indexed: true;
        readonly internalType: "address";
    }, {
        readonly name: "_marketId";
        readonly type: "bytes32";
        readonly indexed: true;
        readonly internalType: "bytes32";
    }];
    readonly anonymous: false;
}, {
    readonly type: "event";
    readonly name: "OrderCancellationRequestedEvent";
    readonly inputs: readonly [{
        readonly name: "_orderId";
        readonly type: "bytes32";
        readonly indexed: true;
        readonly internalType: "bytes32";
    }, {
        readonly name: "_sender";
        readonly type: "address";
        readonly indexed: true;
        readonly internalType: "address";
    }];
    readonly anonymous: false;
}, {
    readonly type: "event";
    readonly name: "OrderCancelled";
    readonly inputs: readonly [{
        readonly name: "_orderId";
        readonly type: "bytes32";
        readonly indexed: true;
        readonly internalType: "bytes32";
    }, {
        readonly name: "_sender";
        readonly type: "address";
        readonly indexed: true;
        readonly internalType: "address";
    }, {
        readonly name: "_oracleAddress";
        readonly type: "address";
        readonly indexed: true;
        readonly internalType: "address";
    }];
    readonly anonymous: false;
}, {
    readonly type: "event";
    readonly name: "OrderCreated";
    readonly inputs: readonly [{
        readonly name: "_orderId";
        readonly type: "bytes32";
        readonly indexed: true;
        readonly internalType: "bytes32";
    }, {
        readonly name: "_address";
        readonly type: "address";
        readonly indexed: true;
        readonly internalType: "address";
    }, {
        readonly name: "_marketId";
        readonly type: "bytes32";
        readonly indexed: true;
        readonly internalType: "bytes32";
    }, {
        readonly name: "_closeSharesAmount";
        readonly type: "uint256";
        readonly indexed: false;
        readonly internalType: "uint256";
    }, {
        readonly name: "_openMPHTokenAmount";
        readonly type: "uint256";
        readonly indexed: false;
        readonly internalType: "uint256";
    }, {
        readonly name: "_tradeDirection";
        readonly type: "bool";
        readonly indexed: false;
        readonly internalType: "bool";
    }, {
        readonly name: "_orderLeverage";
        readonly type: "uint256";
        readonly indexed: false;
        readonly internalType: "uint256";
    }, {
        readonly name: "_onlyIfPriceBelow";
        readonly type: "uint256";
        readonly indexed: false;
        readonly internalType: "uint256";
    }, {
        readonly name: "_onlyIfPriceAbove";
        readonly type: "uint256";
        readonly indexed: false;
        readonly internalType: "uint256";
    }, {
        readonly name: "_goodFrom";
        readonly type: "uint256";
        readonly indexed: false;
        readonly internalType: "uint256";
    }, {
        readonly name: "_goodUntil";
        readonly type: "uint256";
        readonly indexed: false;
        readonly internalType: "uint256";
    }];
    readonly anonymous: false;
}, {
    readonly type: "event";
    readonly name: "OrderFailed";
    readonly inputs: readonly [{
        readonly name: "_orderId";
        readonly type: "bytes32";
        readonly indexed: true;
        readonly internalType: "bytes32";
    }, {
        readonly name: "_address";
        readonly type: "address";
        readonly indexed: true;
        readonly internalType: "address";
    }, {
        readonly name: "_marketId";
        readonly type: "bytes32";
        readonly indexed: true;
        readonly internalType: "bytes32";
    }, {
        readonly name: "_closeSharesAmount";
        readonly type: "uint256";
        readonly indexed: false;
        readonly internalType: "uint256";
    }, {
        readonly name: "_openMPHTokenAmount";
        readonly type: "uint256";
        readonly indexed: false;
        readonly internalType: "uint256";
    }, {
        readonly name: "_tradeDirection";
        readonly type: "bool";
        readonly indexed: false;
        readonly internalType: "bool";
    }, {
        readonly name: "_orderLeverage";
        readonly type: "uint256";
        readonly indexed: false;
        readonly internalType: "uint256";
    }, {
        readonly name: "_onlyIfPriceBelow";
        readonly type: "uint256";
        readonly indexed: false;
        readonly internalType: "uint256";
    }, {
        readonly name: "_onlyIfPriceAbove";
        readonly type: "uint256";
        readonly indexed: false;
        readonly internalType: "uint256";
    }, {
        readonly name: "_goodFrom";
        readonly type: "uint256";
        readonly indexed: false;
        readonly internalType: "uint256";
    }, {
        readonly name: "_goodUntil";
        readonly type: "uint256";
        readonly indexed: false;
        readonly internalType: "uint256";
    }];
    readonly anonymous: false;
}, {
    readonly type: "event";
    readonly name: "OrderProcessed";
    readonly inputs: readonly [{
        readonly name: "_orderId";
        readonly type: "bytes32";
        readonly indexed: true;
        readonly internalType: "bytes32";
    }, {
        readonly name: "_price";
        readonly type: "uint256";
        readonly indexed: false;
        readonly internalType: "uint256";
    }, {
        readonly name: "_unadjustedMarketPrice";
        readonly type: "uint256";
        readonly indexed: false;
        readonly internalType: "uint256";
    }, {
        readonly name: "_spread";
        readonly type: "uint256";
        readonly indexed: false;
        readonly internalType: "uint256";
    }, {
        readonly name: "_positionLiquidationTimestamp";
        readonly type: "uint256";
        readonly indexed: false;
        readonly internalType: "uint256";
    }, {
        readonly name: "_timeStamp";
        readonly type: "uint256";
        readonly indexed: false;
        readonly internalType: "uint256";
    }, {
        readonly name: "_newLongShares";
        readonly type: "uint256";
        readonly indexed: false;
        readonly internalType: "uint256";
    }, {
        readonly name: "_newShortShares";
        readonly type: "uint256";
        readonly indexed: false;
        readonly internalType: "uint256";
    }, {
        readonly name: "_newMeanEntry";
        readonly type: "uint256";
        readonly indexed: false;
        readonly internalType: "uint256";
    }, {
        readonly name: "_newMeanSprad";
        readonly type: "uint256";
        readonly indexed: false;
        readonly internalType: "uint256";
    }, {
        readonly name: "_newMeanLeverage";
        readonly type: "uint256";
        readonly indexed: false;
        readonly internalType: "uint256";
    }, {
        readonly name: "_liquidationPrice";
        readonly type: "uint256";
        readonly indexed: false;
        readonly internalType: "uint256";
    }];
    readonly anonymous: false;
}];
export declare const morpherStateAbi: readonly [{
    readonly inputs: readonly [{
        readonly internalType: "bool";
        readonly name: "_mainChain";
        readonly type: "bool";
    }, {
        readonly internalType: "address";
        readonly name: "_sideChainOperator";
        readonly type: "address";
    }, {
        readonly internalType: "address";
        readonly name: "_morpherTreasury";
        readonly type: "address";
    }];
    readonly payable: false;
    readonly stateMutability: "nonpayable";
    readonly type: "constructor";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "administratorAddress";
        readonly type: "address";
    }];
    readonly name: "AdministratorChange";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: false;
        readonly internalType: "address";
        readonly name: "_bridgeAddress";
        readonly type: "address";
    }];
    readonly name: "BridgeChange";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "recipient";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "amount";
        readonly type: "uint256";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "totalToken";
        readonly type: "uint256";
    }];
    readonly name: "Burn";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [];
    readonly name: "FastWithdrawsDisabled";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "governanceAddress";
        readonly type: "address";
    }];
    readonly name: "GovernanceChange";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "_periodLength";
        readonly type: "uint256";
    }];
    readonly name: "InactivityPeriodUpdated";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [];
    readonly name: "Last24HoursAmountWithdrawnReset";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly internalType: "uint256";
        readonly name: "rewardsTime";
        readonly type: "uint256";
    }];
    readonly name: "LastRewardTime";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [];
    readonly name: "LastWithdrawAt";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly internalType: "uint256";
        readonly name: "mainChainWithdrawLimit24";
        readonly type: "uint256";
    }];
    readonly name: "MainChainWithdrawLimitUpdate";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly internalType: "bytes32";
        readonly name: "activateMarket";
        readonly type: "bytes32";
    }];
    readonly name: "MarketActivated";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly internalType: "bytes32";
        readonly name: "deActivateMarket";
        readonly type: "bytes32";
    }];
    readonly name: "MarketDeActivated";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "maxLeverage";
        readonly type: "uint256";
    }];
    readonly name: "MaximumLeverageChange";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "recipient";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "amount";
        readonly type: "uint256";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "totalToken";
        readonly type: "uint256";
    }];
    readonly name: "Mint";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "_transferNonce";
        readonly type: "uint256";
    }];
    readonly name: "NewBridgeNonce";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "sideChainOperator";
        readonly type: "address";
    }];
    readonly name: "NewSideChainOperator";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "newTotalOnOtherChain";
        readonly type: "uint256";
    }];
    readonly name: "NewTotalInPositions";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "newTotalOnOtherChain";
        readonly type: "uint256";
    }];
    readonly name: "NewTotalOnOtherChain";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "newTotalSupply";
        readonly type: "uint256";
    }];
    readonly name: "NewTotalSupply";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "_numberOfRequests";
        readonly type: "uint256";
    }];
    readonly name: "NumberOfRequestsLimitUpdate";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "recipient";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "amount";
        readonly type: "uint256";
    }];
    readonly name: "OperatingRewardMinted";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "oracleContract";
        readonly type: "address";
    }];
    readonly name: "OracleChange";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "previousOwner";
        readonly type: "address";
    }, {
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "newOwner";
        readonly type: "address";
    }];
    readonly name: "OwnershipTransferred";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "rewardsAddress";
        readonly type: "address";
    }, {
        readonly indexed: true;
        readonly internalType: "uint256";
        readonly name: "rewardsBasisPoints";
        readonly type: "uint256";
    }];
    readonly name: "RewardsChange";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "_last24HoursAmountWithdrawn";
        readonly type: "uint256";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "_lastWithdrawLimitReductionTime";
        readonly type: "uint256";
    }];
    readonly name: "RollingWithdrawnAmountUpdated";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "sender";
        readonly type: "address";
    }, {
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "spender";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "tokens";
        readonly type: "uint256";
    }];
    readonly name: "SetAllowance";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "account";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "balance";
        readonly type: "uint256";
    }, {
        readonly indexed: true;
        readonly internalType: "bytes32";
        readonly name: "balanceHash";
        readonly type: "bytes32";
    }];
    readonly name: "SetBalance";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly internalType: "bytes32";
        readonly name: "positionHash";
        readonly type: "bytes32";
    }, {
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "sender";
        readonly type: "address";
    }, {
        readonly indexed: true;
        readonly internalType: "bytes32";
        readonly name: "marketId";
        readonly type: "bytes32";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "timeStamp";
        readonly type: "uint256";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "longShares";
        readonly type: "uint256";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "shortShares";
        readonly type: "uint256";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "meanEntryPrice";
        readonly type: "uint256";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "meanEntrySpread";
        readonly type: "uint256";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "meanEntryLeverage";
        readonly type: "uint256";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "liquidationPrice";
        readonly type: "uint256";
    }];
    readonly name: "SetPosition";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly internalType: "bytes32";
        readonly name: "sideChainMerkleRoot";
        readonly type: "bytes32";
    }];
    readonly name: "SideChainMerkleRootUpdate";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "blackList";
        readonly type: "address";
    }, {
        readonly indexed: true;
        readonly internalType: "uint256";
        readonly name: "blockNumber";
        readonly type: "uint256";
    }];
    readonly name: "StateAccessDenied";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "whiteList";
        readonly type: "address";
    }, {
        readonly indexed: true;
        readonly internalType: "uint256";
        readonly name: "blockNumber";
        readonly type: "uint256";
    }];
    readonly name: "StateAccessGranted";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: false;
        readonly internalType: "address";
        readonly name: "administrator";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly internalType: "bool";
        readonly name: "_paused";
        readonly type: "bool";
    }];
    readonly name: "StatePaused";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "tokenAddress";
        readonly type: "address";
    }];
    readonly name: "TokenChange";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: false;
        readonly internalType: "address";
        readonly name: "_address";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "_token";
        readonly type: "uint256";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "_totalTokenSent";
        readonly type: "uint256";
    }, {
        readonly indexed: true;
        readonly internalType: "bytes32";
        readonly name: "_tokenSentToLinkedChainHash";
        readonly type: "bytes32";
    }];
    readonly name: "TokenSentToLinkedChain";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "account";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "tokenTransferredToOtherChain";
        readonly type: "uint256";
    }, {
        readonly indexed: true;
        readonly internalType: "bytes32";
        readonly name: "transferHash";
        readonly type: "bytes32";
    }];
    readonly name: "TokenTransferredToOtherChain";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "sender";
        readonly type: "address";
    }, {
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "recipient";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "amount";
        readonly type: "uint256";
    }];
    readonly name: "Transfer";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: false;
        readonly internalType: "address";
        readonly name: "_address";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "_token";
        readonly type: "uint256";
    }];
    readonly name: "TransferredTokenClaimed";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "blackList";
        readonly type: "address";
    }];
    readonly name: "TransfersDisabled";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "whiteList";
        readonly type: "address";
    }];
    readonly name: "TransfersEnabled";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "_amount";
        readonly type: "uint256";
    }];
    readonly name: "WithdrawLimitUpdated";
    readonly type: "event";
}, {
    readonly constant: true;
    readonly inputs: readonly [];
    readonly name: "_owner";
    readonly outputs: readonly [{
        readonly internalType: "address";
        readonly name: "";
        readonly type: "address";
    }];
    readonly payable: false;
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly constant: true;
    readonly inputs: readonly [];
    readonly name: "administrator";
    readonly outputs: readonly [{
        readonly internalType: "address";
        readonly name: "";
        readonly type: "address";
    }];
    readonly payable: false;
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly constant: true;
    readonly inputs: readonly [];
    readonly name: "fastTransfersEnabled";
    readonly outputs: readonly [{
        readonly internalType: "bool";
        readonly name: "";
        readonly type: "bool";
    }];
    readonly payable: false;
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly constant: true;
    readonly inputs: readonly [];
    readonly name: "inactivityPeriod";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly payable: false;
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly constant: true;
    readonly inputs: readonly [];
    readonly name: "isOwner";
    readonly outputs: readonly [{
        readonly internalType: "bool";
        readonly name: "";
        readonly type: "bool";
    }];
    readonly payable: false;
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly constant: true;
    readonly inputs: readonly [];
    readonly name: "last24HoursAmountWithdrawn";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly payable: false;
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly constant: true;
    readonly inputs: readonly [];
    readonly name: "lastRewardTime";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly payable: false;
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly constant: true;
    readonly inputs: readonly [];
    readonly name: "lastWithdrawLimitReductionTime";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly payable: false;
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly constant: true;
    readonly inputs: readonly [];
    readonly name: "mainChain";
    readonly outputs: readonly [{
        readonly internalType: "bool";
        readonly name: "";
        readonly type: "bool";
    }];
    readonly payable: false;
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly constant: true;
    readonly inputs: readonly [];
    readonly name: "mainChainWithdrawLimit24";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly payable: false;
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly constant: true;
    readonly inputs: readonly [];
    readonly name: "maximumLeverage";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly payable: false;
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly constant: true;
    readonly inputs: readonly [];
    readonly name: "morpherBridge";
    readonly outputs: readonly [{
        readonly internalType: "address";
        readonly name: "";
        readonly type: "address";
    }];
    readonly payable: false;
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly constant: true;
    readonly inputs: readonly [];
    readonly name: "morpherGovernance";
    readonly outputs: readonly [{
        readonly internalType: "address";
        readonly name: "";
        readonly type: "address";
    }];
    readonly payable: false;
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly constant: true;
    readonly inputs: readonly [];
    readonly name: "morpherRewards";
    readonly outputs: readonly [{
        readonly internalType: "address";
        readonly name: "";
        readonly type: "address";
    }];
    readonly payable: false;
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly constant: true;
    readonly inputs: readonly [];
    readonly name: "morpherToken";
    readonly outputs: readonly [{
        readonly internalType: "address";
        readonly name: "";
        readonly type: "address";
    }];
    readonly payable: false;
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly constant: true;
    readonly inputs: readonly [];
    readonly name: "numberOfRequestsLimit";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly payable: false;
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly constant: true;
    readonly inputs: readonly [];
    readonly name: "oracleContract";
    readonly outputs: readonly [{
        readonly internalType: "address";
        readonly name: "";
        readonly type: "address";
    }];
    readonly payable: false;
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly constant: true;
    readonly inputs: readonly [];
    readonly name: "owner";
    readonly outputs: readonly [{
        readonly internalType: "address";
        readonly name: "";
        readonly type: "address";
    }];
    readonly payable: false;
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly constant: true;
    readonly inputs: readonly [];
    readonly name: "paused";
    readonly outputs: readonly [{
        readonly internalType: "bool";
        readonly name: "";
        readonly type: "bool";
    }];
    readonly payable: false;
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly constant: false;
    readonly inputs: readonly [];
    readonly name: "renounceOwnership";
    readonly outputs: readonly [];
    readonly payable: false;
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly constant: true;
    readonly inputs: readonly [];
    readonly name: "rewardBasisPoints";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly payable: false;
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly constant: true;
    readonly inputs: readonly [];
    readonly name: "sideChainMerkleRoot";
    readonly outputs: readonly [{
        readonly internalType: "bytes32";
        readonly name: "";
        readonly type: "bytes32";
    }];
    readonly payable: false;
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly constant: true;
    readonly inputs: readonly [];
    readonly name: "sideChainMerkleRootWrittenAtTime";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly payable: false;
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly constant: true;
    readonly inputs: readonly [];
    readonly name: "sideChainOperator";
    readonly outputs: readonly [{
        readonly internalType: "address";
        readonly name: "";
        readonly type: "address";
    }];
    readonly payable: false;
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly constant: true;
    readonly inputs: readonly [];
    readonly name: "totalInPositions";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly payable: false;
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly constant: true;
    readonly inputs: readonly [];
    readonly name: "totalOnOtherChain";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly payable: false;
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly constant: true;
    readonly inputs: readonly [];
    readonly name: "totalSupply";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly payable: false;
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly constant: true;
    readonly inputs: readonly [];
    readonly name: "totalToken";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly payable: false;
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly constant: false;
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "_tokenAddress";
        readonly type: "address";
    }, {
        readonly internalType: "uint256";
        readonly name: "_tokens";
        readonly type: "uint256";
    }];
    readonly name: "transferAnyERC20Token";
    readonly outputs: readonly [{
        readonly internalType: "bool";
        readonly name: "_success";
        readonly type: "bool";
    }];
    readonly payable: false;
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly constant: true;
    readonly inputs: readonly [];
    readonly name: "transferNonce";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly payable: false;
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly constant: false;
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "newOwner";
        readonly type: "address";
    }];
    readonly name: "transferOwnership";
    readonly outputs: readonly [];
    readonly payable: false;
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly constant: true;
    readonly inputs: readonly [];
    readonly name: "withdrawLimit24Hours";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly payable: false;
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly constant: true;
    readonly inputs: readonly [{
        readonly internalType: "bytes32";
        readonly name: "_marketId";
        readonly type: "bytes32";
    }];
    readonly name: "getMaxMappingIndex";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "_maxMappingIndex";
        readonly type: "uint256";
    }];
    readonly payable: false;
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly constant: true;
    readonly inputs: readonly [{
        readonly internalType: "bytes32";
        readonly name: "_marketId";
        readonly type: "bytes32";
    }, {
        readonly internalType: "address";
        readonly name: "_address";
        readonly type: "address";
    }];
    readonly name: "getExposureMappingIndex";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "_mappingIndex";
        readonly type: "uint256";
    }];
    readonly payable: false;
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly constant: true;
    readonly inputs: readonly [{
        readonly internalType: "bytes32";
        readonly name: "_marketId";
        readonly type: "bytes32";
    }, {
        readonly internalType: "uint256";
        readonly name: "_mappingIndex";
        readonly type: "uint256";
    }];
    readonly name: "getExposureMappingAddress";
    readonly outputs: readonly [{
        readonly internalType: "address";
        readonly name: "_address";
        readonly type: "address";
    }];
    readonly payable: false;
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly constant: false;
    readonly inputs: readonly [{
        readonly internalType: "bytes32";
        readonly name: "_marketId";
        readonly type: "bytes32";
    }, {
        readonly internalType: "uint256";
        readonly name: "_maxMappingIndex";
        readonly type: "uint256";
    }];
    readonly name: "setMaxMappingIndex";
    readonly outputs: readonly [];
    readonly payable: false;
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly constant: false;
    readonly inputs: readonly [{
        readonly internalType: "bytes32";
        readonly name: "_marketId";
        readonly type: "bytes32";
    }, {
        readonly internalType: "address";
        readonly name: "_address";
        readonly type: "address";
    }, {
        readonly internalType: "uint256";
        readonly name: "_index";
        readonly type: "uint256";
    }];
    readonly name: "setExposureMapping";
    readonly outputs: readonly [];
    readonly payable: false;
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly constant: false;
    readonly inputs: readonly [{
        readonly internalType: "bytes32";
        readonly name: "_marketId";
        readonly type: "bytes32";
    }, {
        readonly internalType: "address";
        readonly name: "_address";
        readonly type: "address";
    }, {
        readonly internalType: "uint256";
        readonly name: "_index";
        readonly type: "uint256";
    }];
    readonly name: "setExposureMappingIndex";
    readonly outputs: readonly [];
    readonly payable: false;
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly constant: false;
    readonly inputs: readonly [{
        readonly internalType: "bytes32";
        readonly name: "_marketId";
        readonly type: "bytes32";
    }, {
        readonly internalType: "address";
        readonly name: "_address";
        readonly type: "address";
    }, {
        readonly internalType: "uint256";
        readonly name: "_index";
        readonly type: "uint256";
    }];
    readonly name: "setExposureMappingAddress";
    readonly outputs: readonly [];
    readonly payable: false;
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly constant: false;
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "_address";
        readonly type: "address";
    }, {
        readonly internalType: "uint256";
        readonly name: "_token";
        readonly type: "uint256";
    }];
    readonly name: "setTokenClaimedOnThisChain";
    readonly outputs: readonly [];
    readonly payable: false;
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly constant: true;
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "_address";
        readonly type: "address";
    }];
    readonly name: "getTokenClaimedOnThisChain";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "_token";
        readonly type: "uint256";
    }];
    readonly payable: false;
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly constant: false;
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "_address";
        readonly type: "address";
    }, {
        readonly internalType: "uint256";
        readonly name: "_token";
        readonly type: "uint256";
    }];
    readonly name: "setTokenSentToLinkedChain";
    readonly outputs: readonly [];
    readonly payable: false;
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly constant: true;
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "_address";
        readonly type: "address";
    }];
    readonly name: "getTokenSentToLinkedChain";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "_token";
        readonly type: "uint256";
    }];
    readonly payable: false;
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly constant: true;
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "_address";
        readonly type: "address";
    }];
    readonly name: "getTokenSentToLinkedChainTime";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "_timeStamp";
        readonly type: "uint256";
    }];
    readonly payable: false;
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly constant: false;
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "_amount";
        readonly type: "uint256";
    }];
    readonly name: "add24HoursWithdrawn";
    readonly outputs: readonly [];
    readonly payable: false;
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly constant: false;
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "_amount";
        readonly type: "uint256";
    }];
    readonly name: "update24HoursWithdrawLimit";
    readonly outputs: readonly [];
    readonly payable: false;
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly constant: false;
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "_limit";
        readonly type: "uint256";
    }];
    readonly name: "set24HourWithdrawLimit";
    readonly outputs: readonly [];
    readonly payable: false;
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly constant: false;
    readonly inputs: readonly [];
    readonly name: "resetLast24HoursAmountWithdrawn";
    readonly outputs: readonly [];
    readonly payable: false;
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly constant: false;
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "_periodLength";
        readonly type: "uint256";
    }];
    readonly name: "setInactivityPeriod";
    readonly outputs: readonly [];
    readonly payable: false;
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly constant: false;
    readonly inputs: readonly [];
    readonly name: "getBridgeNonce";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "_nonce";
        readonly type: "uint256";
    }];
    readonly payable: false;
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly constant: false;
    readonly inputs: readonly [];
    readonly name: "disableFastWithdraws";
    readonly outputs: readonly [];
    readonly payable: false;
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly constant: false;
    readonly inputs: readonly [{
        readonly internalType: "bytes32";
        readonly name: "_positionHash";
        readonly type: "bytes32";
    }];
    readonly name: "setPositionClaimedOnMainChain";
    readonly outputs: readonly [];
    readonly payable: false;
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly constant: true;
    readonly inputs: readonly [{
        readonly internalType: "bytes32";
        readonly name: "_positionHash";
        readonly type: "bytes32";
    }];
    readonly name: "getPositionClaimedOnMainChain";
    readonly outputs: readonly [{
        readonly internalType: "bool";
        readonly name: "_alreadyClaimed";
        readonly type: "bool";
    }];
    readonly payable: false;
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly constant: false;
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "_address";
        readonly type: "address";
    }];
    readonly name: "setLastRequestBlock";
    readonly outputs: readonly [];
    readonly payable: false;
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly constant: true;
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "_address";
        readonly type: "address";
    }];
    readonly name: "getLastRequestBlock";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "_lastRequestBlock";
        readonly type: "uint256";
    }];
    readonly payable: false;
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly constant: false;
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "_address";
        readonly type: "address";
    }, {
        readonly internalType: "uint256";
        readonly name: "_numberOfRequests";
        readonly type: "uint256";
    }];
    readonly name: "setNumberOfRequests";
    readonly outputs: readonly [];
    readonly payable: false;
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly constant: false;
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "_address";
        readonly type: "address";
    }];
    readonly name: "increaseNumberOfRequests";
    readonly outputs: readonly [];
    readonly payable: false;
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly constant: true;
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "_address";
        readonly type: "address";
    }];
    readonly name: "getNumberOfRequests";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "_numberOfRequests";
        readonly type: "uint256";
    }];
    readonly payable: false;
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly constant: false;
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "_numberOfRequestsLimit";
        readonly type: "uint256";
    }];
    readonly name: "setNumberOfRequestsLimit";
    readonly outputs: readonly [];
    readonly payable: false;
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly constant: true;
    readonly inputs: readonly [];
    readonly name: "getNumberOfRequestsLimit";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "_numberOfRequestsLimit";
        readonly type: "uint256";
    }];
    readonly payable: false;
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly constant: false;
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "_mainChainWithdrawLimit24";
        readonly type: "uint256";
    }];
    readonly name: "setMainChainWithdrawLimit";
    readonly outputs: readonly [];
    readonly payable: false;
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly constant: true;
    readonly inputs: readonly [];
    readonly name: "getMainChainWithdrawLimit";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "_mainChainWithdrawLimit24";
        readonly type: "uint256";
    }];
    readonly payable: false;
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly constant: false;
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "_address";
        readonly type: "address";
    }];
    readonly name: "grantAccess";
    readonly outputs: readonly [];
    readonly payable: false;
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly constant: false;
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "_address";
        readonly type: "address";
    }];
    readonly name: "denyAccess";
    readonly outputs: readonly [];
    readonly payable: false;
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly constant: true;
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "_address";
        readonly type: "address";
    }];
    readonly name: "getStateAccess";
    readonly outputs: readonly [{
        readonly internalType: "bool";
        readonly name: "_hasAccess";
        readonly type: "bool";
    }];
    readonly payable: false;
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly constant: false;
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "_address";
        readonly type: "address";
    }];
    readonly name: "enableTransfers";
    readonly outputs: readonly [];
    readonly payable: false;
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly constant: false;
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "_address";
        readonly type: "address";
    }];
    readonly name: "disableTransfers";
    readonly outputs: readonly [];
    readonly payable: false;
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly constant: true;
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "_address";
        readonly type: "address";
    }];
    readonly name: "getCanTransfer";
    readonly outputs: readonly [{
        readonly internalType: "bool";
        readonly name: "_hasAccess";
        readonly type: "bool";
    }];
    readonly payable: false;
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly constant: false;
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "_from";
        readonly type: "address";
    }, {
        readonly internalType: "address";
        readonly name: "_to";
        readonly type: "address";
    }, {
        readonly internalType: "uint256";
        readonly name: "_token";
        readonly type: "uint256";
    }];
    readonly name: "transfer";
    readonly outputs: readonly [];
    readonly payable: false;
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly constant: false;
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "_address";
        readonly type: "address";
    }, {
        readonly internalType: "uint256";
        readonly name: "_token";
        readonly type: "uint256";
    }];
    readonly name: "mint";
    readonly outputs: readonly [];
    readonly payable: false;
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly constant: false;
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "_address";
        readonly type: "address";
    }, {
        readonly internalType: "uint256";
        readonly name: "_token";
        readonly type: "uint256";
    }];
    readonly name: "burn";
    readonly outputs: readonly [];
    readonly payable: false;
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly constant: false;
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "_totalInPositions";
        readonly type: "uint256";
    }];
    readonly name: "setTotalInPositions";
    readonly outputs: readonly [];
    readonly payable: false;
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly constant: false;
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "_newTotalOnOtherChain";
        readonly type: "uint256";
    }];
    readonly name: "setTotalOnOtherChain";
    readonly outputs: readonly [];
    readonly payable: false;
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly constant: true;
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "_tokenOwner";
        readonly type: "address";
    }];
    readonly name: "balanceOf";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "balance";
        readonly type: "uint256";
    }];
    readonly payable: false;
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly constant: false;
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "_from";
        readonly type: "address";
    }, {
        readonly internalType: "address";
        readonly name: "_spender";
        readonly type: "address";
    }, {
        readonly internalType: "uint256";
        readonly name: "_tokens";
        readonly type: "uint256";
    }];
    readonly name: "setAllowance";
    readonly outputs: readonly [];
    readonly payable: false;
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly constant: true;
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "_tokenOwner";
        readonly type: "address";
    }, {
        readonly internalType: "address";
        readonly name: "spender";
        readonly type: "address";
    }];
    readonly name: "getAllowance";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "remaining";
        readonly type: "uint256";
    }];
    readonly payable: false;
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly constant: false;
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "_newGovernanceContractAddress";
        readonly type: "address";
    }];
    readonly name: "setGovernanceContract";
    readonly outputs: readonly [];
    readonly payable: false;
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly constant: true;
    readonly inputs: readonly [];
    readonly name: "getGovernance";
    readonly outputs: readonly [{
        readonly internalType: "address";
        readonly name: "_governanceContract";
        readonly type: "address";
    }];
    readonly payable: false;
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly constant: false;
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "_newBridge";
        readonly type: "address";
    }];
    readonly name: "setMorpherBridge";
    readonly outputs: readonly [];
    readonly payable: false;
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly constant: true;
    readonly inputs: readonly [];
    readonly name: "getMorpherBridge";
    readonly outputs: readonly [{
        readonly internalType: "address";
        readonly name: "_currentBridge";
        readonly type: "address";
    }];
    readonly payable: false;
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly constant: false;
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "_newOracleContract";
        readonly type: "address";
    }];
    readonly name: "setOracleContract";
    readonly outputs: readonly [];
    readonly payable: false;
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly constant: true;
    readonly inputs: readonly [];
    readonly name: "getOracleContract";
    readonly outputs: readonly [{
        readonly internalType: "address";
        readonly name: "";
        readonly type: "address";
    }];
    readonly payable: false;
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly constant: false;
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "_newTokenContract";
        readonly type: "address";
    }];
    readonly name: "setTokenContract";
    readonly outputs: readonly [];
    readonly payable: false;
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly constant: true;
    readonly inputs: readonly [];
    readonly name: "getTokenContract";
    readonly outputs: readonly [{
        readonly internalType: "address";
        readonly name: "";
        readonly type: "address";
    }];
    readonly payable: false;
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly constant: false;
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "_newAdministrator";
        readonly type: "address";
    }];
    readonly name: "setAdministrator";
    readonly outputs: readonly [];
    readonly payable: false;
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly constant: true;
    readonly inputs: readonly [];
    readonly name: "getAdministrator";
    readonly outputs: readonly [{
        readonly internalType: "address";
        readonly name: "";
        readonly type: "address";
    }];
    readonly payable: false;
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly constant: false;
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "_newRewardsAddress";
        readonly type: "address";
    }];
    readonly name: "setRewardAddress";
    readonly outputs: readonly [];
    readonly payable: false;
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly constant: false;
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "_newRewardBasisPoints";
        readonly type: "uint256";
    }];
    readonly name: "setRewardBasisPoints";
    readonly outputs: readonly [];
    readonly payable: false;
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly constant: false;
    readonly inputs: readonly [{
        readonly internalType: "bytes32";
        readonly name: "_activateMarket";
        readonly type: "bytes32";
    }];
    readonly name: "activateMarket";
    readonly outputs: readonly [];
    readonly payable: false;
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly constant: false;
    readonly inputs: readonly [{
        readonly internalType: "bytes32";
        readonly name: "_deActivateMarket";
        readonly type: "bytes32";
    }];
    readonly name: "deActivateMarket";
    readonly outputs: readonly [];
    readonly payable: false;
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly constant: true;
    readonly inputs: readonly [{
        readonly internalType: "bytes32";
        readonly name: "_marketId";
        readonly type: "bytes32";
    }];
    readonly name: "getMarketActive";
    readonly outputs: readonly [{
        readonly internalType: "bool";
        readonly name: "_active";
        readonly type: "bool";
    }];
    readonly payable: false;
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly constant: false;
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "_newMaximumLeverage";
        readonly type: "uint256";
    }];
    readonly name: "setMaximumLeverage";
    readonly outputs: readonly [];
    readonly payable: false;
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly constant: true;
    readonly inputs: readonly [];
    readonly name: "getMaximumLeverage";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "_maxLeverage";
        readonly type: "uint256";
    }];
    readonly payable: false;
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly constant: false;
    readonly inputs: readonly [];
    readonly name: "pauseState";
    readonly outputs: readonly [];
    readonly payable: false;
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly constant: false;
    readonly inputs: readonly [];
    readonly name: "unPauseState";
    readonly outputs: readonly [];
    readonly payable: false;
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly constant: false;
    readonly inputs: readonly [{
        readonly internalType: "bytes32";
        readonly name: "_sideChainMerkleRoot";
        readonly type: "bytes32";
    }];
    readonly name: "setSideChainMerkleRoot";
    readonly outputs: readonly [];
    readonly payable: false;
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly constant: true;
    readonly inputs: readonly [];
    readonly name: "getSideChainMerkleRoot";
    readonly outputs: readonly [{
        readonly internalType: "bytes32";
        readonly name: "_sideChainMerkleRoot";
        readonly type: "bytes32";
    }];
    readonly payable: false;
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly constant: false;
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "_address";
        readonly type: "address";
    }];
    readonly name: "setSideChainOperator";
    readonly outputs: readonly [];
    readonly payable: false;
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly constant: true;
    readonly inputs: readonly [];
    readonly name: "getSideChainOperator";
    readonly outputs: readonly [{
        readonly internalType: "address";
        readonly name: "_address";
        readonly type: "address";
    }];
    readonly payable: false;
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly constant: true;
    readonly inputs: readonly [];
    readonly name: "getSideChainMerkleRootWrittenAtTime";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "_sideChainMerkleRoot";
        readonly type: "uint256";
    }];
    readonly payable: false;
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly constant: false;
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "_address";
        readonly type: "address";
    }, {
        readonly internalType: "bytes32";
        readonly name: "_marketId";
        readonly type: "bytes32";
    }, {
        readonly internalType: "uint256";
        readonly name: "_timeStamp";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "_longShares";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "_shortShares";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "_meanEntryPrice";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "_meanEntrySpread";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "_meanEntryLeverage";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "_liquidationPrice";
        readonly type: "uint256";
    }];
    readonly name: "setPosition";
    readonly outputs: readonly [];
    readonly payable: false;
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly constant: true;
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "_address";
        readonly type: "address";
    }, {
        readonly internalType: "bytes32";
        readonly name: "_marketId";
        readonly type: "bytes32";
    }];
    readonly name: "getPosition";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "_longShares";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "_shortShares";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "_meanEntryPrice";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "_meanEntrySpread";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "_meanEntryLeverage";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "_liquidationPrice";
        readonly type: "uint256";
    }];
    readonly payable: false;
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly constant: true;
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "_address";
        readonly type: "address";
    }, {
        readonly internalType: "bytes32";
        readonly name: "_marketId";
        readonly type: "bytes32";
    }, {
        readonly internalType: "uint256";
        readonly name: "_timeStamp";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "_longShares";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "_shortShares";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "_meanEntryPrice";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "_meanEntrySpread";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "_meanEntryLeverage";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "_liquidationPrice";
        readonly type: "uint256";
    }];
    readonly name: "getPositionHash";
    readonly outputs: readonly [{
        readonly internalType: "bytes32";
        readonly name: "_hash";
        readonly type: "bytes32";
    }];
    readonly payable: false;
    readonly stateMutability: "pure";
    readonly type: "function";
}, {
    readonly constant: true;
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "_address";
        readonly type: "address";
    }, {
        readonly internalType: "uint256";
        readonly name: "_balance";
        readonly type: "uint256";
    }];
    readonly name: "getBalanceHash";
    readonly outputs: readonly [{
        readonly internalType: "bytes32";
        readonly name: "_hash";
        readonly type: "bytes32";
    }];
    readonly payable: false;
    readonly stateMutability: "pure";
    readonly type: "function";
}, {
    readonly constant: true;
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "_address";
        readonly type: "address";
    }, {
        readonly internalType: "bytes32";
        readonly name: "_marketId";
        readonly type: "bytes32";
    }];
    readonly name: "getLastUpdated";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "_lastUpdated";
        readonly type: "uint256";
    }];
    readonly payable: false;
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly constant: true;
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "_address";
        readonly type: "address";
    }, {
        readonly internalType: "bytes32";
        readonly name: "_marketId";
        readonly type: "bytes32";
    }];
    readonly name: "getLongShares";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "_longShares";
        readonly type: "uint256";
    }];
    readonly payable: false;
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly constant: true;
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "_address";
        readonly type: "address";
    }, {
        readonly internalType: "bytes32";
        readonly name: "_marketId";
        readonly type: "bytes32";
    }];
    readonly name: "getShortShares";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "_shortShares";
        readonly type: "uint256";
    }];
    readonly payable: false;
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly constant: true;
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "_address";
        readonly type: "address";
    }, {
        readonly internalType: "bytes32";
        readonly name: "_marketId";
        readonly type: "bytes32";
    }];
    readonly name: "getMeanEntryPrice";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "_meanEntryPrice";
        readonly type: "uint256";
    }];
    readonly payable: false;
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly constant: true;
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "_address";
        readonly type: "address";
    }, {
        readonly internalType: "bytes32";
        readonly name: "_marketId";
        readonly type: "bytes32";
    }];
    readonly name: "getMeanEntrySpread";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "_meanEntrySpread";
        readonly type: "uint256";
    }];
    readonly payable: false;
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly constant: true;
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "_address";
        readonly type: "address";
    }, {
        readonly internalType: "bytes32";
        readonly name: "_marketId";
        readonly type: "bytes32";
    }];
    readonly name: "getMeanEntryLeverage";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "_meanEntryLeverage";
        readonly type: "uint256";
    }];
    readonly payable: false;
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly constant: true;
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "_address";
        readonly type: "address";
    }, {
        readonly internalType: "bytes32";
        readonly name: "_marketId";
        readonly type: "bytes32";
    }];
    readonly name: "getLiquidationPrice";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "_liquidationPrice";
        readonly type: "uint256";
    }];
    readonly payable: false;
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly constant: false;
    readonly inputs: readonly [];
    readonly name: "payOperatingReward";
    readonly outputs: readonly [];
    readonly payable: false;
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}];
export declare const morpherTokenAbi: readonly [{
    readonly type: "function";
    readonly name: "allowance";
    readonly inputs: readonly [{
        readonly name: "owner";
        readonly type: "address";
        readonly internalType: "address";
    }, {
        readonly name: "spender";
        readonly type: "address";
        readonly internalType: "address";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "approve";
    readonly inputs: readonly [{
        readonly name: "spender";
        readonly type: "address";
        readonly internalType: "address";
    }, {
        readonly name: "value";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "bool";
        readonly internalType: "bool";
    }];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "balanceOf";
    readonly inputs: readonly [{
        readonly name: "account";
        readonly type: "address";
        readonly internalType: "address";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "burn";
    readonly inputs: readonly [{
        readonly name: "from";
        readonly type: "address";
        readonly internalType: "address";
    }, {
        readonly name: "amount";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "decimals";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint8";
        readonly internalType: "uint8";
    }];
    readonly stateMutability: "view";
}, {
    readonly constant: true;
    readonly inputs: readonly [];
    readonly name: "version";
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "string";
    }];
    readonly payable: false;
    readonly type: "function";
}, {
    readonly type: "function";
    readonly name: "deposit";
    readonly inputs: readonly [{
        readonly name: "user";
        readonly type: "address";
        readonly internalType: "address";
    }, {
        readonly name: "depositData";
        readonly type: "bytes";
        readonly internalType: "bytes";
    }];
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "getDailyMintedTransferLimit";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "getDailyMintedTransfers";
    readonly inputs: readonly [{
        readonly name: "account";
        readonly type: "address";
        readonly internalType: "address";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "getLockedRewards";
    readonly inputs: readonly [{
        readonly name: "account";
        readonly type: "address";
        readonly internalType: "address";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "getRestrictTransfers";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "bool";
        readonly internalType: "bool";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "getTimeLock";
    readonly inputs: readonly [{
        readonly name: "account";
        readonly type: "address";
        readonly internalType: "address";
    }];
    readonly outputs: readonly [{
        readonly name: "amount";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }, {
        readonly name: "lockedUntil";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "getTotalLockedRewards";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "getTotalTimeLocked";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "getTotalTokensInPositions";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "getTradeableBalanceOf";
    readonly inputs: readonly [{
        readonly name: "account";
        readonly type: "address";
        readonly internalType: "address";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "getTransferredInTokens";
    readonly inputs: readonly [{
        readonly name: "account";
        readonly type: "address";
        readonly internalType: "address";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "initialize";
    readonly inputs: readonly [{
        readonly name: "_morpherAccessControlAddress";
        readonly type: "address";
        readonly internalType: "address";
    }, {
        readonly name: "_morpherStateAddress";
        readonly type: "address";
        readonly internalType: "address";
    }, {
        readonly name: "_permitName";
        readonly type: "string";
        readonly internalType: "string";
    }];
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "lockRewards";
    readonly inputs: readonly [{
        readonly name: "account";
        readonly type: "address";
        readonly internalType: "address";
    }, {
        readonly name: "amount";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "lockTokensForTime";
    readonly inputs: readonly [{
        readonly name: "account";
        readonly type: "address";
        readonly internalType: "address";
    }, {
        readonly name: "amount";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }, {
        readonly name: "lockDuration";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "mint";
    readonly inputs: readonly [{
        readonly name: "to";
        readonly type: "address";
        readonly internalType: "address";
    }, {
        readonly name: "amount";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "morpherAccessControl";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "address";
        readonly internalType: "contract MorpherAccessControl";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "morpherState";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "address";
        readonly internalType: "contract MorpherState";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "name";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "string";
        readonly internalType: "string";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "nonces";
    readonly inputs: readonly [{
        readonly name: "owner";
        readonly type: "address";
        readonly internalType: "address";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "pause";
    readonly inputs: readonly [];
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "paused";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "bool";
        readonly internalType: "bool";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "permit";
    readonly inputs: readonly [{
        readonly name: "owner";
        readonly type: "address";
        readonly internalType: "address";
    }, {
        readonly name: "spender";
        readonly type: "address";
        readonly internalType: "address";
    }, {
        readonly name: "value";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }, {
        readonly name: "deadline";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }, {
        readonly name: "v";
        readonly type: "uint8";
        readonly internalType: "uint8";
    }, {
        readonly name: "r";
        readonly type: "bytes32";
        readonly internalType: "bytes32";
    }, {
        readonly name: "s";
        readonly type: "bytes32";
        readonly internalType: "bytes32";
    }];
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "proxiableUUID";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "bytes32";
        readonly internalType: "bytes32";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "setDailyMintedTransferLimit";
    readonly inputs: readonly [{
        readonly name: "limit";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "setMorpherStateAddress";
    readonly inputs: readonly [{
        readonly name: "_morpherState";
        readonly type: "address";
        readonly internalType: "address";
    }];
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "setRestrictTransfers";
    readonly inputs: readonly [{
        readonly name: "restrictTransfers";
        readonly type: "bool";
        readonly internalType: "bool";
    }];
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "setTotalInPositions";
    readonly inputs: readonly [{
        readonly name: "totalTokensInPositions";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "symbol";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "string";
        readonly internalType: "string";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "totalSupply";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "transfer";
    readonly inputs: readonly [{
        readonly name: "to";
        readonly type: "address";
        readonly internalType: "address";
    }, {
        readonly name: "value";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "bool";
        readonly internalType: "bool";
    }];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "transferFrom";
    readonly inputs: readonly [{
        readonly name: "from";
        readonly type: "address";
        readonly internalType: "address";
    }, {
        readonly name: "to";
        readonly type: "address";
        readonly internalType: "address";
    }, {
        readonly name: "value";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "bool";
        readonly internalType: "bool";
    }];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "unlockExpiredTokens";
    readonly inputs: readonly [{
        readonly name: "account";
        readonly type: "address";
        readonly internalType: "address";
    }];
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "unlockRewards";
    readonly inputs: readonly [{
        readonly name: "account";
        readonly type: "address";
        readonly internalType: "address";
    }, {
        readonly name: "amount";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "unpause";
    readonly inputs: readonly [];
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "upgradeToAndCall";
    readonly inputs: readonly [{
        readonly name: "newImplementation";
        readonly type: "address";
        readonly internalType: "address";
    }, {
        readonly name: "data";
        readonly type: "bytes";
        readonly internalType: "bytes";
    }];
    readonly outputs: readonly [];
    readonly stateMutability: "payable";
}, {
    readonly type: "function";
    readonly name: "withdraw";
    readonly inputs: readonly [{
        readonly name: "amount";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "event";
    readonly name: "Approval";
    readonly inputs: readonly [{
        readonly name: "owner";
        readonly type: "address";
        readonly indexed: true;
        readonly internalType: "address";
    }, {
        readonly name: "spender";
        readonly type: "address";
        readonly indexed: true;
        readonly internalType: "address";
    }, {
        readonly name: "value";
        readonly type: "uint256";
        readonly indexed: false;
        readonly internalType: "uint256";
    }];
    readonly anonymous: false;
}, {
    readonly type: "event";
    readonly name: "DailyMintedTransferLimitUpdated";
    readonly inputs: readonly [{
        readonly name: "oldLimit";
        readonly type: "uint256";
        readonly indexed: false;
        readonly internalType: "uint256";
    }, {
        readonly name: "newLimit";
        readonly type: "uint256";
        readonly indexed: false;
        readonly internalType: "uint256";
    }];
    readonly anonymous: false;
}, {
    readonly type: "event";
    readonly name: "EIP712DomainChanged";
    readonly inputs: readonly [];
    readonly anonymous: false;
}, {
    readonly type: "event";
    readonly name: "Initialized";
    readonly inputs: readonly [{
        readonly name: "version";
        readonly type: "uint64";
        readonly indexed: false;
        readonly internalType: "uint64";
    }];
    readonly anonymous: false;
}, {
    readonly type: "event";
    readonly name: "MigrationTokensLocked";
    readonly inputs: readonly [{
        readonly name: "account";
        readonly type: "address";
        readonly indexed: true;
        readonly internalType: "address";
    }, {
        readonly name: "amount";
        readonly type: "uint256";
        readonly indexed: false;
        readonly internalType: "uint256";
    }, {
        readonly name: "lockedUntil";
        readonly type: "uint256";
        readonly indexed: false;
        readonly internalType: "uint256";
    }];
    readonly anonymous: false;
}, {
    readonly type: "event";
    readonly name: "MintedTokensTransferred";
    readonly inputs: readonly [{
        readonly name: "from";
        readonly type: "address";
        readonly indexed: true;
        readonly internalType: "address";
    }, {
        readonly name: "to";
        readonly type: "address";
        readonly indexed: true;
        readonly internalType: "address";
    }, {
        readonly name: "amount";
        readonly type: "uint256";
        readonly indexed: false;
        readonly internalType: "uint256";
    }];
    readonly anonymous: false;
}, {
    readonly type: "event";
    readonly name: "Paused";
    readonly inputs: readonly [{
        readonly name: "account";
        readonly type: "address";
        readonly indexed: false;
        readonly internalType: "address";
    }];
    readonly anonymous: false;
}, {
    readonly type: "event";
    readonly name: "RewardsLocked";
    readonly inputs: readonly [{
        readonly name: "account";
        readonly type: "address";
        readonly indexed: true;
        readonly internalType: "address";
    }, {
        readonly name: "amount";
        readonly type: "uint256";
        readonly indexed: false;
        readonly internalType: "uint256";
    }];
    readonly anonymous: false;
}, {
    readonly type: "event";
    readonly name: "RewardsUnlocked";
    readonly inputs: readonly [{
        readonly name: "account";
        readonly type: "address";
        readonly indexed: true;
        readonly internalType: "address";
    }, {
        readonly name: "amount";
        readonly type: "uint256";
        readonly indexed: false;
        readonly internalType: "uint256";
    }];
    readonly anonymous: false;
}, {
    readonly type: "event";
    readonly name: "SetRestrictTransfers";
    readonly inputs: readonly [{
        readonly name: "_oldValue";
        readonly type: "bool";
        readonly indexed: false;
        readonly internalType: "bool";
    }, {
        readonly name: "_newValue";
        readonly type: "bool";
        readonly indexed: false;
        readonly internalType: "bool";
    }];
    readonly anonymous: false;
}, {
    readonly type: "event";
    readonly name: "SetTotalTokensInPositions";
    readonly inputs: readonly [{
        readonly name: "_oldValue";
        readonly type: "uint256";
        readonly indexed: false;
        readonly internalType: "uint256";
    }, {
        readonly name: "_newValue";
        readonly type: "uint256";
        readonly indexed: false;
        readonly internalType: "uint256";
    }];
    readonly anonymous: false;
}, {
    readonly type: "event";
    readonly name: "SetTotalTokensOnOtherChain";
    readonly inputs: readonly [{
        readonly name: "_oldValue";
        readonly type: "uint256";
        readonly indexed: false;
        readonly internalType: "uint256";
    }, {
        readonly name: "_newValue";
        readonly type: "uint256";
        readonly indexed: false;
        readonly internalType: "uint256";
    }];
    readonly anonymous: false;
}, {
    readonly type: "event";
    readonly name: "TokensLocked";
    readonly inputs: readonly [{
        readonly name: "account";
        readonly type: "address";
        readonly indexed: true;
        readonly internalType: "address";
    }, {
        readonly name: "amount";
        readonly type: "uint256";
        readonly indexed: false;
        readonly internalType: "uint256";
    }, {
        readonly name: "lockedUntil";
        readonly type: "uint256";
        readonly indexed: false;
        readonly internalType: "uint256";
    }];
    readonly anonymous: false;
}, {
    readonly type: "event";
    readonly name: "TokensTransferredIn";
    readonly inputs: readonly [{
        readonly name: "to";
        readonly type: "address";
        readonly indexed: true;
        readonly internalType: "address";
    }, {
        readonly name: "amount";
        readonly type: "uint256";
        readonly indexed: false;
        readonly internalType: "uint256";
    }];
    readonly anonymous: false;
}, {
    readonly type: "event";
    readonly name: "TokensUnlocked";
    readonly inputs: readonly [{
        readonly name: "account";
        readonly type: "address";
        readonly indexed: true;
        readonly internalType: "address";
    }, {
        readonly name: "amount";
        readonly type: "uint256";
        readonly indexed: false;
        readonly internalType: "uint256";
    }];
    readonly anonymous: false;
}, {
    readonly type: "event";
    readonly name: "Transfer";
    readonly inputs: readonly [{
        readonly name: "from";
        readonly type: "address";
        readonly indexed: true;
        readonly internalType: "address";
    }, {
        readonly name: "to";
        readonly type: "address";
        readonly indexed: true;
        readonly internalType: "address";
    }, {
        readonly name: "value";
        readonly type: "uint256";
        readonly indexed: false;
        readonly internalType: "uint256";
    }];
    readonly anonymous: false;
}, {
    readonly type: "event";
    readonly name: "Unpaused";
    readonly inputs: readonly [{
        readonly name: "account";
        readonly type: "address";
        readonly indexed: false;
        readonly internalType: "address";
    }];
    readonly anonymous: false;
}, {
    readonly type: "event";
    readonly name: "Upgraded";
    readonly inputs: readonly [{
        readonly name: "implementation";
        readonly type: "address";
        readonly indexed: true;
        readonly internalType: "address";
    }];
    readonly anonymous: false;
}, {
    readonly type: "error";
    readonly name: "AddressEmptyCode";
    readonly inputs: readonly [{
        readonly name: "target";
        readonly type: "address";
        readonly internalType: "address";
    }];
}, {
    readonly type: "error";
    readonly name: "ECDSAInvalidSignature";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "ECDSAInvalidSignatureLength";
    readonly inputs: readonly [{
        readonly name: "length";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
}, {
    readonly type: "error";
    readonly name: "ECDSAInvalidSignatureS";
    readonly inputs: readonly [{
        readonly name: "s";
        readonly type: "bytes32";
        readonly internalType: "bytes32";
    }];
}, {
    readonly type: "error";
    readonly name: "ERC1967InvalidImplementation";
    readonly inputs: readonly [{
        readonly name: "implementation";
        readonly type: "address";
        readonly internalType: "address";
    }];
}, {
    readonly type: "error";
    readonly name: "ERC1967NonPayable";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "ERC20InsufficientAllowance";
    readonly inputs: readonly [{
        readonly name: "spender";
        readonly type: "address";
        readonly internalType: "address";
    }, {
        readonly name: "allowance";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }, {
        readonly name: "needed";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
}, {
    readonly type: "error";
    readonly name: "ERC20InsufficientBalance";
    readonly inputs: readonly [{
        readonly name: "sender";
        readonly type: "address";
        readonly internalType: "address";
    }, {
        readonly name: "balance";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }, {
        readonly name: "needed";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
}, {
    readonly type: "error";
    readonly name: "ERC20InvalidApprover";
    readonly inputs: readonly [{
        readonly name: "approver";
        readonly type: "address";
        readonly internalType: "address";
    }];
}, {
    readonly type: "error";
    readonly name: "ERC20InvalidReceiver";
    readonly inputs: readonly [{
        readonly name: "receiver";
        readonly type: "address";
        readonly internalType: "address";
    }];
}, {
    readonly type: "error";
    readonly name: "ERC20InvalidSender";
    readonly inputs: readonly [{
        readonly name: "sender";
        readonly type: "address";
        readonly internalType: "address";
    }];
}, {
    readonly type: "error";
    readonly name: "ERC20InvalidSpender";
    readonly inputs: readonly [{
        readonly name: "spender";
        readonly type: "address";
        readonly internalType: "address";
    }];
}, {
    readonly type: "error";
    readonly name: "ERC2612ExpiredSignature";
    readonly inputs: readonly [{
        readonly name: "deadline";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
}, {
    readonly type: "error";
    readonly name: "ERC2612InvalidSigner";
    readonly inputs: readonly [{
        readonly name: "signer";
        readonly type: "address";
        readonly internalType: "address";
    }, {
        readonly name: "owner";
        readonly type: "address";
        readonly internalType: "address";
    }];
}, {
    readonly type: "error";
    readonly name: "EnforcedPause";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "ExpectedPause";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "FailedCall";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "InvalidAccountNonce";
    readonly inputs: readonly [{
        readonly name: "account";
        readonly type: "address";
        readonly internalType: "address";
    }, {
        readonly name: "currentNonce";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
}, {
    readonly type: "error";
    readonly name: "InvalidInitialization";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "NotInitializing";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "UUPSUnauthorizedCallContext";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "UUPSUnsupportedProxiableUUID";
    readonly inputs: readonly [{
        readonly name: "slot";
        readonly type: "bytes32";
        readonly internalType: "bytes32";
    }];
}];
