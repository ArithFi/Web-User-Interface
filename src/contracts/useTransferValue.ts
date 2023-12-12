import {useNetwork, usePrepareSendTransaction, useSendTransaction} from "wagmi";
import {
  TransactionType,
  usePendingTransactions,
} from "../hooks/useTransactionReceipt";
import { ATFServiceOther } from "./contractAddress";
import { BigNumber } from "ethers/lib/ethers";
import { useEffect, useMemo } from "react";

export function useTransferValue(amount: BigNumber) {
  const { chain } = useNetwork();
  const value = useMemo(() => {
    return chain?.id ? amount : BigNumber.from("0");
  }, [amount, chain?.id]);
  const { addPendingList } = usePendingTransactions();
  const { config } = usePrepareSendTransaction({
    to: ATFServiceOther[chain?.id ?? 97],
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
