import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { HidePriceTable, SelectedTokenDown } from "../../components/icons";
import SelectListMenu from "../../components/SelectListMemu/SelectListMenu";
import useWindowWidth, { WidthType } from "../../hooks/useWindowWidth";
import { FuturesPrice, FuturesPricePercent } from "./Futures";
import TVChartContainer from "../../components/TVChartContainer/TVChartContainer";
import { TVDataProvider } from "../../domain/tradingview/TVDataProvider";
import { formatAmount, numberWithCommas } from "../../lib/numbers";
import { styled } from "@mui/material";
import { get24HrFromBinance } from "../../domain/prices";
import { Trans } from "@lingui/macro";
import TokenListBaseView from "./TokenList/TokenListBaseView";
import TokenListModal from "./TokenList/TokenListModal";
import useService from "../../contracts/useService";

interface ExchangeTVChartProps {
  tokenPair: string;
  basePrice?: FuturesPrice;
  basePricePercent?: FuturesPricePercent;
  changeTokenPair: (value: string) => void;
  forexOpen: boolean;
}

const ChartDataTitle = styled("div")(({ theme }) => ({
  fontSize: "12px",
  color: theme.normal.text2,
}));

const ChartDataValue = styled("div")(({ theme }) => ({
  fontSize: "16px",
  color: theme.normal.text0,
}));

const TokenPairIcon = (
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6 10.5C6 9.39543 6.89543 8.5 8 8.5H40C41.1046 8.5 42 9.39543 42 10.5C42 11.6046 41.1046 12.5 40 12.5H8C6.89543 12.5 6 11.6046 6 10.5Z"
      fill="#333333"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M22 19.5C22 18.3954 22.8954 17.5 24 17.5H40C41.1046 17.5 42 18.3954 42 19.5C42 20.6046 41.1046 21.5 40 21.5H24C22.8954 21.5 22 20.6046 22 19.5Z"
      fill="#333333"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M22 28.5C22 27.3954 22.8954 26.5 24 26.5H40C41.1046 26.5 42 27.3954 42 28.5C42 29.6046 41.1046 30.5 40 30.5H24C22.8954 30.5 22 29.6046 22 28.5Z"
      fill="#333333"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6 37.5C6 36.3954 6.89543 35.5 8 35.5H40C41.1046 35.5 42 36.3954 42 37.5C42 38.6046 41.1046 39.5 40 39.5H8C6.89543 39.5 6 38.6046 6 37.5Z"
      fill="#333333"
    />
    <path
      d="M16.2338 19C17.0111 19 17.4912 19.848 17.0913 20.5145L12.8575 27.5708C12.4691 28.2182 11.5309 28.2182 11.1425 27.5708L6.9087 20.5145C6.50878 19.848 6.9889 19 7.76619 19H16.2338Z"
      fill="#333333"
    />
  </svg>
);

const UpIcon = (
  <svg
    width="8"
    height="8"
    viewBox="0 0 8 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.43118 1.55296C3.69114 1.12764 4.30888 1.12764 4.56884 1.55296L7.07448 5.65241C7.346 6.09664 7.02629 6.66675 6.50565 6.66675H1.49437C0.97373 6.66675 0.654023 6.09664 0.925545 5.65241L3.43118 1.55296Z"
      fill="#030308"
      fillOpacity="0.6"
    />
  </svg>
);

const DownIcon = (
  <svg
    width="8"
    height="8"
    viewBox="0 0 8 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.56882 6.44704C4.30886 6.87236 3.69112 6.87236 3.43116 6.44704L0.925525 2.34759C0.654003 1.90336 0.973712 1.33325 1.49435 1.33325L6.50563 1.33325C7.02627 1.33325 7.34598 1.90336 7.07446 2.34759L4.56882 6.44704Z"
      fill="#030308"
      fillOpacity="0.6"
    />
  </svg>
);

