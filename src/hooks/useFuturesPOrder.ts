import { BigNumber } from "ethers";
import { useMemo, useState } from "react";

import { FuturesPrice } from "../pages/Futures/Futures";
import { lipPrice } from "./useFuturesNewOrder";

import { Order } from "../pages/Dashboard/Dashboard";
import { t } from "@lingui/macro";
import { FuturesOrderService } from "../pages/Futures/OrderList";

function useFuturesPOrder(
  data: FuturesOrderService,
  price: FuturesPrice | undefined
) {
  const isLong = data.direction;
  const lever = data.leverage;
  const [showShareOrderModal, setShowShareOrderModal] =
    useState<boolean>(false);
  const showBasePrice = data.orderPrice.toFixed(
    data.product.getTokenPriceDecimals()
  );
  const showTriggerTitle = useMemo(() => {
    const isEdit = data.takeProfitPrice === 0 && data.stopLossPrice === 0;
    return !isEdit ? t`Edit` : t`Trigger`;
  }, [data.stopLossPrice, data.takeProfitPrice]);
  const tp = useMemo(() => {
    return data.takeProfitPrice === 0
      ? String().placeHolder
      : data.takeProfitPrice.toFixed(data.product.getTokenPriceDecimals());
  }, [data.takeProfitPrice, data.product]);
  const sl = useMemo(() => {
    return data.stopLossPrice === 0
      ? String().placeHolder
      : data.stopLossPrice.toFixed(data.product.getTokenPriceDecimals());
  }, [data.stopLossPrice, data.product]);
  const showLiqPrice = useMemo(() => {
    const balance =
      data.margin.toString().stringToBigNumber(18) ?? BigNumber.from("0");
    const orderPrice =
      data.orderPrice.toString().stringToBigNumber(18) ?? BigNumber.from("0");
    const append =
      data.append.toString().stringToBigNumber(18) ?? BigNumber.from("0");
    const result = lipPrice(
      data.product,
      balance,
      append,
      BigNumber.from(data.leverage.toString()),
      orderPrice,
      data.direction,
      data.pt0,
      data.pt1,
      price ? price[data.product] : orderPrice
    );
    return result.bigNumberToShowPrice(
      18,
      data.product.getTokenPriceDecimals()
    );
  }, [
    data.margin,
    data.orderPrice,
    data.append,
    data.pt1,
    data.pt0,
    data.product,
    data.leverage,
    data.direction,
    price,
  ]);
  const showSize = useMemo(() => {
    if (data.leverage != null && data.margin != null) {
      return `${(data.leverage * data.margin).floor(2)} ATF`;
    }
    return "-";
  }, [data.leverage, data.margin]);

  const showMargin = useMemo(() => {
    if (data.margin != null && data.append != null) {
      return `${(data.margin + data.append).floor(2)} ATF`;
    }
    return "-";
  }, [data.append, data.margin]);
  const unrealizedPnL = useMemo(() => {
    if (data.margin != null && data.append != null && data.balance != null) {
      return data.balance - (data.margin + data.append);
    }
    return undefined;
  }, [data.append, data.balance, data.margin]);
  const showUnrealizedPnL = useMemo(() => {
    if (unrealizedPnL != null) {
      const format = unrealizedPnL.floor(2);
      return `${Number(format) >= 0 ? "+" : ""}${format} ATF`;
    }
    return "-";
  }, [unrealizedPnL]);

  const ROI = useMemo(() => {
    if (unrealizedPnL != null && data.margin != null) {
      const percent = unrealizedPnL / data.margin;
      return percent;
    }
    return undefined;
  }, [data.margin, unrealizedPnL]);
  const showROI = useMemo(() => {
    if (ROI != null) {
      return `${ROI >= 0 ? "+" : ""}${(ROI * 100).floor(2)}%`;
    }
    return "-";
  }, [ROI]);
  const showMarginRatio = useMemo(() => {
    if (data.marginRatio != null) {
      return `${(data.marginRatio * 100).floor(2)}%`;
    }
    return "-";
  }, [data.marginRatio]);
  const isRed = useMemo(() => {
    return showROI.indexOf("-") === 0;
  }, [showROI]);
  const openTime = useMemo(() => {
    const time = new Date(data.timestamp * 1000);
    return [time.toLocaleDateString(), time.toLocaleTimeString()];
  }, [data.timestamp]);
  const nowPrice = useMemo(() => {
    if (data.lastPrice != null) {
      return data.lastPrice.floor(data.product.getTokenPriceDecimals())
    }
    return "0"
  }, [data.lastPrice, data.product]);
  const shareOrder = useMemo(() => {
    const info: Order = {
      owner: data.walletAddress.toString(),
      leverage: `${data.leverage.toString()}X`,
      orientation: data.direction ? `Long` : `Short`,
      actualRate: Number(showROI),
      index: parseInt(data.id.toString()),
      openPrice: parseFloat(
        data.orderPrice.toFixed(data.product.getTokenPriceDecimals())
      ),
      tokenPair: data.product,
      actualMargin: parseFloat(data.balance.toFixed(2)),
      initialMargin: parseFloat(data.balance.toFixed(2)),
      lastPrice: parseFloat(nowPrice),
      sp: parseFloat(tp === String().placeHolder ? "0" : tp),
      sl: parseFloat(sl === String().placeHolder ? "0" : sl),
    };
    return info;
  }, [
    data.balance,
    data.direction,
    data.id,
    data.leverage,
    data.orderPrice,
    data.product,
    data.walletAddress,
    nowPrice,
    showROI,
    sl,
    tp,
  ]);
  return {
    isLong,
    lever,
    showBasePrice,
    showTriggerTitle,
    tp,
    sl,
    showLiqPrice,
    showUnrealizedPnL,
    showSize,
    showMargin,
    showROI,
    showMarginRatio,
    isRed,
    showShareOrderModal,
    setShowShareOrderModal,
    shareOrder,
    openTime,
    nowPrice
  };
}

export default useFuturesPOrder;
