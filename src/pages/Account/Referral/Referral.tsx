import Stack from "@mui/material/Stack";
import Menu from "../Share/Menu";
import {styled} from "@mui/material/styles";
import useArithFiSnackBar from "../../../hooks/useArithFiSnackBar";
import useWindowWidth from "../../../hooks/useWindowWidth";
import {useMemo, useState} from "react";
import useSWR from "swr";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Box from "@mui/material/Box";
import copy from "copy-to-clipboard";
import {t, Trans} from "@lingui/macro";
import {Copy} from "../../../components/icons";
import MainButton from "../../../components/MainButton/MainButton";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import MobileMenu from "../Share/MobileMenu";
import {useAccount} from "wagmi";
import {serviceBaseURL} from "../../../lib/ArithFiRequest";
import useArithFi from "../../../hooks/useArithFi";

export const Select1 = styled("select")(({theme}) => ({
  width: "100%",
  fontWeight: "700",
  fontSize: "16px",
  lineHeight: "22px",
  background: theme.normal.bg1,
  color: theme.normal.text0,
  height: "100%",
  padding: "0 12px",
  border: "1px solid",
  borderColor: theme.normal.border,
  borderRadius: "8px",
  "&:hover": {
    border: `1px solid ${theme.normal.primary}`,
  },
  "-webkit-appearance": "none",
  "-moz-appearance": "none",
  appearance: "none",
}));

export const Input = styled("input")(({theme}) => ({
  width: "100%",
  fontWeight: "700",
  fontSize: "16px",
  lineHeight: "22px",
  background: theme.normal.bg1,
  color: theme.normal.text0,
  height: "100%",
  padding: "0 12px",
  border: "1px solid",
  borderColor: theme.normal.border,
  borderRadius: "8px",
  "&:hover": {
    border: `1px solid ${theme.normal.primary}`,
  },
}));

export const InputPC = styled("input")(({theme}) => ({
  width: "100%",
  fontWeight: "700",
  fontSize: "12px",
  lineHeight: "16px",
  background: theme.normal.bg1,
  color: theme.normal.text0,
  height: "100%",
  padding: "0 12px",
  border: "1px solid",
  borderColor: theme.normal.border,
  borderRadius: "8px",
  "&:hover": {
    border: `1px solid ${theme.normal.primary}`,
  },
}));

export const PaginationButton = styled("button")(({theme}) => {
  return {
    width: "32px",
    height: "32px",
    borderRadius: "8px",
    background: theme.normal.bg1,
    color: theme.normal.text2,
    fontWeight: 400,
    fontSize: "14px",
    "&:hover": {
      cursor: "pointer",
      color: theme.normal.bg1,
      background: theme.normal.primary_hover,
    },
    "&:active": {
      background: theme.normal.primary_active,
    },
    "&:disabled": {
      cursor: "not-allowed",
      background: theme.normal.disabled_bg,
      color: theme.normal.disabled_text,
    },
    "& .MuiCircularProgress-root": {
      color: theme.normal.highDark,
    },
  };
});