const ExchangeTVChart: FC<ExchangeTVChartProps> = ({ ...props }) => {
  const { width, isBigMobile } = useWindowWidth();
  const [isHide, setIsHide] = useState(false);
  const [openTokenListModal, setOpenTokenListModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [favPairs, setFavPairs] = useState<Array<string>>([]);
  const { favorites } = useService();
  const getFavPairs = useCallback(async () => {
    favorites((result: Array<string>) => {
      setFavPairs(result);
    });
  }, [favorites]);

  useEffect(() => {
    getFavPairs();
  }, [getFavPairs]);

  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    getFavPairs();
  };
  const height = useMemo(() => {
    switch (width) {
      case WidthType.ssm:
      case WidthType.sm:
        return 320;
      case WidthType.md:
      case WidthType.lg:
        return 420;
      default:
        return 420;
    }
  }, [width]);
  const TokenIcon = props.tokenPair.split("/")[0].getToken()!.icon;
  const RightTokenIcon = props.tokenPair.split("/")[1].getToken()!.icon;
  const dataProvider = useRef();
  const [hr, setHr] = useState({
    priceChangePercent: "",
    highPrice: "",
    lowPrice: "",
  });
  // const defaultPriceListTab = useMemo(() => {
  //   const index = priceToken.indexOf(props.tokenPair)

  // }, [])

  // const tokenPairList = useMemo(() => {
  //   return priceToken
  //     .map((item) => {
  //       const token = item.getToken();
  //       return {
  //         icon1: token!.icon,
  //         icon2: USDTLogo,
  //         title: `${token!.symbol}/USDT`,
  //       };
  //     })
  //     .map((item, index) => {
  //       return (
  //         <Stack
  //           key={`SelectTokenList + ${index}`}
  //           direction={"row"}
  //           alignItems={"center"}
  //           sx={(theme) => ({
  //             height: "40px",
  //             paddingX: "20px",
  //             "&:hover": {
  //               background: theme.normal.bg1,
  //             },
  //           })}
  //         >
  //           <TwoIconWithString
  //             icon1={item.icon1}
  //             icon2={item.icon2}
  //             title={item.title.split("/")[0]}
  //             selected={item.title === props.tokenPair}
  //             onClick={() => {
  //               props.changeTokenPair(item.title);
  //               handleClose();
  //             }}
  //           />
  //         </Stack>
  //       );
  //     });
  // }, [props]);

  const average = useMemo(() => {
    if (props.tokenPair && props.basePrice) {
      return formatAmount(
        props.basePrice?.[props.tokenPair],
        18,
        props.tokenPair.split("/")[0].getTokenPriceDecimals()
      );
    }
    return "-";
  }, [props.tokenPair, props.basePrice]);

  const fetchHr = useCallback(async () => {
    const data = await get24HrFromBinance(props.tokenPair);
    if (data) {
      setHr({
        priceChangePercent: String(data.priceChangePercent),
        highPrice: String(data.highPrice),
        lowPrice: String(data.lowPrice),
      });
    }
  }, [props.tokenPair]);

  useEffect(() => {
    fetchHr();
    const interval = setInterval(() => {
      fetchHr();
    }, 1_000);
    return () => clearInterval(interval);
  }, [fetchHr]);

  useEffect(() => {
    // @ts-ignore
    dataProvider.current = new TVDataProvider();
  }, []);

  const mobileTop = useMemo(() => {
    return (
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        height={"48px"}
        paddingY={"12px"}
        paddingX={"16px"}
      >
        <TokenListModal
          open={openTokenListModal}
          onClose={() => {
            setOpenTokenListModal(false);
            getFavPairs();
          }}
          changeTokenPair={(value: string) => {
            props.changeTokenPair(value);
            setOpenTokenListModal(false);
          }}
          favList={favPairs}
          basePrice={props.basePrice}
          basePricePercent={props.basePricePercent}
          forexOpen={props.forexOpen}
        />
        <Stack spacing={"8px"} direction={"row"} alignItems={"center"}>
          <Box
            sx={(theme) => ({
              width: "24px",
              height: "24px",
              "& svg": {
                width: "24px",
                height: "24px",
                display: "block",
                "& path": {
                  fill: theme.normal.text2,
                },
              },
            })}
            component={"button"}
            onClick={() => setOpenTokenListModal(true)}
          >
            {TokenPairIcon}
          </Box>
          <Box
            component={"p"}
            sx={(theme) => ({
              fontSize: 16,
              fontWeight: 700,
              color: theme.normal.text1,
              lineHeight: "22px",
            })}
          >
            {props.tokenPair}
          </Box>
          <Box
            component={"p"}
            sx={(theme) => ({
              fontSize: 16,
              fontWeight: 700,
              color:
                Number(hr.priceChangePercent) >= 0
                  ? theme.normal.success
                  : theme.normal.danger,
            })}
          >
            {props.basePrice?.[props.tokenPair] ? average : "-"}
          </Box>
          <Box
            sx={(theme) => ({
              height: "22px",
              padding: "4px",
              borderRadius: "4px",
              backgroundColor:
                Number(hr.priceChangePercent) >= 0
                  ? theme.normal.success_light_hover
                  : theme.normal.danger_light_hover,
              color:
                Number(hr.priceChangePercent) >= 0
                  ? theme.normal.success
                  : theme.normal.danger,
              fontWeight: "400",
              fontSize: "10px",
              lineHeight: "14px",
            })}
          >
            {hr.priceChangePercent
              ? `${Number(hr.priceChangePercent).floor(4)}%`
              : "-"}
          </Box>
        </Stack>
        <Stack
          spacing={"8px"}
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          component={"button"}
          onClick={() => setIsHide(!isHide)}
        >
          <Box
            sx={(theme) => ({
              width: "20px",
              height: "20px",
              "& svg": {
                width: "20px",
                height: "20px",
                display: "block",
                "& path": {
                  fill: theme.normal.text2,
                },
              },
            })}
          >
            <HidePriceTable />
          </Box>
          <Box
            sx={(theme) => ({
              "& svg path": {
                fill: theme.normal.text3,
              },
            })}
          >
            {isHide ? DownIcon : UpIcon}
          </Box>
        </Stack>
      </Stack>
    );
  }, [
    average,
    favPairs,
    getFavPairs,
    hr.priceChangePercent,
    isHide,
    openTokenListModal,
    props,
  ]);

  const topPair = useMemo(() => {
    if (isBigMobile) {
      return <></>;
    } else {
      const topPairItem = (tokenPair: string) => {
        const token = tokenPair.split("/")[0];
        const TokenIcon = token.getToken()!.icon;
        const percent = props.basePricePercent
          ? Number(props.basePricePercent[tokenPair].floor(4))
          : undefined;
        return (
          <Stack
            key={`TopPairItem+${tokenPair}`}
            direction={"row"}
            spacing={"8px"}
            alignItems={"center"}
            component={"button"}
            onClick={() => {
              props.changeTokenPair(tokenPair);
            }}
            sx={{
              cursor: "pointer",
            }}
          >
            <Box
              sx={{
                width: "16px",
                height: "16px",
                "& svg": {
                  width: "16px",
                  height: "16px",
                  display: "block",
                },
              }}
            >
              <TokenIcon />
            </Box>
            <Stack direction={"row"} spacing={"4px"} alignItems={"center"}>
              <Box
                sx={(theme) => ({
                  fontWeight: "700",
                  fontSize: "14px",
                  lineHeight: "20px",
                  color: theme.normal.text1,
                })}
              >
                {tokenPair}
              </Box>
              <Box
                sx={(theme) => ({
                  color:
                    (percent ?? 0) >= 0
                      ? theme.normal.success
                      : theme.normal.danger,
                  fontWeight: "700",
                  fontSize: "12px",
                  lineHeight: "16px",
                  width: "47px",
                })}
              >
                {percent
                  ? `${(percent ?? 0) >= 0 ? "+" : ""}${percent}%`
                  : String().placeHolder}
              </Box>
            </Stack>
          </Stack>
        );
      };
      const topPairsDefault = ["ETH/USDT", "BTC/USDT", "BNB/USDT", "MATIC/USDT", "AUD/USD"]
      const topPairsAddFav = [
        ...favPairs,
        ...topPairsDefault.filter((item) => favPairs.indexOf(item) === -1),
      ];
      const topPairs = topPairsAddFav
        .slice(0, 5);

      return (
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          sx={(theme) => ({
            paddingX: "20px",
            width: "100%",
            height: "52px",
            borderRadius: "12px",
            border: `1px solid ${theme.normal.border}`,
          })}
        >
          {topPairs.map((item) => {
            return topPairItem(item);
          })}
        </Stack>
      );
    }
  }, [favPairs, isBigMobile, props]);

  return (
    <Stack width={"100%"} spacing={"16px"}>
      {topPair}

      <Stack
        width={"100%"}
        sx={(theme) => ({
          border: isBigMobile ? `0px` : `1px solid ${theme.normal.border}`,
          borderRadius: isBigMobile ? "0px" : "12px",
        })}
      >
        {isBigMobile ? (
          mobileTop
        ) : (
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Stack direction={"row"} alignItems={"center"} spacing={"40px"}>
              <Stack
                direction={"row"}
                justifyContent={"flex-start"}
                alignItems={"center"}
                spacing={"12px"}
                sx={{
                  width: "200px",
                  paddingX: "20px",
                  paddingY: isBigMobile ? "16px" : "24px",
                  "&:hover": { cursor: "pointer" },
                }}
                aria-controls={"SelectTokenPair-menu"}
                aria-haspopup="true"
                aria-expanded={"true"}
                onClick={handleClick}
              >
                <Stack
                  direction={"row"}
                  sx={{
                    "& svg": {
                      width: "24px",
                      height: "24px",
                      display: "block",
                      position: "relative",
                      zIndex: 5,
                    },
                    "& svg + svg": { marginLeft: "-8px", zIndex: 4 },
                  }}
                >
                  <TokenIcon />
                  <RightTokenIcon />
                </Stack>
                <Stack spacing={0}>
                  <Box
                    component={"p"}
                    sx={(theme) => ({
                      fontSize: 14,
                      fontWeight: 700,
                      color: theme.normal.text1,
                    })}
                  >
                    {props.tokenPair}
                  </Box>
                  <Box
                    component={"p"}
                    sx={(theme) => ({
                      fontSize: 16,
                      fontWeight: 700,
                      color:
                        Number(hr.priceChangePercent) >= 0
                          ? theme.normal.success
                          : theme.normal.danger,
                    })}
                  >
                    {props.basePrice?.[props.tokenPair] ? average : "-"}
                  </Box>
                </Stack>
                <Box
                  sx={(theme) => ({
                    "& svg": {
                      width: "16px",
                      height: "16px",
                      display: "block",
                      "& path": {
                        fill: theme.normal.text2,
                      },
                    },
                  })}
                >
                  <SelectedTokenDown />
                </Box>
              </Stack>
              <Box>
                <ChartDataTitle>
                  <Trans>24h Change</Trans>
                </ChartDataTitle>
                <ChartDataValue
                  sx={(theme) => ({
                    color:
                      Number(hr.priceChangePercent) >= 0
                        ? theme.normal.success
                        : theme.normal.danger,
                  })}
                >
                  {hr.priceChangePercent
                    ? `${Number(hr.priceChangePercent).floor(4)}%`
                    : "-"}
                </ChartDataValue>
              </Box>
              <Box>
                <ChartDataTitle>
                  <Trans>24h High</Trans>
                </ChartDataTitle>
                <ChartDataValue>
                  {hr.highPrice
                    ? numberWithCommas(
                        Number(hr.highPrice).toFixed(
                          props.tokenPair.split("/")[0].getTokenPriceDecimals()
                        )
                      )
                    : "-"}
                </ChartDataValue>
              </Box>
              <Box>
                <ChartDataTitle>
                  <Trans>24h Low</Trans>
                </ChartDataTitle>
                <ChartDataValue>
                  {hr.lowPrice
                    ? numberWithCommas(
                        Number(hr.lowPrice).toFixed(
                          props.tokenPair.split("/")[0].getTokenPriceDecimals()
                        )
                      )
                    : "-"}
                </ChartDataValue>
              </Box>
            </Stack>
            <Box
              component={"button"}
              onClick={() => setIsHide(!isHide)}
              sx={(theme) => ({
                width: "40px",
                height: "40px",
                borderRadius: "8px",
                border: `1px solid ${
                  isHide ? theme.normal.grey : theme.normal.border
                }`,
                boxSizing: "border-box",
                marginRight: "20px",
                background: isHide ? theme.normal.grey : "transparent",
                "& svg": {
                  width: "24px",
                  height: "24px",
                  display: "block",
                  margin: "0 auto",
                },
                "& svg path": {
                  fill: theme.normal.text2,
                },
                "&:hover": {
                  cursor: "pointer",
                  border: 0,
                  background: isHide
                    ? theme.normal.grey_light_hover
                    : theme.normal.grey_hover,
                  "& svg path": {
                    fill: theme.normal.text0,
                  },
                },
                "&:active": {
                  border: 0,
                  background: isHide
                    ? theme.normal.grey_light_active
                    : theme.normal.grey_active,
                  "& svg path": {
                    fill: theme.normal.text0,
                  },
                },
                "@media (hover:none)": {
                  "&:hover": {
                    border: `1px solid ${
                      isHide ? theme.normal.grey : theme.normal.border
                    }`,
                    background: isHide ? theme.normal.grey : "transparent",
                    "& svg path": {
                      fill: theme.normal.text2,
                    },
                  },
                },
              })}
            >
              <HidePriceTable />
            </Box>
          </Stack>
        )}

        <SelectListMenu
          id="SelectTokenPair-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          sx={(theme) => ({
            "& .MuiPaper-root": {
              paddingX: "16px",
            },
          })}
        >
          <TokenListBaseView
            changeTokenPair={(value: string) => {
              props.changeTokenPair(value);
              handleClose();
            }}
            favList={favPairs}
            basePrice={props.basePrice}
            basePricePercent={props.basePricePercent}
            forexOpen={props.forexOpen}
          />
          {/* <Stack>{tokenPairList}</Stack> */}
        </SelectListMenu>

        {isHide ? (
          <></>
        ) : (
          <Box height={height}>
            <TVChartContainer
              symbol={props.tokenPair}
              dataProvider={dataProvider.current!}
            />
          </Box>
        )}
      </Stack>
    </Stack>
  );
};

export default ExchangeTVChart;
