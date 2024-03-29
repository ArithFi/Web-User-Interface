import { useCallback, useMemo, useState } from "react";
import { FuturesOrderService } from "../pages/Futures/OrderList";
import { t } from "@lingui/macro";
import useArithFi from "./useArithFi";
import { serviceUpdateLimitPrice } from "../lib/ArithFiRequest";

function useFuturesEditLimit(
  data: FuturesOrderService,
  onClose: (res?: boolean) => void
) {
  const { account, signature } = useArithFi();
  const [loading, setLoading] = useState<boolean>(false);
  const defaultLimitPrice = useMemo(() => {
    const orderPrice = data.orderPrice.toString().stringToBigNumber(18);
    if (orderPrice) {
      return data.orderPrice !== 0
        ? data.orderPrice.floor(data.product.getTokenPriceDecimals())
        : "";
    } else {
      return "";
    }
  }, [data.orderPrice, data.product]);
  const [limitPrice, setLimitPrice] = useState(defaultLimitPrice);
  /**
   * action
   */
  const update = useCallback(async () => {
    if (account.address && signature) {
      const updateBase: { [key: string]: any } = await serviceUpdateLimitPrice(
        account.address,
        data.id.toString(),
        limitPrice,
        { Authorization: signature.signature }
      );
      if (Number(updateBase["err"]) === 0) {
      }
      onClose(Number(updateBase["err"]) === 0);
    }
    setLoading(false);
  }, [account.address, data.id, limitPrice, onClose, signature]);

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
    return false;
  }, []);
  const mainButtonAction = useCallback(() => {
    if (mainButtonLoading) {
      return;
    } else {
      setLoading(true);
      update();
    }
  }, [mainButtonLoading, update]);
  return {
    limitPrice,
    setLimitPrice,
    mainButtonTitle,
    mainButtonLoading,
    mainButtonDis,
    mainButtonAction,
  };
}

export default useFuturesEditLimit;
