import { useCallback, useEffect, useMemo, useState } from "react";
import useService from "../contracts/useService";
import useArithFi from "./useArithFi";

export interface AccountListData {
  text: string;
  time: number;
  status: number;
  applyTime?: number;
  chainId?: number;
  hash?: string;
  ordertype?: string;
  info?: string | undefined;
}

function useAccount() {
  const { service_balance, block_balance } = useService();
  const { account, chainsData, signature } = useArithFi();
  const [showDeposit, setShowDeposit] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [tokenBalance, setTokenBalance] = useState<number>();
  const [tokenBlockBalance, setTokenBlockBalance] = useState<number>();
  const [moneyList, setMoneyList] = useState<Array<AccountListData>>([]);
  /**
   * balance
   */
  const getBalance = useCallback(async () => {
    service_balance((result: number) => {
      setTokenBalance(result);
    });
  }, [service_balance]);

  const getBlockBalance = useCallback(async () => {
    block_balance((result: number) => {
      setTokenBlockBalance(result);
    });
  }, [block_balance]);

  const showBalance = useMemo(() => {
    if (account.address) {
      if (tokenBalance) {
        return tokenBalance.floor(2);
      } else {
        return "0";
      }
    } else {
      return String().placeHolder;
    }
  }, [account.address, tokenBalance]);

  const showBlockBalance = useMemo(() => {
    if (account.address) {
      if (tokenBlockBalance) {
        return tokenBlockBalance.floor(2);
      } else {
        return "0";
      }
    } else {
      return String().placeHolder;
    }
  }, [account.address, tokenBlockBalance]);

  /**
   * update
   */
  useEffect(() => {
    getBalance();
    const time = setInterval(() => {
      getBalance();
    }, 10 * 1000);
    return () => {
      clearInterval(time);
    };
  }, [getBalance]);

  useEffect(() => {
    getBlockBalance();
    const time = setInterval(() => {
      getBlockBalance();
    }, 10 * 1000);
    return () => {
      clearInterval(time);
    };
  }, [getBlockBalance]);

  return {
    showDeposit,
    setShowDeposit,
    showWithdraw,
    setShowWithdraw,
    showBalance,
    showBlockBalance,
    moneyList,
  };
}

export default useAccount;
