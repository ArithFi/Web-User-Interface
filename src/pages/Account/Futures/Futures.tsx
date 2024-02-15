import Stack from "@mui/material/Stack";
import Menu from "../Share/Menu";
import {DateRange, Range} from "react-date-range";
import {Grid} from "@mui/material";
import {t, Trans} from "@lingui/macro";
import DailyReturnChart from "./Components/DailyReturnChart";
import VolumeChart from "./Components/VolumeChart";
import CumulativeReturnChart from "./Components/CumulativeReturnChart";
import TotalAssetValueChart from "./Components/TotalAssetValueChart";
import {useEffect, useMemo, useState} from "react";
import useTheme from "../../../hooks/useTheme";
import useArithFi from "../../../hooks/useArithFi";
import Box from "@mui/material/Box";
import MobileMenu from "../Share/MobileMenu";
import ShareMyDealModal from "../../Dashboard/Modal/ShareMyDealModal";
import useSWR from "swr";
import {Link, useSearchParams} from "react-router-dom";
import useReadSwapAmountOut from "../../../contracts/Read/useReadSwapContractOnBsc";
import {BigNumber} from "ethers";
import {serviceBaseURL} from "../../../lib/ArithFiRequest";
import {ATFToken, USDTToken} from "../../../contracts/contractAddress";

