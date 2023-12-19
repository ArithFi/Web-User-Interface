import { i18n } from "@lingui/core";
import { useMemo } from "react";

function useLanguageWithDoc() {
  const docLink = useMemo(() => {
    const locale = i18n.locale;
    if (locale === "en") {
      return "https://docs.arithfi.com/docs/blogs/Guide/how-to-trade";
    } else if (locale === "es") {
      return "https://docs.arithfi.com/es/docs/blogs/Guide/how-to-trade";
    } else if (locale === "ko") {
      return "https://docs.arithfi.com/ko/docs/blogs/Guide/how-to-trade";
    } else if (locale === "pt") {
      return "https://docs.arithfi.com/pt/docs/blogs/Guide/how-to-trade";
    } else if (locale === "vi") {
      return "https://docs.arithfi.com/vi/docs/blogs/Guide/how-to-trade";
    } else if (locale === "tr") {
      return "https://docs.arithfi.com/tr/docs/blogs/Guide/how-to-trade";
    } else if (locale === "ru") {
      return "https://docs.arithfi.com/ru/docs/blogs/Guide/how-to-trade";
    } else {
      return "https://docs.arithfi.com/docs/blogs/Guide/how-to-trade";
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
      return "https://docs.arithfi.com/docs/blogs/Guide/guildline";
    } else if (locale === "es") {
      return "https://docs.arithfi.com/es/docs/blogs/Guide/guildline";
    } else if (locale === "ko") {
      return "https://docs.arithfi.com/ko/docs/blogs/Guide/guildline";
    } else if (locale === "pt") {
      return "https://docs.arithfi.com/pt/docs/blogs/Guide/guildline";
    } else if (locale === "vi") {
      return "https://docs.arithfi.com/vi/docs/blogs/Guide/guildline";
    } else if (locale === "tr") {
      return "https://docs.arithfi.com/tr/docs/blogs/Guide/guildline";
    } else if (locale === "ru") {
      return "https://docs.arithfi.com/ru/docs/blogs/Guide/guildline";
    } else {
      return "https://docs.arithfi.com/docs/blogs/Guide/guildline";
    }
  }, []);

  return {
    docLink,
  };
}

export default useLanguageWithDoc;
