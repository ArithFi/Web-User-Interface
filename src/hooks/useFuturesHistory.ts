
import { useMemo, useState } from "react";
import { Order } from "../pages/Dashboard/Dashboard";

export interface FuturesHistoryService {
  actualMargin: number;
  margin: number;
  append:number;
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
  openAt:number;
  tokenPair: string;
  status: number;
  pt0: number | null;
  pt1: number | null;

}

function useFuturesHistory(data: FuturesHistoryService) {
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
  const showSize = useMemo(() => {
    if (data.leverage != null && data.margin != null) {
      return `${(Number(data.leverage) * data.margin).floor(2)} ATF`;
    }
    return "-";
  }, [data.leverage, data.margin]);

  const showMargin = useMemo(() => {
    if (data.margin != null && data.append != null) {
      return `${(data.margin + data.append).floor(2)} ATF`;
    }
    return "-";
  }, [data.append, data.margin]);
  const showOpenPrice = useMemo(() => {

    if (data.openPrice) {
      return data.openPrice.toFixed(data.tokenPair.getTokenPriceDecimals());
    } else {
      return String().placeHolder;
    }
  }, [data.openPrice, data.tokenPair]);
  const showClosePrice = useMemo(() => {
    return data.lastPrice ? data.lastPrice.toString() : "0";
  }, [data.lastPrice]);
  const openTime = useMemo(() => {
    if (data.openAt) {
      const timestamp = new Date(data.openAt * 1000);
      return [timestamp.toLocaleDateString(), timestamp.toLocaleTimeString()]
    } else {
      return String().placeHolder;
    }
  }, [data.openAt]);
  const closeTime = useMemo(() => {
    if (data.time) {
      const timestamp = new Date(data.time * 1000);
      return [timestamp.toLocaleDateString(), timestamp.toLocaleTimeString()]
    } else {
      return String().placeHolder;
    }
  }, [data.time]);
  const realizedPnL = useMemo(() => {
    if (data.actualMargin != null && data.initialMargin != null) {
      if (data.status === -1) {
        return -(data.initialMargin)
      }
      return data.actualMargin - data.initialMargin
    }
    return undefined
  }, [data.actualMargin, data.initialMargin, data.status])
  const showRealizedPnL = useMemo(() => {
    if (realizedPnL != null) {
      const format = realizedPnL.floor(2)
      return `${Number(format) >= 0 ? "+" : ""}${format} ATF`
    }
    return "-"
  }, [realizedPnL])

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
  const showF = useMemo(() => {
    if (
      data.pt0 != null &&
      data.pt1 != null &&
      data.lastPrice != null &&
      data.openPrice &&
      data.orientation != null &&
      data.leverage != null &&
      data.margin != null
    ) {
      let F = 0
      const u = data.pt1 - data.pt0
      const priceRatio = data.lastPrice / data.openPrice
      const v = data.orientation
        ? data.margin * Number(data.leverage) * priceRatio
        : data.margin * Number(data.leverage) * (2 - priceRatio)
      F = -Number((u * v).floor(2))
      return `${F > 0 ? "+" : ""}${F} ATF`
    }
    return "- ATF"
  }, [data.lastPrice, data.leverage, data.margin, data.openPrice, data.orientation, data.pt0, data.pt1])
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
    isLong,
    lever,
    tp,
    sl,
    showOpenPrice,
    showPercent,
    isRed,
    showShareOrderModal,
    setShowShareOrderModal,
    shareOrder,
    showClosePrice,
    showSize,
    showMargin,
    openTime,
    closeTime,
    showRealizedPnL,
    showF
  };
}

export default useFuturesHistory;
