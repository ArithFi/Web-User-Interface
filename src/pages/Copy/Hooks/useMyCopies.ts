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
import { FuturesOrderService } from "../../Futures/OrderList";
import { isForesNewOrder } from "../../../hooks/useFuturesNewOrder";

export interface MyCopiesMyTradersList {
  kolAddress: string;
  copyAccountBalance: number;
  follow: boolean;
  copyTradingAssets: number;
  profit: number;
  unrealizedPnL: number;
}

function useMyCopies() {
  const { account, chainsData, signature } = useArithFi();
  const [myTradeInfo, setMyTradeInfo] = useState<MyTradeInfoModel>();
  const [myCopiesList, setMyCopiesList] = useState<Array<FuturesOrderService>>(
    []
  );
  const [myCopiesHistoryList, setMyCopiesHistoryList] = useState<
    Array<FuturesOrderService>
  >([]);
  const [myCopiesMyTradersList, setMyCopiesMyTradersList] = useState<
    Array<MyCopiesMyTradersList>
  >([]);
  const [forexOpen, setForexOpen] = useState(false);

  const getMyTradeInfo = useCallback(async () => {
    if (signature && account.address) {
      const req = await copyMyTradeInfo(account.address, {
        Authorization: signature.signature,
      });
      if (Number(req["err"]) === 0) {
        const value = req["data"];
        const info: MyTradeInfoModel = {
          assets: value["copy_balance"] + value["position"],
          copyOrders: value["copy_order_count"],
          unRealizedPnl: value["unrealized_pnl"],
          profit: value["pnl_total"] - value["unrealized_pnl"],
        };
        setMyTradeInfo(info);
      }
    }
  }, [account.address, signature]);

  const getMyCopiesList = useCallback(async () => {
    try {
      if (!account.address || !signature) {
        return;
      }
      const baseList = await copyMyCopiesList(account.address, {
        Authorization: signature.signature,
      });
      if (Number(baseList["err"]) === 0) {
        const list: Array<FuturesOrderService> = baseList["data"].map(
          (item: { [x: string]: any }) => {
            const timestamp = new Date(item["openAt"]).getTime();
            const result: FuturesOrderService = {
              id: item["id"],
              timestamp: timestamp / 1000,
              walletAddress: item["walletAddress"],
              chainId: item["chainId"],
              product: item["product"],
              leverage: item["leverage"],
              orderPrice: item["openPrice"],
              direction: item["direction"],
              balance: item["orderValue"] ?? 0,
              lastPrice: item["lastPrice"],
              kolAddress: item["kolAddress"],
              limitPrice: 0,
              margin: item["margin"],
              append: item["append"],
              fees: 0,
              stopLossPrice: 0,
              takeProfitPrice: 0,
              status: item["status"],
              copy: true,
              closeTime: 0,
              closePrice: 0,
              closeValue: 0,
              pt0: item["pt0"],
              pt1: item["pt1"],
            };
            return result;
          }
        );
        setMyCopiesList(list);
      }
    } catch (error) {
      console.log(error);
    }
  }, [account.address, signature]);

  const getMyCopiesHistoryList = useCallback(async () => {
    try {
      if (!account.address || !signature) {
        return;
      }
      const baseList = await copyMyCopiesHistoryList(account.address, {
        Authorization: signature.signature,
      });
      if (Number(baseList["err"]) === 0) {
        const list: Array<FuturesOrderService> = baseList["data"].map(
          (item: { [x: string]: any }) => {
            const timestamp = new Date(item["openAt"]).getTime();
            const timestampClose = new Date(item["closeAt"]).getTime();
            const result: FuturesOrderService = {
              id: item["id"],
              timestamp: timestamp / 1000,
              walletAddress: item["walletAddress"],
              chainId: item["chainId"],
              product: item["product"],
              leverage: item["leverage"],
              orderPrice: item["openPrice"],
              direction: item["direction"],
              balance: item["closeValue"] ?? 0,
              lastPrice: item["lastPrice"],
              kolAddress: item["kolAddress"],
              limitPrice: 0,
              margin: item["margin"],
              append: item["append"],
              fees: 0,
              stopLossPrice: 0,
              takeProfitPrice: 0,
              status: item["status"],
              copy: true,
              closeTime: timestampClose / 1000,
              closePrice: item["closePrice"],
              closeValue: item["closeValue"],
              pt0: item["pt0"],
              pt1: item["pt1"],
            };
            return result;
          }
        );
        setMyCopiesHistoryList(list);
      }
    } catch (error) {
      console.log(error);
    }
  }, [account.address, signature]);

  const getMyCopiesMyTraderList = useCallback(async () => {
    try {
      if (!chainsData.chainId || !signature || !account.address) {
        return;
      }
      const baseList = await copyMyCopiesMyTradersList(account.address, {
        Authorization: signature.signature,
      });
      if (Number(baseList["err"]) === 0) {
        const list: Array<MyCopiesMyTradersList> = baseList["data"].map(
          (item: { [x: string]: any }) => {
            return {
              profit: item["profit"] ?? 0,
              copyAccountBalance: item["copyAccountBalance"],
              kolAddress: item["kolAddress"],
              follow: item["follow"] === 1,
              unrealizedPnL: item["unrealizedPnL"] ?? 0,
              copyTradingAssets: item["copyTradingAssets"],
            };
          }
        );
        setMyCopiesMyTradersList(list);
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
        isForesNewOrder(item.product)
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
