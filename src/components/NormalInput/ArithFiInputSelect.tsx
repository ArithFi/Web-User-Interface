import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { FC, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import useArithFi from "../../hooks/useArithFi";
import { SelectToken } from "../../pages/Swap/Components/SwapInputItem";
import { NEXT, SelectedTokenDown, SwapExchangeSmall } from "../icons";
import OneIconWithString from "../IconWithString/OneIconWithString";
import LinkButton from "../MainButton/LinkButton";
import ArithFiLine from "../ArithFiLine";
import SelectListMenu from "../SelectListMemu/SelectListMenu";
import OneTokenIN from "../TokenIconAndName/OneTokenI&N";
import { Trans, t } from "@lingui/macro";

interface ArithFiInputSelectProps {
  tokenName: string;
  tokenArray: string[];
  selectToken: (tokenName: string) => void;
  error: boolean;
  showToSwap: boolean;
  showBalance: string;
  maxCallBack: () => void;
  arithFiAmount: string;
  changeArithFiAmount: (value: string) => void;
  balanceTitle?: string;
  isShare?: boolean;
  style?: React.CSSProperties;
}

const ArithFiInputSelect: FC<ArithFiInputSelectProps> = ({ ...props }) => {
  const { account } = useArithFi();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const tokenPairList = useMemo(() => {
    return props.tokenArray
      .map((item) => {
        const token = item.getToken();
        return { icon: token ? token.icon : "ETH".getToken()!.icon, title: token!.symbol };
      })
      .map((item, index) => {
        return (
          <Stack
            key={`SelectTokenList + ${index}`}
            direction={"row"}
            alignItems={"center"}
            sx={(theme) => ({
              height: "40px",
              paddingX: "20px",
              "&:hover": {
                background: theme.normal.bg1,
              },
              cursor: "pointer",
            })}
            onClick={() => {
              props.selectToken(item.title);
              handleClose();
            }}
          >
            <OneIconWithString
              icon={item.icon}
              title={item.title}
              selected={props.tokenName === item.title}
              onClick={() => {}}
            />
          </Stack>
        );
      });
  }, [props]);
  const noATFText = useMemo(() => {
    return t`0 balance. Before trading, you can switch to "Swap" to exchange
      between USDT and ATF token.`;
  }, []);
  const swapLink = useMemo(() => {
    return "/swap";
  }, []);
  const swapTitle = useMemo(() => {
    return t`Swap`;
  }, []);
  const showBottom = useMemo(() => {
    if (props.showToSwap) {
      return (
        <Stack
          direction={"row"}
          spacing={"4px"}
          justifyContent={"space-between"}
          sx={(theme) => ({
            width: "100%",
            paddingY: "4px",
            paddingX: "8px",
            borderRadius: "4px",
            background: theme.normal.danger_light_hover,
            "& a": {
              color: theme.normal.danger,
              fontSize: 12,
              fontWeight: 400,
            },

            marginBottom: "12px",
            "& svg": {
              width: "24px",
              height: "12px",
              display: "block",
              "& path": {
                fill: theme.normal.danger,
              },
            },
          })}
          alignItems={"center"}
        >
          <Link to={swapLink}>{noATFText}</Link>
          <Link to={swapLink}>
            <NEXT />
          </Link>
        </Stack>
      );
    }
    return <></>;
  }, [noATFText, props.showToSwap, swapLink]);
  return (
    <Stack
      justifyContent={"flex-start"}
      sx={(theme) => ({
        border: `1px solid ${
          account.address && props.error
            ? theme.normal.danger
            : theme.normal.border
        }`,
        borderRadius: "8px",
        background: props.isShare
          ? theme.normal.primary_light_hover
          : theme.normal.bg1,
        width: "100%",
        paddingTop: "12px",
        paddingX: "12px",
        "&:hover": {
          border: `1px solid ${
            account.address && props.error
              ? theme.normal.danger
              : theme.normal.primary
          }`,
        },
      })}
      style={props.style}
    >
      <Stack direction={"row"} justifyContent={"space-between"} height={"40px"}>
        <Box
          sx={(theme) => ({
            fontSize: 16,
            fontWeight: 700,
            color: theme.normal.text0,
            width: "100%",
            height: "40px",
            "&::placeHolder": {
              color: theme.normal.text3,
            },
          })}
          component={"input"}
          placeholder={t`Amount`}
          value={props.arithFiAmount}
          maxLength={32}
          onChange={(e) =>
            props.changeArithFiAmount(e.target.value.formatInputNum())
          }
          type={"number"}
        />
        <SelectToken
          direction={"row"}
          justifyContent={"flex-end"}
          aria-controls={"selectToken-menu"}
          aria-haspopup="true"
          aria-expanded={"true"}
          onClick={handleClick}
        >
          <OneTokenIN tokenName={props.tokenName} height={24} />
          <SelectedTokenDown className="SwapInputDown" />
        </SelectToken>
        <SelectListMenu
          id="selectToken-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <Stack>{tokenPairList}</Stack>
        </SelectListMenu>
      </Stack>
      <ArithFiLine style={{ marginTop: "12px", marginBottom: "12px" }} />
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        marginBottom={props.showToSwap ? "12px" : "20px"}
      >
        <Stack direction={"row"} spacing={"4px"} justifyContent={"flex-start"}>
          <Box
            component={"p"}
            sx={(theme) => ({
              fontWeight: 400,
              fontSize: 12,
              color: theme.normal.text2,
              lineHeight: "18px",
              "& span": {
                color: theme.normal.text0,
              },
            })}
          >
            {props.balanceTitle ? props.balanceTitle : t`Balance:`}{" "}
            <span>{`${props.showBalance} ${props.tokenName}`}</span>
          </Box>
          <LinkButton
            onClick={props.maxCallBack}
            sx={{ fontSize: "12px", lineHeight: "18px" }}
          >
            <Trans>MAX</Trans>
          </LinkButton>
        </Stack>
        {
          <LinkButton>
            <Link to={swapLink}>
              <Stack
                direction={"row"}
                justifyContent={"flex-end"}
                alignItems={"center"}
                spacing={"4px"}
                sx={{
                  "& p": {
                    fontSize: "12px",
                    lineHeight: "18px",
                  },
                  "& svg": {
                    width: 12,
                    height: 12,
                    display: "block",
                  },
                }}
              >
                <p>{swapTitle}</p>
                <SwapExchangeSmall />
              </Stack>
            </Link>
          </LinkButton>
        }
      </Stack>
      {showBottom}
    </Stack>
  );
};

export default ArithFiInputSelect;
