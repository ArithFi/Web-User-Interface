import Stack from "@mui/material/Stack";
import Menu from "../Share/Menu";
import {DateRange, Range} from "react-date-range";
import {Grid} from "@mui/material";
import {t, Trans} from "@lingui/macro";
import {useEffect, useMemo, useState} from "react";
import useTheme from "../../../hooks/useTheme";
import useArithFi from "../../../hooks/useArithFi";
import Box from "@mui/material/Box";
import {Link, useSearchParams} from "react-router-dom";
import MobileMenu from "../Share/MobileMenu";
import useAccount from "../../../hooks/useAccount";
import DepositModal from "../../Share/Modal/DepositModal";
import WithDrawModal from "../../Share/Modal/WithdrawModal";
import {TransactionType, usePendingTransactionsBase} from "../../../hooks/useTransactionReceipt";
import {SnackBarType} from "../../../components/SnackBar/NormalSnackBar";
import DailyReturnChart from "./Components/DailyReturnChart";
import VolumeChart from "./Components/VolumeChart";
import CumulativeReturnChart from "./Components/CumulativeReturnChart";
import TotalAssetValueChart from "./Components/TotalAssetValueChart";
import {DEPOSIT_TYPES, parseOrderType} from "./Overview";
import {NoOrderMobile} from "../../Futures/OrderList";
import useReadSwapAmountOut from "../../../contracts/Read/useReadSwapContractOnBsc";
import {BigNumber} from "ethers";
import useSWR from "swr";
import {serviceBaseURL} from "../../../lib/ArithFiRequest";
import {ATFToken, USDTToken} from "../../../contracts/contractAddress";

