import {useEffect, useMemo, useRef, useState} from "react";
import {defaultChartProps, disabledFeaturesOnMobile} from "./constants";
import {IChartingLibraryWidget, ResolutionString, Timezone} from "../../charting_library";
import {Box, CircularProgress} from "@mui/material";
import useTheme from "../../hooks/useTheme";
import useWindowWidth from "../../hooks/useWindowWidth";

type Props = {
  symbol: string;
};

export default function TVChartContainer({symbol}: Props) {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const tvWidgetRef = useRef<IChartingLibraryWidget | null>(null);
  const [chartReady, setChartReady] = useState(false);
  const [chartDataLoading, setChartDataLoading] = useState(true);
  const {nowTheme} = useTheme();
  const {isMobile, isBigMobile} = useWindowWidth()

  useEffect(() => {
    const widgetOptions = {
      debug: false,
      symbol: symbol, // Using ref to avoid unnecessary re-renders on symbol change and still have access to the latest symbol
      datafeed: new (window as any).Datafeeds.UDFCompatibleDatafeed(defaultChartProps.datafeedUrl, 1000, {
        maxResponseLength: 500,
        expectedOrder: "latestFirst",
      }),
      theme: nowTheme.isLight ? "Light" : "Dark",
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone as Timezone,
      container: chartContainerRef.current,
      library_path: defaultChartProps.library_path,
      locale: defaultChartProps.locale,
      loading_screen: defaultChartProps.loading_screen,
      enabled_features: defaultChartProps.enabled_features,
      disabled_features: isMobile
        ? defaultChartProps.disabled_features.concat(disabledFeaturesOnMobile)
        : defaultChartProps.disabled_features,
      client_id: defaultChartProps.clientId,
      user_id: defaultChartProps.userId,
      fullscreen: defaultChartProps.fullscreen,
      autosize: defaultChartProps.autosize,
      custom_css_url: defaultChartProps.custom_css_url,
      overrides: defaultChartProps.overrides,
      favorites: defaultChartProps.favorites,
      custom_formatters: defaultChartProps.custom_formatters,
      studies_overrides: {
        "volume.volume.color.0": "#FF4F33",
        "volume.volume.color.1": "#36C56E",
        "volume.volume.linewidth": 3,
        "volume.volume.transparency": 60,
      },
    };
    tvWidgetRef.current = new window.TradingView.widget(widgetOptions);
    tvWidgetRef.current!.onChartReady(function () {
      setChartReady(true);
      if (nowTheme.isLight && isBigMobile) {
        tvWidgetRef.current!.applyOverrides({
          "paneProperties.background": "rgba(240, 241, 245, 1)",
          "paneProperties.backgroundType": "solid",
        });
      } else if (nowTheme.isLight && !isBigMobile) {
        tvWidgetRef.current!.applyOverrides({
          "paneProperties.background": "#ffffff",
          "paneProperties.backgroundType": "solid",
        });
      }
      // @ts-ignore
      // tvWidgetRef.current?.activeChart().createStudy("Volume", false, false, tvWidgetRef.current?.activeChart().resolution()
      //   , {
      //     "length": 5,
      //     "showLabelsOnPriceScale": false,
      //   }, {})
      tvWidgetRef.current?.activeChart().dataReady(() => {
        setChartDataLoading(false);
      });
    });
    return () => {
      if (tvWidgetRef.current) {
        tvWidgetRef.current.remove();
        tvWidgetRef.current = null;
        setChartDataLoading(true);
      }
    };
  }, [nowTheme, isMobile]);

  useEffect(() => {
    if (!symbol) return
    if (chartReady && !chartDataLoading) {
      tvWidgetRef.current?.setSymbol(symbol, '1D' as ResolutionString, () => {})
    }
  }, [symbol, chartReady, chartDataLoading]);

  const view = useMemo(() => (
    <Box sx={(theme) => ({
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
      position: 'relative',
      borderTop: `1px solid ${theme.normal.border}`,
      "& svg": {
        display: "block",
        color: theme.normal.primary,
      }
    })}>
      {chartDataLoading && <CircularProgress size={'44px'}/>}
      <div
        style={{
          visibility: !chartDataLoading ? "visible" : "hidden",
          borderRadius: "11px",
          overflow: 'hidden',
          position: 'absolute', bottom: 0, left: 0, right: 0, top: 0
        }}
        ref={chartContainerRef}
      />
    </Box>
  ), [chartDataLoading])

  return (
    view
  )
}