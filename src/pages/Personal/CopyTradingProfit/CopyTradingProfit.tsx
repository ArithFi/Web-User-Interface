import {Stack} from "@mui/material";
import Box from "@mui/material/Box";
import copy from "copy-to-clipboard";
import useArithFiSnackBar from "../../../hooks/useArithFiSnackBar";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import useWindowWidth from "../../../hooks/useWindowWidth";
import {Copy, DownIcon, SearchIcon} from "../../../components/icons";
import {useMemo, useState} from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import useSWR from "swr";
import {Trans, t} from "@lingui/macro";
import {useParams} from "react-router-dom";
import {useAccount} from "wagmi";
import useArithFi from "../../../hooks/useArithFi";
import {DownSort, Input, InputPC, NoSort, PaginationButton, Select1, UpSort} from "../Referral/Referral";

const CopyTradingProfit = () => {
  const {messageSnackBar} = useArithFiSnackBar();
  const {isBigMobile} = useWindowWidth();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [sortItem, setSortItem] = useState({
    key: "pendingProfit",
    sort: "desc",
  });
  const [searchText, setSearchText] = useState("");
  const {address} = useParams();
  const {address: user} = useAccount();
  const {chainsData} = useArithFi();
  const pageWindow = useMemo(() => {
    if (totalPage <= 5) {
      return Array.from({length: totalPage}, (v, k) => k + 1);
    }
    if (currentPage <= 3) {
      return [1, 2, 3, 4, 5];
    }
    if (currentPage >= totalPage - 2) {
      return [
        totalPage - 4,
        totalPage - 3,
        totalPage - 2,
        totalPage - 1,
        totalPage,
      ];
    }
    return [
      currentPage - 2,
      currentPage - 1,
      currentPage,
      currentPage + 1,
      currentPage + 2,
    ];
  }, [currentPage, totalPage]);

  const {data: overview} = useSWR(
    address || user
      ? `https://db.arithfi.com/arithfi/copy/kol/reward/overview?copyKolAddress=${
        address || user
      }&chainId=${chainsData.chainId ?? 56}`
      : undefined,
    (url) => fetch(url)
      .then((res) => res.json())
      .then(res => res.value)
  );

  const {data: listData} = useSWR(
    address || user
      ? `https://db.arithfi.com/arithfi/copy/kol/reward/list?copyKolAddress=${
        address || user
      }&chainId=${chainsData.chainId ?? 56}`
      : undefined,
    (url) => fetch(url)
      .then((res) => res.json())
  );

  const {data: isKol} = useSWR(
    address || user
      ? `https://db.arithfi.com/dashboardapi/invite/is-kol-whitelist/${
        address ?? user
      }`
      : undefined,
    (url: any) =>
      fetch(url)
        .then((res) => res.json())
        .then((res: any) => res.value)
  );

  const inviteeList = useMemo(() => {
    if (!listData) {
      return [];
    }
    setTotalPage(Math.ceil(listData?.value?.length / 10));
    return listData?.value
      ?.filter((item: any) => {
        return item.walletAddress
          .toLowerCase()
          .includes(searchText.toLowerCase());
      })
      .sort((a: any, b: any) => {
        if (sortItem.key === "default") {
          return 0;
        }
        if (sortItem.sort === "asc") {
          if (sortItem.key === 'settlementTime') {
            return new Date(a[sortItem.key]).getTime() - new Date(b[sortItem.key]).getTime();
          }
          return a[sortItem.key] - b[sortItem.key];
        }
        if (sortItem.key === 'settlementTime') {
          return new Date(b[sortItem.key]).getTime() - new Date(a[sortItem.key]).getTime();
        }
        return b[sortItem.key] - a[sortItem.key];
      });
  }, [listData, sortItem, searchText]);

  const PCOrderRow = (props: any) => {
    return (
      <TableRow
        sx={(theme) => ({
          ":hover": {
            background: theme.normal.bg1,
          },
        })}
      >
        <TableCell>
          <Stack direction={"row"} spacing={"8px"} alignItems={"center"}>
            <Box
              sx={(theme) => ({
                fontSize: "16px",
                lineHeight: "22px",
                color: theme.normal.text0,
                fontWeight: 700,
              })}
            >
              {props.item?.walletAddress || "0"}
            </Box>
            <Box
              onClick={() => {
                copy(props.item?.walletAddress);
                messageSnackBar(t`Copy Successfully`);
              }}
              sx={(theme) => ({
                svg: {
                  cursor: "pointer",
                  width: 14,
                  height: 14,
                  display: "block",
                  "& path": {
                    fill: theme.normal.text2,
                  },
                },
                "&:hover": {
                  svg: {
                    cursor: "pointer",
                    width: 14,
                    height: 14,
                    display: "block",
                    "& path": {
                      fill: theme.normal.primary_hover,
                    },
                  },
                },
                "&:active": {
                  svg: {
                    cursor: "pointer",
                    width: 14,
                    height: 14,
                    display: "block",
                    "& path": {
                      fill: theme.normal.primary_active,
                    },
                  },
                },
              })}
            >
              <Copy/>
            </Box>
          </Stack>
        </TableCell>
        <TableCell>
          <Box
            sx={(theme) => ({
              fontSize: "16px",
              lineHeight: "22px",
              color: theme.normal.text0,
              fontWeight: 700,
            })}
          >
            {props.item?.copyTransactions?.toLocaleString() || "0"}
          </Box>
        </TableCell>
        <TableCell>
          <Box
            sx={(theme) => ({
              fontSize: "16px",
              lineHeight: "22px",
              color: theme.normal.text0,
              fontWeight: 700,
            })}
          >
            {props.item?.profitLoss?.toLocaleString() || "0"}
          </Box>
        </TableCell>
        <TableCell>
          <Box
            sx={(theme) => ({
              fontSize: "16px",
              lineHeight: "22px",
              color: theme.normal.text0,
              fontWeight: 700,
            })}
          >
            {props.item?.pendingProfit?.toLocaleString() || "0"}
          </Box>
        </TableCell>
        <TableCell>
          <Box
            sx={(theme) => ({
              fontSize: "16px",
              lineHeight: "22px",
              color: theme.normal.text0,
              fontWeight: 700,
            })}
          >
            {props.item?.settlementTime?.slice(0, 10) || "0"}
          </Box>
        </TableCell>
      </TableRow>
    );
  };

  const MobileOrderCard = (props: any) => {
    return (
      <Stack
        spacing={"4px"}
        p={"20px 16px"}
        sx={(theme) => ({
          background: theme.normal.bg1,
          borderRadius: "12px",
        })}
      >
        <Stack
          direction={"row"}
          spacing={"8px"}
          sx={(theme) => ({
            fontSize: "12px",
            lineHeight: "16px",
            color: theme.normal.text2,
            fontWeight: 400,
            borderBottom: `1px solid ${theme.normal.border}`,
            paddingBottom: "8px",
          })}
        >
          <Box>{props.item?.walletAddress}</Box>
          <Box
            sx={(theme) => ({
              svg: {
                cursor: "pointer",
                width: 14,
                height: 14,
                display: "block",
                "& path": {
                  fill: theme.normal.text2,
                },
              },
            })}
            onClick={() => {
              copy(props.item?.walletAddress || "");
              messageSnackBar(t`Copy Successfully`);
            }}
          >
            <Copy/>
          </Box>
        </Stack>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          py={"8px"}
          sx={(theme) => ({
            borderBottom: `1px solid ${theme.normal.border}`,
          })}
        >
          <Stack spacing={"4px"} width={"100%"}>
            <Box
              sx={(theme) => ({
                fontSize: "12px",
                lineHeight: "16px",
                color: theme.normal.text2,
                fontWeight: 400,
              })}
            >
              <Trans>Total Trading Volume</Trans>
            </Box>
            <Box
              sx={(theme) => ({
                fontSize: "14px",
                lineHeight: "20px",
                color: theme.normal.text0,
                fontWeight: 700,
              })}
            >
              {props.item?.copyTransactions?.toLocaleString() || "0"} ATF
            </Box>
          </Stack>
          <Stack spacing={"4px"} width={"100%"}>
            <Box
              sx={(theme) => ({
                fontSize: "12px",
                lineHeight: "16px",
                color: theme.normal.text2,
                fontWeight: 400,
              })}
            >
              <Trans>Total Profit</Trans>
            </Box>
            <Box
              sx={(theme) => ({
                fontSize: "14px",
                lineHeight: "20px",
                color: theme.normal.text0,
                fontWeight: 700,
              })}
            >
              {props.item?.profitLoss?.toLocaleString() || "0"} ATF
            </Box>
          </Stack>
        </Stack>
        <Stack direction={"row"} justifyContent={"space-between"} pt={"8px"}>
          <Stack direction={"row"} spacing={"4px"} width={"100%"}>
            <Box
              sx={(theme) => ({
                fontSize: "12px",
                lineHeight: "16px",
                color: theme.normal.text2,
                fontWeight: 400,
              })}
            >
              <Trans>Settled</Trans>
            </Box>
            <Box
              sx={(theme) => ({
                fontSize: "12px",
                lineHeight: "16px",
                color: theme.normal.text0,
                fontWeight: 400,
              })}
            >
              {props.item?.pendingProfit?.toLocaleString() || "0"} ATF
            </Box>
          </Stack>
          <Stack direction={"row"} spacing={"4px"} width={"100%"}>
            <Box
              sx={(theme) => ({
                fontSize: "12px",
                lineHeight: "16px",
                color: theme.normal.text2,
                fontWeight: 400,
              })}
            >
              <Trans>Time</Trans>
            </Box>
            <Box
              sx={(theme) => ({
                fontSize: "12px",
                lineHeight: "16px",
                color: theme.normal.text0,
                fontWeight: 400,
              })}
            >
              {props.item?.settlementTime?.slice(0, 10) || "0"}
            </Box>
          </Stack>
        </Stack>
      </Stack>
    );
  };

  return (
    <Stack alignItems={"center"} width={"100%"}>
      <Stack
        direction={"row"}
        width={"100%"}
        justifyContent={"center"}
        spacing={"32px"}
        sx={(theme) => ({
          color: theme.normal.text0,
          fontWeight: 700,
          fontSize: "16px",
          lineHeight: "22px",
          background: theme.normal.bg1,
          borderBottom: `1px solid ${theme.normal.border}`,
          borderTop: `1px solid ${theme.normal.border}`,
          padding: "0 20px",
        })}
      >
        <Stack
          sx={(theme) => ({
            paddingY: "11px",
            alignItems: "center",
            a: {
              color: theme.normal.text0,
              cursor: "pointer",
              "&:hover": {
                color: theme.normal.primary,
              },
            },
            cursor: "pointer",
          })}
          width={["100%", "100%", "auto"]}
        >
          <a href={`/#/account`}>
            <Trans>Personal</Trans>
          </a>
        </Stack>
        {
          isKol && (
            <Stack
              sx={(theme) => ({
                paddingY: "11px",
                alignItems: "center",
                a: {
                  color: theme.normal.text0,
                  cursor: "pointer",
                  "&:hover": {
                    color: theme.normal.primary,
                  },
                },
                cursor: "pointer",
              })}
              width={["100%", "100%", "auto"]}
            >
              <a href={`/#/referral`}>
                <Trans>Referral</Trans>
              </a>
            </Stack>
          )
        }
        <Stack
          sx={(theme) => ({
            paddingY: "11px",
            alignItems: "center",
            borderBottom: `2px solid ${theme.normal.primary}`,
            a: {
              color: theme.normal.primary,
              cursor: "pointer",
              "&:hover": {
                color: theme.normal.primary,
              },
              whiteSpace: 'nowrap',
            },
            cursor: "pointer",
          })}
          width={["100%", "100%", "auto"]}
        >
          <a href={`/#/referral-copy`}>
            <Trans>Copy Trading Profit</Trans>
          </a>
        </Stack>
      </Stack>
      <Stack
        maxWidth={"1600px"}
        px={["0", "0", "20px"]}
        width={"100%"}
        spacing={["12px", "12px", "80px"]}
        pt={["0", "0", "40px"]}
        pb={["20px", "20px", "40px"]}
      >
        <Stack
          spacing={["20px", "20px", "40px"]}
          sx={(theme) => ({
            width: "100%",
            padding: "20px",
            border: isBigMobile ? "" : `1px solid ${theme.normal.border}`,
            borderRadius: "12px",
          })}
        >
          {isBigMobile ? (
            <>
              <Stack
                direction={"row"}
                alignItems={"center"}
                spacing={"8px"}
                justifyContent={"space-between"}
              >
                <Stack
                  direction={"row"}
                  spacing={"8px"}
                  alignItems={"center"}
                  sx={(theme) => ({
                    color: theme.normal.text0,
                    fontWeight: 700,
                    fontSize: "16px",
                    lineHeight: "22px",
                  })}
                >
                  <div>
                    <Trans>Overview</Trans>
                  </div>
                </Stack>
              </Stack>
            </>
          ) : (
            <>
              <Stack
                direction={"row"}
                width={"100%"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Stack
                  direction={"row"}
                  spacing={"8px"}
                  alignItems={"center"}
                  sx={(theme) => ({
                    color: theme.normal.text2,
                    fontWeight: 700,
                    fontSize: "14px",
                    lineHeight: "20px",
                  })}
                >
                  <div>
                    <Trans>Overview</Trans>
                  </div>
                </Stack>
              </Stack>
              <Stack
                direction={"row"}
                width={"100%"}
                justifyContent={"space-between"}
                spacing={"16px"}
              >
                {[
                  {
                    title: t`Cumulative Profit`,
                    value: overview?.cumulative_profit || 0,
                    unit: "ATF",
                  },
                  {
                    title: t`Previous Profit`,
                    value: overview?.previous_profit || 0,
                    unit: "ATF",
                  },
                  {
                    title: t`Pending Profit`,
                    value: overview?.pending_profit || 0,
                    unit: "ATF",
                  },
                ].map((item, index) => (
                  <Stack
                    key={index}
                    spacing={"12px"}
                    sx={(theme) => ({
                      width: "100%",
                      minWidth: "200px",
                      overflow: "hidden",
                      color: theme.normal.text0,
                      fontWeight: 700,
                      fontSize: "28px",
                      lineHeight: "40px",
                      span: {
                        color: theme.normal.text2,
                        fontWeight: 700,
                        fontSize: "14px",
                        lineHeight: "20px",
                      },
                      padding: "40px",
                      background: theme.normal.bg1,
                      borderRadius: "12px",
                    })}
                  >
                    <div>
                      {item.value.toLocaleString("en-US")} {item.unit}
                    </div>
                    <span>{item.title}</span>
                  </Stack>
                ))}
              </Stack>
            </>
          )}
          {isBigMobile && (
            <Stack
              sx={(theme) => ({
                background: theme.normal.bg1,
                borderRadius: "12px",
                padding: "20px 12px",
              })}
              spacing={"20px"}
            >
              <Stack spacing={"4px"}>
                <Box
                  sx={(theme) => ({
                    color: theme.normal.text2,
                  })}
                >
                  <Trans>Cumulative Profit</Trans>
                </Box>
                <Box
                  sx={(theme) => ({
                    color: theme.normal.text0,
                    fontWeight: 700,
                    fontSize: "24px",
                    lineHeight: "32px",
                  })}
                >
                  {overview?.cumulative_profit || 0} ATF
                </Box>
              </Stack>
              <Box
                sx={(theme) => ({
                  borderBottom: `1px solid ${theme.normal.border}`,
                })}
              ></Box>
              <Stack direction={"row"} justifyContent={"space-between"}>
                <Box
                  sx={(theme) => ({
                    color: theme.normal.text2,
                    fontSize: "14px",
                    lineHeight: "20px",
                    fontWeight: 400,
                  })}
                >
                  <Trans>Previous Profit</Trans>
                </Box>
                <Box
                  sx={(theme) => ({
                    color: theme.normal.text0,
                    fontSize: "16px",
                    lineHeight: "22px",
                    fontWeight: 700,
                  })}
                >
                  {overview?.previous_profit || 0} ATF
                </Box>
              </Stack>
              <Stack direction={"row"} justifyContent={"space-between"}>
                <Box
                  sx={(theme) => ({
                    color: theme.normal.text2,
                    fontSize: "14px",
                    lineHeight: "20px",
                    fontWeight: 400,
                  })}
                >
                  <Trans>Pending Profit</Trans>
                </Box>
                <Box
                  sx={(theme) => ({
                    color: theme.normal.text0,
                    fontSize: "16px",
                    lineHeight: "22px",
                    fontWeight: 700,
                  })}
                >
                  {overview?.pending_profit || 0} ATF
                </Box>
              </Stack>
            </Stack>
          )}
        </Stack>
        <Stack width={"100%"} spacing={"12px"}>
          {isBigMobile ? (
            <>
              <Stack
                direction={"row"}
                spacing={"8px"}
                alignItems={"center"}
                sx={(theme) => ({
                  color: theme.normal.text0,
                  padding: "11px 20px",
                  fontWeight: 700,
                  fontSize: "16px",
                  lineHeight: "22px",
                  borderBottom: `1px solid ${theme.normal.border}`,
                })}
              >
                <div>
                  <Trans>My commissions</Trans>
                </div>
              </Stack>
              {listData?.value?.length > 0 && (
                <Stack
                  direction={"row"}
                  px={"20px"}
                  spacing={"8px"}
                  height={"38px"}
                >
                  <Box position={"relative"} width={"100%"} height={"100%"}>
                    <Box
                      position={"absolute"}
                      sx={(theme) => ({
                        color: theme.normal.text2,
                        right: "12px",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        "& svg": {
                          height: "12px",
                          width: "12px",
                          "& path": {
                            fill: theme.normal.text2,
                          },
                        },
                      })}
                    >
                      <DownIcon/>
                    </Box>
                    <Select1
                      value={sortItem.key}
                      onChange={(e) => {
                        setSortItem({
                          key: e.target.value,
                          sort: "desc",
                        });
                      }}
                    >
                      <option value={"default"}>
                        <Trans>Default</Trans>
                      </option>
                      <option value={"copyTransactions"}>
                        <Trans>Trading Volume</Trans>
                      </option>
                      <option value={"profitLoss"}>
                        <Trans>Total Profit</Trans>
                      </option>
                      <option value={"pendingProfit"}>
                        <Trans>Unsettled Commissions</Trans>
                      </option>
                      <option value={"settlementTime"}>
                        <Trans>Time</Trans>
                      </option>
                    </Select1>
                  </Box>
                  <Box position={"relative"} width={"100%"} height={"100%"}>
                    <Box
                      position={"absolute"}
                      sx={(theme) => ({
                        color: theme.normal.text2,
                        right: "12px",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        "& svg": {
                          height: "12px",
                          width: "12px",
                          "& path": {
                            fill: theme.normal.text2,
                          },
                        },
                      })}
                    >
                      <SearchIcon/>
                    </Box>
                    <Input
                      placeholder={t`Search`}
                      value={searchText}
                      onChange={(e) => {
                        setSearchText(e.target.value);
                      }}
                    />
                  </Box>
                </Stack>
              )}
              <Stack px={"20px"} spacing={"12px"}>
                {inviteeList?.map((item: any, index: number) => (
                  <MobileOrderCard item={item} key={index}/>
                ))}
                {inviteeList?.length === 0 && (
                  <Stack
                    justifyContent={"center"}
                    alignItems={"center"}
                    height={"60px"}
                    sx={(theme) => ({
                      color: theme.normal.text2,
                      background: theme.normal.bg1,
                      borderRadius: "12px",
                      fontSize: "14px",
                      lineHeight: "20px",
                      fontWeight: 400,
                    })}
                  >
                    <Trans>No commissions yet</Trans>
                  </Stack>
                )}
              </Stack>
            </>
          ) : (
            <>
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
                px={"20px"}
                sx={(theme) => ({
                  color: theme.normal.text0,
                  fontWeight: 700,
                  fontSize: "16px",
                  lineHeight: "22px",
                  paddingBottom: "12px",
                  borderBottom: `1px solid ${theme.normal.border}`,
                })}
              >
                <Stack
                  direction={"row"}
                  spacing={"8px"}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <div>
                    <Trans>My commissions</Trans>
                  </div>
                </Stack>

                <Box position={"relative"} height={"28px"}>
                  <Box
                    position={"absolute"}
                    sx={(theme) => ({
                      color: theme.normal.text2,
                      right: "12px",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      "& svg": {
                        height: "12px",
                        width: "12px",
                        "& path": {
                          fill: theme.normal.text2,
                        },
                      },
                    })}
                  >
                    <SearchIcon/>
                  </Box>
                  <InputPC
                    placeholder={"Search"}
                    value={searchText}
                    onChange={(e) => {
                      setSearchText(e.target.value);
                    }}
                  ></InputPC>
                </Box>
              </Stack>
              <TableContainer component={"div"}>
                <Table sx={{width: "100%"}} aria-label="simple table">
                  <TableHead
                    sx={(theme) => ({
                      "& th": {
                        padding: "0 20px",
                        height: "44px",
                        fontWeight: 400,
                        fontSize: 12,
                        lineHeight: "16px",
                        color: theme.normal.text2,
                        borderBottom: `1px solid ${theme.normal.border}`,
                      },
                    })}
                  >
                    <TableRow>
                      <TableCell align="left">
                        <Trans>Copy Trading Address</Trans>
                      </TableCell>
                      <TableCell align="left">
                        <Stack
                          direction={"row"}
                          spacing={"8px"}
                          onClick={() => {
                            setCurrentPage(1);
                            if (
                              sortItem.key === "copyTransactions" &&
                              sortItem.sort === "asc"
                            ) {
                              setSortItem({
                                key: "default",
                                sort: "desc",
                              });
                              return;
                            }
                            setSortItem({
                              key: "copyTransactions",
                              sort:
                                sortItem.key === "copyTransactions"
                                  ? sortItem.sort === "asc"
                                    ? "desc"
                                    : "asc"
                                  : "desc",
                            });
                          }}
                          style={{cursor: "pointer", userSelect: "none"}}
                        >
                          <div>
                            <Trans>Total Trading Volume</Trans>
                          </div>
                          {sortItem.key === "copyTransactions" ? (
                            sortItem.sort === "asc" ? (
                              <UpSort/>
                            ) : (
                              <DownSort/>
                            )
                          ) : (
                            <NoSort/>
                          )}
                        </Stack>
                      </TableCell>
                      <TableCell align="left">
                        <Stack
                          direction={"row"}
                          spacing={"8px"}
                          onClick={() => {
                            setCurrentPage(1);
                            if (
                              sortItem.key === "profitLoss" &&
                              sortItem.sort === "asc"
                            ) {
                              setSortItem({
                                key: "default",
                                sort: "desc",
                              });
                              return;
                            }
                            setSortItem({
                              key: "profitLoss",
                              sort:
                                sortItem.key === "profitLoss"
                                  ? sortItem.sort === "asc"
                                    ? "desc"
                                    : "asc"
                                  : "desc",
                            });
                          }}
                          style={{cursor: "pointer", userSelect: "none"}}
                        >
                          <div>
                            <Trans>Total Profit</Trans>
                          </div>
                          {sortItem.key === "profitLoss" ? (
                            sortItem.sort === "asc" ? (
                              <UpSort/>
                            ) : (
                              <DownSort/>
                            )
                          ) : (
                            <NoSort/>
                          )}
                        </Stack>
                      </TableCell>
                      <TableCell align="left">
                        <Stack
                          direction={"row"}
                          spacing={"8px"}
                          onClick={() => {
                            setCurrentPage(1);
                            if (
                              sortItem.key === "pendingProfit" &&
                              sortItem.sort === "asc"
                            ) {
                              setSortItem({
                                key: "default",
                                sort: "desc",
                              });
                              return;
                            }
                            setSortItem({
                              key: "pendingProfit",
                              sort:
                                sortItem.key === "pendingProfit"
                                  ? sortItem.sort === "asc"
                                    ? "desc"
                                    : "asc"
                                  : "desc",
                            });
                          }}
                          style={{cursor: "pointer", userSelect: "none"}}
                        >
                          <div>
                            <Trans>Unsettled Commissions</Trans>
                          </div>
                          {sortItem.key === "pendingProfit" ? (
                            sortItem.sort === "asc" ? (
                              <UpSort/>
                            ) : (
                              <DownSort/>
                            )
                          ) : (
                            <NoSort/>
                          )}
                        </Stack>
                      </TableCell>
                      <TableCell align="left">
                        <Stack
                          direction={"row"}
                          spacing={"8px"}
                          onClick={() => {
                            setCurrentPage(1);
                            if (
                              sortItem.key === "settlementTime" &&
                              sortItem.sort === "asc"
                            ) {
                              setSortItem({
                                key: "default",
                                sort: "desc",
                              });
                              return;
                            }
                            setSortItem({
                              key: "settlementTime",
                              sort:
                                sortItem.key === "settlementTime"
                                  ? sortItem.sort === "asc"
                                    ? "desc"
                                    : "asc"
                                  : "desc",
                            });
                          }}
                          style={{cursor: "pointer", userSelect: "none"}}
                        >
                          <div>
                            <Trans>Time</Trans>
                          </div>
                          {sortItem.key === "settlementTime" ? (
                            sortItem.sort === "asc" ? (
                              <UpSort/>
                            ) : (
                              <DownSort/>
                            )
                          ) : (
                            <NoSort/>
                          )}
                        </Stack>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody
                    sx={(theme) => ({
                      "& td": {
                        padding: "0 20px",
                        height: "84px",
                        borderBottom: `1px solid ${theme.normal.border}`,
                      },
                    })}
                  >
                    {inviteeList?.slice((currentPage - 1) * 10, currentPage * 10)
                      ?.map((item: any, index: number) => (
                        <PCOrderRow item={item} key={index}/>
                      ))}
                    {inviteeList?.length === 0 && (
                      <TableRow sx={{"& td": {borderBottom: "0px"}}}>
                        <TableCell
                          colSpan={6}
                          sx={(theme) => ({
                            width: "100%",
                            fontSize: 14,
                            fontWeight: 400,
                            color: theme.normal.text2,
                            height: "168px",
                            textAlign: "center",
                            lineHeight: "168px",
                          })}
                        >
                          <Trans>No commissions yet</Trans>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              {inviteeList?.length > 0 && (
                <Stack
                  direction={"row"}
                  spacing={"10px"}
                  justifyContent={"end"}
                  px={"20px"}
                >
                  <PaginationButton
                    onClick={() => {
                      if (currentPage > 1) {
                        setCurrentPage(currentPage - 1);
                      }
                    }}
                    disabled={currentPage <= 1}
                  >
                    {"<"}
                  </PaginationButton>
                  {pageWindow.map((item, index) => {
                    return (
                      <PaginationButton
                        key={index}
                        onClick={() => {
                          setCurrentPage(item);
                        }}
                        style={{
                          background: item === currentPage ? "#EAAA00" : "",
                          color: item === currentPage ? "#1F2329" : "",
                        }}
                      >
                        {item}
                      </PaginationButton>
                    );
                  })}
                  <PaginationButton
                    onClick={() => {
                      if (currentPage < totalPage) {
                        setCurrentPage(currentPage + 1);
                      }
                    }}
                    disabled={currentPage >= totalPage}
                  >
                    {">"}
                  </PaginationButton>
                </Stack>
              )}
            </>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default CopyTradingProfit;
