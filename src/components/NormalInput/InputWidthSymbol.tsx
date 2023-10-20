import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { FC } from "react";

interface InputWithSymbolProps {
  placeholder: string;
  value: string;
  symbol: string;
  changeValue: (value: string) => void;
  isError?: boolean;
  dis?: boolean;
}

const InputWithSymbol: FC<InputWithSymbolProps> = ({ ...props }) => {
  return (
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      sx={(theme) => ({
        border: `${props.dis ? "0px" : "1px"} solid ${
          props.isError ? theme.normal.danger : theme.normal.bg1
        }`,
        borderRadius: "8px",
        backgroundColor: props.dis ? theme.normal.disabled_fill : theme.normal.bg1,
        width: "100%",
        height: "48px",
        paddingX: "12px",
        "&:hover": {
          border: `${props.dis ? "0px" : "1px"} solid ${
            props.isError ? theme.normal.danger : theme.normal.primary
          }`,
        },
      })}
    >
      <Box
        sx={(theme) => ({
          fontSize: 16,
          fontWeight: 700,
          color: props.dis ? theme.normal.disabled_text : theme.normal.text0,
          width: "100%",
          height: "24px",
          "&::placeHolder": {
            color: theme.normal.text3,
          },
        })}
        disabled={props.dis}
        component={"input"}
        placeholder={props.placeholder}
        value={props.value}
        maxLength={32}
        onChange={(e) => props.changeValue(e.target.value.formatInputNum())}
      />

      <Box
        sx={(theme) => ({
          fontSize: 16,
          fontWeight: 400,
          color: theme.normal.text0,
          lineHeight: "22px",
        })}
      >
        {props.symbol}
      </Box>
    </Stack>
  );
};

export default InputWithSymbol;
