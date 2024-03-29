import {
  ADATokenLogo,
  BNBTokenLogo,
  BTCLogo,
  DOGETokenLogo,
  ETHLogo,
  ETHTokenLogo,
  MATICTokenLogo,
  ATFLogo,
  USDTLogo,
  XRPTokenLogo,
  SOLTokenLogo,
  LTCTokenLogo,
  AVAXTokenLogo,
  USDLogo,
  AUDLogo,
  EURLogo,
  JPYLogo,
  CADLogo,
  GBPLogo,
} from "../components/icons";

export type TokenType = {
  symbol: string;
  icon: typeof ETHLogo;
  decimals: DecimalsType;
  address: AddressType;
  priceDecimals: number;
};

export interface AddressType {
  [key: number]: string;
}

export interface DecimalsType {
  [key: number]: number;
}

export const ETH: AddressType = {
  1: String().zeroAddress,
  5: String().zeroAddress,
  56: String().zeroAddress,
  97: String().zeroAddress,
};

export const BTC: AddressType = {
  1: String().zeroAddress,
  5: String().zeroAddress,
  56: String().zeroAddress,
  97: String().zeroAddress,
};

export const BNB: AddressType = {
  1: String().zeroAddress,
  5: String().zeroAddress,
  56: String().zeroAddress,
  97: String().zeroAddress,
};
export const WBNB: AddressType = {
  1: String().zeroAddress,
  5: String().zeroAddress,
  56: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
  97: "0x0302E130B79A2220725eDFe0B9315b6290Ed7D1D",
};

export const ATFToken: AddressType = {
  1: "0x04abEdA201850aC0124161F037Efd70c74ddC74C",
  5: "0xE2975bf674617bbCE57D2c72dCfC926716D8AC1F",
  56: "0x00000000ba2ca30042001abc545871380f570b1f",
  97: "0x000000fB6B0389cc3311198353A0b0f36AB03d44",
};

export const USDTToken: AddressType = {
  1: "0xdac17f958d2ee523a2206206994597c13d831ec7",
  5: "0x5cbb73B367FD69807381d06BC2041BEc86d8487d",
  56: "0x55d398326f99059ff775485246999027b3197955",
  97: "0xDd4A68D8236247BDC159F7C5fF92717AA634cBCc",
};

export const WBNBToken: AddressType = {
  1: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
  5: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
  56: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
  97: "0x0302E130B79A2220725eDFe0B9315b6290Ed7D1D",
};

export const SwapContract: AddressType = {
  1: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
  5: "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45",
  56: "0x10ED43C718714eb63d5aA57B78B54704E256024E",
  97: "0xC293C13be5d5c669c638aC293ec9Adc9542ffEda",
};

export const FuturesV2Contract: AddressType = {
  1: String().zeroAddress,
  5: String().zeroAddress,
  56: "0x02904e03937E6a36D475025212859f1956BeC3f0",
  97: "0x476981D37FaA3bE8E8768E8E7d0d01625433126a",
};
export const ATFService: AddressType = {
  1: "0xb5C9A6df1B4C525D629b85c5979f93cFc8D02Df4",
  5: "0xb5C9A6df1B4C525D629b85c5979f93cFc8D02Df4",
  56: "0xE230b95b392DA0914E0bb60421A36cCA1b650Fee",
  97: "0xae73c8f129065e2d60061f4557eca1358cca34db",
};

export const ATFServiceOther: AddressType = {
  1: "0xb5C9A6df1B4C525D629b85c5979f93cFc8D02Df4",
  5: "0xb5C9A6df1B4C525D629b85c5979f93cFc8D02Df4",
  56: "0xE230b95b392DA0914E0bb60421A36cCA1b650Fee",
  97: "0xae73c8f129065e2d60061f4557eca1358cca34db",
};

const All18: DecimalsType = {
  1: 18,
  5: 18,
  56: 18,
  97: 18,
};
const USDTDecimals: DecimalsType = {
  1: 6,
  5: 6,
  56: 18,
  97: 18,
};

export const TokenList: Array<TokenType> = [
  {
    symbol: "BTC",
    icon: BTCLogo,
    decimals: All18,
    address: BTC,
    priceDecimals: 2,
  },
  {
    symbol: "ETH",
    icon: ETHTokenLogo,
    decimals: All18,
    address: ETH,
    priceDecimals: 2,
  },
  {
    symbol: "USDT",
    icon: USDTLogo,
    decimals: USDTDecimals,
    address: USDTToken,
    priceDecimals: 2,
  },
  {
    symbol: "USD",
    icon: USDLogo,
    decimals: USDTDecimals,
    address: USDTToken,
    priceDecimals: 2,
  },
  {
    symbol: "ATF",
    icon: ATFLogo,
    decimals: All18,
    address: ATFToken,
    priceDecimals: 2,
  },
  {
    symbol: "BNB",
    icon: BNBTokenLogo,
    decimals: All18,
    address: BNB,
    priceDecimals: 2,
  },
  {
    symbol: "WBNB",
    icon: BNBTokenLogo,
    decimals: All18,
    address: WBNB,
    priceDecimals: 2,
  },
  {
    symbol: "BTC/USDT",
    icon: BTCLogo,
    decimals: All18,
    address: BTC,
    priceDecimals: 2,
  },
  {
    symbol: "ETH/USDT",
    icon: ETHTokenLogo,
    decimals: All18,
    address: ETH,
    priceDecimals: 2,
  },
  {
    symbol: "BNB/USDT",
    icon: BNBTokenLogo,
    decimals: All18,
    address: BNB,
    priceDecimals: 2,
  },
  {
    symbol: "MATIC/USDT",
    icon: MATICTokenLogo,
    decimals: All18,
    address: ATFToken,
    priceDecimals: 4,
  },
  {
    symbol: "ADA/USDT",
    icon: ADATokenLogo,
    decimals: All18,
    address: ATFToken,
    priceDecimals: 4,
  },
  {
    symbol: "DOGE/USDT",
    icon: DOGETokenLogo,
    decimals: All18,
    address: ATFToken,
    priceDecimals: 5,
  },
  {
    symbol: "XRP/USDT",
    icon: XRPTokenLogo,
    decimals: All18,
    address: ATFToken,
    priceDecimals: 4,
  },
  {
    symbol: "SOL/USDT",
    icon: SOLTokenLogo,
    decimals: All18,
    address: ATFToken,
    priceDecimals: 2,
  },
  {
    symbol: "LTC/USDT",
    icon: LTCTokenLogo,
    decimals: All18,
    address: ATFToken,
    priceDecimals: 2,
  },
  {
    symbol: "AVAX/USDT",
    icon: AVAXTokenLogo,
    decimals: All18,
    address: ATFToken,
    priceDecimals: 3,
  },
  {
    symbol: "AUD/USD",
    icon: AUDLogo,
    decimals: All18,
    address: ETH,
    priceDecimals: 5,
  },
  {
    symbol: "EUR/USD",
    icon: EURLogo,
    decimals: All18,
    address: ETH,
    priceDecimals: 5,
  },
  {
    symbol: "USD/JPY",
    icon: JPYLogo,
    decimals: All18,
    address: ETH,
    priceDecimals: 3,
  },
  {
    symbol: "USD/CAD",
    icon: CADLogo,
    decimals: All18,
    address: ETH,
    priceDecimals: 5,
  },
  {
    symbol: "GBP/USD",
    icon: GBPLogo,
    decimals: All18,
    address: ETH,
    priceDecimals: 5,
  },
];
