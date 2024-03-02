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
  nowPrice: number;
  isLimitOrder: boolean;
  F: number;
}

const EditPositionModalBase: FC<EditPositionModalBaseProps> = ({
  ...props
}) => {
  const { account, signature } = useArithFi();
  const update = useCallback(
    async (tp: number, sl: number) => {
      if (account.address && signature) {
        const updateBase: { [key: string]: any } = await serviceUpdateStopPrice(
          account.address,
          props.index.toString(),
          sl.toString(),
          tp.toString(),
          { Authorization: signature.signature }
        );
        props.onClose(Number(updateBase["err"]) === 0);
      }
    },
    [account.address, props, signature]
  );

  return (
    <Stack spacing={"24px"} sx={{ width: "100%" }}>
      <SettingTPAndSL
        token={props.token}
        baseAmount={props.baseAmount}
        isLong={props.isLong}
        lever={props.lever}
        isFirst={false}
        limitPrice={props.nowPrice}
        callBack={(tp: number, sl: number) => {
          update(tp, sl);
        }}
        openPrice={props.openPrice}
        append={props.append}
        tpNow={props.tpNow}
        slNow={props.slNow}
        isLimitOrder={props.isLimitOrder}
        F={props.F}
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
  const baseAmount =
    props.data.balance === 0 ? props.data.margin : props.data.balance;
  const nowPrice = useMemo(() => {
    const nowPriceBase = props.price?.[
      props.data.product.toLocaleUpperCase()
    ]
    if (nowPriceBase != null) {
      return Number(
        nowPriceBase.bigNumberToShowPrice(18, props.data.product.getTokenPriceDecimals())
      );
    } else {
      return 0;
    }
  }, [props.data.product, props.price]);
  const limitPrice = useMemo(() => {
    return props.data.status === 4 ? props.data.orderPrice : nowPrice;
  }, [nowPrice, props.data.orderPrice, props.data.status]);
  const F = useMemo(() => {
    if (props.data.pt0 != null && props.data.pt1 != null) {
      return props.data.pt1 - props.data.pt0
    } else {
      return 0
    }
  }, [props.data.pt0, props.data.pt1])
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
            baseAmount={baseAmount}
            lever={props.data.leverage}
            token={props.data.product}
            isLong={props.data.direction}
            openPrice={props.data.orderPrice}
            append={props.data.append}
            index={props.data.id}
            tpNow={props.data.takeProfitPrice}
            slNow={props.data.stopLossPrice}
            nowPrice={limitPrice}
            isLimitOrder={props.data.status === 4}
            F={F}
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
              baseAmount={baseAmount}
              lever={props.data.leverage}
              token={props.data.product}
              isLong={props.data.direction}
              openPrice={props.data.orderPrice}
              append={props.data.append}
              index={props.data.id}
              tpNow={props.data.takeProfitPrice}
              slNow={props.data.stopLossPrice}
              nowPrice={limitPrice}
              isLimitOrder={props.data.status === 4}
              F={F}
            />
          </BaseModal>
        </Box>
      </Modal>
    );
  }, [baseAmount, isMobile, limitPrice, props]);

  return view;
};

export default EditPositionModal;
