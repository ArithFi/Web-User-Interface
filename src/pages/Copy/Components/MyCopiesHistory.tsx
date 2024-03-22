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
import { FuturesOrderService } from "../../Futures/OrderList";
import { formatTVDate } from "../../../lib/dates";
import { copyKOLInfo } from "../../../lib/ArithFiRequest";
import { FuturesOrderListTitleAndValue } from "../../Futures/Components/FuturesOrderListTitleAndValue";

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
      <Stack paddingX={"20px"} spacing={"16px"} paddingBottom={"20px"}>
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
          t`Realized PnL`,
          t`Size`,
          t`Margin`,
          t`Open Price`,
          t`Close Price`,
          t`Funding Amount`,
          t`TP/SL`,
          t`Open Time`,
          t`Close Time`,
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
            index: 7,
            helpInfo: (
              <p>
                <Trans>
                  The funding amount in ArithFi is a cash flow compensation or
                  penalty exchanged between holders of long and short positions,
                  which is directly reflected in the PNL.
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
  const realizedPnL = useMemo(() => {
    if (
      props.data.closeValue != null &&
      props.data.margin != null &&
      props.data.append != null
    ) {
      if (props.data.status === -1) {
        return -(props.data.margin + props.data.append);
      }
      return props.data.closeValue - (props.data.margin + props.data.append);
    }
    return undefined;
  }, [
    props.data.append,
    props.data.closeValue,
    props.data.margin,
    props.data.status,
  ]);
  const showRealizedPnL = useMemo(() => {
    if (realizedPnL != null) {
      const format = realizedPnL.floor(2);
      return `${Number(format) >= 0 ? "+" : ""}${format} ATF`;
    }
    return "-";
  }, [realizedPnL]);
  const showSize = useMemo(() => {
    if (props.data.leverage != null && props.data.margin != null) {
      return `${(Number(props.data.leverage) * props.data.margin).floor(
        2
      )} ATF`;
    }
    return "-";
  }, [props.data.leverage, props.data.margin]);

  const showMargin = useMemo(() => {
    if (props.data.margin != null && props.data.append != null) {
      return `${(props.data.margin + props.data.append).floor(2)} ATF`;
    }
    return "-";
  }, [props.data.append, props.data.margin]);
  const ROI = useMemo(() => {
    if (
      realizedPnL != null &&
      props.data.margin != null &&
      props.data.append != null
    ) {
      const percent = realizedPnL / (props.data.margin + props.data.append);
      return percent;
    }
    return undefined;
  }, [props.data.append, props.data.margin, realizedPnL]);
  const showROI = useMemo(() => {
    if (ROI != null) {
      return `${ROI >= 0 ? "+" : ""}${(ROI * 100).floor(2)}%`;
    }
    return "-";
  }, [ROI]);
  const isRed = useMemo(() => {
    return showROI.indexOf("-") === 0;
  }, [showROI]);
  const isLong = props.data.direction;
  const lever = props.data.leverage;
  const kolAddress = props.data.kolAddress.showAddress();
  const orderPrice = props.data.orderPrice.floor(
    props.data.product.getTokenPriceDecimals()
  );
  const closePrice = props.data.closePrice.floor(
    props.data.product.getTokenPriceDecimals()
  );
  const showF = useMemo(() => {
    if (
      props.data.pt0 != null &&
      props.data.pt1 != null &&
      props.data.closePrice != null &&
      props.data.orderPrice &&
      props.data.direction != null &&
      props.data.leverage != null &&
      props.data.margin != null
    ) {
      let F = 0;
      const u = props.data.pt1 - props.data.pt0;
      const priceRatio = props.data.closePrice / props.data.orderPrice;
      const v = props.data.direction
        ? props.data.margin * Number(props.data.leverage) * priceRatio
        : props.data.margin * Number(props.data.leverage) * (2 - priceRatio);
      F = -Number((u * v).floor(2));
      return `${F > 0 ? "+" : ""}${F} ATF`;
    }
    return "- ATF";
  }, [
    props.data.closePrice,
    props.data.direction,
    props.data.leverage,
    props.data.margin,
    props.data.orderPrice,
    props.data.pt0,
    props.data.pt1,
  ]);
  const tp = useMemo(() => {
    return props.data.takeProfitPrice
      ? props.data.takeProfitPrice.toFixed(
          props.data.product.getTokenPriceDecimals()
        )
      : String().placeHolder;
  }, [props.data.product, props.data.takeProfitPrice]);
  const sl = useMemo(() => {
    return props.data.stopLossPrice
      ? props.data.stopLossPrice.toFixed(
          props.data.product.getTokenPriceDecimals()
        )
      : String().placeHolder;
  }, [props.data.product, props.data.stopLossPrice]);
  const openTime = new Date(props.data.timestamp * 1000);
  const openTimeString = [
    openTime.toLocaleDateString(),
    openTime.toLocaleTimeString(),
  ];
  const closeTime = new Date(props.data.closeTime * 1000);
  const closeTimeString = [
    closeTime.toLocaleDateString(),
    closeTime.toLocaleTimeString(),
  ];

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
            title={t`Realized PnL`}
            value={showRealizedPnL}
            spacing="4px"
            isRed={isRed}
            valueSize={"14px"}
            valueWeight={"700"}
            valueLineHeight={"20px"}
            help={`Including funding amounts.`}
          />
          <FuturesOrderListTitleAndValue
            title={t`ROI`}
            value={showROI}
            alignItems="flex-end"
            isRed={isRed}
            valueSize={"14px"}
            valueWeight={"700"}
            valueLineHeight={"20px"}
            help={t`Realized PNL/Initial Margin. Including funding amounts.`}
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
            <></>
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
              title={t`Close Price`}
              value={closePrice}
            />
            <FuturesOrderListTitleAndValue
              title={t`Funding Amount`}
              value={showF}
              alignItems="flex-end"
              help={t`The funding amount in ArithFi is a cash flow compensation or penalty exchanged between holders of long and short positions, which is directly reflected in the PNL.`}
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
        </Stack>

        <Stack direction={"row"} justifyContent={"space-between"}>
          <Box
            sx={(theme) => ({
              fontSize: "10px",
              fontWeight: 400,
              lineHeight: "14px",
              color: theme.normal.text2,
            })}
          >
            {`${t`Open Time`} ${openTimeString[0]} ${openTimeString[1]}`}
          </Box>
          <Box
            sx={(theme) => ({
              fontSize: "10px",
              fontWeight: 400,
              lineHeight: "14px",
              color: theme.normal.text2,
            })}
          >
            {`${t`Close Time`} ${closeTimeString[0]} ${closeTimeString[1]}`}
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
  const realizedPnL = useMemo(() => {
    if (
      props.data.closeValue != null &&
      props.data.margin != null &&
      props.data.append != null
    ) {
      if (props.data.status === -1) {
        return -(props.data.margin + props.data.append);
      }
      return props.data.closeValue - (props.data.margin + props.data.append);
    }
    return undefined;
  }, [
    props.data.append,
    props.data.closeValue,
    props.data.margin,
    props.data.status,
  ]);
  const showRealizedPnL = useMemo(() => {
    if (realizedPnL != null) {
      const format = realizedPnL.floor(2);
      return `${Number(format) >= 0 ? "+" : ""}${format} ATF`;
    }
    return "-";
  }, [realizedPnL]);
  const showSize = useMemo(() => {
    if (props.data.leverage != null && props.data.margin != null) {
      return `${(Number(props.data.leverage) * props.data.margin).floor(
        2
      )} ATF`;
    }
    return "-";
  }, [props.data.leverage, props.data.margin]);

  const showMargin = useMemo(() => {
    if (props.data.margin != null && props.data.append != null) {
      return `${(props.data.margin + props.data.append).floor(2)} ATF`;
    }
    return "-";
  }, [props.data.append, props.data.margin]);
  const ROI = useMemo(() => {
    if (
      realizedPnL != null &&
      props.data.margin != null &&
      props.data.append != null
    ) {
      const percent = realizedPnL / (props.data.margin + props.data.append);
      return percent;
    }
    return undefined;
  }, [props.data.append, props.data.margin, realizedPnL]);
  const showROI = useMemo(() => {
    if (ROI != null) {
      return `${ROI >= 0 ? "+" : ""}${(ROI * 100).floor(2)}%`;
    }
    return "-";
  }, [ROI]);
  const isRed = useMemo(() => {
    return showROI.indexOf("-") === 0;
  }, [showROI]);
  const isLong = props.data.direction;
  const lever = props.data.leverage;
  const kolAddress = props.data.kolAddress.showAddress();
  const orderPrice = props.data.orderPrice.floor(
    props.data.product.getTokenPriceDecimals()
  );
  const closePrice = props.data.closePrice.floor(
    props.data.product.getTokenPriceDecimals()
  );
  const showF = useMemo(() => {
    if (
      props.data.pt0 != null &&
      props.data.pt1 != null &&
      props.data.closePrice != null &&
      props.data.orderPrice &&
      props.data.direction != null &&
      props.data.leverage != null &&
      props.data.margin != null
    ) {
      let F = 0;
      const u = props.data.pt1 - props.data.pt0;
      const priceRatio = props.data.closePrice / props.data.orderPrice;
      const v = props.data.direction
        ? props.data.margin * Number(props.data.leverage) * priceRatio
        : props.data.margin * Number(props.data.leverage) * (2 - priceRatio);
      F = -Number((u * v).floor(2));
      return `${F > 0 ? "+" : ""}${F} ATF`;
    }
    return "- ATF";
  }, [
    props.data.closePrice,
    props.data.direction,
    props.data.leverage,
    props.data.margin,
    props.data.orderPrice,
    props.data.pt0,
    props.data.pt1,
  ]);
  const tp = useMemo(() => {
    return props.data.takeProfitPrice
      ? props.data.takeProfitPrice.toFixed(
          props.data.product.getTokenPriceDecimals()
        )
      : String().placeHolder;
  }, [props.data.product, props.data.takeProfitPrice]);
  const sl = useMemo(() => {
    return props.data.stopLossPrice
      ? props.data.stopLossPrice.toFixed(
          props.data.product.getTokenPriceDecimals()
        )
      : String().placeHolder;
  }, [props.data.product, props.data.stopLossPrice]);
  const openTime = new Date(props.data.timestamp * 1000);
  const openTimeString = [
    openTime.toLocaleDateString(),
    openTime.toLocaleTimeString(),
  ];
  const closeTime = new Date(props.data.closeTime * 1000);
  const closeTimeString = [
    closeTime.toLocaleDateString(),
    closeTime.toLocaleTimeString(),
  ];

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
            {showRealizedPnL}
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
          {closePrice}
        </Box>
      </TableCell>
      <TableCell sx={tdNoPadding}>
        <Box
          component={"p"}
          sx={(theme) => ({
            fontWeight: 700,
            fontSize: 10,
            color: theme.normal.text0,
          })}
        >
          {showF}
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
          <Box>{openTimeString[0]}</Box>
          <Box>{openTimeString[1]}</Box>
        </Stack>
      </TableCell>

      <TableCell>
        <Stack
          spacing={"4px"}
          sx={(theme) => ({
            fontWeight: "400",
            fontSize: "10px",
            lineHeight: "16px",
            color: theme.normal.text0,
          })}
        >
          <Box>{closeTimeString[0]}</Box>
          <Box>{closeTimeString[1]}</Box>
        </Stack>
      </TableCell>

      {/* <TableCell>
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
      </TableCell> */}
    </TableRow>
  );
};

export default MyCopiesHistory;
