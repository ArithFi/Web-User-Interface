export class SaveLoadAdapter {
  chainId: number;
  charts: any[] | undefined;
  setTvCharts: (a: any[]) => void;
  changeTokenPair: (token: any) => void;

  constructor(
    chainId: number,
    charts: any[] | undefined,
    setTvCharts: (a: any[]) => void,
    changeTokenPair: (token: any) => void,
  ) {
    this.charts = charts;
    this.setTvCharts = setTvCharts;
    this.chainId = chainId;
    this.changeTokenPair = changeTokenPair;
  }

  getAllCharts() {
    return Promise.resolve(this.charts || []);
  }

  removeChart(id: string) {
    if (!this.charts) return Promise.reject();
    for (let i = 0; i < this.charts.length; ++i) {
      if (this.charts[i].id === id) {
        this.charts.splice(i, 1);
        this.setTvCharts(this.charts);
        return Promise.resolve();
      }
    }

    return Promise.reject();
  }

  saveChart(chartData: any) {
    if (!chartData.id) {
      chartData.id = Math.random().toString();
    } else {
      this.removeChart(chartData.id);
    }

    chartData.timestamp = new Date().valueOf();

    if (this.charts) {
      this.charts.push(chartData);
      this.setTvCharts(this.charts);
    }

    return Promise.resolve(chartData.id);
  }

  getChartContent(id: string) {
    if (!this.charts) return Promise.reject();
    for (let i = 0; i < this.charts.length; ++i) {
      if (this.charts[i].id === id) {
        const {content, symbol} = this.charts[i];
        this.changeTokenPair(symbol);
        return Promise.resolve(content);
      }
    }
    return Promise.reject();
  }
}