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
  56: "0xD325f5b059F889e82dE26c9791677017Fcfb85e4",
  97: "0x1529E8cC52c6BD545099843e6feF2e85073341A8",
};

export const ATFServiceOther: AddressType = {
  1: "0xb5C9A6df1B4C525D629b85c5979f93cFc8D02Df4",
  5: "0xb5C9A6df1B4C525D629b85c5979f93cFc8D02Df4",
  56: "0xD325f5b059F889e82dE26c9791677017Fcfb85e4",
  97: "0x1529E8cC52c6BD545099843e6feF2e85073341A8",
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
    symbol: "BNB",
    icon: BNBTokenLogo,
    decimals: All18,
    address: BNB,
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
    symbol: "USDT",
    icon: USDTLogo,
    decimals: USDTDecimals,
    address: USDTToken,
    priceDecimals: 2,
  },
  {
    symbol: "MATIC",
    icon: MATICTokenLogo,
    decimals: All18,
    address: ATFToken,
    priceDecimals: 4,
  },
  {
    symbol: "ADA",
    icon: ADATokenLogo,
    decimals: All18,
    address: ATFToken,
    priceDecimals: 4,
  },
  {
    symbol: "DOGE",
    icon: DOGETokenLogo,
    decimals: All18,
    address: ATFToken,
    priceDecimals: 5,
  },
  {
    symbol: "XRP",
    icon: XRPTokenLogo,
    decimals: All18,
    address: ATFToken,
    priceDecimals: 4,
  },
];
