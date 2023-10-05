import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { FC, useMemo } from "react";
import useArithFi from "../../hooks/useArithFi";
import { NEXT, SwapExchangeSmall } from "../icons";
import LinkButton from "../MainButton/LinkButton";
import ArithFiLine from "../ArithFiLine";
import OneTokenIN from "../TokenIconAndName/OneTokenI&N";
import { Trans, t } from "@lingui/macro";

interface ArithFiInputProps {
  checkBalance: boolean;
  showToSwap: boolean;
  showBalance: string;
  maxCallBack: () => void;
  nestAmount: string;
  changeNestAmount: (value: string) => void;
  otherCallBack: () => void;
  hideSwapTitle?: boolean;
  style?: React.CSSProperties;
}

const ArithFiInput: FC<ArithFiInputProps> = ({ ...props }) => {
  const { account, checkSigned } = useArithFi();
  const noNESTText = useMemo(() => {
    if (checkSigned) {
      return t`Insufficient balance. Please deposit to start the lightning trade.`;
    } else {
      return t`Please complete your sign`;
    }
  }, [checkSigned]);
  const swapTitle = useMemo(() => {
    return t`Deposit`
  }, []);
  return (
    <Stack
      justifyContent={"flex-start"}
      sx={(theme) => ({
        border: `1px solid ${
          account.address && !props.checkBalance
            ? theme.normal.danger
            : theme.normal.border
        }`,
        borderRadius: "8px",
        background: theme.normal.bg1,
        width: "100%",
        paddingTop: "20px",
        paddingX: "12px",
        "&:hover": {
          border: `1px solid ${
            account.address && !props.checkBalance
              ? theme.normal.danger
              : theme.normal.primary
          }`,
        },
      })}
      style={props.style}
    >
      <Stack direction={"row"} justifyContent={"space-between"} height={"24px"}>
        <Box
          sx={(theme) => ({
            fontSize: 16,
            fontWeight: 700,
            color: theme.normal.text0,
            width: "100%",
            height: "24px",
            "&::placeHolder": {
              color: theme.normal.text3,
            },
          })}
          component={"input"}
          placeholder={t`Amount`}
          value={props.nestAmount}
          maxLength={32}
          onChange={(e) =>
            props.changeNestAmount(e.target.value.formatInputNum())
          }
        />
        <OneTokenIN tokenName={"ATF"} height={24} />
      </Stack>
      <ArithFiLine style={{ marginTop: "12px", marginBottom: "12px" }} />
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        marginBottom={props.showToSwap ? "12px" : "20px"}
      >
        <Stack direction={"row"} spacing={"4px"} justifyContent={"flex-start"}>
          <Box
            component={"p"}
            sx={(theme) => ({
              fontWeight: 400,
              fontSize: 12,
              color: theme.normal.text2,
              "& span": {
                color: theme.normal.text0,
              },
            })}
          >
            {t`Balance:`} <span>{props.showBalance} ATF</span>
          </Box>
          <LinkButton onClick={props.maxCallBack}>
            <Trans>MAX</Trans>
          </LinkButton>
        </Stack>

        <Stack
          direction={"row"}
          justifyContent={"flex-end"}
          alignItems={"center"}
          spacing={"4px"}
          sx={{
            "& svg": {
              width: 12,
              height: 12,
              display: "block",
            },
          }}
          component={"button"}
          onClick={props.otherCallBack}
        >
          <LinkButton>
            <p>{props.hideSwapTitle || !checkSigned ? <></> : swapTitle}</p>
          </LinkButton>
          <LinkButton>
            {props.hideSwapTitle || !checkSigned ? (
              <></>
            ) : (
              <SwapExchangeSmall />
            )}
          </LinkButton>
        </Stack>
      </Stack>
      {props.showToSwap && account.address ? (
        <Stack
          direction={"row"}
          spacing={"4px"}
          justifyContent={"space-between"}
          sx={(theme) => ({
            width: "100%",
            paddingY: "4px",
            paddingX: "8px",
            borderRadius: "4px",
            background: theme.normal.danger_light_hover,
            color: theme.normal.danger,
            fontSize: 12,
            fontWeight: 400,

            marginBottom: "12px",
            "& svg": {
              width: "24px",
              height: "12px",
              display: "block",
              "& path": {
                fill: theme.normal.danger,
              },
            },
          })}
          alignItems={"center"}
          component={"button"}
          onClick={props.otherCallBack}
        >
          <Box textAlign={"left"}>{noNESTText}</Box>
          <NEXT />
        </Stack>
      ) : (
        <></>
      )}
    </Stack>
  );
};

export default ArithFiInput;