const Futures = () => {
  const [showrdr, setShowrdr] = useState(false);
  const {account, checkSigned, chainsData, signature} = useArithFi();
  const {nowTheme} = useTheme();
  const [range, setRange] = useState<Range[]>([
    {
      startDate: new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [showShareMyDealModal, setShareMyDealModal] = useState(false);
  let [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get('address');
  const [ showNumber, setShowNumber ] = useState(searchParams.get("mode") === "public");

  const {
    uniSwapAmountOut,
    uniSwapAmountOutRefetch,
  } = useReadSwapAmountOut(BigNumber.from("1".stringToBigNumber(18)!), [ATFToken[chainsData.chainId!], USDTToken[chainsData.chainId!]]);

  const price = (uniSwapAmountOut?.[1].div(BigNumber.from("1".stringToBigNumber(12)!)).toNumber() || 0) / 1e6

  const { data } = useSWR((account || q) ? `${serviceBaseURL(chainsData.chainId)}/user/account/futures?walletAddress=${q || account.address}` : undefined,
    (url: any) => fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": signature?.signature || ""
      }
    })
      .then(res => res.json())
      .then(res => res.data));

  const showData = [
    {
      name: t`Position Value`,
      value: data?.position_value || 0,
    },
    {
      name: t`Unrealized PNL`,
      value: data?.unrealized_pnl || 0,
      roi: (data?.unrealized_roi * 100) || 0,
    },
    {
      name: t`Today's PNL`,
      value: data?.pnl_1d || 0,
      roi: (data?.roi_1d * 100) || 0,
    },
    {
      name: t`7 Day's PNL`,
      value: data?.pnl_7d || 0,
      roi: (data?.roi_7d * 100) || 0,
    },
    {
      name: t`30 Day's PNL`,
      value: data?.pnl_30d || 0,
      roi: (data?.roi_30d * 100) || 0,
    },
    {
      name: t`Total Profit & Loss`,
      value: data?.pnl_total || 0,
      roi: (data?.roi_total * 100) || 0,
    },
  ]

  const futures_balance_atf = data ? data?.available_balance + data?.future_order_balance + data?.future_limit_balance : 0
  const futures_balance_usd = futures_balance_atf * price

  const available_balance_atf = data?.available_balance || 0
  const available_balance_usd = available_balance_atf * price

  const position_balance_atf = data?.future_order_balance || 0
  const position_balance_usd = position_balance_atf * price

  const frozen_balance_atf = data?.future_limit_balance || 0
  const frozen_balance_usd = frozen_balance_atf * price

  useEffect(() => {
    if (showNumber) {
      searchParams.set("mode", "public");
      setSearchParams(searchParams);
    } else {
      searchParams.set("mode", "private");
      setSearchParams(searchParams);
    }
  }, [showNumber]);

  useEffect(() => {
    const time = setInterval(() => {
      uniSwapAmountOutRefetch();
    }, 10 * 1000);
    return () => {
      clearInterval(time);
    };
  }, [uniSwapAmountOutRefetch]);

  const shareMyDealModal = useMemo(() => {
    return (
      <ShareMyDealModal
        value={{
          address: q || account.address,
          totalProfitLoss: data?.pnl_total ?? 0,
          totalRate: (data?.roi_total * 100) ?? 0,
          todayPNL: data?.pnl_1d ?? 0,
          todayRate: (data?.roi_1d * 100) ?? 0,
          _7daysPNL: data?.pnl_7d ?? 0,
          _7daysRate: (data?.roi_7d * 100) ?? 0,
          _30daysPNL: data?.pnl_30d ?? 0,
          _30daysRate: (data?.roi_30d * 100) ?? 0,
          from: range?.[0]?.startDate?.toISOString().slice(0, 10),
          to: range?.[0]?.endDate?.toISOString().slice(0, 10),
        }}
        open={showShareMyDealModal}
        onClose={() => {
          setShareMyDealModal(false);
        }}
      />
    );
  }, [
    q,
    account.address,
    data?.pnl_total,
    data?.roi_total,
    data?.pnl_1d,
    data?.roi_1d,
    data?.pnl_7d,
    data?.roi_7d,
    data?.pnl_30d,
    data?.roi_30d,
    range?.[0]?.startDate,
    range?.[0]?.endDate,
    showShareMyDealModal,
  ]);

  return (
    <Stack sx={(theme) => ({
      flexDirection: "row",
      justifyContent: "center",
      width: '100%',
      position: "relative",
      [theme.breakpoints.down(1440)]: {
        justifyContent: 'flex-start',
      },
      [theme.breakpoints.down("md")]: {
        flexDirection: 'column',
      },
    })}>
      {shareMyDealModal}
      <Stack sx={(theme) => ({
        [theme.breakpoints.up("md")]: {
          display: "none",
        }
      })}>
        <MobileMenu />
      </Stack>
      <Stack
        sx={(theme) => ({
          marginTop: '40px',
          marginLeft: '20px',
          [theme.breakpoints.up(1440)]: {
            position: 'absolute',
            top: 0,
            left: 0,
          },
          [theme.breakpoints.down("md")]: {
            display: "none",
          }
        })}
      >
        <Menu/>
      </Stack>
      <Stack
        sx={(theme) => ({
          width: "100%",
          marginTop: '40px',
          paddingX: "16px",
          gap: "40px",
          [theme.breakpoints.up(1640)]: {
            maxWidth: '1200px',
          },
          [theme.breakpoints.between(1440, 1640)]: {
            maxWidth: '984px',
          },
          [theme.breakpoints.down("md")]: {
            flexDirection: "column",
            marginTop: "24px",
            gap: "20px",
            paddingX: "20px",
          }
        })}
      >
        <Stack sx={(theme) => ({
          fontSize: '20px',
          lineHeight: '28px',
          fontWeight: 700,
          color: theme.normal.text0,
          [theme.breakpoints.down("md")]: {
            display: 'none',
          },
        })}>
          <Trans>
            Futures Assets
          </Trans>
        </Stack>
        <Stack sx={(theme) => ({
          width: '100%',
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingBottom: '32px',
          borderBottom: `1px solid ${theme.normal.border}`,
          [theme.breakpoints.down("md")]: {
            flexDirection: "column",
            gap: "24px",
            paddingX: "0",
            paddingTop: '20px',
            borderRadius: '0',
          }
        })}>
          <Stack sx={(theme) => ({
            gap: '12px',
            [theme.breakpoints.down("md")]: {
              alignItems: 'center',
            }
          })}>
            <Stack fontSize={'16px'} lineHeight={'22px'} fontWeight={'400'} direction={'row'} alignItems={'center'}
                   gap={'8px'} sx={(theme) => ({color: theme.normal.text1})}>
              Total Assets
              <Stack onClick={() => setShowNumber(!showNumber)}
                     sx={(theme) => ({
                       cursor: 'pointer',
                       '&:hover': {
                         svg: {
                           path: {
                             fill: theme.normal.primary,
                           }
                         }
                       }
                     })}>
                {
                  showNumber ? (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd"
                            d="M2.86035 5.48677C4.10971 4.45119 5.9268 3.33337 7.99984 3.33337C10.0729 3.33337 11.89 4.45119 13.1393 5.48677C13.7735 6.0124 14.285 6.53651 14.6382 6.92917C14.8152 7.12594 14.9535 7.29083 15.0486 7.40795C15.0962 7.46653 15.133 7.51325 15.1585 7.54612C15.1713 7.56256 15.1813 7.57554 15.1883 7.58483L15.1968 7.59595L15.1993 7.59938L15.2005 7.60099C15.2005 7.60099 15.2008 7.60134 14.6665 8.00004C15.2008 8.39874 15.2005 8.39909 15.2005 8.39909L15.1993 8.40071L15.1968 8.40413L15.1883 8.41525C15.1813 8.42454 15.1713 8.43752 15.1585 8.45396C15.133 8.48683 15.0962 8.53355 15.0486 8.59214C14.9535 8.70925 14.8152 8.87415 14.6382 9.07091C14.285 9.46358 13.7735 9.98768 13.1393 10.5133C11.89 11.5489 10.0729 12.6667 7.99984 12.6667C5.9268 12.6667 4.10971 11.5489 2.86035 10.5133C2.22621 9.98768 1.71469 9.46358 1.36144 9.07091C1.18443 8.87415 1.04615 8.70925 0.951062 8.59214C0.903494 8.53355 0.866662 8.48683 0.841125 8.45396C0.828354 8.43752 0.818401 8.42454 0.811336 8.41525L0.80291 8.40413L0.800335 8.40071L0.799127 8.39909C0.799127 8.39909 0.798862 8.39874 1.33317 8.00004C0.798862 7.60134 0.799127 7.60099 0.799127 7.60099L0.800335 7.59938L0.80291 7.59595L0.811336 7.58483C0.818401 7.57554 0.828354 7.56256 0.841125 7.54612C0.866662 7.51325 0.903494 7.46653 0.951062 7.40795C1.04615 7.29083 1.18443 7.12594 1.36144 6.92917C1.71469 6.53651 2.22621 6.0124 2.86035 5.48677ZM1.33317 8.00004L0.798862 7.60134C0.622384 7.83785 0.622384 8.16223 0.798862 8.39874L1.33317 8.00004ZM2.19463 8.00004C2.24247 8.05535 2.29523 8.11529 2.3527 8.17917C2.67415 8.53651 3.13894 9.0124 3.71123 9.48677C4.87473 10.4512 6.39098 11.3334 7.99984 11.3334C9.6087 11.3334 11.1249 10.4512 12.2884 9.48677C12.8607 9.0124 13.3255 8.53651 13.647 8.17917C13.7044 8.11529 13.7572 8.05535 13.805 8.00004C13.7572 7.94474 13.7044 7.88479 13.647 7.82091C13.3255 7.46358 12.8607 6.98768 12.2884 6.51331C11.1249 5.54889 9.6087 4.66671 7.99984 4.66671C6.39098 4.66671 4.87473 5.54889 3.71123 6.51331C3.13894 6.98768 2.67415 7.46358 2.3527 7.82091C2.29523 7.88479 2.24247 7.94474 2.19463 8.00004ZM14.6665 8.00004L15.2008 8.39874C15.3773 8.16223 15.3773 7.83785 15.2008 7.60134L14.6665 8.00004Z"
                            fill="currentColor" fillOpacity="0.6"/>
                      <path fillRule="evenodd" clipRule="evenodd"
                            d="M5.6665 8.00004C5.6665 6.71138 6.71118 5.66671 7.99984 5.66671C9.28849 5.66671 10.3332 6.71138 10.3332 8.00004C10.3332 9.2887 9.28849 10.3334 7.99984 10.3334C6.71118 10.3334 5.6665 9.2887 5.6665 8.00004ZM7.99984 7.00004C7.44756 7.00004 6.99984 7.44776 6.99984 8.00004C6.99984 8.55232 7.44756 9.00004 7.99984 9.00004C8.55211 9.00004 8.99984 8.55232 8.99984 8.00004C8.99984 7.44776 8.55211 7.00004 7.99984 7.00004Z"
                            fill="currentColor" fillOpacity="0.6"/>
                    </svg>) : (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd"
                            d="M1.69216 4.74197C2.01875 4.57196 2.42132 4.69889 2.59133 5.02548C2.75383 5.33764 3.01078 5.6471 3.36348 5.93615C4.36269 6.75507 6.04031 7.33331 7.99999 7.33331C9.95966 7.33331 11.6373 6.75508 12.6365 5.93616C12.9892 5.6471 13.2462 5.33763 13.4086 5.02549C13.5786 4.69889 13.9812 4.57196 14.3078 4.74196C14.6344 4.91197 14.7613 5.31454 14.5913 5.64113C14.3307 6.14184 13.9465 6.58646 13.4816 6.96739C12.1887 8.02707 10.1876 8.66664 7.99999 8.66664C5.81232 8.66664 3.81128 8.02707 2.51832 6.96739C2.05348 6.58644 1.66929 6.14184 1.40864 5.64114C1.23864 5.31455 1.36557 4.91198 1.69216 4.74197Z"
                            fill="currentColor" fillOpacity="0.6"/>
                      <path fillRule="evenodd" clipRule="evenodd"
                            d="M9.48661 7.35602C9.84226 7.26073 10.2078 7.47179 10.3031 7.82743L10.9933 10.4032C11.0886 10.7589 10.8775 11.1244 10.5219 11.2197C10.1662 11.315 9.80066 11.104 9.70537 10.7483L9.0152 8.17252C8.91991 7.81687 9.13097 7.45132 9.48661 7.35602Z"
                            fill="currentColor" fillOpacity="0.6"/>
                      <path fillRule="evenodd" clipRule="evenodd"
                            d="M11.9797 6.64644C12.2401 6.38609 12.6622 6.38609 12.9226 6.64644L14.8082 8.53204C15.0685 8.79239 15.0685 9.2145 14.8082 9.47485C14.5478 9.7352 14.1257 9.7352 13.8653 9.47485L11.9797 7.58925C11.7194 7.3289 11.7194 6.90679 11.9797 6.64644Z"
                            fill="currentColor" fillOpacity="0.6"/>
                      <path fillRule="evenodd" clipRule="evenodd"
                            d="M4.02369 6.64637C4.28404 6.90672 4.28404 7.32883 4.02369 7.58918L2.13807 9.47481C1.87772 9.73516 1.45561 9.73516 1.19526 9.47481C0.934913 9.21447 0.934912 8.79236 1.19526 8.53201L3.08088 6.64637C3.34123 6.38602 3.76334 6.38602 4.02369 6.64637Z"
                            fill="currentColor" fillOpacity="0.6"/>
                      <path fillRule="evenodd" clipRule="evenodd"
                            d="M6.50529 7.35606C6.86094 7.45135 7.072 7.8169 6.97671 8.17255L6.28654 10.7484C6.19125 11.104 5.82569 11.3151 5.47005 11.2198C5.1144 11.1245 4.90334 10.7589 4.99863 10.4033L5.6888 7.82747C5.78409 7.47182 6.14965 7.26076 6.50529 7.35606Z"
                            fill="currentColor" fillOpacity="0.6"/>
                    </svg>
                  )
                }
              </Stack>
            </Stack>
            <Stack fontSize={'32px'} lineHeight={'44px'} fontWeight={'700'}
                   sx={(theme) => ({color: theme.normal.text0})}>{ showNumber ? futures_balance_atf?.toFixed(2) : '******'} ATF</Stack>
            <Stack fontSize={'16px'} lineHeight={'22px'} fontWeight={'400'}
                   sx={(theme) => ({color: theme.normal.text0})}>≈ { showNumber ? futures_balance_usd.toFixed(5) : '******'} USDT</Stack>
          </Stack>
          <Stack direction={'row'} gap={'16px'}>
            <Stack px={'16px'} py={'10px'} gap={'10px'} minWidth={'120px'} direction={'row'} justifyContent={'center'}
                   onClick={() => {
                     setShareMyDealModal(true)
                   }}
                   height={'40px'} sx={(theme) => ({
              backgroundColor: theme.normal.bg1,
              color: theme.normal.text0,
              textAlign: 'center',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '700',
              lineHeight: '20px',
              cursor: 'pointer',
              "&: hover": {
                backgroundColor: theme.normal.grey_hover,
              },
              svg: {
                path: {
                  fill: theme.normal.text0,
                }
              }
            })}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M2.00016 12C2.36835 12 2.66683 12.2985 2.66683 12.6666V13.3333H13.3335V12.6666C13.3335 12.2985 13.632 12 14.0002 12C14.3684 12 14.6668 12.2985 14.6668 12.6666V14C14.6668 14.3682 14.3684 14.6666 14.0002 14.6666H2.00016C1.63197 14.6666 1.3335 14.3682 1.3335 14V12.6666C1.3335 12.2985 1.63197 12 2.00016 12Z" fill="#F9F9F9"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M9.52876 1.52858C9.78911 1.26823 10.2112 1.26823 10.4716 1.52858L13.8049 4.86191C14.0653 5.12226 14.0653 5.54437 13.8049 5.80472L10.4716 9.13805C10.2112 9.3984 9.78911 9.3984 9.52876 9.13805C9.26841 8.8777 9.26841 8.45559 9.52876 8.19524L12.3907 5.33331L9.52876 2.47138C9.26841 2.21103 9.26841 1.78892 9.52876 1.52858Z" fill="#F9F9F9"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M4.92146 5.75511C7.04844 4.91318 9.99301 4.66665 13.3335 4.66665C13.7017 4.66665 14.0002 4.96512 14.0002 5.33331C14.0002 5.7015 13.7017 5.99998 13.3335 5.99998C10.0073 5.99998 7.28521 6.25345 5.4122 6.99485C4.48663 7.36122 3.80883 7.83153 3.36162 8.41204C2.92102 8.98397 2.66683 9.71096 2.66683 10.6666C2.66683 11.0348 2.36835 11.3333 2.00016 11.3333C1.63197 11.3333 1.3335 11.0348 1.3335 10.6666C1.3335 9.45566 1.66264 8.43265 2.30537 7.59834C2.94149 6.7726 3.84703 6.1804 4.92146 5.75511Z" fill="#F9F9F9"/>
              </svg>
              <Trans>
                Share
              </Trans>
            </Stack>
            <Link to={'/futures'}>
              <Stack px={'16px'} py={'10px'} minWidth={'120px'} height={'40px'} sx={(theme) => ({
                backgroundColor: theme.normal.primary,
                color: theme.normal.highDark,
                textAlign: 'center',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '700',
                lineHeight: '20px',
                cursor: 'pointer',
                "&: hover": {
                  backgroundColor: theme.normal.primary_hover,
                }
              })}>
                <Trans>
                  Trade
                </Trans>
              </Stack>
            </Link>
          </Stack>
        </Stack>
        <Grid container spacing={'24px'}>
          {
            [
              {
                name: 'Balance',
                value: available_balance_atf?.toFixed(2),
                usdValue: available_balance_usd.toFixed(5),
              },
              {
                name: 'Position',
                value: position_balance_atf?.toFixed(2),
                usdValue: position_balance_usd.toFixed(5),
              },
              {
                name: 'Order',
                value: frozen_balance_atf?.toFixed(2),
                usdValue: frozen_balance_usd.toFixed(5),
              },
            ].map((item) => (
              <Grid item key={item.name} xs={6} sm={4}>
                <Stack sx={(theme) => ({
                  width: '100%',
                  gap: '8px',
                })}>
                  <Stack sx={(theme) => ({
                    color: theme.normal.text1,
                    fontSize: '14px',
                    fontWeight: '400',
                    lineHeight: '20px',
                  })}>{item.name}</Stack>
                  <Stack sx={(theme) => ({
                    color: theme.normal.text0,
                    fontSize: '24px',
                    fontWeight: '700',
                    lineHeight: '32px',
                  })}>{showNumber ? item.value : '******'} ATF</Stack>
                  <Stack sx={(theme) => ({
                    color: theme.normal.text0,
                    fontSize: '14px',
                    fontWeight: '400',
                    lineHeight: '20px',
                  })}>≈ {showNumber ? item.usdValue : '******'} USDT</Stack>
                </Stack>
              </Grid>
            ))
          }
        </Grid>
        <Stack sx={(theme) => ({
          border: `1px solid ${theme.normal.border}`,
          borderRadius: '12px',
          paddingX: '12px',
          paddingY: '20px',
          gap: '20px',
          marginTop: '20px',
          [theme.breakpoints.up("md")]: {
            display: "none",
          }
        })}>
          <Stack gap={'4px'}>
            <Stack sx={(theme) => ({
              fontSize: '14px',
              fontWeight: '700',
              lineHeight: '20px',
              color: theme.normal.text1,
            })}>Position Value</Stack>
            <Stack sx={(theme) => ({
              fontSize: '24px',
              fontWeight: '700',
              lineHeight: '32px',
              color: theme.normal.text0,
            })}>{showNumber ? data?.position_value?.toFixed(2) || 0 : '******'} ATF</Stack>
          </Stack>
          <Stack sx={(theme) => ({
            height: '1px',
            borderBottom: `1px solid ${theme.normal.border}`,
          })}></Stack>
          <Stack gap={'22px'}>
            {
              showData?.slice(1)?.map((item) => (
                <Stack key={item.name} direction={'row'} justifyContent={'space-between'}>
                  <Stack sx={(theme) => ({
                    fontSize: '14px',
                    fontWeight: '400',
                    lineHeight: '20px',
                    color: theme.normal.text2,
                  })}>{item.name}</Stack>
                  <Stack direction={'row'} alignItems={'center'} gap={'4px'}>
                    <Stack sx={(theme) => ({
                      fontSize: '16px',
                      fontWeight: '700',
                      lineHeight: '22px',
                      color: theme.normal.text0,
                    })}>{showNumber ? item.value?.toFixed(2) : '******'} ATF</Stack>
                    {
                      item.roi !== undefined && (
                        <Stack sx={(theme) => ({
                          fontSize: '12px',
                          fontWeight: '400',
                          lineHeight: '16px',
                          color: item?.roi >= 0 ? theme.normal.success : theme.normal.danger,
                        })}>{ showNumber ? `${item?.roi > 0 ? '+' : ''}${item.roi?.toFixed(2)}`: '******'}%</Stack>
                      )
                    }
                  </Stack>
                </Stack>
              ))
            }
          </Stack>
        </Stack>
        <Stack sx={(theme) => ({
          [theme.breakpoints.down("md")]: {
            display: "none",
          }
        })}>
          <Grid container spacing={"16px"}>
            {
              showData?.map((item) => (
                <Grid item md={4} key={item.name}>
                  <Stack p={'40px'} gap={'12px'} height={'100%'} sx={(theme) => ({
                    border: `1px solid ${theme.normal.border}`,
                    borderRadius: '12px'
                  })}>
                    <Stack sx={(theme) => ({
                      fontSize: '16px',
                      fontWeight: '400',
                      lineHeight: '22px',
                      color: theme.normal.text2,
                    })}>
                      {item.name}
                    </Stack>
                    <Stack sx={(theme) => ({
                      fontSize: '28px',
                      fontWeight: '700',
                      lineHeight: '40px',
                      color: theme.normal.text0,
                    })}>
                      {showNumber ? item.value?.toFixed(2) : '******'} ATF
                    </Stack>
                    {
                      item?.roi !== undefined && (
                        <Stack sx={(theme) => ({
                          fontSize: '16px',
                          fontWeight: '700',
                          lineHeight: '22px',
                          color: item.roi >=0 ? theme.normal.success : theme.normal.danger,
                        })}>
                          {showNumber ? `${item.roi > 0 ? '+' : ''}${item.roi?.toFixed(2)}` : '******'}%
                        </Stack>
                      )
                    }
                  </Stack>
                </Grid>
              ))
            }
          </Grid>
        </Stack>
        <Stack gap={'24px'} position={"relative"}>
          <Stack width={'240px'}
                 onClick={() => {
                   setShowrdr(!showrdr);
                 }}
          >
            <Stack
              direction={"row"}
              padding={"8px 12px"}
              width={"100%"}
              sx={(theme) => ({
                borderRadius: "8px",
                backgroundColor: theme.normal.bg1,
                border: `1px solid ${theme.normal.border}`,
                color: theme.normal.text0,
                fontSize: "14px",
                fontWeight: "bold",
                lineHeight: "20px",
                height: "40px",
              })}
              spacing={"4px"}
              alignItems={"center"}
            >
              <Stack>
                {range?.[0].startDate
                  ?.toLocaleDateString("zh-CN", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })
                  .replace(/\//g, "-")}
              </Stack>
              <Box>~</Box>
              <Stack>
                {range?.[0].endDate
                  ?.toLocaleDateString("zh-CN", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })
                  .replace(/\//g, "-")}
              </Stack>
              <Stack flexGrow={1}></Stack>
              <Stack
                sx={(theme) => ({
                  "& svg": {
                    path: {
                      fill: theme.normal.text2,
                    },
                  },
                })}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4.66667 0.583008C4.98883 0.583008 5.25 0.844175 5.25 1.16634V1.45801H8.75V1.16634C8.75 0.844175 9.01117 0.583008 9.33333 0.583008C9.6555 0.583008 9.91667 0.844175 9.91667 1.16634V1.45801H11.9583C12.6027 1.45801 13.125 1.98035 13.125 2.62467V5.54134V11.6663C13.125 12.3107 12.6027 12.833 11.9583 12.833H2.04167C1.39734 12.833 0.875 12.3107 0.875 11.6663V5.54134V2.62467C0.875 1.98034 1.39733 1.45801 2.04167 1.45801H4.08333V1.16634C4.08333 0.844175 4.3445 0.583008 4.66667 0.583008ZM8.75 2.62467V3.49967C8.75 3.82184 9.01117 4.08301 9.33333 4.08301C9.6555 4.08301 9.91667 3.82184 9.91667 3.49967V2.62467H11.9583V4.95801H2.04167V2.62467H4.08333V3.49967C4.08333 3.82184 4.3445 4.08301 4.66667 4.08301C4.98883 4.08301 5.25 3.82184 5.25 3.49967V2.62467H8.75ZM11.9583 6.12467H2.04167V11.6663H11.9583V6.12467ZM7.58333 9.91634C7.58333 9.59417 7.8445 9.33301 8.16667 9.33301H9.91667C10.2388 9.33301 10.5 9.59417 10.5 9.91634C10.5 10.2385 10.2388 10.4997 9.91667 10.4997H8.16667C7.8445 10.4997 7.58333 10.2385 7.58333 9.91634ZM4.08333 9.33301C3.76117 9.33301 3.5 9.59417 3.5 9.91634C3.5 10.2385 3.76117 10.4997 4.08333 10.4997H5.83333C6.1555 10.4997 6.41667 10.2385 6.41667 9.91634C6.41667 9.59417 6.1555 9.33301 5.83333 9.33301H4.08333ZM7.58333 7.58301C7.58333 7.26084 7.8445 6.99967 8.16667 6.99967H9.91667C10.2388 6.99967 10.5 7.26084 10.5 7.58301C10.5 7.90517 10.2388 8.16634 9.91667 8.16634H8.16667C7.8445 8.16634 7.58333 7.90517 7.58333 7.58301ZM4.08333 6.99967C3.76117 6.99967 3.5 7.26084 3.5 7.58301C3.5 7.90517 3.76117 8.16634 4.08333 8.16634H5.83333C6.1555 8.16634 6.41667 7.90517 6.41667 7.58301C6.41667 7.26084 6.1555 6.99967 5.83333 6.99967H4.08333Z"
                    fill="#F9F9F9"
                    fillOpacity="0.6"
                  />
                </svg>
              </Stack>
            </Stack>
          </Stack>
          {showrdr && (
            <>
              <Stack
                width={"fit-content"}
                position={"absolute"}
                top={"44px"}
                zIndex={50}
              >
                <DateRange
                  months={1}
                  onChange={(item) => setRange([item.selection])}
                  moveRangeOnFirstSelection={false}
                  ranges={range}
                  showMonthArrow={true}
                  showPreview={false}
                  showDateDisplay={false}
                  showMonthAndYearPickers={false}
                  className={nowTheme.isLight ? "" : "dark"}
                  maxDate={new Date()}
                  minDate={new Date("2023-04-01")}
                />
              </Stack>
              <button
                style={{
                  width: "100vw",
                  height: "100vh",
                  position: "fixed",
                  top: 0,
                  left: 0,
                  zIndex: 49,
                }}
                onClick={() => {
                  if (showrdr) {
                    setShowrdr(false);
                  }
                }}
              ></button>
            </>
          )}
          <Grid container spacing={"16px"}>
            {[
              {
                title: t`Volume`,
                chart: (
                  <VolumeChart
                    show={showNumber}
                    address={q || account.address}
                    from={range?.[0]?.startDate
                      ?.toLocaleDateString("zh-CN", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })
                      .replace(/\//g, "-")}
                    to={range?.[0]?.endDate
                      ?.toLocaleDateString("zh-CN", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })
                      .replace(/\//g, "-")}
                  />
                ),
              },
              {
                title: t`Total Asset Value`,
                chart: (
                  <TotalAssetValueChart
                    show={showNumber}
                    address={q || account.address}
                    from={range?.[0]?.startDate
                      ?.toLocaleDateString("zh-CN", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })
                      .replace(/\//g, "-")}
                    to={range?.[0]?.endDate
                      ?.toLocaleDateString("zh-CN", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })
                      .replace(/\//g, "-")}
                  />
                ),
              },
              {
                title: t`Daily Return`,
                chart: (
                  <DailyReturnChart
                    show={showNumber}
                    address={q || account.address}
                    from={range?.[0]?.startDate
                      ?.toLocaleDateString("zh-CN", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })
                      .replace(/\//g, "-")}
                    to={range?.[0]?.endDate
                      ?.toLocaleDateString("zh-CN", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })
                      .replace(/\//g, "-")}
                  />
                ),
              },
              {
                title: t`Cumulative Return`,
                chart: (
                  <CumulativeReturnChart
                    show={showNumber}
                    address={q || account.address}
                    from={range?.[0]?.startDate
                      ?.toLocaleDateString("zh-CN", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })
                      .replace(/\//g, "-")}
                    to={range?.[0]?.endDate
                      ?.toLocaleDateString("zh-CN", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })
                      .replace(/\//g, "-")}
                  />
                ),
              },
            ].map((item, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Stack
                  sx={(theme) => ({
                    [theme.breakpoints.down("md")]: {
                      height: "340px",
                      width: "100%",
                      borderBottom:
                        index < 3 ? `1px solid ${theme.normal.border}` : "",
                      paddingBottom: "24px",
                    },
                    [theme.breakpoints.up("md")]: {
                      height: "306px",
                      borderRadius: "12px",
                      border: `1px solid ${theme.normal.border}`,
                      padding: "20px",
                    },
                  })}
                  spacing={"12px"}
                  px={"20px"}
                >
                  <Stack
                    sx={(theme) => ({
                      color: theme.normal.text2,
                      fontSize: "14px",
                      fontWeight: "bold",
                      lineHeight: "20px",
                    })}
                  >
                    {item.title}
                  </Stack>
                  {item.chart}
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Stack>
        <Stack height={'80px'} />
      </Stack>
    </Stack>
  )
}

export default Futures