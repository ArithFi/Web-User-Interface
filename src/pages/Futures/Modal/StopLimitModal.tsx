import { FC, useMemo, useState } from "react";
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
}

const StopLimitBase: FC<StopLimitBaseProps> = ({ ...props }) => {
  const [isLong, setIsLong] = useState(true);
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
        <LongOrShort
          value={isLong}
          changeValue={(value: boolean) => setIsLong(value)}
        />
      </Box>

      <SettingTPAndSL
        token={props.token}
        baseAmount={props.baseAmount}
        isLong={isLong}
        lever={props.lever}
        isFirst={true}
        limitPrice={props.limitPrice}
        callBack={(tp: number, sl: number) => {
          props.callBack(tp, sl);
          props.onClose();
        }}
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
            />
          </BaseModal>
        </Box>
      </Modal>
    );
  }, [isMobile, props]);

  return view;
};

export default StopLimitModal;
