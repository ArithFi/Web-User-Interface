
import { useMemo, useState } from "react";
import { Order } from "../pages/Dashboard/Dashboard";

export interface FuturesHistoryService {
  actualMargin: number;
  actualRate: number;
  index: number;
  initialMargin: number;
  lastPrice: number;
  leverage: string;
  openPrice: number;
  orderType: string;
  orientation: string;
  owner: string;
  sl: number;
  sp: number;
  time: number;
  tokenPair: string;
  status: number;
  pt0: number | null;
  pt1: number | null;
}

function useFuturesHistory(data: FuturesHistoryService) {
  const tokenName = data.tokenPair.split("/")[0];
  const isLong = data.orientation === "Long";
  const lever = useMemo(() => {
    return data.leverage ? Number(data.leverage.toString().split("X")[0]) : 0;
  }, [data.leverage]);
  const [showShareOrderModal, setShowShareOrderModal] =
    useState<boolean>(false);
  const tp = useMemo(() => {
    return data.sp
      ? data.sp.toFixed(data.tokenPair.getTokenPriceDecimals())
      : String().placeHolder;
  }, [data.sp, data.tokenPair]);
  const sl = useMemo(() => {
    return data.sl
      ? data.sl.toFixed(data.tokenPair.getTokenPriceDecimals())
      : String().placeHolder;
  }, [data.sl, data.tokenPair]);
  const showOpenPrice = useMemo(() => {

    if (data.openPrice) {
      return data.openPrice.toFixed(data.tokenPair.getTokenPriceDecimals());
    } else {
      return String().placeHolder;
    }
  }, [data.openPrice, data.tokenPair]);
  const showMarginAssets = useMemo(() => {
    if (data.status === -1) {
      return String().placeHolder;
    }
    return data.actualMargin
      ? data.actualMargin.floor(2)
      : String().placeHolder;
  }, [data.actualMargin, data.status]);
  const time = useMemo(() => {
    if (data.time) {
      const timestamp = new Date(data.time * 1000);
      return `${timestamp.toLocaleDateString()} ${timestamp.toLocaleTimeString()}`;
    } else {
      return String().placeHolder;
    }
  }, [data.time]);
  const showClosePrice = useMemo(() => {
    return data.lastPrice ? data.lastPrice.toString() : "0";
  }, [data.lastPrice]);

  const showPercentNum = useMemo(() => {
    if (data.status === -1) {
      return -100
    }
    return data.actualRate ? data.actualRate : 0;
  }, [data.actualRate, data.status]);
  const showPercent = useMemo(() => {
    if (showPercentNum > 0) {
      return `+${showPercentNum.floor(2)}`;
    } else if (showPercentNum < 0) {
      return `${showPercentNum.floor(2)}`;
    } else {
      return "0";
    }
  }, [showPercentNum]);
  const isRed = useMemo(() => {
    return showPercent.indexOf("-") === 0;
  }, [showPercent]);
  const shareOrder = useMemo(() => {
    const info: Order = {
      owner: data.owner,
      leverage: data.leverage + "X",
      orientation: data.orientation,
      actualRate: data.actualRate,
      index: data.index,
      openPrice: data.openPrice,
      tokenPair: data.tokenPair,
      actualMargin: data.actualMargin,
      initialMargin: data.initialMargin,
      lastPrice: data.lastPrice,
      sp: parseFloat(data.sp.toFixed(data.tokenPair.getTokenPriceDecimals())),
      sl: parseFloat(data.sl.toFixed(data.tokenPair.getTokenPriceDecimals())),
    };
    return info;
  }, [data.actualMargin, data.actualRate, data.index, data.initialMargin, data.lastPrice, data.leverage, data.openPrice, data.orientation, data.owner, data.sl, data.sp, data.tokenPair]);
  return {
    tokenName,
    isLong,
    lever,
    tp,
    sl,
    showOpenPrice,
    showMarginAssets,
    showPercent,
    isRed,
    showShareOrderModal,
    setShowShareOrderModal,
    shareOrder,
    time,
    showClosePrice
  };
}

export default useFuturesHistory;
