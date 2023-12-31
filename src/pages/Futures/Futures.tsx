import Stack from "@mui/material/Stack";
import { BigNumber } from "ethers/lib/ethers";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import useWindowWidth, { WidthType } from "../../hooks/useWindowWidth";
import FuturesMoreInfo from "./MoreInfo";
import FuturesNewOrder from "./NewOrder";
import FuturesOrderList, { FuturesOrderService } from "./OrderList";
import ExchangeTVChart from "./ExchangeTVChart";
import {
  getPriceListV2,
  serviceFutureHistory,
  serviceIsOpen,
  serviceList,
} from "../../lib/ArithFiRequest";
import { getQueryVariable } from "../../lib/queryVaribale";
import useArithFi from "../../hooks/useArithFi";
import { FuturesHistoryService } from "../../hooks/useFuturesHistory";
import { useSearchParams } from "react-router-dom";
import { getCurrentPriceOfToken } from "../../domain/prices";

export interface FuturesPrice {
  [key: string]: BigNumber;
}
export interface FuturesPricePercent {
  [key: string]: number;
}
const UPDATE_PRICE = 15;
export const isForex = (lever: number) => {
  return lever === 100;
};
export const priceToken = [
  "ETH/USDT",
  "BTC/USDT",
  "BNB/USDT",
  "MATIC/USDT",
  "ADA/USDT",
  "DOGE/USDT",
  "XRP/USDT",
  "SOL/USDT",
  "LTC/USDT",
  "AVAX/USDT",
  "AUD/USD",
  "EUR/USD",
  "USD/JPY",
  "USD/CAD",
  "GBP/USD",
];
const Futures: FC = () => {
  const { width, isBigMobile } = useWindowWidth();
  const [searchParams, setSearchParams] = useSearchParams();
  const pt = searchParams.get("pt");
  const { account, chainsData, signature } = useArithFi();
  const defaultTokenPair = useMemo(() => {
    if (pt) {
      return pt;
    }
    let code = getQueryVariable("pt");
    if (code) {
      const num = priceToken.filter(
        (item) => item.toLowerCase() === code!.toLowerCase()
      );
      if (num && num.length > 0) {
        return code.toLocaleUpperCase();
      }
    }
    return "ETH/USDT";
  }, [pt]);
  const [tokenPair, setTokenPair] = useState(defaultTokenPair);
  const [basePrice, setBasePrice] = useState<FuturesPrice>();
  const [basePricePercent, setBasePricePercent] =
    useState<FuturesPricePercent>();
  const [orderPrice, setOrderPrice] = useState<FuturesPrice>();
  const [pOrderListV2, setPOrderListV2] = useState<Array<FuturesOrderService>>(
    []
  );
  const [limitOrderList, setLimitOrderList] = useState<
    Array<FuturesOrderService>
  >([]);
  const [historyList, setHistoryList] = useState<Array<FuturesHistoryService>>(
    []
  );
  const [forexOpen, setForexOpen] = useState(false);

  useEffect(() => {
    const time = setInterval(() => {
      (async () => {
        const newPrice: number = await getCurrentPriceOfToken(tokenPair);
        if (newPrice) {
          const newPriceBigNum = newPrice.toString().stringToBigNumber(18);
          if (newPriceBigNum) {
            console.log(newPrice);
            const newList = { ...basePrice };
            newList[`${tokenPair}`] = newPriceBigNum;
            setBasePrice(newList);
          }
        }
      })();
    }, 1000);
    return () => {
      clearInterval(time);
    };
  }, [basePrice, tokenPair]);

  const getPrice = useCallback(async () => {
    const listPriceBase: { [key: string]: any } = await getPriceListV2();

    const percent = () => {
      const ETHPricePercent = listPriceBase
        ? listPriceBase["value"]["ETHUSDT"]["priceChangePercent"]?.toString()
        : undefined;
      const BTCPricePercent = listPriceBase
        ? listPriceBase["value"]["BTCUSDT"]["priceChangePercent"]?.toString()
        : undefined;
      const BNBPricePercent = listPriceBase
        ? listPriceBase["value"]["BNBUSDT"]["priceChangePercent"]?.toString()
        : undefined;
      const MATICPricePercent = listPriceBase
        ? listPriceBase["value"]["MATICUSDT"]["priceChangePercent"]?.toString()
        : undefined;
      const ADAPricePercent = listPriceBase
        ? listPriceBase["value"]["ADAUSDT"]["priceChangePercent"]?.toString()
        : undefined;
      const DOGEPricePercent = listPriceBase
        ? listPriceBase["value"]["DOGEUSDT"]["priceChangePercent"]?.toString()
        : undefined;
      const XRPPricePercent = listPriceBase
        ? listPriceBase["value"]["XRPUSDT"]["priceChangePercent"]?.toString()
        : undefined;
      const SOLPricePercent = listPriceBase
        ? listPriceBase["value"]["SOLUSDT"]["priceChangePercent"]?.toString()
        : undefined;
      const LTCPricePercent = listPriceBase
        ? listPriceBase["value"]["LTCUSDT"]["priceChangePercent"]?.toString()
        : undefined;
      const AVAXPricePercent = listPriceBase
        ? listPriceBase["value"]["AVAXUSDT"]["priceChangePercent"]?.toString()
        : undefined;
      const EURUSDPricePercent = listPriceBase
        ? listPriceBase["value"]["EURUSD"]["priceChangePercent"]?.toString()
        : undefined;
      const GBPUSDPricePercent = listPriceBase
        ? listPriceBase["value"]["GBPUSD"]["priceChangePercent"]?.toString()
        : undefined;
      const AUDUSDPricePercent = listPriceBase
        ? listPriceBase["value"]["AUDUSD"]["priceChangePercent"]?.toString()
        : undefined;
      const USDJPYPricePercent = listPriceBase
        ? listPriceBase["value"]["USDJPY"]["priceChangePercent"]?.toString()
        : undefined;
      const USDCADPricePercent = listPriceBase
        ? listPriceBase["value"]["USDCAD"]["priceChangePercent"]?.toString()
        : undefined;
      if (
        ETHPricePercent &&
        BTCPricePercent &&
        BNBPricePercent &&
        MATICPricePercent &&
        ADAPricePercent &&
        DOGEPricePercent &&
        XRPPricePercent &&
        SOLPricePercent &&
        LTCPricePercent &&
        AVAXPricePercent &&
        EURUSDPricePercent &&
        GBPUSDPricePercent &&
        AUDUSDPricePercent &&
        USDJPYPricePercent &&
        USDCADPricePercent
      ) {
        const newPrice: FuturesPricePercent = {
          "ETH/USDT": Number(ETHPricePercent),
          "BTC/USDT": Number(BTCPricePercent),
          "BNB/USDT": Number(BNBPricePercent),
          "MATIC/USDT": Number(MATICPricePercent),
          "ADA/USDT": Number(ADAPricePercent),
          "DOGE/USDT": Number(DOGEPricePercent),
          "XRP/USDT": Number(XRPPricePercent),
          "SOL/USDT": Number(SOLPricePercent),
          "LTC/USDT": Number(LTCPricePercent),
          "AVAX/USDT": Number(AVAXPricePercent),
          "EUR/USD": Number(EURUSDPricePercent),
          "GBP/USD": Number(GBPUSDPricePercent),
          "AUD/USD": Number(AUDUSDPricePercent),
          "USD/JPY": Number(USDJPYPricePercent),
          "USD/CAD": Number(USDCADPricePercent),
        };
        return newPrice;
      } else {
        return undefined;
      }
    };

    const ETHPrice = listPriceBase
      ? listPriceBase["value"]["ETHUSDT"]["price"]
          ?.toString()
          ?.stringToBigNumber(18)
      : undefined;
    const BTCPrice = listPriceBase
      ? listPriceBase["value"]["BTCUSDT"]["price"]
          ?.toString()
          ?.stringToBigNumber(18)
      : undefined;
    const BNBPrice = listPriceBase
      ? listPriceBase["value"]["BNBUSDT"]["price"]
          ?.toString()
          ?.stringToBigNumber(18)
      : undefined;
    const MATICPrice = listPriceBase
      ? listPriceBase["value"]["MATICUSDT"]["price"]
          ?.toString()
          ?.stringToBigNumber(18)
      : undefined;
    const ADAPrice = listPriceBase
      ? listPriceBase["value"]["ADAUSDT"]["price"]
          ?.toString()
          ?.stringToBigNumber(18)
      : undefined;
    const DOGEPrice = listPriceBase
      ? listPriceBase["value"]["DOGEUSDT"]["price"]
          ?.toString()
          ?.stringToBigNumber(18)
      : undefined;
    const XRPPrice = listPriceBase
      ? listPriceBase["value"]["XRPUSDT"]["price"]
          ?.toString()
          ?.stringToBigNumber(18)
      : undefined;
    const SOLPrice = listPriceBase
      ? listPriceBase["value"]["SOLUSDT"]["price"]
          ?.toString()
          ?.stringToBigNumber(18)
      : undefined;
    const LTCPrice = listPriceBase
      ? listPriceBase["value"]["LTCUSDT"]["price"]
          ?.toString()
          ?.stringToBigNumber(18)
      : undefined;
    const AVAXPrice = listPriceBase
      ? listPriceBase["value"]["AVAXUSDT"]["price"]
          .toString()
          .stringToBigNumber(18)
      : undefined;
    const EURUSDPrice = listPriceBase
      ? listPriceBase["value"]["EURUSD"]["price"]
          ?.toString()
          ?.stringToBigNumber(18)
      : undefined;
    const GBPUSDPrice = listPriceBase
      ? listPriceBase["value"]["GBPUSD"]["price"]
          ?.toString()
          ?.stringToBigNumber(18)
      : undefined;
    const AUDUSDPrice = listPriceBase
      ? listPriceBase["value"]["AUDUSD"]["price"]
          ?.toString()
          ?.stringToBigNumber(18)
      : undefined;
    const USDJPYPrice = listPriceBase
      ? listPriceBase["value"]["USDJPY"]["price"]
          ?.toString()
          ?.stringToBigNumber(18)
      : undefined;
    const USDCADPrice = listPriceBase
      ? listPriceBase["value"]["USDCAD"]["price"]
          ?.toString()
          ?.stringToBigNumber(18)
      : undefined;

    const newPricePercent = percent();
    if (
      ETHPrice &&
      BTCPrice &&
      BNBPrice &&
      MATICPrice &&
      ADAPrice &&
      DOGEPrice &&
      XRPPrice &&
      SOLPrice &&
      LTCPrice &&
      AVAXPrice &&
      EURUSDPrice &&
      GBPUSDPrice &&
      AUDUSDPrice &&
      USDJPYPrice &&
      USDCADPrice
    ) {
      const newPrice: FuturesPrice = {
        "ETH/USDT": ETHPrice,
        "BTC/USDT": BTCPrice,
        "BNB/USDT": BNBPrice,
        "MATIC/USDT": MATICPrice,
        "ADA/USDT": ADAPrice,
        "DOGE/USDT": DOGEPrice,
        "XRP/USDT": XRPPrice,
        "SOL/USDT": SOLPrice,
        "LTC/USDT": LTCPrice,
        "AVAX/USDT": AVAXPrice,
        "EUR/USD": EURUSDPrice,
        "GBP/USD": GBPUSDPrice,
        "AUD/USD": AUDUSDPrice,
        "USD/JPY": USDJPYPrice,
        "USD/CAD": USDCADPrice,
      };
      return [newPrice, newPricePercent];
    } else {
      return undefined;
    }
  }, []);

  const getList = useCallback(async () => {
    try {
      if (!chainsData.chainId || !account.address || !signature) {
        return;
      }
      const baseList = await serviceList(chainsData.chainId, account.address, {
        Authorization: signature.signature,
      });
      if (Number(baseList["errorCode"]) === 0) {
        const list: Array<FuturesOrderService> = baseList["value"]
          .map((item: { [x: string]: any }) => {
            return {
              id: item["id"],
              timestamp: item["timestamp"],
              walletAddress: item["walletAddress"],
              chainId: item["chainId"],
              product: item["product"],
              leverage: item["leverage"],
              orderPrice: item["orderPrice"],
              limitPrice: item["limitPrice"],
              direction: item["direction"],
              margin: item["margin"],
              append: item["append"],
              balance: item["balance"],
              fees: item["fees"],
              stopLossPrice: item["stopLossPrice"],
              takeProfitPrice: item["takeProfitPrice"],
              status: item["status"],
              copy: item["copy"],
            };
          })
          .filter((item: any) => item.leverage.toString() !== "0");
        const pOrderList = list.filter((item) => {
          return item.status === 2;
        });
        const orderList = list.filter((item) => {
          return item.status === 4;
        });
        setPOrderListV2(pOrderList);
        setLimitOrderList(orderList);
      }
    } catch (error) {
      console.log(error);
    }
  }, [account.address, chainsData.chainId, signature]);
  const getHistoryList = useCallback(async () => {
    try {
      if (!chainsData.chainId || !account.address || !signature) {
        return;
      }
      const baseList = await serviceFutureHistory(
        chainsData.chainId,
        account.address,
        { Authorization: signature.signature }
      );
      if (Number(baseList["errorCode"]) === 0) {
        const list: Array<FuturesHistoryService> = baseList["value"].map(
          (item: { [x: string]: any }) => {
            return {
              actualMargin: item["actualMargin"],
              actualRate: item["actualRate"],
              appendMargin: item["appendMargin"],
              index: item["index"],
              initialMargin: item["initialMargin"],
              lastPrice: item["lastPrice"],
              leverage: item["leverage"],
              openPrice: item["openPrice"],
              orderType: item["orderType"],
              orientation: item["orientation"],
              owner: item["owner"],
              sl: item["sl"],
              sp: item["sp"],
              time: item["time"],
              tokenPair: item["tokenPair"],
            };
          }
        );
        setHistoryList(list);
      }
    } catch (error) {
      console.log(error);
    }
  }, [account.address, chainsData.chainId, signature]);

  const getForexOpen = useCallback(async () => {
    try {
      if (!account.address || !signature) {
        return;
      }
      const base = await serviceIsOpen({ Authorization: signature.signature });
      if (base) {
        setForexOpen(base);
      }
    } catch (error) {
      console.log(error);
    }
  }, [account.address, signature]);

  const handleUpdateList = useCallback(() => {
    getList();
    getHistoryList();
  }, [getHistoryList, getList]);

  // update base price 1s
  useEffect(() => {
    const time = setInterval(() => {
      (async () => {
        const newPrice = await getPrice();
        setBasePrice(newPrice ? (newPrice[0] as FuturesPrice) : undefined);
        setBasePricePercent(
          newPrice ? (newPrice[1] as FuturesPricePercent) : undefined
        );
      })();
    }, 10000);
    return () => {
      clearInterval(time);
    };
  }, [getPrice]);
  // update order price 15s
  useEffect(() => {
    const getOrderPrice = async () => {
      const newPrice = await getPrice();
      setOrderPrice(newPrice ? (newPrice[0] as FuturesPrice) : undefined);
    };
    getOrderPrice();
    getForexOpen();
    const time = setInterval(() => {
      getOrderPrice();
      getForexOpen();
    }, UPDATE_PRICE * 1000);
    return () => {
      clearInterval(time);
    };
  }, [getForexOpen, getPrice]);
  // update list
  useEffect(() => {
    getList();
    getHistoryList();
    const time = setInterval(() => {
      getList();
      getHistoryList();
    }, 5 * 1000);
    return () => {
      clearInterval(time);
    };
  }, [getHistoryList, getList]);

  const paddingY = useMemo(() => {
    return isBigMobile ? 0 : 24;
  }, [isBigMobile]);
  const paddingX = useMemo(() => {
    return isBigMobile ? 0 : 40;
  }, [isBigMobile]);

  const exchangeTvChart = useCallback(() => {
    return (
      <ExchangeTVChart
        tokenPair={tokenPair}
        basePrice={basePrice}
        basePricePercent={basePricePercent}
        changeTokenPair={(value: string) => {
          setSearchParams({
            pt: value,
          });
          setTokenPair(value);
        }}
        forexOpen={forexOpen}
      />
    );
  }, [tokenPair, basePrice, basePricePercent, forexOpen, setSearchParams]);

  const orderList = useCallback(() => {
    return (
      <FuturesOrderList
        price={orderPrice}
        pOrderListV2={pOrderListV2}
        limitOrderList={limitOrderList}
        historyList={historyList}
        updateList={handleUpdateList}
        forexOpen={forexOpen}
      />
    );
  }, [
    forexOpen,
    handleUpdateList,
    historyList,
    limitOrderList,
    orderPrice,
    pOrderListV2,
  ]);
  const newOrder = useCallback(() => {
    return (
      <FuturesNewOrder
        price={basePrice}
        tokenPair={tokenPair}
        updateList={handleUpdateList}
        forexOpen={forexOpen}
      />
    );
  }, [basePrice, forexOpen, handleUpdateList, tokenPair]);
  const moreInfo = useCallback(() => {
    return <FuturesMoreInfo />;
  }, []);

  const mainView = useMemo(() => {
    switch (width) {
      case WidthType.xl:
      case WidthType.xxl:
        return (
          <Stack direction={"row"} justifyContent={"center"} paddingX={"40px"}>
            <Stack
              spacing={"16px"}
              width={"100%"}
              maxWidth={"1600px"}
              paddingY={`${paddingY}px`}
            >
              <Stack
                direction={"row"}
                spacing={"16px"}
                width={"100%"}
                maxWidth={"1600px"}
              >
                <Stack spacing={"16px"} width={"100%"}>
                  {exchangeTvChart()}
                  {/* {exchangeTvChart()} */}
                  {orderList()}
                </Stack>
                <Stack spacing={"16px"} width={"450px"}>
                  {newOrder()}
                  {moreInfo()}
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        );
      default:
        return (
          <Stack
            direction={"row"}
            justifyContent={"center"}
            paddingX={`${paddingX}px`}
          >
            <Stack
              spacing={"16px"}
              width={"100%"}
              paddingY={`${paddingY}px`}
              sx={(theme) => ({
                backgroundColor: isBigMobile
                  ? theme.normal.bg1
                  : theme.normal.bg0,
              })}
            >
              <Stack>
                {exchangeTvChart()}
                {newOrder()}
              </Stack>
              {isBigMobile ? <></> : moreInfo()}
              {orderList()}
            </Stack>
          </Stack>
        );
    }
  }, [
    width,
    paddingY,
    exchangeTvChart,
    orderList,
    newOrder,
    moreInfo,
    paddingX,
    isBigMobile,
  ]);

  return <>{mainView}</>;
};

export default Futures;
