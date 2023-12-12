import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { FC, useRef, useState } from "react";
import { NetworkDownIcon } from "../icons";
import SelectListMenu from "../SelectListMemu/SelectListMenu";

interface InputWithSymbolProps {
  placeholder: string;
  value: string;
  symbol: string;
  changeValue: (value: string) => void;
  isError?: boolean;
  dis?: boolean;
  border?: boolean;
}

const InputWithSymbol: FC<InputWithSymbolProps> = ({ ...props }) => {
  return (
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      sx={(theme) => ({
        border: `${props.dis ? "0px" : "1px"} solid ${
          props.isError ? theme.normal.danger : theme.normal.border
        }`,
        borderRadius: "8px",
        backgroundColor: props.dis
          ? theme.normal.disabled_fill
          : theme.normal.bg1,
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
        type={"number"}
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

interface InputWithSymbolWithSelectProps {
  placeholder: Array<string>;
  value: string;
  selected: number;
  symbol: string;
  changeValue: (value: string) => void;
  changeSelected: (value: number) => void;
  isError?: boolean;
  dis?: boolean;
}

export const InputWithSymbolWithSelect: FC<InputWithSymbolWithSelectProps> = ({
  ...props
}) => {
  const myElementRef:any = useRef(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const settingList = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(myElementRef.current);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  return (
    <>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        sx={(theme) => ({
          border: `${props.dis ? "0px" : "1px"} solid ${
            props.isError ? theme.normal.danger : theme.normal.border
          }`,
          borderRadius: "8px",
          backgroundColor: props.dis
            ? theme.normal.disabled_fill
            : theme.normal.bg1,
          width: "100%",
          height: "48px",
          paddingX: "12px",
          "&:hover": {
            border: `${props.dis ? "0px" : "1px"} solid ${
              props.isError ? theme.normal.danger : theme.normal.primary
            }`,
          },
        })}
        aria-controls={"settingList-menu"}
        aria-haspopup="true"
        aria-expanded={"true"}
        ref={myElementRef}
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
          type={"number"}
          placeholder={props.placeholder[props.selected]}
          value={props.value}
          maxLength={32}
          onChange={(e) => props.changeValue(e.target.value.formatInputNum())}
        />

        <Stack
          spacing={"4px"}
          direction={"row"}
          justifyContent={"flex-end"}
          alignItems={"center"}
        >
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
          <Box
            sx={(theme) => ({
              width: "8px",
              height: "8px",
              "& svg": {
                width: "8px",
                height: "8px",
                display: "block",
                "& path": {
                  fill: theme.normal.text3,
                },
              },
              cursor: "pointer",
            })}
            component={"button"}
            onClick={handleClick}
          >
            <NetworkDownIcon />
          </Box>
        </Stack>
      </Stack>
      <SelectListMenu
        id="settingList-menu"
        anchorEl={anchorEl}
        open={settingList}
        onClose={handleClose}
        sx={{
          "& .MuiPaper-root": {
            minWidth: "0px",
            width: `${myElementRef.current?.clientWidth}px`
          }
          
        }}
      >
        <Stack
          sx={(theme) => ({
            fontSize: "14px",
            fontWeight: "400",
            lineHeight: "20px",
          })}
        >
          <Box
            sx={(theme) => ({
              padding: "12px 16px",
              "&:hover": {
                backgroundColor: theme.normal.bg1,
              },
              cursor: "pointer",
              textAlign: "left",
              color: theme.normal.text0,
            })}
            component={"button"}
            onClick={() => {
              props.changeSelected(0);
              handleClose();
            }}
          >
            {props.placeholder[0]}
          </Box>
          <Box
            sx={(theme) => ({
              padding: "12px 16px",
              "&:hover": {
                backgroundColor: theme.normal.bg1,
              },
              cursor: "pointer",
              textAlign: "left",
              color: theme.normal.text0,
            })}
            component={"button"}
            onClick={() => {
              props.changeSelected(1);
              handleClose();
            }}
          >
            {props.placeholder[1]}
          </Box>
        </Stack>
      </SelectListMenu>
    </>
  );
};

export default InputWithSymbol;
