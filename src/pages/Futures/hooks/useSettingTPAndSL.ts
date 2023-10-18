import { t } from "@lingui/macro";
import { BigNumber } from "ethers/lib/ethers";
import { useCallback, useEffect, useMemo, useState } from "react";
import { lipPrice } from "../../../hooks/useFuturesNewOrder";

function useSettingTPAndSL(
  token: string,
  baseAmount: number,
  isLong: boolean,
  lever: number,
  limitPrice: number,
  callBack: (tp: number, sl: number) => void,
  isFirst?: boolean,
  openPrice?: number,
  append?: number,
  tpNow?: number,
  slNow?: number
) {
  const [tpPercent, setTpPercent] = useState<string>("");
  const [slPercent, setSlPercent] = useState<string>("");
  const setTPPercent = useCallback(
    (data: string) => {
      if (data === "" || Number(data) === 0) {
        setTpPercent("");
        return;
      }
      const tpNum = Number(data);
      if (isLong) {
        const percent = (((tpNum - limitPrice) / limitPrice) * 100).floor(4);
        setTpPercent(percent);
      } else {
        const percent = (((limitPrice - tpNum) / limitPrice) * 100).floor(4);
        setTpPercent(percent);
      }
    },
    [isLong, limitPrice]
  );
  const setSLPercent = useCallback(
    (data: string) => {
      if (data === "" || Number(data) === 0) {
        setSlPercent("");
        return;
      }
      const slNum = Number(data);
      if (isLong) {
        const percent = ((-(slNum - limitPrice) / limitPrice) * 100).floor(4);
        setSlPercent(percent);
      } else {
        const percent = ((-(limitPrice - slNum) / limitPrice) * 100).floor(4);
        setSlPercent(percent);
      }
    },
    [isLong, limitPrice]
  );
  const [showTP, setShowTP] = useState(true);
  const [showSL, setShowSL] = useState(true);
  const [tp, setTp] = useState<string>("");
  const [sl, setSl] = useState<string>("");
  const [firstShow, setFirstShow] = useState<boolean>(false);

  useEffect(() => {
    if (!firstShow) {
      setFirstShow(true);
      if (tpNow !== undefined && Number(tpNow) !== 0) {
        setTp(tpNow.floor(token.getTokenPriceDecimals()));
        setTPPercent(tpNow ? tpNow.toString() : "");
      }
      if (slNow !== undefined && Number(slNow) !== 0) {
        setSl(slNow.floor(token.getTokenPriceDecimals()));
        setSLPercent(slNow ? slNow.toString() : "");
      }
    }
  }, [firstShow, setSLPercent, setTPPercent, slNow, token, tpNow]);

  const setTPNum = useCallback(
    (data: string) => {
      if (data === "") {
        setTp("");
        return;
      }
      const tpPercentNum = Number(data);
      if (isLong) {
        const newTP = (limitPrice + (limitPrice * tpPercentNum) / 100).floor(6);
        setTp(newTP);
      } else {
        const newTP = (limitPrice - (limitPrice * tpPercentNum) / 100).floor(6);
        setTp(newTP);
      }
    },
    [isLong, limitPrice]
  );
  const setSLNum = useCallback(
    (data: string) => {
      if (data === "") {
        setSl("");
        return;
      }
      const slPercentNum = Number(data);
      if (isLong) {
        const newSL = (limitPrice - (limitPrice * slPercentNum) / 100).floor(6);
        setSl(newSL);
      } else {
        const newSL = (limitPrice + (limitPrice * slPercentNum) / 100).floor(6);
        setSl(newSL);
      }
    },
    [isLong, limitPrice]
  );
  const tpError = useMemo(() => {
    if (tp === "") {
      return false;
    }
    if (isLong) {
      return Number(tp) < limitPrice;
    } else {
      return Number(tp) > limitPrice;
    }
  }, [isLong, limitPrice, tp]);
  const slError = useMemo(() => {
    if (sl === "") {
      return false;
    }
    if (isLong) {
      return Number(sl) > limitPrice;
    } else {
      return Number(sl) < limitPrice;
    }
  }, [isLong, limitPrice, sl]);
  const buttonDis = useMemo(() => {
    if (tpError || slError) {
      return true;
    } else if (showTP && tp === "") {
      return true;
    } else if (showSL && sl === "") {
      return true;
    } else {
      return false;
    }
  }, [showSL, showTP, sl, slError, tp, tpError]);
  const buttonAction = useCallback(() => {
    if (buttonDis) {
      return;
    }
    var resultTP = 0;
    var resultSL = 0;
    if (tp !== "") {
      resultTP = Number(tp);
    }
    if (sl !== "") {
      resultSL = Number(sl);
    }
    if (!showTP) {
      resultTP = 0;
    }

    if (!showSL) {
      resultSL = 0;
    }

    callBack(resultTP, resultSL);
  }, [buttonDis, callBack, showSL, showTP, sl, tp]);
  const showTPError = useMemo(() => {
    if (isFirst) {
      if (isLong) {
        return t`Trigger price should be higher than entry price`;
      } else {
        return t`Trigger price should be lower than entry price`;
      }
    } else {
      if (isLong) {
        return t`Trigger price should be higher than market price`;
      } else {
        return t`Trigger price should be lower than market price`;
      }
    }
  }, [isFirst, isLong]);
  const showSLError = useMemo(() => {
    if (isFirst) {
      if (isLong) {
        return t`Trigger price should be lower than entry price`;
      } else {
        return t`Trigger price should be higher than entry price`;
      }
    } else {
      if (isLong) {
        return t`Trigger price should be lower than market price`;
      } else {
        return t`Trigger price should be higher than market price`;
      }
    }
  }, [isFirst, isLong]);
  const showTPInfoPrice = useMemo(() => {
    if (tp === "") {
      return undefined;
    } else {
      return tp;
    }
  }, [tp]);
  const showSLInfoPrice = useMemo(() => {
    if (sl === "") {
      return undefined;
    } else {
      return sl;
    }
  }, [sl]);
  const showTPInfoATF = useMemo(() => {
    if (tpPercent === "") {
      return undefined;
    } else {
      const result = Number(
        (baseAmount * ((lever * Number(tpPercent)) / 100)).floor(2)
      );
      return isLong ? result : -result;
    }
  }, [baseAmount, isLong, lever, tpPercent]);
  const showSLInfoATF = useMemo(() => {
    if (slPercent === "") {
      return undefined;
    } else {
      const result = Number(
        (baseAmount * ((lever * Number(slPercent)) / 100)).floor(2)
      );
      return isLong ? -result : result;
    }
  }, [baseAmount, isLong, lever, slPercent]);
  const showPosition = useMemo(() => {
    const longOrShort = isLong ? t`Long` : t`Short`;
    const balance = baseAmount.floor(2);
    return `${lever}X ${longOrShort} ${balance} ATF`;
  }, [baseAmount, isLong, lever]);
  const baseOpenPrice = useMemo(() => {
    if (openPrice) {
      return openPrice.floor(token.getTokenPriceDecimals());
    }
  }, [openPrice, token]);
  const showOpenPrice = useMemo(() => {
    return `${baseOpenPrice}`;
  }, [baseOpenPrice]);
  const showLiqPrice = useMemo(() => {
    if (openPrice) {
      const balance =
        baseAmount.toString().stringToBigNumber(18) ?? BigNumber.from("0");
      const orderPrice =
        openPrice.toString().stringToBigNumber(18) ?? BigNumber.from("0");
      const appendBNum =
        (append ?? 0).toString().stringToBigNumber(18) ?? BigNumber.from("0");
      const result = lipPrice(
        balance,
        appendBNum,
        BigNumber.from(lever.toString()),
        orderPrice,
        orderPrice,
        isLong
      );
      return result.bigNumberToShowPrice(18, token.getTokenPriceDecimals());
    } else {
      return String().placeHolder;
    }
  }, [append, baseAmount, isLong, lever, openPrice, token]);

  const tlPlaceHolder = useMemo(() => {
    return `${isLong ? ">" : "<"} ${limitPrice.floor(2)}`;
  }, [isLong, limitPrice]);

  const slPlaceHolder = useMemo(() => {
    return `${isLong ? "<" : ">"} ${limitPrice.floor(2)}`;
  }, [isLong, limitPrice]);

  return {
    showTP,
    setShowTP,
    showSL,
    setShowSL,
    tp,
    setTp,
    sl,
    setSl,
    tpPercent,
    setTpPercent,
    slPercent,
    setSlPercent,
    showTPError,
    showSLError,
    showTPInfoPrice,
    showSLInfoPrice,
    tpError,
    slError,
    buttonDis,
    buttonAction,
    setTPPercent,
    setSLPercent,
    showTPInfoATF,
    showSLInfoATF,
    setTPNum,
    setSLNum,
    showPosition,
    showOpenPrice,
    showLiqPrice,
    tlPlaceHolder,
    slPlaceHolder,
  };
}

export default useSettingTPAndSL;
