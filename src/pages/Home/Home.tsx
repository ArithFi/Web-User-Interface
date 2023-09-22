import {Trans} from "@lingui/macro";
import {Stack} from "@mui/system";
import useWindowWidth from "../../hooks/useWindowWidth";

const Home = () => {
  const {isBigMobile} = useWindowWidth();

  if (isBigMobile) {
    return (
      <Stack>
        <Stack px={'20px'} alignItems={'center'} pt={'120px'} pb={'80px'} gap={'40px'} position={'relative'}>
          <Stack position={'absolute'} zIndex={5} top={0} height={'400px'} width={'100%'}
                 sx={{
                   backgroundImage: `url('/images/home_bg2.svg')`,
                   backgroundPosition: 'center',
                   backgroundRepeat: 'no-repeat',
                   backgroundSize: 'cover',
                 }}
          >
          </Stack>
          <Stack zIndex={10} fontSize={'24px'} fontWeight={'700'} lineHeight={'32px'} textAlign={'center'}
                 color={'rgba(249, 249, 249, 1)'}>ArithFi, A Decentralized
            Perpetual Exchange Eliminates Market Makers and LPs.</Stack>
          <Stack zIndex={10} height={'48px'} bgcolor={'rgba(246, 156, 0, 1)'} fontSize={'16px'} fontWeight={'700'}
                 justifyContent={'center'} alignItems={'center'} borderRadius={'12px'}
                 onClick={() => {
                   window.location.href = '/#/futures'
                 }}
                 lineHeight={'24px'} width={'200px'} color={'#030308'}>
            <Trans>Start Trading</Trans>
          </Stack>
        </Stack>
        <Stack alignItems={'center'} py={'40px'} px={'20px'}>
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
            <Stack mt={'16px'} fontSize={'14px'} fontWeight={'400'} lineHeight={'20px'} color={'rgba(3, 3, 8, 0.6)'}>
              <Trans>Use $ATF as margin to open positions.</Trans>
            </Stack>
          </Stack>
          <Stack alignItems={'center'} height={'204px'} mt={'24px'}>
            <Stack>
              <img src={'/images/home_icon4.svg'} alt={''}/>
            </Stack>
            <Stack mt={'24px'} fontSize={'18px'} fontWeight={'700'} lineHeight={'22px'} color={'rgba(3, 3, 8, 1)'}>
              <Trans>Earn $ATF</Trans>
            </Stack>
            <Stack mt={'16px'} fontSize={'14px'} fontWeight={'400'} lineHeight={'20px'} color={'rgba(3, 3, 8, 0.6)'}>
              <Trans>If you make a profit, you will earn $ATF.</Trans>
            </Stack>
          </Stack>
          <Stack alignItems={'center'} height={'204px'} mt={'24px'}>
            <Stack>
              <img src={'/images/home_icon5.svg'} alt={''}/>
            </Stack>
            <Stack mt={'24px'} fontSize={'18px'} fontWeight={'700'} lineHeight={'22px'} color={'rgba(3, 3, 8, 1)'}>
              <Trans>Burn $ATF</Trans>
            </Stack>
            <Stack mt={'16px'} fontSize={'14px'} fontWeight={'400'} lineHeight={'20px'} color={'rgba(3, 3, 8, 0.6)'}>
              <Trans>If you incur losses, your $ATF will be burned to the system.</Trans>
            </Stack>
          </Stack>
          <Stack direction={'row'} justifyContent={'space-between'} mt={'40px'} height={'120px'} width={'100%'}
                 bgcolor={'rgba(53, 55, 61, 1)'} borderRadius={'12px'} fontSize={'18px'} fontWeight={'700'}
                 lineHeight={'24px'}>
            <Stack pl={'20px'} py={'24px'} color={'rgba(255, 255, 255, 1)'} width={'230px'}>
              <Trans>A Trading Model CAN Eliminate Market Maker and LP Costs</Trans>
            </Stack>
            <Stack>
              <svg width="192" height="120" viewBox="0 0 192 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g opacity="0.4">
                  <path
                    d="M189.853 54.7036C192.716 57.6846 192.716 62.3154 189.853 65.2965L137.783 119.525C132.848 124.665 124 121.265 124 114.229L124 5.77105C124 -1.26475 132.849 -4.66492 137.783 0.474582L189.853 54.7036Z"
                    fill="url(#paint0_linear_16800_42438)"/>
                  <path opacity="0.56"
                        d="M127.853 54.7036C130.716 57.6846 130.716 62.3154 127.853 65.2965L75.7834 119.525C70.8485 124.665 62 121.265 62 114.229L62 5.77105C62 -1.26475 70.8485 -4.66492 75.7834 0.474582L127.853 54.7036Z"
                        fill="url(#paint1_linear_16800_42438)"/>
                  <path opacity="0.3"
                        d="M65.8532 54.7036C68.7156 57.6846 68.7156 62.3154 65.8532 65.2965L13.7834 119.525C8.8485 124.665 -3.15858e-07 121.265 0 114.229L4.869e-06 5.77105C5.18485e-06 -1.26475 8.8485 -4.66492 13.7834 0.474582L65.8532 54.7036Z"
                        fill="url(#paint2_linear_16800_42438)"/>
                </g>
                <defs>
                  <linearGradient id="paint0_linear_16800_42438" x1="192" y1="60" x2="124" y2="60"
                                  gradientUnits="userSpaceOnUse">
                    <stop stopColor="white" stopOpacity="0.6"/>
                    <stop offset="1" stopColor="white" stopOpacity="0"/>
                  </linearGradient>
                  <linearGradient id="paint1_linear_16800_42438" x1="130" y1="60" x2="62" y2="60"
                                  gradientUnits="userSpaceOnUse">
                    <stop stopColor="white" stopOpacity="0.6"/>
                    <stop offset="1" stopColor="white" stopOpacity="0"/>
                  </linearGradient>
                  <linearGradient id="paint2_linear_16800_42438" x1="68" y1="60" x2="-5.92169e-07" y2="60"
                                  gradientUnits="userSpaceOnUse">
                    <stop stopColor="white" stopOpacity="0.6"/>
                    <stop offset="1" stopColor="white" stopOpacity="0"/>
                  </linearGradient>
                </defs>
              </svg>
            </Stack>
          </Stack>
        </Stack>
        <Stack py={'80px'} alignItems={'center'} sx={{
          background: 'linear-gradient(180deg, rgba(235, 245, 255, 0.40) 45.89%, rgba(255, 255, 255, 0.40) 99.72%)',
        }}>
          <Stack fontSize={'24px'} fontWeight={'700'} color={'rgba(3, 3, 8, 1)'}>Advantages of ArithFi</Stack>
          <Stack direction={'row'} fontSize={'14px'} fontWeight={'400'} lineHeight={'20px'} color={'rgba(3, 3, 8, 1)'}
                 gap={'16px'} mt={'40px'}>
            <Stack px={'20px'} py={'12px'} color={'#030308'} bgcolor={'white'}
                   boxShadow={'0px 8px 40px 0px rgba(9, 26, 178, 0.10)'} borderRadius={'8px'} direction={'row'}
                   gap={'8px'} alignItems={'center'}>
              <img src={'/images/home_icon6.svg'} alt={''} />
              <Trans>
                No LPs
              </Trans>
            </Stack>
            <Stack px={'20px'} py={'12px'} color={'#030308'} bgcolor={'white'}
                   boxShadow={'0px 8px 40px 0px rgba(9, 26, 178, 0.10)'} borderRadius={'8px'} direction={'row'}
                   gap={'8px'} alignItems={'center'}>
              <img src={'/images/home_icon6.svg'} alt={''} />
              <Trans>
                No Market Makers
              </Trans>
            </Stack>
          </Stack>
          <Stack direction={'row'} fontSize={'14px'} fontWeight={'400'} lineHeight={'20px'} color={'rgba(3, 3, 8, 1)'}
                 gap={'16px'} mt={'16px'}>
            <Stack px={'20px'} py={'12px'} color={'#030308'} bgcolor={'white'}
                   boxShadow={'0px 8px 40px 0px rgba(9, 26, 178, 0.10)'} borderRadius={'8px'} direction={'row'}
                   gap={'8px'} alignItems={'center'}>
              <img src={'/images/home_icon6.svg'} alt={''} />
              <Trans>
                0 Slippage
              </Trans>
            </Stack>
            <Stack px={'20px'} py={'12px'} bgcolor={'white'} boxShadow={'0px 8px 40px 0px rgba(9, 26, 178, 0.10)'}
                   borderRadius={'8px'} direction={'row'} gap={'8px'} alignItems={'center'}>
              <img src={'/images/home_icon6.svg'} alt={''} />
              <Trans>
                Infinite Liquidity
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

          <Stack fontSize={'24px'} lineHeight={'32px'} fontWeight={'700'} color={'#030308'}>
            <Trans>
              Why is this considered the next-generation trading model?
            </Trans>
          </Stack>
          <Stack fontSize={'14px'} lineHeight={'20px'} fontWeight={'400'} mt={'24px'} color={'rgba(3, 3, 8, 0.8)'}>
            <Trans>
              If a Centralized Exchange (CEX) wants to introduce new asset pairs, such as GOLD futures, for futures
              trading, they typically require market makers to provide liquidity; otherwise, high slippage can occur
              during trading. However, if only 10 users are interested in trading this new asset, the profits may not
              cover the costs of market making.

              In ArithFi's trading model, the cost of adding new asset pairs, like GOLD futures, for futures trading, is
              approximately $1 per day, and it offers unlimited liquidity with zero slippage. Even if only one user
              wishes
              to trade, we can provide support.

              ArithFi can meet the needs of long-tail users.
            </Trans>
          </Stack>
          <Stack mt={'80px'} alignItems={'center'}>
            <img src={'/images/home_icon1_en.svg'} alt={''} />
          </Stack>
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
              <svg width="240" height="56" viewBox="0 0 240 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect y="16" width="240" height="22" fill="url(#paint0_linear_16803_64325)"/>
                <g filter="url(#filter0_i_16803_64325)">
                  <circle cx="120" cy="28" r="28" fill="white"/>
                </g>
                <circle cx="120" cy="28" r="24" fill="#171A1F"/>
                <path
                  d="M120.365 15.25H113.25L104.515 39.2499H109.303L112.579 30.25H125.824L124.186 25.75H114.217L116.401 19.75H122.003L120.365 15.25Z"
                  fill="white"/>
                <path d="M128.388 19.7499L126.75 15.25H121.961L123.599 19.7499H128.388Z" fill="#F69C00"/>
                <path d="M124.145 21.25H128.933L135.485 39.25H130.696L124.145 21.25Z" fill="white"/>
                <defs>
                  <filter id="filter0_i_16803_64325" x="92" y="0" width="56" height="56" filterUnits="userSpaceOnUse"
                          color-interpolation-filters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                   result="hardAlpha"/>
                    <feOffset/>
                    <feGaussianBlur stdDeviation="5.48498"/>
                    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                    <feColorMatrix type="matrix"
                                   values="0 0 0 0 0.231373 0 0 0 0 0.388235 0 0 0 0 0.952941 0 0 0 0.3 0"/>
                    <feBlend mode="normal" in2="shape" result="effect1_innerShadow_16803_64325"/>
                  </filter>
                  <linearGradient id="paint0_linear_16803_64325" x1="6.28702" y1="24.25" x2="237.813" y2="24.25"
                                  gradientUnits="userSpaceOnUse">
                    <stop stopColor="#030308" stopOpacity="0"/>
                    <stop offset="0.489726" stopColor="#030308" stopOpacity="0.4"/>
                    <stop offset="1" stopColor="#030308" stopOpacity="0"/>
                  </linearGradient>
                </defs>
              </svg>
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
        <Stack alignItems={'center'} px={'20px'} py={'40px'} bgcolor={'rgba(41, 46, 61, 1)'}
               color={'rgba(255, 255, 255, 1)'} fontSize={'20px'} lineHeight={'28px'} fontWeight={'700'}>
          <Stack textAlign={'center'}>
            <Trans>
              Eliminate market makers and LPs in trading
            </Trans>
          </Stack>
          <Stack direction={'row'} fontSize={'16px'} fontWeight={'700'} gap={'12px'} bgcolor={'#F69C00'} width={'200px'}
                 onClick={() => {
                   window.location.href = '/#/futures'
                 }}
                 height={'48px'} alignItems={'center'} justifyContent={'center'} borderRadius={'12px'} mt={'12px'}
                 color={'rgba(3, 3, 8, 1)'}>
            <Trans>
              Start Trading
            </Trans>
            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
              <path fillRule="evenodd" clipRule="evenodd"
                    d="M18.5889 9.41107C18.9144 9.73651 18.9144 10.2641 18.5889 10.5896L13.5889 15.5896C13.2635 15.915 12.7359 15.915 12.4104 15.5896C12.085 15.2641 12.085 14.7365 12.4104 14.4111L15.9878 10.8337H2.99967C2.53944 10.8337 2.16634 10.4606 2.16634 10.0003C2.16634 9.54009 2.53944 9.16699 2.99967 9.16699H15.9878L12.4104 5.58958C12.085 5.26414 12.085 4.73651 12.4104 4.41107C12.7359 4.08563 13.2635 4.08563 13.5889 4.41107L18.5889 9.41107Z"
                    fill="#333333"/>
            </svg>
          </Stack>
        </Stack>
      </Stack>
    )
  }

  return (
    <Stack sx={{
      overflowX: 'hidden'
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
        <Stack position={'absolute'} zIndex={0} bottom={0} width={'100%'} height={'1000px'} sx={{
          background: 'linear-gradient(180deg, rgba(235, 245, 255, 0.40) 45.89%, rgba(255, 255, 255, 0.40) 99.72%)'
        }}>
        </Stack>
        <Stack zIndex={10} sx={{
          fontSize: '48px',
          fontWeight: '700',
          lineHeight: '60px',
          marginTop: '160px',
          textAlign: 'center',
          color: 'white',
          maxWidth: '1200px',
          padding: '0 20px',
        }}>
          <Trans>
            ArithFi, A Decentralized Perpetual Exchange<br/> Eliminates Market Makers and LPs.
          </Trans>
        </Stack>
        <button style={{
          cursor: 'pointer',
          marginTop: '40px',
          width: '200px',
          height: '48px',
          backgroundColor: '#F69C00',
          borderRadius: '12px',
          fontSize: '16px',
          fontWeight: '700',
          lineHeight: '22px',
          zIndex: 10
        }} onClick={() => {
          window.location.href = '/#/futures'
        }}>
          <Trans>
            Start Trading
          </Trans>
        </button>
        <Stack zIndex={'20'} position={'relative'} sx={{
          marginTop: '160px',
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
          <Stack direction={'row'}>
            <Stack sx={{
              alignItems: 'center',
              maxWidth: '368px',
              width: '100%',
            }}>
              <Stack>
              <img src={'/images/home_icon3.svg'} alt={''} />
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
                  Use $ATF as margin to open positions.
                </Trans>
              </Stack>
            </Stack>

            <Stack sx={{
              alignItems: 'center',
              maxWidth: '368px',
              width: '100%',
            }}>
              <Stack>
                <img src={'/images/home_icon4.svg'} alt={''} />
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
                  If you make a profit, you will earn $ATF.
                </Trans>
              </Stack>
            </Stack>
            <Stack sx={{
              alignItems: 'center',
              maxWidth: '368px',
              width: '100%',
            }}>
              <Stack>
                <img src={'/images/home_icon5.svg'} alt={''} />
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
                  If you incur losses, your $ATF will be burned to the system.
                </Trans>
              </Stack>
            </Stack>
          </Stack>
          <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} sx={{
            marginTop: '62px',
            backgroundColor: '#35373D',
            width: '100%',
            color: 'white',
            fontSize: '24px',
            fontWeight: '700',
            lineHeight: '32px',
            padding: '0 48px 0 40px',
            borderRadius: '12px',
          }}>
            <Trans>
              A Trading Model CAN Eliminate Market Maker and LP Costs
            </Trans>
            <svg width="192" height="80" viewBox="0 0 192 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g opacity="0.4">
                <path
                  d="M189.853 34.7036C192.716 37.6846 192.716 42.3154 189.853 45.2965L137.783 99.5254C132.848 104.665 124 101.265 124 94.229L124 -14.229C124 -21.2647 132.849 -24.6649 137.783 -19.5254L189.853 34.7036Z"
                  fill="url(#paint0_linear_16570_56119)"/>
                <path opacity="0.56"
                      d="M127.853 34.7036C130.716 37.6846 130.716 42.3154 127.853 45.2965L75.7834 99.5254C70.8485 104.665 62 101.265 62 94.229L62 -14.229C62 -21.2647 70.8485 -24.6649 75.7834 -19.5254L127.853 34.7036Z"
                      fill="url(#paint1_linear_16570_56119)"/>
                <path opacity="0.3"
                      d="M65.8532 34.7036C68.7156 37.6846 68.7156 42.3154 65.8532 45.2965L13.7834 99.5254C8.8485 104.665 -3.15858e-07 101.265 0 94.229L4.869e-06 -14.229C5.18485e-06 -21.2647 8.8485 -24.6649 13.7834 -19.5254L65.8532 34.7036Z"
                      fill="url(#paint2_linear_16570_56119)"/>
              </g>
              <defs>
                <linearGradient id="paint0_linear_16570_56119" x1="192" y1="40" x2="124" y2="40"
                                gradientUnits="userSpaceOnUse">
                  <stop stopColor="white" stopOpacity="0.6"/>
                  <stop offset="1" stopColor="white" stopOpacity="0"/>
                </linearGradient>
                <linearGradient id="paint1_linear_16570_56119" x1="130" y1="40" x2="62" y2="40"
                                gradientUnits="userSpaceOnUse">
                  <stop stopColor="white" stopOpacity="0.6"/>
                  <stop offset="1" stopColor="white" stopOpacity="0"/>
                </linearGradient>
                <linearGradient id="paint2_linear_16570_56119" x1="68" y1="40" x2="-5.92169e-07" y2="40"
                                gradientUnits="userSpaceOnUse">
                  <stop stopColor="white" stopOpacity="0.6"/>
                  <stop offset="1" stopColor="white" stopOpacity="0"/>
                </linearGradient>
              </defs>
            </svg>
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
          <Stack direction={'row'} spacing={'8px'} alignItems={'center'} sx={{
            padding: '16px 24px',
            fontSize: '16px',
            fontWeight: '400',
            lineHeight: '22px',
            boxShadow: '0px 8px 40px 0px rgba(9, 26, 178, 0.10)',
            borderRadius: '8px',
          }}>
            <img src={'/images/home_icon6.svg'} alt={''} />
            <div>
              <Trans>No LPs</Trans>
            </div>
          </Stack>
          <Stack direction={'row'} spacing={'8px'} alignItems={'center'} sx={{
            padding: '16px 24px',
            fontSize: '16px',
            fontWeight: '400',
            lineHeight: '22px',
            boxShadow: '0px 8px 40px 0px rgba(9, 26, 178, 0.10)',
            borderRadius: '8px',
          }}>
            <img src={'/images/home_icon6.svg'} alt={''} />
            <div>
              <Trans>
                No Market Makers
              </Trans>
            </div>
          </Stack>
          <Stack direction={'row'} spacing={'8px'} alignItems={'center'} sx={{
            padding: '16px 24px',
            fontSize: '16px',
            fontWeight: '400',
            lineHeight: '22px',
            boxShadow: '0px 8px 40px 0px rgba(9, 26, 178, 0.10)',
            borderRadius: '8px',
          }}>
            <img src={'/images/home_icon6.svg'} alt={''} />
            <div>
              <Trans>
                0 Slippage
              </Trans>
            </div>
          </Stack>
          <Stack direction={'row'} spacing={'8px'} alignItems={'center'} sx={{
            padding: '16px 24px',
            fontSize: '16px',
            fontWeight: '400',
            lineHeight: '22px',
            boxShadow: '0px 8px 40px 0px rgba(9, 26, 178, 0.10)',
            borderRadius: '8px',
          }}>
            <img src={'/images/home_icon6.svg'} alt={''} />
            <div>
              <Trans>
                Infinite Liquidity
              </Trans>
            </div>
          </Stack>
        </Stack>
      </Stack>
      <Stack alignItems={'center'} position={'relative'}>
        <Stack width={'100%'} paddingTop={'140px'} paddingBottom={'80px'} zIndex={10} alignItems={'center'} sx={{
          background: 'linear-gradient(180deg, #EBF5FF 0%, #FFF 100%)'
        }}>
          <Stack position={'absolute'} right={0} top={-200}>
            <svg width="994" height="1278" viewBox="0 0 994 1278" fill="none" xmlns="http://www.w3.org/2000/svg">
              <mask id="mask0_16796_35964" maskUnits="userSpaceOnUse" x="0" y="0" width="994" height="1278">
                <rect width="994" height="1278" fill="url(#paint0_linear_16796_35964)"/>
              </mask>
              <g mask="url(#mask0_16796_35964)">
                <g opacity="0.2" filter="url(#filter0_b_16796_35964)">
                  <circle cx="640" cy="633" r="629" fill="#B9D0FF" fillOpacity="0.3"/>
                  <circle cx="640" cy="633" r="628.198" stroke="url(#paint1_linear_16796_35964)" stroke-opacity="0.3"
                          stroke-width="1.60413"/>
                </g>
                <g opacity="0.4" filter="url(#filter1_b_16796_35964)">
                  <circle cx="640" cy="633" r="524.746" fill="#B9D0FF" fillOpacity="0.3"/>
                  <circle cx="640" cy="633" r="523.944" stroke="url(#paint2_linear_16796_35964)" stroke-opacity="0.3"
                          stroke-width="1.60413"/>
                </g>
                <circle opacity="0.1" cx="225" cy="948" r="8" fill="#264AFF"/>
                <circle opacity="0.1" cx="51" cy="499" r="6" fill="#264AFF"/>
                <circle opacity="0.08" cx="628" cy="331" r="4" fill="#264AFF"/>
              </g>
              <defs>
                <filter id="filter0_b_16796_35964" x="-75.6231" y="-82.6231" width="1431.25" height="1431.25"
                        filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                  <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                  <feGaussianBlur in="BackgroundImageFix" stdDeviation="43.3116"/>
                  <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_16796_35964"/>
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_16796_35964" result="shape"/>
                </filter>
                <filter id="filter1_b_16796_35964" x="28.6308" y="21.6308" width="1222.74" height="1222.74"
                        filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                  <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                  <feGaussianBlur in="BackgroundImageFix" stdDeviation="43.3116"/>
                  <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_16796_35964"/>
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_16796_35964" result="shape"/>
                </filter>
                <linearGradient id="paint0_linear_16796_35964" x1="497" y1="0" x2="497" y2="1278"
                                gradientUnits="userSpaceOnUse">
                  <stop stopColor="#EBF5FF"/>
                  <stop offset="1" stopColor="white"/>
                </linearGradient>
                <linearGradient id="paint1_linear_16796_35964" x1="640" y1="4" x2="640" y2="1262"
                                gradientUnits="userSpaceOnUse">
                  <stop stopColor="#EFE71E"/>
                  <stop offset="1" stopColor="#EFCE1E" stopOpacity="0"/>
                </linearGradient>
                <linearGradient id="paint2_linear_16796_35964" x1="640" y1="108.254" x2="640" y2="1157.75"
                                gradientUnits="userSpaceOnUse">
                  <stop stopColor="#EFE71E"/>
                  <stop offset="1" stopColor="#EFCE1E" stopOpacity="0"/>
                </linearGradient>
              </defs>
            </svg>
          </Stack>
          <Stack direction={'row'} maxWidth={'1200px'} width={'100%'} position={'relative'}>
            <Stack gap={'40px'} maxWidth={'600px'} width={'100%'} px={'20px'}>
              <Stack fontSize={'32px'} fontWeight={'700'} lineHeight={'44px'} color={'#030308'}>
                <Trans>
                  Why is this considered the next-generation trading model?
                </Trans>
              </Stack>
              <Stack fontSize={'16px'} fontWeight={'400'} lineHeight={'22px'} color={'rgba(3, 3, 8, 0.80)'}>
                <Trans>
                  If a Centralized Exchange (CEX) wants to
                  introduce new asset pairs, such as GOLD futures, for futures trading, they typically require market
                  makers to provide liquidity; otherwise, high slippage can occur during trading. However, if only 10
                  users are interested in trading this new asset, the profits may not cover the costs of market making.
                </Trans>
                <br/>
                <br/>
                <Trans>
                  In ArithFi's trading model, the cost of adding new asset pairs, like GOLD futures, for futures
                  trading,
                  is approximately $1 per day, and it offers unlimited liquidity with zero slippage. Even if only one
                  user
                  wishes to trade, we can provide support.
                </Trans>
                <br/>
                <br/>
                <Trans>
                  ArithFi can meet the needs of long-tail users.
                </Trans>
              </Stack>
            </Stack>
            <Stack pl={'80px'} height={'500px'}>
              <img src={'/images/home_icon1_en.svg'} alt={''}/>
            </Stack>
          </Stack>
        </Stack>
        <Stack maxWidth={'1200px'} marginTop={'40px'} bgcolor={'white'} width={'100%'}
               zIndex={10} borderRadius={'8px'} padding={'20px'}
               sx={{
                 background: 'linear-gradient(358deg, #3D404D 1.38%, #222529 98.62%)',
               }}
        >
          <img src={'/images/home_icon2_en.svg'} alt={''}/>
        </Stack>
        <Stack position={'absolute'} bottom={0} left={0} width={'100%'} height={'640px'} sx={{
          backgroundImage: `url('/images/home_bg2.svg')`,
          backgroundPosition: 'top',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}>
        </Stack>
        <Stack width={'100%'} marginTop={'80px'} fontSize={'20px'} fontWeight={'700'} lineHeight={'28px'}
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
                  Eliminate market makers and LPs in trading
                </Trans>
              </Stack>
              <Stack>
                <img src={'/images/home_icon2.svg'} alt={''}/>
              </Stack>
            </Stack>
            <Stack>
              <Stack direction={'row'} spacing={'12px'}
                     onClick={() => {
                       window.location.href = '/#/futures'
                     }}
                     style={{
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
                     }}>
                <div>
                  <Trans>
                    Start Trading
                  </Trans>
                </div>
                <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd"
                        d="M18.5889 9.41058C18.9144 9.73602 18.9144 10.2637 18.5889 10.5891L13.5889 15.5891C13.2635 15.9145 12.7359 15.9145 12.4104 15.5891C12.085 15.2637 12.085 14.736 12.4104 14.4106L15.9878 10.8332H2.99967C2.53944 10.8332 2.16634 10.4601 2.16634 9.99984C2.16634 9.5396 2.53944 9.1665 2.99967 9.1665H15.9878L12.4104 5.58909C12.085 5.26366 12.085 4.73602 12.4104 4.41058C12.7359 4.08514 13.2635 4.08514 13.5889 4.41058L18.5889 9.41058Z"
                        fill="#333333"/>
                </svg>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default Home