export const NoSort = () => {
  return (
    <Stack
      direction={"row"}
      spacing={"1.5px"}
      alignItems={"center"}
      sx={(theme) => ({
        "& svg": {
          "& path": {
            fill: theme.normal.text2,
          },
        },
      })}
    >
      <svg
        width="12"
        height="12"
        viewBox="0 0 10 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M4.24984 1.48714C4.25314 1.35504 4.20437 1.22188 4.10355 1.12106C3.90829 0.925794 3.59171 0.925794 3.39645 1.12106L0.396447 4.12105C0.201184 4.31632 0.201184 4.6329 0.396446 4.82816C0.591709 5.02342 0.908291 5.02342 1.10355 4.82816L3.25 2.68172V10.4998C3.25 10.7759 3.47386 10.9998 3.75 10.9998C4.02614 10.9998 4.25 10.7759 4.25 10.4998V1.49976C4.25 1.49554 4.24995 1.49133 4.24984 1.48714Z"
          fill="#030308"
          fillOpacity="0.6"
          className={"lightHeight"}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6.75 1.52539C6.75 1.24925 6.52614 1.02539 6.25 1.02539C5.97386 1.02539 5.75 1.24925 5.75 1.52539V10.5254C5.75 10.5936 5.76368 10.6587 5.78844 10.718C5.81171 10.7738 5.84556 10.8263 5.88998 10.8724C5.89425 10.8768 5.8986 10.8811 5.90303 10.8854C5.94787 10.9287 5.9988 10.9619 6.05299 10.9851C6.11345 11.011 6.18005 11.0254 6.25 11.0254C6.31995 11.0254 6.38655 11.011 6.44701 10.9851C6.5012 10.9619 6.55213 10.9287 6.59697 10.8854C6.59949 10.883 6.60199 10.8805 6.60446 10.878L9.60355 7.87894C9.79882 7.68368 9.79882 7.3671 9.60355 7.17184C9.40829 6.97657 9.09171 6.97657 8.89645 7.17184L6.75 9.31828V1.52539Z"
          fill="#030308"
          fillOpacity="0.6"
          className={"lightHeight"}
        />
      </svg>
    </Stack>
  );
};

export const UpSort = () => {
  return (
    <Stack
      direction={"row"}
      spacing={"1.5px"}
      alignItems={"center"}
      sx={(theme) => ({
        "& svg": {
          "& path:last-child": {
            fill: theme.normal.text2,
          },
        },
      })}
    >
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5.24984 1.48714C5.25313 1.35503 5.20437 1.22187 5.10355 1.12106C4.90829 0.925794 4.59171 0.925794 4.39645 1.12106L1.39645 4.12105C1.20118 4.31632 1.20118 4.6329 1.39645 4.82816C1.59171 5.02342 1.90829 5.02342 2.10355 4.82816L4.25 2.68172V10.4998C4.25 10.7759 4.47386 10.9998 4.75 10.9998C5.02614 10.9998 5.25 10.7759 5.25 10.4998V1.49976C5.25 1.49554 5.24995 1.49133 5.24984 1.48714Z"
          fill="#EAAA00"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.75 1.52539C7.75 1.24925 7.52614 1.02539 7.25 1.02539C6.97386 1.02539 6.75 1.24925 6.75 1.52539V10.5254C6.75 10.5932 6.76349 10.6578 6.78794 10.7168C6.81123 10.7731 6.84524 10.826 6.88998 10.8724C6.89425 10.8768 6.8986 10.8811 6.90303 10.8854C6.94864 10.9294 7.00056 10.963 7.0558 10.9863C7.1155 11.0115 7.18113 11.0254 7.25 11.0254C7.31887 11.0254 7.3845 11.0115 7.4442 10.9863C7.49944 10.963 7.55136 10.9294 7.59697 10.8854C7.59949 10.883 7.60199 10.8805 7.60446 10.878L10.6036 7.87894C10.7988 7.68368 10.7988 7.3671 10.6036 7.17184C10.4083 6.97657 10.0917 6.97657 9.89645 7.17184L7.75 9.31828V1.52539Z"
          fill="#030308"
          fillOpacity="0.6"
          className={"lightHeight"}
        />
      </svg>
    </Stack>
  );
};

