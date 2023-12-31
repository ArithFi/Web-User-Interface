import { useCallback, useMemo, useState } from "react";
import { FuturesOrderService } from "../pages/Futures/OrderList";

import { BigNumber } from "ethers";
import { lipPrice } from "./useFuturesNewOrder";
import { FuturesPrice } from "../pages/Futures/Futures";
import { t } from "@lingui/macro";
import { serviceUpdateStopPrice } from "../lib/ArithFiRequest";
import useArithFi from "./useArithFi";

function useFuturesEditPosition(
  data: FuturesOrderService,
  price: FuturesPrice | undefined,
  onClose: (res?: boolean) => void
) {
  const { chainsData, signature } = useArithFi();
  const [loading, setLoading] = useState<boolean>(false);
  /**
   * futures modal
   */
  const checkShowTriggerNotice = useMemo(() => {
    const isShow = localStorage.getItem("TriggerRiskModal");
    return isShow === "1" ? false : true;
  }, []);
  const [showTriggerNotice, setShowTriggerNotice] = useState(false);
  const [showedTriggerNotice, setShowedTriggerNotice] = useState(false);

  const defaultTP = useMemo(() => {
    if (data.takeProfitPrice !== 0) {
      const p = data.takeProfitPrice.floor(
        data.product.getTokenPriceDecimals()
      );
      return p ?? "";
    }
    return "";
  }, [data.takeProfitPrice, data.product]);
  const defaultSL = useMemo(() => {
    if (data.stopLossPrice !== 0) {
      const p = data.stopLossPrice.floor(data.product.getTokenPriceDecimals());
      return p ?? "";
    }
    return "";
  }, [data.stopLossPrice, data.product]);
  const [stopProfitPriceInput, setStopProfitPriceInput] =
    useState<string>(defaultTP);
  const [stopLossPriceInput, setStopLossPriceInput] =
    useState<string>(defaultSL);
  const isEditTP = useMemo(() => {
    if (stopProfitPriceInput !== "") {
      return true;
    }
    return false;
  }, [stopProfitPriceInput]);
  const isEditSL = useMemo(() => {
    if (stopLossPriceInput !== "") {
      return true;
    }
    return false;
  }, [stopLossPriceInput]);
  const baseOpenPrice = useMemo(() => {
    return data.orderPrice.floor(data.product.getTokenPriceDecimals());
  }, [data.orderPrice, data.product]);
  const tpError = useMemo(() => {
    if (stopProfitPriceInput !== "" && parseFloat(stopProfitPriceInput) !== 0) {
      return data.direction
        ? Number(stopProfitPriceInput) < Number(baseOpenPrice)
        : Number(stopProfitPriceInput) > Number(baseOpenPrice);
    }
    return false;
  }, [baseOpenPrice, data.direction, stopProfitPriceInput]);
  const slError = useMemo(() => {
    if (stopLossPriceInput !== "" && parseFloat(stopLossPriceInput) !== 0) {
      return data.direction
        ? Number(stopLossPriceInput) > Number(baseOpenPrice)
        : Number(stopLossPriceInput) < Number(baseOpenPrice);
    }
    return false;
  }, [baseOpenPrice, data.direction, stopLossPriceInput]);

  /**
   * action
   */
  const update = useCallback(async () => {
    if (chainsData.chainId && signature) {
      const updateBase: { [key: string]: any } = await serviceUpdateStopPrice(
        data.id.toString(),
        stopLossPriceInput === "" ? "0" : stopLossPriceInput,
        stopProfitPriceInput === "" ? "0" : stopProfitPriceInput,
        chainsData.chainId,
        { Authorization: signature.signature }
      );
      if (Number(updateBase["errorCode"]) === 0) {
      }
      onClose(Number(updateBase["errorCode"]) === 0);
    }
    setLoading(false);
  }, [
    chainsData.chainId,
    data.id,
    onClose,
    signature,
    stopLossPriceInput,
    stopProfitPriceInput,
  ]);
  /**
   * show
   */
  const placeHolder = useMemo(() => {
    return data.direction
      ? [t`> OPEN PRICE`, t`< OPEN PRICE`]
      : [t`< OPEN PRICE`, t`> OPEN PRICE`];
  }, [data.direction]);
  const showPosition = useMemo(() => {
    const lever = data.leverage.toString();
    const longOrShort = data.direction ? t`Long` : t`Short`;
    const balance = data.balance.floor(2);
    return `${lever}X ${longOrShort} ${balance} ATF`;
  }, [data.balance, data.leverage, data.direction]);
  const showOpenPrice = useMemo(() => {
    return `${baseOpenPrice}`;
  }, [baseOpenPrice]);
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

  /**
   * main button
   */
  const mainButtonTitle = useMemo(() => {
    return t`Confirm`;
  }, []);
  const mainButtonLoading = useMemo(() => {
    return loading;
  }, [loading]);
  const mainButtonDis = useMemo(() => {
    if (stopProfitPriceInput === "" && stopLossPriceInput === "") {
      return true;
    } else if (tpError || slError) {
      return true;
    }
    return false;
  }, [slError, stopLossPriceInput, stopProfitPriceInput, tpError]);
  const triggerNoticeCallback = useCallback(() => {
    setShowedTriggerNotice(true);
    setLoading(true);
    update();
  }, [update]);
  const mainButtonAction = useCallback(() => {
    if (mainButtonLoading || tpError || slError) {
      return;
    } else {
      if (checkShowTriggerNotice && !showedTriggerNotice) {
        setShowTriggerNotice(true);
        return;
      }
      setLoading(true);
      update();
    }
  }, [
    checkShowTriggerNotice,
    mainButtonLoading,
    showedTriggerNotice,
    slError,
    tpError,
    update,
  ]);
  const closeTP = useCallback(() => {
    setStopProfitPriceInput("0");
  }, []);
  const closeSL = useCallback(() => {
    setStopLossPriceInput("0");
  }, []);
  return {
    stopProfitPriceInput,
    setStopProfitPriceInput,
    stopLossPriceInput,
    setStopLossPriceInput,
    showPosition,
    showOpenPrice,
    showLiqPrice,
    mainButtonTitle,
    mainButtonLoading,
    mainButtonDis,
    mainButtonAction,
    placeHolder,
    isEditTP,
    isEditSL,
    closeTP,
    closeSL,
    showTriggerNotice,
    setShowTriggerNotice,
    triggerNoticeCallback,
    tpError,
    slError,
  };
}

export default useFuturesEditPosition;
