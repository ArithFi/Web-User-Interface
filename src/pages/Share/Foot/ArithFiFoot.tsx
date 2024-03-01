import Stack from "@mui/material/Stack";
import {styled} from "@mui/material/styles";
import {FC} from "react";
import {
  TelegramIcon,
  TwitterIcon,
  GithubIcon,
  MediumIcon,
  BNBTokenLogo,
} from "../../../components/icons";
import useArithFi from "../../../hooks/useArithFi";
import useWindowWidth from "../../../hooks/useWindowWidth";
import useTheme from "../../../hooks/useTheme";
import {t} from "@lingui/macro";

export const FootArray = [
  {icon: TelegramIcon, link: "https://t.me/ArithFi_Dao"},
  {icon: TwitterIcon, link: "https://twitter.com/ArithFi"},
  {icon: GithubIcon, link: "https://github.com/ArithFi"},
  {icon: MediumIcon, link: "https://medium.com/@ArithFi"},
  {icon: BNBTokenLogo, link: "https://testnet.bnbchain.org/faucet-smart"},
];

export const ArithFiFootStack = styled(Stack)(({theme}) => ({
  background: theme.normal.bg0,
  borderTop: `1px solid ${theme.normal.border}`,
  "& a": {
    "&:hover": {
      "& svg path": {
        fill: theme.normal.text0,
      },
    },
    "& svg": {
      width: 32,
      height: 32,
      "& path": {
        fill: theme.normal.text2,
      },
    },
  },
  padding: "60px 0 40px 0",
  alignItems: "center",
}));
export const FootAList = FootArray.map((item, index) => {
  const Icon = item.icon;
  return (
    <a key={`FootLink + ${index}`} href={`${item.link}`} target={"blank"}>
      <Icon/>
    </a>
  );
});
const ArithFiFoot: FC = () => {
  const {isBigMobile} = useWindowWidth();
  const {chainsData} = useArithFi();
  const {nowTheme} = useTheme();

  const foot = () => {
    return isBigMobile ? (
      <></>
    ) : (
      <ArithFiFootStack>
        <Stack
          direction="row"
          justifyContent="space-around"
          alignItems="center"
          spacing={"24px"}
          paddingBottom={"40px"}
          width={"100%"}
          maxWidth={"1200px"}
        >
          <Stack spacing={"48px"}>
            <Stack>
              {
                nowTheme.isLight ? (
                  <svg width="187" height="48" viewBox="0 0 140 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 36C27.9411 36 36 27.9411 36 18C36 8.05887 27.9411 0 18 0C8.05887 0 0 8.05887 0 18C0 27.9411 8.05887 36 18 36Z" fill="#171A1F"/>
                    <path d="M18.2743 8.4375H12.9382L6.38672 26.4374H9.97828L12.4351 19.6875H22.369L21.1406 16.3125H13.6635L15.3013 11.8125H19.5027L18.2743 8.4375Z" fill="white"/>
                    <path d="M24.2908 11.8124L23.0624 8.4375H19.4707L20.6991 11.8124H24.2908Z" fill="#F69C00"/>
                    <path d="M21.1094 12.9375H24.7009L29.6145 26.4375H26.023L21.1094 12.9375Z" fill="white"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M49.6393 9.5625H54.602L60.0851 26.4375H56.5363L55.1656 22.2188H50.2715L51.3681 18.8438H54.069L52.1206 12.8474L47.7049 26.4375H44.1562L49.6393 9.5625ZM62.4634 16.8434V17.1562V26.4375H65.8384V17.1562H72.5884V13.7812H65.8384H65.5256L62.4634 16.8434ZM95.3696 9.5625H98.7446V13.7812H106.338H106.484L109.713 17.0115V17.1562V26.4375H106.338V17.1562H98.7446V26.4375H95.3696V17.1562V13.7812V9.5625ZM112.245 12.7825V12.9375V26.4375H115.62V12.9375H126.588V9.5625H115.62H115.465L112.245 12.7825ZM117.307 17.1562H125.745V20.5312H117.307V17.1562ZM129.12 10.4062L129.963 9.5625H132.495V12.0938L131.651 12.9375H129.12V10.4062ZM129.12 14.625H132.495V26.4375H129.12V14.625ZM85.2446 9.5625H81.8696V13.7812V17.1562V23.0625V23.2072L85.1001 26.4375H85.2446H93.6821V23.0625H85.2446V17.1562H93.6821V13.7812H85.2446V9.5625ZM75.1196 10.4062L75.9634 9.5625H78.4946V12.0938L77.6509 12.9375H75.1196V10.4062ZM75.1196 14.625H78.4946V26.4375H75.1196V14.625Z" fill="#171A1F"/>
                  </svg>
                ) : (
                  <svg width="187" height="48" viewBox="0 0 187 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_21041_5973)">
                      <path
                        d="M24.5 48C37.7548 48 48.5 37.2548 48.5 24C48.5 10.7452 37.7548 0 24.5 0C11.2452 0 0.5 10.7452 0.5 24C0.5 37.2548 11.2452 48 24.5 48Z"
                        fill="#1F2329"/>
                      <path
                        d="M24.8638 11.25H17.7489L9.01367 35.2499H13.8024L17.0781 26.25H30.3233L28.6855 21.75H18.716L20.8998 15.75H26.5016L24.8638 11.25Z"
                        fill="white"/>
                      <path d="M32.8877 15.7499L31.2498 11.25H26.4609L28.0988 15.7499H32.8877Z" fill="#F69C00"/>
                      <path d="M28.6445 17.25H33.4333L39.9848 35.25H35.196L28.6445 17.25Z" fill="white"/>
                      <path fillRule="evenodd" clipRule="evenodd"
                            d="M66.6857 12.75H73.3026L80.6135 35.25H75.8818L74.0541 29.625H67.5287L68.9908 25.125H72.5919L69.9942 17.1298L64.1066 35.25H59.375L66.6857 12.75ZM83.7845 22.4579V22.875V35.25H88.2845V22.875H97.2845V18.375H88.2845H87.8675L83.7845 22.4579ZM127.66 12.75H132.16V18.375H142.285H142.478L146.785 22.6819V22.875V35.25H142.285V22.875H132.16V35.25H127.66V22.875V18.375V12.75ZM150.16 17.0433V17.25V35.25H154.66V17.25H169.285V12.75H154.66H154.453L150.16 17.0433ZM156.91 22.875H168.16V27.375H156.91V22.875ZM172.66 13.875L173.785 12.75H177.16V16.125L176.035 17.25H172.66V13.875ZM172.66 19.5H177.16V35.25H172.66V19.5ZM114.16 12.75H109.66V18.375V22.875V30.75V30.943L113.967 35.25H114.16H125.41V30.75H114.16V22.875H125.41V18.375H114.16V12.75ZM100.66 13.875L101.785 12.75H105.16V16.125L104.035 17.25H100.66V13.875ZM100.66 19.5H105.16V35.25H100.66V19.5Z"
                            fill="white"/>
                    </g>
                    <defs>
                      <clipPath id="clip0_21041_5973">
                        <rect width="186" height="48" fill="white" transform="translate(0.5)"/>
                      </clipPath>
                    </defs>
                  </svg>
                )
              }

            </Stack>
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={"24px"}
            >
              {chainsData.chainId === 97 ? FootAList : FootAList.slice(0, 4)}
            </Stack>
          </Stack>
          <Stack direction={"row"} spacing={"40px"}>
            {
              [
                {
                  text: t`Products`,
                  children: [
                    {
                      text: t`Futures`,
                      url: "/#/futures",
                    },
                    {
                      text: t`Swap`,
                      url: "/#/swap",
                    },
                    {
                      text: t`Copy Trade`,
                      url: "/#/copy",
                    },
                    {
                      text: t`Dashboard`,
                      url: "/#/dashboard",
                    },
                  ]
                },
                {
                  text: t`Information`,
                  children: [
                    {
                      text: t`ArithFi`,
                      url: "https://docs.arithfi.com/docs/whitepaper/arithfi",
                    },
                    {
                      text: t`Tokenomics`,
                      url: "https://docs.arithfi.com/docs/whitepaper/tokenomics",
                    },
                    {
                      text: t`Roadmap`,
                      url: "https://docs.arithfi.com/docs/whitepaper/roadmap",
                    },
                    {
                      text: t`White Paper`,
                      url: "https://docs.arithfi.com/docs/whitepaper",
                    },
                  ]
                },
                {
                  text: t`Support`,
                  children: [
                    {
                      text: t`Contact`,
                      url: "https://docs.arithfi.com/docs/blogs/Guide/contact-for-support",
                    },
                    {
                      text: t`Community`,
                      url: "https://docs.arithfi.com/docs/whitepaper/community",
                    },
                    {
                      text: t`Announcement`,
                      url: "https://docs.arithfi.com/docs/blogs/Announcement/ArithFi-Copy-Trading-TermsConditions",
                    },
                    {
                      text: t`Guide`,
                      url: "https://docs.arithfi.com/docs/blogs/Guide/guildline",
                    },
                  ]
                },
                {
                  text: t`Trade`,
                  children: [
                    {
                      text: "ETH/USDT",
                      url: "/#/futures?pt=ETH%2FUSDT",
                    },
                    {
                      text: "BTC/USDT",
                      url: "/#/futures?pt=BTC%2FUSDT",
                    },
                    {
                      text: "AUD/USD",
                      url: "/#/futures?pt=AUD%2FUSD",
                    },
                    {
                      text: "EUR/USD",
                      url: "/#/futures?pt=EUR%2FUSD",
                    },
                  ]
                },
              ].map((item, index) => (
                <Stack key={index} spacing={"12px"}>
                  <Stack sx={(theme) => ({
                    fontSize: "16px",
                    lineHeight: "22px",
                    fontWeight: 700,
                    color: theme.normal.text0,
                  })}>
                    {item.text}
                  </Stack>
                  <Stack spacing={"8px"}>
                    {
                      item.children.map((item, index) => (
                        <a href={item.url} target={"_blank"} key={index}>
                          <Stack sx={(theme) => ({
                            fontSize: "12px",
                            lineHeight: "16px",
                            color: theme.normal.text2,
                            "&:hover": {
                              color: theme.normal.text0,
                            }
                          })}>
                            {item.text}
                          </Stack>
                        </a>
                      ))
                    }
                  </Stack>
                </Stack>
              ))
            }
          </Stack>
        </Stack>
        <Stack sx={(theme) => ({
          fontSize: "12px",
          lineHeight: "16px",
          color: theme.normal.text2,
          borderTop: `1px solid ${theme.normal.border}`,
          width: "100%",
          maxWidth: "1200px",
          alignItems: "center",
          paddingTop: "12px",
        })}>
          Copyright © {new Date().getFullYear()} Morning Mist Network Technology Co., Ltd.
        </Stack>
      </ArithFiFootStack>
    );
  };
  return foot();
};

export default ArithFiFoot;
