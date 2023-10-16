import Slider from "@mui/material/Slider";
import { FC } from "react";

interface AmountSliderProps {
  value: number;
  changeValue: (value: number) => void;
}
const marks = [
  {
    value: 25,
    label: "",
  },
  {
    value: 50,
    label: "",
  },
  {
    value: 75,
    label: "",
  },
];
const AmountSlider: FC<AmountSliderProps> = ({ ...props }) => {
  function valuetext(value: number) {
    return `${value}`;
  }
  return (
    <Slider
      aria-label="Custom marks"
      defaultValue={0}
      max={100}
      min={0}
      step={1}
      marks={marks}
      value={props.value}
      getAriaValueText={valuetext}
      valueLabelDisplay="on"
      valueLabelFormat={(value: number) => `${value}%`}
      onChange={(e: any) => {
        props.changeValue(e.target.value);
      }}
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
        "& .MuiSlider-valueLabel": {
          backgroundColor: theme.normal.primary,
        },
        "& .MuiSlider-valueLabelLabel": {
          fontWeight: "700",
          fontSize: "14px",
          color: theme.normal.highDark,
        },
      })}
    />
  );
};

export default AmountSlider;
