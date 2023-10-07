import { FC } from "react";
import Tabs from "@mui/material/Tabs";
import { styled } from "@mui/material/styles";
import Tab from "@mui/material/Tab";

interface ArithFiTabsProps {
  value: number;
  className: string;
  datArray: JSX.Element[];
  height: number;
  space: number;
  selectCallBack: (value: number) => void;
  isFull?: boolean;
}

const ArithFiTabs: FC<ArithFiTabsProps> = ({ ...props }) => {
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    props.selectCallBack(newValue);
  };

  const ArithFiTabs = styled(Tabs)(({ theme }) => ({
    minHeight: props.height,
    width: props.isFull ? '100%' : 'auto',
    "& .MuiTabs-scroller .MuiTabs-flexContainer button": {
      color: theme.normal.text0,
      padding: 0,
      minWidth: 0,
      maxWidth: "none",
      textTransform: "none",
      width: props.isFull ? '50%' : 'auto',
      fontSize: 16,
      fontWeight: 700,
      "& p": {
        maxWidth: '150px',
        lineHeight: '16px !important'
      },
      "& svg": {
        width: 16,
        height: 16,
        display: "block",
        "& path": {
          fill: theme.normal.text0,
        },
      },
      "&:hover": {
        color: theme.normal.primary,
        "& svg path": {
          fill: theme.normal.primary,
        },
      },
    },
    "& .MuiTabs-scroller .MuiTabs-flexContainer button + button": {
      marginLeft: props.isFull ? '0px' : props.space,
    },
    "& .MuiTabs-scroller .MuiTabs-flexContainer .Mui-selected": {
      color: theme.normal.primary,
      "& svg path": {
        fill: theme.normal.primary,
      },
    },
    "& .MuiTabs-scroller .MuiTabs-indicator": {
      backgroundColor: theme.normal.primary,
    },
  }));

  const tabs = props.datArray.map((item, index) => (
    <Tab key={`${props.className} + ${index}`} label={item} />
  ));

  return (
    <ArithFiTabs value={props.value} onChange={handleChange} centered>
      {tabs}
    </ArithFiTabs>
  );
};

export default ArithFiTabs;
