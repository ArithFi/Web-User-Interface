import { FC, useMemo, useState } from "react";
import useWindowWidth from "../../../hooks/useWindowWidth";
import Drawer from "@mui/material/Drawer";
import BaseDrawer from "../../Share/Modal/BaseDrawer";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import BaseModal from "../../Share/Modal/BaseModal";
import { t } from "@lingui/macro";
import Stack from "@mui/material/Stack";
import LeverageSlider from "../Components/LeverageSlider";
import MainButton from "../../../components/MainButton/MainButton";

interface SettingLeverBaseProps {
  value: number;
  changeValue: (value: number) => void;
  onClose: () => void;
}

const subIcon = (
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M8.5 24C8.5 22.8954 9.39543 22 10.5 22H38.5C39.6046 22 40.5 22.8954 40.5 24C40.5 25.1046 39.6046 26 38.5 26H10.5C9.39543 26 8.5 25.1046 8.5 24Z"
      fill="#333333"
    />
  </svg>
);

const addIcon = (
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M24.0631 8C25.1677 8.00145 26.0619 8.89805 26.0605 10.0026L26.0239 38.0026C26.0225 39.1072 25.1259 40.0014 24.0213 40C22.9167 39.9986 22.0225 39.102 22.0239 37.9974L22.0605 9.99739C22.0619 8.89282 22.9585 7.99856 24.0631 8Z"
      fill="#333333"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M8 24C8 22.8954 8.89543 22 10 22H38C39.1046 22 40 22.8954 40 24C40 25.1046 39.1046 26 38 26H10C8.89543 26 8 25.1046 8 24Z"
      fill="#333333"
    />
  </svg>
);

const SettingLeverBase: FC<SettingLeverBaseProps> = ({ ...props }) => {
  const [nowValue, setNowValue] = useState(props.value);
  return (
    <Stack spacing={"24px"} width={"100%"}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        sx={(theme) => ({
          padding: "12px",
          borderRadius: "8px",
          height: "48px",
          backgroundColor: theme.normal.bg1,
          width: "100%",
        })}
      >
        <Box
          sx={(theme) => ({
            cursor: "pointer",
            width: "24px",
            height: "24px",
            "& svg": {
              width: "24px",
              height: "24px",
              display: "block",
              "& path": {
                fill: theme.normal.text2,
              },
            },
          })}
          component={"button"}
          onClick={() => {
            const result = nowValue - 1;
            if (result > 0) {
              setNowValue(result);
            }
          }}
        >
          {subIcon}
        </Box>

        <Box
          sx={(theme) => ({
            fontWeight: "700",
            fontSize: "16px",
            lineHeight: "22px",
            color: theme.normal.text0,
          })}
        >
          {nowValue}X
        </Box>

        <Box
          sx={(theme) => ({
            cursor: "pointer",
            width: "24px",
            height: "24px",
            "& svg": {
              width: "24px",
              height: "24px",
              display: "block",
              "& path": {
                fill: theme.normal.text2,
              },
            },
          })}
          component={"button"}
          onClick={() => {
            const result = nowValue + 1;
            if (result <= 50) {
              setNowValue(result);
            }
          }}
        >
          {addIcon}
        </Box>
      </Stack>
      <LeverageSlider
        value={nowValue}
        changeValue={(value: number) => setNowValue(value)}
      />
      <MainButton
        title={t`Save`}
        onClick={() => {
          props.changeValue(nowValue);
          props.onClose();
        }}
        style={{ height: "40px", fontSize: "14px", width: "100%" }}
      />
    </Stack>
  );
};

interface SettingLeverModalProps {
  value: number;
  changeValue: (value: number) => void;
  open: boolean;
  onClose: () => void;
}

const SettingLeverModal: FC<SettingLeverModalProps> = ({ ...props }) => {
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
        <BaseDrawer title={t`Adjust Leverage`} onClose={props.onClose}>
          <SettingLeverBase
            value={props.value}
            changeValue={props.changeValue}
            onClose={props.onClose}
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
          <BaseModal title={t`Adjust Leverage`} onClose={props.onClose}>
            <SettingLeverBase
              value={props.value}
              changeValue={props.changeValue}
              onClose={props.onClose}
            />
          </BaseModal>
        </Box>
      </Modal>
    );
  }, [isMobile, props]);

  return view;
};

export default SettingLeverModal;
