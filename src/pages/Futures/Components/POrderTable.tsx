import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

import { FC, useMemo } from "react";
import { Share } from "../../../components/icons";
import MainButton from "../../../components/MainButton/MainButton";
import useFuturesPOrder from "../../../hooks/useFuturesPOrder";

import ShareMyOrderModal from "../../Dashboard/Modal/ShareMyOrderModal";
import { FuturesPrice } from "../Futures";
import {
  FuturesModalInfo,
  FuturesModalType,
  FuturesOrderService,
} from "../OrderList";
import FuturesOrderShare from "./FuturesOrderShare";
import OrderTablePosition from "./OrderTablePosition";
import FuturesTableTitle from "./TableTitle";
import { Trans, t } from "@lingui/macro";
import { isForesNewOrder } from "../../../hooks/useFuturesNewOrder";
import GreyButton from "../../../components/MainButton/GreyButton";

interface FuturesPOrderListProps {
  dataArray: Array<FuturesOrderService>;
  closeOrder: Array<FuturesOrderService>;
  price: FuturesPrice | undefined;
  buttonCallBack: (value: FuturesModalInfo) => void;
  forexOpen: boolean;
  style?: React.CSSProperties;
}

const POrderTable: FC<FuturesPOrderListProps> = ({ ...props }) => {
  const rows = props.dataArray.map((item, index) => {
    return (
      <POrderTableRow
        key={`POrderTable + ${index}`}
        data={item}
        price={props.price}
        buttonCallBack={props.buttonCallBack}
        forexOpen={props.forexOpen}
      />
    );
  });
  const noOrder = useMemo(() => {
    if (props.dataArray.length === 0 && props.closeOrder.length === 0) {
      return true;
    }
    return false;
  }, [props.closeOrder.length, props.dataArray.length]);

  return (
    <FuturesTableTitle
      dataArray={[
        t`Symbol`,
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
          index: 1,
          helpInfo: (
            <p>
              <Trans>Including funding amounts.</Trans>
            </p>
          ),
        },
        {
          index: 2,
          helpInfo: (
            <p>
              <Trans>Leverage*Initial Margin</Trans>
            </p>
          ),
        },
        {
          index: 3,
          helpInfo: (
            <p>
              <Trans>
                Initial Margin + Added Margin,Added Margin is the margin for Add
                the user's position.
              </Trans>
            </p>
          ),
        },
        {
          index: 4,
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
          index: 7,
          helpInfo: (
            <p>
              <Trans>
                Due to the market volatility, the actual liquidation price may
                be different from the theoretical liquidation price. Here is the
                theoretical liquidation price, for reference only.
              </Trans>
            </p>
          ),
        },
      ]}
      style={props.style}
      noNeedPadding
    >
      {rows}
    </FuturesTableTitle>
  );
};

const tdNoPadding = {
  padding: "0px !important",
};

interface POrderTableRowProps {
  data: FuturesOrderService;
  price: FuturesPrice | undefined;
  buttonCallBack: (value: FuturesModalInfo) => void;
  forexOpen: boolean;
}
const EditIcon = (
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M4 8C4 5.79086 5.79086 4 8 4H22C23.1046 4 24 4.89543 24 6C24 7.10457 23.1046 8 22 8H8V40H40V26C40 24.8954 40.8954 24 42 24C43.1046 24 44 24.8954 44 26V40C44 42.2092 42.2092 44 40 44H8C5.79088 44 4 42.2092 4 40V8Z"
      fill="#333333"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M34.6947 4C35.2254 3.9999 35.7344 4.21074 36.1096 4.5861L43.4145 11.8942C44.1952 12.6752 44.1952 13.941 43.4145 14.722L22.7317 35.4139C22.3566 35.7892 21.8478 36 21.3172 36H14C12.8954 36 12 35.1046 12 34V26.7199C12 26.1899 12.2104 25.6815 12.5849 25.3065L33.28 4.58663C33.6551 4.21114 34.164 4.0001 34.6947 4ZM34.6956 8.82958L16 27.5476V32H20.4885L39.1722 13.3081L34.6956 8.82958Z"
      fill="#333333"
    />
  </svg>
);

