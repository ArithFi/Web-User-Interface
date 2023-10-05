import {Trans} from "@lingui/macro";
import {Stack} from "@mui/system";
import useWindowWidth from "../../hooks/useWindowWidth";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

const Home = () => {
  const {isBigMobile} = useWindowWidth();
  const [lang, setLang] = useState('en')

  useEffect(() => {
    const cache = localStorage.getItem("Language");
    if (cache) {
      setLang(cache)
    }
  }, []);

  if (isBigMobile) {
    return (
      <Stack>
        <Stack px={'20px'} alignItems={'center'} pt={'120px'} height={'400px'} pb={'80px'} gap={'40px'}
               position={'relative'}>
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
                 color={'rgba(249, 249, 249, 1)'}>
            <Trans>ArithFi, A decentralized Derivatives Exchange Eliminates Market Makers and LPs.</Trans>
          </Stack>
          <Stack zIndex={10}>
            <Link to={'/futures'}>
              <Stack height={'48px'} bgcolor={'rgba(246, 156, 0, 1)'} fontSize={'16px'} fontWeight={'700'} color={'#030308'}
                     justifyContent={'center'} alignItems={'center'} borderRadius={'12px'}
                     lineHeight={'24px'} width={'200px'}>
                <Trans>Start Trading</Trans>
              </Stack>
            </Link>
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
            <Stack mt={'16px'} fontSize={'14px'} textAlign={'center'} fontWeight={'400'} lineHeight={'20px'}
                   color={'rgba(3, 3, 8, 0.6)'}>
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
                   window.open('https://docs.arithfi.com/docs/arithfi', '_blank')
                 }}
                 lineHeight={'24px'}>
            <Stack pl={'20px'} pr={'50px'} py={'24px'} color={'rgba(255, 255, 255, 1)'}>
              <Trans>ArithFi is based on the SCP (Smart contract Counterparty) model.</Trans>
            </Stack>
            <Stack position={'absolute'} right={0}>
              <img src={'/images/home_icon8.svg'} alt={''}/>
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
                  ArithFi Coin
                </Trans>
              </Stack>
              <Stack fontSize={'16px'} fontWeight={'400'} lineHeight={'22px'} mt={'8px'} color={'#1D2129'} sx={{
                opacity: 0.8
              }}>
                <Trans>
                  ATF is a deflationary token and serves as the settlement token for the ArithFi arithmetic trading model. Holders of ATF tokens can be considered as counterparts to all traders in ArithFi. We believe that traders cannot consistently outperform the market in the long run, thus ATF holders can benefit from the appreciation of the token due to losses incurred by traders. With ongoing product iterations and community development, ATF will become a equilibrium asset. Additionally, ATF tokens also possess governance functions, providing more rights to ATF holders in the future.
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
                No LPs
              </Trans>
            </Stack>
            <Stack px={'20px'} py={'12px'} color={'#030308'} bgcolor={'white'}
                   boxShadow={'0px 8px 40px 0px rgba(9, 26, 178, 0.10)'} borderRadius={'8px'} direction={'row'}
                   gap={'8px'} alignItems={'center'}>
              <img src={'/images/home_icon6.svg'} alt={''}/>
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
              <img src={'/images/home_icon6.svg'} alt={''}/>
              <Trans>
                0 Slippage
              </Trans>
            </Stack>
            <Stack px={'20px'} py={'12px'} bgcolor={'white'} boxShadow={'0px 8px 40px 0px rgba(9, 26, 178, 0.10)'}
                   borderRadius={'8px'} direction={'row'} gap={'8px'} alignItems={'center'}>
              <img src={'/images/home_icon6.svg'} alt={''}/>
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
            <div>
              <Trans>
                If a Centralized Exchange (CEX) wants to introduce new asset pairs, such as GOLD futures, for futures
                trading, they typically require market makers to provide liquidity; otherwise, high slippage can occur
                during trading. However, if only 10 users are interested in trading this new asset, the profits may not
                cover the costs of market making.
              </Trans>
            </div>
            <br/>
            <div>
              <Trans>
                In ArithFi's trading model, the cost of adding new asset pairs, like GOLD futures, for futures trading,
                is
                approximately $0.1 per day, and it offers infinite liquidity with 0 slippage. Even if only one user
                wishes
                to trade, we can provide support.
              </Trans>
            </div>
            <br/>
            <div>
              <Trans>
                ArithFi can meet the needs of long-tail users.
              </Trans>
            </div>
          </Stack>
          <Stack mt={'80px'} alignItems={'center'}>
            <img src={`/images/home_icon1_${lang}.svg`} alt={''} width={'100%'}/>
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
        <Stack alignItems={'center'} px={'20px'} py={'40px'} bgcolor={'rgba(41, 46, 61, 1)'}
               color={'rgba(255, 255, 255, 1)'} fontSize={'20px'} lineHeight={'28px'} fontWeight={'700'}>
          <Stack textAlign={'center'}>
            <Trans>
              Eliminate market makers and LPs in trading
            </Trans>
          </Stack>
          <Link to={'/futures'}>
            <Stack direction={'row'} fontSize={'16px'} fontWeight={'700'} gap={'12px'} bgcolor={'#F69C00'} width={'200px'}
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
            ArithFi, A decentralized Derivatives Exchange Eliminates Market Makers and LPs.
          </Trans>
        </Stack>
        <Stack zIndex={10}>
          <Link to={'/futures'}>
            <Stack sx={{
              cursor: 'pointer',
              marginTop: '40px',
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
                   window.open('https://docs.arithfi.com/docs/arithfi', '_blank')
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
                ArithFi is based on the SCP (Smart contract Counterparty) model.
              </Trans>
            </Stack>
            <Stack position={'absolute'} right={'40px'}>
              <img src={'/images/home_icon12.svg'} alt={''}/>
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
                ArithFi Coin
              </Trans>
            </Stack>
            <Stack fontSize={'16px'} fontWeight={'400'} lineHeight={'22px'}>
              <Trans>
                ATF is a deflationary token and serves as the settlement token for the ArithFi arithmetic trading model. Holders of ATF tokens can be considered as counterparts to all traders in ArithFi. We believe that traders cannot consistently outperform the market in the long run, thus ATF holders can benefit from the appreciation of the token due to losses incurred by traders. With ongoing product iterations and community development, ATF will become a equilibrium asset. Additionally, ATF tokens also possess governance functions, providing more rights to ATF holders in the future.
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
              <Trans>No LPs</Trans>
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
                No Market Makers
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
        </Stack>
      </Stack>
      <Stack alignItems={'center'} position={'relative'} zIndex={5}>
        <Stack width={'100%'} paddingTop={'140px'} paddingBottom={'80px'} zIndex={10} alignItems={'center'} sx={{
          background: 'linear-gradient(180deg, #EBF5FF 0%, #FFF 100%)'
        }}>
          <Stack position={'absolute'} right={0} zIndex={5} top={-200}>
            <img src={'/images/home_icon11.svg'} alt={''}/>
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
                  If a Centralized Exchange (CEX) wants to introduce new asset pairs, such as GOLD futures, for futures
                  trading, they typically require market makers to provide liquidity; otherwise, high slippage can occur
                  during trading. However, if only 10 users are interested in trading this new asset, the profits may
                  not cover the costs of market making.
                </Trans>
                <br/>
                <br/>
                <Trans>
                  In ArithFi's trading model, the cost of adding new asset pairs, like GOLD futures, for futures
                  trading, is approximately $0.1 per day, and it offers infinite liquidity with 0 slippage. Even if only
                  one user wishes to trade, we can provide support.
                </Trans>
                <br/>
                <br/>
                <Trans>
                  ArithFi can meet the needs of long-tail users.
                </Trans>
              </Stack>
            </Stack>
            <Stack pl={'80px'} height={'500px'}>
              <img src={`/images/home_icon1_${lang}.svg`} alt={''}/>
            </Stack>
          </Stack>
        </Stack>
        <Stack maxWidth={'1200px'} marginTop={'40px'} bgcolor={'white'} width={'100%'}
               zIndex={10} borderRadius={'8px'} padding={'20px'}
               sx={{
                 background: 'linear-gradient(358deg, #3D404D 1.38%, #222529 98.62%)',
               }}
        >
          <img src={`/images/home_icon2_${lang}.svg`} alt={''}/>
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
                  Enjoy 0 slippage trading on ArithFi
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