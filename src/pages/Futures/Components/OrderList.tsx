import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { FC } from "react";
import MainButton from "../../../components/MainButton/MainButton";
import useFuturesOrder from "../../../hooks/useFuturesOrder";

import ShareNewOrderModal from "../../Dashboard/Modal/ShareNewOrderModal";
import {
  FuturesModalInfo,
  FuturesModalType,
  FuturesOrderService,
} from "../OrderList";
import FuturesOrderListInfo from "./FuturesOrderListInfo";
import OrderListPosition from "./OrderListPosition";
import { Trans, t } from "@lingui/macro";
import { isForesNewOrder } from "../../../hooks/useFuturesNewOrder";
import { FuturesOrderListTitleAndValue } from "./FuturesOrderListTitleAndValue";
import { FuturesPrice } from "../Futures";
import ArithFiLine from "../../../components/ArithFiLine";
import GreyButton from "../../../components/MainButton/GreyButton";

interface OrderListProps {
  data: FuturesOrderService;
  buttonCallBack: (value: FuturesModalInfo) => void;
  updateList: () => void;
  forexOpen: boolean;
  price: FuturesPrice | undefined;
}

const OrderList: FC<OrderListProps> = ({ ...props }) => {
  const {
    isLong,
    lever,
    showLimitPrice,
    mainButtonTitle,
    mainButtonLoading,
    mainButtonDis,
    mainButtonAction,
    showShareOrderModal,
    setShowShareOrderModal,
    shareOrder,
    tp,
    sl,
    openTime,
    showSize,
    showMargin,
    nowPrice,
    showTriggerTitle,
  } = useFuturesOrder(props.data, props.updateList, props.price);
  return (
    <Stack
      spacing={"12px"}
      sx={(theme) => ({
        width: "100%",
      })}
    >
      <ShareNewOrderModal
        value={shareOrder}
        open={showShareOrderModal}
        onClose={() => {
          setShowShareOrderModal(false);
        }}
      />
      <OrderListPosition
        tokenPair={props.data.product}
        lever={lever}
        isLong={isLong}
        shareCallBack={() => setShowShareOrderModal(true)}
      />
      <Stack spacing={"8px"}>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Box width={"50%"}>
            <FuturesOrderListTitleAndValue
              title={t`Size`}
              value={showSize}
              help={t`Leverage*Initial Margin`}
            />
          </Box>
          <Box width={"50%"}>
            <FuturesOrderListTitleAndValue
              title={t`Margin`}
              value={showMargin}
              help={t`Initial Margin + Added Margin,Added Margin is the margin for Add
              the user's position.`}
            />
          </Box>
        </Stack>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Box width={"50%"}>
            <FuturesOrderListTitleAndValue
              title={t`Limit Order`}
              value={showLimitPrice}
            />
          </Box>

          <Box width={"50%"}>
            <FuturesOrderListTitleAndValue
              title={t`Market Price`}
              value={nowPrice}
            />
          </Box>
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
            <GreyButton
              title={t`Limit`}
              onClick={() =>
                props.buttonCallBack({
                  data: props.data,
                  type: FuturesModalType.editLimit,
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
            <GreyButton
              title={mainButtonTitle}
              isLoading={mainButtonLoading}
              disable={mainButtonDis}
              onClick={mainButtonAction}
              style={{ height: "40px", fontSize: 14 }}
            />
          </>
        )}
      </Stack>
      <ArithFiLine />
    </Stack>
  );
};

export default OrderList;
