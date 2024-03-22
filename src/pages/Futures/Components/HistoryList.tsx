import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { FC } from "react";
import ArithFiLine from "../../../components/ArithFiLine";
import ShareMyOrderModal from "../../Dashboard/Modal/ShareMyOrderModal";
import { FuturesModalInfo } from "../OrderList";
import OrderListPosition from "./OrderListPosition";
import { t } from "@lingui/macro";
import useFuturesHistory, {
  FuturesHistoryService,
} from "../../../hooks/useFuturesHistory";
import { FuturesOrderListTitleAndValue } from "./FuturesOrderListTitleAndValue";

interface HistoryListProps {
  data: FuturesHistoryService;
  buttonCallBack: (value: FuturesModalInfo) => void;
}

const HistoryList: FC<HistoryListProps> = ({ ...props }) => {
  const {
    isLong,
    lever,
    tp,
    sl,
    showOpenPrice,
    showPercent,
    isRed,
    showShareOrderModal,
    setShowShareOrderModal,
    shareOrder,
    showClosePrice,
    showSize,
    showMargin,
    openTime,
    closeTime,
    showRealizedPnL,
    showF,
  } = useFuturesHistory(props.data);

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
        isClosed={true}
      />
      <OrderListPosition
        tokenPair={props.data.tokenPair}
        lever={lever}
        isLong={isLong}
        shareCallBack={() => setShowShareOrderModal(true)}
        status={props.data.status}
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
            value={`${showPercent}%`}
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
              value={showOpenPrice}
            />
          </Box>
          <Stack
            direction={"row"}
            width={"100%"}
            justifyContent={"space-between"}
          >
            <FuturesOrderListTitleAndValue
              title={t`Close Price`}
              value={showClosePrice}
            />
            <FuturesOrderListTitleAndValue
              title={t`Founding Amount`}
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
            {`${t`Open Time`} ${openTime[0]} ${openTime[1]}`}
          </Box>
          <Box
            sx={(theme) => ({
              fontSize: "10px",
              fontWeight: 400,
              lineHeight: "14px",
              color: theme.normal.text2,
            })}
          >
            {`${t`Close Time`} ${closeTime[0]} ${closeTime[1]}`}
          </Box>
        </Stack>
      </Stack>
      <ArithFiLine />
    </Stack>
  );
};

export default HistoryList;