const Assets = () => {
  const [showrdr, setShowrdr] = useState(false);
  const {account, signature, chainsData} = useArithFi();
  const {nowTheme} = useTheme();
  const {addTransactionNotice} = usePendingTransactionsBase();
  const [range, setRange] = useState<Range[]>([
    {
      startDate: new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  let [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get('address');
  const [showNumber, setShowNumber] = useState(searchParams.get("mode") !== "private");
  const {
    showDeposit,
    setShowDeposit,
    showWithdraw,
    setShowWithdraw,
    getAssetsList,
  } = useAccount();
  const {
    uniSwapAmountOut,
    uniSwapAmountOutRefetch,
  } = useReadSwapAmountOut(BigNumber.from("1".stringToBigNumber(18)!), [ATFToken[chainsData.chainId!], USDTToken[chainsData.chainId!]]);
  const price = (uniSwapAmountOut?.[1].div(BigNumber.from("1".stringToBigNumber(12)!)).toNumber() || 0) / 1e6

  const { data } = useSWR((account || q) ? `${serviceBaseURL(chainsData.chainId)}/arithfi/user/account/total?walletAddress=${q || account.address}` : undefined,
    (url: any) => fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": signature?.signature || ""
      }
    })
      .then(res => res.json())
      .then(res => res.data));

  const total_balance_atf = (data?.available_balance || 0) + (data?.copy_balance || 0) + (data?.future_order_balance || 0) + (data?.copy_order_balance || 0) + (data?.future_limit_balance || 0) + (data?.copy_limit_balance || 0)
  const total_balance_usd = total_balance_atf * price;

  const futures_balance_atf = (data?.available_balance || 0) + (data?.future_order_balance || 0) + (data?.future_limit_balance || 0)
  const futures_balance_usd = futures_balance_atf * price;

  const copy_balance_atf = (data?.copy_balance || 0) + (data?.copy_order_balance || 0) + (data?.copy_limit_balance || 0)
  const copy_balance_usd = copy_balance_atf * price;

  const { data: withdrawData } = useSWR((q || account) ? `${serviceBaseURL(chainsData.chainId)}/arithfi/user/listWithdraw?toAddress=${q || account.address}` : undefined, (url: string) => fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": signature?.signature || ""
    }
  })
    .then(res => res.json())
    .then(res => res.data));

  const { data: depositData } = useSWR((q || account) ? `${serviceBaseURL(chainsData.chainId)}/arithfi/user/listDeposit?txAddress=${q || account.address}` : undefined, (url: string) => fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": signature?.signature || ""
    }
  })
    .then(res => res.json())
    .then(res => res.data));

  useEffect(() => {
    const time = setInterval(() => {
      uniSwapAmountOutRefetch();
    }, 10 * 1000);
    return () => {
      clearInterval(time);
    };
  }, [uniSwapAmountOutRefetch]);

  const addModal = useMemo(() => {
    return (
      <>
        {showDeposit ? (
          <DepositModal open={true} onClose={() => setShowDeposit(false)}/>
        ) : (
          <></>
        )}
        {showWithdraw ? (
          <WithDrawModal
            open={true}
            onClose={(res?: boolean) => {
              if (res !== undefined) {
                addTransactionNotice({
                  type: TransactionType.withdraw,
                  info: "",
                  result: res ? SnackBarType.success : SnackBarType.fail,
                });
                getAssetsList();
              }
              setShowWithdraw(false);
            }}
          />
        ) : (
          <></>
        )}
      </>
    );
  }, [
    // addTransactionNotice,
    getAssetsList,
    setShowDeposit,
    setShowWithdraw,
    showDeposit,
    showWithdraw,
  ]);

  const moneyList = useMemo(() => {
    let filterList: any[];
    const withdrawList = withdrawData?.map((item: any) => ({
      text: `${item.value.toFixed(2)} ATF`,
      time: new Date(item["ts"]).getTime() / 1000,
      status: item["status"],
      applyTime: new Date(item["completeAt"]).getTime() / 1000,
      chainId: item.chainId,
      hash: item.hash,
      ordertype: "WITHDRAW",
      info: "",
    }));
    const depositList = depositData?.map((item: any) => ({
      text: `${item.value.toFixed(2)} ATF`,
      time: new Date(item["ts"]).getTime() / 1000,
      status: item["status"],
      applyTime: new Date(item["completeAt"]).getTime() / 1000,
      chainId: item.chainId,
      hash: item.hash,
      ordertype: "DEPOSIT",
      info: "",
    }));
    filterList = withdrawList?.concat(depositList);
    return filterList?.sort((a: any, b: any) => b?.time - a?.time) || [];
  }, [withdrawData, depositData])

  useEffect(() => {
    if (showNumber) {
      searchParams.set("mode", "public");
      setSearchParams(searchParams);
    } else {
      searchParams.set("mode", "private");
      setSearchParams(searchParams);
    }
  }, [showNumber]);

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
      {addModal}
      <Stack sx={(theme) => ({
        [theme.breakpoints.up("md")]: {
          display: "none",
        }
      })}>
        <MobileMenu/>
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
          width: '100%',
          paddingX: "40px",
          paddingY: "20px",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          border: `1px solid ${theme.normal.border}`,
          borderRadius: '12px',
          [theme.breakpoints.down("md")]: {
            flexDirection: "column",
            border: "none",
            gap: "24px",
            paddingX: "0",
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
              <Trans>
                Total Assets
              </Trans>
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
                   sx={(theme) => ({color: theme.normal.text0})}>{showNumber ? total_balance_atf?.toFixed(2) : '******'} ATF</Stack>
            <Stack fontSize={'16px'} lineHeight={'22px'} fontWeight={'400'}
                   sx={(theme) => ({color: theme.normal.text0})}>
              ≈ {showNumber ? total_balance_usd.toFixed(5) : '******'} USDT
            </Stack>
            <Stack fontSize={'14px'} lineHeight={'20px'} fontWeight={'400'}
                   sx={(theme) => ({color: theme.normal.text0})} direction={'row'} gap={'8px'}>
              <Stack>
                <Trans>
                  Total Profit & Loss
                </Trans>
              </Stack>
              <Stack sx={(theme) => ({color: data?.roi_total >= 0 ? theme.normal.success : theme.normal.danger})}>
                {showNumber ? data?.pnl_total?.toFixed(2) || 0 : '******'} ATF ({showNumber ? `${data?.roi_total > 0 ? '+' : ''}${((data?.roi_total || 0) * 100)?.toFixed(2)}` : '******'}%)
              </Stack>
            </Stack>
          </Stack>
          <Stack direction={'row'} gap={'16px'}>
            <Stack px={'16px'} py={'10px'} minWidth={'120px'} height={'40px'}
                   onClick={() => {
                     setShowWithdraw(true)
                   }}
                   sx={(theme) => ({
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
                     }
                   })}>
              <Trans>
                Withdraw
              </Trans>
            </Stack>
            <Stack px={'16px'} py={'10px'} minWidth={'120px'} height={'40px'}
                   onClick={() => {
                     setShowDeposit(true)
                   }}
                   sx={(theme) => ({
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
                Deposit
              </Trans>
            </Stack>
          </Stack>
        </Stack>
        <Stack sx={(theme) => ({
          gap: '24px',
          [theme.breakpoints.down("md")]: {}
        })}>
          <Stack sx={(theme) => ({
            fontSize: '20px',
            lineHeight: '28px',
            fontWeight: '700',
            color: theme.normal.text0,
            [theme.breakpoints.down("md")]: {
              display: 'none',
            }
          })}>
            <Trans>
              Accounts
            </Trans>
          </Stack>
          <Stack sx={(theme) => ({
            flexDirection: 'row',
            gap: '16px',
            [theme.breakpoints.down("md")]: {
              flexDirection: 'column',
            }
          })}>
            <Stack sx={(theme) => ({
              gap: '16px',
              width: '50%',
              [theme.breakpoints.down("md")]: {
                width: '100%',
              }
            })}>
              <Link to={`/account/futures?${searchParams.toString()}`}>
                <Stack sx={(theme) => ({
                  paddingX: '20px',
                  paddingY: '40px',
                  flexDirection: 'row',
                  gap: '16px',
                  alignItems: 'center',
                  minHeight: '230px',
                  border: `1px solid ${theme.normal.border}`,
                  borderRadius: '12px',
                  [theme.breakpoints.down("md")]: {
                    paddingX: '20px',
                    paddingY: '24px',
                    minHeight: 'unset',
                  }
                })}>
                  <Stack sx={(theme) => ({
                    svg: {
                      circle: {
                        fill: theme.normal.bg1,
                      },
                      path: {
                        fill: theme.normal.text1,
                      }
                    },
                    [theme.breakpoints.down("md")]: {
                      display: 'none',
                    }
                  })}>
                    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="32" cy="32" r="32" fill="#1F2329"/>
                      <path fillRule="evenodd" clipRule="evenodd"
                            d="M39.3335 32.6667V34.6924V40C39.3335 41.1046 40.2289 42 41.3335 42C42.4381 42 43.3335 41.1046 43.3335 40V32.6667H39.3335ZM36.6668 34.6924V32.6667V30V22H22.0002V39.3334C22.0002 40.8061 23.1941 42 24.6668 42H37.1159C36.828 41.3939 36.6668 40.7158 36.6668 40V34.6924ZM41.3335 44.6667H37.3335H24.6668C21.7213 44.6667 19.3335 42.2789 19.3335 39.3334V20.6667C19.3335 19.9303 19.9304 19.3334 20.6668 19.3334H38.0002C38.7365 19.3334 39.3335 19.9303 39.3335 20.6667V30H44.6668C45.4032 30 46.0002 30.597 46.0002 31.3334V40C46.0002 42.5774 43.9108 44.6667 41.3335 44.6667ZM25.3335 27.3334C25.3335 26.9652 25.632 26.6667 26.0002 26.6667H32.6668C33.035 26.6667 33.3335 26.9652 33.3335 27.3334V28.6667C33.3335 29.0349 33.035 29.3334 32.6668 29.3334H26.0002C25.632 29.3334 25.3335 29.0349 25.3335 28.6667V27.3334ZM26.0002 32C25.632 32 25.3335 32.2985 25.3335 32.6667V34C25.3335 34.3682 25.632 34.6667 26.0002 34.6667H32.6668C33.035 34.6667 33.3335 34.3682 33.3335 34V32.6667C33.3335 32.2985 33.035 32 32.6668 32H26.0002Z"
                            fill="#F9F9F9" fillOpacity="0.8"/>
                    </svg>
                  </Stack>
                  <Stack width={'100%'}>
                    <Stack
                      sx={(theme) => ({
                        flexDirection: 'row',
                        alignItems: 'center',
                        fontSize: '16px',
                        fontWeight: '400',
                        lineHeight: '22px',
                        marginBottom: '12px',
                        color: theme.normal.text2,
                        justifyContent: 'space-between',
                      })}
                    >
                      <Stack direction={'row'} alignItems={'center'} gap={'8px'}>
                        <Stack sx={(theme) => ({
                          svg: {
                            circle: {
                              fill: theme.normal.bg1,
                            },
                            path: {
                              fill: theme.normal.text1,
                            }
                          },
                          [theme.breakpoints.up("md")]: {
                            display: 'none',
                          }
                        })}>
                          <svg width="24" height="24" viewBox="0 0 64 64" fill="none"
                               xmlns="http://www.w3.org/2000/svg">
                            <circle cx="32" cy="32" r="32" fill="#1F2329"/>
                            <path fillRule="evenodd" clipRule="evenodd"
                                  d="M39.3335 32.6667V34.6924V40C39.3335 41.1046 40.2289 42 41.3335 42C42.4381 42 43.3335 41.1046 43.3335 40V32.6667H39.3335ZM36.6668 34.6924V32.6667V30V22H22.0002V39.3334C22.0002 40.8061 23.1941 42 24.6668 42H37.1159C36.828 41.3939 36.6668 40.7158 36.6668 40V34.6924ZM41.3335 44.6667H37.3335H24.6668C21.7213 44.6667 19.3335 42.2789 19.3335 39.3334V20.6667C19.3335 19.9303 19.9304 19.3334 20.6668 19.3334H38.0002C38.7365 19.3334 39.3335 19.9303 39.3335 20.6667V30H44.6668C45.4032 30 46.0002 30.597 46.0002 31.3334V40C46.0002 42.5774 43.9108 44.6667 41.3335 44.6667ZM25.3335 27.3334C25.3335 26.9652 25.632 26.6667 26.0002 26.6667H32.6668C33.035 26.6667 33.3335 26.9652 33.3335 27.3334V28.6667C33.3335 29.0349 33.035 29.3334 32.6668 29.3334H26.0002C25.632 29.3334 25.3335 29.0349 25.3335 28.6667V27.3334ZM26.0002 32C25.632 32 25.3335 32.2985 25.3335 32.6667V34C25.3335 34.3682 25.632 34.6667 26.0002 34.6667H32.6668C33.035 34.6667 33.3335 34.3682 33.3335 34V32.6667C33.3335 32.2985 33.035 32 32.6668 32H26.0002Z"
                                  fill="#F9F9F9" fillOpacity="0.8"/>
                          </svg>
                        </Stack>
                        <Trans>
                          Futures
                        </Trans>
                      </Stack>
                      <Stack sx={(theme) => ({
                        [theme.breakpoints.up("md")]: {
                          display: 'none',
                        }
                      })}>
                        <Stack p={'4px'} sx={(theme) => ({
                          border: `1px solid ${theme.normal.border}`,
                          borderRadius: '8px',
                          cursor: 'pointer',
                          svg: {
                            path: {
                              fill: theme.normal.text2,
                            }
                          },
                          "&: hover": {
                            backgroundColor: theme.normal.grey_hover,
                            svg: {
                              path: {
                                fill: theme.normal.text0,
                              }
                            },
                          }
                        })}>
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                               xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd"
                                  d="M14.2222 9.70543C14.3849 9.86815 14.3849 10.132 14.2222 10.2947L7.15113 17.3658C6.98841 17.5285 6.7246 17.5285 6.56188 17.3658L5.95529 16.7592C5.79257 16.5964 5.79257 16.3326 5.95529 16.1699L12.1251 10.0001L5.95529 3.8302C5.79257 3.66749 5.79257 3.40367 5.95529 3.24095L6.56188 2.63436C6.72459 2.47164 6.98841 2.47164 7.15113 2.63436L14.2222 9.70543Z"
                                  fill="#F9F9F9" fillOpacity="0.6"/>
                          </svg>
                        </Stack>
                      </Stack>
                    </Stack>
                    <Stack
                      sx={(theme) => ({
                        fontSize: '28px',
                        fontWeight: '700',
                        lineHeight: '40px',
                        marginBottom: '8px',
                        color: theme.normal.text0,
                      })}
                    >
                      {showNumber ? futures_balance_atf?.toFixed(2) : '******'} ATF
                    </Stack>
                    <Stack
                      sx={(theme) => ({
                        fontSize: '16px',
                        fontWeight: '400',
                        lineHeight: '22px',
                        color: theme.normal.text0,
                      })}
                    >
                      ≈ {showNumber ? futures_balance_usd.toFixed(5) : '******'} USDT
                    </Stack>
                  </Stack>
                  <Stack sx={(theme) => ({
                    [theme.breakpoints.down("md")]: {
                      display: 'none',
                    }
                  })}>
                    <Stack p={'8px'} sx={(theme) => ({
                      border: `1px solid ${theme.normal.border}`,
                      borderRadius: '8px',
                      cursor: 'pointer',
                      svg: {
                        path: {
                          fill: theme.normal.text2,
                        }
                      },
                      "&: hover": {
                        backgroundColor: theme.normal.grey_hover,
                        svg: {
                          path: {
                            fill: theme.normal.text0,
                          }
                        },
                      }
                    })}>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd"
                              d="M14.2222 9.70543C14.3849 9.86815 14.3849 10.132 14.2222 10.2947L7.15113 17.3658C6.98841 17.5285 6.7246 17.5285 6.56188 17.3658L5.95529 16.7592C5.79257 16.5964 5.79257 16.3326 5.95529 16.1699L12.1251 10.0001L5.95529 3.8302C5.79257 3.66749 5.79257 3.40367 5.95529 3.24095L6.56188 2.63436C6.72459 2.47164 6.98841 2.47164 7.15113 2.63436L14.2222 9.70543Z"
                              fill="#F9F9F9" fillOpacity="0.6"/>
                      </svg>
                    </Stack>
                  </Stack>
                </Stack>
              </Link>
              <Link to={`/account/copy?${searchParams.toString()}`}>
                <Stack sx={(theme) => ({
                  paddingX: '20px',
                  paddingY: '40px',
                  flexDirection: 'row',
                  gap: '16px',
                  alignItems: 'center',
                  minHeight: '230px',
                  border: `1px solid ${theme.normal.border}`,
                  borderRadius: '12px',
                  [theme.breakpoints.down("md")]: {
                    paddingX: '20px',
                    paddingY: '24px',
                    minHeight: 'unset',
                  }
                })}>
                  <Stack sx={(theme) => ({
                    svg: {
                      circle: {
                        fill: theme.normal.bg1,
                      },
                      path: {
                        fill: theme.normal.text1,
                      }
                    },
                    [theme.breakpoints.down("md")]: {
                      display: 'none',
                    }
                  })}>
                    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="32" cy="32" r="32" fill="#1F2329"/>
                      <path fillRule="evenodd" clipRule="evenodd"
                            d="M26.5417 20.6667C26.2425 20.6667 26 20.9092 26 21.2083V23.3333H37.4583C39.2302 23.3333 40.6667 24.7698 40.6667 26.5417V38H42.7917C43.0908 38 43.3333 37.7575 43.3333 37.4583V21.2083C43.3333 20.9092 43.0908 20.6667 42.7917 20.6667H26.5417ZM40.6667 40.6667H42.7917C44.5636 40.6667 46 39.2302 46 37.4583V21.2083C46 19.4364 44.5636 18 42.7917 18H26.5417C24.7698 18 23.3333 19.4364 23.3333 21.2083V23.3333H21.2083C19.4364 23.3333 18 24.7698 18 26.5417V42.7917C18 44.5636 19.4364 46 21.2083 46H37.4583C39.2302 46 40.6667 44.5636 40.6667 42.7917V40.6667ZM21.2083 26C20.9092 26 20.6667 26.2425 20.6667 26.5417V42.7917C20.6667 43.0908 20.9092 43.3333 21.2083 43.3333H37.4583C37.7575 43.3333 38 43.0908 38 42.7917V26.5417C38 26.2425 37.7575 26 37.4583 26H21.2083Z"
                            fill="#F9F9F9" fillOpacity="0.8"/>
                    </svg>
                  </Stack>
                  <Stack width={'100%'}>
                    <Stack
                      sx={(theme) => ({
                        flexDirection: 'row',
                        alignItems: 'center',
                        fontSize: '16px',
                        fontWeight: '400',
                        lineHeight: '22px',
                        marginBottom: '12px',
                        color: theme.normal.text2,
                        justifyContent: 'space-between',
                      })}
                    >
                      <Stack direction={'row'} alignItems={'center'} gap={'8px'}>
                        <Stack sx={(theme) => ({
                          svg: {
                            circle: {
                              fill: theme.normal.bg1,
                            },
                            path: {
                              fill: theme.normal.text1,
                            }
                          },
                          [theme.breakpoints.up("md")]: {
                            display: 'none',
                          }
                        })}>
                          <svg width="24" height="24" viewBox="0 0 64 64" fill="none"
                               xmlns="http://www.w3.org/2000/svg">
                            <circle cx="32" cy="32" r="32" fill="#1F2329"/>
                            <path fillRule="evenodd" clipRule="evenodd"
                                  d="M26.5417 20.6667C26.2425 20.6667 26 20.9092 26 21.2083V23.3333H37.4583C39.2302 23.3333 40.6667 24.7698 40.6667 26.5417V38H42.7917C43.0908 38 43.3333 37.7575 43.3333 37.4583V21.2083C43.3333 20.9092 43.0908 20.6667 42.7917 20.6667H26.5417ZM40.6667 40.6667H42.7917C44.5636 40.6667 46 39.2302 46 37.4583V21.2083C46 19.4364 44.5636 18 42.7917 18H26.5417C24.7698 18 23.3333 19.4364 23.3333 21.2083V23.3333H21.2083C19.4364 23.3333 18 24.7698 18 26.5417V42.7917C18 44.5636 19.4364 46 21.2083 46H37.4583C39.2302 46 40.6667 44.5636 40.6667 42.7917V40.6667ZM21.2083 26C20.9092 26 20.6667 26.2425 20.6667 26.5417V42.7917C20.6667 43.0908 20.9092 43.3333 21.2083 43.3333H37.4583C37.7575 43.3333 38 43.0908 38 42.7917V26.5417C38 26.2425 37.7575 26 37.4583 26H21.2083Z"
                                  fill="#F9F9F9" fillOpacity="0.8"/>
                          </svg>
                        </Stack>
                        <Trans>
                          Copy Trading
                        </Trans>
                      </Stack>
                      <Stack sx={(theme) => ({
                        [theme.breakpoints.up("md")]: {
                          display: 'none',
                        }
                      })}>
                        <Stack p={'4px'} sx={(theme) => ({
                          border: `1px solid ${theme.normal.border}`,
                          borderRadius: '8px',
                          cursor: 'pointer',
                          svg: {
                            path: {
                              fill: theme.normal.text2,
                            }
                          },
                          "&: hover": {
                            backgroundColor: theme.normal.grey_hover,
                            svg: {
                              path: {
                                fill: theme.normal.text0,
                              }
                            },
                          }
                        })}>
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                               xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd"
                                  d="M14.2222 9.70543C14.3849 9.86815 14.3849 10.132 14.2222 10.2947L7.15113 17.3658C6.98841 17.5285 6.7246 17.5285 6.56188 17.3658L5.95529 16.7592C5.79257 16.5964 5.79257 16.3326 5.95529 16.1699L12.1251 10.0001L5.95529 3.8302C5.79257 3.66749 5.79257 3.40367 5.95529 3.24095L6.56188 2.63436C6.72459 2.47164 6.98841 2.47164 7.15113 2.63436L14.2222 9.70543Z"
                                  fill="#F9F9F9" fillOpacity="0.6"/>
                          </svg>
                        </Stack>
                      </Stack>
                    </Stack>
                    <Stack
                      sx={(theme) => ({
                        fontSize: '28px',
                        fontWeight: '700',
                        lineHeight: '40px',
                        marginBottom: '8px',
                        color: theme.normal.text0,
                      })}
                    >
                      {showNumber ? copy_balance_atf?.toFixed(2) : '******'} ATF
                    </Stack>
                    <Stack
                      sx={(theme) => ({
                        fontSize: '16px',
                        fontWeight: '400',
                        lineHeight: '22px',
                        color: theme.normal.text0,
                      })}
                    >
                      ≈ {showNumber ? copy_balance_usd.toFixed(5) : '******'} USDT
                    </Stack>
                  </Stack>
                  <Stack sx={(theme) => ({
                    [theme.breakpoints.down("md")]: {
                      display: 'none',
                    }
                  })}>
                    <Stack p={'8px'} sx={(theme) => ({
                      border: `1px solid ${theme.normal.border}`,
                      borderRadius: '8px',
                      cursor: 'pointer',
                      svg: {
                        path: {
                          fill: theme.normal.text2,
                        }
                      },
                      "&: hover": {
                        backgroundColor: theme.normal.grey_hover,
                        svg: {
                          path: {
                            fill: theme.normal.text0,
                          }
                        },
                      }
                    })}>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd"
                              d="M14.2222 9.70543C14.3849 9.86815 14.3849 10.132 14.2222 10.2947L7.15113 17.3658C6.98841 17.5285 6.7246 17.5285 6.56188 17.3658L5.95529 16.7592C5.79257 16.5964 5.79257 16.3326 5.95529 16.1699L12.1251 10.0001L5.95529 3.8302C5.79257 3.66749 5.79257 3.40367 5.95529 3.24095L6.56188 2.63436C6.72459 2.47164 6.98841 2.47164 7.15113 2.63436L14.2222 9.70543Z"
                              fill="#F9F9F9" fillOpacity="0.6"/>
                      </svg>
                    </Stack>
                  </Stack>
                </Stack>
              </Link>
            </Stack>
            <Stack sx={(theme) => ({
              border: `1px solid ${theme.normal.border}`,
              borderRadius: '12px',
              width: '50%',
              padding: '20px',
              maxHeight: '476px',
              gap: '12px',
              [theme.breakpoints.down("md")]: {
                width: '100%',
                padding: '0',
                borderRadius: '0',
                borderColor: 'transparent',
                paddingTop: '20px',
              },
            })}>
              <Stack direction={'row'} alignItems={"center"} justifyContent={'space-between'}>
                <Stack sx={(theme) => ({
                  fontSize: '14px',
                  lineHeight: '20px',
                  fontWeight: '700',
                  color: theme.normal.text0,
                })}>
                  <Trans>
                    Overview
                  </Trans>
                </Stack>
                <Link to={'/account/assets/overview'}>
                  <Stack sx={(theme) => ({
                    padding: '8px',
                    border: `1px solid ${theme.normal.border}`,
                    borderRadius: '8px',
                    cursor: 'pointer',
                    svg: {
                      path: {
                        fill: theme.normal.text2,
                      }
                    },
                    "&: hover": {
                      backgroundColor: theme.normal.grey_hover,
                      svg: {
                        path: {
                          fill: theme.normal.text0,
                        }
                      },
                    },
                    [theme.breakpoints.down("md")]: {
                      padding: '4px',
                    }
                  })}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd"
                            d="M14.2222 9.70543C14.3849 9.86815 14.3849 10.132 14.2222 10.2947L7.15113 17.3658C6.98841 17.5285 6.7246 17.5285 6.56188 17.3658L5.95529 16.7592C5.79257 16.5964 5.79257 16.3326 5.95529 16.1699L12.1251 10.0001L5.95529 3.8302C5.79257 3.66749 5.79257 3.40367 5.95529 3.24095L6.56188 2.63436C6.72459 2.47164 6.98841 2.47164 7.15113 2.63436L14.2222 9.70543Z"
                            fill="#F9F9F9" fillOpacity="0.6"/>
                    </svg>
                  </Stack>
                </Link>
              </Stack>
              <Stack overflow={'scroll'}>
                {
                  moneyList?.length > 0 ? moneyList?.slice(0, 5)?.map((item, index) => (
                    <Stack
                      key={index}
                      sx={(theme) => ({
                        cursor: item?.hash?.includes('-') || item?.hash?.includes(':') ? '' : 'pointer',
                        gap: '12px',
                        borderBottom: `1px solid ${theme.normal.border}`,
                        [theme.breakpoints.down("md")]: {
                          border: `1px solid ${theme.normal.border}`,
                          borderRadius: '8px',
                        }
                      })}
                      onClick={() => {
                        if (item?.hash?.includes('-') || item?.hash?.includes(':')) return;
                        window.open(item?.hash?.hashToChainScan(item.chainId), '_blank')
                      }}
                    >
                      <Stack direction={'row'} gap={'12px'} p={'12px'}>
                        <Stack gap={'8px'} direction={'row'} alignItems={"center"} width={'100%'}>
                          <Stack sx={(theme) => ({
                            svg: {
                              rect: {
                                fill: theme.normal.grey_hover,
                              },
                              path: {
                                fill: theme.normal.text2,
                              }
                            }
                          })}>
                            {
                              DEPOSIT_TYPES.includes(item?.ordertype || '') ? (
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                  <rect width="16" height="16" rx="2" fill="#35373D"/>
                                  <path fillRule="evenodd" clipRule="evenodd"
                                        d="M12.5 7.5C12.7761 7.5 13 7.72386 13 8V12.5C13 12.7761 12.7761 13 12.5 13H3.5C3.22386 13 3 12.7761 3 12.5V8.00208C3 7.72593 3.22386 7.50208 3.5 7.50208C3.77614 7.50208 4 7.72593 4 8.00208V12H12V8C12 7.72386 12.2239 7.5 12.5 7.5Z"
                                        fill="#F9F9F9" fillOpacity="0.6"/>
                                  <path fillRule="evenodd" clipRule="evenodd"
                                        d="M5.39645 7.39645C5.59171 7.20118 5.90829 7.20118 6.10355 7.39645L8 9.29289L9.89645 7.39645C10.0917 7.20118 10.4083 7.20118 10.6036 7.39645C10.7988 7.59171 10.7988 7.90829 10.6036 8.10355L8.35355 10.3536C8.15829 10.5488 7.84171 10.5488 7.64645 10.3536L5.39645 8.10355C5.20118 7.90829 5.20118 7.59171 5.39645 7.39645Z"
                                        fill="#F9F9F9" fillOpacity="0.6"/>
                                  <path fillRule="evenodd" clipRule="evenodd"
                                        d="M7.99792 3C8.27407 3 8.49792 3.22386 8.49792 3.5V10C8.49792 10.2761 8.27407 10.5 7.99792 10.5C7.72178 10.5 7.49792 10.2761 7.49792 10V3.5C7.49792 3.22386 7.72178 3 7.99792 3Z"
                                        fill="#F9F9F9" fillOpacity="0.6"/>
                                </svg>
                              ) : (
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                  <rect width="16" height="16" rx="2" fill="#35373D"/>
                                  <path fillRule="evenodd" clipRule="evenodd"
                                        d="M12.5 7.5C12.7761 7.5 13 7.72386 13 8V12.5C13 12.7761 12.7761 13 12.5 13H3.5C3.22386 13 3 12.7761 3 12.5V8.00208C3 7.72593 3.22386 7.50208 3.5 7.50208C3.77614 7.50208 4 7.72593 4 8.00208V12H12V8C12 7.72386 12.2239 7.5 12.5 7.5Z"
                                        fill="#F9F9F9" fillOpacity="0.6"/>
                                  <path fillRule="evenodd" clipRule="evenodd"
                                        d="M5.39645 6.10355C5.20118 5.90829 5.20118 5.59171 5.39645 5.39645L7.64645 3.14645C7.84171 2.95118 8.15829 2.95118 8.35355 3.14645L10.6036 5.39645C10.7988 5.59171 10.7988 5.90829 10.6036 6.10355C10.4083 6.29882 10.0917 6.29882 9.89645 6.10355L8 4.20711L6.10355 6.10355C5.90829 6.29882 5.59171 6.29882 5.39645 6.10355Z"
                                        fill="#F9F9F9" fillOpacity="0.6"/>
                                  <path fillRule="evenodd" clipRule="evenodd"
                                        d="M7.99792 10.5C7.72178 10.5 7.49792 10.2761 7.49792 10V3.5C7.49792 3.22386 7.72178 3 7.99792 3C8.27407 3 8.49792 3.22386 8.49792 3.5V10C8.49792 10.2761 8.27407 10.5 7.99792 10.5Z"
                                        fill="#F9F9F9" fillOpacity="0.6"/>
                                </svg>
                              )
                            }
                          </Stack>
                          <Stack gap={'10px'} width={'100%'}>
                            <Stack direction={'row'} gap={'4px'} alignItems={"center"}>
                              <Stack sx={(theme) => ({
                                fontSize: '14px',
                                fontWeight: '400',
                                lineHeight: '20px',
                                color: theme.normal.text0,
                              })}>{showNumber ? item?.text : '******'}</Stack>
                              <Stack sx={(theme) => ({
                                fontSize: '10px',
                                fontWeight: '400',
                                lineHeight: '14px',
                                color: theme.normal.text0,
                              })}>{parseOrderType(item?.ordertype || '', item?.info)}</Stack>
                            </Stack>
                            <Stack sx={(theme) => ({
                              fontSize: '10px',
                              fontWeight: '400',
                              lineHeight: '14px',
                              color: theme.normal.text2,
                            })}>
                              {item?.status === 0 || item?.status === 255 ? new Date((item?.applyTime || 0) * 1000).toLocaleString() : new Date(item?.time * 1000).toLocaleString()}
                            </Stack>
                          </Stack>
                          <Stack px={'4px'} py={'3px'} sx={(theme) => ({
                            fontSize: '10px',
                            fontWeight: '700',
                            lineHeight: '14px',
                            border: `1px solid ${item?.status === 1 ? theme.normal.success_light_hover : (item?.status === -1 ? theme.normal.danger_light_hover : theme.normal.primary_light_hover)}`,
                            borderRadius: '4px',
                            color: item?.status === 1 ? theme.normal.success : (item?.status === -1 ? theme.normal.danger : theme.normal.primary),
                          })}>
                            {item?.status === -1 && 'Fail'}
                            {(item?.status === 0 || item?.status === 255) && 'Pending'}
                            {item?.status === 1 && 'Success'}
                          </Stack>
                        </Stack>
                        <Stack width={'16px'} justifyContent={'center'}
                               sx={(theme) => ({
                                 opacity: (item?.hash?.includes('-') || item?.hash?.includes(':')) ? 0 : 1,
                                 svg: {
                                   path: {
                                     fill: theme.normal.text2,
                                   }
                                 }
                               })}>
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                               xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd"
                                  d="M11.2359 7.76435C11.366 7.89452 11.366 8.10558 11.2359 8.23575L5.57901 13.8926C5.44884 14.0228 5.23778 14.0228 5.10761 13.8926L4.62234 13.4073C4.49216 13.2772 4.49216 13.0661 4.62234 12.9359L9.55822 8.00005L4.62234 3.06417C4.49216 2.93399 4.49216 2.72294 4.62234 2.59276L5.10761 2.10749C5.23778 1.97732 5.44884 1.97732 5.57901 2.10749L11.2359 7.76435Z"
                                  fill="#F9F9F9" fillOpacity="0.6"/>
                          </svg>
                        </Stack>
                      </Stack>
                    </Stack>
                  )) : (
                    <NoOrderMobile>
                      <Trans>
                        No Orders
                      </Trans>
                    </NoOrderMobile>
                  )
                }
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        <Stack gap={'24px'} position={"relative"}>
          <Stack width={['100%', '100%', '100%', '240px']}
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
        <Stack height={'80px'}/>
      </Stack>
    </Stack>
  )
}

export default Assets