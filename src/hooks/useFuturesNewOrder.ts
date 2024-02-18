import { BigNumber } from "ethers";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FuturesPrice, isForex } from "../pages/Futures/Futures";
import useArithFi from "./useArithFi";
import { getQueryVariable } from "../lib/queryVaribale";
import { serviceOpen } from "../lib/ArithFiRequest";
import { t } from "@lingui/macro";
import useService from "../contracts/useService";
import {
  TransactionType,
  usePendingTransactionsBase,
} from "./useTransactionReceipt";
import { SnackBarType } from "../components/SnackBar/NormalSnackBar";

export const MIN_ATF_BIG_NUMBER = BigNumber.from("500000");

const isForesNewOrder = (tokenPair: string) => {
  return (
    tokenPair.substring(tokenPair.length - 3) === "USD" ||
    tokenPair.substring(0, 3) === "USD"
  );
};

export const lipPrice = (
  tokenPair: string,
  balance: BigNumber,
  appends: BigNumber,
  lever: BigNumber,
  nowPrice: BigNumber,
  price: BigNumber,
  orientation: boolean
) => {
  if (
    BigNumber.from("0").eq(BigNumber.from(balance.toString())) ||
    BigNumber.from("0").eq(lever)
  ) {
    return BigNumber.from("0");
  }
  const isForex = isForesNewOrder(tokenPair);
  if (isForex) {
    const subPrice = price
      .mul(BigNumber.from("95"))
      .div(BigNumber.from("10000"));
    return orientation ? price.sub(subPrice) : price.add(subPrice);
  } else {
    const i = BigNumber.from("5")
      .mul(balance)
      .mul(lever)
      .div(BigNumber.from("1000"));
    const top = BigNumber.from(balance.toString())
      .add(appends)
      .sub(i)
      .mul(price);
    const bottom = BigNumber.from(balance.toString()).mul(lever);
    const subPrice = top.div(bottom);
    const result = orientation ? price.sub(subPrice) : price.add(subPrice);
    return BigNumber.from("0").gt(result) ? BigNumber.from("0") : result;
  }
};

export const INPUT_TOKENS = ["ATF"];

function addPricePoint(price: BigNumber, isLong: boolean) {
  const priceBigNumber = BigNumber.from(price.toString());
  if (isLong) {
    return priceBigNumber.add(priceBigNumber.mul(1).div(100));
  } else {
    return priceBigNumber.sub(priceBigNumber.mul(1).div(100));
  }
}

