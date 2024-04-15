import {Trans, t} from "@lingui/macro";
import {Stack} from "@mui/system";
import useWindowWidth from "../../hooks/useWindowWidth";
import {useEffect, useRef, useState} from "react";
import {Link} from "react-router-dom";
import Divider from "@mui/material/Divider";
import {TradeCard} from "./TradeCard";
import {Box, Grid} from "@mui/material";
import {QRCodeCanvas} from "qrcode.react";
import {FootAList} from "../Share/Foot/ArithFiFoot";

const Home = () => {
  const {isBigMobile} = useWindowWidth();
  const [lang, setLang] = useState('en');
  const [type, setType] = useState(0);

  const integrations = [
    {
      name: 'NEST',
      img: '/images/nest.svg',
      black: '/images/nest.svg',
      href: 'https://nestprotocol.org/',
    },
    {
      name: 'Huobi',
      img: '/images/huobi.svg',
      black: '/images/huobi.svg',
      href: 'https://www.htx.com/',
    },
    {
      name: 'Binance',
      img: '/images/binance.svg',
      black: '/images/binance.svg',
      href: 'https://binance.com/',
    },
    {
      name: 'Coinbase',
      img: '/images/coinbase.svg',
      black: '/images/coinbase.svg',
      href: 'https://www.coinbase.com/',
    },
    {
      name: 'Polygon',
      img: '/images/polygon.svg',
      black: '/images/polygon.svg',
      href: 'https://polygon.technology/',
    },
    {
      name: 'KCC',
      img: '/images/kcc.svg',
      black: '/images/kcc.svg',
      href: 'https://www.kcc.io/',
    },
    {
      name: 'Cointelegraph',
      img: '/images/cointelegraph.svg',
      black: '/images/cointelegraph.svg',
      href: 'https://cointelegraph.com/',
    },
    {
      name: 'Cube',
      img: '/images/cube.svg',
      black: '/images/cube.svg',
      href: 'https://www.cube.network/',
    },
    {
      name: 'Peckshield',
      img: '/images/peckshield.svg',
      black: '/images/peckshield.svg',
      href: 'https://peckshield.com/',
    },
    {
      name: 'fortube',
      img: '/images/fortube.svg',
      black: '/images/fortube.svg',
      href: 'https://for.tube/',
    },
    {
      name: 'Coin98',
      img: '/images/coin98.svg',
      black: '/images/coin98_black.svg',
      href: 'https://www.coin98.com/',
    },
    {
      name: 'polynetwork',
      img: '/images/polynetwork.svg',
      black: '/images/polynetwork.svg',
      href: 'https://www.poly.network/',
    },
    {
      name: 'cofix',
      img: '/images/cofix.svg',
      black: '/images/cofix.svg',
      href: 'https://cofix.tech/',
    },
    {
      name: 'parasset',
      img: '/images/parasset.svg',
      black: '/images/parasset.svg',
      href: 'https://parasset.top/',
    },
    {
      name: 'certik',
      img: '/images/certik.svg',
      black: '/images/certik.svg',
      href: 'https://www.certik.com/',
    },
    {
      name: 'dragonfly',
      img: '/images/dragonfly.svg',
      black: '/images/dragonfly.svg',
      href: 'https://www.dragonfly.xyz/',
    },
    {
      name: 'CoinGecko',
      img: '/images/coingecko.svg',
      black: '/images/coingecko_black.svg',
      href: 'https://www.coingecko.com/'
    },
    {
      name: 'Followin',
      img: '/images/followin.svg',
      black: '/images/followin_black.svg',
      href: 'https://followin.io/',
    },
    {
      name: 'Nabox',
      img: '/images/nabox.svg',
      black: '/images/nabox_black.svg',
      href: 'https://nabox.io/',
    },
    {
      name: 'Kyber Network',
      img: '/images/kybernetwork.svg',
      black: '/images/kybernetwork_black.svg',
      href: 'https://kyber.network/',
    },
  ];
  const mobileDownloadRef = useRef(null);
  const pcDownloadRef = useRef(null);

  const cryptoList: any[] = [
    {pair1: 'ETH', pair2: 'USDT'},
    {pair1: 'BTC', pair2: 'USDT'},
    {pair1: 'BNB', pair2: 'USDT'},
    {pair1: 'MATIC', pair2: 'USDT'},
    {pair1: 'ADA', pair2: 'USDT'},
  ]

  const forexList: any[] = [
    {pair1: 'AUD', pair2: 'USD'},
    {pair1: 'EUR', pair2: 'USD'},
    {pair1: 'USD', pair2: 'JPY'},
    {pair1: 'USD', pair2: 'CAD'},
    {pair1: 'GBP', pair2: 'USD'},
  ]

  const commonQuestion: { title: string, link: string }[] = [
    {
      title: t`Why ArithFi's SCP Model Does NOT have a death spiral?`,
      link: "https://docs.arithfi.com/docs/blogs/Article/why-arithfi-scp-model-does-not-have-a-death-spiral",
    },
    {
      title: t`How can ArithFi make profits through 0 trading fees?`,
      link: "https://docs.arithfi.com/docs/blogs/Article/how-can-arithfi-make-profits-through-0-trading-fees",
    },
    {
      title: t`Why would the price of ATF increase?`,
      link: "https://docs.arithfi.com/docs/blogs/Article/why-would-the-price-of-ATF-increase",
    },
    {
      title: t`What competition does ArithFi face?`,
      link: "https://docs.arithfi.com/docs/blogs/Article/what-competition-does-arithfi-face"
    },
    {
      title: t`BTC, ETH, ATF?`,
      link: "https://docs.arithfi.com/docs/blogs/Article/the-third-class-of-decentralized-asset-poised-to-fllow-BTC-and-ETH"
    }
  ]

  const footerList = [
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
  ]

  useEffect(() => {
    const cache = localStorage.getItem("Language");
    if (cache) {
      setLang(cache)
    }
  }, []);

  const scrollToRef = () => {
    if (mobileDownloadRef.current) {
      // @ts-ignore
      mobileDownloadRef.current?.scrollIntoView({behavior: 'smooth'});
      return
    }
    if (pcDownloadRef.current) {
      // @ts-ignore
      pcDownloadRef.current?.scrollIntoView({behavior: 'smooth'});
    }
  }

  useEffect(() => {
    if (window.location.hash === "#/home?download") {
      scrollToRef();
    }
  }, []);

  if (isBigMobile) {
    return (
      <Stack width={'100vw'} overflow={'hidden'} sx={(theme) => ({
        backgroundColor: `#171A1F`,
      })}>
        <Stack alignItems={'center'} pt={'40px'} height={'840px'} gap={'40px'}
               sx={{
                 backgroundImage: `url('/images/home_bg1.svg')`,
                 backgroundPosition: 'center',
                 backgroundSize: 'cover',
               }} position={'relative'}>
          <Stack zIndex={10}>
            <Stack sx={{
              position: 'relative',
            }}>
              <Stack fontSize={'24px'} fontWeight={'700'} lineHeight={'32px'} textAlign={'center'} zIndex={10}
                     color={'rgba(249, 249, 249, 1)'}>
                <Trans>ArithFi, the First</Trans>
              </Stack>
              <Stack fontSize={'24px'} fontWeight={'700'} lineHeight={'32px'} textAlign={'center'} position={'absolute'}
                     top={'1.5px'} left={'1.5px'} width={'100%'} color={'#F69C00'}>
                <Trans>ArithFi, the First</Trans>
              </Stack>
            </Stack>
            <Stack sx={{
              position: 'relative',
            }}>
              <Stack fontSize={'24px'} fontWeight={'700'} lineHeight={'32px'} textAlign={'center'} zIndex={10}
                     color={'rgba(249, 249, 249, 1)'}>
                <Trans>Decentralized Derivatives</Trans>
              </Stack>
              <Stack fontSize={'24px'} fontWeight={'700'} lineHeight={'32px'} textAlign={'center'} position={'absolute'}
                     top={'1.5px'} left={'1.5px'} width={'100%'}
                     color={'#F69C00'}>
                <Trans>Decentralized Derivatives</Trans>
              </Stack>
            </Stack>
            <Stack sx={{
              position: 'relative',
            }}>
              <Stack fontSize={'24px'} fontWeight={'700'} lineHeight={'32px'} textAlign={'center'} zIndex={10}
                     color={'rgba(249, 249, 249, 1)'}>
                <Trans>
                  Protocol Achieves
                </Trans>
              </Stack>
              <Stack fontSize={'24px'} fontWeight={'700'} lineHeight={'32px'} textAlign={'center'} position={'absolute'}
                     top={'1.5px'} left={'1.5px'} width={'100%'} color={'#F69C00'}>
                <Trans>
                  Protocol Achieves
                </Trans>
              </Stack>
            </Stack>
            <Stack fontSize={'20px'} fontWeight={'700'} lineHeight={'28px'} textAlign={'center'} mt={1}
                   color={'#F69C00'}>
              <Trans>
                0 Trading Fees and 0 Slippage
              </Trans>
            </Stack>
          </Stack>
          <Stack zIndex={10}>
            <Link to={'/futures'}>
              <Stack height={'48px'} bgcolor={'rgba(246, 156, 0, 1)'} fontSize={'16px'} fontWeight={'700'}
                     color={'#030308'}
                     justifyContent={'center'} alignItems={'center'} borderRadius={'12px'}
                     lineHeight={'24px'} width={'200px'}>
                <Trans>Start Trading</Trans>
              </Stack>
            </Link>
          </Stack>
          <Stack zIndex={10} height={"660px"} alignItems={'center'} position={'relative'} width={'100%'}>
            <Stack>
              <img src={'/images/app.png'} alt={''} width={'203px'} height={'440px'}/>
            </Stack>
            <Stack position={'absolute'} right={0} bottom={0}>
              <img src={'/images/home_icon16.png'} alt={''} width={'124px'} height={'150px'}/>
            </Stack>
          </Stack>
        </Stack>
        <Stack gap={'12px'} justifyContent={'center'} padding={'20px'} sx={{
          backgroundColor: '#1F2329',
        }}>
          <Stack direction={"row"} gap={'12px'} justifyContent={"center"}>
            <Link to={"https://itunes.apple.com/us/app/6475583769"} target={"_blank"}>
              <Stack direction={"row"} width={"165px"} spacing={"8px"} alignItems={"center"} sx={{
                padding: "8px",
                backgroundColor: "rgba(53, 55, 61, 1)",
                borderRadius: "12px",
              }}>
                <Stack>
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M15.9375 7.54637C15.9922 6.05868 16.4102 4.75193 17.1816 3.65957C17.9569 2.56168 19.2386 1.78177 20.9931 1.33984C21.0048 1.39387 21.0169 1.44793 21.0295 1.50178V1.78445C21.0295 2.42541 20.874 3.16038 20.5672 3.96882C20.2456 4.75158 19.743 5.48829 19.0754 6.15318C18.4511 6.73904 17.8735 7.1269 17.363 7.30224C17.1945 7.35257 16.9634 7.4021 16.6844 7.4467C16.4362 7.48537 16.1872 7.51864 15.9375 7.54637Z"
                      fill="#F9F9F9"/>
                    <path
                      d="M16.2322 9.75273C14.2504 9.75273 12.8744 8 10.9196 8C8.96477 8 4.9375 9.7968 4.9375 16C4.9375 22.2032 8.51377 26.2 8.91377 26.6667C9.3137 27.1334 10.2388 28.333 11.6719 28.333C13.1051 28.333 14.6741 27.1935 16.2322 27.1935C17.7902 27.1935 19.7512 28.333 21.0315 28.333C22.3118 28.333 22.8384 27.8111 23.7097 26.9109C24.581 26.0107 26.2429 23.2635 26.8233 21.6147C25.8673 21.0457 23.3334 19.5008 23.3334 16C23.3334 13.6662 24.1863 11.7273 25.8921 10.1835C24.773 8.72787 23.4752 8 21.9984 8C19.7833 8 18.214 9.75273 16.2322 9.75273Z"
                      fill="#F9F9F9" stroke="#F9F9F9" strokeWidth="2.77083" strokeLinejoin="round"/>
                  </svg>
                </Stack>
                <Stack>
                  <Stack sx={{
                    fontSize: "12px",
                    lineHeight: "16px",
                    color: "rgba(249, 249, 249, 0.8)",
                  }}>
                    <Trans>
                      GET IT ON
                    </Trans>
                  </Stack>
                  <Stack sx={{
                    fontSize: "16px",
                    lineHeight: "22px",
                    fontWeight: "700",
                    color: "rgba(249, 249, 249, 1)",
                  }}>
                    <Trans>
                      App Store
                    </Trans>
                  </Stack>
                </Stack>
              </Stack>
            </Link>
            <Link to={"https://play.google.com/store/apps/details?id=com.arithfi"} target={"_blank"}>
              <Stack direction={"row"} width={"165px"} spacing={"8px"} alignItems={"center"} sx={{
                padding: "8px",
                backgroundColor: "rgba(53, 55, 61, 1)",
                borderRadius: "12px",
              }}>
                <Stack>
                  <svg width="28" height="30" viewBox="0 0 28 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12.7575 14.3594L0.4375 27.2394C0.8375 28.5994 2.1175 29.6394 3.6375 29.6394C4.2775 29.6394 4.8375 29.4794 5.3175 29.1594L19.2375 21.2394L12.7575 14.3594Z"
                      fill="#EA4335"/>
                    <path
                      d="M25.2356 12.1197L19.2356 8.67969L12.5156 14.5997L19.3156 21.2397L25.3156 17.8797C26.3556 17.3197 27.0756 16.1997 27.0756 14.9997C26.9956 13.7997 26.2756 12.6797 25.2356 12.1197Z"
                      fill="#FBBC04"/>
                    <path
                      d="M0.439375 2.75781C0.359375 2.99781 0.359375 3.31781 0.359375 3.63781V26.4378C0.359375 26.7578 0.359375 26.9978 0.439375 27.3178L13.2394 14.7578L0.439375 2.75781Z"
                      fill="#4285F4"/>
                    <path
                      d="M12.8375 14.9994L19.2375 8.67938L5.3975 0.839375C4.9175 0.519375 4.2775 0.359375 3.6375 0.359375C2.1175 0.359375 0.7575 1.39937 0.4375 2.75937L12.8375 14.9994Z"
                      fill="#34A853"/>
                  </svg>
                </Stack>
                <Stack>
                  <Stack sx={{
                    fontSize: "12px",
                    lineHeight: "16px",
                    color: "rgba(249, 249, 249, 0.8)",
                  }}>
                    <Trans>
                      GET IT ON
                    </Trans>
                  </Stack>
                  <Stack sx={{
                    fontSize: "16px",
                    lineHeight: "22px",
                    fontWeight: "700",
                    color: "rgba(249, 249, 249, 1)",
                  }}>
                    <Trans>
                      Google Play
                    </Trans>
                  </Stack>
                </Stack>
              </Stack>
            </Link>
          </Stack>
          <Stack direction={"row"} justifyContent={"center"}>
            <Link to={"https://testflight.apple.com/join/SEb1TLyN"} target={"_blank"}>
              <Stack direction={"row"} width={"165px"} spacing={"8px"} alignItems={"center"} sx={{
                padding: "8px",
                backgroundColor: "rgba(53, 55, 61, 1)",
                borderRadius: "12px",
                position: "relative"
              }}>
                <Stack>
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M15.9375 7.54637C15.9922 6.05868 16.4102 4.75193 17.1816 3.65957C17.9569 2.56168 19.2386 1.78177 20.9931 1.33984C21.0048 1.39387 21.0169 1.44793 21.0295 1.50178V1.78445C21.0295 2.42541 20.874 3.16038 20.5672 3.96882C20.2456 4.75158 19.743 5.48829 19.0754 6.15318C18.4511 6.73904 17.8735 7.1269 17.363 7.30224C17.1945 7.35257 16.9634 7.4021 16.6844 7.4467C16.4362 7.48537 16.1872 7.51864 15.9375 7.54637Z"
                      fill="#F9F9F9"/>
                    <path
                      d="M16.2322 9.75273C14.2504 9.75273 12.8744 8 10.9196 8C8.96477 8 4.9375 9.7968 4.9375 16C4.9375 22.2032 8.51377 26.2 8.91377 26.6667C9.3137 27.1334 10.2388 28.333 11.6719 28.333C13.1051 28.333 14.6741 27.1935 16.2322 27.1935C17.7902 27.1935 19.7512 28.333 21.0315 28.333C22.3118 28.333 22.8384 27.8111 23.7097 26.9109C24.581 26.0107 26.2429 23.2635 26.8233 21.6147C25.8673 21.0457 23.3334 19.5008 23.3334 16C23.3334 13.6662 24.1863 11.7273 25.8921 10.1835C24.773 8.72787 23.4752 8 21.9984 8C19.7833 8 18.214 9.75273 16.2322 9.75273Z"
                      fill="#F9F9F9" stroke="#F9F9F9" strokeWidth="2.77083" strokeLinejoin="round"/>
                  </svg>
                </Stack>
                <Stack sx={{
                  position: "absolute",
                  bottom: 0,
                  left: -8,
                }}>
                  <svg width="48" height="12" viewBox="0 0 48 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0H40C44.4183 0 48 3.58172 48 8V12H8C3.58172 12 0 8.41828 0 4V0Z" fill="#3D69FF"/>
                    <path
                      d="M8.54297 9.18555H7.87891V4.06445H6.07031V3.47461H10.3516V4.06445H8.54297V9.18555ZM12.9258 9.26367C12.293 9.26367 11.793 9.07096 11.4258 8.68555C11.0612 8.30013 10.8789 7.76497 10.8789 7.08008C10.8789 6.38997 11.0482 5.8418 11.3867 5.43555C11.7279 5.0293 12.1849 4.82617 12.7578 4.82617C13.2943 4.82617 13.7188 5.00326 14.0312 5.35742C14.3438 5.70898 14.5 6.17383 14.5 6.75195V7.16211H11.5508C11.5638 7.66471 11.6901 8.04622 11.9297 8.30664C12.1719 8.56706 12.5117 8.69727 12.9492 8.69727C13.4102 8.69727 13.8659 8.60091 14.3164 8.4082V8.98633C14.0872 9.08529 13.8698 9.1556 13.6641 9.19727C13.4609 9.24154 13.2148 9.26367 12.9258 9.26367ZM12.75 5.36914C12.4062 5.36914 12.1315 5.48112 11.9258 5.70508C11.7227 5.92904 11.6029 6.23893 11.5664 6.63477H13.8047C13.8047 6.22591 13.7135 5.91341 13.5312 5.69727C13.349 5.47852 13.0885 5.36914 12.75 5.36914ZM18.3711 8.01758C18.3711 8.41602 18.2227 8.72331 17.9258 8.93945C17.6289 9.1556 17.2122 9.26367 16.6758 9.26367C16.1081 9.26367 15.6654 9.17383 15.3477 8.99414V8.39258C15.5534 8.49674 15.7734 8.57878 16.0078 8.63867C16.2448 8.69857 16.4727 8.72852 16.6914 8.72852C17.0299 8.72852 17.2904 8.67513 17.4727 8.56836C17.6549 8.45898 17.7461 8.29362 17.7461 8.07227C17.7461 7.9056 17.6732 7.76367 17.5273 7.64648C17.3841 7.52669 17.1029 7.38607 16.6836 7.22461C16.2852 7.07617 16.0013 6.94727 15.832 6.83789C15.6654 6.72591 15.5404 6.59961 15.457 6.45898C15.3763 6.31836 15.3359 6.15039 15.3359 5.95508C15.3359 5.60612 15.4779 5.33138 15.7617 5.13086C16.0456 4.92773 16.4349 4.82617 16.9297 4.82617C17.3906 4.82617 17.8411 4.91992 18.2812 5.10742L18.0508 5.63477C17.6211 5.45768 17.2318 5.36914 16.8828 5.36914C16.5755 5.36914 16.3438 5.41732 16.1875 5.51367C16.0312 5.61003 15.9531 5.74284 15.9531 5.91211C15.9531 6.02669 15.9818 6.12435 16.0391 6.20508C16.099 6.28581 16.194 6.36263 16.3242 6.43555C16.4544 6.50846 16.7044 6.61393 17.0742 6.75195C17.582 6.93685 17.9245 7.12305 18.1016 7.31055C18.2812 7.49805 18.3711 7.73372 18.3711 8.01758ZM20.8125 8.72852C20.9271 8.72852 21.0378 8.7207 21.1445 8.70508C21.2513 8.68685 21.3359 8.66862 21.3984 8.65039V9.14648C21.3281 9.18034 21.224 9.20768 21.0859 9.22852C20.9505 9.25195 20.8281 9.26367 20.7188 9.26367C19.8906 9.26367 19.4766 8.82747 19.4766 7.95508V5.4082H18.8633V5.0957L19.4766 4.82617L19.75 3.91211H20.125V4.9043H21.3672V5.4082H20.125V7.92773C20.125 8.18555 20.1862 8.38346 20.3086 8.52148C20.431 8.65951 20.599 8.72852 20.8125 8.72852ZM26.2656 5.4082H25.1758V9.18555H24.5273V5.4082H23.7617V5.11523L24.5273 4.88086V4.64258C24.5273 3.59049 24.987 3.06445 25.9062 3.06445C26.1328 3.06445 26.3984 3.11003 26.7031 3.20117L26.5352 3.7207C26.2852 3.63997 26.0716 3.59961 25.8945 3.59961C25.6497 3.59961 25.4688 3.68164 25.3516 3.8457C25.2344 4.00716 25.1758 4.26758 25.1758 4.62695V4.9043H26.2656V5.4082ZM27.6953 9.18555H27.0469V4.9043H27.6953V9.18555ZM26.9922 3.74414C26.9922 3.5957 27.0286 3.48763 27.1016 3.41992C27.1745 3.34961 27.2656 3.31445 27.375 3.31445C27.4792 3.31445 27.569 3.34961 27.6445 3.41992C27.7201 3.49023 27.7578 3.59831 27.7578 3.74414C27.7578 3.88997 27.7201 3.99935 27.6445 4.07227C27.569 4.14258 27.4792 4.17773 27.375 4.17773C27.2656 4.17773 27.1745 4.14258 27.1016 4.07227C27.0286 3.99935 26.9922 3.88997 26.9922 3.74414ZM32.5742 4.9043V5.31445L31.7812 5.4082C31.8542 5.49935 31.9193 5.61914 31.9766 5.76758C32.0339 5.91341 32.0625 6.07878 32.0625 6.26367C32.0625 6.68294 31.9193 7.01758 31.6328 7.26758C31.3464 7.51758 30.9531 7.64258 30.4531 7.64258C30.3255 7.64258 30.2057 7.63216 30.0938 7.61133C29.8177 7.75716 29.6797 7.94076 29.6797 8.16211C29.6797 8.2793 29.7279 8.36654 29.8242 8.42383C29.9206 8.47852 30.0859 8.50586 30.3203 8.50586H31.0781C31.5417 8.50586 31.8971 8.60352 32.1445 8.79883C32.3945 8.99414 32.5195 9.27799 32.5195 9.65039C32.5195 10.1243 32.3294 10.485 31.9492 10.7324C31.569 10.9824 31.0143 11.1074 30.2852 11.1074C29.7253 11.1074 29.293 11.0033 28.9883 10.7949C28.6862 10.5866 28.5352 10.2923 28.5352 9.91211C28.5352 9.65169 28.6185 9.42643 28.7852 9.23633C28.9518 9.04622 29.1862 8.91732 29.4883 8.84961C29.3789 8.80013 29.2865 8.72331 29.2109 8.61914C29.138 8.51497 29.1016 8.39388 29.1016 8.25586C29.1016 8.09961 29.1432 7.96289 29.2266 7.8457C29.3099 7.72852 29.4414 7.61523 29.6211 7.50586C29.3997 7.41471 29.2188 7.25977 29.0781 7.04102C28.9401 6.82227 28.8711 6.57227 28.8711 6.29102C28.8711 5.82227 29.0117 5.46159 29.293 5.20898C29.5742 4.95378 29.9727 4.82617 30.4883 4.82617C30.7122 4.82617 30.9141 4.85221 31.0938 4.9043H32.5742ZM29.1602 9.9043C29.1602 10.1361 29.2578 10.3118 29.4531 10.4316C29.6484 10.5514 29.9284 10.6113 30.293 10.6113C30.8372 10.6113 31.2396 10.5293 31.5 10.3652C31.763 10.2038 31.8945 9.98372 31.8945 9.70508C31.8945 9.47331 31.8229 9.31185 31.6797 9.2207C31.5365 9.13216 31.2669 9.08789 30.8711 9.08789H30.0938C29.7995 9.08789 29.5703 9.1582 29.4062 9.29883C29.2422 9.43945 29.1602 9.64128 29.1602 9.9043ZM29.5117 6.27539C29.5117 6.57487 29.5964 6.80143 29.7656 6.95508C29.9349 7.10872 30.1706 7.18555 30.4727 7.18555C31.1055 7.18555 31.4219 6.87826 31.4219 6.26367C31.4219 5.62044 31.1016 5.29883 30.4609 5.29883C30.1562 5.29883 29.9219 5.38086 29.7578 5.54492C29.5938 5.70898 29.5117 5.95247 29.5117 6.27539ZM36.3828 9.18555V6.41602C36.3828 6.06706 36.3034 5.80664 36.1445 5.63477C35.9857 5.46289 35.737 5.37695 35.3984 5.37695C34.9479 5.37695 34.6185 5.49935 34.4102 5.74414C34.2044 5.98893 34.1016 6.38997 34.1016 6.94727V9.18555H33.4531V3.10742H34.1016V4.94727C34.1016 5.16862 34.0911 5.35221 34.0703 5.49805H34.1094C34.237 5.29232 34.418 5.13086 34.6523 5.01367C34.8893 4.89388 35.1589 4.83398 35.4609 4.83398C35.9844 4.83398 36.3763 4.95898 36.6367 5.20898C36.8997 5.45638 37.0312 5.85091 37.0312 6.39258V9.18555H36.3828ZM39.75 8.72852C39.8646 8.72852 39.9753 8.7207 40.082 8.70508C40.1888 8.68685 40.2734 8.66862 40.3359 8.65039V9.14648C40.2656 9.18034 40.1615 9.20768 40.0234 9.22852C39.888 9.25195 39.7656 9.26367 39.6562 9.26367C38.8281 9.26367 38.4141 8.82747 38.4141 7.95508V5.4082H37.8008V5.0957L38.4141 4.82617L38.6875 3.91211H39.0625V4.9043H40.3047V5.4082H39.0625V7.92773C39.0625 8.18555 39.1237 8.38346 39.2461 8.52148C39.3685 8.65951 39.5365 8.72852 39.75 8.72852Z"
                      fill="white"/>
                  </svg>
                </Stack>
                <Stack>
                  <Stack sx={{
                    fontSize: "12px",
                    lineHeight: "16px",
                    color: "rgba(249, 249, 249, 0.8)",
                  }}>
                    <Trans>
                      GET IT ON
                    </Trans>
                  </Stack>
                  <Stack sx={{
                    fontSize: "16px",
                    lineHeight: "22px",
                    fontWeight: "700",
                    color: "rgba(249, 249, 249, 1)",
                  }}>
                    <Trans>
                      TestFlight
                    </Trans>
                  </Stack>
                </Stack>
              </Stack>
            </Link>
          </Stack>
        </Stack>
        <Stack alignItems={'center'} py={'40px'} px={'20px'}>
          <Stack fontSize={'24px'} fontWeight={'700'} lineHeight={'32px'} color={'#F9F9F9'}>
            <Trans>How to Trade on ArithFi?</Trans>
          </Stack>
          <Stack alignItems={'center'} height={'204px'} mt={'40px'}>
            <Stack>
              <img src={'/images/home_icon3.svg'} alt={''}/>
            </Stack>
            <Stack mt={'24px'} fontSize={'18px'} fontWeight={'700'} lineHeight={'22px'} color={'#F9F9F9'}>
              <Trans>Trade With $ATF</Trans>
            </Stack>
            <Stack mt={'16px'} fontSize={'14px'} textAlign={'center'} fontWeight={'400'} lineHeight={'20px'}
                   color={'#F9F9F999'}>
              <Trans>Use $ATF as margin to open positions</Trans>
            </Stack>
          </Stack>
          <Stack alignItems={'center'} height={'204px'} mt={'24px'}>
            <Stack>
              <img src={'/images/home_icon4.svg'} alt={''}/>
            </Stack>
            <Stack mt={'24px'} fontSize={'18px'} fontWeight={'700'} lineHeight={'22px'} color={'#F9F9F9'}>
              <Trans>Earn $ATF</Trans>
            </Stack>
            <Stack mt={'16px'} fontSize={'14px'} textAlign={'center'} fontWeight={'400'} lineHeight={'20px'}
                   color={'#F9F9F999'}>
              <Trans>Make a profit, you will earn $ATF</Trans>
            </Stack>
          </Stack>
          <Stack alignItems={'center'} height={'204px'} mt={'24px'}>
            <Stack>
              <img src={'/images/home_icon5.svg'} alt={''}/>
            </Stack>
            <Stack mt={'24px'} fontSize={'18px'} fontWeight={'700'} lineHeight={'22px'} color={'#F9F9F9'}>
              <Trans>Burn $ATF</Trans>
            </Stack>
            <Stack mt={'16px'} fontSize={'14px'} textAlign={'center'} fontWeight={'400'} lineHeight={'20px'}
                   color={'#F9F9F999'}>
              <Trans>Incur a loss, your $ATF will be burned</Trans>
            </Stack>
          </Stack>
          <Stack direction={'row'} mt={'40px'} minHeight={'120px'} width={'100%'} position={'relative'}
                 bgcolor={'rgba(53, 55, 61, 1)'} borderRadius={'12px'} fontSize={'18px'} fontWeight={'700'}
                 alignItems={'center'}
                 onClick={() => {
                   window.open('https://docs.arithfi.com/docs/whitepaper/arithfi', '_blank')
                 }}
                 lineHeight={'24px'}>
            <Stack pl={'20px'} pr={'50px'} py={'24px'} color={'rgba(255, 255, 255, 1)'}>
              <Trans>ArithFi is based on the SCP (Smart contract Counterparty) model</Trans>
            </Stack>
            <Stack position={'absolute'} right={0}>
              <img src={'/images/home_icon8.svg'} alt={''}/>
            </Stack>
          </Stack>
        </Stack>
        <Stack py={'40px'} px={'20px'} alignItems={'center'}>
          <Stack sx={{
            fontSize: '24px',
            fontWeight: '700',
            lineHeight: '32px',
            maxWidth: '280px',
            textAlign: 'center',
            color: "#F9F9F9"
          }}>
            Catch Your Next
            Trading Opportunity
          </Stack>
          <Stack mt={'40px'} width={'100%'}>
            <Stack direction={'row'} width={'100%'}>
              <Stack sx={{
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: '700',
                lineHeight: '22px',
                padding: '8px 20px',
                color: type === 0 ? 'rgba(246, 156, 0, 1)' : '#F9F9F9',
                borderBottom: type === 0 ? '2px solid rgba(246, 156, 0, 1)' : '1px solid rgba(28, 28, 35, 0.08)',
                width: '50%',
                textAlign: 'center',
              }} onClick={() => setType(0)}>
                Crypto
              </Stack>
              <Stack sx={{
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: '700',
                lineHeight: '22px',
                padding: '8px 20px',
                color: type === 0 ? '#F9F9F9' : 'rgba(246, 156, 0, 1)',
                borderBottom: type === 0 ? '1px solid rgba(28, 28, 35, 0.08)' : '2px solid rgba(246, 156, 0, 1)',
                width: '50%',
                textAlign: 'center',
              }} onClick={() => setType(1)}>
                Forex
              </Stack>
            </Stack>
            <Stack divider={<Divider orientation="horizontal" light flexItem/>} sx={{
              borderBottom: '1px solid rgba(28, 28, 35, 0.08)',
            }}>
              {
                type === 0 ? cryptoList.map((item, index) => {
                  return (
                    <TradeCard key={index} pair1={item.pair1} pair2={item.pair2} mobile/>
                  )
                }) : forexList.map((item, index) => {
                  return (
                    <TradeCard key={index} pair1={item.pair1} pair2={item.pair2} mobile/>
                  )
                })
              }
              <Link to={`/futures`}>
                <Stack direction={'row'} alignItems={'center'} justifyContent={'end'} spacing={'8px'}
                       padding={'8px 0 8px 0'}>
                  <Stack color={'#F69C00'} fontSize={'12px'} lineHeight={'16px'} fontWeight={'400'}>
                    <Trans>
                      More
                    </Trans>
                  </Stack>
                  <Stack>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd"
                            d="M8.53615 5.82277C8.63378 5.9204 8.63378 6.07869 8.53615 6.17632L4.29351 10.419C4.19588 10.5166 4.03759 10.5166 3.93996 10.419L3.57601 10.055C3.47837 9.95738 3.47837 9.79909 3.57601 9.70146L7.27792 5.99955L3.57601 2.29764C3.47837 2.2 3.47837 2.04171 3.57601 1.94408L3.93996 1.58013C4.03759 1.4825 4.19588 1.4825 4.29351 1.58013L8.53615 5.82277Z"
                            fill="#F69C00"/>
                    </svg>
                  </Stack>
                </Stack>
              </Link>
            </Stack>
          </Stack>
        </Stack>
        <Stack pt={'60px'} pb={'80px'} alignItems={'center'} zIndex={10} sx={{
          // background: 'linear-gradient(180deg, #1F2329 100%, #1F2329 0%)',
        }}>
          <Stack zIndex={10} alignItems={'center'} sx={{
            width: '100%',
            padding: '0 16px',
          }} justifyContent={'space-between'}>
            <div>
              <img src={'/images/home_icon13.svg'} alt={''} height={'240px'}/>
            </div>
            <Stack justifyContent={'center'} maxWidth={'600px'} alignItems={'center'} textAlign={'center'}>
              <Stack fontSize={'20px'} fontWeight={'700'} lineHeight={'28px'} color={'#F9F9F9'} sx={{
                opacity: 0.8
              }}>
                <Trans>
                  ATF Coin
                </Trans>
              </Stack>
              <Stack fontSize={'16px'} fontWeight={'400'} lineHeight={'22px'} mt={'8px'} color={'#F9F9F9CC'} sx={{
                opacity: 0.8
              }}>
                <Trans>
                  ATF is a deflationary token and serves as the settlement token for the ArithFi arithmetic trading
                  model. Holders of ATF tokens can be considered as counterparts to all traders in ArithFi. We believe
                  that traders cannot consistently outperform the market in the long run, thus ATF holders can benefit
                  from the appreciation of the token due to losses incurred by traders. With ongoing product iterations
                  and community development, ATF will become a equilibrium asset. Additionally, ATF tokens also possess
                  governance functions, providing more rights to ATF holders in the future
                </Trans>
              </Stack>
              <Link to={'/token'}>
                <Stack direction={'row'} spacing={'12px'} mt={'24px'}
                       sx={{
                         backgroundColor: '#F69C00',
                         height: '48px',
                         width: '200px',
                         fontSize: '16px',
                         fontWeight: '700',
                         lineHeight: '22px',
                         borderRadius: '12px',
                         alignItems: 'center',
                         justifyContent: 'center',
                         color: '#030308',
                         cursor: 'pointer',
                         '&:hover': {
                           backgroundColor: '#FFC933',
                         }
                       }}>
                  <div>
                    <Trans>
                      GET $ATF
                    </Trans>
                  </div>
                  <img src={'/images/home_icon10.svg'} alt={''}/>
                </Stack>
              </Link>
            </Stack>
          </Stack>
          <Stack fontSize={'24px'} fontWeight={'700'} color={'#F9F9F9'} mt={'60px'}>
            <Trans>
              Advantages of ArithFi
            </Trans>
          </Stack>
          <Stack direction={'row'} fontSize={'14px'} fontWeight={'400'} lineHeight={'20px'} color={'rgba(3, 3, 8, 1)'}
                 gap={'16px'} mt={'40px'}>
            <Stack px={'20px'} py={'12px'} color={'#F9F9F9'} bgcolor={'#1F2329'}
                   borderRadius={'8px'} direction={'row'}
                   gap={'8px'} alignItems={'center'}>
              <img src={'/images/home_icon6.svg'} alt={''}/>
              <Trans>
                0 Trading Fees
              </Trans>
            </Stack>
            <Stack px={'20px'} py={'12px'} color={'#F9F9F9'} bgcolor={'#1F2329'}
                   borderRadius={'8px'} direction={'row'}
                   gap={'8px'} alignItems={'center'}>
              <img src={'/images/home_icon6.svg'} alt={''}/>
              <Trans>
                0 Slippage
              </Trans>
            </Stack>
          </Stack>
          <Stack direction={'row'} fontSize={'14px'} fontWeight={'400'} lineHeight={'20px'} color={'rgba(3, 3, 8, 1)'}
                 gap={'16px'} mt={'16px'}>
            <Stack px={'20px'} py={'12px'} color={'#F9F9F9'} bgcolor={'#1F2329'}
                   borderRadius={'8px'} direction={'row'}
                   gap={'8px'} alignItems={'center'}>
              <img src={'/images/home_icon6.svg'} alt={''}/>
              <Trans>
                Infinite Liquidity
              </Trans>
            </Stack>
            <Stack px={'20px'} py={'12px'} bgcolor={'#1F2329'} color={'#F9F9F9'}
                   borderRadius={'8px'} direction={'row'} gap={'8px'} alignItems={'center'}>
              <img src={'/images/home_icon6.svg'} alt={''}/>
              <Trans>
                Deflationary
              </Trans>
            </Stack>
          </Stack>
        </Stack>
        <Stack pt={'24px'} pb={'80px'} px={'20px'} position={'relative'}>
          <Stack maxWidth={'1200px'} width={'100%'} position={'relative'} alignItems={"center"} zIndex={10}>
            <Stack sx={{
              fontSize: '24px',
              fontWeight: '700',
              lineHeight: '32px',
              textAlign: 'center',
              color: '#F9F9F9',
            }}>Common Questions</Stack>
            <Stack mt={'40px'} gap={'16px'} width={"100%"}>
              {
                commonQuestion.map((item, index) => (
                  <Link key={index} to={item.link} target={"_blank"}>
                    <Stack flexDirection={'row'} justifyContent={"space-between"} alignItems={"center"} key={index}
                           bgcolor={"#1F2329"} px={"40px"} py={"24px"} width={'100%'} borderRadius={"8px"}
                           sx={{
                             cursor: "pointer",
                             color: "#F9F9F9CC",
                             "&:hover": {
                               color: "#F69C00",
                               "& svg": {
                                 path: {
                                   fill: "#F69C00"
                                 }
                               }
                             }
                           }}
                    >
                      <Stack flexDirection={'row'} gap={'8px'}>
                        <Stack>
                          {"• "}
                        </Stack>
                        <Stack sx={{
                          fontSize: "16px",
                          lineHeight: "22px",
                          fontWeight: 700,
                        }}>
                          {item.title}
                        </Stack>
                      </Stack>
                      <Stack>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" clipRule="evenodd"
                                d="M17.0664 11.6465C17.2617 11.8418 17.2617 12.1584 17.0664 12.3536L8.58116 20.8389C8.3859 21.0342 8.06932 21.0342 7.87406 20.8389L7.14615 20.111C6.95089 19.9157 6.95089 19.5992 7.14615 19.4039L14.55 12.0001L7.14615 4.59625C6.95089 4.40099 6.95089 4.0844 7.14615 3.88914L7.87406 3.16124C8.06932 2.96597 8.3859 2.96597 8.58116 3.16124L17.0664 11.6465Z"
                                fill="#F9F9F9CC" fillOpacity="0.6"/>
                        </svg>
                      </Stack>
                    </Stack>
                  </Link>
                ))
              }
            </Stack>
          </Stack>
        </Stack>
        <Stack pt={'40px'} pb={'80px'} alignItems={'center'}>
          <Stack sx={{
            fontSize: '24px',
            lineHeight: '32px',
            fontWeight: '700',
            color: '#F9F9F9CC',
          }}>
            <Trans>
              Integrations & Partners
            </Trans>
          </Stack>
          <Grid container mt={'40px'} spacing={'20px'} justifyContent={"center"}>
            {
              integrations.map((item, index) => (
                <Grid item key={index} md={4}>
                  <Link to={item.href} target={'_blank'}>
                    <Stack width={'104px'} height={"40px"} bgcolor={'#1F2329'} borderRadius={'12px'} sx={{
                      justifyContent: "center",
                      alignItems: "center",
                      cursor: 'pointer',
                      '#color': {
                        display: 'none',
                      },
                    }}>
                      <Stack alignItems={'center'} justifyContent={'center'}>
                        <img src={item.black} alt={''} id={'black'} height={'40px'}/>
                      </Stack>
                    </Stack>
                  </Link>
                </Grid>
              ))
            }
          </Grid>
        </Stack>
        <Stack px={'20px'} py={'20px'} sx={{
          background: 'linear-gradient(358deg, #3D404D 1.38%, #222529 98.62%)'
        }}>
          <Stack px={'20px'} width={'100%'} pb={'56px'} pt={'28px'}
                 sx={{
                   background: '#35373D',
                   backgroundImage: `url('/images/home_bg3.png')`,
                   fill: 'linear-gradient(180deg, #EBF5FF 0%, #FFF 100%)',
                   stroke: 'rgba(255, 255, 255, 0.20)',
                 }}
                 borderRadius={'8px'} lineHeight={'32px'}>
            <Stack width={'100%'} alignItems={'center'}>
              <img src={'/images/home_icon9.svg'} alt={''}/>
            </Stack>
            <Stack fontSize={'24px'} fontWeight={'700'} alignItems={'center'} mt={'24px'} color={'#F9F9F9'}>
              <Trans>
                Roadmap of ArithFi
              </Trans>
            </Stack>
            <Stack fontSize={'14px'} fontWeight={'400'} lineHeight={'20px'} color={'#F9F9F9CC'} mt={'40px'}>
              <Trans>
                Expand more assets:
              </Trans>
            </Stack>
            <Stack fontSize={'16px'} fontWeight={'700'} lineHeight={'22px'} mt={'12px'} color={'#F9F9F9'}>
              <Trans>
                CryptoCurrencies, Forex, Precious Metal, Commodity, Stock
              </Trans>
            </Stack>
            <Stack fontSize={'14px'} fontWeight={'400'} lineHeight={'20px'} color={'#F9F9F9CC'} mt={'24px'}>
              <Trans>
                Expand more products:
              </Trans>
            </Stack>
            <Stack fontSize={'16px'} fontWeight={'700'} lineHeight={'22px'} mt={'12px'} color={'#F9F9F9'}>
              <Trans>
                Futures, Options, Structure Products
              </Trans>
            </Stack>
          </Stack>
        </Stack>
        <Stack height={"720px"}
               alignItems={'center'} sx={{
          background: 'linear-gradient(180deg, #3D404D 50%, #1A1D23 100%)'
        }}
        >
          <Stack alignItems={"center"} pt={"20px"} ref={mobileDownloadRef}>
            <Stack direction={'row'} alignItems={'baseline'} sx={{
              fontSize: "20px",
              lineHeight: "28px",
              fontWeight: "700",
              color: "#F9F9F9"
            }}>
                <span style={{paddingRight: "8px", fontSize: "24px", lineHeight: "32px", fontWeight: "700"}}>
                 0
              </span>
              <Trans>
                trading fees,
              </Trans>
            </Stack>
            <Stack direction={'row'} alignItems={'baseline'} sx={{
              fontSize: "20px",
              lineHeight: "28px",
              fontWeight: "700",
              color: "#F9F9F9"
            }}>
              <span style={{
                paddingRight: "8px",
                fontSize: "24px",
                lineHeight: "32px",
                fontWeight: "700"
              }}>
                 0
              </span>
              <Trans>
                slippage trading at any time
              </Trans>
            </Stack>
          </Stack>
          <Stack marginTop={'24px'}>
            <img src={'/images/app.png'} alt={''} width={'203px'} height={'440px'}/>
          </Stack>
          <Stack spacing={'12px'} justifyContent={'center'} mt={"24px"}>
            <Stack direction={"row"} spacing={"12px"} justifyContent={'center'}>
              <Link to={"https://itunes.apple.com/us/app/6475583769"} target={"_blank"}>
                <Stack direction={"row"} width={"165px"} spacing={"8px"} alignItems={"center"} sx={{
                  padding: "8px",
                  backgroundColor: "rgba(53, 55, 61, 1)",
                  borderRadius: "12px",
                }}>
                  <Stack>
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M15.9375 7.54637C15.9922 6.05868 16.4102 4.75193 17.1816 3.65957C17.9569 2.56168 19.2386 1.78177 20.9931 1.33984C21.0048 1.39387 21.0169 1.44793 21.0295 1.50178V1.78445C21.0295 2.42541 20.874 3.16038 20.5672 3.96882C20.2456 4.75158 19.743 5.48829 19.0754 6.15318C18.4511 6.73904 17.8735 7.1269 17.363 7.30224C17.1945 7.35257 16.9634 7.4021 16.6844 7.4467C16.4362 7.48537 16.1872 7.51864 15.9375 7.54637Z"
                        fill="#F9F9F9"/>
                      <path
                        d="M16.2322 9.75273C14.2504 9.75273 12.8744 8 10.9196 8C8.96477 8 4.9375 9.7968 4.9375 16C4.9375 22.2032 8.51377 26.2 8.91377 26.6667C9.3137 27.1334 10.2388 28.333 11.6719 28.333C13.1051 28.333 14.6741 27.1935 16.2322 27.1935C17.7902 27.1935 19.7512 28.333 21.0315 28.333C22.3118 28.333 22.8384 27.8111 23.7097 26.9109C24.581 26.0107 26.2429 23.2635 26.8233 21.6147C25.8673 21.0457 23.3334 19.5008 23.3334 16C23.3334 13.6662 24.1863 11.7273 25.8921 10.1835C24.773 8.72787 23.4752 8 21.9984 8C19.7833 8 18.214 9.75273 16.2322 9.75273Z"
                        fill="#F9F9F9" stroke="#F9F9F9" strokeWidth="2.77083" strokeLinejoin="round"/>
                    </svg>
                  </Stack>
                  <Stack>
                    <Stack sx={{
                      fontSize: "12px",
                      lineHeight: "16px",
                      color: "rgba(249, 249, 249, 0.8)",
                    }}>
                      <Trans>
                        GET IT ON
                      </Trans>
                    </Stack>
                    <Stack sx={{
                      fontSize: "16px",
                      lineHeight: "22px",
                      fontWeight: "700",
                      color: "rgba(249, 249, 249, 1)",
                    }}>
                      <Trans>
                        TestFlight
                      </Trans>
                    </Stack>
                  </Stack>
                </Stack>
              </Link>
              <Link to={"https://play.google.com/store/apps/details?id=com.arithfi"} target={"_blank"}>
                <Stack direction={"row"} width={"165px"} spacing={"8px"} alignItems={"center"} sx={{
                  padding: "8px",
                  backgroundColor: "rgba(53, 55, 61, 1)",
                  borderRadius: "12px",
                }}>
                  <Stack>
                    <svg width="28" height="30" viewBox="0 0 28 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M12.7575 14.3594L0.4375 27.2394C0.8375 28.5994 2.1175 29.6394 3.6375 29.6394C4.2775 29.6394 4.8375 29.4794 5.3175 29.1594L19.2375 21.2394L12.7575 14.3594Z"
                        fill="#EA4335"/>
                      <path
                        d="M25.2356 12.1197L19.2356 8.67969L12.5156 14.5997L19.3156 21.2397L25.3156 17.8797C26.3556 17.3197 27.0756 16.1997 27.0756 14.9997C26.9956 13.7997 26.2756 12.6797 25.2356 12.1197Z"
                        fill="#FBBC04"/>
                      <path
                        d="M0.439375 2.75781C0.359375 2.99781 0.359375 3.31781 0.359375 3.63781V26.4378C0.359375 26.7578 0.359375 26.9978 0.439375 27.3178L13.2394 14.7578L0.439375 2.75781Z"
                        fill="#4285F4"/>
                      <path
                        d="M12.8375 14.9994L19.2375 8.67938L5.3975 0.839375C4.9175 0.519375 4.2775 0.359375 3.6375 0.359375C2.1175 0.359375 0.7575 1.39937 0.4375 2.75937L12.8375 14.9994Z"
                        fill="#34A853"/>
                    </svg>
                  </Stack>
                  <Stack>
                    <Stack sx={{
                      fontSize: "12px",
                      lineHeight: "16px",
                      color: "rgba(249, 249, 249, 0.8)",
                    }}>
                      <Trans>
                        GET IT ON
                      </Trans>
                    </Stack>
                    <Stack sx={{
                      fontSize: "16px",
                      lineHeight: "22px",
                      fontWeight: "700",
                      color: "rgba(249, 249, 249, 1)",
                    }}>
                      <Trans>
                        Google Play
                      </Trans>
                    </Stack>
                  </Stack>
                </Stack>
              </Link>
            </Stack>
            <Stack direction={"row"} justifyContent={"center"}>
              <Link to={"https://testflight.apple.com/join/SEb1TLyN"} target={"_blank"}>
                <Stack direction={"row"} width={"165px"} spacing={"8px"} alignItems={"center"} sx={{
                  padding: "8px",
                  backgroundColor: "rgba(53, 55, 61, 1)",
                  borderRadius: "12px",
                  position: "relative"
                }}>
                  <Stack>
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M15.9375 7.54637C15.9922 6.05868 16.4102 4.75193 17.1816 3.65957C17.9569 2.56168 19.2386 1.78177 20.9931 1.33984C21.0048 1.39387 21.0169 1.44793 21.0295 1.50178V1.78445C21.0295 2.42541 20.874 3.16038 20.5672 3.96882C20.2456 4.75158 19.743 5.48829 19.0754 6.15318C18.4511 6.73904 17.8735 7.1269 17.363 7.30224C17.1945 7.35257 16.9634 7.4021 16.6844 7.4467C16.4362 7.48537 16.1872 7.51864 15.9375 7.54637Z"
                        fill="#F9F9F9"/>
                      <path
                        d="M16.2322 9.75273C14.2504 9.75273 12.8744 8 10.9196 8C8.96477 8 4.9375 9.7968 4.9375 16C4.9375 22.2032 8.51377 26.2 8.91377 26.6667C9.3137 27.1334 10.2388 28.333 11.6719 28.333C13.1051 28.333 14.6741 27.1935 16.2322 27.1935C17.7902 27.1935 19.7512 28.333 21.0315 28.333C22.3118 28.333 22.8384 27.8111 23.7097 26.9109C24.581 26.0107 26.2429 23.2635 26.8233 21.6147C25.8673 21.0457 23.3334 19.5008 23.3334 16C23.3334 13.6662 24.1863 11.7273 25.8921 10.1835C24.773 8.72787 23.4752 8 21.9984 8C19.7833 8 18.214 9.75273 16.2322 9.75273Z"
                        fill="#F9F9F9" stroke="#F9F9F9" strokeWidth="2.77083" strokeLinejoin="round"/>
                    </svg>
                  </Stack>
                  <Stack sx={{
                    position: "absolute",
                    bottom: 0,
                    left: -8,
                  }}>
                    <svg width="48" height="12" viewBox="0 0 48 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 0H40C44.4183 0 48 3.58172 48 8V12H8C3.58172 12 0 8.41828 0 4V0Z" fill="#3D69FF"/>
                      <path
                        d="M8.54297 9.18555H7.87891V4.06445H6.07031V3.47461H10.3516V4.06445H8.54297V9.18555ZM12.9258 9.26367C12.293 9.26367 11.793 9.07096 11.4258 8.68555C11.0612 8.30013 10.8789 7.76497 10.8789 7.08008C10.8789 6.38997 11.0482 5.8418 11.3867 5.43555C11.7279 5.0293 12.1849 4.82617 12.7578 4.82617C13.2943 4.82617 13.7188 5.00326 14.0312 5.35742C14.3438 5.70898 14.5 6.17383 14.5 6.75195V7.16211H11.5508C11.5638 7.66471 11.6901 8.04622 11.9297 8.30664C12.1719 8.56706 12.5117 8.69727 12.9492 8.69727C13.4102 8.69727 13.8659 8.60091 14.3164 8.4082V8.98633C14.0872 9.08529 13.8698 9.1556 13.6641 9.19727C13.4609 9.24154 13.2148 9.26367 12.9258 9.26367ZM12.75 5.36914C12.4062 5.36914 12.1315 5.48112 11.9258 5.70508C11.7227 5.92904 11.6029 6.23893 11.5664 6.63477H13.8047C13.8047 6.22591 13.7135 5.91341 13.5312 5.69727C13.349 5.47852 13.0885 5.36914 12.75 5.36914ZM18.3711 8.01758C18.3711 8.41602 18.2227 8.72331 17.9258 8.93945C17.6289 9.1556 17.2122 9.26367 16.6758 9.26367C16.1081 9.26367 15.6654 9.17383 15.3477 8.99414V8.39258C15.5534 8.49674 15.7734 8.57878 16.0078 8.63867C16.2448 8.69857 16.4727 8.72852 16.6914 8.72852C17.0299 8.72852 17.2904 8.67513 17.4727 8.56836C17.6549 8.45898 17.7461 8.29362 17.7461 8.07227C17.7461 7.9056 17.6732 7.76367 17.5273 7.64648C17.3841 7.52669 17.1029 7.38607 16.6836 7.22461C16.2852 7.07617 16.0013 6.94727 15.832 6.83789C15.6654 6.72591 15.5404 6.59961 15.457 6.45898C15.3763 6.31836 15.3359 6.15039 15.3359 5.95508C15.3359 5.60612 15.4779 5.33138 15.7617 5.13086C16.0456 4.92773 16.4349 4.82617 16.9297 4.82617C17.3906 4.82617 17.8411 4.91992 18.2812 5.10742L18.0508 5.63477C17.6211 5.45768 17.2318 5.36914 16.8828 5.36914C16.5755 5.36914 16.3438 5.41732 16.1875 5.51367C16.0312 5.61003 15.9531 5.74284 15.9531 5.91211C15.9531 6.02669 15.9818 6.12435 16.0391 6.20508C16.099 6.28581 16.194 6.36263 16.3242 6.43555C16.4544 6.50846 16.7044 6.61393 17.0742 6.75195C17.582 6.93685 17.9245 7.12305 18.1016 7.31055C18.2812 7.49805 18.3711 7.73372 18.3711 8.01758ZM20.8125 8.72852C20.9271 8.72852 21.0378 8.7207 21.1445 8.70508C21.2513 8.68685 21.3359 8.66862 21.3984 8.65039V9.14648C21.3281 9.18034 21.224 9.20768 21.0859 9.22852C20.9505 9.25195 20.8281 9.26367 20.7188 9.26367C19.8906 9.26367 19.4766 8.82747 19.4766 7.95508V5.4082H18.8633V5.0957L19.4766 4.82617L19.75 3.91211H20.125V4.9043H21.3672V5.4082H20.125V7.92773C20.125 8.18555 20.1862 8.38346 20.3086 8.52148C20.431 8.65951 20.599 8.72852 20.8125 8.72852ZM26.2656 5.4082H25.1758V9.18555H24.5273V5.4082H23.7617V5.11523L24.5273 4.88086V4.64258C24.5273 3.59049 24.987 3.06445 25.9062 3.06445C26.1328 3.06445 26.3984 3.11003 26.7031 3.20117L26.5352 3.7207C26.2852 3.63997 26.0716 3.59961 25.8945 3.59961C25.6497 3.59961 25.4688 3.68164 25.3516 3.8457C25.2344 4.00716 25.1758 4.26758 25.1758 4.62695V4.9043H26.2656V5.4082ZM27.6953 9.18555H27.0469V4.9043H27.6953V9.18555ZM26.9922 3.74414C26.9922 3.5957 27.0286 3.48763 27.1016 3.41992C27.1745 3.34961 27.2656 3.31445 27.375 3.31445C27.4792 3.31445 27.569 3.34961 27.6445 3.41992C27.7201 3.49023 27.7578 3.59831 27.7578 3.74414C27.7578 3.88997 27.7201 3.99935 27.6445 4.07227C27.569 4.14258 27.4792 4.17773 27.375 4.17773C27.2656 4.17773 27.1745 4.14258 27.1016 4.07227C27.0286 3.99935 26.9922 3.88997 26.9922 3.74414ZM32.5742 4.9043V5.31445L31.7812 5.4082C31.8542 5.49935 31.9193 5.61914 31.9766 5.76758C32.0339 5.91341 32.0625 6.07878 32.0625 6.26367C32.0625 6.68294 31.9193 7.01758 31.6328 7.26758C31.3464 7.51758 30.9531 7.64258 30.4531 7.64258C30.3255 7.64258 30.2057 7.63216 30.0938 7.61133C29.8177 7.75716 29.6797 7.94076 29.6797 8.16211C29.6797 8.2793 29.7279 8.36654 29.8242 8.42383C29.9206 8.47852 30.0859 8.50586 30.3203 8.50586H31.0781C31.5417 8.50586 31.8971 8.60352 32.1445 8.79883C32.3945 8.99414 32.5195 9.27799 32.5195 9.65039C32.5195 10.1243 32.3294 10.485 31.9492 10.7324C31.569 10.9824 31.0143 11.1074 30.2852 11.1074C29.7253 11.1074 29.293 11.0033 28.9883 10.7949C28.6862 10.5866 28.5352 10.2923 28.5352 9.91211C28.5352 9.65169 28.6185 9.42643 28.7852 9.23633C28.9518 9.04622 29.1862 8.91732 29.4883 8.84961C29.3789 8.80013 29.2865 8.72331 29.2109 8.61914C29.138 8.51497 29.1016 8.39388 29.1016 8.25586C29.1016 8.09961 29.1432 7.96289 29.2266 7.8457C29.3099 7.72852 29.4414 7.61523 29.6211 7.50586C29.3997 7.41471 29.2188 7.25977 29.0781 7.04102C28.9401 6.82227 28.8711 6.57227 28.8711 6.29102C28.8711 5.82227 29.0117 5.46159 29.293 5.20898C29.5742 4.95378 29.9727 4.82617 30.4883 4.82617C30.7122 4.82617 30.9141 4.85221 31.0938 4.9043H32.5742ZM29.1602 9.9043C29.1602 10.1361 29.2578 10.3118 29.4531 10.4316C29.6484 10.5514 29.9284 10.6113 30.293 10.6113C30.8372 10.6113 31.2396 10.5293 31.5 10.3652C31.763 10.2038 31.8945 9.98372 31.8945 9.70508C31.8945 9.47331 31.8229 9.31185 31.6797 9.2207C31.5365 9.13216 31.2669 9.08789 30.8711 9.08789H30.0938C29.7995 9.08789 29.5703 9.1582 29.4062 9.29883C29.2422 9.43945 29.1602 9.64128 29.1602 9.9043ZM29.5117 6.27539C29.5117 6.57487 29.5964 6.80143 29.7656 6.95508C29.9349 7.10872 30.1706 7.18555 30.4727 7.18555C31.1055 7.18555 31.4219 6.87826 31.4219 6.26367C31.4219 5.62044 31.1016 5.29883 30.4609 5.29883C30.1562 5.29883 29.9219 5.38086 29.7578 5.54492C29.5938 5.70898 29.5117 5.95247 29.5117 6.27539ZM36.3828 9.18555V6.41602C36.3828 6.06706 36.3034 5.80664 36.1445 5.63477C35.9857 5.46289 35.737 5.37695 35.3984 5.37695C34.9479 5.37695 34.6185 5.49935 34.4102 5.74414C34.2044 5.98893 34.1016 6.38997 34.1016 6.94727V9.18555H33.4531V3.10742H34.1016V4.94727C34.1016 5.16862 34.0911 5.35221 34.0703 5.49805H34.1094C34.237 5.29232 34.418 5.13086 34.6523 5.01367C34.8893 4.89388 35.1589 4.83398 35.4609 4.83398C35.9844 4.83398 36.3763 4.95898 36.6367 5.20898C36.8997 5.45638 37.0312 5.85091 37.0312 6.39258V9.18555H36.3828ZM39.75 8.72852C39.8646 8.72852 39.9753 8.7207 40.082 8.70508C40.1888 8.68685 40.2734 8.66862 40.3359 8.65039V9.14648C40.2656 9.18034 40.1615 9.20768 40.0234 9.22852C39.888 9.25195 39.7656 9.26367 39.6562 9.26367C38.8281 9.26367 38.4141 8.82747 38.4141 7.95508V5.4082H37.8008V5.0957L38.4141 4.82617L38.6875 3.91211H39.0625V4.9043H40.3047V5.4082H39.0625V7.92773C39.0625 8.18555 39.1237 8.38346 39.2461 8.52148C39.3685 8.65951 39.5365 8.72852 39.75 8.72852Z"
                        fill="white"/>
                    </svg>
                  </Stack>
                  <Stack>
                    <Stack sx={{
                      fontSize: "12px",
                      lineHeight: "16px",
                      color: "rgba(249, 249, 249, 0.8)",
                    }}>
                      <Trans>
                        GET IT ON
                      </Trans>
                    </Stack>
                    <Stack sx={{
                      fontSize: "16px",
                      lineHeight: "22px",
                      fontWeight: "700",
                      color: "rgba(249, 249, 249, 1)",
                    }}>
                      <Trans>
                        TestFlight
                      </Trans>
                    </Stack>
                  </Stack>
                </Stack>
              </Link>
            </Stack>
          </Stack>
        </Stack>
        <Stack alignItems={'center'} px={'20px'} py={'40px'} bgcolor={'rgba(41, 46, 61, 1)'}
               color={'rgba(255, 255, 255, 1)'} fontSize={'20px'} lineHeight={'28px'} fontWeight={'700'}>
          <Stack textAlign={'center'}>
            <Trans>
              Enjoy 0 trading fees & 0 slippage trading on ArithFi
            </Trans>
          </Stack>
          <Link to={'/futures'}>
            <Stack direction={'row'} fontSize={'16px'} fontWeight={'700'} gap={'12px'} bgcolor={'#F69C00'}
                   width={'200px'}
                   height={'48px'} alignItems={'center'} justifyContent={'center'} borderRadius={'12px'} mt={'12px'}
                   color={'rgba(3, 3, 8, 1)'}>
              <Trans>
                Start Trading
              </Trans>
              <img src={'/images/home_icon10.svg'} alt={''}/>
            </Stack>
          </Link>
        </Stack>
        <Stack spacing={"20px"} sx={(theme) => ({
          backgroundColor: "#171A1F",
          padding: "40px 24px",
        })}>
          <Stack>
            <svg width="93" height="24" viewBox="0 0 93 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z"
                fill="#1F2329"/>
              <path
                d="M12.1829 5.625H8.62544L4.25781 17.625H6.65219L8.29004 13.125H14.9127L14.0937 10.875H9.109L10.2009 7.875H13.0018L12.1829 5.625Z"
                fill="white"/>
              <path d="M16.1938 7.87496L15.3749 5.625H12.9805L13.7994 7.87496H16.1938Z" fill="#F69C00"/>
              <path d="M14.0723 8.625H16.4666L19.7424 17.625H17.348L14.0723 8.625Z" fill="white"/>
              <path fillRule="evenodd" clipRule="evenodd"
                    d="M33.0928 6.375H36.4013L40.0568 17.625H37.6909L36.777 14.8125H33.5143L34.2454 12.5625H36.046L34.7471 8.56492L31.8033 17.625H29.4375L33.0928 6.375ZM41.6422 11.229V11.4375V17.625H43.8922V11.4375H48.3923V9.1875H43.8922H43.6837L41.6422 11.229ZM63.5798 6.375H65.8298V9.1875H70.8923H70.989L73.1423 11.341V11.4375V17.625H70.8923V11.4375H65.8298V17.625H63.5798V11.4375V9.1875V6.375ZM74.8298 8.52165V8.625V17.625H77.0798V8.625H84.3923V6.375H77.0798H76.9766L74.8298 8.52165ZM78.2048 11.4375H83.8298V13.6875H78.2048V11.4375ZM86.0798 6.9375L86.6423 6.375H88.3298V8.0625L87.7673 8.625H86.0798V6.9375ZM86.0798 9.75H88.3298V17.625H86.0798V9.75ZM56.8298 6.375H54.5798V9.1875V11.4375V15.375V15.4715L56.7334 17.625H56.8298H62.4548V15.375H56.8298V11.4375H62.4548V9.1875H56.8298V6.375ZM50.0798 6.9375L50.6423 6.375H52.3298V8.0625L51.7673 8.625H50.0798V6.9375ZM50.0798 9.75H52.3298V17.625H50.0798V9.75Z"
                    fill="white"/>
            </svg>
          </Stack>
          <Stack direction={"row"}>
            {
              footerList.slice(0, 2).map((item, index) => (
                <Stack key={index} width={"100%"} spacing={"8px"}>
                  <Stack fontSize={"16px"} lineHeight={"22px"} color={"#F9F9F9"} fontWeight={"bold"}>
                    {item.text}
                  </Stack>
                  <Stack spacing={"8px"}>
                    {item.children.map((item, index) => (
                      <a href={item.url} key={index} target={'_blank'} rel={'noreferrer'}>
                        <Stack fontSize={"12px"} lineHeight={"16px"} color={"rgba(249, 249, 249, 0.6)"}>
                          {item.text}
                        </Stack>
                      </a>
                    ))}
                  </Stack>
                </Stack>
              ))
            }
          </Stack>
          <Stack direction={"row"}>
            {
              footerList.slice(2, 4).map((item, index) => (
                <Stack key={index} width={"100%"} spacing={"8px"}>
                  <Stack fontSize={"16px"} lineHeight={"22px"} color={"#F9F9F9"} fontWeight={"bold"}>
                    {item.text}
                  </Stack>
                  <Stack spacing={"8px"}>
                    {item.children.map((item, index) => (
                      <a href={item.url} key={index} target={'_blank'} rel={'noreferrer'}>
                        <Stack fontSize={"12px"} lineHeight={"16px"} color={"rgba(249, 249, 249, 0.6)"}>
                          {item.text}
                        </Stack>
                      </a>
                    ))}
                  </Stack>
                </Stack>
              ))
            }
          </Stack>
          <Stack direction={'row'} width={"100%"} alignItems={"center"}
                 justifyContent={"center"} spacing={"20px"} paddingTop={'20px'}
                 sx={{
                   "& svg": {
                     width: 20,
                     height: 20,
                     "& path": {
                       fill: "rgba(249, 249, 249, 0.6)",
                     },
                   },
                 }}
          >
            {FootAList.slice(0, 4)}
          </Stack>
          <Stack fontSize={"12px"} lineHeight={"16px"} color={"rgba(249, 249, 249, 0.6)"}
                 paddingTop={'12px'} borderTop={"1px solid rgba(255, 255, 255, 0.08)"}
                 width={"100%"} alignItems={"center"}>
            Copyright © {new Date().getFullYear()} Morning Mist Network Technology Co., Ltd.
          </Stack>
        </Stack>
      </Stack>
    )
  }

  return (
    <Stack sx={{
      overflowX: 'hidden',
      backgroundColor: '#171A1F',
    }}>
      <Stack position={'relative'} sx={{
        width: '100%',
        alignItems: 'center',
      }}>
        <Stack position={'absolute'} zIndex={5} top={0} width={'100%'} height={'768px'} sx={{
          backgroundImage: `url('/images/home_bg1.svg')`,
          backgroundPosition: 'bottom',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}>
        </Stack>
        <Stack direction={"row"} zIndex={10} justifyContent={"space-between"} width={'100%'} maxWidth={1200}
               mt={"100px"}>
          <Stack spacing={"24px"}>
            <Stack>
              <Stack sx={{
                position: "relative",
                width: '100%',
              }}>
                <Stack sx={{
                  zIndex: 10,
                  fontSize: '40px',
                  fontWeight: '700',
                  lineHeight: '52px',
                  textAlign: 'start',
                  color: '#F9F9F9',
                }}>
                  <Trans>
                    ArithFi, the First Decentralized
                  </Trans>
                </Stack>
                <Stack sx={{
                  position: 'absolute',
                  width: '100%',
                  top: '1.5px',
                  left: '1.5px',
                  fontSize: '40px',
                  fontWeight: '700',
                  lineHeight: '52px',
                  textAlign: 'start',
                  color: '#F69C00',
                }}>
                  <Trans>
                    ArithFi, the First Decentralized
                  </Trans>
                </Stack>
              </Stack>
              <Stack sx={{
                position: "relative",
                width: '100%',
              }}>
                <Stack sx={{
                  zIndex: 10,
                  fontSize: '40px',
                  fontWeight: '700',
                  lineHeight: '52px',
                  textAlign: 'start',
                  color: '#F9F9F9',
                }}>
                  <Trans>
                    Derivatives Protocol Achieves
                  </Trans>
                </Stack>
                <Stack sx={{
                  position: 'absolute',
                  width: '100%',
                  top: '1.5px',
                  left: '1.5px',
                  fontSize: '40px',
                  fontWeight: '700',
                  lineHeight: '52px',
                  textAlign: 'start',
                  color: '#F69C00',
                }}>
                  <Trans>
                    Derivatives Protocol Achieves
                  </Trans>
                </Stack>
              </Stack>
              <Stack sx={{
                fontSize: '28px',
                fontWeight: '700',
                lineHeight: '40px',
                textAlign: 'start',
                color: '#F69C00',
              }}>
                <Trans>
                  0 Trading Fees and 0 Slippage
                </Trans>
              </Stack>
            </Stack>
            <Stack width={'fit-content'}>
              <Link to={'/futures'}>
                <Stack sx={{
                  cursor: 'pointer',
                  width: '200px',
                  height: '48px',
                  backgroundColor: '#F69C00',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: '700',
                  lineHeight: '22px',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: '#030308',
                  '&:hover': {
                    backgroundColor: '#FFC933',
                  }
                }}>
                  <Trans>
                    Start Trading
                  </Trans>
                </Stack>
              </Link>
            </Stack>
            <Stack direction={"row"} spacing={'24px'} alignItems={"center"}>
              <Stack sx={{
                padding: "12px",
                backgroundColor: '#1F2329',
                border: "1px solid #FFFFFF14",
                borderRadius: "12px"
              }}>
                <Box sx={{
                  width: "80px",
                  height: "80px",
                  backgroundColor: "white",
                  padding: "4px",
                }}>
                  <QRCodeCanvas value={"https://www.arithfi.com/download.html"} size={72}/>
                </Box>
              </Stack>
              <Stack spacing={"12px"}>
                <Stack sx={(theme) => ({
                  fontSize: "14px",
                  lineHeight: "20px",
                  color: "rgba(249, 249, 249, 0.8)",
                })}>
                  <Trans>Scan to Download App</Trans>
                </Stack>
                <Stack direction={"row"} spacing={"8px"}>
                  <Link to={"https://itunes.apple.com/us/app/6475583769"} target={"_blank"}>
                    <Stack direction={"row"} spacing={"8px"} alignItems={"center"} sx={{
                      padding: "8px",
                      borderRadius: "8px",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      backgroundColor: "rgba(31, 35, 41, 1)",
                      height: "40px",
                    }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M11.9531 5.6588C11.9941 4.54303 12.3076 3.56297 12.8862 2.7437C13.4677 1.92028 14.429 1.33535 15.7448 1.00391C15.7536 1.04443 15.7627 1.08497 15.7721 1.12536V1.33736C15.7721 1.81808 15.6555 2.36931 15.4254 2.97564C15.1842 3.56271 14.8072 4.11524 14.3066 4.61391C13.8383 5.0533 13.4051 5.3442 13.0223 5.4757C12.8959 5.51345 12.7226 5.5506 12.5133 5.58405C12.3271 5.61305 12.1404 5.638 11.9531 5.6588Z"
                          fill="#F9F9F9"/>
                        <path
                          d="M12.1741 7.31455C10.6878 7.31455 9.65583 6 8.18968 6C6.72358 6 3.70312 7.3476 3.70312 12C3.70312 16.6524 6.38532 19.65 6.68532 20C6.98527 20.35 7.67908 21.2498 8.75393 21.2498C9.82883 21.2498 11.0056 20.3951 12.1741 20.3951C13.3426 20.3951 14.8134 21.2498 15.7736 21.2498C16.7338 21.2498 17.1288 20.8583 17.7823 20.1831C18.4357 19.508 19.6822 17.4476 20.1175 16.2111C19.4005 15.7843 17.5001 14.6256 17.5001 12C17.5001 10.2497 18.1397 8.7955 19.4191 7.63765C18.5798 6.5459 17.6064 6 16.4988 6C14.8375 6 13.6605 7.31455 12.1741 7.31455Z"
                          fill="#F9F9F9" stroke="#F9F9F9" strokeWidth="2.77083" strokeLinejoin="round"/>
                      </svg>
                    </Stack>
                  </Link>
                  <Link to={"https://play.google.com/store/apps/details?id=com.arithfi"} target={"_blank"}>
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="40" height="40" rx="8" fill="#1F2329"/>
                      <rect x="0.5" y="0.5" width="39" height="39" rx="7.5" stroke="white" strokeOpacity="0.08"/>
                      <g clipPath="url(#clip0_20964_110009)">
                        <path
                          d="M19.8259 19.5195L10.5859 29.1795C10.8859 30.1995 11.8459 30.9795 12.9859 30.9795C13.4659 30.9795 13.8859 30.8595 14.2459 30.6195L24.6859 24.6795L19.8259 19.5195Z"
                          fill="#EA4335"/>
                        <path
                          d="M29.1806 17.8398L24.6806 15.2598L19.6406 19.6998L24.7406 24.6798L29.2406 22.1598C30.0206 21.7398 30.5606 20.8998 30.5606 19.9998C30.5006 19.0998 29.9606 18.2598 29.1806 17.8398Z"
                          fill="#FBBC04"/>
                        <path
                          d="M10.5834 10.8203C10.5234 11.0003 10.5234 11.2403 10.5234 11.4803V28.5803C10.5234 28.8203 10.5234 29.0003 10.5834 29.2403L20.1834 19.8203L10.5834 10.8203Z"
                          fill="#4285F4"/>
                        <path
                          d="M19.8859 19.9995L24.6859 15.2595L14.3059 9.37953C13.9459 9.13953 13.4659 9.01953 12.9859 9.01953C11.8459 9.01953 10.8259 9.79953 10.5859 10.8195L19.8859 19.9995Z"
                          fill="#34A853"/>
                      </g>
                      <defs>
                        <clipPath id="clip0_20964_110009">
                          <rect width="24" height="24" fill="white" transform="translate(8 8)"/>
                        </clipPath>
                      </defs>
                    </svg>
                  </Link>
                  <Link to={"https://testflight.apple.com/join/SEb1TLyN"} target={"_blank"}>
                    <Stack direction={"row"} spacing={"8px"} alignItems={"center"} sx={{
                      backgroundColor: "rgba(31, 35, 41, 1)",
                      height: "40px",
                      borderRadius: "8px",
                    }}>
                      <svg width="40" height="40" viewBox="0 0 40 40" fill="none"
                           xmlns="http://www.w3.org/2000/svg">
                        <rect width="40" height="40" rx="8" fill="#1F2329"/>
                        <rect x="0.5" y="0.5" width="39" height="39" rx="7.5" stroke="white" stroke-opacity="0.08"/>
                        <path
                          d="M19.9531 9.6588C19.9941 8.54303 20.3076 7.56297 20.8862 6.7437C21.4677 5.92028 22.429 5.33535 23.7448 5.00391C23.7536 5.04443 23.7627 5.08497 23.7721 5.12536V5.33736C23.7721 5.81808 23.6555 6.36931 23.4254 6.97564C23.1842 7.56271 22.8072 8.11524 22.3066 8.61391C21.8383 9.0533 21.4051 9.3442 21.0223 9.4757C20.8959 9.51345 20.7226 9.5506 20.5133 9.58405C20.3271 9.61305 20.1404 9.638 19.9531 9.6588Z"
                          fill="#F9F9F9"/>
                        <path
                          d="M20.1741 11.3145C18.6878 11.3145 17.6558 10 16.1897 10C14.7236 10 11.7031 11.3476 11.7031 16C11.7031 20.6524 14.3853 23.65 14.6853 24C14.9853 24.35 15.6791 25.2498 16.7539 25.2498C17.8288 25.2498 19.0056 24.3951 20.1741 24.3951C21.3426 24.3951 22.8134 25.2498 23.7736 25.2498C24.7338 25.2498 25.1288 24.8583 25.7823 24.1831C26.4357 23.508 27.6822 21.4476 28.1175 20.2111C27.4005 19.7843 25.5001 18.6256 25.5001 16C25.5001 14.2497 26.1397 12.7955 27.4191 11.6377C26.5798 10.5459 25.6064 10 24.4988 10C22.8375 10 21.6605 11.3145 20.1741 11.3145Z"
                          fill="#F9F9F9" stroke="#F9F9F9" stroke-width="2.77083" stroke-linejoin="round"/>
                        <path d="M0 30H40V32C40 36.4183 36.4183 40 32 40H8C3.58172 40 0 36.4183 0 32V30Z"
                              fill="#3D69FF"/>
                        <path
                          d="M8.90723 36H8.40918V32.1592H7.05273V31.7168H10.2637V32.1592H8.90723V36ZM12.1943 36.0586C11.7197 36.0586 11.3447 35.9141 11.0693 35.625C10.7959 35.3359 10.6592 34.9346 10.6592 34.4209C10.6592 33.9033 10.7861 33.4922 11.04 33.1875C11.2959 32.8828 11.6387 32.7305 12.0684 32.7305C12.4707 32.7305 12.7891 32.8633 13.0234 33.1289C13.2578 33.3926 13.375 33.7412 13.375 34.1748V34.4824H11.1631C11.1729 34.8594 11.2676 35.1455 11.4473 35.3408C11.6289 35.5361 11.8838 35.6338 12.2119 35.6338C12.5576 35.6338 12.8994 35.5615 13.2373 35.417V35.8506C13.0654 35.9248 12.9023 35.9775 12.748 36.0088C12.5957 36.042 12.4111 36.0586 12.1943 36.0586ZM12.0625 33.1377C11.8047 33.1377 11.5986 33.2217 11.4443 33.3896C11.292 33.5576 11.2021 33.79 11.1748 34.0869H12.8535C12.8535 33.7803 12.7852 33.5459 12.6484 33.3838C12.5117 33.2197 12.3164 33.1377 12.0625 33.1377ZM16.2783 35.124C16.2783 35.4229 16.167 35.6533 15.9443 35.8154C15.7217 35.9775 15.4092 36.0586 15.0068 36.0586C14.5811 36.0586 14.249 35.9912 14.0107 35.8564V35.4053C14.165 35.4834 14.3301 35.5449 14.5059 35.5898C14.6836 35.6348 14.8545 35.6572 15.0186 35.6572C15.2725 35.6572 15.4678 35.6172 15.6045 35.5371C15.7412 35.4551 15.8096 35.3311 15.8096 35.165C15.8096 35.04 15.7549 34.9336 15.6455 34.8457C15.5381 34.7559 15.3271 34.6504 15.0127 34.5293C14.7139 34.418 14.501 34.3213 14.374 34.2393C14.249 34.1553 14.1553 34.0605 14.0928 33.9551C14.0322 33.8496 14.002 33.7236 14.002 33.5771C14.002 33.3154 14.1084 33.1094 14.3213 32.959C14.5342 32.8066 14.8262 32.7305 15.1973 32.7305C15.543 32.7305 15.8809 32.8008 16.2109 32.9414L16.0381 33.3369C15.7158 33.2041 15.4238 33.1377 15.1621 33.1377C14.9316 33.1377 14.7578 33.1738 14.6406 33.2461C14.5234 33.3184 14.4648 33.418 14.4648 33.5449C14.4648 33.6309 14.4863 33.7041 14.5293 33.7646C14.5742 33.8252 14.6455 33.8828 14.7432 33.9375C14.8408 33.9922 15.0283 34.0713 15.3057 34.1748C15.6865 34.3135 15.9434 34.4531 16.0762 34.5938C16.2109 34.7344 16.2783 34.9111 16.2783 35.124ZM18.1094 35.6572C18.1953 35.6572 18.2783 35.6514 18.3584 35.6396C18.4385 35.626 18.502 35.6123 18.5488 35.5986V35.9707C18.4961 35.9961 18.418 36.0166 18.3145 36.0322C18.2129 36.0498 18.1211 36.0586 18.0391 36.0586C17.418 36.0586 17.1074 35.7314 17.1074 35.0771V33.167H16.6475V32.9326L17.1074 32.7305L17.3125 32.0449H17.5938V32.7891H18.5254V33.167H17.5938V35.0566C17.5938 35.25 17.6396 35.3984 17.7314 35.502C17.8232 35.6055 17.9492 35.6572 18.1094 35.6572ZM22.1992 33.167H21.3818V36H20.8955V33.167H20.3213V32.9473L20.8955 32.7715V32.5928C20.8955 31.8037 21.2402 31.4092 21.9297 31.4092C22.0996 31.4092 22.2988 31.4434 22.5273 31.5117L22.4014 31.9014C22.2139 31.8408 22.0537 31.8105 21.9209 31.8105C21.7373 31.8105 21.6016 31.8721 21.5137 31.9951C21.4258 32.1162 21.3818 32.3115 21.3818 32.5811V32.7891H22.1992V33.167ZM23.2715 36H22.7852V32.7891H23.2715V36ZM22.7441 31.9189C22.7441 31.8076 22.7715 31.7266 22.8262 31.6758C22.8809 31.623 22.9492 31.5967 23.0312 31.5967C23.1094 31.5967 23.1768 31.623 23.2334 31.6758C23.29 31.7285 23.3184 31.8096 23.3184 31.9189C23.3184 32.0283 23.29 32.1104 23.2334 32.165C23.1768 32.2178 23.1094 32.2441 23.0312 32.2441C22.9492 32.2441 22.8809 32.2178 22.8262 32.165C22.7715 32.1104 22.7441 32.0283 22.7441 31.9189ZM26.9307 32.7891V33.0967L26.3359 33.167C26.3906 33.2354 26.4395 33.3252 26.4824 33.4365C26.5254 33.5459 26.5469 33.6699 26.5469 33.8086C26.5469 34.123 26.4395 34.374 26.2246 34.5615C26.0098 34.749 25.7148 34.8428 25.3398 34.8428C25.2441 34.8428 25.1543 34.835 25.0703 34.8193C24.8633 34.9287 24.7598 35.0664 24.7598 35.2324C24.7598 35.3203 24.7959 35.3857 24.8682 35.4287C24.9404 35.4697 25.0645 35.4902 25.2402 35.4902H25.8086C26.1562 35.4902 26.4229 35.5635 26.6084 35.71C26.7959 35.8564 26.8896 36.0693 26.8896 36.3486C26.8896 36.7041 26.7471 36.9746 26.4619 37.1602C26.1768 37.3477 25.7607 37.4414 25.2139 37.4414C24.7939 37.4414 24.4697 37.3633 24.2412 37.207C24.0146 37.0508 23.9014 36.8301 23.9014 36.5449C23.9014 36.3496 23.9639 36.1807 24.0889 36.0381C24.2139 35.8955 24.3896 35.7988 24.6162 35.748C24.5342 35.7109 24.4648 35.6533 24.4082 35.5752C24.3535 35.4971 24.3262 35.4062 24.3262 35.3027C24.3262 35.1855 24.3574 35.083 24.4199 34.9951C24.4824 34.9072 24.5811 34.8223 24.7158 34.7402C24.5498 34.6719 24.4141 34.5557 24.3086 34.3916C24.2051 34.2275 24.1533 34.04 24.1533 33.8291C24.1533 33.4775 24.2588 33.207 24.4697 33.0176C24.6807 32.8262 24.9795 32.7305 25.3662 32.7305C25.5342 32.7305 25.6855 32.75 25.8203 32.7891H26.9307ZM24.3701 36.5391C24.3701 36.7129 24.4434 36.8447 24.5898 36.9346C24.7363 37.0244 24.9463 37.0693 25.2197 37.0693C25.6279 37.0693 25.9297 37.0078 26.125 36.8848C26.3223 36.7637 26.4209 36.5986 26.4209 36.3896C26.4209 36.2158 26.3672 36.0947 26.2598 36.0264C26.1523 35.96 25.9502 35.9268 25.6533 35.9268H25.0703C24.8496 35.9268 24.6777 35.9795 24.5547 36.085C24.4316 36.1904 24.3701 36.3418 24.3701 36.5391ZM24.6338 33.8174C24.6338 34.042 24.6973 34.2119 24.8242 34.3271C24.9512 34.4424 25.1279 34.5 25.3545 34.5C25.8291 34.5 26.0664 34.2695 26.0664 33.8086C26.0664 33.3262 25.8262 33.085 25.3457 33.085C25.1172 33.085 24.9414 33.1465 24.8184 33.2695C24.6953 33.3926 24.6338 33.5752 24.6338 33.8174ZM29.7871 36V33.9229C29.7871 33.6611 29.7275 33.4658 29.6084 33.3369C29.4893 33.208 29.3027 33.1436 29.0488 33.1436C28.7109 33.1436 28.4639 33.2354 28.3076 33.4189C28.1533 33.6025 28.0762 33.9033 28.0762 34.3213V36H27.5898V31.4414H28.0762V32.8213C28.0762 32.9873 28.0684 33.125 28.0527 33.2344H28.082C28.1777 33.0801 28.3135 32.959 28.4893 32.8711C28.667 32.7812 28.8691 32.7363 29.0957 32.7363C29.4883 32.7363 29.7822 32.8301 29.9775 33.0176C30.1748 33.2031 30.2734 33.499 30.2734 33.9053V36H29.7871ZM32.3125 35.6572C32.3984 35.6572 32.4814 35.6514 32.5615 35.6396C32.6416 35.626 32.7051 35.6123 32.752 35.5986V35.9707C32.6992 35.9961 32.6211 36.0166 32.5176 36.0322C32.416 36.0498 32.3242 36.0586 32.2422 36.0586C31.6211 36.0586 31.3105 35.7314 31.3105 35.0771V33.167H30.8506V32.9326L31.3105 32.7305L31.5156 32.0449H31.7969V32.7891H32.7285V33.167H31.7969V35.0566C31.7969 35.25 31.8428 35.3984 31.9346 35.502C32.0264 35.6055 32.1523 35.6572 32.3125 35.6572Z"
                          fill="white"/>
                        <rect x="0.5" y="0.5" width="39" height="39" rx="7.5" stroke="#31353A"/>
                      </svg>
                    </Stack>
                  </Link>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
          <Stack sx={{
            width: 520,
            position: 'relative',
          }}>
            <Stack sx={{
              position: 'absolute',
              width: '260px',
              bottom: 0,
              left: -260,
            }}>
              <img src={'/images/home_icon16.png'} alt={''}/>
            </Stack>
            <img src={'/images/app3.png'} alt={''}/>
          </Stack>
        </Stack>
        <Stack zIndex={'20'} position={'relative'} sx={{
          marginTop: -3,
          maxWidth: '1200px',
          width: '100%',
          alignItems: 'center',
          padding: '0 48px 48px 48px',
          borderRadius: '18px',
          backgroundColor: '#1F2329',
        }}>
          <Stack color={'#F9F9F9'} sx={{
            fontSize: '32px',
            fontWeight: '700',
            lineHeight: '44px',
            marginTop: '40px',
            marginBottom: '64px',
          }}>
            <Trans>
              How to Trade on ArithFi?
            </Trans>
          </Stack>
          <Stack direction={'row'} width={'100%'}>
            <Stack sx={{
              alignItems: 'center',
              maxWidth: '368px',
              width: '100%',
            }}>
              <Stack>
                <img src={'/images/home_icon3.svg'} alt={''}/>
              </Stack>
              <Stack sx={{
                fontSize: '24px',
                fontWeight: '700',
                lineHeight: '32px',
                marginTop: '40px',
                marginBottom: '16px',
              }} color={'#F9F9F9'}>
                <Trans>
                  Trade With $ATF
                </Trans>
              </Stack>
              <Stack sx={{
                fontSize: '16px',
                fontWeight: '400',
                lineHeight: '22px',
                textAlign: 'center',
                color: '#F9F9F999',
              }}>
                <Trans>
                  Use $ATF as margin to open positions
                </Trans>
              </Stack>
            </Stack>
            <Stack sx={{
              alignItems: 'center',
              maxWidth: '368px',
              width: '100%',
            }}>
              <Stack>
                <img src={'/images/home_icon4.svg'} alt={''}/>
              </Stack>
              <Stack color={'#F9F9F9'} sx={{
                fontSize: '24px',
                fontWeight: '700',
                lineHeight: '32px',
                marginTop: '40px',
                marginBottom: '16px',
              }}>
                <Trans>
                  Earn $ATF
                </Trans>
              </Stack>
              <Stack sx={{
                fontSize: '16px',
                fontWeight: '400',
                lineHeight: '22px',
                textAlign: 'center',
                color: '#F9F9F999',
              }}>
                <Trans>
                  Make a profit, you will earn $ATF
                </Trans>
              </Stack>
            </Stack>
            <Stack sx={{
              alignItems: 'center',
              maxWidth: '368px',
              width: '100%',
            }}>
              <Stack>
                <img src={'/images/home_icon5.svg'} alt={''}/>
              </Stack>
              <Stack color={'#F9F9F9'} sx={{
                fontSize: '24px',
                fontWeight: '700',
                lineHeight: '32px',
                marginTop: '40px',
                marginBottom: '16px',
              }}>
                <Trans>
                  Burn $ATF
                </Trans>
              </Stack>
              <Stack sx={{
                fontSize: '16px',
                fontWeight: '400',
                lineHeight: '22px',
                textAlign: 'center',
                color: '#F9F9F999',
              }}>
                <Trans>
                  Incur a loss, your $ATF will be burned
                </Trans>
              </Stack>
            </Stack>
          </Stack>
          <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}
                 onClick={() => {
                   window.open('https://docs.arithfi.com/docs/whitepaper/arithfi', '_blank')
                 }}
                 position={'relative'}
                 sx={{
                   marginTop: '62px',
                   backgroundColor: '#35373D',
                   width: '100%',
                   color: '#FFFFFF',
                   fontSize: '24px',
                   fontWeight: '700',
                   lineHeight: '32px',
                   padding: '24px 40px 24px 40px',
                   borderRadius: '12px',
                   cursor: "pointer",
                 }}>
            <Stack pr={'20px'}>
              <Trans>
                ArithFi is based on the SCP (Smart contract Counterparty) model
              </Trans>
            </Stack>
            <Stack position={'absolute'} right={'40px'}>
              <img src={'/images/home_icon12.svg'} alt={''}/>
            </Stack>
          </Stack>
        </Stack>
        <Stack sx={{
          zIndex: 10,
          marginTop: '120px',
          width: '100%',
          maxWidth: '1200px',
          alignItems: 'center',
        }}>
          <Stack sx={{
            fontSize: '32px',
            fontWeight: '700',
            lineHeight: '44px',
            color: '#F9F9F9',
          }}>Catch Your Next Trading Opportunity</Stack>
          <Stack mt={'48px'} width={'100%'} spacing={'16px'} direction={'row'}>
            <Stack sx={{
              padding: '20px',
              borderRadius: '8px',
              backgroundColor: '#1F2329',
              width: '50%',
            }} spacing={'12px'}>
              <Stack sx={{
                fontSize: '24px',
                fontWeight: '700',
                lineHeight: '32px',
                color: '#F9F9F9',
              }}>
                Crypto
              </Stack>
              <Stack divider={<Divider orientation="horizontal" light flexItem/>} sx={{
                color: '#030308',
                fontSize: '14px',
                fontWeight: '700',
                lineHeight: '20px',
              }}>
                {
                  cryptoList.map((item, index) => {
                    return (
                      <TradeCard key={index} pair1={item.pair1} pair2={item.pair2}/>
                    )
                  })
                }
                <Link to={`/futures`}>
                  <Stack direction={'row'} alignItems={'center'} justifyContent={'end'} spacing={'8px'}
                         padding={'8px 0 8px 0'}>
                    <Stack color={'#F69C00'} fontSize={'12px'} lineHeight={'16px'} fontWeight={'400'}>
                      <Trans>
                        More
                      </Trans>
                    </Stack>
                    <Stack>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd"
                              d="M8.53615 5.82277C8.63378 5.9204 8.63378 6.07869 8.53615 6.17632L4.29351 10.419C4.19588 10.5166 4.03759 10.5166 3.93996 10.419L3.57601 10.055C3.47837 9.95738 3.47837 9.79909 3.57601 9.70146L7.27792 5.99955L3.57601 2.29764C3.47837 2.2 3.47837 2.04171 3.57601 1.94408L3.93996 1.58013C4.03759 1.4825 4.19588 1.4825 4.29351 1.58013L8.53615 5.82277Z"
                              fill="#F69C00"/>
                      </svg>
                    </Stack>
                  </Stack>
                </Link>
              </Stack>
            </Stack>
            <Stack sx={{
              padding: '20px',
              borderRadius: '8px',
              backgroundColor: '#1F2329',
              width: '50%',
            }} spacing={'12px'}>
              <Stack sx={{
                fontSize: '24px',
                fontWeight: '700',
                lineHeight: '32px',
                color: '#F9F9F9',
              }}>Forex</Stack>
              <Stack divider={<Divider orientation="horizontal" light flexItem/>} sx={{
                color: '#030308',
                fontSize: '14px',
                fontWeight: '700',
                lineHeight: '20px',
              }}>
                {
                  forexList.map((item, index) => {
                    return (
                      <TradeCard key={index} pair1={item.pair1} pair2={item.pair2}/>
                    )
                  })
                }
                <Link to={`/futures?pt=AUD%2FUSD`}>
                  <Stack direction={'row'} alignItems={'center'} justifyContent={'end'} spacing={'8px'}
                         padding={'8px 0 8px 0'}>
                    <Stack color={'#F69C00'} fontSize={'12px'} lineHeight={'16px'} fontWeight={'400'}>
                      <Trans>
                        More
                      </Trans>
                    </Stack>
                    <Stack>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd"
                              d="M8.53615 5.82277C8.63378 5.9204 8.63378 6.07869 8.53615 6.17632L4.29351 10.419C4.19588 10.5166 4.03759 10.5166 3.93996 10.419L3.57601 10.055C3.47837 9.95738 3.47837 9.79909 3.57601 9.70146L7.27792 5.99955L3.57601 2.29764C3.47837 2.2 3.47837 2.04171 3.57601 1.94408L3.93996 1.58013C4.03759 1.4825 4.19588 1.4825 4.29351 1.58013L8.53615 5.82277Z"
                              fill="#F69C00"/>
                      </svg>
                    </Stack>
                  </Stack>
                </Link>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        <Stack zIndex={10} direction={'row'} alignItems={'center'} sx={{
          marginTop: '120px',
          height: '500px',
          width: '100%',
          maxWidth: '1200px'
        }} justifyContent={'space-between'}>
          <div>
            <img src={'/images/home_icon13.svg'} alt={''} height={'433px'}/>
          </div>
          <Stack justifyContent={'center'} gap={'40px'} maxWidth={'600px'} px={'24px'}>
            <Stack fontSize={'32px'} fontWeight={'700'} lineHeight={'44px'} color={"#F9F9F9"}>
              <Trans>
                ATF Coin
              </Trans>
            </Stack>
            <Stack fontSize={'16px'} fontWeight={'400'} lineHeight={'22px'} color={"#F9F9F9CC"}>
              <Trans>
                ATF is a deflationary token and serves as the settlement token for the ArithFi arithmetic trading model.
                Holders of ATF tokens can be considered as counterparts to all traders in ArithFi. We believe that
                traders cannot consistently outperform the market in the long run, thus ATF holders can benefit from the
                appreciation of the token due to losses incurred by traders. With ongoing product iterations and
                community development, ATF will become a equilibrium asset. Additionally, ATF tokens also possess
                governance functions, providing more rights to ATF holders in the future
              </Trans>
            </Stack>
            <Link to={'/token'}>
              <Stack direction={'row'} spacing={'12px'}
                     sx={{
                       backgroundColor: '#F69C00',
                       height: '48px',
                       width: '200px',
                       fontSize: '16px',
                       fontWeight: '700',
                       lineHeight: '22px',
                       borderRadius: '12px',
                       alignItems: 'center',
                       justifyContent: 'center',
                       color: '#030308',
                       cursor: 'pointer',
                       '&:hover': {
                         backgroundColor: '#FFC933',
                       }
                     }}>
                <div>
                  <Trans>
                    GET $ATF
                  </Trans>
                </div>
                <img src={'/images/home_icon10.svg'} alt={''}/>
              </Stack>
            </Link>
          </Stack>
        </Stack>
        <Stack color={'#F9F9F9'} zIndex={10} sx={{
          marginTop: '120px',
          fontWeight: '700',
          fontSize: '32px',
          lineHeight: '44px'
        }}>
          <Trans>
            Advantages of ArithFi
          </Trans>
        </Stack>
        <Stack direction={'row'} zIndex={10} gap={'24px'} marginTop={'48px'} marginBottom={'120px'}>
          <Stack direction={'row'} spacing={'8px'} bgcolor={'#1F2329'} alignItems={'center'} sx={{
            padding: '16px 24px',
            fontSize: '16px',
            fontWeight: '400',
            lineHeight: '22px',
            borderRadius: '8px',
            color: '#F9F9F9',
          }}>
            <img src={'/images/home_icon6.svg'} alt={''}/>
            <div>
              <Trans>0 Trading Fees</Trans>
            </div>
          </Stack>
          <Stack direction={'row'} spacing={'8px'} bgcolor={'#1F2329'} alignItems={'center'} sx={{
            padding: '16px 24px',
            fontSize: '16px',
            fontWeight: '400',
            lineHeight: '22px',
            borderRadius: '8px',
            color: '#F9F9F9',
          }}>
            <img src={'/images/home_icon6.svg'} alt={''}/>
            <div>
              <Trans>
                0 Slippage
              </Trans>
            </div>
          </Stack>
          <Stack direction={'row'} spacing={'8px'} bgcolor={'#1F2329'} alignItems={'center'} sx={{
            padding: '16px 24px',
            fontSize: '16px',
            fontWeight: '400',
            lineHeight: '22px',
            borderRadius: '8px',
            color: '#F9F9F9',
          }}>
            <img src={'/images/home_icon6.svg'} alt={''}/>
            <div>
              <Trans>
                Infinite Liquidity
              </Trans>
            </div>
          </Stack>
          <Stack direction={'row'} spacing={'8px'} bgcolor={'#1F2329'} alignItems={'center'} sx={{
            padding: '16px 24px',
            fontSize: '16px',
            fontWeight: '400',
            lineHeight: '22px',
            borderRadius: '8px',
            color: '#F9F9F9',
          }}>
            <img src={'/images/home_icon6.svg'} alt={''}/>
            <div>
              <Trans>
                Deflationary
              </Trans>
            </div>
          </Stack>
        </Stack>
      </Stack>
      <Stack alignItems={'center'} position={'relative'} zIndex={5}>
        <Stack width={'100%'} paddingTop={'80px'} paddingBottom={'80px'} zIndex={10} alignItems={'center'}>
          <Stack maxWidth={'1200px'} width={'100%'} position={'relative'} alignItems={"center"} zIndex={10} px={"20px"}>
            <Stack sx={{
              fontSize: '32px',
              fontWeight: '700',
              lineHeight: '44px',
              textAlign: 'center',
              color: '#F9F9F9',
            }}>Common Questions</Stack>
            <Stack mt={'40px'} gap={'16px'} width={"100%"}>
              {
                commonQuestion.map((item, index) => (
                  <Link key={index} to={item.link} target={"_blank"}>
                    <Stack flexDirection={'row'} justifyContent={"space-between"} alignItems={"center"} key={index}
                           bgcolor={"#1F2329"} px={"40px"} py={"24px"} width={'100%'} borderRadius={"8px"}
                           sx={{
                             cursor: "pointer",
                             color: "#F9F9F9CC",
                             "&:hover": {
                               color: "#F69C00",
                               "& svg": {
                                 path: {
                                   fill: "#F69C00"
                                 }
                               }
                             }
                           }}
                    >
                      <Stack sx={{
                        fontSize: "16px",
                        lineHeight: "22px",
                        fontWeight: 700,
                      }}>
                        {"• "}{item.title}
                      </Stack>
                      <Stack>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" clipRule="evenodd"
                                d="M17.0664 11.6465C17.2617 11.8418 17.2617 12.1584 17.0664 12.3536L8.58116 20.8389C8.3859 21.0342 8.06932 21.0342 7.87406 20.8389L7.14615 20.111C6.95089 19.9157 6.95089 19.5992 7.14615 19.4039L14.55 12.0001L7.14615 4.59625C6.95089 4.40099 6.95089 4.0844 7.14615 3.88914L7.87406 3.16124C8.06932 2.96597 8.3859 2.96597 8.58116 3.16124L17.0664 11.6465Z"
                                fill="#F9F9F9CC" fillOpacity="0.6"/>
                        </svg>
                      </Stack>
                    </Stack>
                  </Link>
                ))
              }
            </Stack>
          </Stack>
        </Stack>
        <Stack zIndex={10} width={'100%'} alignItems={'center'}
               py={'120px'}>
          <Stack sx={{
            fontSize: '32px',
            fontWeight: '700',
            lineHeight: '44px',
            textAlign: 'center',
            color: '#F9F9F9CC',
          }}>
            <Trans>
              Integrations & Partners
            </Trans>
          </Stack>
          <Grid container mt={'48px'} spacing={'40px'} maxWidth={'1200px'} justifyContent={"center"}>
            {
              integrations.map((item, index) => (
                <Grid item key={index} xl={2}>
                  <Link to={item.href} target={'_blank'}>
                    <Stack width={'184px'} height={"72px"} bgcolor={'#1F2329'} borderRadius={'12px'} sx={{
                      justifyContent: "center",
                      alignItems: "center",
                      cursor: 'pointer',
                      '#color': {
                        display: 'none',
                      },
                      '&:hover': {
                        '#black': {
                          display: 'none',
                        },
                        '#color': {
                          display: 'block',
                        },
                      },
                    }}>
                      <Stack width={'144px'} height={'48px'} alignItems={'center'} justifyContent={'center'}>
                        <img src={item.black} alt={''} id={'black'}/>
                        <img src={item.img} alt={''} id={'color'}/>
                      </Stack>
                    </Stack>
                  </Link>
                </Grid>
              ))
            }
          </Grid>
        </Stack>
        <Stack maxWidth={'1200px'} marginTop={'40px'} width={'100%'}
               zIndex={10} borderRadius={'8px'} padding={'20px'}
               sx={{
                 background: 'linear-gradient(0deg, #3D404D 0%, #222529 100%)',
               }}
        >
          <img src={`/images/home_icon2_${lang}.svg`} alt={''}/>
        </Stack>
        <Stack position={'absolute'} bottom={800} left={0} width={'100%'} height={'560px'} sx={{
          backgroundImage: `url('/images/home_bg2.svg')`,
          backgroundPosition: 'top',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}/>
        <Stack width={'100%'} height={'840px'} zIndex={10} justifyContent={"center"} alignItems={'center'} sx={{
          background: 'linear-gradient(180deg, #1D2129 0%, #171A1F 100%)',
          paddingY: 10,
        }} ref={pcDownloadRef}>
          <Stack maxWidth={'1200px'} width={"100%"} direction={"row"} height={"680px"}>
            <Stack width={0} zIndex={10} position={"relative"}>
              <img src={`/images/app.png`} alt={''} height={680} width={313} style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                marginLeft: "80px",
              }}/>
            </Stack>
            <Stack direction={"row"} width={"100%"} mt={"32px"} height={"600px"} justifyContent={"center"}
                   alignItems={"center"} sx={{
              backgroundColor: "#171A1F",
              borderRadius: "40px",
              border: "1px solid rgba(255, 255, 255, 0.08)",
            }}>
              <Stack width={"30%"}></Stack>
              <Stack alignItems={"start"}>
                <Stack direction={"row"} alignItems={"baseline"} sx={{
                  fontSize: '32px',
                  fontWeight: '700',
                  lineHeight: '44px',
                  textAlign: 'center',
                  color: 'white',
                }}>
                  <span style={{paddingRight: "10px", fontSize: "48px", lineHeight: "60px", fontWeight: "700"}}>
                     0
                  </span>
                  <Trans>
                    trading fees,
                  </Trans>
                </Stack>
                <Stack direction={"row"} alignItems={"baseline"} sx={{
                  fontSize: '32px',
                  fontWeight: '700',
                  lineHeight: '44px',
                  textAlign: 'center',
                  color: 'white',
                }}>
                  <span style={{paddingRight: "10px", fontSize: "48px", lineHeight: "60px", fontWeight: "700"}}>
                     0
                  </span>
                  <Trans>
                    slippage trading at any time
                  </Trans>
                </Stack>
                <Stack direction={"row"} spacing={'24px'} alignItems={"center"} mt={"48px"}>
                  <Stack sx={{
                    padding: "12px",
                    backgroundColor: "rgba(31, 35, 41, 1)",
                    borderRadius: "12px",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                  }}>
                    <Box sx={{
                      width: "120px",
                      height: "120px",
                      backgroundColor: "white",
                      padding: "4px",
                    }}>
                      <QRCodeCanvas value={"https://www.arithfi.com/download.html"} size={112}/>
                    </Box>
                  </Stack>
                  <Stack spacing={"12px"}>
                    <Stack sx={(theme) => ({
                      fontSize: "14px",
                      lineHeight: "20px",
                      color: "rgba(249, 249, 249, 0.8)",
                    })}>
                      <Trans>Scan to Download App</Trans>
                    </Stack>
                    <Stack direction={"row"} spacing={"8px"}>
                      <Link to={"https://itunes.apple.com/us/app/6475583769"} target={"_blank"}>
                        <Stack direction={"row"} spacing={"8px"} alignItems={"center"} sx={{
                          padding: "8px",
                          borderRadius: "8px",
                          border: "1px solid rgba(255, 255, 255, 0.08)",
                          backgroundColor: "rgba(31, 35, 41, 1)",
                          height: "40px",
                        }}>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                               xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M11.9531 5.6588C11.9941 4.54303 12.3076 3.56297 12.8862 2.7437C13.4677 1.92028 14.429 1.33535 15.7448 1.00391C15.7536 1.04443 15.7627 1.08497 15.7721 1.12536V1.33736C15.7721 1.81808 15.6555 2.36931 15.4254 2.97564C15.1842 3.56271 14.8072 4.11524 14.3066 4.61391C13.8383 5.0533 13.4051 5.3442 13.0223 5.4757C12.8959 5.51345 12.7226 5.5506 12.5133 5.58405C12.3271 5.61305 12.1404 5.638 11.9531 5.6588Z"
                              fill="#F9F9F9"/>
                            <path
                              d="M12.1741 7.31455C10.6878 7.31455 9.65583 6 8.18968 6C6.72358 6 3.70312 7.3476 3.70312 12C3.70312 16.6524 6.38532 19.65 6.68532 20C6.98527 20.35 7.67908 21.2498 8.75393 21.2498C9.82883 21.2498 11.0056 20.3951 12.1741 20.3951C13.3426 20.3951 14.8134 21.2498 15.7736 21.2498C16.7338 21.2498 17.1288 20.8583 17.7823 20.1831C18.4357 19.508 19.6822 17.4476 20.1175 16.2111C19.4005 15.7843 17.5001 14.6256 17.5001 12C17.5001 10.2497 18.1397 8.7955 19.4191 7.63765C18.5798 6.5459 17.6064 6 16.4988 6C14.8375 6 13.6605 7.31455 12.1741 7.31455Z"
                              fill="#F9F9F9" stroke="#F9F9F9" strokeWidth="2.77083" strokeLinejoin="round"/>
                          </svg>
                        </Stack>
                      </Link>
                      <Link to={"https://play.google.com/store/apps/details?id=com.arithfi"} target={"_blank"}>
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect width="40" height="40" rx="8" fill="#1F2329"/>
                          <rect x="0.5" y="0.5" width="39" height="39" rx="7.5" stroke="white" strokeOpacity="0.08"/>
                          <g clipPath="url(#clip0_20964_110009)">
                            <path
                              d="M19.8259 19.5195L10.5859 29.1795C10.8859 30.1995 11.8459 30.9795 12.9859 30.9795C13.4659 30.9795 13.8859 30.8595 14.2459 30.6195L24.6859 24.6795L19.8259 19.5195Z"
                              fill="#EA4335"/>
                            <path
                              d="M29.1806 17.8398L24.6806 15.2598L19.6406 19.6998L24.7406 24.6798L29.2406 22.1598C30.0206 21.7398 30.5606 20.8998 30.5606 19.9998C30.5006 19.0998 29.9606 18.2598 29.1806 17.8398Z"
                              fill="#FBBC04"/>
                            <path
                              d="M10.5834 10.8203C10.5234 11.0003 10.5234 11.2403 10.5234 11.4803V28.5803C10.5234 28.8203 10.5234 29.0003 10.5834 29.2403L20.1834 19.8203L10.5834 10.8203Z"
                              fill="#4285F4"/>
                            <path
                              d="M19.8859 19.9995L24.6859 15.2595L14.3059 9.37953C13.9459 9.13953 13.4659 9.01953 12.9859 9.01953C11.8459 9.01953 10.8259 9.79953 10.5859 10.8195L19.8859 19.9995Z"
                              fill="#34A853"/>
                          </g>
                          <defs>
                            <clipPath id="clip0_20964_110009">
                              <rect width="24" height="24" fill="white" transform="translate(8 8)"/>
                            </clipPath>
                          </defs>
                        </svg>
                      </Link>
                      <Link to={"https://testflight.apple.com/join/SEb1TLyN"} target={"_blank"}>
                        <Stack direction={"row"} spacing={"8px"} alignItems={"center"} sx={{
                          backgroundColor: "rgba(31, 35, 41, 1)",
                          height: "40px",
                          borderRadius: "8px",
                        }}>
                          <svg width="40" height="40" viewBox="0 0 40 40" fill="none"
                               xmlns="http://www.w3.org/2000/svg">
                            <rect width="40" height="40" rx="8" fill="#1F2329"/>
                            <rect x="0.5" y="0.5" width="39" height="39" rx="7.5" stroke="white" stroke-opacity="0.08"/>
                            <path
                              d="M19.9531 9.6588C19.9941 8.54303 20.3076 7.56297 20.8862 6.7437C21.4677 5.92028 22.429 5.33535 23.7448 5.00391C23.7536 5.04443 23.7627 5.08497 23.7721 5.12536V5.33736C23.7721 5.81808 23.6555 6.36931 23.4254 6.97564C23.1842 7.56271 22.8072 8.11524 22.3066 8.61391C21.8383 9.0533 21.4051 9.3442 21.0223 9.4757C20.8959 9.51345 20.7226 9.5506 20.5133 9.58405C20.3271 9.61305 20.1404 9.638 19.9531 9.6588Z"
                              fill="#F9F9F9"/>
                            <path
                              d="M20.1741 11.3145C18.6878 11.3145 17.6558 10 16.1897 10C14.7236 10 11.7031 11.3476 11.7031 16C11.7031 20.6524 14.3853 23.65 14.6853 24C14.9853 24.35 15.6791 25.2498 16.7539 25.2498C17.8288 25.2498 19.0056 24.3951 20.1741 24.3951C21.3426 24.3951 22.8134 25.2498 23.7736 25.2498C24.7338 25.2498 25.1288 24.8583 25.7823 24.1831C26.4357 23.508 27.6822 21.4476 28.1175 20.2111C27.4005 19.7843 25.5001 18.6256 25.5001 16C25.5001 14.2497 26.1397 12.7955 27.4191 11.6377C26.5798 10.5459 25.6064 10 24.4988 10C22.8375 10 21.6605 11.3145 20.1741 11.3145Z"
                              fill="#F9F9F9" stroke="#F9F9F9" stroke-width="2.77083" stroke-linejoin="round"/>
                            <path d="M0 30H40V32C40 36.4183 36.4183 40 32 40H8C3.58172 40 0 36.4183 0 32V30Z"
                                  fill="#3D69FF"/>
                            <path
                              d="M8.90723 36H8.40918V32.1592H7.05273V31.7168H10.2637V32.1592H8.90723V36ZM12.1943 36.0586C11.7197 36.0586 11.3447 35.9141 11.0693 35.625C10.7959 35.3359 10.6592 34.9346 10.6592 34.4209C10.6592 33.9033 10.7861 33.4922 11.04 33.1875C11.2959 32.8828 11.6387 32.7305 12.0684 32.7305C12.4707 32.7305 12.7891 32.8633 13.0234 33.1289C13.2578 33.3926 13.375 33.7412 13.375 34.1748V34.4824H11.1631C11.1729 34.8594 11.2676 35.1455 11.4473 35.3408C11.6289 35.5361 11.8838 35.6338 12.2119 35.6338C12.5576 35.6338 12.8994 35.5615 13.2373 35.417V35.8506C13.0654 35.9248 12.9023 35.9775 12.748 36.0088C12.5957 36.042 12.4111 36.0586 12.1943 36.0586ZM12.0625 33.1377C11.8047 33.1377 11.5986 33.2217 11.4443 33.3896C11.292 33.5576 11.2021 33.79 11.1748 34.0869H12.8535C12.8535 33.7803 12.7852 33.5459 12.6484 33.3838C12.5117 33.2197 12.3164 33.1377 12.0625 33.1377ZM16.2783 35.124C16.2783 35.4229 16.167 35.6533 15.9443 35.8154C15.7217 35.9775 15.4092 36.0586 15.0068 36.0586C14.5811 36.0586 14.249 35.9912 14.0107 35.8564V35.4053C14.165 35.4834 14.3301 35.5449 14.5059 35.5898C14.6836 35.6348 14.8545 35.6572 15.0186 35.6572C15.2725 35.6572 15.4678 35.6172 15.6045 35.5371C15.7412 35.4551 15.8096 35.3311 15.8096 35.165C15.8096 35.04 15.7549 34.9336 15.6455 34.8457C15.5381 34.7559 15.3271 34.6504 15.0127 34.5293C14.7139 34.418 14.501 34.3213 14.374 34.2393C14.249 34.1553 14.1553 34.0605 14.0928 33.9551C14.0322 33.8496 14.002 33.7236 14.002 33.5771C14.002 33.3154 14.1084 33.1094 14.3213 32.959C14.5342 32.8066 14.8262 32.7305 15.1973 32.7305C15.543 32.7305 15.8809 32.8008 16.2109 32.9414L16.0381 33.3369C15.7158 33.2041 15.4238 33.1377 15.1621 33.1377C14.9316 33.1377 14.7578 33.1738 14.6406 33.2461C14.5234 33.3184 14.4648 33.418 14.4648 33.5449C14.4648 33.6309 14.4863 33.7041 14.5293 33.7646C14.5742 33.8252 14.6455 33.8828 14.7432 33.9375C14.8408 33.9922 15.0283 34.0713 15.3057 34.1748C15.6865 34.3135 15.9434 34.4531 16.0762 34.5938C16.2109 34.7344 16.2783 34.9111 16.2783 35.124ZM18.1094 35.6572C18.1953 35.6572 18.2783 35.6514 18.3584 35.6396C18.4385 35.626 18.502 35.6123 18.5488 35.5986V35.9707C18.4961 35.9961 18.418 36.0166 18.3145 36.0322C18.2129 36.0498 18.1211 36.0586 18.0391 36.0586C17.418 36.0586 17.1074 35.7314 17.1074 35.0771V33.167H16.6475V32.9326L17.1074 32.7305L17.3125 32.0449H17.5938V32.7891H18.5254V33.167H17.5938V35.0566C17.5938 35.25 17.6396 35.3984 17.7314 35.502C17.8232 35.6055 17.9492 35.6572 18.1094 35.6572ZM22.1992 33.167H21.3818V36H20.8955V33.167H20.3213V32.9473L20.8955 32.7715V32.5928C20.8955 31.8037 21.2402 31.4092 21.9297 31.4092C22.0996 31.4092 22.2988 31.4434 22.5273 31.5117L22.4014 31.9014C22.2139 31.8408 22.0537 31.8105 21.9209 31.8105C21.7373 31.8105 21.6016 31.8721 21.5137 31.9951C21.4258 32.1162 21.3818 32.3115 21.3818 32.5811V32.7891H22.1992V33.167ZM23.2715 36H22.7852V32.7891H23.2715V36ZM22.7441 31.9189C22.7441 31.8076 22.7715 31.7266 22.8262 31.6758C22.8809 31.623 22.9492 31.5967 23.0312 31.5967C23.1094 31.5967 23.1768 31.623 23.2334 31.6758C23.29 31.7285 23.3184 31.8096 23.3184 31.9189C23.3184 32.0283 23.29 32.1104 23.2334 32.165C23.1768 32.2178 23.1094 32.2441 23.0312 32.2441C22.9492 32.2441 22.8809 32.2178 22.8262 32.165C22.7715 32.1104 22.7441 32.0283 22.7441 31.9189ZM26.9307 32.7891V33.0967L26.3359 33.167C26.3906 33.2354 26.4395 33.3252 26.4824 33.4365C26.5254 33.5459 26.5469 33.6699 26.5469 33.8086C26.5469 34.123 26.4395 34.374 26.2246 34.5615C26.0098 34.749 25.7148 34.8428 25.3398 34.8428C25.2441 34.8428 25.1543 34.835 25.0703 34.8193C24.8633 34.9287 24.7598 35.0664 24.7598 35.2324C24.7598 35.3203 24.7959 35.3857 24.8682 35.4287C24.9404 35.4697 25.0645 35.4902 25.2402 35.4902H25.8086C26.1562 35.4902 26.4229 35.5635 26.6084 35.71C26.7959 35.8564 26.8896 36.0693 26.8896 36.3486C26.8896 36.7041 26.7471 36.9746 26.4619 37.1602C26.1768 37.3477 25.7607 37.4414 25.2139 37.4414C24.7939 37.4414 24.4697 37.3633 24.2412 37.207C24.0146 37.0508 23.9014 36.8301 23.9014 36.5449C23.9014 36.3496 23.9639 36.1807 24.0889 36.0381C24.2139 35.8955 24.3896 35.7988 24.6162 35.748C24.5342 35.7109 24.4648 35.6533 24.4082 35.5752C24.3535 35.4971 24.3262 35.4062 24.3262 35.3027C24.3262 35.1855 24.3574 35.083 24.4199 34.9951C24.4824 34.9072 24.5811 34.8223 24.7158 34.7402C24.5498 34.6719 24.4141 34.5557 24.3086 34.3916C24.2051 34.2275 24.1533 34.04 24.1533 33.8291C24.1533 33.4775 24.2588 33.207 24.4697 33.0176C24.6807 32.8262 24.9795 32.7305 25.3662 32.7305C25.5342 32.7305 25.6855 32.75 25.8203 32.7891H26.9307ZM24.3701 36.5391C24.3701 36.7129 24.4434 36.8447 24.5898 36.9346C24.7363 37.0244 24.9463 37.0693 25.2197 37.0693C25.6279 37.0693 25.9297 37.0078 26.125 36.8848C26.3223 36.7637 26.4209 36.5986 26.4209 36.3896C26.4209 36.2158 26.3672 36.0947 26.2598 36.0264C26.1523 35.96 25.9502 35.9268 25.6533 35.9268H25.0703C24.8496 35.9268 24.6777 35.9795 24.5547 36.085C24.4316 36.1904 24.3701 36.3418 24.3701 36.5391ZM24.6338 33.8174C24.6338 34.042 24.6973 34.2119 24.8242 34.3271C24.9512 34.4424 25.1279 34.5 25.3545 34.5C25.8291 34.5 26.0664 34.2695 26.0664 33.8086C26.0664 33.3262 25.8262 33.085 25.3457 33.085C25.1172 33.085 24.9414 33.1465 24.8184 33.2695C24.6953 33.3926 24.6338 33.5752 24.6338 33.8174ZM29.7871 36V33.9229C29.7871 33.6611 29.7275 33.4658 29.6084 33.3369C29.4893 33.208 29.3027 33.1436 29.0488 33.1436C28.7109 33.1436 28.4639 33.2354 28.3076 33.4189C28.1533 33.6025 28.0762 33.9033 28.0762 34.3213V36H27.5898V31.4414H28.0762V32.8213C28.0762 32.9873 28.0684 33.125 28.0527 33.2344H28.082C28.1777 33.0801 28.3135 32.959 28.4893 32.8711C28.667 32.7812 28.8691 32.7363 29.0957 32.7363C29.4883 32.7363 29.7822 32.8301 29.9775 33.0176C30.1748 33.2031 30.2734 33.499 30.2734 33.9053V36H29.7871ZM32.3125 35.6572C32.3984 35.6572 32.4814 35.6514 32.5615 35.6396C32.6416 35.626 32.7051 35.6123 32.752 35.5986V35.9707C32.6992 35.9961 32.6211 36.0166 32.5176 36.0322C32.416 36.0498 32.3242 36.0586 32.2422 36.0586C31.6211 36.0586 31.3105 35.7314 31.3105 35.0771V33.167H30.8506V32.9326L31.3105 32.7305L31.5156 32.0449H31.7969V32.7891H32.7285V33.167H31.7969V35.0566C31.7969 35.25 31.8428 35.3984 31.9346 35.502C32.0264 35.6055 32.1523 35.6572 32.3125 35.6572Z"
                              fill="white"/>
                            <rect x="0.5" y="0.5" width="39" height="39" rx="7.5" stroke="#31353A"/>
                          </svg>
                        </Stack>
                      </Link>
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        <Stack width={'100%'} fontSize={'20px'} fontWeight={'700'} lineHeight={'28px'}
               height={'128px'} justifyContent={'center'} zIndex={10}
               sx={{
                 backgroundColor: '#292E3D',
                 color: 'white',
               }}
               alignItems={'center'}>
          <Stack maxWidth={'1200px'} width={'100%'} px={'40px'} direction={'row'} justifyContent={'space-between'}
                 alignItems={'center'}>
            <Stack gap={'25px'} direction={'row'} alignItems={"center"}>
              <Stack>
                <Trans>
                  Enjoy 0 trading fees & 0 slippage trading on ArithFi
                </Trans>
              </Stack>
              <Stack>
                <img src={'/images/home_icon2.svg'} alt={''}/>
              </Stack>
            </Stack>
            <Link to={'/futures'}>
              <Stack direction={'row'} spacing={'12px'}
                     sx={{
                       backgroundColor: '#F69C00',
                       height: '48px',
                       width: '200px',
                       fontSize: '16px',
                       fontWeight: '700',
                       lineHeight: '22px',
                       borderRadius: '12px',
                       alignItems: 'center',
                       justifyContent: 'center',
                       color: '#030308',
                       cursor: 'pointer',
                       '&:hover': {
                         backgroundColor: '#FFC933',
                       }
                     }}>
                <div>
                  <Trans>
                    Start Trading
                  </Trans>
                </div>
                <img src={'/images/home_icon10.svg'} alt={''}/>
              </Stack>
            </Link>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default Home