export const DownSort = () => {
  return (
    <Stack
      direction={"row"}
      spacing={"1.5px"}
      alignItems={"center"}
      sx={(theme) => ({
        "& svg": {
          "& path:first-of-type": {
            fill: theme.normal.text2,
          },
        },
      })}
    >
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5.24984 1.48714C5.25313 1.35503 5.20437 1.22187 5.10355 1.12106C4.90829 0.925794 4.59171 0.925794 4.39645 1.12106L1.39645 4.12105C1.20118 4.31632 1.20118 4.6329 1.39645 4.82816C1.59171 5.02342 1.90829 5.02342 2.10355 4.82816L4.25 2.68172V10.4998C4.25 10.7759 4.47386 10.9998 4.75 10.9998C5.02614 10.9998 5.25 10.7759 5.25 10.4998V1.49976C5.25 1.49554 5.24995 1.49133 5.24984 1.48714Z"
          fill="#030308"
          fillOpacity="0.6"
          className={"lightHeight"}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.75 1.52539C7.75 1.24925 7.52614 1.02539 7.25 1.02539C6.97386 1.02539 6.75 1.24925 6.75 1.52539V10.5254C6.75 10.5936 6.76368 10.6587 6.78844 10.718C6.81171 10.7738 6.84556 10.8263 6.88998 10.8724C6.89425 10.8768 6.8986 10.8811 6.90303 10.8854C6.94787 10.9287 6.9988 10.9619 7.05299 10.9851C7.11345 11.011 7.18005 11.0254 7.25 11.0254C7.31995 11.0254 7.38655 11.011 7.44701 10.9851C7.5012 10.9619 7.55213 10.9287 7.59697 10.8854C7.59949 10.883 7.60199 10.8805 7.60446 10.878L10.6036 7.87894C10.7988 7.68368 10.7988 7.3671 10.6036 7.17184C10.4083 6.97657 10.0917 6.97657 9.89645 7.17184L7.75 9.31828V1.52539Z"
          fill="#EAAA00"
        />
      </svg>
    </Stack>
  );
};

