import { FC, useMemo } from "react";
import useWindowWidth from "../../../hooks/useWindowWidth";
import { Trans, t } from "@lingui/macro";
import Drawer from "@mui/material/Drawer";
import BaseDrawer from "../../Share/Modal/BaseDrawer";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import BaseModal from "../../Share/Modal/BaseModal";
import Stack from "@mui/material/Stack";
import MainButton from "../../../components/MainButton/MainButton";

interface CopyNoStopBaseModalProps {
  onClose: () => void;
}

const CopyNoStopBaseModal: FC<CopyNoStopBaseModalProps> = ({ ...props }) => {
  return (
    <Stack spacing={"24px"} width={"100%"}>
      <Box
        sx={(theme) => ({
          fontSize: "14px",
          fontWeight: "400",
          lineHeight: "20px",
          color: theme.normal.text0,
        })}
      >
        <Trans>
          The foreign exchange market is closed. Please wait for the market to
          open before taking any action.
        </Trans>
      </Box>

      <MainButton
        title={t`I understand`}
        isLoading={false}
        disable={false}
        onClick={() => props.onClose()}
      />
    </Stack>
  );
};

interface CopyNoStopModalProps {
  open: boolean;
  onClose: () => void;
}

const CopyNoStopModal: FC<CopyNoStopModalProps> = ({ ...props }) => {
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
        keepMounted
      >
        <BaseDrawer title={t`Stop Copying`} onClose={props.onClose}>
          <CopyNoStopBaseModal onClose={props.onClose} />
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
          <BaseModal title={t`Stop Copying`} onClose={props.onClose}>
            <CopyNoStopBaseModal onClose={props.onClose} />
          </BaseModal>
        </Box>
      </Modal>
    );
  }, [isMobile, props]);

  return view;
};

export default CopyNoStopModal;
