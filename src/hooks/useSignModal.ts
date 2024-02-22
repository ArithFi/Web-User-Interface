import { useCallback, useEffect, useMemo, useState } from "react";
import useArithFi, { signatureData } from "./useArithFi";
import { RequestBodyInterface, serviceLogin } from "../lib/ArithFiRequest";
import { t } from "@lingui/macro";
import { useSignMessage, useSignTypedData } from "wagmi";

const BASE_SIGN_CONTENT = "https://arithfi.com";

function useSignModal() {
  const { account, chainsData, setSignature } = useArithFi();
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);

  const signsData: Array<any> = useMemo(() => {
    var cache = localStorage.getItem("signatureV2");
    if (!cache) {
      return [];
    }
    return JSON.parse(cache);
  }, []);

  const login = useCallback(
    async (signature: string) => {
      if (account.address && chainsData.chainId) {
        const info: RequestBodyInterface = {
          signature: signature,
        };
        const loginBase: { [key: string]: any } = await serviceLogin(
          account.address,
          remember,
          info
        );
        if (Number(loginBase["err"]) === 0) {
          const signatureData: signatureData = {
            address: account.address,
            chainId: chainsData.chainId,
            signature: loginBase["data"]["token"],
            expirationTime: loginBase["data"]["expirationTime"],
          };
          setSignature(signatureData);
          if (remember) {
            const same = signsData.filter(
              (item) =>
                (item["address"] as string).toLocaleLowerCase() ===
                  account.address?.toLocaleLowerCase() &&
                item["chainId"] === chainsData.chainId
            );
            if (same.length > 0) {
              const itemIndex = signsData.indexOf(same[0]);
              const newSignsData = [...signsData];
              newSignsData[itemIndex] = signatureData;
              localStorage.setItem(`signatureV2`, JSON.stringify(newSignsData));
            } else {
              const newSignsData = [...signsData, signatureData];
              localStorage.setItem(`signatureV2`, JSON.stringify(newSignsData));
            }
          }
        }
        setLoading(false);
      }
    },
    [account.address, chainsData.chainId, remember, setSignature, signsData]
  );

  const { data, isSuccess, signMessage } = useSignMessage({
    message: BASE_SIGN_CONTENT,
  });
  // const { data, isError, isLoading, isSuccess, signTypedData:signMessage } =
  //   useSignTypedData({
  //     domain: {
  //       name: BASE_SIGN_CONTENT,
  //       version: '1',
  //       chainId: 97,
  //     },
  //     types: {
  //       Sign: [
  //         { name: 'msg', type: 'string' },
  //       ]
  //     },
  //     value: {
  //       msg: BASE_SIGN_CONTENT
  //     }
  //   })

  const mainButtonTitle = useMemo(() => {
    return t`Send request`;
  }, []);
  const mainButtonLoading = useMemo(() => {
    return loading;
  }, [loading]);
  const mainButtonDis = useMemo(() => {
    return false;
  }, []);
  const mainButtonAction = useCallback(() => {
    if (!mainButtonDis && !mainButtonLoading) {
      setLoading(true);
      signMessage();
    }
  }, [mainButtonDis, mainButtonLoading, signMessage]);

  useEffect(() => {
    if (isSuccess && data) {
      login(data);
    }
  }, [data, isSuccess, login]);

  return {
    remember,
    setRemember,
    mainButtonTitle,
    mainButtonLoading,
    mainButtonDis,
    mainButtonAction,
  };
}

export default useSignModal;
