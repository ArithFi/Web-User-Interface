import { useCallback } from "react";
import useArithFi from "../hooks/useArithFi";
import { serviceAsset } from "../lib/ArithFiRequest";

function useService() {
  const { account, chainsData, signature } = useArithFi();
  const service_balance = useCallback(
    async (back: (result: number) => void) => {
      if (chainsData.chainId && account.address && signature) {
        const balanceBase: { [key: string]: any } = await serviceAsset(
          account.address,
          { Authorization: signature.signature }
        );
        if (Number(balanceBase["err"]) === 0) {
          const value: { [key: string]: number } = balanceBase["data"] ?? 0;
          const balance = value["availableBalance"];
          back(balance);
        }
      }
    },
    [account.address, chainsData.chainId, signature]
  );

  const block_balance = useCallback(
    async (back: (result: number) => void) => {
      if (chainsData.chainId && account.address && signature) {
        const balanceBase: { [key: string]: any } = await serviceAsset(
          account.address,
          { Authorization: signature.signature }
        );
        if (Number(balanceBase["err"]) === 0) {
          const value: { [key: string]: number } = balanceBase["data"] ?? 0;
          const balance = value["freezeBalance"];
          back(balance);
        }
      }
    },
    [account.address, chainsData.chainId, signature]
  );

  const favorites = useCallback(
    async (back: (result: Array<string>) => void) => {
      if (chainsData.chainId && account.address && signature) {
        const baseData: { [key: string]: any } = await serviceAsset(
          account.address,
          { Authorization: signature.signature }
        );
        if (Number(baseData["err"]) === 0) {
          const value: { [key: string]: string } = baseData["data"] ?? "";
          const data = value["favorites"];
          const pairs = data.split(";");
          const tokenPairs = pairs.map((item) => {
            if (item.includes("USDT")) {
              return (
                item.substring(0, item.length - 4) +
                "/" +
                item.substring(item.length - 4)
              );
            } else if (item.includes("USD")) {
              return (
                item.substring(0, item.length - 3) +
                "/" +
                item.substring(item.length - 3)
              );
            } else {
              return "";
            }
          });

          back(tokenPairs.filter((item) => item !== ""));
        }
      }
    },
    [account.address, chainsData.chainId, signature]
  );

  return {
    service_balance,
    block_balance,
    favorites,
  };
}

export default useService;
