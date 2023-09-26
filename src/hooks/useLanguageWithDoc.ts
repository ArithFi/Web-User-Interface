import { i18n } from "@lingui/core";
import { useMemo } from "react";

function useLanguageWithDoc() {
  const docLink = useMemo(() => {
    const locale = i18n.locale;
    if (locale === "en") {
      return "https://docs.arithfi.com/blog/how-to-trade";
    } else if (locale === "es") {
      return "https://docs.arithfi.com/es/blog/how-to-trade";
    } else if (locale === "ko") {
      return "https://docs.arithfi.com/ko/blog/how-to-trade";
    } else if (locale === "pt") {
      return "https://docs.arithfi.com/pt/blog/how-to-trade";
    } else if (locale === "vi") {
      return "https://docs.arithfi.com/vi/blog/how-to-trade";
    } else if (locale === "tr") {
      return "https://docs.arithfi.com/tr/blog/how-to-trade";
    } else if (locale === "ru") {
      return "https://docs.arithfi.com/ru/blog/how-to-trade";
    } else {
      return "https://docs.arithfi.com/blog/how-to-trade";
    }
  }, []);

  return {
    docLink,
  };
}
export function useLanguageWithCopyDoc() {
  const docLink = useMemo(() => {
    const locale = i18n.locale;
    if (locale === "en") {
      return "https://docs.arithfi.com/blog/guildline";
    } else if (locale === "es") {
      return "https://docs.arithfi.com/es/blog/guildline";
    } else if (locale === "ko") {
      return "https://docs.arithfi.com/ko/blog/guildline";
    } else if (locale === "pt") {
      return "https://docs.arithfi.com/pt/blog/guildline";
    } else if (locale === "vi") {
      return "https://docs.arithfi.com/vi/blog/guildline";
    } else if (locale === "tr") {
      return "https://docs.arithfi.com/tr/blog/guildline";
    } else if (locale === "ru") {
      return "https://docs.arithfi.com/ru/blog/guildline";
    } else {
      return "https://docs.arithfi.com/blog/guildline";
    }
  }, []);

  return {
    docLink,
  };
}

export default useLanguageWithDoc;
