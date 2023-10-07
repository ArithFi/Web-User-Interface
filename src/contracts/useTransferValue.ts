import { usePrepareSendTransaction, useSendTransaction } from "wagmi";
import useArithFi from "../hooks/useArithFi";
import {
  TransactionType,
  usePendingTransactions,
} from "../hooks/useTransactionReceipt";
import { ATFServiceOther } from "./contractAddress";
import { BigNumber } from "ethers/lib/ethers";
import { useEffect, useMemo } from "react";

export function useTransferValue(amount: BigNumber) {
  const { chainsData } = useArithFi();
  const value = useMemo(() => {
    return chainsData.chainId ? amount : BigNumber.from("0");
  }, [amount, chainsData.chainId]);
  const { addPendingList } = usePendingTransactions();
  const { config } = usePrepareSendTransaction({
    to: ATFServiceOther[chainsData.chainId ?? 97],
    value: value.toBigInt(),
  });
  const { data, isLoading, isSuccess, sendTransaction, reset } =
    useSendTransaction(config);
  useEffect(() => {
    if (data) {
      addPendingList({
        hash: data.hash,
        type: TransactionType.deposit,
      });
      reset();
    }
  }, [addPendingList, data, reset]);

  return {
    sendTransaction,
    isLoading,
    isSuccess,
  };
}
