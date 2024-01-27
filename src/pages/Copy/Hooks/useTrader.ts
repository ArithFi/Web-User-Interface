import { useCallback, useEffect, useState } from "react";
import {
  copyEarningsList,
  copyKOLInfo,
  copyPerformanceSymbol,
  copyTraderCurrent,
  copyTraderHistory
} from "../../../lib/ArithFiRequest";
import { AllKOLModel } from "./useCopy";
import { formatTVDate } from "../../../lib/dates";

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

const BasePerformanceSymbol: PerformanceSymbolModel[] = [
  { name: "BTC", value: 0 },
  { name: "ETH", value: 0 },
  { name: "MATIC", value: 0 },
  { name: "BNB", value: 0 },
  { name: "SOL", value: 0 },
  { name: "AVAX", value: 0 },
  { name: "DOGE", value: 0 },
  { name: "Other", value: 0 },
];

function useTrader(address: string | undefined) {
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
      const days = () => {
        if (performanceDay === 0) {
          return 1;
        } else if (performanceDay === 1) {
          return 7;
        } else {
          return 30;
        }
      };
      const nowTime = new Date();
      const days7Time = new Date(
        nowTime.getTime() - days() * 24 * 60 * 60 * 1000
      );
      const closeAtFromDate = formatTVDate(days7Time);
      const closeAtToDate = formatTVDate(nowTime);
      const req = await copyKOLInfo(address, closeAtFromDate, closeAtToDate, {
        Authorization: "",
      });
      if (Number(req["err"]) === 0) {
        const value = req["data"];
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
          follow: value["follow"] === 1,
        };
        const subOrders = value["ordersNumber"] - value["winCount"]
        const winRate = subOrders !== 0 ? subOrders / value["ordersNumber"] * 100 : 100
        const info2: PerformanceModel = {
          pnlRatio: value["pnlRatio"],
          cumlativeTraders: value["cumlativeTraders"],
          losingTraders: value["losingTraders"],
          aum: value["aum"],
          winRate: winRate,
          traderPnl: value["traderPnl"],
          winningTraders: value["winningTraders"],
          ordersNumber: value["ordersNumber"],
        };
        setPerformanceData(info2);
        setKolInfo(info);
      }
    }
  }, [address, performanceDay]);

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
    const nowTime = new Date();
    const days7Time = new Date(
      nowTime.getTime() - days() * 24 * 60 * 60 * 1000
    );
    const closeAtFromDate = formatTVDate(days7Time);
    const closeAtToDate = formatTVDate(nowTime);

    if (address) {
      const req = await copyEarningsList(
        address,
        closeAtFromDate,
        closeAtToDate,
        {
          Authorization: "",
        }
      );
      if (Number(req["err"]) === 0) {
        const value = req["data"];
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
  }, [address, earningsDay]);

  // const getPerformance = useCallback(async () => {
  //   const days = () => {
  //     if (performanceDay === 0) {
  //       return 1;
  //     } else if (performanceDay === 1) {
  //       return 7;
  //     } else if (performanceDay === 2) {
  //       return 21;
  //     } else {
  //       return 30;
  //     }
  //   };
  //   if (address) {
  //     const chainId = chain?.id ?? DEFAULT_CHAIN_ID;
  //     const req = await copyPerformance(chainId, address, days(), {
  //       Authorization: "",
  //     });

  //     if (Number(req["err"]) === 0) {
  //       const value = req["data"];

  //       const info: PerformanceModel = {
  //         pnlRatio: value["pnlRatio"],
  //         cumlativeTraders: value["cumlativeTraders"],
  //         losingTraders: value["losingTraders"],
  //         aum: value["aum"],
  //         winRate: value["winRate"],
  //         traderPnl: value["traderPnl"],
  //         winningTraders: value["winningTraders"],
  //         ordersNumber: value["ordersNumber"],
  //       };
  //       setPerformanceData(info);
  //     }
  //   }
  // }, [address, chain?.id, performanceDay]);

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
    const nowTime = new Date();
    const days7Time = new Date(
      nowTime.getTime() - days() * 24 * 60 * 60 * 1000
    );
    const closeAtFromDate = formatTVDate(days7Time);
    const closeAtToDate = formatTVDate(nowTime);
    if (address) {
      const req = await copyPerformanceSymbol(
        address,
        closeAtFromDate,
        closeAtToDate,
        {
          Authorization: "",
        }
      );
      if (Number(req["err"]) === 0) {
        const value = req["data"];
        const list: Array<PerformanceSymbolModel> = value.map((item: any) => {
          const one: PerformanceSymbolModel = {
            name: item["product"],
            value: item["positionSize"],
          };
          return one;
        });
        const allValue = list.reduce((all, item) => item.value + all, 0);

        let newPerformanceSymbolArray = [...BasePerformanceSymbol];

        for (let index = 0; index < list.length; index++) {
          const element = list[index].name.split("/")[0];
          const resArray = BasePerformanceSymbol.filter(
            (item) => item.name === element
          );
          if (resArray.length > 0) {
            const newItem = newPerformanceSymbolArray.find(
              (item) => item.name === element
            );
            newItem!.value = list[index].value;
          } else {
            const newItem = newPerformanceSymbolArray.find(
              (item) => item.name === "Other"
            );
            newItem!.value += list[index].value;
          }
        }

        const resData = newPerformanceSymbolArray.map((item) => {
          const newItem = item;
          if (item.value > 0) {
            newItem.value = Number(((item.value / allValue) * 100).toFixed(2));
          } else {
            newItem.value = 0;
          }
          return newItem;
        });

        setPerformanceSymbolData(resData.sort((a, b) => b.value - a.value));
      }
    }
  }, [address, performanceSymbolDay]);

  const getList = useCallback(async () => {
    try {
      if (!address) {
        return;
      }
      const baseList = await copyTraderCurrent(address, {});
      if (Number(baseList["err"]) === 0) {
        const list: Array<TraderOrderList> = baseList["data"]
          .map((item: { [x: string]: any }) => {
            const timestamp = new Date(item["openAt"]).getTime();
            const balance_num = item["margin"] + item["append"];
            const marginAssets_num = item["orderValue"];
            return {
              id: item["id"],
              timestamp: timestamp / 1000,
              walletAddress: item["walletAddress"],
              product: item["product"],
              leverage: item["leverage"],
              orderPrice: item["openPrice"],
              direction: item["direction"],
              marketPrice: item["lastPrice"],
              profitLossRate: (((marginAssets_num - balance_num) * 100) / balance_num),
              status: item["status"],
            };
          })
          .filter(
            (item: any) => item.leverage.toString() !== "0" && !item.copy
          );
        setTraderOrderList(list);
      }
    } catch (error) {
      console.log(error);
    }
  }, [address]);

  const getHistoryList = useCallback(async () => {
    try {
      if (!address) {
        return;
      }
      const baseList = await copyTraderHistory(address, {
        Authorization: "",
      });
      if (Number(baseList["err"]) === 0) {
        const list: Array<TraderOrderList> = baseList["data"]
          .map((item: { [x: string]: any }) => {
            const timestamp = new Date(item["openAt"]).getTime();
            const closeTime = new Date(item["closeAt"]).getTime();
            const balance_num = item["margin"] + item["append"];
            const marginAssets_num = item["closeValue"];
            return {
              id: item["id"],
              timestamp: timestamp / 1000,
              closeTime: closeTime / 1000,
              walletAddress: item["walletAddress"],
              product: item["product"],
              leverage: item["leverage"],
              orderPrice: item["openPrice"],
              direction: item["direction"],
              marketPrice: item["closePrice"],
              profitLossRate: (((marginAssets_num - balance_num) * 100) / balance_num),
            };
          })
          .filter((item: any) => item.leverage.toString() !== "0");

        setTraderOrderHistoryList(list);
      }
    } catch (error) {
      console.log(error);
    }
  }, [address]);

  const showPerformanceSymbolData = useCallback(() => {
    if (performanceSymbolData.length === 0) {
      return [];
    }
    const sortPerformanceSymbolData = performanceSymbolData.sort(
      (a, b) => b.value - a.value
    );
    const otherValue = sortPerformanceSymbolData
      .map((item) => item.value)
      .slice(-3)
      .reduce((all, now) => {
        return all + now;
      });
    const one: PerformanceSymbolModel = {
      name: "Other",
      value: otherValue,
    };
    return [...sortPerformanceSymbolData.slice(0, 7)].concat(one);
  }, [performanceSymbolData]);

  useEffect(() => {
    getEarnings();
    getPerformanceSymbol();
  }, [getEarnings, getPerformanceSymbol]);

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
    showPerformanceSymbolData,
  };
}

export default useTrader;
