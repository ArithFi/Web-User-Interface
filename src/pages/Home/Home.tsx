import {Trans, t} from "@lingui/macro";
import {Stack} from "@mui/system";
import useWindowWidth from "../../hooks/useWindowWidth";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Divider from "@mui/material/Divider";
import {TradeCard} from "./TradeCard";
import {Box, Grid} from "@mui/material";
import {QRCodeCanvas} from "qrcode.react";

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
                        Download on the
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
                      Download on the
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
        <Stack direction={"row"} zIndex={10} justifyContent={"space-between"} width={'100%'} maxWidth={1200} mt={"100px"}>
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
                  <br/>
                  <Trans>iOS & Android</Trans>
                </Stack>
                <Stack direction={"row"} spacing={"8px"}>
                  <Link to={"https://itunes.apple.com/us/app/6475583769"} target={"_blank"}>
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="40" height="40" rx="8" fill="#1F2329"/>
                      <rect x="0.5" y="0.5" width="39" height="39" rx="7.5" stroke="white" strokeOpacity="0.08"/>
                      <path
                        d="M19.9531 13.6588C19.9941 12.543 20.3076 11.563 20.8862 10.7437C21.4677 9.92028 22.429 9.33535 23.7448 9.00391C23.7536 9.04443 23.7627 9.08497 23.7721 9.12536V9.33736C23.7721 9.81808 23.6555 10.3693 23.4254 10.9756C23.1842 11.5627 22.8072 12.1152 22.3066 12.6139C21.8383 13.0533 21.4051 13.3442 21.0223 13.4757C20.8959 13.5135 20.7226 13.5506 20.5133 13.5841C20.3271 13.6131 20.1404 13.638 19.9531 13.6588Z"
                        fill="#F9F9F9"/>
                      <path
                        d="M20.1741 15.3145C18.6878 15.3145 17.6558 14 16.1897 14C14.7236 14 11.7031 15.3476 11.7031 20C11.7031 24.6524 14.3853 27.65 14.6853 28C14.9853 28.35 15.6791 29.2498 16.7539 29.2498C17.8288 29.2498 19.0056 28.3951 20.1741 28.3951C21.3426 28.3951 22.8134 29.2498 23.7736 29.2498C24.7338 29.2498 25.1288 28.8583 25.7823 28.1831C26.4357 27.508 27.6822 25.4476 28.1175 24.2111C27.4005 23.7843 25.5001 22.6256 25.5001 20C25.5001 18.2497 26.1397 16.7955 27.4191 15.6377C26.5798 14.5459 25.6064 14 24.4988 14C22.8375 14 21.6605 15.3145 20.1741 15.3145Z"
                        fill="#F9F9F9" stroke="#F9F9F9" strokeWidth="2.77083" strokeLinejoin="round"/>
                    </svg>
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
                      <br/>
                      <Trans>iOS & Android</Trans>
                    </Stack>
                    <Stack direction={"row"} spacing={"8px"}>
                      <Link to={"https://itunes.apple.com/us/app/6475583769"} target={"_blank"}>
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect width="40" height="40" rx="8" fill="#1F2329"/>
                          <rect x="0.5" y="0.5" width="39" height="39" rx="7.5" stroke="white" strokeOpacity="0.08"/>
                          <path
                            d="M19.9531 13.6588C19.9941 12.543 20.3076 11.563 20.8862 10.7437C21.4677 9.92028 22.429 9.33535 23.7448 9.00391C23.7536 9.04443 23.7627 9.08497 23.7721 9.12536V9.33736C23.7721 9.81808 23.6555 10.3693 23.4254 10.9756C23.1842 11.5627 22.8072 12.1152 22.3066 12.6139C21.8383 13.0533 21.4051 13.3442 21.0223 13.4757C20.8959 13.5135 20.7226 13.5506 20.5133 13.5841C20.3271 13.6131 20.1404 13.638 19.9531 13.6588Z"
                            fill="#F9F9F9"/>
                          <path
                            d="M20.1741 15.3145C18.6878 15.3145 17.6558 14 16.1897 14C14.7236 14 11.7031 15.3476 11.7031 20C11.7031 24.6524 14.3853 27.65 14.6853 28C14.9853 28.35 15.6791 29.2498 16.7539 29.2498C17.8288 29.2498 19.0056 28.3951 20.1741 28.3951C21.3426 28.3951 22.8134 29.2498 23.7736 29.2498C24.7338 29.2498 25.1288 28.8583 25.7823 28.1831C26.4357 27.508 27.6822 25.4476 28.1175 24.2111C27.4005 23.7843 25.5001 22.6256 25.5001 20C25.5001 18.2497 26.1397 16.7955 27.4191 15.6377C26.5798 14.5459 25.6064 14 24.4988 14C22.8375 14 21.6605 15.3145 20.1741 15.3145Z"
                            fill="#F9F9F9" stroke="#F9F9F9" strokeWidth="2.77083" strokeLinejoin="round"/>
                        </svg>
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