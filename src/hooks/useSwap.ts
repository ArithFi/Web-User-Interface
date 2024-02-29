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
import useSwapExactTokensForTokens from "../contracts/useSwapContract";
import {
  TransactionType,
  usePendingTransactions,
} from "./useTransactionReceipt";
import { t } from "@lingui/macro";

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
  const tokenArray = useMemo(() => {
    return ["USDT", "ATF"];
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
    if (swapToken.src === "USDT") {
      return ["USDT", "ATF"];
    } else if (swapToken.src === "ATF") {
      return ["ATF", "USDT"];
    } else {
      return undefined;
    }
  }, [swapToken.src]);
  const swapPathAddress = useMemo(() => {
    if (swapPath && chainsData.chainId) {
      const pathAddress = swapPath.map((item) => {
        return item.getToken()!.address[chainsData.chainId!];
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
    const token = swapToken.src.getToken();
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
    const token = swapToken.dest.getToken();
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
    [scrAddress ?? String().zeroAddress, destAddress ?? String().zeroAddress]
  );

  const amountOutMin = useMemo(() => {
    if (uniSwapAmountOut) {
      return uniSwapAmountOut[1].sub(
        uniSwapAmountOut[1]
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
          return `1 ${
            swapToken.src
          } = ${uniSwapAmountOut[1].bigNumberToShowString(destDecimals, 6)} ${
            swapToken.dest
          }`;
        } else {
          const out = parseUnits("1", destDecimals)
            .mul(parseUnits("1", 18))
            .div(uniSwapAmountOut[1]);
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
    const token = swapToken.src.getToken();
    if (token && scrBalance && chainsData.chainId) {
      setInputAmount(
        scrBalance
          .bigNumberToShowString(token.decimals[chainsData.chainId], 18)
          .formatInputNum4()
      );
    }
  }, [chainsData.chainId, scrBalance, swapToken.src]);

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
    const token = swapToken.src.getToken();
    if (token && scrBalance && chainsData.chainId) {
      return scrBalance.bigNumberToShowString(
        token.decimals[chainsData.chainId]
      );
    } else {
      return String().placeHolder;
    }
  }, [chainsData.chainId, scrBalance, swapToken.src]);
  const showDestBalance = useMemo(() => {
    const token = swapToken.dest.getToken();
    if (token && destBalance && chainsData.chainId) {
      return destBalance.bigNumberToShowString(
        token.decimals[chainsData.chainId]
      );
    } else {
      return String().placeHolder;
    }
  }, [destBalance, swapToken.dest, chainsData.chainId]);
  /**
   * check
   */
  const checkAllowance = useMemo(() => {
    if (scrDecimals && srcAllowance) {
      const inputBigNumber = inputToBigNumber ?? BigNumber.from("0");
      return inputBigNumber.lte(srcAllowance);
    } else {
      return true;
    }
  }, [inputToBigNumber, scrDecimals, srcAllowance]);
  const checkBalance = useMemo(() => {
    if (scrDecimals && scrBalance) {
      const inputBigNumber = inputToBigNumber ?? BigNumber.from("0");
      return inputBigNumber.lte(scrBalance);
    } else {
      return false;
    }
  }, [inputToBigNumber, scrBalance, scrDecimals]);
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
    if (tokenApprove.isLoading || swapTTT.isLoading || pending) {
      return true;
    } else {
      return false;
    }
  }, [swapTTT.isLoading, pending, tokenApprove.isLoading]);
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
      swapTTT.reset();
      swapTTT.write?.();
    }
  }, [
    account.address,
    checkAllowance,
    checkBalance,
    mainButtonLoading,
    showConnectModal,
    swapTTT,
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
  const selectToken = useCallback(
    (tokenName: string) => {
      if (tokenName === "USDT") {
        setSwapToken({ src: tokenName, dest: "ATF" });
      } else if (tokenName === "ATF") {
        setSwapToken({ src: tokenName, dest: "USDT" });
      }
      setInputAmount("");
      setSamePrice(true);
      srcRefetch();
    },
    [srcRefetch]
  );

  useEffect(() => {
    if (swapToken.src === "USDT" || swapToken.src === "ATF") {
      //  use swap amount
      if (uniSwapAmountOut && destDecimals) {
        setOutAmount(
          uniSwapAmountOut[1].bigNumberToShowString(destDecimals, 6)
        );
      }
    }
  }, [destDecimals, inputAmount, swapToken.src, uniSwapAmountOut]);
  /**
   * update
   */
  useEffect(() => {
    const time = setInterval(() => {
      uniSwapAmountOutRefetch();
      srcBalanceRefetch();
      destBalanceRefetch();
      srcRefetch();
    }, SWAP_UPDATE * 1000);
    return () => {
      clearInterval(time);
    };
  }, [
    destBalanceRefetch,
    srcBalanceRefetch,
    srcRefetch,
    uniSwapAmountOutRefetch,
  ]);

  useEffect(() => {
    setTimeout(() => {
      srcRefetch();
      srcBalanceRefetch();
    }, 3000);
  }, [srcRefetch, pending, srcBalanceRefetch]);

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
    selectToken,
  };
}

export default useSwap;
