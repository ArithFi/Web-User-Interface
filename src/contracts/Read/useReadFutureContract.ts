import { BigNumber } from "ethers";
import { useMemo } from "react";
import {useContractRead, useNetwork} from "wagmi";
import FuturesV2ABI from "../ABI/FuturesV2.json";
import { FuturesV2Contract } from "../contractAddress";

function useReadFuturesPrice(channelIndex: number) {
  const { chain } = useNetwork();
  const {
    data: futuresPriceData,
    isRefetching: futuresPriceIsRefetching,
    isSuccess: futuresPriceIsSuccess,
    refetch: futuresPriceRefetch,
  } = useContractRead({
    address: chain?.id
      ? (FuturesV2Contract[chain?.id] as `0x${string}`)
      : FuturesV2Contract[56] as `0x${string}`,
    abi: FuturesV2ABI,
    functionName: "lastPrice",
    args: [channelIndex],
  });

  const futuresPrice: BigNumber | undefined = useMemo(() => {
    if (futuresPriceIsSuccess) {
      if (futuresPriceData === undefined) {
        return undefined;
      }
      return (futuresPriceData as BigInt[])[2].toBigNumber();
    } else {
      return undefined;
    }
  }, [futuresPriceData, futuresPriceIsSuccess]);

  return {
    futuresPrice,
    futuresPriceIsRefetching,
    futuresPriceIsSuccess,
    futuresPriceRefetch,
  };
}

export default useReadFuturesPrice;
