import Stack from "@mui/material/Stack";
import Menu from "../Share/Menu";
import {Trans, t} from "@lingui/macro";
import Box from "@mui/material/Box";
import useWindowWidth from "../../../hooks/useWindowWidth";
import {useSearchParams} from "react-router-dom";
import {useEffect, useMemo, useState} from "react";
import useArithFi from "../../../hooks/useArithFi";
import ArithFiTabs from "../../../components/ArithFiTabs/ArithFiTabs";
import MobileList, {AccountListType} from "./Components/MobileList";
import {NoOrderMobile} from "../../Futures/OrderList";
import MoneyTable from "./Components/MoneyTable";
import MobileMenu from "../Share/MobileMenu";
import useSWR from "swr";
import {serviceBaseURL} from "../../../lib/ArithFiRequest";

export const DEPOSIT_TYPES = ['AIRDROP', 'SETTLE_SERVICE_FEE', "SETTLE_COPY_REWARDS", 'SETTLE_COPY_RETURNS', 'USER_DEPOSIT', 'COPY_TO_AVAILABLE'];
export const WITHDRAW_TYPES = ["USER_WITHDRAW", "AVAILABLE_TO_COPY"];

export const parseOrderType = (type: string | undefined) => {
  switch (type) {
    case "AIRDROP":
    case "USER_DEPOSIT":
    case "SETTLE_SERVICE_FEE":
      return t`Deposit`;
    case "SETTLE_COPY_REWARDS":
      return t`Profit Sharing`;
    case "SETTLE_COPY_RETURNS":
      return t`Return`;
    case "COPY_TO_AVAILABLE":
      return t`Copy Settle`;
    case "WITHDRAW":
      return t`Withdraw`;
    case "AVAILABLE_TO_COPY":
      return t`Copy Transfer`;
    default:
      return type ?? "";
  }
}

