import { ThemeProvider } from "@mui/material/styles";
import { SnackbarProvider } from "notistack";
import { FC, useEffect } from "react";
import useArithFi, { ArithFiProvider } from "../hooks/useArithFi";
import useTheme, { SetThemeProvider } from "../hooks/useTheme";
import { PendingTransactionsProvider } from "../hooks/useTransactionReceipt";
import ConnectWalletModal from "../pages/Share/Modal/ConnectWalletModal";
import WalletProvider from "./client";
import { I18nProvider } from "@lingui/react";
import { i18n } from "@lingui/core";
import { defaultLocale, dynamicActivate } from "../locales/i18n";

export interface ProviderProps {
  children?: React.ReactNode;
}

const MainProvider: FC<ProviderProps> = ({ children }) => {
  return (
    <LanguageProvider>
      <SetThemeProvider>
        <ArithFiThemeProvider>
          <WalletProvider>
            <ArithFiProvider>
              <SnackbarProvider maxSnack={10}>
                <PendingTransactionsProvider>
                  <ConnectWallet />
                  {children}
                </PendingTransactionsProvider>
              </SnackbarProvider>
            </ArithFiProvider>
          </WalletProvider>
        </ArithFiThemeProvider>
      </SetThemeProvider>
    </LanguageProvider>
  );
};

const ConnectWallet: FC = () => {
  const { showConnect, setShowConnect } = useArithFi();

  return (
    <ConnectWalletModal
      open={showConnect}
      onClose={() => setShowConnect(false)}
    />
  );
};

const ArithFiThemeProvider: FC<ProviderProps> = ({ children }) => {
  const { nowTheme } = useTheme();
  return <ThemeProvider theme={nowTheme}>{children}</ThemeProvider>;
};

const LanguageProvider: FC<ProviderProps> = ({ children }) => {
  useEffect(() => {
    var cache = localStorage.getItem("Language");
    if (cache) {
      dynamicActivate(cache);
      return;
    }
    dynamicActivate(defaultLocale);
  }, []);
  return <I18nProvider i18n={i18n}>{children}</I18nProvider>;
};

export default MainProvider;
