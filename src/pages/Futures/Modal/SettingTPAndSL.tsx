import Stack from "@mui/material/Stack";
import { FC, useCallback } from "react";
import MainButton from "../../../components/MainButton/MainButton";
import Agree from "../../../components/Agree/Agree";
import Box from "@mui/material/Box";
import { Trans, t } from "@lingui/macro";
import useSettingTPAndSL from "../hooks/useSettingTPAndSL";
import InputWithSymbol, {
  InputWithSymbolWithSelect,
} from "../../../components/NormalInput/InputWidthSymbol";
import ErrorLabel from "../../../components/ErrorLabel/ErrorLabel";
import ArithFiLine from "../../../components/ArithFiLine";
import NormalInfo from "../../../components/NormalInfo/NormalInfo";

interface SettingTPAndSLProps {
  token: string;
  baseAmount: number;
  isLong: boolean;
  lever: number;
  limitPrice: number;
  callBack: (tp: number, sl: number) => void;
  openPrice: number;
  pt0: number | null,
  pt1: number | null,
  isFirst?: boolean;
  append?: number;
  tpNow?: number;
  slNow?: number;
  isLimitOrder?: boolean;
  latestPrice?: number;
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
    tpError,
    slError,
    buttonDis,
    buttonAction,
    setTPPercent,
    setSLPercent,
    showTPInfoATF,
    showSLInfoATF,
    setTPNum,
    setSLNum,
    showPosition,
    showOpenPrice,
    showLiqPrice,
    tlPlaceHolder,
    slPlaceHolder,
    tpPercentType,
    slPercentType,
    setTpPercentType,
    setSlPercentType,
  } = useSettingTPAndSL(
    props.token,
    props.baseAmount,
    props.isLong,
    props.lever,
    props.limitPrice,
    props.callBack,
    props.openPrice,
    props.pt0,
    props.pt1,
    props.isFirst,
    props.append,
    props.tpNow,
    props.slNow,
    props.isLimitOrder,
    props.latestPrice
  );

  const getInfo = useCallback((isLong: boolean, U?: string, ATF?: number) => {
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
          {U ? U.toString() : "--"}
        </Box>
        , {t`it will trigger Market order, and the estimated PNL will be` + " "}
        <Box
          component={"span"}
          sx={(theme) => ({
            color: (ATF ?? 0) >= 0 ? theme.normal.success : theme.normal.danger,
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

        {showTP ? (
          <>
            <Stack
              direction={"row"}
              spacing={"10px"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Box width={"70%"}>
                <InputWithSymbol
                  placeholder={tlPlaceHolder}
                  value={tp}
                  symbol={""}
                  changeValue={(value: string) => {
                    setTp(value === "" ? "" : value.formatInputNum7());
                    setTPPercent(value.formatInputNum4());
                  }}
                  isError={tpError}
                />
              </Box>
              <Box width={"30%"}>
                <InputWithSymbolWithSelect
                  placeholder={[t`ROI`, t`Offset`]}
                  selected={tpPercentType}
                  value={tpPercent}
                  symbol={"%"}
                  changeValue={(value: string) => {
                    setTpPercent(value.formatInputNum4());
                    setTPNum(value.formatInputNum7());
                  }}
                  changeSelected={(value: number) => {
                    setTpPercentType(value);
                    setTp("");
                    setTpPercent("");
                  }}
                  isError={tpError}
                />
              </Box>
            </Stack>

            {tpError ? <ErrorLabel title={showTPError} /> : <></>}

            {getInfo(props.isLong, showTPInfoPrice, showTPInfoATF)}
          </>
        ) : (
          <></>
        )}
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

        {showSL ? (
          <>
            <Stack
              direction={"row"}
              spacing={"10px"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Box width={"70%"}>
                <InputWithSymbol
                  placeholder={slPlaceHolder}
                  value={sl}
                  symbol={""}
                  changeValue={(value: string) => {
                    setSl(value === "" ? "" : value.formatInputNum7());
                    setSLPercent(value.formatInputNum4());
                  }}
                  isError={slError}
                />
              </Box>
              <Box width={"30%"}>
                <InputWithSymbolWithSelect
                  placeholder={[t`ROI`, t`Offset`]}
                  selected={slPercentType}
                  value={slPercent}
                  symbol={"%"}
                  changeValue={(value: string) => {
                    setSlPercent(value.formatInputNum4());
                    setSLNum(value.formatInputNum7());
                  }}
                  changeSelected={(value: number) => {
                    setSlPercentType(value);
                    setSl("");
                    setSlPercent("");
                  }}
                  isError={slError}
                />
              </Box>
            </Stack>

            {slError ? <ErrorLabel title={showSLError} /> : <></>}

            {getInfo(!props.isLong, showSLInfoPrice, showSLInfoATF)}
          </>
        ) : (
          <></>
        )}
      </Stack>

      {!props.isFirst ? (
        <Stack spacing={"24px"}>
          <ArithFiLine />
          <Stack spacing={"8px"}>
            <NormalInfo title={t`Position`} value={""} symbol={showPosition} />
            <NormalInfo
              title={t`Open Price`}
              value={showOpenPrice}
              symbol={""}
            />
            <NormalInfo title={t`Liq Price`} value={showLiqPrice} symbol={""} />
          </Stack>
        </Stack>
      ) : (
        <></>
      )}

      <MainButton
        title={"Confirm"}
        disable={buttonDis}
        onClick={buttonAction}
        style={{ height: "40px", fontSize: "14px" }}
      />
    </Stack>
  );
};

export default SettingTPAndSL;
