import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { FC, useMemo } from "react";
import { Long, Share, Short } from "../../../components/icons";
import { Trans } from "@lingui/macro";

interface OrderListPositionProps {
  tokenPair: string;
  lever: number;
  isLong: boolean;
  shareCallBack: () => void;
  style?: React.CSSProperties;
  isCopy?: boolean;
  status?: number;
}

const OrderListPosition: FC<OrderListPositionProps> = ({ ...props }) => {
  const showCopy = useMemo(() => {
    return props.isCopy ? (
      <Box
        component={"button"}
        sx={(theme) => ({
          backgroundColor: theme.normal.primary_light_hover,
          borderRadius: "4px",
          height: "20px",
          paddingX: "4px",
          textAlign: "center",
          color: theme.normal.primary,
          fontWeight: 700,
          fontSize: 10,
        })}
      >
        <Trans>Copy</Trans>
      </Box>
    ) : (
      <></>
    );
  }, [props.isCopy]);
  const showResult = useMemo(() => {
    if (
      props.status != null &&
      (props.status === -1 || props.status === -2 || props.status === -3)
    ) {
      return (
        <Box
          component={"button"}
          sx={(theme) => ({
            fontWeight: 700,
            fontSize: "10px",
            lineHeight: "14px",
            paddingX: "4px",
            border: "1px solid",
            width: "fit-content",
            borderColor:
              props.status === -2 || props.status === -3
                ? theme.normal.success
                : theme.normal.danger,
            color:
              props.status === -2 || props.status === -3
                ? theme.normal.success
                : theme.normal.danger,
            borderRadius: "4px",
            whiteSpace: "nowrap",
          })}
        >
          {props.status === -1 && <Trans>Liquidated</Trans>}
          {props.status === -3 && <Trans>TP Executed</Trans>}
          {props.status === -2 && <Trans>SL Executed</Trans>}
        </Box>
      );
    } else {
      return <></>;
    }
  }, [props.status]);
  return (
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      style={props.style}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={"4px"}
        sx={() => ({
          height: "24px",
        })}
      >
        <Stack
          direction={"row"}
          justifyContent={"center"}
          spacing={"4px"}
          alignItems={"center"}
          sx={(theme) => ({
            height: "20px",
            fontSize: 10,
            fontWeight: 700,
            color: props.isLong ? theme.normal.success : theme.normal.danger,
            borderRadius: "4px",
            paddingX: "4px",
            background: props.isLong
              ? theme.normal.success_light_hover
              : theme.normal.danger_light_hover,
            "& svg": {
              width: "10px",
              height: "10px",
              display: "block",
              "& path": {
                fill: props.isLong ? theme.normal.success : theme.normal.danger,
              },
            },
          })}
        >
          {props.isLong ? <Long /> : <Short />}
          {props.isLong ? (
            <p>
              <Trans>Long</Trans>
            </p>
          ) : (
            <p>
              <Trans>Short</Trans>
            </p>
          )}
        </Stack>
        <Box
          component={"p"}
          sx={(theme) => ({
            fontWeight: 700,
            fontSize: 14,
            color: theme.normal.text0,
            marginLeft: "8px !important",
          })}
        >{`${props.tokenPair}`}</Box>
        <Box
          component={"button"}
          sx={(theme) => ({
            border: `1px solid ${theme.normal.border}`,
            borderRadius: "4px",
            height: "20px",
            paddingX: "4px",
            textAlign: "center",
            color: theme.normal.text2,
            fontWeight: 700,
            fontSize: 10,
          })}
        >{`${props.lever}X`}</Box>
        {showCopy}
        {showResult}
      </Stack>
      <Box
        component={"button"}
        sx={(theme) => ({
          width: "16px",
          height: "16px",
          "& svg": {
            width: "16px",
            height: "16px",
            display: "block",
            "& path": {
              fill: theme.normal.text2,
            },
          },
        })}
        onClick={props.shareCallBack}
      >
        <Share />
      </Box>
    </Stack>
  );
};

export default OrderListPosition;
