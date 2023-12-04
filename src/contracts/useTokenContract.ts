import { useEffect, useMemo } from "react";
import { BigNumber } from "ethers";
import {useContractWrite, useNetwork, usePrepareContractWrite} from "wagmi";
import ERC20ABI from "./ABI/ERC20.json";
import {
  TransactionType,
  usePendingTransactions,
} from "../hooks/useTransactionReceipt";
import { ATFService, ATFServiceOther, USDTToken } from "./contractAddress";

function useTokenApprove(
  tokenAddress: `0x${string}`,
  to: `0x${string}` | string | undefined,
  amount: BigNumber
) {
  const { addPendingList } = usePendingTransactions();
  const { config } = usePrepareContractWrite({
    address: tokenAddress,
    abi: ERC20ABI,
    functionName: "approve",
    args: [to, BigInt(amount.toString())],
    enabled: true,
  });
  const transaction = useContractWrite(config);
  useEffect(() => {
    if (transaction.data) {
      addPendingList({
        hash: transaction.data.hash,
        type: TransactionType.approve,
      });
      transaction.reset();
    }
  }, [addPendingList, transaction, transaction.data]);

  return {
    transaction,
  };
}

export function useTokenTransfer(
  tokenAddress: `0x${string}`,
  amount: BigNumber
) {
  const { chain } = useNetwork();
  const { addPendingList } = usePendingTransactions();
  const toAddress = useMemo(() => {
    if (chain?.id) {
      if (
        tokenAddress.toLocaleLowerCase() ===
        USDTToken[chain?.id].toLocaleLowerCase()
      ) {
        return ATFServiceOther[chain?.id] as `0x${string}`;
      }
      return ATFService[chain?.id] as `0x${string}`;
    }
  }, [chain?.id, tokenAddress]);
  const token = useMemo(() => {
    if (toAddress) {
      return tokenAddress;
    }
  }, [toAddress, tokenAddress]);

  const { config } = usePrepareContractWrite({
    address: token,
    abi: ERC20ABI,
    functionName: "transfer",
    args: [toAddress, BigInt(amount.toString())],
    enabled: true,
  });

  // const gasLimit = useAddGasLimit(config, 10)

  const transaction = useContractWrite({
    ...config,
    request: { ...config.request, value: BigInt(0)},
  });
  useEffect(() => {
    if (transaction.data) {
      addPendingList({
        hash: transaction.data.hash,
        type: TransactionType.deposit,
      });
      transaction.reset();
    }
  }, [addPendingList, transaction, transaction.data]);

  return {
    transaction,
  };
}

export default useTokenApprove;
