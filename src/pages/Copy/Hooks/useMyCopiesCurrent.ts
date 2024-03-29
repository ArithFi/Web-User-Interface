import { useCallback, useState } from "react";
import useArithFi from "../../../hooks/useArithFi";
import { serviceClose } from "../../../lib/ArithFiRequest";
import {
  TransactionType,
  usePendingTransactionsBase,
} from "../../../hooks/useTransactionReceipt";
import { SnackBarType } from "../../../components/SnackBar/NormalSnackBar";

function useMyCopiesCurrent(updateList: () => void) {
  const { account, signature } = useArithFi();
  const [isLoading, setIsLoading] = useState<number>(-1);
  const { addTransactionNotice } = usePendingTransactionsBase();
  const close = useCallback(
    async (id: number) => {
      if (account.address && signature) {
        const closeBase: { [key: string]: any } = await serviceClose(
          account.address,
          id.toString(),
          { Authorization: signature.signature }
        );
        if (Number(closeBase["err"]) === 0) {
        }

        addTransactionNotice({
          type: TransactionType.futures_sell,
          info: "",
          result:
            Number(closeBase["err"]) === 0
              ? SnackBarType.success
              : SnackBarType.fail,
        });
        setIsLoading(-1);
        updateList();
      }
    },
    [account.address, addTransactionNotice, signature, updateList]
  );

  const action = useCallback(
    (id: number) => {
      if (isLoading === -1) {
        close(id);
        setIsLoading(id);
      }
    },
    [close, isLoading]
  );
  return { action, isLoading };
}

export default useMyCopiesCurrent;
