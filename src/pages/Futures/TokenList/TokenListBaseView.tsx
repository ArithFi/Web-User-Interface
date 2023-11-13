import Stack from "@mui/material/Stack";
import { FC, useMemo, useState } from "react";
import ArithFiLine from "../../../components/ArithFiLine";
import Box from "@mui/material/Box";
import { t } from "@lingui/macro";
import OneIconWithString from "../../../components/IconWithString/OneIconWithString";

const TokenListBaseView: FC = () => {
  const [tabsValue, setTabsValue] = useState(0);
  const TabsView = useMemo(() => {
    return (
      <Stack direction={"row"} spacing={"8px"}>
        <TokenListBaseViewTabItem
          text={t`Favorites`}
          num={0}
          callBack={() => setTabsValue(0)}
          isSelected={tabsValue === 0}
        />
        <TokenListBaseViewTabItem
          text={t`All`}
          num={10}
          callBack={() => setTabsValue(1)}
          isSelected={tabsValue === 1}
        />
        <TokenListBaseViewTabItem
          text={t`Crypto`}
          num={5}
          callBack={() => setTabsValue(2)}
          isSelected={tabsValue === 2}
        />
        <TokenListBaseViewTabItem
          text={t`Fores`}
          num={8}
          callBack={() => setTabsValue(3)}
          isSelected={tabsValue === 3}
        />
      </Stack>
    );
  }, [tabsValue]);
  const ListView = useMemo(() => {
    return (
      <Stack>
        <TokenListBaseViewListItem
          tokenName={"BTC"}
          price={34567.56}
          percent={-10.45}
          onClick={() => {}}
          isSelected
        />
        <TokenListBaseViewListItem
          tokenName={"ETH"}
          price={1567.56}
          percent={10.45}
          onClick={() => {}}
        />
        <TokenListBaseViewListItem
          tokenName={"BTC"}
          price={34567.56}
          percent={-10.45}
          onClick={() => {}}
          isSelected
        />
        <TokenListBaseViewListItem
          tokenName={"BTC"}
          price={34567.56}
          percent={-10.45}
          onClick={() => {}}
          isSelected
        />
        <TokenListBaseViewListItem
          tokenName={"BTC"}
          price={34567.56}
          percent={-10.45}
          onClick={() => {}}
          isSelected
        />
        <TokenListBaseViewListItem
          tokenName={"BTC"}
          price={34567.56}
          percent={-10.45}
          onClick={() => {}}
          isSelected
        />
      </Stack>
    );
  }, []);
  return (
    <Stack spacing={"8px"} width={"100%"}>
      {TabsView}
      <ArithFiLine />
      {ListView}
    </Stack>
  );
};

interface TokenListBaseViewListItemProps {
  tokenName: string;
  price: number;
  percent: number;
  onClick: () => void;
  isSelected?: boolean;
}

const TokenListBaseViewListItem: FC<TokenListBaseViewListItemProps> = ({
  ...props
}) => {
  const Icon = props.isSelected ? FavIcon1 : FavIcon0;
  const TokenIcon = useMemo(() => {
    const token = props.tokenName.getToken();
    if (token) {
      return token.icon;
    } else {
      return "ETH".getToken()!.icon;
    }
  }, [props.tokenName]);
  return (
    <Stack>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        width={"100%"}
        height={"62px"}
        sx={(theme) => ({
            cursor: "pointer",
            paddingX: "20px",
            "&:hover": {
                backgroundColor: theme.normal.bg1
            }
          })}
      >
        <Stack direction={"row"} spacing={"16px"} alignItems={"center"}>
          <Box
            sx={{
              width: "16px",
              height: "16px",
              "& svg": {
                width: "16px",
                height: "16px",
                display: "block",
              },
            }}
          >
            {Icon}
          </Box>
          <Stack spacing={"8px"} direction={"row"} alignItems={"center"}>
            <Box
              sx={{
                width: "24px",
                height: "24px",
                "& svg": {
                  width: "24px",
                  height: "24px",
                  display: "block",
                },
              }}
            >
              <TokenIcon />
            </Box>
            <Box
              sx={(theme) => ({
                fontSize: "16px",
                fontWeight: "700",
                lineHeight: "22px",
                color: theme.normal.text0,
              })}
            >
              {props.tokenName}/USDT
            </Box>
          </Stack>
        </Stack>
        <Stack spacing={"4px"} alignItems={"right"}>
          <Box
            sx={(theme) => ({
              fontWeight: "700",
              fontSize: "14px",
              lineHeight: "20px",
              color:
                props.percent >= 0 ? theme.normal.success : theme.normal.danger,
            })}
          >
            {props.price}
          </Box>
          <Box
            sx={(theme) => ({
              fontWeight: "400",
              fontSize: "10px",
              lineHeight: "14px",
              textAlign: "right",
              color:
                props.percent >= 0 ? theme.normal.success : theme.normal.danger,
            })}
          >
            {props.percent}%
          </Box>
        </Stack>
      </Stack>
      <ArithFiLine />
    </Stack>
  );
};

