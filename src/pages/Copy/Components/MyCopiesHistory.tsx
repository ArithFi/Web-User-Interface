import { FC, useMemo } from "react";
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
import { MyCopiesList } from "../Hooks/useMyCopies";
import { DefaultKolIcon } from "../../../components/icons";
import { ArithFiTooltipFC } from "../../../components/ArithFiTooltip/ArithFiTooltip";

interface MyCopiesHistoryProps {
  list: MyCopiesList[];
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
      const isLong = item.direction;
      const lever = item.leverage;
      const nickName = item.nickName;
      const kolAddress = item.kolAddress.showAddress();
      const balance = item.balance.floor(2);
      const profitLossRate = item.profitLossRate.floor(2) + "%";
      const orderPrice = item.orderPrice.floor(
        item.product.getTokenPriceDecimals()
      );
      const marketPrice = item.marketPrice.floor(
        item.product.getTokenPriceDecimals()
      );

      const openTime = new Date(item.timestamp * 1000);
      const openTimeString = `${openTime.toLocaleDateString()} ${openTime.toLocaleTimeString()}`;
      const closeTime = new Date(item.closeTime * 1000);
      const closeTimeString = `${closeTime.toLocaleDateString()} ${closeTime.toLocaleTimeString()}`;
      const pnl =
        item.profitLoss > 0
          ? item.profitLoss - (item.profitLoss * 10) / 100
          : item.profitLoss;

      const kolIcon = () => {
        if (item.avatar !== "-" && item.avatar !== "") {
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
              <img src={item.avatar} alt="kolIcon" />
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
          key={`MyCopiesHistoryMobile + ${index}`}
          spacing={"20px"}
          sx={(theme) => ({
            borderRadius: "12px",
            background: theme.normal.bg1,
            padding: "20px 12px",
          })}
        >
          <CopyListPosition
            tokenPair={item.product}
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
                        A 10% pre-profit-sharing deduction will be made on each profitable copy trading order. This PnL = Total Profit - 10% Pre-Deducted Profit. Your surplus pre-profit-sharing will be refunded at settlement.
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
                    color:
                      pnl >= 0 ? theme.normal.success : theme.normal.danger,
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
                <Stack
                  direction={"row"}
                  spacing={"4px"}
                  alignItems={"flex-end"}
                >
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
                        item.profitLossRate >= 0
                          ? theme.normal.success
                          : theme.normal.danger,
                    })}
                  >
                    {profitLossRate}
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
                A 10% pre-profit-sharing deduction will be made on each profitable copy trading order. This PnL = Total Profit - 10% Pre-Deducted Profit. Your surplus pre-profit-sharing will be refunded at settlement.
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
  data: MyCopiesList;
}

const Row: FC<RowProps> = ({ ...props }) => {
  const isLong = props.data.direction;
  const lever = props.data.leverage;
  const nickName = props.data.nickName;
  const kolAddress = props.data.kolAddress.showAddress();
  const balance = props.data.balance.floor(2);
  const profitLossRate = props.data.profitLossRate.floor(2) + "%";
  const orderPrice = props.data.orderPrice.floor(
    props.data.product.getTokenPriceDecimals()
  );
  const marketPrice = props.data.marketPrice.floor(
    props.data.product.getTokenPriceDecimals()
  );

  const openTime = new Date(props.data.timestamp * 1000);
  const openTimeString = `${openTime.toLocaleDateString()} ${openTime.toLocaleTimeString()}`;
  const closeTime = new Date(props.data.closeTime * 1000);
  const closeTimeString = `${closeTime.toLocaleDateString()} ${closeTime.toLocaleTimeString()}`;
  const pnl =
    props.data.profitLoss > 0
      ? props.data.profitLoss - (props.data.profitLoss * 10) / 100
      : props.data.profitLoss;

  const kolIcon = () => {
    if (props.data.avatar !== "-" && props.data.avatar !== "") {
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
          <img src={props.data.avatar} alt="kolIcon" />
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
                props.data.profitLossRate >= 0
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
                props.data.profitLossRate >= 0
                  ? theme.normal.success
                  : theme.normal.danger,
            })}
          >
            {profitLossRate}
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
