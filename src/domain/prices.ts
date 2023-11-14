async function fetchWithTimeout(resource: string, options: any = {}) {
  const { timeout = 8000 } = options;

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  const response = await fetch(resource, {
    ...options,
    signal: controller.signal
  });
  clearTimeout(id);
  return response;
}

export async function getChartPricesFromBinance(symbol: string, period: string, limit: number) {
  try {
    const response = await fetchWithTimeout(`https://db.arithfi.com/api/oracle/price/klines?symbol=${symbol}USDT&limit=${limit}&interval=${period}`, {
      method: "GET",
      timeout: 1000,
    });
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
    const response = await fetchWithTimeout(`https://db.arithfi.com/api/oracle/price/${symbol.toLowerCase()}usdt`, {
      method: "GET",
      timeout: 1000,
    });
    const data = await response.json();
    return data.value;
  } catch (e) {
    console.log(`Error fetching data: ${e}`);
  }
}

export async function get24HrFromBinance(symbol: string) {
  try {
    const res = await fetchWithTimeout(`https://db.arithfi.com/api/oracle/price/ticker/24hr?symbol=${symbol}USDT`, {
      method: "GET",
      timeout: 1000,
    });
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