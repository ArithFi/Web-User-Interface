import { FC, useMemo, useState } from "react";
import Stack from "@mui/material/Stack";
import MainButton from "../../components/MainButton/MainButton";
import useFuturesNewOrder, {
  isForesNewOrder,
} from "../../hooks/useFuturesNewOrder";
import Box from "@mui/material/Box";
import Agree from "../../components/Agree/Agree";
import NormalInfo from "../../components/NormalInfo/NormalInfo";
import { FuturesPrice } from "./Futures";
import Modal from "@mui/material/Modal";
import TriggerRiskModal from "./Modal/LimitAndPriceModal";
import ErrorLabel from "../../components/ErrorLabel/ErrorLabel";
import { Trans, t } from "@lingui/macro";
import DepositModal from "../Share/Modal/DepositModal";
import SignModal from "../Share/Modal/SignModal";
import LinkButton from "../../components/MainButton/LinkButton";
import {
  NEXT,
  NetworkDownIcon,
  SwapExchangeSmall,
} from "../../components/icons";
import InputWithSymbol from "../../components/NormalInput/InputWidthSymbol";
import SelectListMenu from "../../components/SelectListMemu/SelectListMenu";
import SettingLeverModal from "./Modal/SettingLeverModal";
import StopLimitModal from "./Modal/StopLimitModal";
import AmountSlider from "./Components/AmountSlider";

interface FuturesNewOrderProps {
  price: FuturesPrice | undefined;
  tokenPair: string;
  updateList: () => void;
  forexOpen: boolean;
}

