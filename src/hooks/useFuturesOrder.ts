import { useCallback, useMemo, useState } from "react";
import { Order } from "../pages/Dashboard/Dashboard";
import { t } from "@lingui/macro";
import useArithFi from "./useArithFi";
import { serviceCancel } from "../lib/ArithFiRequest";
import {
  TransactionType,
  usePendingTransactionsBase,
} from "./useTransactionReceipt";
import { SnackBarType } from "../components/SnackBar/NormalSnackBar";
import { FuturesOrderService } from "../pages/Futures/OrderList";

function useFuturesOrder(data: FuturesOrderService, updateList: () => void) {
  const { account, signature } = useArithFi();
  const [loading, setLoading] = useState<boolean>(false);
  const tokenName = data.product.split("/")[0];
  const isLong = data.direction;
  const lever = data.leverage;
  const [showShareOrderModal, setShowShareOrderModal] =
    useState<boolean>(false);
  const showLimitPrice = useMemo(() => {
    return data.orderPrice.toFixed(data.product.getTokenPriceDecimals());
  }, [data.orderPrice, data.product]);
  const showBalance = useMemo(() => {
    return data.margin.toFixed(2);
  }, [data.margin]);
  const { addTransactionNotice } = usePendingTransactionsBase();
  const showTriggerTitle = useMemo(() => {
    const isEdit = data.takeProfitPrice === 0 && data.stopLossPrice === 0;
    return !isEdit ? t`Edit` : t`Trigger`;
  }, [data.stopLossPrice, data.takeProfitPrice]);
  /**
   * action
   */
  const close = useCallback(async () => {
    if (account.address && signature) {
      const closeBase: { [key: string]: any } = await serviceCancel(
        account.address,
        data.id.toString(),
        { Authorization: signature.signature }
      );
      if (Number(closeBase["err"]) === 0) {
        updateList();
      }
      addTransactionNotice({
        type: TransactionType.futures_closeLimit,
        info: "",
        result:
          Number(closeBase["err"]) === 0
            ? SnackBarType.success
            : SnackBarType.fail,
      });
    }
    setLoading(false);
  }, [account.address, addTransactionNotice, data.id, signature, updateList]);
  /**
   * main button
   */
  const mainButtonTitle = useMemo(() => {
    return t`Close`;
  }, []);
  const mainButtonLoading = useMemo(() => {
    return loading;
  }, [loading]);
  const mainButtonDis = useMemo(() => {
    return false;
  }, []);
  const mainButtonAction = useCallback(() => {
    if (mainButtonLoading) {
      return;
    } else {
      setLoading(true);
      close();
    }
  }, [close, mainButtonLoading]);
  const tp = useMemo(() => {
    return data.takeProfitPrice === 0
      ? String().placeHolder
      : data.takeProfitPrice.floor(data.product.getTokenPriceDecimals());
  }, [data.takeProfitPrice, data.product]);
  const sl = useMemo(() => {
    return data.stopLossPrice === 0
      ? String().placeHolder
      : data.stopLossPrice.floor(data.product.getTokenPriceDecimals());
  }, [data.stopLossPrice, data.product]);
  const openTime = useMemo(() => {
    const time = new Date(data.timestamp * 1000);
    return [time.toLocaleDateString(), time.toLocaleTimeString()];
  }, [data.timestamp]);

  const shareOrder = useMemo(() => {
    const info: Order = {
      owner: data.walletAddress.toString(),
      leverage: `${data.leverage.toString()}X`,
      orientation: data.direction ? `Long` : `Short`,
      actualRate: 0,
      index: parseInt(data.id.toString()),
      openPrice:
        parseFloat(
          data.orderPrice.floor(data.product.getTokenPriceDecimals())
        ) ?? 0,
      tokenPair: data.product,
      actualMargin: 0,
      initialMargin: parseFloat(data.balance.floor(2)),
      lastPrice: 0,
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
    sl,
    tp,
  ]);
  return {
    tokenName,
    isLong,
    lever,
    showLimitPrice,
    showBalance,
    mainButtonTitle,
    mainButtonLoading,
    mainButtonDis,
    mainButtonAction,
    showShareOrderModal,
    setShowShareOrderModal,
    shareOrder,
    tp,
    sl,
    openTime,
    showTriggerTitle,
  };
}

export default useFuturesOrder;
