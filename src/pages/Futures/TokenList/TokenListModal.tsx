import Drawer from "@mui/material/Drawer";
import { FC } from "react";
import BaseDrawer from "../../Share/Modal/BaseDrawer";
import { t } from "@lingui/macro";
import TokenListBaseView from "./TokenListBaseView";

interface TokenListModalProps {
  open: boolean;
  onClose: () => void;
  changeTokenPair: (value: string) => void;
}

const TokenListModal: FC<TokenListModalProps> = ({ ...props }) => {
  return (
    <Drawer
      anchor={"bottom"}
      open={props.open}
      onClose={() => {
        props.onClose();
      }}
      sx={{
        "& .MuiPaper-root": { background: "none", backgroundImage: "none" },
      }}
      keepMounted
    >
      <BaseDrawer
        title={t`Choose Token Pair`}
        onClose={() => {
          props.onClose();
        }}
      >
        <TokenListBaseView changeTokenPair={props.changeTokenPair} />
      </BaseDrawer>
    </Drawer>
  );
};

export default TokenListModal;
