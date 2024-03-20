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
  servicePList,
} from "../../lib/ArithFiRequest";
import { getQueryVariable } from "../../lib/queryVaribale";
import useArithFi from "../../hooks/useArithFi";
import { FuturesHistoryService } from "../../hooks/useFuturesHistory";
import { useSearchParams } from "react-router-dom";
import { getCurrentPriceOfToken } from "../../lib/prices";

export interface FuturesPrice {
  [key: string]: BigNumber | undefined | null;
}
export interface FuturesPricePercent {
  [key: string]: number | undefined | null;
}
const UPDATE_PRICE = 15;
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
    // const percent = () => {
    //   const ETHPricePercent = listPriceBase
    //     ? listPriceBase["data"]["ETH/USDT"]["priceChangePercent"]?.toString()
    //     : undefined;
    //   const BTCPricePercent = listPriceBase
    //     ? listPriceBase["data"]["BTC/USDT"]["priceChangePercent"]?.toString()
    //     : undefined;
    //   const BNBPricePercent = listPriceBase
    //     ? listPriceBase["data"]["BNB/USDT"]["priceChangePercent"]?.toString()
    //     : undefined;
    //   const MATICPricePercent = listPriceBase
    //     ? listPriceBase["data"]["MATIC/USDT"]["priceChangePercent"]?.toString()
    //     : undefined;
    //   const ADAPricePercent = listPriceBase
    //     ? listPriceBase["data"]["ADA/USDT"]["priceChangePercent"]?.toString()
    //     : undefined;
    //   const DOGEPricePercent = listPriceBase
    //     ? listPriceBase["data"]["DOGE/USDT"]["priceChangePercent"]?.toString()
    //     : undefined;
    //   const XRPPricePercent = listPriceBase
    //     ? listPriceBase["data"]["XRP/USDT"]["priceChangePercent"]?.toString()
    //     : undefined;
    //   const SOLPricePercent = listPriceBase
    //     ? listPriceBase["data"]["SOL/USDT"]["priceChangePercent"]?.toString()
    //     : undefined;
    //   const LTCPricePercent = listPriceBase
    //     ? listPriceBase["data"]["LTC/USDT"]["priceChangePercent"]?.toString()
    //     : undefined;
    //   const AVAXPricePercent = listPriceBase
    //     ? listPriceBase["data"]["AVAX/USDT"]["priceChangePercent"]?.toString()
    //     : undefined;
    //   const EURUSDPricePercent = listPriceBase
    //     ? listPriceBase["data"]["EUR/USD"]["priceChangePercent"]?.toString()
    //     : undefined;
    //   const GBPUSDPricePercent = listPriceBase
    //     ? listPriceBase["data"]["GBP/USD"]["priceChangePercent"]?.toString()
    //     : undefined;
    //   const AUDUSDPricePercent = listPriceBase
    //     ? listPriceBase["data"]["AUD/USD"]["priceChangePercent"]?.toString()
    //     : undefined;
    //   const USDJPYPricePercent = listPriceBase
    //     ? listPriceBase["data"]["USD/JPY"]["priceChangePercent"]?.toString()
    //     : undefined;
    //   const USDCADPricePercent = listPriceBase
    //     ? listPriceBase["data"]["USD/CAD"]["priceChangePercent"]?.toString()
    //     : undefined;
    //   if (
    //     ETHPricePercent &&
    //     BTCPricePercent &&
    //     BNBPricePercent &&
    //     MATICPricePercent &&
    //     ADAPricePercent &&
    //     DOGEPricePercent &&
    //     XRPPricePercent &&
    //     SOLPricePercent &&
    //     LTCPricePercent &&
    //     AVAXPricePercent &&
    //     EURUSDPricePercent &&
    //     GBPUSDPricePercent &&
    //     AUDUSDPricePercent &&
    //     USDJPYPricePercent &&
    //     USDCADPricePercent
    //   ) {
    //     const newPrice: FuturesPricePercent = {
    //       "ETH/USDT": Number(ETHPricePercent),
    //       "BTC/USDT": Number(BTCPricePercent),
    //       "BNB/USDT": Number(BNBPricePercent),
    //       "MATIC/USDT": Number(MATICPricePercent),
    //       "ADA/USDT": Number(ADAPricePercent),
    //       "DOGE/USDT": Number(DOGEPricePercent),
    //       "XRP/USDT": Number(XRPPricePercent),
    //       "SOL/USDT": Number(SOLPricePercent),
    //       "LTC/USDT": Number(LTCPricePercent),
    //       "AVAX/USDT": Number(AVAXPricePercent),
    //       "EUR/USD": Number(EURUSDPricePercent),
    //       "GBP/USD": Number(GBPUSDPricePercent),
    //       "AUD/USD": Number(AUDUSDPricePercent),
    //       "USD/JPY": Number(USDJPYPricePercent),
    //       "USD/CAD": Number(USDCADPricePercent),
    //     };
    //     return newPrice;
    //   } else {
    //     return undefined;
    //   }
    // };

    var newPrice = Object.keys(listPriceBase["data"]).reduce(
      (result: any, key) => {
        const price: BigNumber | undefined = listPriceBase
          ? listPriceBase["data"][key]["price"]
              ?.toString()
              ?.stringToBigNumber(18)
          : undefined;
        result[key] = price;
        return result;
      },
      {}
    );
    var newPercent = Object.keys(listPriceBase["data"]).reduce(
      (result: any, key) => {
        const percent: number | undefined = listPriceBase
          ? listPriceBase["data"][key]["priceChangePercent"]?.toString()
          : undefined;
        result[key] = Number(percent);
        return result;
      },
      {}
    );

    return [newPrice, newPercent];
    // const ETHPrice = listPriceBase
    //   ? listPriceBase["data"]["ETH/USDT"]["price"]
    //       ?.toString()
    //       ?.stringToBigNumber(18)
    //   : undefined;
    // const BTCPrice = listPriceBase
    //   ? listPriceBase["data"]["BTC/USDT"]["price"]
    //       ?.toString()
    //       ?.stringToBigNumber(18)
    //   : undefined;
    // const BNBPrice = listPriceBase
    //   ? listPriceBase["data"]["BNB/USDT"]["price"]
    //       ?.toString()
    //       ?.stringToBigNumber(18)
    //   : undefined;
    // const MATICPrice = listPriceBase
    //   ? listPriceBase["data"]["MATIC/USDT"]["price"]
    //       ?.toString()
    //       ?.stringToBigNumber(18)
    //   : undefined;
    // const ADAPrice = listPriceBase
    //   ? listPriceBase["data"]["ADA/USDT"]["price"]
    //       ?.toString()
    //       ?.stringToBigNumber(18)
    //   : undefined;
    // const DOGEPrice = listPriceBase
    //   ? listPriceBase["data"]["DOGE/USDT"]["price"]
    //       ?.toString()
    //       ?.stringToBigNumber(18)
    //   : undefined;
    // const XRPPrice = listPriceBase
    //   ? listPriceBase["data"]["XRP/USDT"]["price"]
    //       ?.toString()
    //       ?.stringToBigNumber(18)
    //   : undefined;
    // const SOLPrice = listPriceBase
    //   ? listPriceBase["data"]["SOL/USDT"]["price"]
    //       ?.toString()
    //       ?.stringToBigNumber(18)
    //   : undefined;
    // const LTCPrice = listPriceBase
    //   ? listPriceBase["data"]["LTC/USDT"]["price"]
    //       ?.toString()
    //       ?.stringToBigNumber(18)
    //   : undefined;
    // const AVAXPrice = listPriceBase
    //   ? listPriceBase["data"]["AVAX/USDT"]["price"]
    //       .toString()
    //       .stringToBigNumber(18)
    //   : undefined;
    // const EURUSDPrice = listPriceBase
    //   ? listPriceBase["data"]["EUR/USD"]["price"]
    //       ?.toString()
    //       ?.stringToBigNumber(18)
    //   : undefined;
    // const GBPUSDPrice = listPriceBase
    //   ? listPriceBase["data"]["GBP/USD"]["price"]
    //       ?.toString()
    //       ?.stringToBigNumber(18)
    //   : undefined;
    // const AUDUSDPrice = listPriceBase
    //   ? listPriceBase["data"]["AUD/USD"]["price"]
    //       ?.toString()
    //       ?.stringToBigNumber(18)
    //   : undefined;
    // const USDJPYPrice = listPriceBase
    //   ? listPriceBase["data"]["USD/JPY"]["price"]
    //       ?.toString()
    //       ?.stringToBigNumber(18)
    //   : undefined;
    // const USDCADPrice = listPriceBase
    //   ? listPriceBase["data"]["USD/CAD"]["price"]
    //       ?.toString()
    //       ?.stringToBigNumber(18)
    //   : undefined;

    // const newPricePercent = percent();
    // if (
    //   ETHPrice &&
    //   BTCPrice &&
    //   BNBPrice &&
    //   MATICPrice &&
    //   ADAPrice &&
    //   DOGEPrice &&
    //   XRPPrice &&
    //   SOLPrice &&
    //   LTCPrice &&
    //   AVAXPrice &&
    //   EURUSDPrice &&
    //   GBPUSDPrice &&
    //   AUDUSDPrice &&
    //   USDJPYPrice &&
    //   USDCADPrice
    // ) {
    //   const newPrice: FuturesPrice = {
    //     "ETH/USDT": ETHPrice,
    //     "BTC/USDT": BTCPrice,
    //     "BNB/USDT": BNBPrice,
    //     "MATIC/USDT": MATICPrice,
    //     "ADA/USDT": ADAPrice,
    //     "DOGE/USDT": DOGEPrice,
    //     "XRP/USDT": XRPPrice,
    //     "SOL/USDT": SOLPrice,
    //     "LTC/USDT": LTCPrice,
    //     "AVAX/USDT": AVAXPrice,
    //     "EUR/USD": EURUSDPrice,
    //     "GBP/USD": GBPUSDPrice,
    //     "AUD/USD": AUDUSDPrice,
    //     "USD/JPY": USDJPYPrice,
    //     "USD/CAD": USDCADPrice,
    //   };

    //   return [newPrice, newPricePercent];
    // } else {
    //   return undefined;
    // }
  }, []);

  const getList = useCallback(async () => {
    try {
      if (!chainsData.chainId || !account.address || !signature) {
        return;
      }
      // TODO: 10
      const pList = await servicePList(account.address, {
        Authorization: signature.signature,
      });
      if (Number(pList["err"]) === 0) {
        const list: Array<FuturesOrderService> = pList["data"]
          .map((item: { [x: string]: any }) => {
            const timestamp = new Date(item["openAt"]).getTime();
            return {
              id: item["id"],
              timestamp: timestamp / 1000,
              walletAddress: item["walletAddress"],
              chainId: item["chainId"],
              product: item["product"],
              leverage: item["leverage"],
              orderPrice: item["openPrice"],
              limitPrice: item["limitPrice"],
              direction: item["direction"],
              margin: item["margin"],
              append: item["append"],
              balance: item["orderValue"] ?? 0,
              stopLossPrice: item["stopLossPrice"],
              takeProfitPrice: item["takeProfitPrice"],
              status: item["status"],
              copy: item["pid"] != null,
              pt0: item["pt0"],
              pt1: item["pt1"],
              lastPrice: item["lastPrice"],
              marginRatio: item["marginRatio"],
            };
          })
          .filter((item: any) => item.leverage.toString() !== "0");
        setPOrderListV2(list);
      }
      // TODO: 10
      const limitList = await serviceList(account.address, {
        Authorization: signature.signature,
      });

      if (Number(limitList["err"]) === 0) {
        const list: Array<FuturesOrderService> = limitList["data"]
          .map((item: { [x: string]: any }) => {
            const timestamp = new Date(item["openAt"]).getTime();
            return {
              id: item["id"],
              timestamp: timestamp / 1000,
              walletAddress: item["walletAddress"],
              chainId: item["chainId"],
              product: item["product"],
              leverage: item["leverage"],
              orderPrice: item["limitPrice"],
              limitPrice: item["limitPrice"],
              direction: item["direction"],
              margin: item["margin"],
              append: item["append"],
              balance: item["orderValue"] ?? 10,
              stopLossPrice: item["stopLossPrice"],
              takeProfitPrice: item["takeProfitPrice"],
              status: item["status"],
              lastPrice: item["lastPrice"],
              marginRatio: item["marginRatio"],
            };
          })
          .filter((item: any) => item.leverage.toString() !== "0");
        setLimitOrderList(list);
      }
    } catch (error) {
      console.log(error);
    }
  }, [account.address, chainsData.chainId, signature]);
  const getHistoryList = useCallback(async () => {
    try {
      if (!account.address || !signature) {
        return;
      }
      const baseList = await serviceFutureHistory(account.address, {
        Authorization: signature.signature,
      });
      if (Number(baseList["err"]) === 0) {
        const list: Array<FuturesHistoryService> = baseList["data"].map(
          (item: { [x: string]: any }) => {
            const status = item["status"];
            const orderType = () => {
              if (status === 0) {
                return "Closed";
              } else if (status === -1) {
                return "Liquidated";
              } else if (status === -2) {
                return "SL Executed";
              } else if (status === -3) {
                return "TP Executed";
              } else {
                return "";
              }
            };
            const timestamp = new Date(item["closeAt"]).getTime();
            const openTime = new Date(item["openAt"]).getTime();
            const actualRate = () => {
              if (status === -1) {
                return -100;
              }
              const baseValue = item["margin"] + item["append"];
              const closeValue = item["closeValue"];
              return ((closeValue - baseValue) / baseValue) * 100;
            };
            return {
              actualMargin: item["closeValue"],
              margin: item["margin"],
              append: item["append"],
              actualRate: actualRate(),
              index: item["id"],
              initialMargin: item["margin"] + item["append"],
              lastPrice: item["closePrice"],
              leverage: item["leverage"].toString(),
              openPrice: item["openPrice"],
              orderType: orderType(),
              orientation: item["direction"] ? "Long" : "Short",
              owner: item["walletAddress"],
              sl: item["stopLossPrice"],
              sp: item["takeProfitPrice"],
              time: timestamp / 1000,
              openAt: openTime / 1000,
              tokenPair: item["product"],
              status: item["status"],
              pt0: item["pt0"],
              pt1: item["pt1"],
            };
          }
        );
        setHistoryList(list);
      }
    } catch (error) {
      console.log(error);
    }
  }, [account.address, signature]);

  const getForexOpen = useCallback(async () => {
    try {
      if (!account.address || !signature) {
        return;
      }
      const base = await serviceIsOpen({ Authorization: signature.signature });
      if (base) {
        setForexOpen(base.data);
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
        if (newPrice) {
          setBasePrice(newPrice[0] as FuturesPrice);
          setBasePricePercent(newPrice[1] as FuturesPricePercent);
        }
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
      if (newPrice) {
        setOrderPrice(newPrice[0] as FuturesPrice);
      }
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
    return isBigMobile ? 0 : 0;
  }, [isBigMobile]);
  const paddingX = useMemo(() => {
    return isBigMobile ? 0 : 0;
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
          <Stack direction={"row"} justifyContent={"center"}>
            <Stack spacing={"16px"} width={"100%"} paddingY={`${paddingY}px`}>
              <Stack direction={"row"} width={"100%"}>
                <Stack
                  spacing={"16px"}
                  width={"100%"}
                  sx={(theme) => ({
                    borderRight: `1px solid ${theme.normal.border}`,
                  })}
                >
                  {exchangeTvChart()}
                  {orderList()}
                </Stack>
                <Stack width={"450px"}>
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
