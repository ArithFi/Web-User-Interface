import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { FC } from "react";
import MainButton from "../../../components/MainButton/MainButton";
import ArithFiLine from "../../../components/ArithFiLine";

import useFuturesPOrder from "../../../hooks/useFuturesPOrder";
import ShareMyOrderModal from "../../Dashboard/Modal/ShareMyOrderModal";
import { FuturesPrice } from "../Futures";
import {
  FuturesModalInfo,
  FuturesModalType,
  FuturesOrderService,
} from "../OrderList";

import OrderListPosition from "./OrderListPosition";
import { t } from "@lingui/macro";
import { isForesNewOrder } from "../../../hooks/useFuturesNewOrder";
import { FuturesOrderListTitleAndValue } from "./FuturesOrderListTitleAndValue";
import GreyButton from "../../../components/MainButton/GreyButton";

interface POrderListProps {
  data: FuturesOrderService;
  price: FuturesPrice | undefined;
  buttonCallBack: (value: FuturesModalInfo) => void;
  forexOpen: boolean;
}

const POrderList: FC<POrderListProps> = ({ ...props }) => {
  const {
    isLong,
    lever,
    showBasePrice,
    tp,
    sl,
    showLiqPrice,
    showTriggerTitle,
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
    <Stack
      spacing={"12px"}
      sx={(theme) => ({
        width: "100%",
      })}
    >
      <ShareMyOrderModal
        value={shareOrder}
        open={showShareOrderModal}
        onClose={() => {
          setShowShareOrderModal(false);
        }}
        isClosed={false}
      />
      <OrderListPosition
        tokenPair={props.data.product}
        lever={lever}
        isLong={isLong}
        shareCallBack={() => setShowShareOrderModal(true)}
        isCopy={props.data.copy}
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
              value={showBasePrice}
            />
          </Box>
          <Stack
            direction={"row"}
            width={"100%"}
            justifyContent={"space-between"}
          >
            <FuturesOrderListTitleAndValue
              title={t`Mark Price`}
              value={nowPrice}
            />
            <FuturesOrderListTitleAndValue
              title={t`Liq Price`}
              value={showLiqPrice}
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
      <Stack direction={"row"} spacing={"8px"}>
        {isForesNewOrder(props.data.product) && !props.forexOpen ? (
          <>
            <MainButton
              title={t`Market Closed`}
              onClick={() => {}}
              style={{ height: "40px", fontSize: 14 }}
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
                  style={{ height: "40px", fontSize: 14 }}
                />
                <GreyButton
                  title={showTriggerTitle}
                  onClick={() =>
                    props.buttonCallBack({
                      data: props.data,
                      type: FuturesModalType.trigger,
                    })
                  }
                  style={{ height: "40px", fontSize: 14 }}
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
              style={{ height: "40px", fontSize: 14 }}
            />
          </>
        )}
      </Stack>
      <ArithFiLine />
    </Stack>
  );
};

export default POrderList;
