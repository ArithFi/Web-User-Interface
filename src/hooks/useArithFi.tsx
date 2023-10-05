import { useCallback, useEffect, useMemo, useState } from "react";
import { createContainer } from "unstated-next";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useNetwork,
  useSwitchNetwork,
} from "wagmi";
import { NavItems } from "../pages/Share/Head/NESTHead";

export interface signatureData {
  address: string;
  chainId: number;
  signature: string;
  expirationTime: number;
}

function useMainReact() {
  const [showConnect, setShowConnect] = useState(false);

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

  return {
    showConnect,
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
  };
}
const ArithFi = createContainer(useMainReact);

function useArithFi() {
  return ArithFi.useContainer();
}

export const NESTProvider = ArithFi.Provider;
export default useArithFi;
