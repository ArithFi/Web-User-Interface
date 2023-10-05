import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { FC } from "react";
import {
  TelegramIcon,
  TwitterIcon,
  GithubIcon,
  MediumIcon,
  BNBTokenLogo,
} from "../../../components/icons";
import useArithFi from "../../../hooks/useArithFi";
import useWindowWidth from "../../../hooks/useWindowWidth";

export const FootArray = [
  { icon: TelegramIcon, link: "https://t.me/ArithFi_Dao" },
  { icon: TwitterIcon, link: "https://twitter.com/ArithFi" },
  { icon: GithubIcon, link: "https://github.com/ArithFi" },
  { icon: MediumIcon, link: "https://medium.com/@ArithFi" },
  { icon: BNBTokenLogo, link: "https://testnet.bnbchain.org/faucet-smart" },
];

export const NESTFootStack = styled(Stack)(({ theme }) => ({
  height: 112,
  background: theme.normal.bg0,
  borderTop: `1px solid ${theme.normal.border}`,
  "& a": {
    "&:hover": {
      "& svg path": {
        fill: theme.normal.text0,
      },
    },
    "& svg": {
      width: 32,
      height: 32,
      "& path": {
        fill: theme.normal.text2,
      },
    },
  },
}));
export const FootAList = FootArray.map((item, index) => {
  const Icon = item.icon;
  return (
    <a key={`FootLink + ${index}`} href={`${item.link}`} target={"blank"}>
      <Icon />
    </a>
  );
});
const NESTFoot: FC = () => {
  const { isBigMobile } = useWindowWidth();
  const { chainsData } = useArithFi();
  const foot = () => {
    return isBigMobile ? (
      <></>
    ) : (
      <NESTFootStack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={"24px"}
      >
        {chainsData.chainId === 97 ? FootAList : FootAList.slice(0, 4)}
      </NESTFootStack>
    );
  };
  return foot();
};

export default NESTFoot;
