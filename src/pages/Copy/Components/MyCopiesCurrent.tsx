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
import useMyCopiesCurrent from "../Hooks/useMyCopiesCurrent";
import { DefaultKolIcon } from "../../../components/icons";
import CircularProgress from "@mui/material/CircularProgress";
import GreyButton from "../../../components/MainButton/GreyButton";
import { BigNumber } from "ethers";
import { FuturesOrderService } from "../../Futures/OrderList";
import { lipPrice } from "../../../hooks/useFuturesNewOrder";
import { formatTVDate } from "../../../lib/dates";
import { copyKOLInfo } from "../../../lib/ArithFiRequest";
import { FuturesOrderListTitleAndValue } from "../../Futures/Components/FuturesOrderListTitleAndValue";

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
      <Stack paddingX={"20px"} spacing={"16px"} paddingBottom={"20px"}>
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
          t`Unrealized PnL`,
          t`Size`,
          t`Margin`,
          t`Margin Ratio`,
          t`Open Price`,
          t`Mark Price`,
          t`Liq Price`,
          t`TP/SL`,
          t`Time`,
          t`Operate`,
        ]}
        noOrder={noOrder}
        helps={[
          {
            index: 2,
            helpInfo: (
              <p>
                <Trans>Including funding amounts.</Trans>
              </p>
            ),
          },
          {
            index: 3,
            helpInfo: (
              <p>
                <Trans>Leverage*Initial Margin</Trans>
              </p>
            ),
          },
          {
            index: 4,
            helpInfo: (
              <p>
                <Trans>
                  Initial Margin + Added Margin,Added Margin is the margin for
                  Add the user's position.
                </Trans>
              </p>
            ),
          },
          {
            index: 5,
            helpInfo: (
              <p>
                <Trans>
                  The lower the Margin Ratio, the lower your liquidation level
                  will be relative to your position size. Your positions will be
                  liquidated once Margin Ratio reaches 100%.
                </Trans>
              </p>
            ),
          },
          {
            index: 8,
            helpInfo: (
              <p>
                <Trans>
                  Due to the market volatility, the actual liquidation price may
                  be different from the theoretical liquidation price. Here is
                  the theoretical liquidation price, for reference only.
                </Trans>
              </p>
            ),
          },
        ]}
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
  const tp = useMemo(() => {
    return props.data.takeProfitPrice === 0
      ? String().placeHolder
      : props.data.takeProfitPrice.toFixed(
          props.data.product.getTokenPriceDecimals()
        );
  }, [props.data.product, props.data.takeProfitPrice]);
  const sl = useMemo(() => {
    return props.data.stopLossPrice === 0
      ? String().placeHolder
      : props.data.stopLossPrice.toFixed(
          props.data.product.getTokenPriceDecimals()
        );
  }, [props.data.product, props.data.stopLossPrice]);
  const showSize = useMemo(() => {
    if (props.data.leverage != null && props.data.margin != null) {
      return `${(props.data.leverage * props.data.margin).floor(2)} ATF`;
    }
    return "-";
  }, [props.data.leverage, props.data.margin]);

  const showMargin = useMemo(() => {
    if (props.data.margin != null && props.data.append != null) {
      return `${(props.data.margin + props.data.append).floor(2)} ATF`;
    }
    return "-";
  }, [props.data.append, props.data.margin]);
  const unrealizedPnL = useMemo(() => {
    if (
      props.data.margin != null &&
      props.data.append != null &&
      props.data.balance != null
    ) {
      return props.data.balance - (props.data.margin + props.data.append);
    }
    return undefined;
  }, [props.data.append, props.data.balance, props.data.margin]);
  const showUnrealizedPnL = useMemo(() => {
    if (unrealizedPnL != null) {
      const format = unrealizedPnL.floor(2);
      return `${Number(format) >= 0 ? "+" : ""}${format} ATF`;
    }
    return "-";
  }, [unrealizedPnL]);
  const ROI = useMemo(() => {
    if (
      unrealizedPnL != null &&
      props.data.margin != null &&
      props.data.append != null
    ) {
      const percent = unrealizedPnL / (props.data.margin + props.data.append);
      return percent;
    }
    return undefined;
  }, [props.data.append, props.data.margin, unrealizedPnL]);
  const showROI = useMemo(() => {
    if (ROI != null) {
      return `${ROI >= 0 ? "+" : ""}${(ROI * 100).floor(2)}%`;
    }
    return "-";
  }, [ROI]);
  const showMarginRatio = useMemo(() => {
    if (props.data.marginRatio != null) {
      return `${(props.data.marginRatio * 10).floor(2)}%`;
    }
    return "-";
  }, [props.data.marginRatio]);
  const isRed = useMemo(() => {
    return showROI.indexOf("-") === 0;
  }, [showROI]);

  const isLong = props.data.direction;
  const lever = props.data.leverage;
  const kolAddress = props.data.kolAddress.showAddress();

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
      orderPrice,
      props.data.direction,
      props.data.pt0,
      props.data.pt1,
      marketPrice.stringToBigNumber(18)
    );
    return result.bigNumberToShowPrice(
      18,
      props.data.product.getTokenPriceDecimals()
    );
  }, [
    marketPrice,
    props.data.append,
    props.data.direction,
    props.data.leverage,
    props.data.margin,
    props.data.orderPrice,
    props.data.product,
    props.data.pt0,
    props.data.pt1,
  ]);
  const openTime = useMemo(() => {
    const time = new Date(props.data.timestamp * 1000);
    return [time.toLocaleDateString(), time.toLocaleTimeString()];
  }, [props.data.timestamp]);
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
      spacing={"12px"}
      sx={(theme) => ({
        width: "100%",
      })}
    >
      <CopyListPosition
        tokenPair={props.data.product}
        lever={lever}
        isLong={isLong}
      />
      <Stack spacing={"8px"}>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <FuturesOrderListTitleAndValue
            title={t`Unrealized PnL`}
            value={showUnrealizedPnL}
            spacing="4px"
            isRed={isRed}
            valueSize={"14px"}
            valueWeight={"700"}
            valueLineHeight={"20px"}
            help={t`Including funding amounts.`}
          />
          <FuturesOrderListTitleAndValue
            title={t`ROI`}
            value={showROI}
            alignItems="flex-end"
            isRed={isRed}
            valueSize={"14px"}
            valueWeight={"700"}
            valueLineHeight={"20px"}
            help={t`Unrealized PNL/Initial Margin. Including funding amounts.`}
          />
        </Stack>

        <Stack direction={"row"} justifyContent={"space-between"}>
          <Box width={"150px"}>
            <FuturesOrderListTitleAndValue
              title={t`Size`}
              value={showSize}
              help={t`Leverage*Initial Margin`}
            />
          </Box>
          <Stack
            direction={"row"}
            width={"100%"}
            justifyContent={"space-between"}
          >
            <FuturesOrderListTitleAndValue
              title={t`Margin`}
              value={showMargin}
              help={t`Initial Margin + Added Margin,Added Margin is the margin for Add
              the user's position.`}
            />
            <FuturesOrderListTitleAndValue
              title={t`Margin Ratio`}
              value={showMarginRatio}
              alignItems="flex-end"
              help={t`The lower the Margin Ratio, the lower your liquidation level will be relative to your position size. Your positions will be liquidated once Margin Ratio reaches 100%.`}
            />
          </Stack>
        </Stack>

        <Stack direction={"row"} justifyContent={"space-between"}>
          <Box width={"150px"}>
            <FuturesOrderListTitleAndValue
              title={t`Open Price`}
              value={orderPrice}
            />
          </Box>
          <Stack
            direction={"row"}
            width={"100%"}
            justifyContent={"space-between"}
          >
            <FuturesOrderListTitleAndValue
              title={t`Mark Price`}
              value={marketPrice}
            />
            <FuturesOrderListTitleAndValue
              title={t`Liq Price`}
              value={lipPriceString}
              alignItems="flex-end"
              help={t`Due to the market volatility, the actual liquidation price may be different from the theoretical liquidation price. Here is the theoretical liquidation price, for reference only.`}
            />
          </Stack>
        </Stack>

        <Stack direction={"row"} justifyContent={"space-between"}>
          <Stack
            direction={"row"}
            justifyContent={"flex-start"}
            spacing={"4px"}
          >
            <Box
              sx={(theme) => ({
                fontSize: "10px",
                fontWeight: 400,
                lineHeight: "14px",
                color: theme.normal.text2,
              })}
            >
              {`TP/SL`}
            </Box>
            <Box
              sx={(theme) => ({
                fontSize: "10px",
                fontWeight: 400,
                lineHeight: "14px",
                color: theme.normal.text0,
              })}
            >
              {`${tp} / ${sl}`}
            </Box>
          </Stack>
          <Box
            sx={(theme) => ({
              fontSize: "10px",
              fontWeight: 400,
              lineHeight: "14px",
              color: theme.normal.text2,
            })}
          >
            {`${t`Time`} ${openTime[0]} ${openTime[1]}`}
          </Box>
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
      <ArithFiLine />
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
  const tp = useMemo(() => {
    return props.data.takeProfitPrice === 0
      ? String().placeHolder
      : props.data.takeProfitPrice.toFixed(
          props.data.product.getTokenPriceDecimals()
        );
  }, [props.data.product, props.data.takeProfitPrice]);
  const sl = useMemo(() => {
    return props.data.stopLossPrice === 0
      ? String().placeHolder
      : props.data.stopLossPrice.toFixed(
          props.data.product.getTokenPriceDecimals()
        );
  }, [props.data.product, props.data.stopLossPrice]);
  const showSize = useMemo(() => {
    if (props.data.leverage != null && props.data.margin != null) {
      return `${(props.data.leverage * props.data.margin).floor(2)} ATF`;
    }
    return "-";
  }, [props.data.leverage, props.data.margin]);

  const showMargin = useMemo(() => {
    if (props.data.margin != null && props.data.append != null) {
      return `${(props.data.margin + props.data.append).floor(2)} ATF`;
    }
    return "-";
  }, [props.data.append, props.data.margin]);
  const unrealizedPnL = useMemo(() => {
    if (
      props.data.margin != null &&
      props.data.append != null &&
      props.data.balance != null
    ) {
      return props.data.balance - (props.data.margin + props.data.append);
    }
    return undefined;
  }, [props.data.append, props.data.balance, props.data.margin]);
  const showUnrealizedPnL = useMemo(() => {
    if (unrealizedPnL != null) {
      const format = unrealizedPnL.floor(2);
      return `${Number(format) >= 0 ? "+" : ""}${format} ATF`;
    }
    return "-";
  }, [unrealizedPnL]);
  const ROI = useMemo(() => {
    if (
      unrealizedPnL != null &&
      props.data.margin != null &&
      props.data.append != null
    ) {
      const percent = unrealizedPnL / (props.data.margin + props.data.append);
      return percent;
    }
    return undefined;
  }, [props.data.append, props.data.margin, unrealizedPnL]);
  const showROI = useMemo(() => {
    if (ROI != null) {
      return `${ROI >= 0 ? "+" : ""}${(ROI * 100).floor(2)}%`;
    }
    return "-";
  }, [ROI]);
  const showMarginRatio = useMemo(() => {
    if (props.data.marginRatio != null) {
      return `${(props.data.marginRatio * 10).floor(2)}%`;
    }
    return "-";
  }, [props.data.marginRatio]);
  const isRed = useMemo(() => {
    return showROI.indexOf("-") === 0;
  }, [showROI]);

  const isLong = props.data.direction;
  const lever = props.data.leverage;
  const kolAddress = props.data.kolAddress.showAddress();

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
      orderPrice,
      props.data.direction,
      props.data.pt0,
      props.data.pt1,
      marketPrice.stringToBigNumber(18)
    );
    return result.bigNumberToShowPrice(
      18,
      props.data.product.getTokenPriceDecimals()
    );
  }, [
    marketPrice,
    props.data.append,
    props.data.direction,
    props.data.leverage,
    props.data.margin,
    props.data.orderPrice,
    props.data.product,
    props.data.pt0,
    props.data.pt1,
  ]);
  const openTime = useMemo(() => {
    const time = new Date(props.data.timestamp * 1000);
    return [time.toLocaleDateString(), time.toLocaleTimeString()];
  }, [props.data.timestamp]);

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
              fontSize: "10px",
              lineHeight: "16px",
              color: isRed ? theme.normal.danger : theme.normal.success,
            })}
          >
            {showUnrealizedPnL}
          </Box>
          <Box
            sx={(theme) => ({
              fontWeight: "400",
              fontSize: "12px",
              lineHeight: "16px",
              color: isRed ? theme.normal.danger : theme.normal.success,
            })}
          >
            {showROI}
          </Box>
        </Stack>
      </TableCell>
      <TableCell sx={tdNoPadding}>
        <Box
          sx={(theme) => ({
            fontWeight: "700",
            fontSize: "10px",
            lineHeight: "16px",
            color: theme.normal.text0,
            paddingRight: "20px",
          })}
        >
          {showSize}
        </Box>
      </TableCell>
      <TableCell sx={tdNoPadding}>
        <Box
          sx={(theme) => ({
            fontWeight: "700",
            fontSize: "10px",
            lineHeight: "16px",
            color: theme.normal.text0,
            paddingRight: "20px",
          })}
        >
          {showMargin}
        </Box>
      </TableCell>
      <TableCell sx={tdNoPadding}>
        <Box
          sx={(theme) => ({
            fontWeight: "700",
            fontSize: "10px",
            lineHeight: "16px",
            color: theme.normal.text0,
            paddingRight: "20px",
          })}
        >
          {showMarginRatio}
        </Box>
      </TableCell>
      <TableCell sx={tdNoPadding}>
        <Box
          sx={(theme) => ({
            fontWeight: "700",
            fontSize: "10px",
            lineHeight: "16px",
            color: theme.normal.text0,
            paddingRight: "20px",
          })}
        >
          {orderPrice}
        </Box>
      </TableCell>
      <TableCell sx={tdNoPadding}>
        <Box
          sx={(theme) => ({
            fontWeight: "700",
            fontSize: "10px",
            lineHeight: "16px",
            color: theme.normal.text0,
            paddingRight: "20px",
          })}
        >
          {marketPrice}
        </Box>
      </TableCell>
      <TableCell sx={tdNoPadding}>
        <Box
          sx={(theme) => ({
            fontWeight: "700",
            fontSize: "10px",
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
          spacing={"4px"}
          sx={(theme) => ({
            "& p": {
              fontSize: 10,
              fontWeight: 400,
              color: theme.normal.text0,
            },
            "& span": { marginRight: "4px", color: theme.normal.text2 },
          })}
        >
          <Box component={"p"}>
            <span>
              <Trans>TP</Trans>
            </span>
            {tp}
          </Box>
          <Box component={"p"}>
            <span>
              <Trans>SL</Trans>
            </span>
            {sl}
          </Box>
        </Stack>
      </TableCell>
      <TableCell sx={tdNoPadding}>
        <Stack
          spacing={"4px"}
          sx={(theme) => ({
            fontWeight: "400",
            fontSize: "10px",
            lineHeight: "16px",
            color: theme.normal.text0,
          })}
        >
          <Box>{openTime[0]}</Box>
          <Box>{openTime[1]}</Box>
        </Stack>
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
