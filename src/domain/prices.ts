export async function getChartPricesFromBinance(symbol: string, period: string, limit: number) {
  try {
    // const response = await fetch(`https://db.arithfi.com/api/oracle/price/klines?symbol=${symbol}USDT&limit=${limit}&interval=${period}`);
    const response = await fetch(`https://api.binance.com/api/v3/klines?symbol=${symbol}USDT&interval=${period}&limit=${limit}`);
    const prices = await response.json();
    return prices.map((price: any) => {
      return {
        time: price[0] / 1000,
        open: Number(price[1]),
        close: Number(price[4]),
        high: Number(price[2]),
        low: Number(price[3]),
      }
    });
  } catch (error) {
    console.log(`Error fetching data: ${error}`);
  }
}

export async function getChartPricesFromBinanceFutures(symbol: string, period: string, limit: number) {
  try {
    // const response = await fetch(`https://db.arithfi.com/api/oracle/price/klines?symbol=${symbol}USDT&limit=${limit}&interval=${period}`);
    const response = await fetch(`https://fapi.binance.com/fapi/v1/klines?symbol=${symbol}USDT&interval=${period}&limit=${limit}`);
    const prices = await response.json();
    return prices.map((price: any) => {
      return {
        time: price[0] / 1000,
        open: Number(price[1]),
        close: Number(price[4]),
        high: Number(price[2]),
        low: Number(price[3]),
      }
    });
  } catch (error) {
    console.log(`Error fetching data: ${error}`);
  }
}

export async function getCurrentPriceOfToken(symbol: string) {
  try {
    // const response = await fetch(`https://db.arithfi.com/api/oracle/price/${symbol.toLowerCase()}usdt`);
    const response = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${symbol}USDT`);
    const data = await response.json();
    return data.price;
  } catch (e) {
    console.log(`Error fetching data: ${e}`);
  }
}

export async function getCurrentPriceOfTokenFutures(symbol: string) {
  try {
    // const response = await fetch(`https://db.arithfi.com/api/oracle/price/${symbol.toLowerCase()}usdt`);
    const response = await fetch(`https://fapi.binance.com/fapi/v1/ticker/price?symbol=${symbol}USDT`);
    const data = await response.json();
    return data.price;
  } catch (e) {
    console.log(`Error fetching data: ${e}`);
  }
}

export async function get24HrFromBinance(symbol: string) {
  try {
    // const res = await fetch(`https://db.arithfi.com/api/oracle/price/ticker/24hr?symbol=${symbol}USDT`);
    const res = await fetch(`https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol}USDT`);
    const data = await res.json();
    if (data) {
      return {
        priceChangePercent: data.priceChangePercent,
        highPrice: data.highPrice,
        lowPrice: data.lowPrice
      }
    }
    return null;
  } catch (e) {
    console.log(`Error fetching data: ${e}`);
  }
}

export async function get24HrFromBinanceFutures(symbol: string) {
  try {
    // const res = await fetch(`https://db.arithfi.com/api/oracle/price/ticker/24hr?symbol=${symbol}USDT`);
    const res = await fetch(`https://fapi.binance.com/fapi/v1/ticker/24hr?symbol=${symbol}USDT`);
    const data = await res.json();
    if (data) {
      return {
        priceChangePercent: data.priceChangePercent,
        highPrice: data.highPrice,
        lowPrice: data.lowPrice
      }
    }
    return null;
  } catch (e) {
    console.log(`Error fetching data: ${e}`);
  }
}