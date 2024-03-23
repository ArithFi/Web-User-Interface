import { Box, Stack } from "@mui/material";
import { FC, useMemo } from "react";
import { ArithFiTooltip } from "../../../components/ArithFiTooltip/ArithFiTooltip";

interface FuturesOrderListTitleAndValueProps {
  title: string;
  value: string;
  valueSize?: string;
  valueWeight?: string;
  isRed?: boolean;
  valueLineHeight?: string;
  help?: string;
  spacing?: string;
  alignItems?: string;
}

export const FuturesOrderListTitleAndValue: FC<
  FuturesOrderListTitleAndValueProps
> = ({ ...props }) => {
  const title = useMemo(() => {
    return (
      <Box
        component={"p"}
        sx={(theme) => ({
          fontSize: "10px",
          fontWeight: 400,
          lineHeight: "14px",
          color: theme.normal.text2,
          borderBottom: `${props.help ? "1px" : "0px"} solid ${
            theme.normal.text2
          }`,
        })}
      >
        {props.title}
      </Box>
    );
  }, [props.help, props.title]);

  return (
    <Stack
      spacing={props.spacing ?? "2px"}
      sx={{
        alignItems: props.alignItems ?? "flex-start",
      }}
    >
      {props.help ? (
        <ArithFiTooltip
          title={props.help}
          placement="top-start"
          arrow
          disableFocusListener
          enterTouchDelay={10}
        >
          {title}
        </ArithFiTooltip>
      ) : (
        title
      )}
      <Box
        component={"p"}
        sx={(theme) => {
          const valueColor = () => {
            if (props.isRed != null) {
              return props.isRed ? theme.normal.danger : theme.normal.success;
            } else {
              return theme.normal.text0;
            }
          };
          return {
            fontSize: props.valueSize ?? "12px",
            fontWeight: props.valueWeight ?? 400,
            lineHeight: props.valueLineHeight ?? "16px",
            color: valueColor(),
          };
        }}
      >
        {props.value}
      </Box>
    </Stack>
  );
};
