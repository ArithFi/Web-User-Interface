import {Trans, t} from "@lingui/macro";
import {Stack} from "@mui/system";
import useWindowWidth from "../../hooks/useWindowWidth";
import {useEffect, useState} from "react";
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

  if (isBigMobile) {
    return (
      <Stack width={'100vw'} overflow={'hidden'} sx={{
        backgroundColor: 'white',
      }}>
        <Stack px={'20px'} alignItems={'center'} pt={'40px'} height={'840px'} pb={'40px'} gap={'40px'}
               position={'relative'}>
          <Stack position={'absolute'} zIndex={5} top={0} height={'840px'} width={'100%'}
                 sx={{
                   backgroundImage: `url('/images/home_bg2.svg')`,
                   backgroundPosition: 'center',
                   backgroundRepeat: 'no-repeat',
                   backgroundSize: 'cover',
                 }}
          >
          </Stack>
          <Stack zIndex={10} fontSize={'24px'} fontWeight={'700'} lineHeight={'32px'} textAlign={'center'}
                 color={'rgba(249, 249, 249, 1)'}>
            <Trans>ArithFi, the First Decentralized Derivatives Protocol Achieves 0 Trading Fees and 0 Slippage</Trans>
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
          <Stack zIndex={10} height={"660px"} alignItems={'center'}>
            <Stack>
              <img src={'/images/app.png'} alt={''} width={'203px'} height={'440px'}/>
            </Stack>
            <Stack direction={"row"} spacing={'12px'} justifyContent={'center'} mt={"40px"}>
              <Link to={"https://testflight.apple.com/join/SEb1TLyN"} target={"_blank"}>
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
          </Stack>
        </Stack>
        <Stack alignItems={'center'} py={'40px'} px={'20px'} sx={{
          boxShadow: '0px 8px 40px 0px rgba(9, 26, 178, 0.1)',
        }}>
          <Stack fontSize={'24px'} fontWeight={'700'} lineHeight={'32px'} color={'#030308'}>
            <Trans>How to Trade on ArithFi?</Trans>
          </Stack>
          <Stack alignItems={'center'} height={'204px'} mt={'40px'}>
            <Stack>
              <img src={'/images/home_icon3.svg'} alt={''}/>
            </Stack>
            <Stack mt={'24px'} fontSize={'18px'} fontWeight={'700'} lineHeight={'22px'} color={'rgba(3, 3, 8, 1)'}>
              <Trans>Trade With $ATF</Trans>
            </Stack>
            <Stack mt={'16px'} fontSize={'14px'} textAlign={'center'} fontWeight={'400'} lineHeight={'20px'}
                   color={'rgba(3, 3, 8, 0.6)'}>
              <Trans>Use $ATF as margin to open positions</Trans>
            </Stack>
          </Stack>
          <Stack alignItems={'center'} height={'204px'} mt={'24px'}>
            <Stack>
              <img src={'/images/home_icon4.svg'} alt={''}/>
            </Stack>
            <Stack mt={'24px'} fontSize={'18px'} fontWeight={'700'} lineHeight={'22px'} color={'rgba(3, 3, 8, 1)'}>
              <Trans>Earn $ATF</Trans>
            </Stack>
            <Stack mt={'16px'} fontSize={'14px'} textAlign={'center'} fontWeight={'400'} lineHeight={'20px'}
                   color={'rgba(3, 3, 8, 0.6)'}>
              <Trans>Make a profit, you will earn $ATF</Trans>
            </Stack>
          </Stack>
          <Stack alignItems={'center'} height={'204px'} mt={'24px'}>
            <Stack>
              <img src={'/images/home_icon5.svg'} alt={''}/>
            </Stack>
            <Stack mt={'24px'} fontSize={'18px'} fontWeight={'700'} lineHeight={'22px'} color={'rgba(3, 3, 8, 1)'}>
              <Trans>Burn $ATF</Trans>
            </Stack>
            <Stack mt={'16px'} fontSize={'14px'} textAlign={'center'} fontWeight={'400'} lineHeight={'20px'}
                   color={'rgba(3, 3, 8, 0.6)'}>
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
        <Stack py={'40px'} px={'20px'} alignItems={'center'} sx={{
          boxShadow: '0px 8px 40px 0px rgba(9, 26, 178, 0.1)',
        }}>
          <Stack sx={{
            fontSize: '24px',
            fontWeight: '700',
            lineHeight: '32px',
            maxWidth: '280px',
            textAlign: 'center',
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
                color: type === 0 ? 'rgba(246, 156, 0, 1)' : 'rgba(3, 3, 8, 1)',
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
                color: type === 0 ? 'rgba(3, 3, 8, 1)' : 'rgba(246, 156, 0, 1)',
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
            </Stack>
          </Stack>
        </Stack>
        <Stack pt={'60px'} pb={'80px'} alignItems={'center'} zIndex={10} sx={{
          background: 'linear-gradient(180deg, rgba(235, 245, 255, 0.40) 45.89%, rgba(255, 255, 255, 0.40) 99.72%)',
        }}>
          <Stack zIndex={10} alignItems={'center'} sx={{
            width: '100%',
            padding: '0 16px',
          }} justifyContent={'space-between'}>
            <div>
              <img src={'/images/home_icon13.svg'} alt={''} height={'240px'}/>
            </div>
            <Stack justifyContent={'center'} maxWidth={'600px'} alignItems={'center'} textAlign={'center'}>
              <Stack fontSize={'20px'} fontWeight={'700'} lineHeight={'28px'} color={'#1D2129'} sx={{
                opacity: 0.8
              }}>
                <Trans>
                  ATF Coin
                </Trans>
              </Stack>
              <Stack fontSize={'16px'} fontWeight={'400'} lineHeight={'22px'} mt={'8px'} color={'#1D2129'} sx={{
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
          <Stack fontSize={'24px'} fontWeight={'700'} color={'rgba(3, 3, 8, 1)'} mt={'100px'}>
            <Trans>
              Advantages of ArithFi
            </Trans>
          </Stack>
          <Stack direction={'row'} fontSize={'14px'} fontWeight={'400'} lineHeight={'20px'} color={'rgba(3, 3, 8, 1)'}
                 gap={'16px'} mt={'40px'}>
            <Stack px={'20px'} py={'12px'} color={'#030308'} bgcolor={'white'}
                   boxShadow={'0px 8px 40px 0px rgba(9, 26, 178, 0.10)'} borderRadius={'8px'} direction={'row'}
                   gap={'8px'} alignItems={'center'}>
              <img src={'/images/home_icon6.svg'} alt={''}/>
              <Trans>
                0 Trading Fees
              </Trans>
            </Stack>
            <Stack px={'20px'} py={'12px'} color={'#030308'} bgcolor={'white'}
                   boxShadow={'0px 8px 40px 0px rgba(9, 26, 178, 0.10)'} borderRadius={'8px'} direction={'row'}
                   gap={'8px'} alignItems={'center'}>
              <img src={'/images/home_icon6.svg'} alt={''}/>
              <Trans>
                0 Slippage
              </Trans>
            </Stack>
          </Stack>
          <Stack direction={'row'} fontSize={'14px'} fontWeight={'400'} lineHeight={'20px'} color={'rgba(3, 3, 8, 1)'}
                 gap={'16px'} mt={'16px'}>
            <Stack px={'20px'} py={'12px'} color={'#030308'} bgcolor={'white'}
                   boxShadow={'0px 8px 40px 0px rgba(9, 26, 178, 0.10)'} borderRadius={'8px'} direction={'row'}
                   gap={'8px'} alignItems={'center'}>
              <img src={'/images/home_icon6.svg'} alt={''}/>
              <Trans>
                Infinite Liquidity
              </Trans>
            </Stack>
            <Stack px={'20px'} py={'12px'} bgcolor={'white'} boxShadow={'0px 8px 40px 0px rgba(9, 26, 178, 0.10)'}
                   borderRadius={'8px'} direction={'row'} gap={'8px'} alignItems={'center'}>
              <img src={'/images/home_icon6.svg'} alt={''}/>
              <Trans>
                Deflationary
              </Trans>
            </Stack>
          </Stack>
        </Stack>
        <Stack pt={'64px'} pb={'80px'} px={'20px'} position={'relative'} sx={{
          background: 'linear-gradient(180deg, #EBF5FF 0%, #FFF 100%)'
        }}>
          <Stack position={'absolute'} right={0} top={-300}>
            <img src={'/images/home_icon7.svg'} alt={''}/>
          </Stack>
          <Stack maxWidth={'1200px'} width={'100%'} position={'relative'} alignItems={"center"} zIndex={10}>
            <Stack sx={{
              fontSize: '24px',
              fontWeight: '700',
              lineHeight: '32px',
              textAlign: 'center',
              color: 'rgba(3, 3, 8, 1)',
            }}>Common Questions</Stack>
            <Stack mt={'40px'} gap={'16px'} width={"100%"}>
              {
                commonQuestion.map((item, index) => (
                  <Link key={index} to={item.link} target={"_blank"}>
                    <Stack flexDirection={'row'} justifyContent={"space-between"} alignItems={"center"} key={index}
                           bgcolor={"white"} px={"40px"} py={"24px"} width={'100%'} borderRadius={"8px"}
                           sx={{
                             cursor: "pointer",
                             color: "rgba(3, 3, 8, 1)",
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
                                fill="#030308" fillOpacity="0.6"/>
                        </svg>
                      </Stack>
                    </Stack>
                  </Link>
                ))
              }
            </Stack>
          </Stack>
        </Stack>
        <Stack pt={'40px'} pb={'80px'} alignItems={'center'} bgcolor={'rgba(247, 251, 255, 1)'}>
          <Stack sx={{
            fontSize: '24px',
            lineHeight: '32px',
            fontWeight: '700',
            color: 'rgba(3, 3, 8, 1)',
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
                    <Stack width={'104px'} height={"40px"} bgcolor={'white'} borderRadius={'12px'} sx={{
                      justifyContent: "center",
                      alignItems: "center",
                      cursor: 'pointer',
                      '#color': {
                        display: 'none',
                      },
                      '&:hover': {
                        boxShadow: '0 8px 40px 0 rgba(9, 26, 178, 0.1)',
                        '#black': {
                          display: 'none',
                        },
                        '#color': {
                          display: 'block',
                        },
                      },
                    }}>
                      <Stack alignItems={'center'} justifyContent={'center'}>
                        <img src={item.black} alt={''} id={'black'} height={'40px'}/>
                        <img src={item.img} alt={''} id={'color'} height={'40px'}/>
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
                   background: 'white',
                   backgroundImage: `url('/images/home_bg3.png')`,
                   fill: 'linear-gradient(180deg, #EBF5FF 0%, #FFF 100%)',
                   stroke: 'rgba(255, 255, 255, 0.20)',
                 }}
                 borderRadius={'8px'} lineHeight={'32px'}>
            <Stack width={'100%'} alignItems={'center'}>
              <img src={'/images/home_icon9.svg'} alt={''}/>
            </Stack>
            <Stack fontSize={'24px'} fontWeight={'700'} alignItems={'center'} mt={'24px'} color={'#030308'}>
              <Trans>
                Roadmap of ArithFi
              </Trans>
            </Stack>
            <Stack fontSize={'14px'} fontWeight={'400'} lineHeight={'20px'} color={'rgba(3, 3, 8, 0.6)'} mt={'40px'}>
              <Trans>
                Expand more assets:
              </Trans>
            </Stack>
            <Stack fontSize={'16px'} fontWeight={'700'} lineHeight={'22px'} mt={'12px'}>
              <Trans>
                CryptoCurrencies, Forex, Precious Metal, Commodity, Stock
              </Trans>
            </Stack>
            <Stack fontSize={'14px'} fontWeight={'400'} lineHeight={'20px'} color={'rgba(3, 3, 8, 0.6)'} mt={'24px'}>
              <Trans>
                Expand more products:
              </Trans>
            </Stack>
            <Stack fontSize={'16px'} fontWeight={'700'} lineHeight={'22px'} mt={'12px'}>
              <Trans>
                Futures, Options, Structure Products
              </Trans>
            </Stack>
          </Stack>
        </Stack>
        <Stack height={"660px"} alignItems={'center'} sx={{
          background: 'linear-gradient(180deg, #3D404D 50%, #1A1D23 100%)'
        }}>
          <Stack alignItems={"center"} pt={"20px"}>
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
          <Stack direction={"row"} spacing={'12px'} justifyContent={'center'} mt={"24px"}>
            <Link to={"https://testflight.apple.com/join/SEb1TLyN"} target={"_blank"}>
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
                      <a href={item.url} key={index} target={'_blank'}>
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
                      <a href={item.url} key={index} target={'_blank'}>
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
      backgroundColor: 'white',
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
        <Stack position={'absolute'} zIndex={0} bottom={0} width={'100%'} height={'100%'} sx={{
          background: 'linear-gradient(180deg, rgba(235, 245, 255, 0.40) 45.89%, rgba(255, 255, 255, 0.40) 99.72%)'
        }}>
        </Stack>
        <Stack direction={"row"} zIndex={10} justifyContent={"space-between"} width={'100%'} maxWidth={1200}
               mt={"100px"}>
          <Stack spacing={"24px"}>
            <Stack sx={{
              fontSize: '32px',
              fontWeight: '700',
              lineHeight: '44px',
              textAlign: 'start',
              color: '#F9F9F9',
              maxWidth: '600px',
            }}>
              <Stack>
                <Trans>
                  ArithFi,
                </Trans>
              </Stack>
              <Stack>
                <Trans>
                  the First Decentralized Derivatives Protocol Achieves
                </Trans>
              </Stack>
              <Stack>
                <Trans>
                  0 Trading Fees and 0 Slippage
                </Trans>
              </Stack>
            </Stack>
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
            <Stack direction={"row"} spacing={'24px'} alignItems={"center"}>
              <Stack sx={{
                padding: "12px",
                backgroundColor: "rgba(31, 35, 41, 1)",
                borderRadius: "12px"
              }}>
                <Box sx={{
                  width: "80px",
                  height: "80px",
                  backgroundColor: "white",
                  padding: "4px",
                }}>
                  <QRCodeCanvas value={"https://www.arithfi.com/download.html"} size={72} />
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
                </Stack>
              </Stack>
            </Stack>
          </Stack>
          <Stack sx={{
            width: 440,
          }}>
            <img src={'/images/app3.png'} alt={''}/>
          </Stack>
        </Stack>
        <Stack zIndex={'20'} position={'relative'} sx={{
          marginTop: '100px',
          maxWidth: '1200px',
          width: '100%',
          alignItems: 'center',
          padding: '0 48px 48px 48px',
          borderRadius: '18px',
          backgroundColor: 'white',
          filter: 'drop-shadow(0px 8px 40px rgba(9, 26, 178, 0.10))'
        }}>
          <Stack direction={'row'} maxWidth={'1200px'} width={'100%'} position={'absolute'} top={0}
                 justifyContent={'space-between'}>
            <img src={'/images/home_left.png'} alt={''} style={{
              height: '68px',
            }}/>
            <img src={'/images/home_right.png'} alt={''} style={{
              height: '68px',
            }}/>
          </Stack>
          <Stack color={'#030308'} sx={{
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
              }} color={'#030308'}>
                <Trans>
                  Trade With $ATF
                </Trans>
              </Stack>
              <Stack sx={{
                fontSize: '16px',
                fontWeight: '400',
                lineHeight: '22px',
                textAlign: 'center',
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
              <Stack color={'#030308'} sx={{
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
              <Stack color={'#030308'} sx={{
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
                   color: 'white',
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
            color: '#030308',
          }}>Catch Your Next Trading Opportunity</Stack>
          <Stack mt={'48px'} width={'100%'} spacing={'16px'} direction={'row'}>
            <Stack sx={{
              padding: '20px',
              borderRadius: '8px',
              backgroundColor: 'white',
              width: '50%',
            }} spacing={'12px'} boxShadow={'0px 8px 40px 0px rgba(9, 26, 178, 0.10)'}>
              <Stack sx={{
                fontSize: '24px',
                fontWeight: '700',
                lineHeight: '32px',
                color: '#030308',
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
              </Stack>
            </Stack>
            <Stack sx={{
              padding: '20px',
              borderRadius: '8px',
              backgroundColor: 'white',
              width: '50%',
            }} spacing={'12px'} boxShadow={'0px 8px 40px 0px rgba(9, 26, 178, 0.10)'}>
              <Stack sx={{
                fontSize: '24px',
                fontWeight: '700',
                lineHeight: '32px',
                color: '#030308',
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
            <Stack fontSize={'32px'} fontWeight={'700'} lineHeight={'44px'}>
              <Trans>
                ATF Coin
              </Trans>
            </Stack>
            <Stack fontSize={'16px'} fontWeight={'400'} lineHeight={'22px'}>
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
        <Stack color={'#030308'} zIndex={10} sx={{
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
          <Stack direction={'row'} spacing={'8px'} bgcolor={'white'} alignItems={'center'} sx={{
            padding: '16px 24px',
            fontSize: '16px',
            fontWeight: '400',
            lineHeight: '22px',
            boxShadow: '0px 8px 40px 0px rgba(9, 26, 178, 0.10)',
            borderRadius: '8px',
          }}>
            <img src={'/images/home_icon6.svg'} alt={''}/>
            <div>
              <Trans>0 Trading Fees</Trans>
            </div>
          </Stack>
          <Stack direction={'row'} spacing={'8px'} bgcolor={'white'} alignItems={'center'} sx={{
            padding: '16px 24px',
            fontSize: '16px',
            fontWeight: '400',
            lineHeight: '22px',
            boxShadow: '0px 8px 40px 0px rgba(9, 26, 178, 0.10)',
            borderRadius: '8px',
          }}>
            <img src={'/images/home_icon6.svg'} alt={''}/>
            <div>
              <Trans>
                0 Slippage
              </Trans>
            </div>
          </Stack>
          <Stack direction={'row'} spacing={'8px'} bgcolor={'white'} alignItems={'center'} sx={{
            padding: '16px 24px',
            fontSize: '16px',
            fontWeight: '400',
            lineHeight: '22px',
            boxShadow: '0px 8px 40px 0px rgba(9, 26, 178, 0.10)',
            borderRadius: '8px',
          }}>
            <img src={'/images/home_icon6.svg'} alt={''}/>
            <div>
              <Trans>
                Infinite Liquidity
              </Trans>
            </div>
          </Stack>
          <Stack direction={'row'} spacing={'8px'} bgcolor={'white'} alignItems={'center'} sx={{
            padding: '16px 24px',
            fontSize: '16px',
            fontWeight: '400',
            lineHeight: '22px',
            boxShadow: '0px 8px 40px 0px rgba(9, 26, 178, 0.10)',
            borderRadius: '8px',
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
        <Stack width={'100%'} paddingTop={'80px'} paddingBottom={'80px'} zIndex={10} alignItems={'center'} sx={{
          background: 'linear-gradient(180deg, #EBF5FF 0%, #FFF 100%)'
        }}>
          <Stack position={'absolute'} right={0} zIndex={5} top={-200}>
            <img src={'/images/home_icon11.svg'} alt={''}/>
          </Stack>
          <Stack maxWidth={'1200px'} width={'100%'} position={'relative'} alignItems={"center"} zIndex={10} px={"20px"}>
            <Stack sx={{
              fontSize: '32px',
              fontWeight: '700',
              lineHeight: '44px',
              textAlign: 'center',
              color: 'rgba(3, 3, 8, 1)',
            }}>Common Questions</Stack>
            <Stack mt={'40px'} gap={'16px'} width={"100%"}>
              {
                commonQuestion.map((item, index) => (
                  <Link key={index} to={item.link} target={"_blank"}>
                    <Stack flexDirection={'row'} justifyContent={"space-between"} alignItems={"center"} key={index}
                           bgcolor={"white"} px={"40px"} py={"24px"} width={'100%'} borderRadius={"8px"}
                           sx={{
                             cursor: "pointer",
                             color: "rgba(3, 3, 8, 1)",
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
                                fill="#030308" fillOpacity="0.6"/>
                        </svg>
                      </Stack>
                    </Stack>
                  </Link>
                ))
              }
            </Stack>
          </Stack>
        </Stack>
        <Stack zIndex={10} width={'100%'} bgcolor={'rgba(247, 251, 255, 1)'} alignItems={'center'}
               py={'120px'}>
          <Stack sx={{
            fontSize: '32px',
            fontWeight: '700',
            lineHeight: '44px',
            textAlign: 'center',
            color: 'rgba(3, 3, 8, 1)',
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
                    <Stack width={'184px'} height={"72px"} bgcolor={'white'} borderRadius={'12px'} sx={{
                      justifyContent: "center",
                      alignItems: "center",
                      cursor: 'pointer',
                      '#color': {
                        display: 'none',
                      },
                      '&:hover': {
                        boxShadow: '0 8px 40px 0 rgba(9, 26, 178, 0.1)',
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
        <Stack maxWidth={'1200px'} marginTop={'40px'} bgcolor={'white'} width={'100%'}
               zIndex={10} borderRadius={'8px'} padding={'20px'}
               sx={{
                 background: 'linear-gradient(358deg, #3D404D 1.38%, #222529 98.62%)',
               }}
        >
          <img src={`/images/home_icon2_${lang}.svg`} alt={''}/>
        </Stack>
        <Stack position={'absolute'} bottom={800} left={0} width={'100%'} height={'1400px'}
               bgcolor={'rgba(247, 251, 255, 1)'}/>
        <Stack position={'absolute'} bottom={800} left={0} width={'100%'} height={'640px'} sx={{
          backgroundImage: `url('/images/home_bg2.svg')`,
          backgroundPosition: 'top',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}/>
        <Stack width={'100%'} height={'840px'} zIndex={10} justifyContent={"center"} alignItems={'center'} sx={{
          background: 'linear-gradient(180deg, #1D2129 0%, #171A1F 100%)',
          paddingY: 10,
        }}>
          <Stack maxWidth={'1200px'} width={"100%"} direction={"row"} height={"680px"}>
            <Stack width={0} zIndex={10} position={"relative"}>
              <img src={`/images/app.png`} alt={''} height={680} width={313} style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                marginLeft: "80px",
              }}/>
            </Stack>
            <Stack direction={"row"} width={"100%"} mt={"32px"} height={"600px"} justifyContent={"center"} alignItems={"center"} sx={{
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
                      <QRCodeCanvas value={"https://www.arithfi.com/download.html"} size={112} />
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