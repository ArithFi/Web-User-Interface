import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import { FC, useCallback, useMemo } from "react";
import useWindowWidth from "../../../hooks/useWindowWidth";
import BaseDrawer from "../../Share/Modal/BaseDrawer";
import BaseModal from "../../Share/Modal/BaseModal";
import { FuturesPrice } from "../Futures";
import { t } from "@lingui/macro";
import { FuturesOrderService } from "../OrderList";
import SettingTPAndSL from "./SettingTPAndSL";
import useArithFi from "../../../hooks/useArithFi";
import { serviceUpdateStopPrice } from "../../../lib/ArithFiRequest";

interface EditPositionModalBaseProps {
  onClose: (res?: boolean) => void;
  baseAmount: number;
  lever: number;
  token: string;
  isLong: boolean;
  openPrice: number;
  append: number;
  index: number;
  tpNow: number;
  slNow: number;
  price: FuturesPrice | undefined;
}

const EditPositionModalBase: FC<EditPositionModalBaseProps> = ({
  ...props
}) => {
  const { chainsData, signature } = useArithFi();
  const update = useCallback(
    async (tp: number, sl: number) => {
      if (chainsData.chainId && signature) {
        const updateBase: { [key: string]: any } = await serviceUpdateStopPrice(
          props.index.toString(),
          sl.toString(),
          tp.toString(),
          chainsData.chainId,
          { Authorization: signature.signature }
        );
        props.onClose(Number(updateBase["errorCode"]) === 0);
      }
    },
    [chainsData.chainId, props, signature]
  );

  const nowPrice = useMemo(() => {
    if (props.price) {
      return Number(
        props.price[props.token].bigNumberToShowPrice(
          18,
          props.token.getTokenPriceDecimals()
        )
      );
    } else {
      return 0;
    }
  }, [props.price, props.token]);

  return (
    <Stack spacing={"24px"} sx={{ width: "100%" }}>
      <SettingTPAndSL
        token={props.token}
        baseAmount={props.baseAmount}
        isLong={props.isLong}
        lever={props.lever}
        isFirst={false}
        limitPrice={nowPrice}
        callBack={(tp: number, sl: number) => {
          update(tp, sl);
        }}
        openPrice={props.openPrice}
        append={props.append}
        tpNow={props.tpNow}
        slNow={props.slNow}
      />
    </Stack>
  );
};

interface EditPositionModalProps {
  data: FuturesOrderService;
  price: FuturesPrice | undefined;
  open: boolean;
  onClose: (res?: boolean) => void;
}

const EditPositionModal: FC<EditPositionModalProps> = ({ ...props }) => {
  const { isMobile } = useWindowWidth();
  // const title = useMemo(() => {
  //   return !(props.data.stopLossPrice === 0 && props.data.takeProfitPrice === 0)
  //     ? t`Edit Position`
  //     : t`Trigger Position`;
  // }, [props.data.stopLossPrice, props.data.takeProfitPrice]);
  const view = useMemo(() => {
    return isMobile ? (
      <Drawer
        anchor={"bottom"}
        open={props.open}
        onClose={() => {
          props.onClose(undefined);
        }}
        sx={{
          "& .MuiPaper-root": { background: "none", backgroundImage: "none" },
        }}
      >
        <BaseDrawer
          title={t`Trigger Position`}
          onClose={() => {
            props.onClose(undefined);
          }}
        >
          <EditPositionModalBase
            onClose={props.onClose}
            baseAmount={props.data.balance}
            lever={props.data.leverage}
            token={props.data.product.split("/")[0]}
            isLong={props.data.direction}
            openPrice={props.data.orderPrice}
            append={props.data.append}
            index={props.data.id}
            tpNow={props.data.takeProfitPrice}
            slNow={props.data.stopLossPrice}
            price={props.price}
          />
        </BaseDrawer>
      </Drawer>
    ) : (
      <Modal
        open={props.open}
        onClose={() => props.onClose()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <BaseModal
            title={t`Trigger Position`}
            onClose={() => {
              props.onClose(undefined);
            }}
          >
            <EditPositionModalBase
              onClose={props.onClose}
              baseAmount={props.data.balance}
              lever={props.data.leverage}
              token={props.data.product.split("/")[0]}
              isLong={props.data.direction}
              openPrice={props.data.orderPrice}
              append={props.data.append}
              index={props.data.id}
              tpNow={props.data.takeProfitPrice}
              slNow={props.data.stopLossPrice}
              price={props.price}
            />
          </BaseModal>
        </Box>
      </Modal>
    );
  }, [isMobile, props]);

  return view;
};

export default EditPositionModal;
