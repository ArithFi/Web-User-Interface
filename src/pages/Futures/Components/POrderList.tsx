import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { FC } from "react";
import MainButton from "../../../components/MainButton/MainButton";
import ArithFiLine from "../../../components/ArithFiLine";
import { ArithFiTooltipFC } from "../../../components/ArithFiTooltip/ArithFiTooltip";
import useFuturesPOrder from "../../../hooks/useFuturesPOrder";
import ShareMyOrderModal from "../../Dashboard/Modal/ShareMyOrderModal";
import { FuturesPrice, isForex } from "../Futures";
import {
  FuturesModalInfo,
  FuturesModalType,
  FuturesOrderService,
} from "../OrderList";
import FuturesOrderListInfo, {
  FuturesOrderListInfoMain,
} from "./FuturesOrderListInfo";
import OrderListPosition from "./OrderListPosition";
import { Trans, t } from "@lingui/macro";

interface POrderListProps {
  data: FuturesOrderService;
  price: FuturesPrice | undefined;
  buttonCallBack: (value: FuturesModalInfo) => void;
  forexOpen: boolean;
}

const POrderList: FC<POrderListProps> = ({ ...props }) => {
  const {
    tokenName,
    isLong,
    lever,
    showBasePrice,
    showTriggerTitle,
    tp,
    sl,
    showLiqPrice,
    showMarginAssets,
    showPercent,
    isRed,
    showShareOrderModal,
    setShowShareOrderModal,
    shareOrder,
    openTime,
  } = useFuturesPOrder(props.data, props.price);

  return (
    <Stack
      spacing={"20px"}
      sx={(theme) => ({
        padding: "20px",
        width: "100%",
        borderRadius: "12px",
        background: theme.normal.bg1,
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
        <Stack direction={"row"} justifyContent={"space-around"}>
          <FuturesOrderListInfoMain spacing={"4px"} width={"100%"}>
            <Box component={"p"}>
              <Trans>Open Price</Trans>
            </Box>
            <Box component={"p"}>{showBasePrice}</Box>
          </FuturesOrderListInfoMain>
          <FuturesOrderListInfoMain spacing={"4px"} width={"100%"}>
            <Box component={"p"}>
              <Trans>Actual Margin</Trans>
            </Box>
            <Stack
              direction={"row"}
              spacing={"4px"}
              alignItems={"flex-end"}
              component={"p"}
            >
              <span>{showMarginAssets}ATF</span>
              <span className={isRed ? "Short" : "Long"}>{showPercent}%</span>
            </Stack>
          </FuturesOrderListInfoMain>
        </Stack>
        <ArithFiLine />
        {!(tp === String().placeHolder && sl === String().placeHolder) ? (
          <Stack direction={"row"} justifyContent={"space-around"}>
            <FuturesOrderListInfo
              direction={"row"}
              spacing={"4px"}
              width={"100%"}
            >
              <Box component={"p"}>
                <Trans>Take Profit</Trans>
              </Box>
              <Box component={"p"}>{tp}</Box>
            </FuturesOrderListInfo>
            <FuturesOrderListInfo
              direction={"row"}
              spacing={"4px"}
              width={"100%"}
            >
              <Box component={"p"}>
                <Trans>Stop Loss</Trans>
              </Box>
              <Box component={"p"}>{sl}</Box>
            </FuturesOrderListInfo>
          </Stack>
        ) : (
          <></>
        )}

        <Stack direction={"row"} justifyContent={"space-around"}>
          <FuturesOrderListInfo
            direction={"row"}
            spacing={"4px"}
            width={"100%"}
          >
            <Stack
              direction={"row"}
              spacing={"4px"}
              alignItems={"center"}
              component={"p"}
            >
              <Box component={"p"}>
                <Trans>Liq Price</Trans>
              </Box>
              <ArithFiTooltipFC
                title={
                  <p>
                    <Trans>
                      Due to the market volatility, the actual liquidation price
                      may be different from the theoretical liquidation price .
                      Here is the theoretical liquidation price, for reference
                      only.
                    </Trans>
                  </p>
                }
              />
            </Stack>
            <Box component={"p"}>{showLiqPrice}</Box>
          </FuturesOrderListInfo>
        </Stack>

        <Stack direction={"row"} justifyContent={"space-around"}>
          <FuturesOrderListInfo
            direction={"row"}
            spacing={"4px"}
            width={"100%"}
          >
            <Stack
              direction={"row"}
              spacing={"4px"}
              alignItems={"center"}
              component={"p"}
            >
              <Box component={"p"}>
                <Trans>Time</Trans>
              </Box>
            </Stack>
            <Box component={"p"}>
              {openTime[0]} {openTime[1]}
            </Box>
          </FuturesOrderListInfo>
        </Stack>
      </Stack>
      <Stack direction={"row"} spacing={"8px"}>
        {isForex(lever) && !props.forexOpen ? (
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
                <MainButton
                  title={t`Add`}
                  onClick={() =>
                    props.buttonCallBack({
                      data: props.data,
                      type: FuturesModalType.add,
                    })
                  }
                  style={{ height: "40px", fontSize: 14 }}
                />
                <MainButton
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

            <MainButton
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
    </Stack>
  );
};

export default POrderList;
