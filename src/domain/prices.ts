import { serviceBaseURL } from "../lib/ArithFiRequest";

export async function getChartPricesFromBinance(
  symbol: string,
  period: string,
  limit: number,
  chainId?: number
) {
  const symbolList = symbol.split("/");
  try {
    const response = await fetch(
      `${serviceBaseURL(
        chainId
      )}/oracle/klines?product=${symbol}&limit=${limit}&interval=${period}`
    );
    const data = await response.json();
    return data.data.map((price: any) => {
      return {
        time: Number(price[0]) / 1000,
        open: Number(price[1]),
        close: Number(price[4]),
        high: Number(price[2]),
        low: Number(price[3]),
        volume: Number(price[5]),
      };
    });
  } catch (error) {
    console.log(`Error fetching data: ${error}`);
    if (symbol.includes("/USDT")) {
      const response = await fetch(
        `https://api.binance.com/dapi/v3/klines?symbol=${symbolList[0]}${symbolList[1]}&interval=${period}&limit=${limit}`
      );
      const prices = await response.json();
      return prices.map((price: any) => {
        return {
          time: Number(price[0]) / 1000,
          open: Number(price[1]),
          close: Number(price[4]),
          high: Number(price[2]),
          low: Number(price[3]),
          volume: Number(price[5]),
        };
      });
    }
    return null;
  }
}

export async function getCurrentPriceOfToken(symbol: string, chainId?: number) {
  const symbolList = symbol.split("/");
  try {
    const response = await fetch(
      `${serviceBaseURL(chainId)}/oracle/price?product=${symbol}`
    );
    const data = await response.json();
    return data.data;
  } catch (e) {
    console.log(`Error fetching data: ${e}`);
    if (symbol.includes("/USDT")) {
      const response = await fetch(
        `https://api.binance.com/dapi/v3/ticker/price?symbol=${symbolList[0]}${symbolList[1]}`
      );
      const data = await response.json();
      return data.price;
    }
    return null;
  }
}

export async function get24HrFromBinance(symbol: string, chainId?: number) {
  const symbolList = symbol.split("/");
  try {
    const res = await fetch(
      `${serviceBaseURL(chainId)}/oracle/ticker24hr?product=${symbol}`
    );
    const data = await res.json();
    if (data.data) {
      return {
        priceChangePercent: data.data.priceChangePercent,
        highPrice: data.data.highPrice,
        lowPrice: data.data.lowPrice,
      };
    }
    return null;
  } catch (e) {
    console.log(`Error fetching data: ${e}`);
    if (symbol.includes("/USDT")) {
      const res = await fetch(
        `https://api.binance.com/dapi/v3/ticker/24hr?symbol=${symbolList[0]}${symbolList[1]}`
      );
      const data = await res.json();
      if (data) {
        return {
          priceChangePercent: data.priceChangePercent,
          highPrice: data.highPrice,
          lowPrice: data.lowPrice,
        };
      }
    }
    return null;
  }
}
