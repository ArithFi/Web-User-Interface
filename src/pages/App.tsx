import { FC, Suspense, lazy, useCallback, useEffect, useMemo } from "react";
import Stack from "@mui/material/Stack";
import ArithFiHead from "./Share/Head/ArithFiHead";
import ArithFiFoot from "./Share/Foot/ArithFiFoot";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { styled } from "@mui/material/styles";
import useWindowWidth from "../hooks/useWindowWidth";
import { KOLClick, KOLWallet } from "../lib/ArithFiRequest";
import {getQueryVariable} from "../lib/queryVaribale";
import {useAccount, useNetwork} from "wagmi";

const HomePage = lazy(() => import("./Home/Home"));
const FuturesPage = lazy(() => import("./Futures/Futures"));
const SwapPage = lazy(() => import("./Swap/Swap"));
const DashboardPage = lazy(() => import("./Dashboard/Dashboard"));
const AccountReferralPage = lazy(() => import("./Account/Referral/Referral"));
const AccountProfitSharingPage = lazy(() => import('./Account/ProfitSharing/ProfitSharing'));
const AccountAssetsPage = lazy(() => import("./Account/Assets/Assets"));
const AccountAssetsOverviewPage = lazy(() => import("./Account/Assets/Overview"));
const AccountCopyTradingPage = lazy(() => import("./Account/CopyTrading/CopyTrading"));
const AccountFuturesPage = lazy(() => import("./Account/Futures/Futures"));
const CopyPage = lazy(() => import("./Copy/Copy"));
const TraderPage = lazy(() => import("./Copy/Trader"));
const MyCopiesPage = lazy(() => import("./Copy/MyCopies"));
const TokenPage = lazy(() => import("./Token/Token"));
const App: FC = () => {
  const { headHeight, isBigMobile } = useWindowWidth();
  const { address } = useAccount();
  const { chain } = useNetwork();

  const handleInviteCode = useCallback(async () => {
    let inviteCode = getQueryVariable("a");
    if (!inviteCode) {
      const code = window.location.href.split("?a=")[1];
      if (code) {
        inviteCode = window.location.href
          .split("?a=")[1]
          .split("?position=")[0];
      }
    }

    if (inviteCode && address) {
      if (
        inviteCode.toLowerCase() === address.toLowerCase().slice(-8)
      ) {
        return;
      }
      // TODO
      fetch("https://db.arithfi.com/dashboardapi/users/users/saveInviteUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address: address,
          code: inviteCode.toLowerCase(),
          timestamp: new Date().getTime() / 1000,
        }),
      }).catch((e) => {
        console.log(e);
      });
    }
  }, [address]);

  useEffect(() => {
    handleInviteCode();
  }, [handleInviteCode]);
  // count KOL Link
  useEffect(() => {
    let code = getQueryVariable("pt");
    if (code) {
      KOLClick({ kolLink: window.location.href });
    }
  }, []);
  // count KOL Link with address
  useEffect(() => {
    let code = getQueryVariable("pt");
    if (code && address && chain?.id !== 97) {
      KOLWallet({ kolLink: window.location.href, wallet: address });
    }
  }, [address, chain?.id]);

  const MainContent = styled("div")(({ theme }) => {
    return {
      minHeight: isBigMobile
        ? `calc(100vh - ${headHeight}px)`
        : `calc(100vh - ${112 + headHeight}px)`,
      background: theme.normal.bg0,
    };
  });
  const swap = useMemo(() => {
    return <Route path="/swap" element={<SwapPage />} />;
  }, []);

  return (
    <Stack spacing={0}>
      <HashRouter>
        <ArithFiHead />
        <MainContent>
          <Suspense fallback={<></>}>
            <Routes>
              <Route path={"home"} element={<HomePage />} />
              <Route path={"token"} element={<TokenPage />} />
              <Route path="futures" element={<FuturesPage />} />
              {swap}
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="account">
                <Route path="assets" >
                  <Route path="overview" element={<AccountAssetsOverviewPage />} />
                  <Route path="" element={<AccountAssetsPage />} />
                </Route>
                <Route path="futures" element={<AccountFuturesPage />} />
                <Route path="copy" element={<AccountCopyTradingPage />} />
                <Route path="referral" element={<AccountReferralPage />} />
                <Route path="profitsharing" element={<AccountProfitSharingPage />} />
                <Route path="" element={<AccountAssetsPage />} />
              </Route>
              <Route path="copy" element={<CopyPage />} />
              <Route path="trader">
                <Route path=":address" element={<TraderPage />} />
              </Route>
              <Route path="myCopies" element={<MyCopiesPage />} />
              <Route path="*" element={<Navigate to="/home" />} />
            </Routes>
          </Suspense>
          {/* <TestTheme /> */}
        </MainContent>
        <ArithFiFoot />
      </HashRouter>
    </Stack>
  );
};

export default App;
