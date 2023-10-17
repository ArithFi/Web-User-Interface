import { FC, useMemo } from "react";
import useWindowWidth from "../../../hooks/useWindowWidth";
import Drawer from "@mui/material/Drawer";
import BaseDrawer from "../../Share/Modal/BaseDrawer";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import BaseModal from "../../Share/Modal/BaseModal";
import { t } from "@lingui/macro";
import Stack from "@mui/material/Stack";
import SettingTPAndSL from "./SettingTPAndSL";
import LongOrShort from "../../../components/LongOrShort/LongOrShort";

interface StopLimitBaseProps {
  onClose: () => void;
  callBack: (tp: number, sl: number) => void;
  baseAmount: number;
  lever: number;
  limitPrice: number;
  token: string;
  tpNow: number;
  slNow: number;
  isLong: boolean;
  changeIsLong: (isLong: boolean) => void;
}

const StopLimitBase: FC<StopLimitBaseProps> = ({ ...props }) => {
  return (
    <Stack spacing={"24px"} sx={{ width: "100%" }}>
      <Box
        sx={{
          width: "100%",
          "& button": {
            width: "100%",
            height: "36px",
          },
        }}
      >
        <LongOrShort value={props.isLong} changeValue={props.changeIsLong} />
      </Box>

      <SettingTPAndSL
        token={props.token}
        baseAmount={props.baseAmount}
        isLong={props.isLong}
        lever={props.lever}
        isFirst={true}
        limitPrice={props.limitPrice}
        callBack={(tp: number, sl: number) => {
          props.callBack(tp, sl);
          props.onClose();
        }}
        tpNow={props.tpNow}
        slNow={props.slNow}
      />
    </Stack>
  );
};

interface StopLimitModalProps {
  open: boolean;
  onClose: () => void;
  callBack: (tp: number, sl: number) => void;
  baseAmount: number;
  lever: number;
  limitPrice: number;
  token: string;
  tpNow: number;
  slNow: number;
  isLong: boolean;
  changeIsLong: (isLong: boolean) => void;
}

const StopLimitModal: FC<StopLimitModalProps> = ({ ...props }) => {
  const { isMobile } = useWindowWidth();
  const view = useMemo(() => {
    return isMobile ? (
      <Drawer
        anchor={"bottom"}
        open={props.open}
        onClose={props.onClose}
        sx={{
          "& .MuiPaper-root": { background: "none", backgroundImage: "none" },
        }}
      >
        <BaseDrawer title={t`Stop-Limit`} onClose={props.onClose}>
          <StopLimitBase
            onClose={props.onClose}
            callBack={props.callBack}
            baseAmount={props.baseAmount}
            lever={props.lever}
            limitPrice={props.limitPrice}
            token={props.token}
            tpNow={props.tpNow}
            slNow={props.slNow}
            isLong={props.isLong}
            changeIsLong={props.changeIsLong}
          />
        </BaseDrawer>
      </Drawer>
    ) : (
      <Modal
        open={props.open}
        onClose={props.onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <BaseModal title={t`Stop-Limit`} onClose={props.onClose}>
            <StopLimitBase
              onClose={props.onClose}
              callBack={props.callBack}
              baseAmount={props.baseAmount}
              lever={props.lever}
              limitPrice={props.limitPrice}
              token={props.token}
              tpNow={props.tpNow}
              slNow={props.slNow}
              isLong={props.isLong}
              changeIsLong={props.changeIsLong}
            />
          </BaseModal>
        </Box>
      </Modal>
    );
  }, [isMobile, props]);

  return view;
};

export default StopLimitModal;
