import { FC, useMemo } from "react";
import useWindowWidth from "../../../hooks/useWindowWidth";
import FuturesTableTitle from "../../Futures/Components/TableTitle";
import { Trans, t } from "@lingui/macro";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import ArithFiLine from "../../../components/ArithFiLine";
import CopyListPosition from "./CopyListPosition";
import CopyTablePosition from "./CopyTablePosition";
import { TraderOrderList } from "../Hooks/useTrader";

interface TraderCurrentProps {
  list: TraderOrderList[];
  history?: boolean;
}

const TraderCurrent: FC<TraderCurrentProps> = ({ ...props }) => {
  const { isBigMobile } = useWindowWidth();

  const rows = props.list.map((item, index) => {
    return <Row key={`TraderCurrent + ${index}`} data={item} />;
  });

  const noOrder = useMemo(() => {
    return false;
  }, []);

  const mobile = useMemo(() => {
    const items = props.list.map((item, index) => {
      const isLong = item.direction;
      const lever = item.leverage;
      const openPrice = item.orderPrice?.floor(
        item.product.getTokenPriceDecimals()
      );
      const marketPrice = item.marketPrice?.floor(
        item.product.getTokenPriceDecimals()
      );
      const roi = item.status === -1 ? "-100" : item.profitLossRate?.floor(2) + "%";

      const openTime = new Date(item.timestamp * 1000);
      const closeTime = item.closeTime
        ? new Date(item.closeTime * 1000)
        : undefined;
      const openTimeString = `${openTime.toLocaleDateString()} ${openTime.toLocaleTimeString()}`;
      const closeTimeString = closeTime
        ? `${closeTime.toLocaleDateString()} ${closeTime.toLocaleTimeString()}`
        : String().placeHolder;
      return (
        <Stack
          key={`TraderCurrentMobile + ${index}`}
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
              <Stack spacing={"4px"}>
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
                    fontSize: "14px",
                    fontWeight: "700",
                    lineHeight: "20px",
                    color: props.history
                      ? theme.normal.text2
                      : theme.normal.text0,
                  })}
                >
                  {openPrice}
                </Box>
              </Stack>
              <Stack spacing={"4px"}>
                <Box
                  sx={(theme) => ({
                    fontSize: "12px",
                    fontWeight: "400",
                    lineHeight: "16px",
                    color: theme.normal.text2,
                  })}
                >
                  {props.history ? (
                    <Trans>Close Price</Trans>
                  ) : (
                    <Trans>Market Price</Trans>
                  )}
                </Box>
                <Box
                  sx={(theme) => ({
                    fontSize: "14px",
                    fontWeight: "700",
                    lineHeight: "20px",
                    color: props.history
                      ? theme.normal.text2
                      : theme.normal.text0,
                  })}
                >
                  {marketPrice}
                </Box>
              </Stack>
              <Stack spacing={"4px"}>
                <Box
                  sx={(theme) => ({
                    fontSize: "12px",
                    fontWeight: "400",
                    lineHeight: "16px",
                    color: theme.normal.text2,
                    textAlign: "right",
                  })}
                >
                  <Trans>ROI</Trans>
                </Box>
                <Box
                  sx={(theme) => ({
                    fontSize: "14px",
                    fontWeight: "700",
                    lineHeight: "20px",
                    textAlign: "right",
                    color:
                      item.profitLossRate >= 0
                        ? theme.normal.success
                        : theme.normal.danger,
                  })}
                >
                  {roi}
                </Box>
              </Stack>
            </Stack>
            <ArithFiLine />
            <Stack spacing={"8px"} alignItems={"center"}>
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
                    color: props.history
                      ? theme.normal.text2
                      : theme.normal.text0,
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
                    color: props.history
                      ? theme.normal.text2
                      : theme.normal.text0,
                  })}
                >
                  {closeTimeString}
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
  }, [props.history, props.list]);

  const pc = useMemo(() => {
    return (
      <FuturesTableTitle
        dataArray={[
          t`Symbol`,
          t`Open Price`,
          props.history ? t`Close Price` : t`Market Price`,
          t`ROI`,
        ]}
        noOrder={noOrder}
        helps={[]}
        noNeedPadding
        freeRight
      >
        {rows}
      </FuturesTableTitle>
    );
  }, [noOrder, props.history, rows]);
  return <>{isBigMobile ? mobile : pc}</>;
};

const tdNoPadding = {
  padding: "0px !important",
};

interface RowProps {
  data: TraderOrderList;
}

const Row: FC<RowProps> = ({ ...props }) => {
  const isLong = props.data.direction;
  const lever = props.data.leverage;
  const openPrice = props.data.orderPrice?.floor(
    props.data.product.getTokenPriceDecimals()
  );
  const marketPrice = props.data.marketPrice?.floor(
    props.data.product.getTokenPriceDecimals()
  );
  const roi = props.data.status === -1 ? "-100" : props.data.profitLossRate?.floor(2) + "%";

  const openTime = new Date(props.data.timestamp * 1000);
  const closeTime = props.data.closeTime
    ? new Date(props.data.closeTime * 1000)
    : undefined;
  const openTimeString = `${openTime.toLocaleDateString()} ${openTime.toLocaleTimeString()}`;
  const closeTimeString = closeTime
    ? `${closeTime.toLocaleDateString()} ${closeTime.toLocaleTimeString()}`
    : String().placeHolder;
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
        <Stack spacing={"4px"}>
          <Box
            sx={(theme) => ({
              fontWeight: "700",
              fontSize: "12px",
              lineHeight: "16px",
              color: theme.normal.text0,
            })}
          >
            {openPrice}
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
        <Box
          sx={(theme) => ({
            fontWeight: "700",
            fontSize: "12px",
            lineHeight: "16px",
            color:
              props.data.profitLossRate >= 0
                ? theme.normal.success
                : theme.normal.danger,
            paddingRight: "20px",
          })}
        >
          {roi}
        </Box>
      </TableCell>
    </TableRow>
  );
};

export default TraderCurrent;
