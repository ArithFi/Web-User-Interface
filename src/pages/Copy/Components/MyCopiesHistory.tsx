import { FC, useEffect, useMemo, useState } from "react";
import useWindowWidth from "../../../hooks/useWindowWidth";
import FuturesTableTitle from "../../Futures/Components/TableTitle";
import { Trans, t } from "@lingui/macro";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import CopyTablePosition from "./CopyTablePosition";
import CopyListPosition from "./CopyListPosition";
import ArithFiLine from "../../../components/ArithFiLine";
import { DefaultKolIcon } from "../../../components/icons";
import { ArithFiTooltipFC } from "../../../components/ArithFiTooltip/ArithFiTooltip";
import { FuturesOrderService } from "../../Futures/OrderList";
import { formatTVDate } from "../../../lib/dates";
import { copyKOLInfo } from "../../../lib/ArithFiRequest";

interface MyCopiesHistoryProps {
  list: FuturesOrderService[];
}

const MyCopiesHistory: FC<MyCopiesHistoryProps> = ({ ...props }) => {
  const { isBigMobile } = useWindowWidth();

  const rows = props.list.map((item, index) => {
    return <Row key={`MyCopiesHistory + ${index}`} data={item} />;
  });

  const noOrder = useMemo(() => {
    return false;
  }, []);

  const mobile = useMemo(() => {
    const items = props.list.map((item, index) => {
      return <Item key={`MyCopiesHistory + ${index}`} data={item} />;
    });
    return (
      <Stack paddingX={"12px"} spacing={"16px"} paddingBottom={"20px"}>
        {items}
      </Stack>
    );
  }, [props.list]);

  const pc = useMemo(() => {
    return (
      <FuturesTableTitle
        dataArray={[
          t`Symbol`,
          t`Trader`,
          t`Actual Margin`,
          t`Open Price`,
          t`Close Price`,
          t`Realized Pnl`,
        ]}
        noOrder={noOrder}
        helps={[
          {
            index: 5,
            helpInfo: (
              <p>
                <Trans>
                  A 10% pre-profit-sharing deduction will be made on each
                  profitable copy trading order. This PnL = Total Profit - 10%
                  Pre-Deducted Profit. Your surplus pre-profit-sharing will be
                  refunded at settlement.
                </Trans>
              </p>
            ),
          },
        ]}
        noNeedPadding
        freeRight
      >
        {rows}
      </FuturesTableTitle>
    );
  }, [noOrder, rows]);
  return <>{isBigMobile ? mobile : pc}</>;
};

const tdNoPadding = {
  padding: "0px !important",
};

