import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { FC } from "react";
import { NEXT } from "../../components/icons";
import ArithFiLine from "../../components/ArithFiLine";
import { Trans } from "@lingui/macro";
import useLanguageWithDoc from "../../hooks/useLanguageWithDoc";
import useArithFi from "../../hooks/useArithFi";
import {i18n} from "@lingui/core";

const InfoBox = styled(Box)(({ theme }) => ({
  fontWeight: 700,
  fontSize: 14,
  height: "20px",
  lineHeight: "20px",
  color: theme.normal.primary,
}));

const NextBox = styled(Box)(({ theme }) => ({
  width: 14,
  height: 14,
  "& svg": {
    width: 14,
    height: 14,
    display: "block",
    "& path": {
      fill: theme.normal.text2,
    },
  },
}));

const FuturesMoreInfo: FC = () => {
  const { docLink } = useLanguageWithDoc();
  const { account } = useArithFi();
  return (
    <Stack
      spacing={"16px"}
      sx={(theme) => ({
        paddingY: "31.5px",
        width: "100%",
      })}
    >
      <Box
        component={"p"}
        sx={(theme) => ({
          paddingX: "20px",
          fontWeight: 700,
          fontSize: 16,
          height: "22px",
          lingHeight: "22px",
          width: "100%",
          textAlign: "left",
          color: theme.normal.text0,
        })}
      >
        <Trans>More Info</Trans>
      </Box>
      <Stack
        sx={{
          width: "100%",
        }}
      >
        {/* <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          width={"100%"}
          component={"button"}
          onClick={() => {
            window.open();
          }}
          sx={(theme) => ({
            paddingX: "20px",
            height: "60px",
            "&:hover": { cursor: "pointer", background: theme.normal.bg1 },
          })}
        >
          <InfoBox component={"p"}>
            <Trans>ATF White Paper</Trans>
          </InfoBox>
          <NextBox>
            <NEXT />
          </NextBox>
        </Stack>
        <ArithFiLine style={{ padding: "0 20px" }} /> */}
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          width={"100%"}
          component={"button"}
          onClick={() => {
            window.open(docLink);
          }}
          sx={(theme) => ({
            paddingX: "20px",
            height: "60px",
            "&:hover": { cursor: "pointer", background: theme.normal.bg1 },
          })}
        >
          <InfoBox component={"p"}>
            <Trans>How to Trade</Trans>
          </InfoBox>
          <NextBox>
            <NEXT />
          </NextBox>
        </Stack>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          width={"100%"}
          component={"button"}
          onClick={() => {
            let url = "https://rank.arithfi.com/";
            if (account?.address) {
              url += `?walletAddress=${account?.address}&lang=${i18n.locale}`;
            } else {
              url += `?lang=${i18n.locale}`;
            }
            window.open(url);
          }}
          sx={(theme) => ({
            paddingX: "20px",
            height: "60px",
            "&:hover": { cursor: "pointer", background: theme.normal.bg1 },
          })}
        >
          <InfoBox component={"p"}>
            <Trans>ArithFi Contribution Ranking</Trans>
          </InfoBox>
          <NextBox>
            <NEXT />
          </NextBox>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default FuturesMoreInfo;
