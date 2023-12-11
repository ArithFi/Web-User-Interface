import Drawer from "@mui/material/Drawer";
import { FC } from "react";
import { t } from "@lingui/macro";
import TokenListBaseView from "./TokenListBaseView";
import { FuturesPrice, FuturesPricePercent } from "../Futures";
import { Close } from "../../../components/icons";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

interface TokenListModalProps {
  open: boolean;
  onClose: () => void;
  changeTokenPair: (value: string) => void;
  favList: Array<string>;
  forexOpen: boolean;
  basePrice?: FuturesPrice;
  basePricePercent?: FuturesPricePercent;
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
      <TokenListModalBaseDrawer
        title={t`Choose Token Pair`}
        onClose={() => {
          props.onClose();
        }}
      >
        <TokenListBaseView
          changeTokenPair={props.changeTokenPair}
          favList={props.favList}
          forexOpen={props.forexOpen}
          basePrice={props.basePrice}
          basePricePercent={props.basePricePercent}
        />
      </TokenListModalBaseDrawer>
    </Drawer>
  );
};

interface TokenListModalBaseDrawerProps {
  title: string;
  onClose: () => void;
  children?: React.ReactNode;
}

const TokenListModalBaseBox = styled(Box)(({ theme }) => {
  return {
    width: "100%",
  };
});

const TokenListModalBaseModalStack = styled(Stack)(({ theme }) => {
  return {
    width: "100%",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    background: theme.normal.bg2,
  };
});

const TokenListModalTopStack = styled(Stack)(({ theme }) => {
  return {
    width: "100%",
    marginBottom: 20,
    padding: "20px 20px 0px 20px",
    "& button": {
      width: 20,
      height: 20,
      "&:hover": {
        cursor: "pointer",
      },
      "& svg": {
        width: 20,
        height: 20,
        "& path": {
          fill: theme.normal.text2,
        },
      },
    },
    "& .ModalTitle": {
      fontWeight: 700,
      width: "100%",
      fontSize: 16,
      color: theme.normal.text0,
      textAlign: "left",
    },
  };
});

const TokenListModalBaseDrawer: FC<TokenListModalBaseDrawerProps> = ({
  children,
  ...props
}) => {
  return (
    <TokenListModalBaseBox>
      <TokenListModalBaseModalStack
        justifyContent="center"
        alignItems="center"
        spacing={0}
      >
        <TokenListModalTopStack
          direction={"row"}
          justifyContent="space-between"
          alignItems="center"
          spacing={0}
        >
          <p className="ModalTitle">{props.title}</p>
          <button onClick={props.onClose}>
            <Close />
          </button>
        </TokenListModalTopStack>
        {children}
      </TokenListModalBaseModalStack>
    </TokenListModalBaseBox>
  );
};

export default TokenListModal;
