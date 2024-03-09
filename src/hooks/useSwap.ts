import { parseUnits } from "ethers/lib/utils.js";
import { MaxUint256 } from "@ethersproject/constants";
import { BigNumber } from "ethers";
import { useCallback, useEffect, useMemo, useState } from "react";
import useReadTokenBalance, {
  useReadTokenAllowance,
} from "../contracts/Read/useReadTokenContract";
import useArithFi from "./useArithFi";
import useReadSwapAmountOut from "../contracts/Read/useReadSwapContract";
import { SwapContract } from "../contracts/contractAddress";
import useTokenApprove from "../contracts/useTokenContract";
import useSwapExactTokensForTokens, {
  useSwapExactETHForTokens,
  useSwapExactTokensForETH,
} from "../contracts/useSwapContract";
import {
  TransactionType,
  usePendingTransactions,
} from "./useTransactionReceipt";
import { t } from "@lingui/macro";
import { useBalance } from "wagmi";

interface SwapToken {
  src: string;
  dest: string;
}

const SWAP_UPDATE = 10;

function useSwap() {
  const { chainsData, account, showConnectModal } = useArithFi();
  const swapTokenOfChain = useCallback(() => {
    return {
      src: "USDT",
      dest: "ATF",
    };
  }, []);
  const [swapToken, setSwapToken] = useState<SwapToken>(swapTokenOfChain());
  const [slippage, setSlippage] = useState<number>(0.5);
  const [inputAmount, setInputAmount] = useState<string>("");
  const [outAmount, setOutAmount] = useState<string>("");
  const [samePrice, setSamePrice] = useState<boolean>(true);
  const { isPendingType } = usePendingTransactions();
  const mainToken = ["BNB", "ETH"];
  const tokenArray = useMemo(() => {
    return ["USDT", "ATF", "BNB"];
  }, []);
  useEffect(() => {
    setSwapToken(swapTokenOfChain());
  }, [swapTokenOfChain]);
  /**
   * swap contract
   */
  const swapContract = useMemo(() => {
    if (chainsData.chainId) {
      return SwapContract[chainsData.chainId];
    } else {
      return undefined;
    }
  }, [chainsData.chainId]);
  const swapPath = useMemo(() => {
    if (
      (mainToken.includes(swapToken.src) && swapToken.dest === "ATF") ||
      (mainToken.includes(swapToken.dest) && swapToken.src === "ATF")
    ) {
      return [swapToken.src, "USDT", swapToken.dest];
    }
    return [swapToken.src, swapToken.dest];
  }, [mainToken, swapToken.dest, swapToken.src]);
  const swapPathAddress = useMemo(() => {
    if (swapPath && chainsData.chainId) {
      const pathAddress = swapPath.map((item) => {
        const tokenName = item === "BNB" ? "WBNB" : item;
        return tokenName.getToken()!.address[chainsData.chainId!];
      });
      return pathAddress;
    } else {
      return undefined;
    }
  }, [chainsData.chainId, swapPath]);

  /**
   * swap token address
   */
  const scrAddress = useMemo(() => {
    let token = swapToken.src.getToken();
    if (swapToken.src === "BNB") {
      token = "WBNB".getToken();
    }
    if (token && chainsData.chainId) {
      return token.address[chainsData.chainId];
    } else {
      return undefined;
    }
  }, [chainsData, swapToken.src]);
  const scrDecimals = useMemo(() => {
    const token = swapToken.src.getToken();
    if (token && chainsData.chainId) {
      return token.decimals[chainsData.chainId];
    } else {
      return undefined;
    }
  }, [chainsData, swapToken.src]);
  const destAddress = useMemo(() => {
    let token = swapToken.dest.getToken();
    if (swapToken.dest === "BNB") {
      token = "WBNB".getToken();
    }
    if (token && chainsData.chainId) {
      return token.address[chainsData.chainId];
    } else {
      return undefined;
    }
  }, [chainsData, swapToken.dest]);
  const destDecimals = useMemo(() => {
    const token = swapToken.dest.getToken();
    if (token && chainsData.chainId) {
      return token.decimals[chainsData.chainId];
    } else {
      return undefined;
    }
  }, [chainsData, swapToken.dest]);

  /**
   * uniswap out amount
   */
  const inputToBigNumber = useMemo(() => {
    if (inputAmount !== "" && scrDecimals) {
      return inputAmount.stringToBigNumber(scrDecimals);
    } else {
      return undefined;
    }
  }, [inputAmount, scrDecimals]);

  const { uniSwapAmountOut, uniSwapAmountOutRefetch } = useReadSwapAmountOut(
    inputToBigNumber && !inputToBigNumber.eq(BigNumber.from("0"))
      ? inputToBigNumber
      : "1".stringToBigNumber(18)!,
    swapPathAddress
  );

  const amountOutMin = useMemo(() => {
    if (uniSwapAmountOut) {
      return uniSwapAmountOut[uniSwapAmountOut.length - 1].sub(
        uniSwapAmountOut[uniSwapAmountOut.length - 1]
          .mul(BigNumber.from((slippage * 10).toString()))
          .div(BigNumber.from("1000"))
      );
    } else {
      return MaxUint256;
    }
  }, [slippage, uniSwapAmountOut]);

  const showPrice = useMemo(() => {
    if (inputAmount === "") {
      const destToken = swapToken.src.getToken();
      if (uniSwapAmountOut && destToken && destDecimals) {
        if (samePrice) {
          return `1 ${swapToken.src} = ${uniSwapAmountOut[
            uniSwapAmountOut.length - 1
          ].bigNumberToShowString(destDecimals, 6)} ${swapToken.dest}`;
        } else {
          const out = parseUnits("1", destDecimals)
            .mul(parseUnits("1", 18))
            .div(uniSwapAmountOut[uniSwapAmountOut.length - 1]);
          return `1 ${swapToken.dest} = ${out.bigNumberToShowString(18, 6)} ${
            swapToken.src
          }`;
        }
      } else {
        return String().placeHolder;
      }
    } else {
      if (outAmount) {
        const inputNum = parseFloat(inputAmount) === 0 ? "1" : inputAmount;
        if (samePrice) {
          const out = parseFloat(outAmount) / parseFloat(inputNum);
          return `1 ${swapToken.src} = ${parseFloat(out.toFixed(6))} ${
            swapToken.dest
          }`;
        } else {
          const out = parseFloat(inputNum) / parseFloat(outAmount);
          return `1 ${swapToken.dest} = ${parseFloat(out.toFixed(6))} ${
            swapToken.src
          }`;
        }
      }
    }
  }, [
    destDecimals,
    inputAmount,
    outAmount,
    samePrice,
    swapToken.dest,
    swapToken.src,
    uniSwapAmountOut,
  ]);

  /**
   * balance
   */
  const { balance: scrBalance, balanceOfRefetch: srcBalanceRefetch } =
    useReadTokenBalance(
      (scrAddress ?? String().zeroAddress) as `0x${string}`,
      account.address ?? ""
    );
  const { balance: destBalance, balanceOfRefetch: destBalanceRefetch } =
    useReadTokenBalance(
      (destAddress ?? String().zeroAddress) as `0x${string}`,
      account.address ?? ""
    );
  const { data: ETHBalance, refetch: ETHrefetch } = useBalance({
    address: account.address,
  });
  /**
   * allowance
   */
  const { allowance: srcAllowance, allowanceRefetch: srcRefetch } =
    useReadTokenAllowance(
      (scrAddress ?? String().zeroAddress) as `0x${string}`,
      account.address,
      swapContract
    );
  /**
   * max button
   */
  const maxCallBack = useCallback(() => {
    if (swapToken.src === "BNB") {
      const token = "BNB".getToken();
      if (token && ETHBalance && chainsData.chainId) {
        setInputAmount(ETHBalance.formatted.formatInputNum4());
      }
    } else {
      const token = swapToken.src.getToken();
      if (token && scrBalance && chainsData.chainId) {
        setInputAmount(
          scrBalance
            .bigNumberToShowString(token.decimals[chainsData.chainId], 18)
            .formatInputNum4()
        );
      }
    }
  }, [ETHBalance, chainsData.chainId, scrBalance, swapToken.src]);

  const exchangePrice = useCallback(() => {
    setSamePrice(!samePrice);
  }, [samePrice]);
  /**
   * show out amount
   */
  const showOutAmount = useMemo(() => {
    return outAmount !== "" &&
      inputAmount !== "" &&
      parseFloat(inputAmount) !== 0
      ? outAmount
      : "0.0";
  }, [outAmount, inputAmount]);
  /**
   * show balance
   */
  const showSrcBalance = useMemo(() => {
    if (swapToken.src === "BNB") {
      const token = "BNB".getToken();
      if (token && ETHBalance && chainsData.chainId) {
        return (
          ETHBalance.formatted.stringToBigNumber(18) ?? BigNumber.from("0")
        ).bigNumberToShowString(token.decimals[chainsData.chainId]);
      }
    } else {
      const token = swapToken.src.getToken();
      if (token && scrBalance && chainsData.chainId) {
        return scrBalance.bigNumberToShowString(
          token.decimals[chainsData.chainId]
        );
      }
    }
    return String().placeHolder;
  }, [ETHBalance, chainsData.chainId, scrBalance, swapToken.src]);
  const showDestBalance = useMemo(() => {
    if (swapToken.dest === "BNB") {
      const token = "BNB".getToken();
      if (token && ETHBalance && chainsData.chainId) {
        return (
          ETHBalance.formatted.stringToBigNumber(18) ?? BigNumber.from("0")
        ).bigNumberToShowString(token.decimals[chainsData.chainId]);
      }
    } else {
      const token = swapToken.dest.getToken();
      if (token && destBalance && chainsData.chainId) {
        return destBalance.bigNumberToShowString(
          token.decimals[chainsData.chainId]
        );
      }
    }
    return String().placeHolder;
  }, [swapToken.dest, ETHBalance, chainsData.chainId, destBalance]);
  /**
   * check
   */
  const checkAllowance = useMemo(() => {
    if (mainToken.includes(swapToken.src)) {
      return true;
    }
    if (scrDecimals && srcAllowance) {
      const inputBigNumber = inputToBigNumber ?? BigNumber.from("0");
      return inputBigNumber.lte(srcAllowance);
    } else {
      return true;
    }
  }, [inputToBigNumber, mainToken, scrDecimals, srcAllowance, swapToken.src]);
  const checkBalance = useMemo(() => {
    if (scrDecimals) {
      if (swapToken.src === "BNB") {
        if (ETHBalance) {
          const inputBigNumber = inputToBigNumber ?? BigNumber.from("0");
          return inputBigNumber.lte(
            ETHBalance.formatted.stringToBigNumber(18) ?? BigNumber.from("0")
          );
        }
      } else {
        if (scrBalance) {
          const inputBigNumber = inputToBigNumber ?? BigNumber.from("0");
          return inputBigNumber.lte(scrBalance);
        }
      }
    } else {
      return false;
    }
  }, [ETHBalance, inputToBigNumber, scrBalance, scrDecimals, swapToken.src]);
  /**
   * action
   */
  const inputAmountTransaction = useMemo(() => {
    if (inputToBigNumber && checkAllowance && checkBalance) {
      return inputToBigNumber;
    } else {
      return BigNumber.from("0");
    }
  }, [checkAllowance, checkBalance, inputToBigNumber]);
  const { transaction: tokenApprove } = useTokenApprove(
    (scrAddress ?? String().zeroAddress) as `0x${string}`,
    swapContract,
    MaxUint256
  );
  const { transaction: swapTTT } = useSwapExactTokensForTokens(
    inputAmountTransaction,
    amountOutMin,
    swapPathAddress,
    account.address
  );
  const { transaction: swapTTE } = useSwapExactTokensForETH(
    inputAmountTransaction,
    amountOutMin,
    swapPathAddress,
    account.address
  );
  const { transaction: swapETT } = useSwapExactETHForTokens(
    inputAmountTransaction,
    amountOutMin,
    swapPathAddress,
    account.address
  );
  /**
   * show button title
   */
  const mainButtonTitle = useMemo(() => {
    if (!account.address) {
      return t`Connect Wallet`;
    } else if (!checkBalance) {
      return `${t`Insufficient`} ${swapToken.src} ${t`balance`}`;
    } else if (checkAllowance) {
      return t`Swap`;
    } else {
      return t`Approve`;
    }
  }, [account.address, checkAllowance, checkBalance, swapToken.src]);
  const pending = useMemo(() => {
    return (
      isPendingType(TransactionType.swap_uni) ||
      isPendingType(TransactionType.approve)
    );
  }, [isPendingType]);
  const mainButtonLoading = useMemo(() => {
    if (
      tokenApprove.isLoading ||
      swapTTT.isLoading ||
      swapETT.isLoading ||
      swapTTE.isLoading ||
      pending
    ) {
      return true;
    } else {
      return false;
    }
  }, [
    tokenApprove.isLoading,
    swapTTT.isLoading,
    swapETT.isLoading,
    swapTTE.isLoading,
    pending,
  ]);
  const mainButtonDis = useMemo(() => {
    if (!account.address) {
      return false;
    }
    return !checkBalance;
  }, [account.address, checkBalance]);
  const mainButtonAction = useCallback(() => {
    if (!account.address) {
      showConnectModal();
    } else if (mainButtonLoading || !checkBalance) {
      return;
    } else if (!checkAllowance) {
      tokenApprove.write?.();
    } else {
      if (mainToken.includes(swapToken.src)) {
        swapETT.reset();
        swapETT.write?.();
      } else if (mainToken.includes(swapToken.dest)) {
        swapTTE.reset();
        swapTTE.write?.();
      } else {
        swapTTT.reset();
        swapTTT.write?.();
      }
    }
  }, [
    account.address,
    checkAllowance,
    checkBalance,
    mainButtonLoading,
    mainToken,
    showConnectModal,
    swapETT,
    swapTTE,
    swapTTT,
    swapToken.dest,
    swapToken.src,
    tokenApprove,
  ]);
  /**
   * exchange button
   */
  const exchangeButton = useCallback(() => {
    const newSwapToken = { ...swapToken };
    newSwapToken.src = swapToken.dest;
    newSwapToken.dest = swapToken.src;
    setSwapToken(newSwapToken);
    setInputAmount("");
    setSamePrice(true);
  }, [swapToken]);
  /**
   * select token
   */
  const selectSrcToken = useCallback(
    (tokenName: string) => {
      if (tokenName === swapToken.dest) {
        setSwapToken({ src: swapToken.dest, dest: swapToken.src });
      } else {
        setSwapToken({ src: tokenName, dest: swapToken.dest });
      }
      setInputAmount("");
      setSamePrice(true);
      srcRefetch();
    },
    [srcRefetch, swapToken.dest, swapToken.src]
  );
  const selectDestToken = useCallback(
    (tokenName: string) => {
      if (tokenName === swapToken.src) {
        setSwapToken({ src: swapToken.dest, dest: swapToken.src });
      } else {
        setSwapToken({ src: swapToken.src, dest: tokenName });
      }
      setInputAmount("");
      setSamePrice(true);
      srcRefetch();
    },
    [srcRefetch, swapToken.dest, swapToken.src]
  );
  useEffect(() => {
    //  use swap amount
    if (uniSwapAmountOut && destDecimals) {
      setOutAmount(
        uniSwapAmountOut[uniSwapAmountOut.length - 1].bigNumberToShowString(
          destDecimals,
          6
        )
      );
    }
  }, [destDecimals, inputAmount, swapToken.src, uniSwapAmountOut]);
  /**
   * update
   */
  useEffect(() => {
    const time = setInterval(() => {
      uniSwapAmountOutRefetch();
      if (mainToken.includes(swapToken.src)) {
        ETHrefetch();
      } else {
        srcBalanceRefetch();
      }
      if (mainToken.includes(swapToken.dest)) {
        ETHrefetch();
      } else {
        destBalanceRefetch();
      }

      srcRefetch();
    }, SWAP_UPDATE * 1000);
    return () => {
      clearInterval(time);
    };
  }, [
    ETHrefetch,
    destBalanceRefetch,
    mainToken,
    srcBalanceRefetch,
    srcRefetch,
    swapToken.dest,
    swapToken.src,
    uniSwapAmountOutRefetch,
  ]);

  useEffect(() => {
    setTimeout(() => {
      if (mainToken.includes(swapToken.src)) {
        ETHrefetch();
      } else {
        srcRefetch();
        srcBalanceRefetch();
      }
    }, 3000);
  }, [ETHrefetch, mainToken, srcBalanceRefetch, srcRefetch, swapToken.src]);

  return {
    swapToken,
    exchangeButton,
    showSrcBalance,
    showDestBalance,
    slippage,
    setSlippage,
    maxCallBack,
    inputAmount,
    setInputAmount,
    showPrice,
    showOutAmount,
    setSamePrice,
    exchangePrice,
    mainButtonTitle,
    mainButtonAction,
    mainButtonDis,
    mainButtonLoading,
    tokenArray,
    selectSrcToken,
    selectDestToken,
  };
}

export default useSwap;
