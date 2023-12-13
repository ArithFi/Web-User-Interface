import { useCallback, useEffect, useMemo, useState } from "react";

import { FuturesOrderService } from "../pages/Futures/OrderList";
import useArithFi from "./useArithFi";
import { BigNumber } from "ethers";
import { lipPrice } from "./useFuturesNewOrder";
import { FuturesPrice } from "../pages/Futures/Futures";
import { t } from "@lingui/macro";
import useService from "../contracts/useService";
import { serviceAdd } from "../lib/ArithFiRequest";

function useFuturesAdd(
  data: FuturesOrderService,
  price: FuturesPrice | undefined,
  onClose: (res?: boolean) => void
) {
  const { account, chainsData, signature } = useArithFi();
  const [arithFiAmount, setArithFiAmount] = useState("");
  const { service_balance } = useService();
  const [tokenBalance, setTokenBalance] = useState<BigNumber>();
  const [loading, setLoading] = useState<boolean>(false);
  /**
   * balance
   */
  const getBalance = useCallback(async () => {
    service_balance((result: number) => {
      const balance_bigNumber = result.toString().stringToBigNumber(18);
      setTokenBalance(balance_bigNumber ?? BigNumber.from("0"));
    });
  }, [service_balance]);
  /**
   * check
   */
  const checkBalance = useMemo(() => {
    if (tokenBalance) {
      const arithFiAmountNumber =
        arithFiAmount === ""
          ? BigNumber.from("0")
          : arithFiAmount.stringToBigNumber(18)!;
      return arithFiAmountNumber.lte(tokenBalance);
    } else {
      return false;
    }
  }, [arithFiAmount, tokenBalance]);
  /**
   * action
   */
  const add = useCallback(async () => {
    if (chainsData.chainId && signature) {
      const addBase: { [key: string]: any } = await serviceAdd(
        arithFiAmount,
        chainsData.chainId,
        data.id.toString(),
        { Authorization: signature.signature }
      );
      if (Number(addBase["errorCode"]) === 0) {
        getBalance();
      }
      onClose(Number(addBase["errorCode"]) === 0);
    }
    setLoading(false);
  }, [
    chainsData.chainId,
    data.id,
    getBalance,
    arithFiAmount,
    onClose,
    signature,
  ]);

  const maxCallBack = useCallback(() => {
    if (tokenBalance) {
      setArithFiAmount(tokenBalance.bigNumberToShowString(18, 2));
    }
  }, [tokenBalance]);
  /**
   * show
   */
  const showToSwap = useMemo(() => {
    if (account.address && tokenBalance) {
      return BigNumber.from("0").eq(tokenBalance) ? true : false;
    } else {
      return false;
    }
  }, [account.address, tokenBalance]);
  const showBalance = useMemo(() => {
    if (account.address) {
      if (tokenBalance) {
        return tokenBalance.bigNumberToShowString(18, 2);
      } else {
        return "0";
      }
    } else {
      return String().placeHolder;
    }
  }, [account.address, tokenBalance]);
  const showPosition = useMemo(() => {
    const lever = data.leverage.toString();
    const longOrShort = data.direction ? t`Long` : t`Short`;
    const balance = data.balance.toFixed(2);
    return `${lever}X ${longOrShort} ${balance} ATF`;
  }, [data.balance, data.direction, data.leverage]);

  const showOpenPrice = useMemo(() => {
    return `${data.orderPrice.toFixed(data.product.getTokenPriceDecimals())}`;
  }, [data.orderPrice, data.product]);

  const showLiqPrice = useMemo(() => {
    if (price) {
      const balance =
        data.margin.toString().stringToBigNumber(18) ?? BigNumber.from("0");
      const orderPrice =
        data.orderPrice.toString().stringToBigNumber(18) ?? BigNumber.from("0");
      const result = lipPrice(
        data.product,
        balance,
        arithFiAmount === ""
          ? BigNumber.from("0")
          : arithFiAmount.stringToBigNumber(4)!,
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
    arithFiAmount,
    data.direction,
    data.leverage,
    data.margin,
    data.orderPrice,
    data.product,
    price,
  ]);
  /**
   * main button
   */
  const mainButtonTitle = useMemo(() => {
    if (!checkBalance) {
      return t`Insufficient ATF balance`;
    } else {
      return t`Confirm`;
    }
  }, [checkBalance]);
  const mainButtonLoading = useMemo(() => {
    return loading;
  }, [loading]);
  const mainButtonDis = useMemo(() => {
    if (
      !account.address ||
      BigNumber.from("0").eq(
        arithFiAmount.stringToBigNumber(4) ?? BigNumber.from("0")
      )
    ) {
      return true;
    }
    return !checkBalance;
  }, [account.address, checkBalance, arithFiAmount]);
  const mainButtonAction = useCallback(() => {
    if (mainButtonLoading || !checkBalance || mainButtonDis) {
      return;
    } else {
      setLoading(true);
      add();
    }
  }, [add, checkBalance, mainButtonDis, mainButtonLoading]);
  /**
   * update
   */
  useEffect(() => {
    getBalance();
    const time = setInterval(() => {
      getBalance();
    }, 5 * 1000);
    return () => {
      clearInterval(time);
    };
  }, [getBalance]);
  return {
    checkBalance,
    showToSwap,
    showBalance,
    maxCallBack,
    arithFiAmount,
    setArithFiAmount,
    showPosition,
    showOpenPrice,
    showLiqPrice,
    mainButtonTitle,
    mainButtonLoading,
    mainButtonDis,
    mainButtonAction,
  };
}

export default useFuturesAdd;
