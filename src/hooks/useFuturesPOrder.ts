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
    if (price) {
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
        price[data.product.toLocaleUpperCase()],
        orderPrice,
        data.direction
      );
      return result.bigNumberToShowPrice(
        18,
        data.product.getTokenPriceDecimals()
      );
    } else {
      return String().placeHolder;
    }
  }, [
    price,
    data.margin,
    data.orderPrice,
    data.append,
    data.leverage,
    data.product,
    data.direction,
  ]);
  const showMarginAssets = useMemo(() => {
    return data.balance.toFixed(2);
  }, [data.balance]);

  const showPercentNum = useMemo(() => {
    const balance_num = data.margin + data.append;
    const marginAssets_num = data.balance;
    if (marginAssets_num >= balance_num) {
      return parseFloat(
        (((marginAssets_num - balance_num) * 100) / balance_num).toFixed(2)
      );
    } else {
      return -parseFloat(
        (((balance_num - marginAssets_num) * 100) / balance_num).toFixed(2)
      );
    }
  }, [data.append, data.balance, data.margin]);
  const showPercent = useMemo(() => {
    if (showPercentNum > 0) {
      return `+${showPercentNum}`;
    } else if (showPercentNum < 0) {
      return `${showPercentNum}`;
    } else {
      return "0";
    }
  }, [showPercentNum]);
  const isRed = useMemo(() => {
    return showPercent.indexOf("-") === 0;
  }, [showPercent]);
  const openTime = useMemo(() => {
    const time = new Date(data.timestamp * 1000);
    return [time.toLocaleDateString(), time.toLocaleTimeString()];
  }, [data.timestamp]);
  const shareOrder = useMemo(() => {
    const info: Order = {
      owner: data.walletAddress.toString(),
      leverage: `${data.leverage.toString()}X`,
      orientation: data.direction ? `Long` : `Short`,
      actualRate: showPercentNum,
      index: parseInt(data.id.toString()),
      openPrice: parseFloat(
        data.orderPrice.toFixed(data.product.getTokenPriceDecimals())
      ),
      tokenPair: data.product,
      actualMargin: parseFloat(data.balance.toFixed(2)),
      initialMargin: parseFloat(data.balance.toFixed(2)),
      lastPrice: parseFloat(
        price
          ? price[data.product.toLocaleUpperCase()].bigNumberToShowPrice(
              18,
              data.product.getTokenPriceDecimals()
            )
          : "0"
      ),
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
    price,
    showPercentNum,
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
    showMarginAssets,
    showPercent,
    isRed,
    showShareOrderModal,
    setShowShareOrderModal,
    shareOrder,
    openTime,
  };
}

export default useFuturesPOrder;
