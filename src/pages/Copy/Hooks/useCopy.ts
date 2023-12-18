import {useEffect, useMemo, useState} from "react";
import {serviceBaseURL} from "../../../lib/ArithFiRequest";
import useArithFi from "../../../hooks/useArithFi";
import useWindowWidth from "../../../hooks/useWindowWidth";
import {DEFAULT_CHAIN_ID} from "../../../lib/client";
import {useSearchParams} from "react-router-dom";
import useSWR from "swr";
import {useSessionStorage} from "react-use";

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
  const {chainsData, account, signature} = useArithFi();
  const [kolList, setKolList] = useState<Array<AllKOLModel>>([]);
  const [myTradeInfo, setMyTradeInfo] = useState<MyTradeInfoModel>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useSessionStorage<number>('copy-page', 1);
  const [allPage, setAllPage] = useState<number>(1);
  const {isBigMobile} = useWindowWidth();
  const pageAmount = isBigMobile ? 5 : 12;
  const chainId = chainsData.chainId ?? DEFAULT_CHAIN_ID;
  const {data: kolListData, isLoading: isKOLListLoading} = useSWR(`${serviceBaseURL(chainId)}/copy/kol/list?chainId=56&walletAddress=${account.address}&pageNumber=${page}&pageSize=${pageAmount}`, (url: string) => fetch(url).then((res) => res.json()), {
    refreshInterval: 3_000,
  });
  const {data: myTradeData} = useSWR(signature?.signature ? `${serviceBaseURL(chainId)}/copy/follower/position/info?chainId=${chainId}` : undefined, (url) => fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': signature?.signature!,
    }
  }).then((res) => res.json()), {
    refreshInterval: 3_000,
  });

  useEffect(() => {
    if (kolListData && Number(kolListData?.["errorCode"]) === 0) {
      const value = kolListData["value"]["records"];
      const allItem = kolListData["value"]["total"];
      setAllPage(Math.ceil(allItem / pageAmount));
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
          follow: item["follow"],
        };
        return one;
      });
      setKolList(list);
    }
  }, [kolListData]);

  useEffect(() => {
    if (myTradeData && Number(myTradeData?.["errorCode"]) === 0) {
      const value = myTradeData["value"];
      const info: MyTradeInfoModel = {
        assets: value["assets"],
        copyOrders: value["copyOrders"],
        unRealizedPnl: value["unRealizedPnl"],
        profit: value["profit"],
      };
      setMyTradeInfo(info);
    }
  }, [myTradeData]);

  const hideMyTrade = useMemo(() => {
    return !signature;
  }, [signature]);

  return {kolList, myTradeInfo, setPage, allPage, hideMyTrade, page, isKOLListLoading};
}

export default useCopy;