const Overview = () => {
  const {isBigMobile} = useWindowWidth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [tabsValue, setTabsValue] = useState(
    searchParams.get("type") === "withdraw" ? 1 : 0
  );
  const {checkSigned} = useArithFi();
  const q = searchParams.get('address');
  const {chainsData, account, signature} = useArithFi()

  const { data: withdrawData } = useSWR((q || account) ? `${serviceBaseURL(chainsData.chainId)}/user/listWithdraw?toAddress=${q || account.address}&status=0` : undefined, (url: string) => fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": signature?.signature || ""
    }
  })
    .then(res => res.json())
    .then(res => res.data));

  const { data: depositData } = useSWR((q || account) ? `${serviceBaseURL(chainsData.chainId)}/user/listDeposit?txAddress=${q || account.address}&status=0` : undefined, (url: string) => fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": signature?.signature || ""
    }
  })
    .then(res => res.json())
    .then(res => res.data));

  const {data: assetRecord} = useSWR((account || q) ? `${serviceBaseURL(chainsData.chainId)}/user/listAssetRecord?walletAddress=${q || account.address}` : undefined,
    (url: any) => fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": signature?.signature || ""
      }
    })
      .then(res => res.json())
      .then(res => res.data));

  useEffect(() => {
    if (!checkSigned) {
      window.location.replace("/#/futures");
    }
  }, [checkSigned]);

  const tabs = useMemo(() => {
    const accountTabsData = [
      <Stack direction={"row"} alignItems={"center"} spacing={"4px"}>
        <p>
          <Trans>Deposit</Trans>
        </p>
      </Stack>,
      <Stack direction={"row"} alignItems={"center"} spacing={"4px"}>
        <p>
          <Trans>Withdraw</Trans>
        </p>
      </Stack>,
    ];
    return (
      <ArithFiTabs
        value={tabsValue}
        className={"AccountTabs"}
        datArray={accountTabsData}
        height={44}
        space={24}
        selectCallBack={(value: number) => {
          if (value === 0) {
            setSearchParams({type: "deposit"});
          } else if (value === 1) {
            setSearchParams({type: "withdraw"});
          }
          setTabsValue(value);
        }}
        isFull={false}
      />
    );
  }, [tabsValue]);
  const listType = useMemo(() => {
    if (tabsValue === 0) {
      return AccountListType.deposit;
    } else if (tabsValue === 1) {
      return AccountListType.withdraw;
    } else {
      return AccountListType.transaction;
    }
  }, [tabsValue]);
  const list = useMemo(() => {
    let filterList: any[];
    const withdrawList = withdrawData ? withdrawData?.map((item: any) => ({
      text: `${item.value.toFixed(2)} ATF`,
      time: new Date(item["ts"]).getTime() / 1000,
      status: item["status"],
      chainId: item.chainId,
      hash: item.hash,
      type: "USER_WITHDRAW",
      ordertype: parseOrderType("USER_WITHDRAW"),
    })) : [];
    const depositList = depositData ? depositData?.map((item: any) => ({
      text: `${item.value.toFixed(2)} ATF`,
      time: new Date(item["ts"]).getTime() / 1000,
      status: item["status"],
      chainId: item.chainId,
      hash: item.hash,
      type: "USER_DEPOSIT",
      ordertype: parseOrderType("USER_DEPOSIT"),
    })) : [];
    if (tabsValue === 1) {
      filterList = withdrawList.concat(assetRecord
        ?.filter((item: any) => WITHDRAW_TYPES.includes(item.type))
        ?.map((item: any) => ({
          text: `${(item?.availableDelta || item?.copyDelta || 0).toFixed(2)} ATF`,
          time: new Date(item["ts"]).getTime() / 1000,
          status: item["status"],
          chainId: item.chainId,
          hash: item.hash,
          type: item.type,
          ordertype: parseOrderType(item.type),
        })))
    } else {
      filterList = depositList.concat(assetRecord
        ?.filter((item: any) => DEPOSIT_TYPES.includes(item.type))
        ?.map((item: any) => ({
          text: `${(item?.availableDelta || item?.copyDelta || 0).toFixed(2)} ATF`,
          time: new Date(item["ts"]).getTime() / 1000,
          status: item["status"],
          chainId: item.chainId,
          hash: item.hash,
          ordertype: parseOrderType(item.type),
        }))).sort((a: any, b: any) => b.time - a.time)
    }

    if (isBigMobile) {
      if (filterList && filterList?.length === 0) {
        return (
          <NoOrderMobile>
            <Trans>No Order</Trans>
          </NoOrderMobile>
        );
      }
      return (
        <Stack spacing={"16px"}>
          {filterList?.map((item, index: number) => {
            return (
              <MobileList
                key={`AccountMobileList + ${index}`}
                type={listType}
                data={item}
              />
            );
          })}
        </Stack>
      );
    } else {
      return <MoneyTable list={filterList || []} type={listType}/>;
    }
  }, [isBigMobile, listType, tabsValue, assetRecord]);

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
          [theme.breakpoints.up(1640)]: {
            maxWidth: '1200px',
          },
          [theme.breakpoints.between(1440, 1640)]: {
            maxWidth: '984px',
          },
        })}
        width={'100%'}
        mt={'40px'}
        px={'16px'}
        gap={'40px'}
      >
        <Stack
          direction={"row"}
          justifyContent={"space-around"}
          alignItems={"center"}
        >
          <Stack
            spacing={"40px"}
            maxWidth={"1100px"}
            width={"100%"}
            paddingY={["0", "0", "0", "40px"]}
          >
            {isBigMobile ? (
              <a href={"/#/account"}>
                <Stack
                  sx={(theme) => ({
                    fontSize: "14px",
                    lineHeight: "20px",
                    fontWeight: "400",
                    color: theme.normal.text0,
                    borderBottom: `1px solid ${theme.normal.border}`,
                    "& svg path": {
                      fill: theme.normal.text2,
                    },
                  })}
                  direction={"row"}
                  alignItems={"center"}
                  spacing={"8px"}
                  paddingY={"16px"}
                  paddingX={"24px"}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M4.76413 8.23565C4.63396 8.10548 4.63396 7.89442 4.76414 7.76425L10.421 2.1074C10.5512 1.97722 10.7622 1.97722 10.8924 2.1074L11.3777 2.59267C11.5078 2.72284 11.5078 2.9339 11.3777 3.06407L6.44178 7.99995L11.3777 12.9358C11.5078 13.066 11.5078 13.2771 11.3777 13.4072L10.8924 13.8925C10.7622 14.0227 10.5512 14.0227 10.421 13.8925L4.76413 8.23565Z"
                      fill="#F9F9F9"
                      fillOpacity="0.6"
                    />
                  </svg>
                  <span>
                  <Trans>Account</Trans>
                </span>
                </Stack>
              </a>
            ) : (
              <Stack
                direction={"row"}
                spacing={"12px"}
                alignItems={"center"}
                sx={(theme) => ({
                  padding: "16px",
                  borderBottom: `1px solid ${theme.normal.border}`,
                })}
              >
                <a href={"/#/account"}>
                  <Box
                    sx={(theme) => ({
                      color: theme.normal.text2,
                      fontSize: "14px",
                      lineHeight: "20px",
                      fontWeight: "400",
                      cursor: "pointer",
                      padding: "4px 8px",
                      borderRadius: "4px",
                      "&:hover": {
                        backgroundColor: theme.normal.grey_hover,
                      },
                    })}
                  >
                    <Trans>Account</Trans>
                  </Box>
                </a>
                <Box
                  sx={(theme) => ({
                    color: theme.normal.text2,
                    fontSize: "14px",
                    lineHeight: "20px",
                    fontWeight: "400",
                  })}
                >
                  /
                </Box>
                <Stack
                  sx={(theme) => ({
                    color: theme.normal.text0,
                    fontSize: "14px",
                    lineHeight: "20px",
                    fontWeight: "400",
                  })}
                >
                  <Trans>Overview</Trans>
                </Stack>
              </Stack>
            )}
            <Stack
              spacing={["12px", "12px", "12px", "16px"]}
              paddingX={["24px", "24px", "24px", "24px", 0]}
            >
              <Stack
                direction={"row"}
                justifyContent={"start"}
                paddingX={[0, 0, 0, "16px"]}
                sx={(theme) => ({
                  borderBottom: isBigMobile
                    ? `1px solid none`
                    : `1px solid ${theme.normal.border}`,
                  boxSizing: "border-box",
                })}
              >
                {tabs}
              </Stack>
              {list}
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default Overview