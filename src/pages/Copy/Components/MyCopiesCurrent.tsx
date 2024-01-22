import { FC, useMemo, useState } from "react";
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
import useMyCopiesCurrent from "../Hooks/useMyCopiesCurrent";
import { DefaultKolIcon } from "../../../components/icons";
import CircularProgress from "@mui/material/CircularProgress";
import GreyButton from "../../../components/MainButton/GreyButton";
import { BigNumber } from "ethers";
import { FuturesOrderService } from "../../Futures/OrderList";
import { lipPrice } from "../../../hooks/useFuturesNewOrder";

interface MyCopiesCurrentProps {
  list: FuturesOrderService[];
  updateList: () => void;
}

const MyCopiesCurrent: FC<MyCopiesCurrentProps> = ({ ...props }) => {
  const { isBigMobile } = useWindowWidth();
  const { action, isLoading } = useMyCopiesCurrent(props.updateList);
  const rows = props.list.map((item, index) => {
    return (
      <Row
        key={`MyCopiesCurrent + ${index}`}
        data={item}
        action={action}
        isLoading={isLoading}
      />
    );
  });

  const noOrder = useMemo(() => {
    return false;
  }, []);

  const mobile = useMemo(() => {
    const items = props.list.map((item, index) => {
      return (
        <Item
          key={`MyCopiesCurrent + ${index}`}
          data={item}
          action={action}
          isLoading={isLoading}
        />
      );
    });
    return (
      <Stack paddingX={"12px"} spacing={"16px"} paddingBottom={"20px"}>
        {items}
      </Stack>
    );
  }, [action, isLoading, props.list]);

  const pc = useMemo(() => {
    return (
      <FuturesTableTitle
        dataArray={[
          t`Symbol`,
          t`Trader`,
          t`Actual Margin`,
          t`Open Price`,
          t`Market Price`,
          t`Liq Price`,
          t`Operate`,
        ]}
        noOrder={noOrder}
        helps={[]}
        noNeedPadding
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
  action: (id: number) => void;
  isLoading: number;
}

const Item: FC<RowProps> = ({ ...props }) => {
  const [avatar, setAvatar] = useState("");

  const profitLossRate = useMemo(() => {
    const balance_num = props.data.margin + props.data.append;
    const marginAssets_num = props.data.balance;
    if (marginAssets_num >= balance_num) {
      return parseFloat(
        (((marginAssets_num - balance_num) * 100) / balance_num).toFixed(4)
      );
    } else {
      return -parseFloat(
        (((balance_num - marginAssets_num) * 100) / balance_num).toFixed(4)
      );
    }
  }, [props.data.append, props.data.balance, props.data.margin]);

  const isLong = props.data.direction;
  const lever = props.data.leverage;
  const nickName = "";
  const kolAddress = props.data.kolAddress.showAddress();
  const balance = props.data.balance.floor(2);
  const profitLossRateString = profitLossRate.floor(2) + "%";
  const orderPrice = props.data.orderPrice.floor(
    props.data.product.getTokenPriceDecimals()
  );
  const marketPrice = props.data.lastPrice.floor(
    props.data.product.getTokenPriceDecimals()
  );
  const lipPriceString = useMemo(() => {
    const balance =
      props.data.margin.toString().stringToBigNumber(18) ?? BigNumber.from("0");
    const orderPrice =
      props.data.orderPrice.toString().stringToBigNumber(18) ??
      BigNumber.from("0");
    const append =
      props.data.append.toString().stringToBigNumber(18) ?? BigNumber.from("0");
    const result = lipPrice(
      props.data.product,
      balance,
      append,
      BigNumber.from(props.data.leverage.toString()),
      props.data.lastPrice.toString().stringToBigNumber(18) ??
        BigNumber.from("0"),
      orderPrice,
      props.data.direction
    );
    return result.bigNumberToShowPrice(
      18,
      props.data.product.getTokenPriceDecimals()
    );
  }, [
    props.data.append,
    props.data.direction,
    props.data.lastPrice,
    props.data.leverage,
    props.data.margin,
    props.data.orderPrice,
    props.data.product,
  ]);

  const openTime = new Date(props.data.timestamp * 1000);
  const openTimeString = `${openTime.toLocaleDateString()} ${openTime.toLocaleTimeString()}`;
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
      key={`MyCopiesCurrentMobile + ${props.data.id}`}
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
                color: theme.normal.text0,
              })}
            >
              {orderPrice}
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
                  color: theme.normal.text0,
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
                <Trans>Market Price</Trans>
              </Box>
              <Box
                sx={(theme) => ({
                  fontSize: "12px",
                  fontWeight: "400",
                  lineHeight: "16px",
                  color: theme.normal.text0,
                })}
              >
                {marketPrice}
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
                <Trans>Liq Price</Trans>
              </Box>
              <Box
                sx={(theme) => ({
                  fontSize: "12px",
                  fontWeight: "400",
                  lineHeight: "16px",
                  color: theme.normal.text0,
                })}
              >
                {lipPriceString}
              </Box>
            </Stack>
          </Stack>

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
                  color: theme.normal.text0,
                })}
              >
                {openTimeString}
              </Box>
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
        <Box
          sx={(theme) => ({
            fontWeight: "700",
            fontSize: "14px",
            lineHeight: "20px",
            color: theme.normal.text0,
            padding: "10px 16px",
            borderRadius: "8px",
            background: theme.normal.grey_hover,
            width: "fit-content",
            "& .MuiCircularProgress-root": {
              color: theme.normal.text0,
            },
          })}
          onClick={() => {
            props.action(props.data.id);
          }}
        >
          {props.isLoading === props.data.id ? (
            <CircularProgress size={"12px"} />
          ) : (
            <Trans>Close</Trans>
          )}
        </Box>
      </Stack>
    </Stack>
  );
};

