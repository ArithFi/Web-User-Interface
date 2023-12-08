import { createContainer } from "unstated-next";
import { Theme } from "@mui/material/styles";
import { useMemo, useState } from "react";
import { whiteTheme, darkTheme } from "../themes/themes";

function useThemeBase() {
  /**
   * Local theme
   */
  const localThemeIsBlack = useMemo(() => {
    return localStorage.getItem("themeIsWhite") === "1";
  }, []);
  const defaultTheme = useMemo(() => {
    return localThemeIsBlack ? whiteTheme : darkTheme;
  }, [localThemeIsBlack]);
  /**
   * Theme
   */
  const [nowTheme, setNowTheme] = useState<Theme>(defaultTheme);
  /**
   * Change theme
   */
  const changeTheme = () => {
    setNowTheme(nowTheme === darkTheme ? whiteTheme : darkTheme);
    localStorage.setItem("themeIsWhite", nowTheme === darkTheme ? "0" : "1");
  };

  return { nowTheme, changeTheme };
}

const SetTheme = createContainer(useThemeBase);

function useTheme() {
  return SetTheme.useContainer();
}

export const SetThemeProvider = SetTheme.Provider;
export default useTheme;
