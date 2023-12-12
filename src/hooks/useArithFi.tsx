import { useCallback, useEffect, useMemo, useState } from "react";
import { createContainer } from "unstated-next";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useNetwork,
  useSwitchNetwork,
} from "wagmi";
import { NavItems } from "../pages/Share/Head/ArithFiHead";
import { setWalletConnectDeepLink } from "../lib/RainbowOptions/walletConnectDeepLink";
import { useWalletConnectors } from "../lib/RainbowOptions/useWalletConnectors";

export interface signatureData {
  address: string;
  chainId: number;
  signature: string;
  expirationTime: number;
}

function useMainReact() {
  const [showConnect, setShowConnect] = useState(false);
  const wallets = useWalletConnectors();
  /**
   * wallet
   */
  const account = useAccount({
    onConnect: (data) => console.log("connected", data),
    onDisconnect: () => console.log("disconnected"),
  });
  const connectData = useConnect();
  const disconnect = useDisconnect();
  useEffect(() => {
    if (showConnect && account.isConnected) {
      setShowConnect(false);
    }
  }, [account.isConnected, showConnect]);
  /**
   * Switch chains
   */
  const { chain } = useNetwork();
  const chainId = useMemo(() => {
    return chain ? chain.id : undefined;
  }, [chain]);
  const {
    chains,
    error: switchNetworkError,
    pendingChainId,
    switchNetwork,
    status,
    reset: switchNetworkReset,
  } = useSwitchNetwork();
  const chainsData = {
    chain,
    chainId,
    chains,
    switchNetworkError,
    pendingChainId,
    switchNetwork,
    switchNetworkReset,
    status,
  };
  /**
   * user: connect wallet
   */
  useEffect(() => {
    if (account.address) {
      (async () => {
        try {
          await fetch(
            `https://db.arithfi.com/dashboardapi/users/users/setwallet?address=${account.address}&chainId=${chainId}`,
            {
              method: "POST",
            }
          );
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [account.address, chainId]);
  /**
   * add ATF
   */
  const addATFToWallet = useCallback(async () => {
    const token = "ATF".getToken();
    if (chainId && token && account.connector) {
      const imageURL =
        "https://raw.githubusercontent.com/ArithFi/Images/main/ATFIcon.svg";
      await account.connector.watchAsset?.({
        address: token.address[chainId], // The address that the token is at.
        symbol: "ATF", // A ticker symbol or shorthand, up to 5 chars.
        decimals: 18, // The number of decimals in the token
        image: imageURL, // A string url of the token logo
      });
    }
  }, [account.connector, chainId]);
  /**
   * checkSigned
   */
  const defaultSignature = useMemo(() => {
    if (!chainsData.chainId || !account.address) {
      return;
    }
    var cache = localStorage.getItem("signature");
    if (!cache) {
      return;
    }
    const signsData = JSON.parse(cache);
    const same: [signatureData] = signsData.filter(
      (item: signatureData) =>
        (item["address"] as string).toLocaleLowerCase() ===
          account.address?.toLocaleLowerCase() &&
        item["chainId"] === chainsData.chainId
    );
    if (same.length > 0) {
      const timestamp = Date.now();
      if (same[0].expirationTime > timestamp / 1000) {
        return same[0];
      } else {
        return undefined;
      }
    }
    return;
  }, [account.address, chainsData.chainId]);
  const [signature, setSignature] = useState<signatureData | undefined>(
    defaultSignature
  );

  useEffect(() => {
    setSignature(defaultSignature);
  }, [defaultSignature, account.address]);
  const checkSigned = useMemo(() => {
    console.log(signature);
    if (signature) {
      return true;
    } else {
      return false;
    }
  }, [signature]);

  /**
   * nav items from different chain
   */
  const navItems = useMemo(() => {
    if (account.address && checkSigned) {
      return NavItems;
    } else {
      return NavItems.filter((item) => item.content !== "Account");
    }
  }, [account.address, checkSigned]);

  function isMobileBrowser() {
    const hasEthereum = !!(window as any).ethereum;
    const hasWeb3 = !!(window as any).web3;
    if (hasEthereum || hasWeb3) {
      return false;
    }
    const userAgent = navigator.userAgent;
    return (
      (/Chrome/i.test(userAgent) && /Mobile/i.test(userAgent)) ||
      (/iPad|iPhone|iPod/.test(userAgent) && /CriOS|Safari/.test(userAgent))
    );
  }

  const showConnectModal = () => {
    if (isMobileBrowser()) {
      wallets[1].connect?.();
      wallets[1].onConnecting?.(async () => {
        const getMobileUri = wallets[1].mobile?.getUri;
        if (getMobileUri) {
          const mobileUri = await getMobileUri();
          setWalletConnectDeepLink({
            mobileUri: mobileUri,
            name: wallets[1].name,
          });

          if (mobileUri.startsWith("http")) {
            const link = document.createElement("a");
            link.href = mobileUri;
            link.target = "_blank";
            link.rel = "noreferrer noopener";
            link.click();
          } else {
            window.location.href = mobileUri;
          }
        }
      });
    } else {
      setShowConnect(true);
    }
  };

  return {
    showConnect,
    showConnectModal,
    setShowConnect,
    account,
    connectData,
    chainsData,
    disconnect,
    navItems,
    addATFToWallet,
    checkSigned,
    signature,
    setSignature,
    isMobileBrowser,
  };
}
const ArithFi = createContainer(useMainReact);

function useArithFi() {
  return ArithFi.useContainer();
}

export const ArithFiProvider = ArithFi.Provider;
export default useArithFi;
