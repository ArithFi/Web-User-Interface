export async function getChartPricesFromBinance(
  symbol: string,
  period: string,
  limit: number
) {
  const symbolList = symbol.split("/");
  try {
    const response = await fetch(
      `https://cms.nestfi.net/api/oracle/price/klines?symbol=${symbolList[0]}${symbolList[1]}&limit=${limit}&interval=${period}`
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
  } catch (error) {
    console.log(`Error fetching data: ${error}`);
    if (symbol.includes('/USDT')) {
      const response = await fetch(
        `https://api.binance.com/api/v3/klines?symbol=${symbolList[0]}${symbolList[1]}&interval=${period}&limit=${limit}`
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

export async function getCurrentPriceOfToken(symbol: string) {
  const symbolList = symbol.split("/");
  try {
    const response = await fetch(
      `https://cms.nestfi.net/api/oracle/price/${symbolList[0]}${symbolList[1]}`
    );
    const data = await response.json();
    return data.value;
  } catch (e) {
    console.log(`Error fetching data: ${e}`);
    if (symbol.includes('/USDT')) {
      const response = await fetch(
        `https://api.binance.com/api/v3/ticker/price?symbol=${symbolList[0]}${symbolList[1]}`
      );
      const data = await response.json();
      return data.price;
    }
    return null;
  }
}

export async function get24HrFromBinance(symbol: string) {
  const symbolList = symbol.split("/");
  try {
    const res = await fetch(
      `https://cms.nestfi.net/api/oracle/price/ticker/24hr?symbol=${symbolList[0]}${symbolList[1]}`
    );
    const data = await res.json();
    if (data) {
      return {
        priceChangePercent: data.priceChangePercent,
        highPrice: data.highPrice,
        lowPrice: data.lowPrice,
      };
    }
    return null;
  } catch (e) {
    console.log(`Error fetching data: ${e}`);
    if (symbol.includes('/USDT')) {
      const res = await fetch(
        `https://api.binance.com/api/v3/ticker/24hr?symbol=${symbolList[0]}${symbolList[1]}`
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
