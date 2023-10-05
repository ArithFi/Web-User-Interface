import { BigNumber } from "ethers";
import { useMemo } from "react";
import { useContractRead } from "wagmi";
import UNISwapABI from "../ABI/UNISwapV2.json";
import { SwapContract } from "../contractAddress";

function useReadSwapAmountOut(
  amountIn: BigNumber | undefined,
  path?: Array<string>
) {
  const address = useMemo(() => {
    if (
      path &&
      amountIn &&
      !BigNumber.from("0").eq(amountIn)
    ) {
      return SwapContract[56] as `0x${string}`;
    }
  }, [amountIn, path]);
  const {
    data: uniSwapAmountOutData,
    isRefetching: uniSwapAmountOutIsRefetching,
    isLoading: uniSwapAmountOutIsLoading,
    isSuccess: uniSwapAmountOutIsSuccess,
    refetch: uniSwapAmountOutRefetch,
  } = useContractRead({
    address: address,
    abi: UNISwapABI,
    functionName: "getAmountsOut",
    args: [amountIn ? BigInt(amountIn.toString()) : BigInt(0), path],
  });

  const uniSwapAmountOut: BigNumber[] | undefined = useMemo(() => {
    if (uniSwapAmountOutIsSuccess) {
      if (uniSwapAmountOutData === undefined) {
        return undefined;
      }
      return (uniSwapAmountOutData as any[]).map((item) =>
        BigNumber.from(item.toString())
      );
    } else {
      return undefined;
    }
  }, [uniSwapAmountOutData, uniSwapAmountOutIsSuccess]);

  return {
    uniSwapAmountOut,
    uniSwapAmountOutIsRefetching,
    uniSwapAmountOutIsSuccess,
    uniSwapAmountOutRefetch,
    uniSwapAmountOutIsLoading,
  };
}

export default useReadSwapAmountOut;
