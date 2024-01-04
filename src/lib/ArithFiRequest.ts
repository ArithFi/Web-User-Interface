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
    const currentTimestampInSeconds = Math.floor(Date.now() / 1000);
    const res = await fetch(url, {
      method: "GET",
      headers: {
        ...header,
        "Content-Type": "application/json",
        token: currentTimestampInSeconds.toString(),
      },
    });
    const resJson = await res.json();
    return resJson;
  } catch (error) {
    return undefined;
  }
}

export function KOLClick(info: RequestBodyInterface) {
  baseRequestPOSTWithBody(
    "https://db.arithfi.com/dashboardapi/kol/click",
    info
  );
}

export function KOLWallet(info: RequestBodyInterface) {
  baseRequestPOSTWithBody(
    "https://db.arithfi.com/dashboardapi/kol/wallet",
    info
  );
}

export function KOLTx(info: RequestBodyInterface) {
  baseRequestPOSTWithBody("https://db.arithfi.com/dashboardapi/kol/tx", info);
}

export function getPriceListV2(chainId?: number): Promise<any> {
  return baseRequestGet(`${serviceBaseURL(chainId)}/oracle/list`);
}

/**
 * service
 */
export function serviceBaseURL(chainId: number = 97) {
  if (chainId === 56) {
    return "https://db.arithfi.com/arithfi";
  } else {
    return "https://db.nestfi.net/arithfi";
  }
}
export function serviceLogin(
  address: string,
  remember: boolean,
  info: RequestBodyInterface,
  chainId?: number
): Promise<any> {
  return baseRequestPOSTWithBody_return(
    `${serviceBaseURL(
      chainId
    )}/user/login?walletAddress=${address}&remember=${remember}`,
    info,
    {}
  );
}

export function serviceOpen(
  address: string,
  direction: boolean,
  leverage: number,
  limit: boolean,
  margin: number,
  orderPrice: number,
  product: string,
  stopLossPrice: number,
  takeProfitPrice: number,
  header: RequestBodyInterface,
  chainId?: number
): Promise<any> {
  return baseRequestPOSTWithBody_return(
    `${serviceBaseURL(chainId)}/future/open`,
    header,
    {
      walletAddress: address,
      product: product,
      direction: `${direction}`,
      leverage: leverage.toString(),
      margin: margin.toString(),
      orderPrice: orderPrice.toString(),
      limit: `${limit}`,
      stopLossPrice: stopLossPrice.toString(),
      takeProfitPrice: takeProfitPrice.toString(),
    }
  );
}

export function serviceAdd(
  walletAddress: string,
  append: string,
  id: string,
  header: RequestBodyInterface,
  chainId?: number
): Promise<any> {
  return baseRequestPOSTWithBody_return(
    `${serviceBaseURL(
      chainId
    )}/future/add?walletAddress=${walletAddress}&id=${id}&append=${append}`,
    header,
    {}
  );
}

export function serviceUpdateStopPrice(
  walletAddress: string,
  id: string,
  stopLossPrice: string,
  takeProfitPrice: string,
  header: RequestBodyInterface,
  chainId?: number
): Promise<any> {
  return baseRequestPOSTWithBody_return(
    `${serviceBaseURL(
      chainId
    )}/future/updateStopPrice?walletAddress=${walletAddress}&id=${id}&stopLossPrice=${stopLossPrice}&takeProfitPrice=${takeProfitPrice}`,
    header,
    {}
  );
}

export function serviceUpdateLimitPrice(
  walletAddress: string,
  id: string,
  limitPrice: string,
  header: RequestBodyInterface,
  chainId?: number
): Promise<any> {
  return baseRequestPOSTWithBody_return(
    `${serviceBaseURL(
      chainId
    )}/future/updateLimitPrice?walletAddress=${walletAddress}&id=${id}&limitPrice=${limitPrice}`,
    header,
    {}
  );
}

export function serviceCancel(
  walletAddress: string,
  id: string,
  header: RequestBodyInterface,
  chainId?: number
) {
  return baseRequestPOSTWithBody_return(
    `${serviceBaseURL(
      chainId
    )}/future/cancel?walletAddress=${walletAddress}&id=${id}`,
    header,
    {}
  );
}

export function serviceWithdraw(
  walletAddress: string,
  amount: number,
  header: RequestBodyInterface,
  chainId?: number
) {
  return baseRequestPOSTWithBody_return(
    `${serviceBaseURL(
      chainId
    )}/user/withdraw?walletAddress=${walletAddress}&value=${amount}`,
    header,
    {}
  );
}

export function serviceClose(
  walletAddress: string,
  id: string,
  header: RequestBodyInterface,
  chainId?: number
) {
  return baseRequestPOSTWithBody_return(
    `${serviceBaseURL(
      chainId
    )}/future/close?walletAddress=${walletAddress}&id=${id}`,
    header,
    {}
  );
}

export function serviceSetFavorites(
  walletAddress: string,
  favorites: string,
  header: RequestBodyInterface,
  chainId?: number
) {
  return baseRequestPOSTWithBody_return(
    `${serviceBaseURL(
      chainId
    )}/user/setFavorites?walletAddress=${walletAddress}&favorites=${favorites}`,
    header,
    {}
  );
}

export function serviceAsset(
  address: string,
  info: RequestBodyInterface,
  chainId?: number
): Promise<any> {
  return baseRequestGetWithHeader(
    `${serviceBaseURL(chainId)}/user/asset?walletAddress=${address}`,
    info
  );
}

export function servicePList(
  address: string,
  info: RequestBodyInterface,
  chainId?: number
): Promise<any> {
  return baseRequestGetWithHeader(
    `${serviceBaseURL(
      chainId
    )}/future/list?walletAddress=${address}&status=2&copy=null`,
    info
  );
}

export function serviceList(
  address: string,
  info: RequestBodyInterface,
  chainId?: number
): Promise<any> {
  return baseRequestGetWithHeader(
    `${serviceBaseURL(
      chainId
    )}/future/list?walletAddress=${address}&status=4&copy=null`,
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

export function serviceIsOpen(info: RequestBodyInterface) {
  return baseRequestGetWithHeader(
    `https://db.arithfi.com/api/oracle/price/forex/isopen`,
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
  address: string,
  info: RequestBodyInterface
) {
  return baseRequestGetWithHeader(
    `${serviceBaseURL(
      chainId
    )}/copy/kol/list?chainId=${chainId}&walletAddress=${address}&pageNumber=${pageNum}&pageSize=${pageSize}`,
    info
  );
}

export function copyMyTradeInfo(chainId: number, info: RequestBodyInterface) {
  return baseRequestGetWithHeader(
    `${serviceBaseURL(chainId)}/copy/follower/position/info?chainId=${chainId}`,
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
    `${serviceBaseURL(chainId)}/copy/follower/future/list?chainId=${chainId}`,
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
    `${serviceBaseURL(chainId)}/copy/follower/kolList?chainId=${chainId}`,
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
