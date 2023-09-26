// function baseRequestGet(url: string) {
//     return
// }

export interface RequestBodyInterface {
  [key: string]: string | `0x${string}`;
}

async function baseRequestPOSTWithBody(
  url: string,
  body: RequestBodyInterface
) {
  try {
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  } catch (error) {
    console.log(error);
  }
}

async function baseRequestPOSTWithBody_return(
  url: string,
  header: { [key: string]: string },
  body: RequestBodyInterface
) {
  try {
    const currentTimestampInSeconds = Math.floor(Date.now() / 1000);
    const res = await fetch(url, {
      method: "POST",
      headers: {
        ...header,
        "Content-Type": "application/json",
        token: currentTimestampInSeconds.toString(),
      },
      body: JSON.stringify(body),
    });
    const resJson = await res.json();
    return resJson;
  } catch (error) {
    console.log(error);
  }
}

async function baseRequestPOST(url: string) {
  try {
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(error);
  }
}

async function baseRequestGet(url: string) {
  try {
    const res = await fetch(url);
    const resJson = await res.json();
    return resJson;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

async function baseRequestGetWithHeader(
  url: string,
  header: { [key: string]: string }
) {
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: { ...header, "Content-Type": "application/json" },
    });
    const resJson = await res.json();
    return resJson;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

export function KOLClick(info: RequestBodyInterface) {
  baseRequestPOSTWithBody("https://me.nestfi.net/dashboardapi/kol/click", info);
}

export function KOLWallet(info: RequestBodyInterface) {
  baseRequestPOSTWithBody("https://me.nestfi.net/dashboardapi/kol/wallet", info);
}

export function KOLTx(info: RequestBodyInterface) {
  baseRequestPOSTWithBody("https://me.nestfi.net/dashboardapi/kol/tx", info);
}

export function getPriceFromNESTLocal(token: string): Promise<any> {
  return baseRequestGet(`https://api.nestfi.net/api/oracle/price/${token}usdt`);
}

export function getPriceList(): Promise<any> {
  return baseRequestGet(`https://api.nestfi.net/api/oracle/price/list`);
}


/**
 * service
 */

export function serviceBaseURL(chainId: number) {
  if (chainId === 56) {
    return "https://me.nestfi.net/arithfi";
  } else {
    return "https://me.nestfi.net/arithfi";
  }
}
export function serviceLogin(
  chainId: number,
  address: string,
  remember: boolean,
  info: RequestBodyInterface
): Promise<any> {
  return baseRequestPOSTWithBody_return(
    `${serviceBaseURL(
      chainId
    )}/op/user/login?chainId=${chainId}&walletAddress=${address}&remember=${remember}`,
    info,
    {}
  );
}

export function serviceOpen(
  chainId: number,
  address: string,
  direction: boolean,
  leverage: number,
  limit: boolean,
  margin: number,
  orderPrice: number,
  product: string,
  stopLossPrice: number,
  takeProfitPrice: number,
  header: RequestBodyInterface
): Promise<any> {
  return baseRequestPOSTWithBody_return(
    `${serviceBaseURL(
      chainId
    )}/op/future/open?chainId=${chainId}&direction=${direction}&leverage=${leverage}&limit=${limit}&margin=${margin}&orderPrice=${orderPrice}&product=${product}&stopLossPrice=${stopLossPrice}&takeProfitPrice=${takeProfitPrice}&walletAddress=${address}`,
    header,
    {}
  );
}

export function serviceAdd(
  append: string,
  chainId: number,
  id: string,
  header: RequestBodyInterface
): Promise<any> {
  return baseRequestPOSTWithBody_return(
    `${serviceBaseURL(
      chainId
    )}/op/future/add?append=${append}&chainId=${chainId}&id=${id}`,
    header,
    {}
  );
}

export function serviceUpdateStopPrice(
  id: string,
  stopLossPrice: string,
  takeProfitPrice: string,
  chainId: number,
  header: RequestBodyInterface
): Promise<any> {
  return baseRequestPOSTWithBody_return(
    `${serviceBaseURL(
      chainId
    )}/op/future/updateStopPrice?id=${id}&stopLossPrice=${stopLossPrice}&takeProfitPrice=${takeProfitPrice}`,
    header,
    {}
  );
}

export function serviceUpdateLimitPrice(
  id: string,
  limitPrice: string,
  chainId: number,
  header: RequestBodyInterface
): Promise<any> {
  return baseRequestPOSTWithBody_return(
    `${serviceBaseURL(
      chainId
    )}/op/future/updateLimitPrice?id=${id}&limitPrice=${limitPrice}`,
    header,
    {}
  );
}

export function serviceCancel(
  id: string,
  chainId: number,
  header: RequestBodyInterface
) {
  return baseRequestPOSTWithBody_return(
    `${serviceBaseURL(chainId)}/op/future/cancel?id=${id}`,
    header,
    {}
  );
}

export function serviceWithdraw(
  amount: number,
  chainId: number,
  token: string,
  tokenAddress: string,
  walletAddress: string,
  header: RequestBodyInterface
) {
  return baseRequestPOSTWithBody_return(
    `${serviceBaseURL(
      chainId
    )}/op/user/withdraw?amount=${amount}&chainId=${chainId}&token=${token}&tokenAddress=${tokenAddress}&walletAddress=${walletAddress}`,
    header,
    {}
  );
}

export function serviceClose(
  id: string,
  chainId: number,
  header: RequestBodyInterface
) {
  return baseRequestPOSTWithBody_return(
    `${serviceBaseURL(chainId)}/op/future/close?id=${id}`,
    header,
    {}
  );
}

export function serviceAsset(
  chainId: number,
  address: string,
  info: RequestBodyInterface
): Promise<any> {
  return baseRequestGetWithHeader(
    `${serviceBaseURL(
      chainId
    )}/op/user/asset?chainId=${chainId}&walletAddress=${address}`,
    info
  );
}

export function serviceList(
  chainId: number,
  address: string,
  info: RequestBodyInterface
): Promise<any> {
  return baseRequestGetWithHeader(
    `${serviceBaseURL(
      chainId
    )}/op/future/list?chainId=${chainId}&walletAddress=${address}`,
    info
  );
}

export function serviceAccountList(
  chainId: number,
  address: string,
  info: RequestBodyInterface
) {
  return baseRequestGetWithHeader(
    `${serviceBaseURL(
      chainId
    )}/op/user/depositWithdraw/list?chainId=${chainId}&walletAddress=${address}`,
    info
  );
}

export function serviceHistory(
  chainId: number,
  address: string,
  info: RequestBodyInterface
) {
  return baseRequestGetWithHeader(
    `${serviceBaseURL(
      chainId
    )}/op/future/history?chainId=${chainId}&walletAddress=${address}`,
    info
  );
}

export function serviceFutureHistory(
  chainId: number,
  address: string,
  info: RequestBodyInterface
) {
  return baseRequestGetWithHeader(
    `${serviceBaseURL(
      chainId
    )}/op/history/list?chainId=${chainId}&address=${address}`,
    info
  );
}

/**
 * Copy
 */
export function copyFollow(
  chainId: number,
  header: RequestBodyInterface,
  body: RequestBodyInterface
) {
  return baseRequestPOSTWithBody_return(
    `${serviceBaseURL(chainId)}/copy/follower/setting`,
    header,
    body
  );
}

export function copyClose(
  chainId: number,
  address: string,
  header: RequestBodyInterface
) {
  return baseRequestPOSTWithBody_return(
    `${serviceBaseURL(
      chainId
    )}/copy/follower/cancle?chainId=${chainId}&copyKolAddress=${address}`,
    header,
    {}
  );
}

export function copyAllKOL(
  chainId: number,
  pageNum: number,
  pageSize: number,
  info: RequestBodyInterface
) {
  return baseRequestGetWithHeader(
    `${serviceBaseURL(
      chainId
    )}/copy/kol/list?chainId=${chainId}&pageNumber=${pageNum}&pageSize=${pageSize}`,
    info
  );
}

export function copyMyTradeInfo(chainId: number, info: RequestBodyInterface) {
  return baseRequestGetWithHeader(
    `${serviceBaseURL(
      chainId
    )}/copy/follower/position/info?chainId=${chainId}`,
    info
  );
}

export function copyKOLInfo(
  chainId: number,
  address: string,
  info: RequestBodyInterface
) {
  return baseRequestGetWithHeader(
    `${serviceBaseURL(
      chainId
    )}/copy/kol/info?chainId=${chainId}&walletAddress=${address}`,
    info
  );
}

export function copyEarningsList(
  chainId: number,
  address: string,
  days: number,
  info: RequestBodyInterface
) {
  return baseRequestGetWithHeader(
    `${serviceBaseURL(
      chainId
    )}/copy/kol/earnings/list?chainId=${chainId}&copyKolAddress=${address}&days=${days}`,
    info
  );
}

export function copyPerformance(
  chainId: number,
  address: string,
  days: number,
  info: RequestBodyInterface
) {
  return baseRequestGetWithHeader(
    `${serviceBaseURL(
      chainId
    )}/copy/kol/performance/info?chainId=${chainId}&copyKolAddress=${address}&days=${days}`,
    info
  );
}

export function copyPerformanceSymbol(
  chainId: number,
  address: string,
  days: number,
  info: RequestBodyInterface
) {
  return baseRequestGetWithHeader(
    `${serviceBaseURL(
      chainId
    )}/copy/kol/performance/symbol?chainId=${chainId}&copyKolAddress=${address}&days=${days}`,
    info
  );
}

export function copyTraderFollowers(
  chainId: number,
  address: string,
  info: RequestBodyInterface
) {
  return baseRequestGetWithHeader(
    `${serviceBaseURL(
      chainId
    )}/copy/kol/follower/list?chainId=${chainId}&copyKolAddress=${address}`,
    info
  );
}

export function copyMyCopiesList(chainId: number, info: RequestBodyInterface) {
  return baseRequestGetWithHeader(
    `${serviceBaseURL(
      chainId
    )}/copy/follower/future/list?chainId=${chainId}`,
    info
  );
}

export function copyMyCopiesHistoryList(
  chainId: number,
  info: RequestBodyInterface
) {
  return baseRequestGetWithHeader(
    `${serviceBaseURL(
      chainId
    )}/copy/follower/future/history?chainId=${chainId}`,
    info
  );
}

export function copyMyCopiesMyTradersList(
  chainId: number,
  info: RequestBodyInterface
) {
  return baseRequestGetWithHeader(
    `${serviceBaseURL(
      chainId
    )}/copy/follower/kolList?chainId=${chainId}`,
    info
  );
}

export function copyTraderHistory(
  chainId: number,
  address: string,
  info: RequestBodyInterface
) {
  return baseRequestGetWithHeader(
    `${serviceBaseURL(
      chainId
    )}/copy/kol/future/history?chainId=${chainId}&walletAddress=${address}`,
    info
  );
}

export function copyCloseInfo(
  chainId: number,
  address: string,
  info: RequestBodyInterface
) {
  return baseRequestGetWithHeader(
    `${serviceBaseURL(
      chainId
    )}/copy/follower/future/info?chainId=${chainId}&copyKolAddress=${address}`,
    info
  );
}

export function copyAsset(
  chainId: number,
  kolAddress: string,
  address: string,
  info: RequestBodyInterface
) {
  return baseRequestGetWithHeader(
    `${serviceBaseURL(
      chainId
    )}/copy/follower/asset?chainId=${chainId}&copyKolAddress=${kolAddress}&walletAddress=${address}`,
    info
  );
}
