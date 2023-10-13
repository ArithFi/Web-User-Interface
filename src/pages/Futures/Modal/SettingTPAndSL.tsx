import Stack from "@mui/material/Stack";
import { FC, useCallback, useMemo } from "react";
import MainButton from "../../../components/MainButton/MainButton";
import Agree from "../../../components/Agree/Agree";
import Box from "@mui/material/Box";
import { Trans, t } from "@lingui/macro";
import useSettingTPAndSL from "../hooks/useSettingTPAndSL";
import InputWithSymbol from "../../../components/NormalInput/InputWidthSymbol";
import ErrorLabel from "../../../components/ErrorLabel/ErrorLabel";

interface SettingTPAndSLProps {
  isLong: boolean;
  isFirst?: boolean;
}

const SettingTPAndSL: FC<SettingTPAndSLProps> = ({ ...props }) => {
  const {
    showTP,
    setShowTP,
    showSL,
    setShowSL,
    tp,
    setTp,
    sl,
    setSl,
    tpPercent,
    setTpPercent,
    slPercent,
    setSlPercent,
    showTPError,
    showSLError,
    showTPInfoPrice,
    showSLInfoPrice,
  } = useSettingTPAndSL(props.isLong, props.isFirst);

  const getInfo = useCallback((isLong: boolean, U?: number, ATF?: number) => {
    return (
      <Box
        sx={(theme) => ({
          padding: "8px 12px",
          width: "100%",
          borderRadius: "8px",
          backgroundColor: theme.normal.bg1,
          fontWeight: "400",
          fontSize: "12px",
          lineHeight: "16px",
          color: theme.normal.text2,
        })}
      >
        {t`When Price reaches` + " "}
        <Box
          component={"span"}
          sx={(theme) => ({
            color: theme.normal.text0,
          })}
        >
          {U ? U.toString() : "--"}USDT
        </Box>
        , {t`it will trigger Market order, and the estimated PNL will be` + " "}
        <Box
          component={"span"}
          sx={(theme) => ({
            color: isLong ? theme.normal.success : theme.normal.danger,
          })}
        >
          {ATF ? ATF.toString() : "--"} ATF
        </Box>
        .
      </Box>
    );
  }, []);

  return (
    <Stack spacing={"24px"} sx={{ width: "100%" }}>
      <Stack spacing={"8px"}>
        <Stack direction={"row"} alignItems={"center"}>
          <Agree
            value={showTP}
            changeValue={(value: boolean) => {
              setShowTP(value);
            }}
          />{" "}
          <Box
            component={"button"}
            sx={(theme) => ({
              fontSize: 14,
              fontWeight: 400,
              marginLeft: "4px",
              color: theme.normal.text0,
            })}
            onClick={() => {
              setShowTP(!showTP);
            }}
          >
            <Trans>Take Profit</Trans>
          </Box>
        </Stack>

        <Stack
          direction={"row"}
          spacing={"10px"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Box width={"70%"}>
            <InputWithSymbol
              placeholder={""}
              value={tp}
              symbol={"USDT"}
              changeValue={(value: string) => {
                setTp(value.formatInputNum4());
              }}
              isError={false}
            />
          </Box>
          <Box width={"30%"}>
            <InputWithSymbol
              placeholder={"Gain"}
              value={tpPercent}
              symbol={"%"}
              changeValue={(value: string) => {
                setTpPercent(value.formatInputNum4());
              }}
              isError={false}
            />
          </Box>
        </Stack>

        <ErrorLabel title={showTPError} />

        {getInfo(props.isLong, showTPInfoPrice, 1)}
      </Stack>
      {/* sl */}
      <Stack spacing={"8px"}>
        <Stack direction={"row"} alignItems={"center"}>
          <Agree
            value={showSL}
            changeValue={(value: boolean) => {
              setShowSL(value);
            }}
          />{" "}
          <Box
            component={"button"}
            sx={(theme) => ({
              fontSize: 14,
              fontWeight: 400,
              marginLeft: "4px",
              color: theme.normal.text0,
            })}
            onClick={() => {
              setShowSL(!showSL);
            }}
          >
            <Trans>Stop Loss</Trans>
          </Box>
        </Stack>

        <Stack
          direction={"row"}
          spacing={"10px"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Box width={"70%"}>
            <InputWithSymbol
              placeholder={""}
              value={sl}
              symbol={"USDT"}
              changeValue={(value: string) => {
                setSl(value.formatInputNum4());
              }}
              isError={false}
            />
          </Box>
          <Box width={"30%"}>
            <InputWithSymbol
              placeholder={"Gain"}
              value={slPercent}
              symbol={"%"}
              changeValue={(value: string) => {
                setSlPercent(value.formatInputNum4());
              }}
              isError={false}
            />
          </Box>
        </Stack>

        <ErrorLabel title={showSLError} />

        {getInfo(!props.isLong, showSLInfoPrice, 1)}
      </Stack>

      <MainButton
        title={"Confirm"}
        onClick={() => {}}
        style={{ height: "40px", fontSize: "14px" }}
      />
    </Stack>
  );
};

export default SettingTPAndSL;
