import { t } from "@lingui/macro";
import { useCallback, useMemo, useState } from "react";

function useSettingTPAndSL(
  isLong: boolean,
  limitPrice: number,
  isFirst?: boolean
) {
  const [showTP, setShowTP] = useState(true);
  const [showSL, setShowSL] = useState(true);
  const [tp, setTp] = useState<string>("");
  const [sl, setSl] = useState<string>("");
  const [tpPercent, setTpPercent] = useState<string>("");
  const [slPercent, setSlPercent] = useState<string>("");

  const tpError = useMemo(() => {
    if (tp === "" || Number(tp) === 0) {
      return false;
    }
    if (isLong) {
      return Number(tp) < limitPrice;
    } else {
      return Number(tp) > limitPrice;
    }
  }, [isLong, limitPrice, tp]);
  const slError = useMemo(() => {
    if (sl === "" || Number(sl) === 0) {
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
        return true
    } else {
        return false
    }
  },[slError, tpError])
  const buttonAction = useCallback(() => {
    if (buttonDis) {return}
  }, [buttonDis])
  const showTPError = useMemo(() => {
    if (isFirst) {
      if (isLong) {
        return t`Trigger price should be higher than entry price`;
      } else {
        return t`Trigger price should be lower than entry price`;
      }
    } else {
      if (isLong) {
        return t`Trigger price should be higher than open price`;
      } else {
        return t`Trigger price should be lower than open price`;
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
        return t`Trigger price should be lower than open price`;
      } else {
        return t`Trigger price should be higher than open price`;
      }
    }
  }, [isFirst, isLong]);
  const showTPInfoPrice = useMemo(() => {
    if (tp === "") {
      return undefined;
    } else {
      return Number(Number(tp).floor(2));
    }
  }, [tp]);
  const showSLInfoPrice = useMemo(() => {
    if (sl === "") {
      return undefined;
    } else {
      return Number(Number(sl).floor(2));
    }
  }, [sl]);
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
    buttonAction
  };
}

export default useSettingTPAndSL;