interface TokenListBaseViewTabItemProps {
  text: string;
  num: number;
  callBack: () => void;
  isSelected?: boolean;
}

const TokenListBaseViewTabItem: FC<TokenListBaseViewTabItemProps> = ({
  ...props
}) => {
  return (
    <Box
      sx={(theme) => ({
        padding: "6px 8px",
        borderRadius: "8px",
        fontSize: "14px",
        fontWeight: "400",
        lineHeight: "20px",
        border: `1px solid ${theme.normal.border}`,
        color: props.isSelected ? theme.normal.primary : theme.normal.text0,
        backgroundColor: props.isSelected
          ? theme.normal.primary_light_hover
          : "none",
        cursor: "pointer",
      })}
      component={"button"}
      onClick={() => props.callBack()}
    >
      {props.text}
      {props.num === 0 ? "" : `(${props.num})`}
    </Box>
  );
};

const FavIcon0 = (
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M23.9935 3.00001C24.755 2.99805 25.4516 3.42873 25.7902 4.11087L31.517 15.6497L44.2886 17.512C45.0409 17.6217 45.666 18.1485 45.9016 18.8713C46.1372 19.5941 45.9426 20.388 45.3994 20.92L36.1098 30.0178L38.3157 42.6561C38.4471 43.4091 38.1378 44.1712 37.5188 44.6196C36.8998 45.0681 36.0793 45.1245 35.4047 44.765L23.9988 38.6856L12.5953 44.7649C11.9204 45.1247 11.0993 45.0681 10.4802 44.619C9.86101 44.1699 9.55222 43.407 9.68468 42.6536L11.9065 30.0177L2.60192 20.9212C2.05787 20.3893 1.86273 19.5948 2.09849 18.8714C2.33425 18.148 2.96006 17.621 3.71305 17.5118L16.554 15.6498L22.2026 4.12009C22.5377 3.43622 23.232 3.00196 23.9935 3.00001ZM24.0103 9.5222L19.6817 18.3575C19.3911 18.9507 18.8264 19.3621 18.1727 19.4569L8.29161 20.8897L15.4571 27.895C15.9292 28.3565 16.1431 29.0212 16.0287 29.6715L14.3349 39.3046L23.0578 34.6543C23.6458 34.3409 24.3513 34.3408 24.9394 34.6542L33.6708 39.3081L31.9884 29.669C31.8752 29.0201 32.0887 28.3571 32.5593 27.8962L39.7158 20.8875L29.9028 19.4567C29.2533 19.362 28.6916 18.9546 28.3999 18.3667L24.0103 9.5222Z"
      fill="#333333"
    />
  </svg>
);

const FavIcon1 = (
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M23.9987 5L17.8857 17.4776L4.00006 19.4911L14.059 29.3251L11.6545 43L23.9987 36.4192L36.3455 43L33.9587 29.3251L44.0001 19.4911L30.1914 17.4776L23.9987 5Z"
      fill="#EAAA00"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M23.9935 3.00001C24.755 2.99805 25.4516 3.42873 25.7902 4.11087L31.517 15.6497L44.2886 17.512C45.0409 17.6217 45.666 18.1485 45.9016 18.8713C46.1372 19.5941 45.9426 20.388 45.3994 20.92L36.1098 30.0178L38.3157 42.6561C38.4471 43.4091 38.1378 44.1712 37.5188 44.6196C36.8998 45.0681 36.0793 45.1245 35.4047 44.765L23.9988 38.6856L12.5953 44.7649C11.9204 45.1247 11.0993 45.0681 10.4802 44.619C9.86101 44.1699 9.55222 43.407 9.68468 42.6536L11.9065 30.0177L2.60192 20.9212C2.05787 20.3893 1.86273 19.5948 2.09849 18.8714C2.33425 18.148 2.96006 17.621 3.71305 17.5118L16.554 15.6498L22.2026 4.12009C22.5377 3.43622 23.232 3.00196 23.9935 3.00001ZM24.0103 9.5222L19.6817 18.3575C19.3911 18.9507 18.8264 19.3621 18.1727 19.4569L8.29161 20.8897L15.4571 27.895C15.9292 28.3565 16.1431 29.0212 16.0287 29.6715L14.3349 39.3046L23.0578 34.6543C23.6458 34.3409 24.3513 34.3408 24.9394 34.6542L33.6708 39.3081L31.9884 29.669C31.8752 29.0201 32.0887 28.3571 32.5593 27.8962L39.7158 20.8875L29.9028 19.4567C29.2533 19.362 28.6916 18.9546 28.3999 18.3667L24.0103 9.5222Z"
      fill="#EAAA00"
    />
  </svg>
);

export default TokenListBaseView;