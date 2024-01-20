import { useCallback, useEffect, useMemo, useState } from "react";
import useArithFi from "../../../hooks/useArithFi";
import { copyClose, copyCloseInfo } from "../../../lib/ArithFiRequest";

export interface MyCopiesCloseModel {
  openInterest: number;
  totalProfit: number;
  totalCopyAmount: number;
  aum: number;
}

function useCloseCopyModal(
  address: string | undefined,
  onClose: (res?: boolean) => void
) {
  const { chainsData, signature, account } = useArithFi();
  const [closeInfo, setCloseInfo] = useState<MyCopiesCloseModel>();
  const [isLoading, setIsLoading] = useState(false);

  const getCloseInfo = useCallback(async () => {
    if (account.address && signature && address) {
      const req = await copyCloseInfo(account.address,address, {
        Authorization: signature.signature,
      });
      if (Number(req["err"]) === 0) {
        const value = req["data"];
        const info: MyCopiesCloseModel = {
          openInterest: value["openInterest"],
          totalProfit: value["totalProfit"],
          totalCopyAmount: value["totalCopyAmount"],
          aum: value["aum"],
        };
        setCloseInfo(info);
      }
    }
  }, [account.address, address, signature]);

  const closeFollow = useCallback(async () => {
    if (chainsData.chainId && signature && address && account.address) {
      const req = await copyClose(
        account.address,
        address,
        {
          Authorization: signature.signature,
        },
        chainsData.chainId
      );
      if (Number(req["err"]) === 0) {
      }
      setIsLoading(false);
      onClose(Number(req["err"]) === 0);
    }
  }, [account.address, address, chainsData.chainId, onClose, signature]);

  const mainButtonLoading = useMemo(() => {
    return isLoading;
  }, [isLoading]);
  const mainButtonDis = useMemo(() => {
    return false;
  }, []);

  const mainButtonAction = useCallback(() => {
    if (!mainButtonDis && !mainButtonLoading) {
      setIsLoading(true);
      closeFollow();
    }
  }, [closeFollow, mainButtonDis, mainButtonLoading]);

  useEffect(() => {
    getCloseInfo();
  }, [getCloseInfo]);

  return {
    closeInfo,
    closeFollow,
    mainButtonLoading,
    mainButtonDis,
    mainButtonAction,
  };
}

export default useCloseCopyModal;
