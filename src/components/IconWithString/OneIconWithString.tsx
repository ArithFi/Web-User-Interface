import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { Stack } from "@mui/system";
import { FC, useMemo } from "react";

interface OneIconWithStringProps {
  icon: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
  >;
  title: string;
  onClick: () => void;
  selected?: boolean;
}

const OneIconWithString: FC<OneIconWithStringProps> = ({ ...props }) => {
  const iconBox = useMemo(() => {
    const LeftIcon = props.icon;
    return (
      <Box
        sx={{
          width: "20px",
          height: "20px",
          "& svg": {
            width: "20px",
            height: "20px",
          },
        }}
      >
        <LeftIcon />
      </Box>
    );
  }, [props.icon]);
  const TitleP = styled("p")(({ theme }) => {
    return {
      height: 24,
      lineHeight: "24px",
      fontWeight: 400,
      fontSize: 18,
      color: props.selected ? theme.normal.primary : theme.normal.text0,
      "&:hover": {
        cursor: "pointer",
        color: theme.normal.primary,
      },
    };
  });
  return (
    <Stack
      direction={"row"}
      height={"24px"}
      justifyContent={"flex-start"}
      alignItems="center"
      spacing={"8px"}
      component={"button"}
      onClick={props.onClick}
    >
      {iconBox}

      <TitleP>{props.title}</TitleP>
    </Stack>
  );
};

export default OneIconWithString;
