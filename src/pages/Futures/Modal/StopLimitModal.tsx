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

const StopLimitBase: FC = () => {
  const [isLong, setIsLong] = useState(true);
  return (
    <Stack spacing={"24px"} sx={{width: "100%"}}>
      <Box sx={{
        width: "100%",
        "& button": {
            width: "100%",
            height: "36px"
        }
      }}>
        <LongOrShort
          value={isLong}
          changeValue={(value: boolean) => setIsLong(value)}
        />
      </Box>

      <SettingTPAndSL isLong={isLong} isFirst={true} limitPrice={1000} />
    </Stack>
  );
};

interface StopLimitModalProps {
  open: boolean;
  onClose: (result?: boolean) => void;
}

const StopLimitModal: FC<StopLimitModalProps> = ({ ...props }) => {
  const { isMobile } = useWindowWidth();
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
          title={t`Stop-Limit`}
          onClose={() => {
            props.onClose(undefined);
          }}
        >
          <StopLimitBase />
        </BaseDrawer>
      </Drawer>
    ) : (
      <Modal
        open={props.open}
        onClose={() => {
          props.onClose(undefined);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <BaseModal
            title={t`Stop-Limit`}
            onClose={() => {
              props.onClose(undefined);
            }}
          >
            <StopLimitBase />
          </BaseModal>
        </Box>
      </Modal>
    );
  }, [isMobile, props]);

  return view;
};

export default StopLimitModal;
