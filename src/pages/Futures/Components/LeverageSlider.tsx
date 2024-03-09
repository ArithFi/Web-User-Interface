import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Stack from "@mui/material/Stack";
import { FC } from "react";

interface LeverageSliderProps {
  value: number;
  changeValue: (value: number) => void;
  marks: {
    value: number;
    label: string;
  }[];
  maxValue: number;
  style?: React.CSSProperties;
}

const LeverageSlider: FC<LeverageSliderProps> = ({ ...props }) => {
  function valuetext(value: number) {
    return `${value}`;
  }
  return (
    <Stack width={"100%"} style={props.style}>
      {/* <Stack direction={"row"} justifyContent={"space-between"}>
        <Box
          component={"p"}
          sx={(theme) => ({
            fontSize: 14,
            fontWeight: 400,
            color: theme.normal.text2,
          })}
        >
          <Trans>Leverage</Trans>
        </Box>
        <Box
          component={"p"}
          sx={(theme) => ({
            fontSize: 14,
            fontWeight: 700,
            color: theme.normal.text0,
          })}
        >{`${props.value}X`}</Box>
      </Stack> */}
      <Box sx={{ display: "block", position: "relative" }}>
        <Box sx={{ paddingLeft: "5px", paddingRight: "8px" }}>
          <Slider
            aria-label="Custom marks"
            defaultValue={1}
            max={props.maxValue}
            min={1}
            getAriaValueText={valuetext}
            step={1}
            value={props.value}
            onChange={(e: any) => {
              props.changeValue(e.target.value);
            }}
            marks={props.marks}
            sx={(theme) => ({
              color: theme.normal.primary,
              "& .MuiSlider-rail": {
                background: theme.normal.bg3,
                opacity: 1,
              },
              "& .MuiSlider-track": {
                background: theme.normal.primary,
              },
              "& .MuiSlider-mark": {
                opacity: 1,
                width: "10px",
                height: "10px",
                background: theme.normal.bg0,
                border: `1px solid ${theme.normal.bg3}`,
                boxSizing: "border-box",
                borderRadius: "5px",
                marginLeft: "-4px",
                "&.MuiSlider-markActive": {
                  background: theme.normal.primary,
                },
              },
              "& .MuiSlider-thumb": {
                border: `2px solid ${theme.normal.primary}`,
                background: theme.normal.highLight,
                width: "12px",
                height: "12px",
                "&:before": {
                  boxShadow: "none",
                },
                "&:hover": {
                  boxShadow: "none",
                },
                "&:active": {
                  boxShadow: "none",
                },
                boxShadow: "none",
              },
              "& .MuiSlider-markLabel": {
                fontSize: 14,
                fontWeight: 400,
                color: theme.normal.text2,
              },
            })}
          />
        </Box>
      </Box>
    </Stack>
  );
};

export default LeverageSlider;
