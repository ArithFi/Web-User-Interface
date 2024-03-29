import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses, TooltipProps } from "@mui/material/Tooltip";
import { FC } from "react";
import { Tip } from "../icons";

export const ArithFiTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.normal.text0,
    color: theme.normal.bg0,
    fontSize: 14,
    fontWeight: 700,
    padding: "8px 12px",
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.normal.text0,
  },
}));

interface ArithFiTooltipFCProps {
  title: React.ReactNode;
}

export const ArithFiTooltipFC: FC<ArithFiTooltipFCProps> = ({ ...props }) => {
  return (
    <ArithFiTooltip
      title={props.title}
      placement="top-start"
      arrow
      disableFocusListener
      enterTouchDelay={10}
    >
      <Box
        component={"button"}
        sx={(theme) => ({
          display: "inline-flex",
          "& svg": {
            height: "14px",
            width: "14px",
            display: "block",
            "& path": {
              fill: theme.normal.text2,
            },
          },
          "&:hover": {
            cursor: "pointer",
          },
        })}
      >
        <Tip />
      </Box>
    </ArithFiTooltip>
  );
};

export default ArithFiTooltipFC;