const Futures = () => {
  const {messageSnackBar} = useArithFiSnackBar();
  const {isBigMobile} = useWindowWidth();
  const [currentPage, setCurrentPage] = useState(1);
  const { chainsData, signature } = useArithFi();
  const { address } = useAccount();

  const {data: overview} = useSWR(
    address
      ? `${serviceBaseURL(chainsData.chainId)}/invite/overview?walletAddress=${
        address
      }` : undefined,
    (url: string) => fetch(url, {
      headers: {
        "Authorization": signature?.signature || "",
      }
    }).then((res) => res.json())
  );

  const {data: listData} = useSWR(
    address
      ? `${serviceBaseURL(chainsData.chainId)}/invite/list-invitee?walletAddress=${
        address
      }&start=${(currentPage - 1) * 10}&count=10` : undefined,
    (url: string) => fetch(url, {
      headers: {
        "Authorization": signature?.signature || "",
      }
    }).then((res) => res.json())
  );

  const inviteeList = useMemo(() => {
    if (!listData) {
      return [];
    }
    return listData?.data
      ?.filter((item: any) => {
        return item?.inviteeWalletAddress
          .toLowerCase();
      })
  }, [listData]);

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
                fontSize: "12px",
                lineHeight: "16px",
                color: theme.normal.text0,
                fontWeight: 700,
                wordWrap: "break-word",
              })}
            >
              {props.item?.inviteeWalletAddress || "0"}
            </Box>
            <Box
              onClick={() => {
                copy(props.item?.inviteeWalletAddress);
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
              fontSize: "12px",
              lineHeight: "16px",
              color: theme.normal.text0,
              fontWeight: 700,
            })}
          >
            {props.item?.joinTime ? new Date(props.item?.joinTime).toLocaleString() : "-"}
          </Box>
        </TableCell>

        <TableCell>
          <Box
            sx={(theme) => ({
              fontSize: "12px",
              lineHeight: "16px",
              color: theme.normal.text0,
              fontWeight: 700,
            })}
          >
            {props.item?.tradeTime ? new Date(props.item?.tradeTime).toLocaleString() : "-"}
          </Box>
        </TableCell>
      </TableRow>
    );
  };

  const MobileOrderCard = (props: any) => {
    return (
      <Stack
        spacing={"4px"}
        p={"16px"}
        sx={(theme) => ({
          borderRadius: "12px",
          backgroundColor: theme.normal.bg1,
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
          <Box>{props.item?.inviteeWalletAddress}</Box>
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
              copy(props.item?.inviteeWalletAddress || "");
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
              <Trans>Join Time</Trans>
            </Box>
            <Box
              sx={(theme) => ({
                fontSize: "14px",
                lineHeight: "20px",
                color: theme.normal.text0,
                fontWeight: 700,
              })}
            >
              {props.item?.joinTime ? new Date(props.item?.joinTime).toLocaleString() : "-"}
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
              <Trans>Trade Time</Trans>
            </Box>
            <Box
              sx={(theme) => ({
                fontSize: "14px",
                lineHeight: "20px",
                color: theme.normal.text0,
                fontWeight: 700,
              })}
            >
              {props.item?.tradeTime ? new Date(props.item?.tradeTime).toLocaleString() : "-"}
            </Box>
          </Stack>
        </Stack>
      </Stack>
    );
  };

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
          marginTop: '40px',
          paddingX: "16px",
          [theme.breakpoints.up(1640)]: {
            maxWidth: '1200px',
          },
          [theme.breakpoints.between(1440, 1640)]: {
            maxWidth: '984px',
          },
          [theme.breakpoints.down("sm")]: {
            paddingX: 0,
            marginTop: 0,
          }
        })}
        width={'100%'}
        gap={'40px'}
      >
        <Stack
          width={"100%"}
          spacing={["12px", "12px", "80px"]}
        >
          <Stack
            spacing={["20px", "20px", "40px"]}
            sx={(theme) => ({
              width: "100%",
              padding: "20px",
            })}
          >
            {isBigMobile ? (
              <Stack
                direction={"row"}
                alignItems={"center"}
                spacing={"8px"}
                justifyContent={"space-between"}
                sx={(theme) => ({
                  borderBottom: `1px solid ${theme.normal.border}`,
                  paddingBottom: "20px",
                })}
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
                  <Trans>Overview</Trans>
                </Stack>
                <Box width={"145px"}>
                  <MainButton
                    title={t`Copy Invitation Link`}
                    disable={!address}
                    style={{
                      height: "36px",
                      fontSize: "12px",
                      lineHeight: "16px",
                      fontWeight: 700,
                    }}
                    onClick={() => {
                      if (!address) return;
                      let link = "https://arithfi.com/";
                      if (address) {
                        link =
                          "https://arithfi.com/?a=" +
                          address?.slice(-8).toLowerCase();
                      }
                      copy(link);
                      messageSnackBar(t`Copy Successfully`);
                    }}
                  />
                </Box>
              </Stack>
            ) : (
              <>
                <Stack
                  direction={"row"}
                  width={"100%"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  sx={(theme) => ({
                    borderBottom: isBigMobile ? "" : `1px solid ${theme.normal.border}`,
                    paddingBottom: 2,
                  })}
                >
                  <Stack
                    direction={"row"}
                    spacing={"8px"}
                    alignItems={"center"}
                    sx={(theme) => ({
                      color: theme.normal.text0,
                      fontWeight: 700,
                      fontSize: "20px",
                      lineHeight: "28px",
                    })}
                  >
                    <Trans>Invitee Address</Trans>
                  </Stack>
                  <Box>
                    <MainButton
                      style={{
                        padding: "0px 12px",
                        height: "36px",
                        fontSize: "12px",
                        fontWeight: 700,
                        lineHeight: "16px",
                        borderRadius: "8px",
                      }}
                      title={t`Copy Invitation Link`}
                      disable={!address}
                      onClick={() => {
                        if (!address) return;
                        let link = "https://arithfi.com/";
                        if (address) {
                          link =
                            "https://arithfi.com/?a=" +
                            address?.slice(-8).toLowerCase();
                        }
                        copy(link);
                        messageSnackBar("Copy Successfully");
                      }}
                    />
                  </Box>
                </Stack>
                <Stack
                  direction={"row"}
                  width={"100%"}
                  justifyContent={"space-between"}
                  spacing={"16px"}
                  overflow={'scroll'}
                >
                  {[
                    {
                      title: t`Traded Invitees`,
                      value: overview?.data?.inviteeTransaction || 0,
                      unit: "",
                    },
                    {
                      title: t`Total Invitees`,
                      value: overview?.data?.invitee || 0,
                      unit: "",
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
                      })}
                    >
                      <div>
                        {item.value}
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
                })}
                spacing={"20px"}
                direction={"row"}
                justifyContent={"space-between"}
              >
                <Stack width={"100%"}>
                  <Box
                    sx={(theme) => ({
                      color: theme.normal.text2,
                      fontSize: "14px",
                      lineHeight: "20px",
                      fontWeight: 400,
                    })}
                  >
                    <Trans>Traded Invitees</Trans>
                  </Box>
                  <Box
                    sx={(theme) => ({
                      color: theme.normal.text0,
                      fontSize: "16px",
                      lineHeight: "22px",
                      fontWeight: 700,
                    })}
                  >
                    {overview?.data?.inviteeTransaction || 0}
                  </Box>
                </Stack>
                <Stack width={"100%"}>
                  <Box
                    sx={(theme) => ({
                      color: theme.normal.text2,
                      fontSize: "14px",
                      lineHeight: "20px",
                      fontWeight: 400,
                    })}
                  >
                    <Trans>Total Invitees</Trans>
                  </Box>
                  <Box
                    sx={(theme) => ({
                      color: theme.normal.text0,
                      fontSize: "16px",
                      lineHeight: "22px",
                      fontWeight: 700,
                    })}
                  >
                    {overview?.data?.invitee || 0}
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
                  })}
                >
                  <Trans>Referrals</Trans>
                </Stack>
                <Stack px={"20px"} spacing={"12px"}>
                  {inviteeList.map((item: any, index: number) => (
                    <MobileOrderCard item={item} key={index}/>
                  ))}
                  {inviteeList?.length === 0 && (
                    <Stack
                      justifyContent={"center"}
                      alignItems={"center"}
                      height={"60px"}
                      sx={(theme) => ({
                        color: theme.normal.text2,
                        border: `1px solid ${theme.normal.border}`,
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
                    <Trans>Referrals</Trans>
                  </Stack>
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
                          <Trans>Invitee Address</Trans>
                        </TableCell>
                        <TableCell align="left">
                          <Stack
                            direction={"row"}
                            spacing={"8px"}
                            style={{cursor: "pointer", userSelect: "none"}}
                          >
                            <Trans>Join Time</Trans>
                          </Stack>
                        </TableCell>
                        <TableCell align="left">
                          <Stack
                            direction={"row"}
                            spacing={"8px"}
                            style={{cursor: "pointer", userSelect: "none"}}
                          >
                            <Trans>Trade Time</Trans>
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
                      {inviteeList?.length > 0 && inviteeList?.slice((currentPage - 1) * 10, currentPage * 10)
                        .map((item: any, index: number) => (
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
                {(inviteeList?.length > 0 || currentPage > 1) && (
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
                    <PaginationButton
                      style={{
                        background: "#EAAA00",
                        color: "#1F2329",
                      }}
                    >
                      {currentPage}
                    </PaginationButton>
                    <PaginationButton
                      onClick={() => {
                        if (inviteeList.length === 10) {
                          setCurrentPage(currentPage + 1)
                        }
                      }}
                      disabled={inviteeList.length < 10}
                    >
                      {">"}
                    </PaginationButton>
                  </Stack>
                )}
              </>
            )}
          </Stack>
        </Stack>
        <Stack height={'80px'}/>
      </Stack>
    </Stack>
  )
}

export default Futures