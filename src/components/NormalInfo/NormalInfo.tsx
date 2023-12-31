import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { FC } from "react";
import { ArithFiTooltipFC } from "../ArithFiTooltip/ArithFiTooltip";

interface NormalInfoProps {
  title: string;
  value: string;
  symbol: string;
  help?: boolean;
  helpInfo?: JSX.Element;
  style?: React.CSSProperties;
}

const NormalInfo: FC<NormalInfoProps> = ({ ...props }) => {
  return (
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      style={props.style}
      height={"20px"}
      width={"100%"}
    >
      <Stack
        direction={"row"}
        justifyContent={"flex-start"}
        alignItems={"center"}
      >
        <Box
          component={"p"}
          sx={(theme) => ({
            fontSize: 14,
            fontWeight: 400,
            lineHeight: "20px",
            color: theme.normal.text2,
            marginRight: "4px",
          })}
        >
          {props.title}
        </Box>
        {props.help ? <ArithFiTooltipFC title={props.helpInfo}/> : <></>}
      </Stack>

      <Stack
        direction={"row"}
        justifyContent={"flex-end"}
        alignItems={"center"}
        spacing={"4px"}
      >
        <Box
          component={"p"}
          sx={(theme) => ({
            fontSize: 14,
            fontWeight: 400,
            lineHeight: "20px",
            color: theme.normal.text0,
          })}
        >
          {props.value}
        </Box>
        {props.symbol !== "" ? <Box
          component={"p"}
          sx={(theme) => ({
            fontSize: 14,
            fontWeight: 400,
            lineHeight: "20px",
            color: theme.normal.text0
          })}
        >
          {props.symbol}
        </Box> : <></>}
      </Stack>
    </Stack>
  );
};

export default NormalInfo;
