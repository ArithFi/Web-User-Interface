import { useEffect, useMemo, useState } from "react";
import { copyAllKol, serviceBaseURL } from "../../../lib/ArithFiRequest";
import useArithFi from "../../../hooks/useArithFi";
import useWindowWidth from "../../../hooks/useWindowWidth";
import { DEFAULT_CHAIN_ID } from "../../../lib/client";
import { useSearchParams } from "react-router-dom";
import useSWR from "swr";
import { useSessionStorage } from "react-use";
import { formatTVDate } from "../../../lib/dates";

export interface AllKOLModel {
  id: string;
  walletAddress: string;
  nickName: string;
  avatar: string;
  tags: [string];
  introduction: string;
  maxFollowers: number;
  maxPositionSize: number;
  rewardRatio: number;
  currentFollowers: number;
  followersAssets: number;
  followerProfitLoss: number;
  kolProfitLoss: number;
  kolProfitLossRate: number;
  roiList: [number];
  follow: boolean;
}

export interface MyTradeInfoModel {
  assets: number;
  copyOrders: number;
  unRealizedPnl: number;
  profit: number;
}

function useCopy() {
  const { account, signature, chainsData } = useArithFi();
  const [kolList, setKolList] = useState<Array<AllKOLModel>>([]);
  const [myTradeInfo, setMyTradeInfo] = useState<MyTradeInfoModel>();
  const [searchParams, setSearchParams] = useSearchParams();

  const [page, setPage] = useSessionStorage<number>("copy-page", 1);

  const [allPage, setAllPage] = useState<number>(1);
  const { isBigMobile } = useWindowWidth();

  const pageAmount = isBigMobile ? 5 : 12;

  const nowTime = new Date();
  const days7Time = new Date(nowTime.getTime() - 7 * 24 * 60 * 60 * 1000);
  const closeAtFromDate = formatTVDate(days7Time);
  const closeAtToDate = formatTVDate(nowTime);

  const { data: kolListData, isLoading: isKOLListLoading } = useSWR(
    `${serviceBaseURL(chainsData.chainId)}/copy/kol/listFull?walletAddress=${
      account.address ?? String().zeroAddress
    }&closeAtFromDate=${closeAtFromDate}&closeAtToDate=${closeAtToDate}&followOnly=false&order=${`currentFollowers DESC`}&start=${
      (page - 1) * pageAmount
    }&count=${pageAmount}`,
    (url: string) => fetch(url).then((res) => res.json()),
    {
      refreshInterval: 3_000,
    }
  );
  const { data: myTradeData } = useSWR(
    signature?.signature
      ? `${serviceBaseURL(chainsData.chainId)}/user/account/copyTrading?walletAddress=${
          account.address ?? ""
        }`
      : undefined,
    (url: any) =>
      fetch(url, {
        method: "GET",
        headers: {
          Authorization: signature?.signature!,
        },
      }).then((res) => res.json()),
    {
      refreshInterval: 3_000,
    }
  );

  useEffect(() => {
    (async () => {
      const res = await copyAllKol(closeAtFromDate, closeAtToDate, {});
      if (res["err"] === 0) {
        const allItem = res["data"].length;
        setAllPage(Math.ceil(allItem / pageAmount));
      }
    })();
  }, [closeAtFromDate, closeAtToDate, pageAmount]);

  useEffect(() => {
    if (kolListData && Number(kolListData?.["err"]) === 0) {
      const value = kolListData["data"];
      const list: Array<AllKOLModel> = value.map((item: any) => {
        const one: AllKOLModel = {
          id: item["id"],
          walletAddress: item["walletAddress"],
          nickName: item["nickName"],
          avatar: item["avatar"],
          tags: item["tags"],
          introduction: item["introduction"],
          maxFollowers: item["maxFollowers"],
          maxPositionSize: item["maxPositionSize"],
          rewardRatio: item["rewardRatio"],
          currentFollowers: item["currentFollowers"],
          followersAssets: item["followersAssets"],
          followerProfitLoss: item["followerProfitLoss"],
          kolProfitLoss: item["kolProfitLoss"],
          kolProfitLossRate: item["kolProfitLossRate"],
          roiList: item["roiList"],
          follow: item["follow"] === 1,
        };
        return one;
      });
      setKolList(list);
    }
  }, [kolListData]);

  useEffect(() => {
    if (myTradeData && Number(myTradeData?.["err"]) === 0) {
      const value = myTradeData?.["data"];
      const info: MyTradeInfoModel = {
        assets: value?.["copy_balance"] + value?.["position"] || 0,
          copyOrders: value?.["copy_order_count"] || 0,
          unRealizedPnl: value?.["unrealized_pnl"] || 0,
          profit: value?.["pnl_total"] - value?.["unrealized_pnl"] || 0,
      };
      setMyTradeInfo(info);
    }
  }, [myTradeData]);

  const hideMyTrade = useMemo(() => {
    return !signature;
  }, [signature]);

  return {
    kolList,
    myTradeInfo,
    setPage,
    allPage,
    hideMyTrade,
    page,
    isKOLListLoading,
  };
}

export default useCopy;
