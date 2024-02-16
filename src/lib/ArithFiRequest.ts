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

export function getPriceListV2(chainId?: number): Promise<any> {
  return baseRequestGet(`${serviceBaseURL(chainId)}/oracle/list`);
}

/**
 * service
 */
export function serviceBaseURL(chainId: number = 56) {
  if (chainId === 56) {
    return "https://db.nestfi.net/arithfi_main";
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
    )}/future/list?walletAddress=${address}&status=2&copy=null&start=${0}&count=${999}`,
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
    )}/future/list?walletAddress=${address}&status=4&copy=null&start=${0}&count=${999}`,
    info
  );
}

export function serviceFutureHistory(
  address: string,
  info: RequestBodyInterface,
  chainId?: number
): Promise<any> {
  return baseRequestGetWithHeader(
    `${serviceBaseURL(
      chainId
    )}/future/list?walletAddress=${address}&status=0,-1,-2,-3&copy=null&order=closeAt DESC&start=${0}&count=${999}`,
    info
  );
}

export function serviceIsOpen(info: RequestBodyInterface, chainId?: number) {
  return baseRequestGetWithHeader(
    `${serviceBaseURL(chainId)}/oracle/isMarketOpen?product=USD/JPY`,
    info
  );
}

/**
 * Copy
 */
export function copyFollow(
  header: RequestBodyInterface,
  body: RequestBodyInterface,
  chainId?: number
) {
  return baseRequestPOSTWithBody_return(
    `${serviceBaseURL(chainId)}/user/copySetting`,
    header,
    body
  );
}
export function copyClose(
  walletAddress: string,
  copyKolAddress: string,
  header: RequestBodyInterface,
  chainId?: number
) {
  return baseRequestPOSTWithBody_return(
    `${serviceBaseURL(
      chainId
    )}/user/cancelCopy?walletAddress=${walletAddress}&copyKolAddress=${copyKolAddress}`,
    header,
    {}
  );
}
export function copyAllKol(
  closeAtFromDate: string,
  closeAtToDate: string,
  info: RequestBodyInterface,
  chainId?: number
) {
  return baseRequestGetWithHeader(
    `${serviceBaseURL(chainId)}/copy/kol/listFull?walletAddress=${
      String().zeroAddress
    }&closeAtFromDate=${closeAtFromDate}&closeAtToDate=${closeAtToDate}&followOnly=false&order=${`follow DESC`}&start=0&count=999`,
    info
  );
}
export function copyMyTradeInfo(
  walletAddress: string,
  info: RequestBodyInterface,
  chainId?: number
) {
  return baseRequestGetWithHeader(
    `${serviceBaseURL(
      chainId
    )}/user/account/copyTrading?walletAddress=${walletAddress}`,
    info
  );
}
export function copyKOLInfo(
  kolAddress: string,
  from: string,
  to: string,
  info: RequestBodyInterface,
  chainId?: number
) {
  return baseRequestGetWithHeader(
    `${serviceBaseURL(
      chainId
    )}/copy/kol/detail?kolAddress=${kolAddress}&closeAtFromDate=${from}&closeAtToDate=${to}`,
    info
  );
}
export function copyEarningsList(
  kolAddress: string,
  from: string,
  to: string,
  info: RequestBodyInterface,
  chainId?: number
) {
  return baseRequestGetWithHeader(
    `${serviceBaseURL(
      chainId
    )}/copy/earnings/list?kolAddress=${kolAddress}&from=${from}&to=${to}`,
    info
  );
}
export function copyPerformanceSymbol(
  kolAddress: string,
  from: string,
  to: string,
  info: RequestBodyInterface,
  chainId?: number
) {
  return baseRequestGetWithHeader(
    `${serviceBaseURL(
      chainId
    )}/copy/performance/symbol?kolAddress=${kolAddress}&from=${from}&to=${to}`,
    info
  );
}
export function copyMyCopiesList(
  address: string,
  info: RequestBodyInterface,
  chainId?: number
): Promise<any> {
  return baseRequestGetWithHeader(
    `${serviceBaseURL(
      chainId
    )}/future/list?walletAddress=${address}&status=2&copy=true&start=${0}&count=${999}`,
    info
  );
}
export function copyMyCopiesHistoryList(
  address: string,
  info: RequestBodyInterface,
  chainId?: number
): Promise<any> {
  return baseRequestGetWithHeader(
    `${serviceBaseURL(
      chainId
    )}/future/list?walletAddress=${address}&status=0,-1,-2,-3&copy=true&order=closeAt DESC&start=${0}&count=${999}`,
    info
  );
}
export function copyMyCopiesMyTradersList(
  walletAddress: string,
  info: RequestBodyInterface,
  chainId?: number
) {
  return baseRequestGetWithHeader(
    `${serviceBaseURL(
      chainId
    )}/copy/follower/kolList?walletAddress=${walletAddress}`,
    info
  );
}
export function copyTraderCurrent(
  address: string,
  info: RequestBodyInterface,
  chainId?: number
): Promise<any> {
  return baseRequestGetWithHeader(
    `${serviceBaseURL(
      chainId
    )}/copy/listKolOrders?kolAddress=${address}&status=2&order=id DESC&start=${0}&count=${999}`,
    info
  );
}
export function copyTraderHistory(
  address: string,
  info: RequestBodyInterface,
  chainId?: number
): Promise<any> {
  return baseRequestGetWithHeader(
    `${serviceBaseURL(
      chainId
    )}/copy/listKolOrders?kolAddress=${address}&status=0,-1,-2,-3&order=closeAt DESC&start=${0}&count=${999}`,
    info
  );
}
export function copyCloseInfo(
  walletAddress: string,
  kolAddress: string,
  info: RequestBodyInterface,
  chainId?: number
) {
  return baseRequestGetWithHeader(
    `${serviceBaseURL(
      chainId
    )}/copy/future/info?walletAddress=${walletAddress}&kolAddress=${kolAddress}`,
    info
  );
}
export function copyAsset(
  walletAddress: string,
  kolAddress: string,
  info: RequestBodyInterface,
  chainId?: number
) {
  return baseRequestGetWithHeader(
    `${serviceBaseURL(
      chainId
    )}/copy/follower/asset?walletAddress=${walletAddress}&kolAddress=${kolAddress}`,
    info
  );
}
