import { useCallback, useEffect, useState } from "react";
import { MyTradeInfoModel } from "./useCopy";
import useArithFi from "../../../hooks/useArithFi";
import {
  copyMyCopiesHistoryList,
  copyMyCopiesList,
  copyMyCopiesMyTradersList,
  copyMyTradeInfo,
  serviceIsOpen,
} from "../../../lib/ArithFiRequest";
import { isForex } from "../../Futures/Futures";

export interface MyCopiesList {
  id: number;
  timestamp: number;
  walletAddress: string;
  chainId: number;
  product: string;
  leverage: number;
  orderPrice: number;
  direction: boolean;
  balance: number;
  marketPrice: number;
  lipPrice: number;
  profitLossRate: number;
  profitLoss: number;
  kolAddress: string;
  nickName: string;
  avatar: string;
  closeTime: number;
}

export interface MyCopiesMyTradersList {
  kolAddress: string;
  nickName: string;
  avatar: string;
  copyAccountBalance: number;
  profit: number;
  follow: boolean;
  copyTradingAssets: number;
  unrealizedPnL: number;
}

function useMyCopies() {
  const { account, chainsData, signature } = useArithFi();
  const [myTradeInfo, setMyTradeInfo] = useState<MyTradeInfoModel>();
  const [myCopiesList, setMyCopiesList] = useState<Array<MyCopiesList>>([]);
  const [myCopiesHistoryList, setMyCopiesHistoryList] = useState<
    Array<MyCopiesList>
  >([]);
  const [myCopiesMyTradersList, setMyCopiesMyTradersList] = useState<
    Array<MyCopiesMyTradersList>
  >([]);
  const [forexOpen, setForexOpen] = useState(false);

  const getMyTradeInfo = useCallback(async () => {
    if (chainsData.chainId && signature) {
      const req = await copyMyTradeInfo(chainsData.chainId, {
        Authorization: signature.signature,
      });
      if (Number(req["err"]) === 0) {
        const value = req["value"];
        const info: MyTradeInfoModel = {
          assets: value["assets"],
          copyOrders: value["copyOrders"],
          unRealizedPnl: value["unRealizedPnl"],
          profit: value["profit"],
        };
        setMyTradeInfo(info);
      }
    }
  }, [chainsData.chainId, signature]);

  const getMyCopiesList = useCallback(async () => {
    try {
      if (!chainsData.chainId || !signature) {
        return;
      }
      const baseList = await copyMyCopiesList(chainsData.chainId, {
        Authorization: signature.signature,
      });
      if (Number(baseList["err"]) === 0) {
        const list: Array<MyCopiesList> = baseList["value"].map(
          (item: { [x: string]: any }) => {
            return {
              id: item["id"],
              timestamp: item["timestamp"],
              walletAddress: item["walletAddress"],
              chainId: item["chainId"],
              product: item["product"],
              leverage: item["leverage"],
              orderPrice: item["orderPrice"],
              direction: item["direction"],
              balance: item["balance"],
              marketPrice: item["marketPrice"],
              lipPrice: item["lipPrice"],
              profitLossRate: item["profitLossRate"],
              kolAddress: item["kolAddress"],
              nickName: item["nickName"],
              avatar: item["avatar"],
            };
          }
        );
        setMyCopiesList(list);
      }
    } catch (error) {
      console.log(error);
    }
  }, [chainsData.chainId, signature]);

  const getMyCopiesHistoryList = useCallback(async () => {
    try {
      if (!chainsData.chainId || !signature) {
        return;
      }
      const baseList = await copyMyCopiesHistoryList(chainsData.chainId, {
        Authorization: signature.signature,
      });
      if (Number(baseList["err"]) === 0) {
        const list: Array<MyCopiesList> = baseList["value"].map(
          (item: { [x: string]: any }) => {
            return {
              id: item["id"],
              timestamp: item["openTime"],
              walletAddress: item["walletAddress"],
              chainId: item["chainId"],
              product: item["product"],
              leverage: item["leverage"],
              orderPrice: item["openPrice"],
              direction: item["direction"],
              balance: item["actualMargin"],
              marketPrice: item["closePrice"],
              lipPrice: item["lipPrice"],
              profitLossRate: item["profitLossRate"],
              profitLoss: item["profitLoss"],
              kolAddress: item["kolAddress"],
              nickName: item["nickName"],
              avatar: item["avatar"],
              closeTime: item["closeTime"],
            };
          }
        );
        setMyCopiesHistoryList(list);
      }
    } catch (error) {
      console.log(error);
    }
  }, [chainsData.chainId, signature]);

  const getMyCopiesMyTraderList = useCallback(async () => {
    try {
      if (!chainsData.chainId || !signature) {
        return;
      }
      const baseList = await copyMyCopiesMyTradersList(chainsData.chainId, {
        Authorization: signature.signature,
      });
      if (Number(baseList["err"]) === 0) {
        const list: Array<MyCopiesMyTradersList> = baseList["value"].map(
          (item: { [x: string]: any }) => {
            return {
              profit: item["profit"],
              copyAccountBalance: item["copyAccountBalance"],
              kolAddress: item["walletAddress"],
              nickName: item["nickName"],
              avatar: item["avatar"],
              follow: item["follow"] === "true",
              unrealizedPnL: item["unrealizedPnL"],
              copyTradingAssets: item["copyTradingAssets"],
            };
          }
        );
        setMyCopiesMyTradersList(list);
      }
    } catch (error) {
      console.log(error);
    }
  }, [chainsData.chainId, signature]);

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
      return;
    }
  }, [account.address, signature]);

  const checkCopyNoStop = useCallback(
    (normal: () => void, no: () => void) => {
      const hasForexOrder = myCopiesList.filter((item) =>
        isForex(item.leverage)
      );
      if (!forexOpen && hasForexOrder.length > 0) {
        no();
      } else {
        normal();
      }
    },
    [forexOpen, myCopiesList]
  );

  useEffect(() => {
    getMyTradeInfo();
    getMyCopiesList();
    getMyCopiesHistoryList();
    getMyCopiesMyTraderList();
    getForexOpen();
    const time = setInterval(() => {
      getMyTradeInfo();
      getMyCopiesList();
      getMyCopiesHistoryList();
      getMyCopiesMyTraderList();
      getForexOpen();
    }, 10 * 1000);
    return () => {
      clearInterval(time);
    };
  }, [
    getForexOpen,
    getMyCopiesHistoryList,
    getMyCopiesList,
    getMyCopiesMyTraderList,
    getMyTradeInfo,
  ]);

  const updateCurrent = useCallback(() => {
    getMyCopiesList();
    getMyTradeInfo();
  }, [getMyCopiesList, getMyTradeInfo]);
  return {
    myTradeInfo,
    myCopiesList,
    myCopiesHistoryList,
    myCopiesMyTradersList,
    getMyCopiesMyTraderList,
    updateCurrent,
    checkCopyNoStop,
  };
}

export default useMyCopies;