function useFuturesNewOrder(
  price: FuturesPrice | undefined,
  tokenPair: string,
  updateList: () => void
) {
  const fLever = useMemo(() => {
    if (isForesNewOrder(tokenPair)) {
      return 100;
    } else {
      return 1;
    }
  }, [tokenPair]);
  const { account, chainsData, showConnectModal, signature } = useArithFi();
  const [tabsValue, setTabsValue] = useState(0);
  const [arithFiAmount, setArithFiAmount] = useState("");
  const [lever, setLever] = useState(fLever);
  const [limitAmount, setLimitAmount] = useState("");
  const [isStop, setIsStop] = useState(false);
  const [tp, setTp] = useState("");
  const [sl, setSl] = useState("");
  const [inputAmount, setInputAmount] = useState("");
  const [tokenBalance, setTokenBalance] = useState<BigNumber>();
  const [loading, setLoading] = useState<boolean>(false);
  const { service_balance } = useService();
  const { addTransactionNotice } = usePendingTransactionsBase();
  const [showDeposit, setShowDeposit] = useState(false);
  const [showSignModal, setShowSignModal] = useState(false);
  const [amountPercent, setAmountPercent] = useState(0);

  const openPriceBase = useMemo(() => {
    const nowPrice = price?.[tokenPair];
    if (price && nowPrice) {
      return nowPrice;
    } else {
      return undefined;
    }
  }, [price, tokenPair]);

  /**
   * uniswap out amount
   */
  const feeNum = useMemo(() => {
    return isForex(lever) ? 2 : 5;
  }, [lever]);
  const allValue = useCallback(
    (value: BigNumber) => {
      return value
        .mul(BigNumber.from("10000"))
        .div(BigNumber.from(`${10000 + lever * feeNum}`));
    },
    [feeNum, lever]
  );
  useEffect(() => {
    setArithFiAmount(inputAmount);
  }, [inputAmount]);
  useEffect(() => {
    if (isForesNewOrder(tokenPair)) {
      setLever(100);
    } else {
      setLever(1);
    }
  }, [tokenPair]);

  /**
   * futures modal
   */
  const checkShowTriggerNotice = useMemo(() => {
    const isShow = localStorage.getItem("TriggerRiskModal");
    return isShow === "1" ? false : true;
  }, []);
  const [showTriggerNotice, setShowTriggerNotice] = useState<
    boolean | undefined
  >(undefined);
  const [showedTriggerNotice, setShowedTriggerNotice] = useState(false);
  /**
   * balance
   */
  const getBalance = useCallback(async () => {
    service_balance((result: number) => {
      const balance_bigNumber = result.toString().stringToBigNumber(18);
      setTokenBalance(balance_bigNumber ?? BigNumber.from("0"));
    });
  }, [service_balance]);

  const fee = useMemo(() => {
    if (arithFiAmount === "") {
      return BigNumber.from("0");
    }
    const baseFee = arithFiAmount
      .stringToBigNumber(18)!
      .mul(BigNumber.from(lever.toString()))
      .mul(BigNumber.from(feeNum.toString()))
      .div(BigNumber.from("10000"));
    return baseFee;
  }, [arithFiAmount, lever, feeNum]);
  /**
   * check
   */
  const checkBalance = useMemo(() => {
    const inputAmountNumber =
      inputAmount === ""
        ? BigNumber.from("0")
        : inputAmount.stringToBigNumber(18)!;

    if (tokenBalance) {
      return fee.add(inputAmountNumber).lte(tokenBalance);
    } else {
      return false;
    }
  }, [fee, inputAmount, tokenBalance]);
  /**
   * action
   */
  const basePrice = useMemo(() => {
    if (openPriceBase) {
      if (tabsValue === 1) {
        return limitAmount.stringToBigNumber(18) ?? BigNumber.from("0");
      } else {
        return openPriceBase;
        // return addPricePoint(nowPrice, longOrShort);
      }
    } else {
      return undefined;
    }
  }, [limitAmount, openPriceBase, tabsValue]);

  const open = useCallback(
    async (isLong: boolean) => {
      if (chainsData.chainId && account.address && basePrice && signature) {
        const orderPrice =
          tabsValue === 1
            ? basePrice.bigNumberToShowString(18, 7)
            : addPricePoint(basePrice, isLong).bigNumberToShowString(18, 7);
        const openBase: { [key: string]: any } = await serviceOpen(
          account.address,
          isLong,
          lever,
          tabsValue === 1,
          Number(inputAmount),
          Number(orderPrice),
          `${tokenPair}`,
          Number(sl),
          Number(tp),
          { Authorization: signature.signature }
        );
        if (Number(openBase["err"]) === 0) {
          getBalance();
          updateList();
        }
        addTransactionNotice({
          type: TransactionType.futures_buy,
          info: "",
          result:
            Number(openBase["err"]) === 0
              ? SnackBarType.success
              : SnackBarType.fail,
        });
      }
      setLoading(false);
    },
    [
      account.address,
      addTransactionNotice,
      basePrice,
      chainsData.chainId,
      getBalance,
      inputAmount,
      lever,
      signature,
      sl,
      tabsValue,
      tokenPair,
      tp,
      updateList,
    ]
  );
  const showTotalPay = useMemo(() => {
    if (arithFiAmount !== "") {
      return fee
        .add(arithFiAmount.stringToBigNumber(18)!)
        .bigNumberToShowString(18, 2);
    }
    return fee.bigNumberToShowString(18, 2);
  }, [fee, arithFiAmount]);
  /**
   * main button
   */
  const checkMinATF = useMemo(() => {
    return (arithFiAmount.stringToBigNumber(4) ?? BigNumber.from("0")).lt(
      MIN_ATF_BIG_NUMBER
    );
  }, [arithFiAmount]);
  // const tpError = useMemo(() => {
  //   if (
  //     tp !== "" &&
  //     !BigNumber.from("0").eq(tp.stringToBigNumber(18) ?? BigNumber.from("0"))
  //   ) {
  //     return longOrShort
  //       ? Number(tp) < Number(limitAmount)
  //       : Number(tp) > Number(limitAmount);
  //   }
  //   return false;
  // }, [limitAmount, longOrShort, tp]);
  // const slError = useMemo(() => {
  //   if (
  //     sl !== "" &&
  //     !BigNumber.from("0").eq(sl.stringToBigNumber(18) ?? BigNumber.from("0"))
  //   ) {
  //     return longOrShort
  //       ? Number(sl) > Number(limitAmount)
  //       : Number(sl) < Number(limitAmount);
  //   }
  //   return false;
  // }, [limitAmount, longOrShort, sl]);
  // const stopDis = useMemo(() => {
  //   return isStop && (tpError || slError);
  // }, [isStop, slError, tpError]);

  const [isTPError, setIsTPError] = useState(false);
  const [isSLError, setIsSLError] = useState(false);
  const checkTP = useCallback(
    (isLong: boolean) => {
      if (tp !== "" && Number(tp) !== 0) {
        if (isLong && Number(tp) < Number(limitAmount)) {
          setIsTPError(true);
          return true;
        } else if (!isLong && Number(tp) > Number(limitAmount)) {
          setIsTPError(true);
          return true;
        }
      }
      setIsTPError(false);
      return false;
    },
    [limitAmount, tp]
  );
  const clearTPSLError = useCallback(() => {
    setIsTPError(false);
    setIsSLError(false);
  }, []);

  const checkSL = useCallback(
    (isLong: boolean) => {
      if (sl !== "" && Number(sl) !== 0) {
        if (isLong && Number(sl) > Number(limitAmount)) {
          setIsSLError(true);
          return true;
        } else if (!isLong && Number(sl) < Number(limitAmount)) {
          setIsSLError(true);
          return true;
        }
      }
      setIsSLError(false);
      return false;
    },
    [limitAmount, sl]
  );

  const baseAction = useCallback(
    (isLong: boolean) => {
      if (!loading) {
        setLoading(true);
        open(isLong);
      }
    },
    [loading, open]
  );
  const triggerNoticeCallback = useCallback(
    (isLong?: boolean) => {
      if (isLong !== undefined) {
        setShowedTriggerNotice(true);
        baseAction(isLong);
      }
    },
    [baseAction]
  );

  const openCallBack = useCallback(
    (isLong: boolean) => {
      const tpResult = checkTP(isLong);
      const slResult = checkSL(isLong);
      if (inputAmount === "") {
        setInputAmount("0");
      }
      if (checkBalance && !checkMinATF && !tpResult && !slResult) {
        if (checkShowTriggerNotice && !showedTriggerNotice) {
          setShowTriggerNotice(isLong);
          return;
        }
        baseAction(isLong);
      }
    },
    [
      baseAction,
      checkBalance,
      checkMinATF,
      checkSL,
      checkShowTriggerNotice,
      checkTP,
      inputAmount,
      showedTriggerNotice,
    ]
  );

  /**
   * share order
   */
  const [isShareLink, setIsShareLink] = useState<boolean>(false);
  const [hasShowShareLink, setHadShowShareLink] = useState<boolean>(false);
  const tokenName_info = useMemo(() => {
    return getQueryVariable("pt");
  }, []);
  const orientation_info = useMemo(() => {
    return getQueryVariable("po") === "0" ? false : true;
  }, []);
  const lever_info = useMemo(() => {
    return getQueryVariable("pl");
  }, []);
  const basePrice_info = useMemo(() => {
    return getQueryVariable("pp");
  }, []);
  const tp_info = useMemo(() => {
    return getQueryVariable("pst");
  }, []);
  const sl_info = useMemo(() => {
    return getQueryVariable("psl");
  }, []);
  useEffect(() => {
    if (
      lever_info &&
      basePrice_info &&
      tp_info &&
      sl_info &&
      !hasShowShareLink
    ) {
      const tokenPriceDecimals = tokenPair.getTokenPriceDecimals();
      setTabsValue(1);
      setLever(parseInt(lever_info));
      setLimitAmount(
        (parseFloat(basePrice_info) / Math.pow(10, tokenPriceDecimals)).toFixed(
          tokenPriceDecimals
        )
      );
      if (parseInt(tp_info) > 0 || parseInt(sl_info) > 0) {
        setIsStop(true);
        if (parseInt(tp_info) > 0) {
          setTp(
            (parseFloat(tp_info) / Math.pow(10, tokenPriceDecimals)).toFixed(
              tokenPriceDecimals
            )
          );
        }
        if (parseInt(sl_info) > 0) {
          setSl(
            (parseFloat(sl_info) / Math.pow(10, tokenPriceDecimals)).toFixed(
              tokenPriceDecimals
            )
          );
        }
      }
      setIsShareLink(true);
      setHadShowShareLink(true);
    }
  }, [
    basePrice_info,
    hasShowShareLink,
    lever_info,
    orientation_info,
    sl_info,
    tokenPair,
    tp_info,
  ]);

  useEffect(() => {
    if (isShareLink) {
      setInputAmount("10000");
    }
  }, [isShareLink]);
  /**
   * show
   */
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
  const showOpenPrice = useMemo(() => {
    if (openPriceBase) {
      return openPriceBase.bigNumberToShowPrice(
        18,
        tokenPair.getTokenPriceDecimals()
      );
    } else {
      return String().placeHolder;
    }
  }, [openPriceBase, tokenPair]);
  const showFee = useMemo(() => {
    return fee.bigNumberToShowString(18, 2);
  }, [fee]);
  const showLiqPrice = useCallback(
    (isLong: boolean) => {
      if (!openPriceBase || arithFiAmount === "" || arithFiAmount === "0") {
        return String().placeHolder;
      }
      const nowPrice = openPriceBase;
      const result = lipPrice(
        tokenPair,
        arithFiAmount.stringToBigNumber(4) ?? BigNumber.from("0"),
        BigNumber.from("0"),
        BigNumber.from(lever.toString()),
        nowPrice,
        nowPrice,
        isLong
      );
      return (
        result.bigNumberToShowPrice(18, tokenPair.getTokenPriceDecimals()) ??
        String().placeHolder
      );
    },
    [openPriceBase, arithFiAmount, lever, tokenPair]
  );
  const showFeeHoverText = useMemo(() => {
    if (isForex(lever)) {
      return [
        t`Position fee = Position * 0.02%; After the ArithFi App launches this February, you will enjoy 0 fee trading.`,
      ];
    } else {
      return [
        t`Position fee = Position * 0.05%; After the ArithFi App launches this February, you will enjoy 0 fee trading.`,
      ];
    }
  }, [lever]);

  const showAmountError = useMemo(() => {
    if (inputAmount === "") {
      return undefined;
    } else if (checkMinATF) {
      return t`Minimum 50 ATF`;
    } else if (!checkBalance) {
      return t`Insufficient ATF balance`;
    }
  }, [checkBalance, checkMinATF, inputAmount]);

  const showDepositError = useMemo(() => {
    if (signature && (!tokenBalance || tokenBalance?.eq(BigNumber.from("0")))) {
      return true;
    }
    return false;
  }, [signature, tokenBalance]);

  const maxCallBack = useCallback(() => {
    if (tokenBalance) {
      setInputAmount(
        allValue(tokenBalance).bigNumberToShowString(18, 2).formatInputNum4()
      );
    }
  }, [tokenBalance, allValue]);

  const stopErrorText = useMemo(() => {
    if (tabsValue === 0) {
      return t`TP and SL price you set will trigger immediately.`;
    } else {
      return t`After the limit order is executed, TP and SL price you set will trigger immediately.`;
    }
  }, [tabsValue]);

  const showConnectButton = useMemo(() => {
    return account.address === undefined;
  }, [account.address]);

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

  const [hadSetLimit, setHadSetLimit] = useState(false);
  useEffect(() => {
    if (limitAmount === "" && !hadSetLimit && openPriceBase) {
      setLimitAmount(
        openPriceBase.bigNumberToShowString(
          18,
          tokenPair.getTokenPriceDecimals()
        )
      );
      setHadSetLimit(true);
    } else if (limitAmount !== "" && !hadSetLimit) {
      setHadSetLimit(true);
    }
  }, [hadSetLimit, limitAmount, openPriceBase, tokenPair]);
  const closeShareLink = useCallback(() => {
    if (isShareLink) {
      setIsShareLink(false);
    }
  }, [isShareLink]);
  useEffect(() => {
    if (tokenName_info !== tokenPair) {
      setLimitAmount("");
      setTp("");
      setSl("");
      closeShareLink();
      setHadSetLimit(false);
    }
  }, [closeShareLink, tokenName_info, tokenPair]);

  const changeTabs = useCallback((value: number) => {
    setTabsValue(value);
  }, []);
  const amountPercentCallBack = useCallback(
    (value: number) => {
      setAmountPercent(value);
      if (tokenBalance) {
        setInputAmount(
          (
            (Number(tokenBalance.bigNumberToShowString(18, 4)) * value) /
            100
          ).floor(2)
        );
      }
    },
    [tokenBalance]
  );

  return {
    tabsValue,
    changeTabs,
    lever,
    setLever,
    limitAmount,
    setLimitAmount,
    isStop,
    setIsStop,
    tp,
    setTp,
    sl,
    setSl,
    showBalance,
    maxCallBack,
    showFeeHoverText,
    showOpenPrice,
    showFee,
    showTotalPay,
    showLiqPrice,
    showTriggerNotice,
    setShowTriggerNotice,
    triggerNoticeCallback,
    inputAmount,
    setInputAmount,
    showAmountError,
    stopErrorText,
    closeShareLink,
    showDeposit,
    setShowDeposit,
    showSignModal,
    setShowSignModal,
    isTPError,
    isSLError,
    openCallBack,
    clearTPSLError,
    showDepositError,
    showConnectModal,
    showConnectButton,
    amountPercent,
    amountPercentCallBack,
    loading,
  };
}

export default useFuturesNewOrder;
