import { BigNumber } from "ethers";
import { useCallback, useMemo, useState } from "react";
import { FuturesPrice } from "../pages/Futures/Futures";
import { FuturesOrderService } from "../pages/Futures/OrderList";

import { t } from "@lingui/macro";
import { serviceClose } from "../lib/ArithFiRequest";
import useArithFi from "./useArithFi";

function useFuturesClose(
  data: FuturesOrderService,
  price: FuturesPrice | undefined,
  onClose: (result: boolean) => void
) {
  const [loading, setLoading] = useState<boolean>(false);
  const { account, signature } = useArithFi();
  const showPosition = useMemo(() => {
    const lever = data.leverage.toString();
    const longOrShort = data.direction ? t`Long` : t`Short`;
    const balance = data.balance.floor(2);
    return `${lever}X ${longOrShort} ${balance} ATF`;
  }, [data.balance, data.direction, data.leverage]);

  const closePrice = useMemo(() => {
    const atfBigNumber = data.balance.toString().stringToBigNumber(18);
    const orderPrice = data.orderPrice.toString().stringToBigNumber(18);
    const token = data.product.toLocaleUpperCase();
    if (price && atfBigNumber && orderPrice) {
      const nowPrice = price[token];
      if (atfBigNumber.gte("100000".stringToBigNumber(18)!)) {
        // const cc_top = BigNumber.from("55560000")
        //   .mul(atfBigNumber)
        //   .mul(BigNumber.from(data.leverage.toString()))
        //   .mul(nowPrice)
        //   .add(
        //     BigNumber.from("444400000000000")
        //       .mul(BigNumber.from("10").pow(18))
        //       .mul(orderPrice)
        //   );
        // const cc_long = BigNumber.from(orderPrice.toString())
        //   .mul(nowPrice)
        //   .mul(BigNumber.from("10").pow(36))
        //   .div(
        //     BigNumber.from(orderPrice.toString())
        //       .mul(BigNumber.from("10").pow(36))
        //       .add(cc_top)
        //   );
        // const cc_Short = BigNumber.from(nowPrice)
        //   .mul(BigNumber.from(orderPrice.toString()))
        //   .mul(BigNumber.from("10").pow(36))
        //   .add(cc_top.mul(nowPrice))
        //   .div(
        //     BigNumber.from(orderPrice.toString()).mul(
        //       BigNumber.from("10").pow(36)
        //     )
        //   );
        // return data.direction ? cc_long : cc_Short;
        return nowPrice;
      } else {
        return nowPrice;
      }
    } else {
      return undefined;
    }
  }, [data.balance, data.orderPrice, data.product, price]);
  const showClosePrice = useMemo(() => {
    if (!closePrice) {
      return String().placeHolder;
    }
    const token = data.product.toLocaleUpperCase();
    return BigNumber.from(closePrice.toString()).bigNumberToShowPrice(
      18,
      token.getTokenPriceDecimals()
    );
  }, [closePrice, data.product]);

  /**
   * action
   */
  const close = useCallback(async () => {
    if (account.address && signature) {
      const closeBase: { [key: string]: any } = await serviceClose(
        account.address,
        data.id.toString(),
        { Authorization: signature.signature }
      );
      if (Number(closeBase["err"]) === 0) {
        onClose(Number(closeBase["err"]) === 0);
      }
    }
    setLoading(false);
  }, [account.address, data.id, onClose, signature]);

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
    if (!mainButtonLoading) {
      setLoading(true);
      close();
    }
  }, [close, mainButtonLoading]);
  return {
    showPosition,
    showClosePrice,
    mainButtonTitle,
    mainButtonLoading,
    mainButtonDis,
    mainButtonAction,
  };
}

export default useFuturesClose;