const POrderTableRow: FC<POrderTableRowProps> = ({ ...props }) => {
  const {
    isLong,
    lever,
    showBasePrice,
    tp,
    sl,
    showLiqPrice,
    showUnrealizedPnL,
    showSize,
    showMargin,
    showROI,
    showMarginRatio,
    isRed,
    showShareOrderModal,
    setShowShareOrderModal,
    shareOrder,
    openTime,
    nowPrice,
  } = useFuturesPOrder(props.data, props.price);
  return (
    <TableRow
      sx={(theme) => ({ "&: hover": { background: theme.normal.bg1 } })}
    >
      <ShareMyOrderModal
        value={shareOrder}
        open={showShareOrderModal}
        onClose={() => {
          setShowShareOrderModal(false);
        }}
        isClosed={false}
      />
      <TableCell>
        <OrderTablePosition
          tokenPair={props.data.product}
          isLong={isLong}
          lever={lever}
          isCopy={props.data.copy}
        />
      </TableCell>
      <TableCell sx={tdNoPadding}>
        <Stack spacing={"4px"}>
          <Box
            sx={(theme) => ({
              fontWeight: 700,
              fontSize: 10,
              color: isRed ? theme.normal.danger : theme.normal.success,
            })}
          >
            {showUnrealizedPnL}
          </Box>
          <Box
            sx={(theme) => ({
              display: "block",
              fontWeight: 400,
              fontSize: 12,
              color: isRed ? theme.normal.danger : theme.normal.success,
            })}
          >
            {`(${showROI})`}
          </Box>
        </Stack>
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
          {showSize}
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
          {showMargin}
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
          {showMarginRatio}
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
          {showBasePrice}
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
          {nowPrice}
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
          {showLiqPrice}
        </Box>
      </TableCell>
      <TableCell sx={tdNoPadding}>
        <Stack spacing={"8px"} direction={"row"} alignItems={"center"}>
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
          {props.data.copy ||
          (isForesNewOrder(props.data.product) && !props.forexOpen) ? (
            <></>
          ) : (
            <Box
              sx={(theme) => ({
                width: "12px",
                height: "12px",
                cursor: "pointer",
                "& svg": {
                  width: "12px",
                  height: "12px",
                  display: "block",
                  "& path": {
                    fill: theme.normal.text2,
                  },
                },
                "&:hover svg path": {
                  fill: theme.normal.text0,
                },
                "&:active svg path": {
                  fill: theme.normal.text0,
                },
              })}
              component={"button"}
              onClick={() =>
                props.buttonCallBack({
                  data: props.data,
                  type: FuturesModalType.trigger,
                })
              }
            >
              {EditIcon}
            </Box>
          )}
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
      <TableCell>
        <Stack direction={"row"} justifyContent={"flex-end"} spacing={"8px"}>
          {isForesNewOrder(props.data.product) && !props.forexOpen ? (
            <>
              <MainButton
                title={t`Market Closed`}
                onClick={() => {}}
                style={{
                  width: "auto",
                  height: "36px",
                  minWidth: "65px",
                  fontSize: 12,
                  paddingLeft: `12px`,
                  paddingRight: `12px`,
                  borderRadius: `8px`,
                }}
                disable
              />
            </>
          ) : (
            <>
              {props.data.copy ? (
                <></>
              ) : (
                <>
                  <GreyButton
                    title={t`Add`}
                    onClick={() =>
                      props.buttonCallBack({
                        data: props.data,
                        type: FuturesModalType.add,
                      })
                    }
                    style={{
                      width: "auto",
                      height: "36px",
                      minWidth: "65px",
                      fontSize: 12,
                      paddingLeft: `12px`,
                      paddingRight: `12px`,
                      borderRadius: `8px`,
                    }}
                  />
                </>
              )}

              <GreyButton
                title={t`Close`}
                onClick={() =>
                  props.buttonCallBack({
                    data: props.data,
                    type: FuturesModalType.close,
                  })
                }
                style={{
                  width: "auto",
                  height: "36px",
                  minWidth: "65px",
                  fontSize: 12,
                  paddingLeft: `12px`,
                  paddingRight: `12px`,
                  borderRadius: `8px`,
                }}
              />
            </>
          )}

          <FuturesOrderShare
            component={"button"}
            onClick={() => setShowShareOrderModal(true)}
          >
            <Share />
          </FuturesOrderShare>
        </Stack>
      </TableCell>
    </TableRow>
  );
};

export default POrderTable;