const Row: FC<RowProps> = ({ ...props }) => {
  const [avatar, setAvatar] = useState("");

  const profitLossRate = useMemo(() => {
    const balance_num = props.data.margin + props.data.append;
    const marginAssets_num = props.data.balance;
    if (marginAssets_num >= balance_num) {
      return parseFloat(
        (((marginAssets_num - balance_num) * 100) / balance_num).toFixed(2)
      );
    } else {
      return -parseFloat(
        (((balance_num - marginAssets_num) * 100) / balance_num).toFixed(2)
      );
    }
  }, [props.data.append, props.data.balance, props.data.margin]);

  const isLong = props.data.direction;
  const lever = props.data.leverage;
  const nickName = "";
  const kolAddress = props.data.kolAddress.showAddress();
  const balance = props.data.balance.floor(2);
  const profitLossRateString = profitLossRate.floor(2) + "%";

  const orderPrice = props.data.orderPrice.floor(
    props.data.product.getTokenPriceDecimals()
  );
  const marketPrice = props.data.lastPrice.floor(
    props.data.product.getTokenPriceDecimals()
  );
  const lipPriceString = useMemo(() => {
    const balance =
      props.data.margin.toString().stringToBigNumber(18) ?? BigNumber.from("0");
    const orderPrice =
      props.data.orderPrice.toString().stringToBigNumber(18) ??
      BigNumber.from("0");
    const append =
      props.data.append.toString().stringToBigNumber(18) ?? BigNumber.from("0");
    const result = lipPrice(
      props.data.product,
      balance,
      append,
      BigNumber.from(props.data.leverage.toString()),
      props.data.lastPrice.toString().stringToBigNumber(18) ??
        BigNumber.from("0"),
      orderPrice,
      props.data.direction
    );
    return result.bigNumberToShowPrice(
      18,
      props.data.product.getTokenPriceDecimals()
    );
  }, [
    props.data.append,
    props.data.direction,
    props.data.lastPrice,
    props.data.leverage,
    props.data.margin,
    props.data.orderPrice,
    props.data.product,
  ]);

  const openTime = new Date(props.data.timestamp * 1000);
  const openTimeString = `${openTime.toLocaleDateString()} ${openTime.toLocaleTimeString()}`;
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
            {String().placeHolder}
          </Box>
        </Stack>
      </TableCell>
      <TableCell sx={tdNoPadding}>
        <Box
          sx={(theme) => ({
            fontWeight: "700",
            fontSize: "12px",
            lineHeight: "16px",
            color: theme.normal.text0,
            paddingRight: "20px",
          })}
        >
          {lipPriceString}
        </Box>
      </TableCell>
      <TableCell sx={tdNoPadding}>
        <Stack
          direction={"row"}
          justifyContent={"flex-end"}
          alignItems={"center"}
          paddingRight={"20px"}
        >
          <GreyButton
            title={t`Close`}
            onClick={() => {
              props.action(props.data.id);
            }}
            style={{
              fontSize: "10px",
              lineHeight: "14px",
              borderRadius: "4px",
              padding: "5px 12px",
              height: "24px",
              width: "fit-content",
            }}
            isLoading={props.isLoading === props.data.id}
          />
        </Stack>
      </TableCell>
    </TableRow>
  );
};

export default MyCopiesCurrent;
