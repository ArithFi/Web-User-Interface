import { useEffect, useMemo } from "react";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import useArithFi from "../hooks/useArithFi";
import ScrollNESTABI from "./ABI/ScrollNEST.json";
import { ATFToken } from "./contractAddress";
import useAddGasLimit from "./useAddGasLimit";
import {
  TransactionType,
  usePendingTransactions,
} from "../hooks/useTransactionReceipt";

export function useScrollNESTfaucet() {
  const { chainsData } = useArithFi();
  const { addPendingList } = usePendingTransactions();
  const address = useMemo(() => {
    if (chainsData.chainId) {
      return ATFToken[chainsData.chainId] as `0x${string}`;
    }
  }, [chainsData.chainId]);
  const { config } = usePrepareContractWrite({
    address: address,
    abi: ScrollNESTABI,
    functionName: "faucet",
    args: [],
    enabled: true,
  });
  // const gasLimit = useAddGasLimit(config, 30);
  const transaction = useContractWrite({
    ...config
  });
  useEffect(() => {
    if (transaction.data) {
      addPendingList({
        hash: transaction.data.hash,
        type: TransactionType.faucet_scroll,
      });
      transaction.reset();
    }
  }, [addPendingList, transaction, transaction.data]);

  return {
    transaction,
  };
}
