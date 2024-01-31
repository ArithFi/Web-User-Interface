import { useCallback, useEffect, useMemo, useState } from "react";
import useArithFi from "../../../hooks/useArithFi";
import { copyAsset, copyFollow } from "../../../lib/ArithFiRequest";
import { t } from "@lingui/macro";
import useService from "../../../contracts/useService";

function useCopySettingModal(
  address: string | undefined,
  onClose: (res?: boolean) => void
) {
  const { chainsData, signature, account } = useArithFi();
  const { service_balance } = useService();
  const [tokenBalance, setTokenBalance] = useState<number>();
  const [copyAccountBalance, setCopyAccountBalance] = useState<string>("");
  const [followingValue, setFollowingValue] = useState<string>("");
  const [oldFollowingValue, setOldFollowingValue] = useState<string>("");
  const [selectButton, setSelectButton] = useState<number>();
  const [agree, setAgree] = useState<boolean>(true);
  const [current, setCurrent] = useState<number>();
  const [isFollow, setIsFollow] = useState(false)

  const [isLoading, setIsLoading] = useState(false);
  const follow = useCallback(async () => {
    if (account.address && signature && address && followingValue !== "") {
      const copyAccountBalanceNumber =
        copyAccountBalance === "" ? 0 : parseFloat(copyAccountBalance);
      const req = await copyFollow(
        {
          Authorization: signature.signature,
        },
        {
          walletAddress: account.address,
          copyAccountBalance: copyAccountBalanceNumber.floor(2),
          copyKolAddress: address,
          follow: "true",
          followingMethod: "FIXED",
          followingValue: followingValue,
          copyAccountBalanceTotal:"0"
        }
      );
      if (Number(req["err"]) === 0) {
      }
      setIsLoading(false);
      onClose(Number(req["err"]) === 0);
    }
  }, [
    account.address,
    address,
    copyAccountBalance,
    followingValue,
    onClose,
    signature,
  ]);
  /**
   * balance
   */
  const getBalance = useCallback(async () => {
    service_balance((result: number) => {
      setTokenBalance(result);
    });
  }, [service_balance]);

  const getCurrent = useCallback(async () => {
    if (chainsData.chainId && signature && address && account.address) {
      const req = await copyAsset(account.address, address, {
        Authorization: signature.signature,
      });
      if (Number(req["err"]) === 0) {
        const value = req["data"];
        const currentValue = value["copyAccountBalance"];
        setIsFollow(value["follow"])
        if (currentValue) {
          setCurrent(currentValue);
        }
        const follow: number = value["followingValue"];
        if (oldFollowingValue === "" && follow > 0) {
          setOldFollowingValue(follow.floor(2));
        }
      }
    }
  }, [
    account.address,
    address,
    chainsData.chainId,
    oldFollowingValue,
    signature,
  ]);

  const checkBalance = useMemo(() => {
    if (tokenBalance) {
      const copyAccountBalanceNumber =
        copyAccountBalance === "" ? 0 : parseFloat(copyAccountBalance);
      return copyAccountBalanceNumber <= tokenBalance;
    }
    return false;
  }, [copyAccountBalance, tokenBalance]);

  const checkLimit = useMemo(() => {
    const copyAccountBalanceNumber =
      copyAccountBalance === "" ? 0 : parseFloat(copyAccountBalance);
    if (copyAccountBalanceNumber >= 200 || isFollow) {
      return true;
    }
    return false;
  }, [copyAccountBalance, isFollow]);

  const checkLimit2 = useMemo(() => {
    const followingValueNumber =
      followingValue === "" ? 0 : parseFloat(followingValue);
    if (followingValueNumber >= 60) {
      return true;
    }
    return false;
  }, [followingValue]);

  const mainButtonTitle = useMemo(() => {
    return t`Save`;
  }, []);

  const mainButtonLoading = useMemo(() => {
    return isLoading;
  }, [isLoading]);

  const mainButtonDis = useMemo(() => {
    return !checkBalance || !checkLimit || !agree || !checkLimit2;
  }, [agree, checkBalance, checkLimit, checkLimit2]);

  const mainButtonAction = useCallback(() => {
    if (!mainButtonDis && !mainButtonLoading) {
      setIsLoading(true);
      follow();
    }
  }, [follow, mainButtonDis, mainButtonLoading]);

  const maxCallBack = useCallback(() => {
    if (tokenBalance) {
      setCopyAccountBalance(tokenBalance.floor(2));
    }
  }, [tokenBalance]);
  const selectButtonCallBack = useCallback(
    (num: number) => {
      setSelectButton(num);
      if (num !== 0) {
        if (tokenBalance) {
          const oneBalance = tokenBalance / 4;
          const nowAmount = oneBalance * num;
          setCopyAccountBalance(nowAmount.floor(2));
        }
      }
    },
    [tokenBalance]
  );

  const errorLabel1 = useMemo(() => {
    if (!checkBalance && copyAccountBalance !== "") {
      return t`Insufficient ATF balance`;
    } else if (!checkLimit && copyAccountBalance !== "") {
      return t`Minimum 200 ATF`;
    }
  }, [checkBalance, checkLimit, copyAccountBalance]);

  const errorLabel2 = useMemo(() => {
    if (!checkLimit2 && followingValue !== "") {
      return t`Minimum 60 ATF`;
    }
  }, [checkLimit2, followingValue]);

  /**
   * update
   */
  useEffect(() => {
    getBalance();
    getCurrent();
    const time = setInterval(() => {
      getBalance();
      getCurrent();
    }, 10 * 1000);
    return () => {
      clearInterval(time);
    };
  }, [getBalance, getCurrent]);

  useEffect(() => {
    if (oldFollowingValue !== "") {
      setFollowingValue(oldFollowingValue);
    }
  }, [oldFollowingValue]);

  return {
    copyAccountBalance,
    setCopyAccountBalance,
    followingValue,
    setFollowingValue,
    mainButtonTitle,
    mainButtonLoading,
    mainButtonDis,
    mainButtonAction,
    maxCallBack,
    tokenBalance,
    selectButton,
    setSelectButton,
    selectButtonCallBack,
    agree,
    setAgree,
    current,
    errorLabel1,
    errorLabel2,
  };
}

export default useCopySettingModal;