interface RowProps {
  data: FuturesOrderService;
}
const Item: FC<RowProps> = ({ ...props }) => {
  const [avatar, setAvatar] = useState("");
  const [nickName, setNickName] = useState("");
  useEffect(() => {
    if (avatar === "") {
      (async () => {
        const nowTime = new Date();
        const days7Time = new Date(nowTime.getTime() - 7 * 24 * 60 * 60 * 1000);
        const closeAtFromDate = formatTVDate(days7Time);
        const closeAtToDate = formatTVDate(nowTime);
        const req = await copyKOLInfo(
          props.data.kolAddress,
          closeAtFromDate,
          closeAtToDate,
          {
            Authorization: "",
          }
        );
        if (Number(req["err"]) === 0) {
          setAvatar(req["data"]["avatar"]);
          setNickName(req["data"]["nickName"]);
        }
      })();
    }
  }, [avatar, props.data.kolAddress]);
  const isLong = props.data.direction;
  const lever = props.data.leverage;

  const kolAddress = props.data.kolAddress.showAddress();
  
  const balance = props.data.status === -1 ? String().placeHolder : props.data.balance.floor(2);
  const profitLoss = useMemo(() => {
    const baseValue = props.data.margin + props.data.append;
    if (props.data.status === -1) {
      return -(baseValue)
    }
    const closeValue = props.data.closeValue;
    return closeValue - baseValue;
  }, [props.data.append, props.data.closeValue, props.data.margin, props.data.status]);
  const profitLossRate = useMemo(() => {
    if (props.data.status === -1) {
      return -100
    }
    const balance_num = props.data.margin + props.data.append;
    const marginAssets_num = props.data.closeValue;
    if (marginAssets_num >= balance_num) {
      return parseFloat(
        (((marginAssets_num - balance_num) * 100) / balance_num).toFixed(2)
      );
    } else {
      return -parseFloat(
        (((balance_num - marginAssets_num) * 100) / balance_num).toFixed(2)
      );
    }
  }, [props.data.append, props.data.closeValue, props.data.margin, props.data.status]);
  const profitLossRateString = profitLossRate.floor(2) + "%";
  const orderPrice = props.data.orderPrice.floor(
    props.data.product.getTokenPriceDecimals()
  );
  const marketPrice = props.data.closePrice.floor(
    props.data.product.getTokenPriceDecimals()
  );

  const openTime = new Date(props.data.timestamp * 1000);
  const openTimeString = `${openTime.toLocaleDateString()} ${openTime.toLocaleTimeString()}`;
  const closeTime = new Date(props.data.closeTime * 1000);
  const closeTimeString = `${closeTime.toLocaleDateString()} ${closeTime.toLocaleTimeString()}`;
  const pnl =
    profitLossRate > 0 ? profitLoss - (profitLoss * 10) / 100 : profitLoss;

  const kolIcon = () => {
    if (avatar !== "") {
      return (
        <Box
          sx={(theme) => ({
            width: "24px",
            height: "24px",
            borderRadius: "12px",
            background: theme.normal.primary,
            overflow: "hidden",
            "& img": {
              width: "24px",
              height: "24px",
            },
          })}
        >
          <img src={avatar} alt="kolIcon" />
        </Box>
      );
    } else {
      return (
        <Box
          sx={(theme) => ({
            width: "24px",
            height: "24px",
            borderRadius: "12px",
            background: theme.normal.primary,
            "& svg": {
              width: "24px",
              height: "24px",
              display: "block",
            },
          })}
        >
          <DefaultKolIcon />
        </Box>
      );
    }
  };
  return (
    <Stack
      key={`MyCopiesHistoryMobile + ${props.data.id}`}
      spacing={"20px"}
      sx={(theme) => ({
        borderRadius: "12px",
        background: theme.normal.bg1,
        padding: "20px 12px",
      })}
    >
      <CopyListPosition
        tokenPair={props.data.product}
        lever={lever}
        isLong={isLong}
      />
      <Stack spacing={"8px"}>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Stack spacing={"4px"} width={"100%"}>
            <Stack direction={"row"} spacing={"4px"} alignItems={"center"}>
              <Box
                sx={(theme) => ({
                  fontSize: "12px",
                  fontWeight: "400",
                  lineHeight: "16px",
                  color: theme.normal.text2,
                })}
              >
                <Trans>Realized Pnl</Trans>
              </Box>
              <ArithFiTooltipFC
                title={
                  <p>
                    <Trans>
                      A 10% pre-profit-sharing deduction will be made on each
                      profitable copy trading order. This PnL = Total Profit -
                      10% Pre-Deducted Profit. Your surplus pre-profit-sharing
                      will be refunded at settlement.
                    </Trans>
                  </p>
                }
              />
            </Stack>
            <Box
              sx={(theme) => ({
                fontSize: "14px",
                fontWeight: "700",
                lineHeight: "20px",
                color: pnl >= 0 ? theme.normal.success : theme.normal.danger,
              })}
            >
              {pnl.floor(2)}ATF
            </Box>
          </Stack>
          <Stack spacing={"4px"} width={"100%"}>
            <Box
              sx={(theme) => ({
                fontSize: "12px",
                fontWeight: "400",
                lineHeight: "16px",
                color: theme.normal.text2,
              })}
            >
              <Trans>Actual Margin</Trans>
            </Box>
            <Stack direction={"row"} spacing={"4px"} alignItems={"flex-end"}>
              <Box
                sx={(theme) => ({
                  fontSize: "14px",
                  fontWeight: "700",
                  lineHeight: "20px",
                  color: theme.normal.text2,
                })}
              >
                {balance}ATF
              </Box>
              <Box
                sx={(theme) => ({
                  fontSize: "10px",
                  fontWeight: "400",
                  lineHeight: "14px",
                  color:
                    profitLossRate >= 0
                      ? theme.normal.success
                      : theme.normal.danger,
                })}
              >
                {profitLossRateString}
              </Box>
            </Stack>
          </Stack>
        </Stack>
        <ArithFiLine />
        <Stack spacing={"8px"}>
          <Stack direction={"row"}>
            <Stack direction={"row"} spacing={"4px"} width={"100%"}>
              <Box
                sx={(theme) => ({
                  fontSize: "12px",
                  fontWeight: "400",
                  lineHeight: "16px",
                  color: theme.normal.text2,
                })}
              >
                <Trans>Open Price</Trans>
              </Box>
              <Box
                sx={(theme) => ({
                  fontSize: "12px",
                  fontWeight: "400",
                  lineHeight: "16px",
                  color: theme.normal.text2,
                })}
              >
                {orderPrice}
              </Box>
            </Stack>

            <Stack direction={"row"} spacing={"4px"} width={"100%"}>
              <Box
                sx={(theme) => ({
                  fontSize: "12px",
                  fontWeight: "400",
                  lineHeight: "16px",
                  color: theme.normal.text2,
                })}
              >
                <Trans>Close Price</Trans>
              </Box>
              <Box
                sx={(theme) => ({
                  fontSize: "12px",
                  fontWeight: "400",
                  lineHeight: "16px",
                  color: theme.normal.text2,
                })}
              >
                {marketPrice}
              </Box>
            </Stack>
          </Stack>

          <Stack spacing={"8px"}>
            <Stack direction={"row"}>
              <Stack direction={"row"} spacing={"4px"} width={"100%"}>
                <Box
                  sx={(theme) => ({
                    fontSize: "12px",
                    fontWeight: "400",
                    lineHeight: "16px",
                    color: theme.normal.text2,
                  })}
                >
                  <Trans>Open Time</Trans>
                </Box>
                <Box
                  sx={(theme) => ({
                    fontSize: "12px",
                    fontWeight: "400",
                    lineHeight: "16px",
                    color: theme.normal.text2,
                  })}
                >
                  {openTimeString}
                </Box>
              </Stack>

              <Stack direction={"row"} spacing={"4px"} width={"100%"}>
                <Box
                  sx={(theme) => ({
                    fontSize: "12px",
                    fontWeight: "400",
                    lineHeight: "16px",
                    color: theme.normal.text2,
                  })}
                >
                  <Trans>Close Time</Trans>
                </Box>
                <Box
                  sx={(theme) => ({
                    fontSize: "12px",
                    fontWeight: "400",
                    lineHeight: "16px",
                    color: theme.normal.text2,
                  })}
                >
                  {closeTimeString}
                </Box>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Stack direction={"row"} alignItems={"center"} spacing={"8px"}>
          {kolIcon()}
          <Stack spacing={"4px"}>
            <Box
              sx={(theme) => ({
                fontWeight: "700",
                fontSize: "14px",
                lineHeight: "20px",
                color: theme.normal.text0,
              })}
            >
              {nickName}
            </Box>
            <Box
              sx={(theme) => ({
                fontWeight: "400",
                fontSize: "12px",
                lineHeight: "16px",
                color: theme.normal.text2,
              })}
            >
              {kolAddress}
            </Box>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

const Row: FC<RowProps> = ({ ...props }) => {
  const [avatar, setAvatar] = useState("");
  const [nickName, setNickName] = useState("");
  useEffect(() => {
    if (avatar === "") {
      (async () => {
        const nowTime = new Date();
        const days7Time = new Date(nowTime.getTime() - 7 * 24 * 60 * 60 * 1000);
        const closeAtFromDate = formatTVDate(days7Time);
        const closeAtToDate = formatTVDate(nowTime);
        const req = await copyKOLInfo(
          props.data.kolAddress,
          closeAtFromDate,
          closeAtToDate,
          {
            Authorization: "",
          }
        );
        if (Number(req["err"]) === 0) {
          setAvatar(req["data"]["avatar"]);
          setNickName(req["data"]["nickName"]);
        }
      })();
    }
  }, [avatar, props.data.kolAddress]);
  const isLong = props.data.direction;
  const lever = props.data.leverage;
  const kolAddress = props.data.kolAddress.showAddress();
  const balance = props.data.status === -1 ? String().placeHolder : props.data.balance.floor(2);
  const profitLoss = useMemo(() => {
    const baseValue = props.data.margin + props.data.append;
    if (props.data.status === -1) {
      return -(baseValue)
    }
    const closeValue = props.data.closeValue;
    return closeValue - baseValue;
  }, [props.data.append, props.data.closeValue, props.data.margin, props.data.status]);
  const profitLossRate = useMemo(() => {
    if (props.data.status === -1) {
      return -100
    }
    const balance_num = props.data.margin + props.data.append;
    const marginAssets_num = props.data.closeValue;
    if (marginAssets_num >= balance_num) {
      return parseFloat(
        (((marginAssets_num - balance_num) * 100) / balance_num).toFixed(2)
      );
    } else {
      return -parseFloat(
        (((balance_num - marginAssets_num) * 100) / balance_num).toFixed(2)
      );
    }
  }, [props.data.append, props.data.closeValue, props.data.margin, props.data.status]);
  const profitLossRateString = profitLossRate.floor(2) + "%";
  const orderPrice = props.data.orderPrice.floor(
    props.data.product.getTokenPriceDecimals()
  );
  const marketPrice = props.data.closePrice.floor(
    props.data.product.getTokenPriceDecimals()
  );

  const openTime = new Date(props.data.timestamp * 1000);
  const openTimeString = `${openTime.toLocaleDateString()} ${openTime.toLocaleTimeString()}`;
  const closeTime = new Date(props.data.closeTime * 1000);
  const closeTimeString = `${closeTime.toLocaleDateString()} ${closeTime.toLocaleTimeString()}`;
  const pnl =
    profitLossRate > 0 ? profitLoss - (profitLoss * 10) / 100 : profitLoss;

  const kolIcon = () => {
    if (avatar !== "") {
      return (
        <Box
          sx={(theme) => ({
            width: "24px",
            height: "24px",
            borderRadius: "12px",
            background: theme.normal.primary,
            overflow: "hidden",
            "& img": {
              width: "24px",
              height: "24px",
            },
          })}
        >
          <img src={avatar} alt="kolIcon" />
        </Box>
      );
    } else {
      return (
        <Box
          sx={(theme) => ({
            width: "24px",
            height: "24px",
            borderRadius: "12px",
            background: theme.normal.primary,
            "& svg": {
              width: "24px",
              height: "24px",
              display: "block",
            },
          })}
        >
          <DefaultKolIcon />
        </Box>
      );
    }
  };
  return (
    <TableRow
      sx={(theme) => ({ "&: hover": { background: theme.normal.bg1 } })}
    >
      <TableCell>
        <CopyTablePosition
          tokenPair={props.data.product}
          isLong={isLong}
          lever={lever}
        />
      </TableCell>
      <TableCell sx={tdNoPadding}>
        <Stack direction={"row"} alignItems={"center"} spacing={"8px"}>
          {kolIcon()}
          <Stack spacing={"4px"}>
            <Box
              sx={(theme) => ({
                fontWeight: "700",
                fontSize: "14px",
                lineHeight: "20px",
                color: theme.normal.text0,
              })}
            >
              {nickName}
            </Box>
            <Box
              sx={(theme) => ({
                fontWeight: "400",
                fontSize: "12px",
                lineHeight: "16px",
                color: theme.normal.text2,
              })}
            >
              {kolAddress}
            </Box>
          </Stack>
        </Stack>
      </TableCell>
      <TableCell sx={tdNoPadding}>
        <Stack spacing={"4px"}>
          <Box
            sx={(theme) => ({
              fontWeight: "700",
              fontSize: "12px",
              lineHeight: "16px",
              color:
                profitLossRate >= 0
                  ? theme.normal.success
                  : theme.normal.danger,
            })}
          >
            {balance}ATF
          </Box>
          <Box
            sx={(theme) => ({
              fontWeight: "400",
              fontSize: "12px",
              lineHeight: "16px",
              color:
                profitLossRate >= 0
                  ? theme.normal.success
                  : theme.normal.danger,
            })}
          >
            {profitLossRateString}
          </Box>
        </Stack>
      </TableCell>
      <TableCell sx={tdNoPadding}>
        <Stack spacing={"4px"}>
          <Box
            sx={(theme) => ({
              fontWeight: "700",
              fontSize: "12px",
              lineHeight: "16px",
              color: theme.normal.text0,
            })}
          >
            {orderPrice}
          </Box>
          <Box
            sx={(theme) => ({
              fontWeight: "400",
              fontSize: "12px",
              lineHeight: "16px",
              color: theme.normal.text2,
            })}
          >
            {openTimeString}
          </Box>
        </Stack>
      </TableCell>
      <TableCell sx={tdNoPadding}>
        <Stack spacing={"4px"}>
          <Box
            sx={(theme) => ({
              fontWeight: "700",
              fontSize: "12px",
              lineHeight: "16px",
              color: theme.normal.text0,
            })}
          >
            {marketPrice}
          </Box>
          <Box
            sx={(theme) => ({
              fontWeight: "400",
              fontSize: "12px",
              lineHeight: "16px",
              color: theme.normal.text2,
            })}
          >
            {closeTimeString}
          </Box>
        </Stack>
      </TableCell>
      <TableCell>
        <Stack>
          <Box
            sx={(theme) => ({
              fontWeight: "700",
              fontSize: "12px",
              lineHeight: "16px",
              color: pnl >= 0 ? theme.normal.success : theme.normal.danger,
            })}
          >
            {pnl.floor(2)}ATF
          </Box>
        </Stack>
      </TableCell>
    </TableRow>
  );
};

export default MyCopiesHistory;
