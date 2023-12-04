import { useCallback, useEffect, useState } from "react";
import useArithFi from "../../../hooks/useArithFi";
import {
  copyEarningsList,
  copyKOLInfo,
  copyPerformance,
  copyPerformanceSymbol,
  copyTraderHistory,
  serviceList,
} from "../../../lib/ArithFiRequest";
import { AllKOLModel } from "./useCopy";
import { DEFAULT_CHAIN_ID } from "../../../lib/client";
import {useNetwork} from "wagmi";

export interface EarningsListModel {
  date: string;
  roi: number;
  pnl: number;
}

export interface PerformanceModel {
  pnlRatio: number;
  cumlativeTraders: number;
  losingTraders: number;
  aum: number;
  winRate: number;
  traderPnl: number;
  winningTraders: number;
  ordersNumber: number;
}

export interface PerformanceSymbolModel {
  name: string;
  value: number;
}

export interface TraderOrderList {
  id: number;
  timestamp: number;
  closeTime: number;
  walletAddress: string;
  chainId: number;
  product: string;
  leverage: number;
  orderPrice: number;
  direction: boolean;
  marketPrice: number;
  profitLossRate: number;
  status: number;
}

export interface TraderFollowerList {
  walletAddress: string;
  followerProfitLoss: number;
}