const FuturesNewOrder: FC<FuturesNewOrderProps> = ({ ...props }) => {
  const [showLeverModal, setShowLeverModal] = useState(false);
  const [showStopLimitModal, setShowStopLimitModal] = useState(false);
  const [stopIsLong, setStopIsLong] = useState(true);
  const {
    tabsValue,
    changeTabs,
    lever,
    setLever,
    limitAmount,
    setLimitAmount,
    isStop,
    setIsStop,
    tp,
    setTp,
    sl,
    setSl,
    showBalance,
    maxCallBack,
    showOpenPrice,
    showLiqPrice,
    showTriggerNotice,
    setShowTriggerNotice,
    triggerNoticeCallback,
    inputAmount,
    setInputAmount,
    showAmountError,
    stopErrorText,
    closeShareLink,
    showDeposit,
    setShowDeposit,
    showSignModal,
    setShowSignModal,
    isTPError,
    isSLError,
    openCallBack,
    clearTPSLError,
    showDepositError,
    showConnectModal,
    showConnectButton,
    amountPercent,
    amountPercentCallBack,
    loading,
    limitModalPrice,
  } = useFuturesNewOrder(props.price, props.tokenPair, props.updateList);

  const modals = useMemo(() => {
    return (
      <>
        <Modal
          open={showTriggerNotice !== undefined}
          onClose={() => setShowTriggerNotice(undefined)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              "& .ModalLeftButton": { width: "20px !important" },
              " & .ModalTitle": { textAlign: "center !important" },
            }}
          >
            <TriggerRiskModal
              onClose={() => setShowTriggerNotice(undefined)}
              callBack={() => triggerNoticeCallback(showTriggerNotice)}
            />
          </Box>
        </Modal>

        <SignModal
          open={showSignModal}
          onClose={() => setShowSignModal(false)}
        />

        <SettingLeverModal
          value={lever}
          changeValue={(value: number) => setLever(value)}
          open={showLeverModal}
          onClose={() => setShowLeverModal(false)}
          product={props.tokenPair}
        />

        <StopLimitModal
          open={showStopLimitModal}
          onClose={() => {
            setShowStopLimitModal(false);
            clearTPSLError();
          }}
          callBack={(tp: number, sl: number) => {
            if (!isStop) {
              setIsStop(true);
            }
            setTp(tp.floor(7));
            setSl(sl.floor(7));
          }}
          lever={lever}
          baseAmount={inputAmount === "" ? 0 : Number(inputAmount)}
          limitPrice={
            limitModalPrice === String().placeHolder || limitModalPrice === ""
              ? 0
              : Number(limitModalPrice)
          }
          token={props.tokenPair}
          tpNow={Number(tp)}
          slNow={Number(sl)}
          isLong={stopIsLong}
          changeIsLong={(value: boolean) => setStopIsLong(value)}
          pt0={0}
          pt1={0}
        />
      </>
    );
  }, [
    clearTPSLError,
    inputAmount,
    isStop,
    lever,
    limitModalPrice,
    props.tokenPair,
    setIsStop,
    setLever,
    setShowSignModal,
    setShowTriggerNotice,
    setSl,
    setTp,
    showLeverModal,
    showSignModal,
    showStopLimitModal,
    showTriggerNotice,
    sl,
    stopIsLong,
    tp,
    triggerNoticeCallback,
  ]);
  const depositModal = useMemo(() => {
    return showDeposit ? (
      <DepositModal open={true} onClose={() => setShowDeposit(false)} />
    ) : (
      <></>
    );
  }, [setShowDeposit, showDeposit]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openTypeList = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const typeAndLever = useMemo(() => {
    return (
      <Stack
        spacing={"4px"}
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Box
          aria-controls={"orderType-menu"}
          aria-haspopup="true"
          aria-expanded={"true"}
          width={"100%"}
          component={"button"}
          onClick={handleClick}
        >
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            sx={(theme) => ({
              paddingX: "16px",
              height: "36px",
              width: "100%",
              borderRadius: "4px",
              backgroundColor: theme.normal.bg1,
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "700",
              lineHeight: "20px",
              color: theme.normal.text0,
              "& svg": {
                display: "block",
                width: "8px",
                height: "8px",
                "& path": {
                  fill: theme.normal.text2,
                },
              },
            })}
          >
            <Box>{tabsValue === 0 ? t`Market` : t`Limit`}</Box>
            <NetworkDownIcon />
          </Stack>
        </Box>

        <SelectListMenu
          id="orderType-menu"
          anchorEl={anchorEl}
          open={openTypeList}
          onClose={handleClose}
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
                changeTabs(0);
                handleClose();
              }}
            >{t`Market`}</Box>
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
                changeTabs(1);
                handleClose();
              }}
            >{t`Limit`}</Box>
          </Stack>
        </SelectListMenu>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          sx={(theme) => ({
            paddingX: "16px",
            height: "36px",
            width: "100%",
            borderRadius: "4px",
            backgroundColor: theme.normal.bg1,
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "700",
            lineHeight: "20px",
            color: theme.normal.text0,
            "& svg": {
              display: "block",
              width: "8px",
              height: "8px",
              "& path": {
                fill: theme.normal.text2,
              },
            },
          })}
          component={"button"}
          onClick={() => {
            if (!isForesNewOrder(props.tokenPair)) {
              setShowLeverModal(true);
            }
          }}
        >
          <Box>{lever}X</Box>
          {!isForesNewOrder(props.tokenPair) ? <NetworkDownIcon /> : <></>}
        </Stack>
      </Stack>
    );
  }, [anchorEl, changeTabs, lever, openTypeList, props.tokenPair, tabsValue]);
  const balanceAndDeposit = useMemo(() => {
    return (
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Stack direction={"row"} spacing={"4px"} justifyContent={"flex-start"}>
          <Box
            component={"p"}
            sx={(theme) => ({
              fontWeight: 400,
              fontSize: 12,
              color: theme.normal.text2,
              "& span": {
                color: theme.normal.text0,
              },
            })}
          >
            {t`Balance:`} <span>{showBalance} ATF</span>
          </Box>
          <LinkButton onClick={maxCallBack}>
            <Trans>MAX</Trans>
          </LinkButton>
        </Stack>

        <Stack
          direction={"row"}
          justifyContent={"flex-end"}
          alignItems={"center"}
          spacing={"4px"}
          sx={{
            "& svg": {
              width: 12,
              height: 12,
              display: "block",
            },
          }}
          component={"button"}
          onClick={() => setShowDeposit(true)}
        >
          <LinkButton sx={{ fontSize: "12px" }}>
            <p>{t`Deposit`}</p>
          </LinkButton>
          <LinkButton>
            <SwapExchangeSmall />
          </LinkButton>
        </Stack>
      </Stack>
    );
  }, [maxCallBack, setShowDeposit, showBalance]);

  const noATF = useMemo(() => {
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
          color: theme.normal.danger,
          fontSize: 12,
          fontWeight: 400,
          cursor: "pointer",
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
        component={"button"}
        onClick={() => setShowDeposit(true)}
      >
        <Box
          textAlign={"left"}
        >{t`Insufficient balance. Please deposit to start the lightning trade.`}</Box>
        <NEXT />
      </Stack>
    );
  }, [setShowDeposit]);

  const stopPrice = useMemo(() => {
    return (
      <Stack spacing={"12px"} width={"100%"}>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Stack direction={"row"} alignItems={"center"}>
            <Agree
              value={isStop}
              changeValue={(value: boolean) => {
                setTp("");
                setSl("");
                setIsStop(value);
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
                setTp("");
                setSl("");
                setIsStop(!isStop);
              }}
            >
              <Trans>Stop-Limit</Trans>
            </Box>
          </Stack>
          <LinkButton
            sx={{ fontSize: "12px" }}
            onClick={() => setShowStopLimitModal(true)}
          >{t`Advanced`}</LinkButton>
        </Stack>
        {isStop ? (
          <Stack spacing={"12px"}>
            <Stack
              direction={"row"}
              spacing={"12px"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <InputWithSymbol
                placeholder={t`Take Profit`}
                value={tp}
                symbol={""}
                changeValue={(value: string) => {
                  setTp(value.formatInputNum7());
                  clearTPSLError();
                }}
                isError={isTPError}
              />
              <InputWithSymbol
                placeholder={t`Stop Loss`}
                value={sl}
                symbol={""}
                changeValue={(value: string) => {
                  setSl(value.formatInputNum7());
                  clearTPSLError();
                }}
                isError={isSLError}
              />
            </Stack>
            {isTPError || isSLError ? (
              <ErrorLabel title={stopErrorText} />
            ) : (
              <></>
            )}
          </Stack>
        ) : (
          <></>
        )}
      </Stack>
    );
  }, [
    clearTPSLError,
    isSLError,
    isStop,
    isTPError,
    setIsStop,
    setSl,
    setTp,
    sl,
    stopErrorText,
    tp,
  ]);

  const info = useMemo(() => {
    return (
      <Stack spacing={"8px"} width={"100%"}>
        {tabsValue === 0 ? (
          <NormalInfo
            title={t`Entry Price`}
            value={showOpenPrice}
            symbol={""}
          />
        ) : (
          <></>
        )}
      </Stack>
    );
  }, [showOpenPrice, tabsValue]);

  const marketClosedButton = useMemo(() => {
    return (
      <MainButton
        title={t`Market Closed`}
        onClick={() => {}}
        style={{
          height: "48px",
          fontSize: "16px",
        }}
        disable={true}
      />
    );
  }, []);

  const openButtons = useMemo(() => {
    return (
      <Stack
        direction={"row"}
        spacing={"12px"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Box
          sx={(theme) => ({
            width: "100%",
            height: "48px",
            borderRadius: "12px",
            fontSize: "16px",
            fontWeight: "700",
            lineHeight: "22px",
            color: theme.normal.highLight,
            backgroundColor: theme.normal.success,
            cursor: "pointer",
            "&:hover": {
              backgroundColor: theme.normal.success_hover,
            },
            "&:active": {
              backgroundColor: theme.normal.success_active,
            },
            "&:disabled": {
              backgroundColor: theme.normal.disabled_bg,
              color: theme.normal.disabled_text,
            },
          })}
          component={"button"}
          disabled={loading}
          onClick={() => openCallBack(true)}
        >{t`Open Long`}</Box>
        <Box
          sx={(theme) => ({
            width: "100%",
            height: "48px",
            borderRadius: "12px",
            fontSize: "16px",
            fontWeight: "700",
            lineHeight: "22px",
            color: theme.normal.highLight,
            backgroundColor: theme.normal.danger,
            cursor: "pointer",
            "&:hover": {
              backgroundColor: theme.normal.danger_hover,
            },
            "&:active": {
              backgroundColor: theme.normal.danger_active,
            },
            "&:disabled": {
              backgroundColor: theme.normal.disabled_bg,
              color: theme.normal.disabled_text,
            },
          })}
          component={"button"}
          disabled={loading}
          onClick={() => openCallBack(false)}
        >{t`Open Short`}</Box>
      </Stack>
    );
  }, [loading, openCallBack]);

  const connectButton = useMemo(() => {
    return (
      <MainButton
        title={t`Connect Wallet`}
        onClick={showConnectModal}
        style={{
          height: "48px",
          fontSize: "16px",
        }}
      />
    );
  }, [showConnectModal]);

  const liqPrice = useMemo(() => {
    return (
      <Stack
        direction={"row"}
        spacing={"12px"}
        justifyContent={"space-between"}
        alignItems={"center"}
        sx={{
          fontSize: "14px",
          fontWeight: "400",
          lineHeight: "20px",
        }}
      >
        <Stack
          direction={"row"}
          spacing={"8px"}
          justifyContent={"flex-start"}
          alignItems={"center"}
        >
          <Box
            sx={(theme) => ({ color: theme.normal.text2 })}
          >{t`Liq Price`}</Box>
          <Box sx={(theme) => ({ color: theme.normal.text0 })}>
            {showLiqPrice(true)}
          </Box>
        </Stack>
        <Stack
          direction={"row"}
          spacing={"8px"}
          justifyContent={"flex-end"}
          alignItems={"center"}
        >
          <Box
            sx={(theme) => ({ color: theme.normal.text2 })}
          >{t`Liq Price`}</Box>
          <Box sx={(theme) => ({ color: theme.normal.text0 })}>
            {showLiqPrice(false)}
          </Box>
        </Stack>
      </Stack>
    );
  }, [showLiqPrice]);
  return (
    <Stack
      spacing={["16px", "16px", "24px"]}
      sx={(theme) => ({
        borderBottom: ["none", "none", `1px solid ${theme.normal.border}`],
        width: ["100%", "100%", "100%", "100%", "450px"],
        paddingY: ["16px", "16px", "32px"],
        paddingX: ["16px", "16px", "20px"],
        backgroundColor: theme.normal.bg0,
      })}
    >
      {modals}
      {depositModal}

      {typeAndLever}

      <Stack spacing={"24px"} width={"100%"}>
        <Stack spacing={"12px"} width={"100%"}>
          {balanceAndDeposit}
          {showDepositError ? noATF : <></>}
          <InputWithSymbol
            placeholder={tabsValue === 0 ? t`Market Price` : t`Limit Price`}
            value={tabsValue === 1 ? limitAmount : ""}
            dis={tabsValue === 0}
            symbol={""}
            changeValue={(value: string) => {
              setLimitAmount(value.formatInputNum7());
            }}
          />
          <InputWithSymbol
            placeholder={t`Amount`}
            value={inputAmount}
            symbol={"ATF"}
            changeValue={(value: string) => {
              setInputAmount(value.formatInputNum4());
              closeShareLink();
            }}
            isError={showAmountError !== undefined}
          />
          {showAmountError ? <ErrorLabel title={showAmountError} /> : <></>}
          <AmountSlider
            value={amountPercent}
            changeValue={amountPercentCallBack}
          />
        </Stack>
        {stopPrice}
      </Stack>
      {showConnectButton ? <></> : info}
      <Stack spacing={"12px"} width={"100%"}>
        {showConnectButton
          ? connectButton
          : !isForesNewOrder(props.tokenPair) ||
            (isForesNewOrder(props.tokenPair) && props.forexOpen)
          ? openButtons
          : marketClosedButton}
        {showConnectButton ? <></> : liqPrice}
      </Stack>
    </Stack>
  );
};

export default FuturesNewOrder;