function useTrader(address: string | undefined) {
  const { chain } = useNetwork();
  const [kolInfo, setKolInfo] = useState<AllKOLModel>();
  const [earningsData, setEarningsData] = useState<Array<EarningsListModel>>(
    []
  );
  const [performanceData, setPerformanceData] = useState<PerformanceModel>();
  const [performanceSymbolData, setPerformanceSymbolData] = useState<
    Array<PerformanceSymbolModel>
  >([]);
  const [traderOrderList, setTraderOrderList] = useState<
    Array<TraderOrderList>
  >([]);
  const [traderOrderHistoryList, setTraderOrderHistoryList] = useState<
    Array<TraderOrderList>
  >([]);

  const [tabsValue, setTabsValue] = useState(0);
  const [earningsDay, setEarningsDay] = useState<number>(0);
  const [performanceDay, setPerformanceDay] = useState<number>(1);
  const [performanceSymbolDay, setPerformanceSymbolDay] = useState<number>(1);

  const getKOLInfo = useCallback(async () => {
    if (address) {
      const chainId = chain?.id ?? DEFAULT_CHAIN_ID;
      const req = await copyKOLInfo(chainId, address, {
        Authorization: "",
      });
      if (Number(req["errorCode"]) === 0) {
        const value = req["value"];
        const tags = () => {
          if (!value["tags"] || value["tags"] === "-") {
            return [];
          } else {
            return value["tags"].slice(1, -1).split(",");
          }
        };
        const info: AllKOLModel = {
          id: value["id"],
          walletAddress: value["walletAddress"],
          nickName: value["nickName"],
          avatar: value["avatar"],
          tags: tags(),
          introduction: value["introduction"],
          maxFollowers: value["maxFollowers"],
          maxPositionSize: value["maxPositionSize"],
          rewardRatio: value["rewardRatio"],
          currentFollowers: value["currentFollowers"],
          followersAssets: value["followersAssets"],
          followerProfitLoss: value["followerProfitLoss"],
          kolProfitLoss: value["kolProfitLoss"],
          kolProfitLossRate: value["kolProfitLossRate"],
          roiList: value["roiList"],
          follow: value["follow"],
        };
        setKolInfo(info);
      }
    }
  }, [address, chain?.id]);

  const getEarnings = useCallback(async () => {
    const days = () => {
      if (earningsDay === 0) {
        return 7;
      } else if (earningsDay === 1) {
        return 21;
      } else {
        return 30;
      }
    };
    if (address) {
      const chainId = chain?.id ?? DEFAULT_CHAIN_ID;
      const req = await copyEarningsList(chainId, address, days(), {
        Authorization: "",
      });
      if (Number(req["errorCode"]) === 0) {
        const value = req["value"];
        const list: Array<EarningsListModel> = value.map((item: any) => {
          const one: EarningsListModel = {
            date: item["date"],
            roi: parseFloat(parseFloat(item["roi"] ?? 0).floor(2)),
            pnl: parseFloat(parseFloat(item["pnl"] ?? 0).floor(2)),
          };
          return one;
        });

        setEarningsData(list);
      }
    }
  }, [address, chain?.id, earningsDay]);

  const getPerformance = useCallback(async () => {
    const days = () => {
      if (performanceDay === 0) {
        return 1;
      } else if (performanceDay === 1) {
        return 7;
      } else if (performanceDay === 2) {
        return 21;
      } else {
        return 30;
      }
    };
    if (address) {
      const chainId = chain?.id ?? DEFAULT_CHAIN_ID;
      const req = await copyPerformance(chainId, address, days(), {
        Authorization: "",
      });

      if (Number(req["errorCode"]) === 0) {
        const value = req["value"];

        const info: PerformanceModel = {
          pnlRatio: value["pnlRatio"],
          cumlativeTraders: value["cumlativeTraders"],
          losingTraders: value["losingTraders"],
          aum: value["aum"],
          winRate: value["winRate"],
          traderPnl: value["traderPnl"],
          winningTraders: value["winningTraders"],
          ordersNumber: value["ordersNumber"],
        };
        setPerformanceData(info);
      }
    }
  }, [address, chain?.id, performanceDay]);

  const getPerformanceSymbol = useCallback(async () => {
    const days = () => {
      if (performanceSymbolDay === 0) {
        return 1;
      } else if (performanceSymbolDay === 1) {
        return 7;
      } else if (performanceSymbolDay === 2) {
        return 21;
      } else {
        return 30;
      }
    };
    if (address) {
      const chainId = chain?.id ?? DEFAULT_CHAIN_ID;
      const req = await copyPerformanceSymbol(chainId, address, days(), {
        Authorization: "",
      });
      if (Number(req["errorCode"]) === 0) {
        const value = req["value"];
        const list: Array<PerformanceSymbolModel> = value.map((item: any) => {
          const one: PerformanceSymbolModel = {
            name: item["name"],
            value: item["value"],
          };
          return one;
        });
        setPerformanceSymbolData(list);
      }
    }
  }, [address, chain?.id, performanceSymbolDay]);

  const getList = useCallback(async () => {
    try {
      if (!address) {
        return;
      }
      const chainId = chain?.id ?? DEFAULT_CHAIN_ID;
      const baseList = await serviceList(chainId, address, {
        Authorization: "",
      });
      if (Number(baseList["errorCode"]) === 0) {
        const list: Array<TraderOrderList> = baseList["value"]
          .map((item: { [x: string]: any }) => {
            return {
              id: item["id"],
              timestamp: item["timestamp"],
              walletAddress: item["walletAddress"],
              chainId: item["chainId"],
              product: item["product"],
              leverage: item["leverage"],
              orderPrice: item["orderPrice"],
              direction: item["direction"],
              marketPrice: item["marketPrice"],
              profitLossRate: item["profitLossRate"],
              status: item["status"],
              copy: item["copy"],
            };
          })
          .filter(
            (item: any) => item.leverage.toString() !== "0" && !item.copy
          );
        const pOrderList = list.filter((item) => {
          return item.status === 2;
        });
        setTraderOrderList(pOrderList);
      }
    } catch (error) {
      console.log(error);
    }
  }, [address, chain?.id]);

  const getHistoryList = useCallback(async () => {
    try {
      if (!address) {
        return;
      }
      const chainId = chain?.id ?? DEFAULT_CHAIN_ID;
      const baseList = await copyTraderHistory(chainId, address, {
        Authorization: "",
      });
      if (Number(baseList["errorCode"]) === 0) {
        const list: Array<TraderOrderList> = baseList["value"]
          .map((item: { [x: string]: any }) => {
            return {
              id: item["id"],
              timestamp: item["openTime"],
              closeTime: item["closeTime"],
              walletAddress: item["walletAddress"],
              chainId: item["chainId"],
              product: item["product"],
              leverage: item["leverage"],
              orderPrice: item["openPrice"],
              direction: item["direction"],
              marketPrice: item["closePrice"],
              profitLossRate: item["profitLossRate"],
            };
          })
          .filter((item: any) => item.leverage.toString() !== "0");

        setTraderOrderHistoryList(list);
      }
    } catch (error) {
      console.log(error);
    }
  }, [address, chain?.id]);

  const showPerformanceSymbolData = useCallback(() => {
    if (performanceSymbolData.length === 0) {return []}
    const sortPerformanceSymbolData = performanceSymbolData.sort((a,b) => b.value - a.value)
    const otherValue = sortPerformanceSymbolData.map((item) => item.value).slice(-3).reduce((all ,now) => {
      return all + now
    })
    const one :PerformanceSymbolModel = {
      name: "Other",
      value: otherValue
    }
    return [...sortPerformanceSymbolData.slice(0,7)].concat(one)
  }, [performanceSymbolData])

  useEffect(() => {
    getEarnings();
    getPerformance();
    getPerformanceSymbol();
  }, [getEarnings, getPerformance, getPerformanceSymbol]);

  useEffect(() => {
    getKOLInfo();
    const time = setInterval(() => {
      getKOLInfo();
    }, 30 * 1000);
    return () => {
      clearInterval(time);
    };
  }, [getKOLInfo]);

  useEffect(() => {
    getList();
    getHistoryList();
    const time = setInterval(() => {
      getList();
      getHistoryList();
    }, 10 * 1000);
    return () => {
      clearInterval(time);
    };
  }, [getList, getHistoryList]);

  return {
    kolInfo,
    earningsDay,
    setEarningsDay,
    tabsValue,
    setTabsValue,
    earningsData,
    performanceData,
    performanceDay,
    setPerformanceDay,
    performanceSymbolDay,
    setPerformanceSymbolDay,
    traderOrderList,
    traderOrderHistoryList,
    showPerformanceSymbolData
  };
}

export default useTrader;
