import {Stack} from "@mui/system";

const Home = () => {
  return (
    <Stack sx={{
      overflowX: 'hidden'
    }}>
      <Stack position={'relative'} sx={{
        width: '100%',
        alignItems: 'center',
      }}>
        <img src={'/images/home_bg1.png'} alt={''} style={{
          width: '100%',
          position: 'absolute',
          zIndex: 5,
          top: 0,
        }} />
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
          color:'white',
        }}>ArithFi, A Decentralized Perpetual Exchange<br/> Eliminates Market Makers and LPs.</Stack>
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
          zIndex: 10,
        }}>Start Trading
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
          <Stack direction={'row'} maxWidth={'1200px'} width={'1200px'} position={'absolute'} top={0} justifyContent={'space-between'}>
            <img src={'/images/home_left.png'} alt={''} style={{
              height: '68px',
            }} />
            <img src={'/images/home_right.png'} alt={''} style={{
              height: '68px',
            }} />
          </Stack>
          <Stack sx={{
            fontSize: '32px',
            fontWeight: '700',
            lineHeight: '44px',
            marginTop: '40px',
            marginBottom: '114px',
          }}>How to Trade on ArithFi?</Stack>
          <Stack direction={'row'}>
            <Stack sx={{
              alignItems: 'center',
              maxWidth: '368px',
              width: '100%',
            }}>
              <Stack>
                <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path opacity="0.7" fillRule="evenodd" clipRule="evenodd"
                        d="M36.12 0.780443L36 0.714844L35.88 0.780443L3.88005 18.2804L3.75 18.3516V18.4998V53.4998V53.648L3.88005 53.7191L35.88 71.2191L36 71.2847L36.12 71.2191L68.12 53.7191L68.25 53.648V53.4998V18.4998V18.3516L68.12 18.2804L36.12 0.780443ZM4.25 18.9281V53.0783L35.4745 36.0008L4.25 18.9281ZM4.52124 53.4999L36 70.7148L67.4788 53.4999L35.9956 36.2857L4.52124 53.4999ZM67.75 53.0783V18.9183L36.5166 36.0007L67.75 53.0783ZM67.4761 18.4982L36 1.28473L4.51499 18.5031L35.9956 35.7158L67.4761 18.4982Z"
                        fill="#030308" strokeOpacity="0.8"/>
                  <circle cx="4" cy="18" r="2" fill="#030308" strokeOpacity="0.8"/>
                  <circle cx="68" cy="18" r="2" fill="#030308" strokeOpacity="0.8"/>
                  <circle cx="4" cy="54" r="2" fill="#030308" strokeOpacity="0.8"/>
                  <circle cx="68" cy="54" r="2" fill="#030308" strokeOpacity="0.8"/>
                  <circle cx="36" cy="36" r="16" fill="#F69C00"/>
                  <path fillRule="evenodd" clipRule="evenodd"
                        d="M41.5 38.0192V36.5H44.5V42C44.5 42.8284 43.8284 43.5 43 43.5C42.1716 43.5 41.5 42.8284 41.5 42V38.0192ZM40 45.5H43C44.933 45.5 46.5 43.933 46.5 42V35.5C46.5 34.9477 46.0523 34.5 45.5 34.5H41.5V27.5C41.5 26.9477 41.0523 26.5 40.5 26.5H27.5C26.9477 26.5 26.5 26.9477 26.5 27.5V41.5C26.5 43.7091 28.2909 45.5 30.5 45.5H40ZM31.5 32C31.2239 32 31 32.2239 31 32.5V33.5C31 33.7761 31.2239 34 31.5 34H36.5C36.7761 34 37 33.7761 37 33.5V32.5C37 32.2239 36.7761 32 36.5 32H31.5ZM31 36.5C31 36.2239 31.2239 36 31.5 36H36.5C36.7761 36 37 36.2239 37 36.5V37.5C37 37.7761 36.7761 38 36.5 38H31.5C31.2239 38 31 37.7761 31 37.5V36.5Z"
                        fill="white"/>
                </svg>
              </Stack>
              <Stack sx={{
                fontSize: '24px',
                fontWeight: '700',
                lineHeight: '32px',
                marginTop: '40px',
                marginBottom: '16px',
              }}>
                Trade With $ATF
              </Stack>
              <Stack sx={{
                fontSize: '16px',
                fontWeight: '400',
                lineHeight: '22px',
                textAlign: 'center',
              }}>Use $ATF as margin to open positions.</Stack>
            </Stack>

            <Stack sx={{
              alignItems: 'center',
              maxWidth: '368px',
              width: '100%',
            }}>
              <Stack>
                <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle opacity="0.7" cx="36" cy="36" r="35" stroke="#030308" strokeOpacity="0.8"
                          strokeWidth="0.5"/>
                  <ellipse opacity="0.7" cx="16.1986" cy="34.7113" rx="16.1986" ry="34.7113"
                           transform="matrix(0.707131 -0.707083 0.707131 0.707083 0 22.9121)" stroke="#030308"
                           strokeOpacity="0.8" strokeWidth="0.5"/>
                  <ellipse opacity="0.7" cx="16.1986" cy="34.7113" rx="16.1986" ry="34.7113"
                           transform="matrix(-0.707131 -0.707083 0.707131 -0.707083 22.9092 71.9961)" stroke="#030308"
                           strokeOpacity="0.8" strokeWidth="0.5"/>
                  <circle cx="11" cy="11" r="2" fill="#030308" strokeOpacity="0.8"/>
                  <circle cx="61" cy="11" r="2" fill="#030308" strokeOpacity="0.8"/>
                  <circle cx="11" cy="61" r="2" fill="#030308" strokeOpacity="0.8"/>
                  <circle cx="61" cy="61" r="2" fill="#030308" strokeOpacity="0.8"/>
                  <circle cx="36" cy="36" r="16" fill="#F69C00"/>
                  <path fillRule="evenodd" clipRule="evenodd"
                        d="M41.5 38.0192V36.5H44.5V42C44.5 42.8284 43.8284 43.5 43 43.5C42.1716 43.5 41.5 42.8284 41.5 42V38.0192ZM40 45.5H43C44.933 45.5 46.5 43.933 46.5 42V35.5C46.5 34.9477 46.0523 34.5 45.5 34.5H41.5V27.5C41.5 26.9477 41.0523 26.5 40.5 26.5H27.5C26.9477 26.5 26.5 26.9477 26.5 27.5V41.5C26.5 43.7091 28.2909 45.5 30.5 45.5H40ZM31.5 32C31.2239 32 31 32.2239 31 32.5V33.5C31 33.7761 31.2239 34 31.5 34H36.5C36.7761 34 37 33.7761 37 33.5V32.5C37 32.2239 36.7761 32 36.5 32H31.5ZM31 36.5C31 36.2239 31.2239 36 31.5 36H36.5C36.7761 36 37 36.2239 37 36.5V37.5C37 37.7761 36.7761 38 36.5 38H31.5C31.2239 38 31 37.7761 31 37.5V36.5Z"
                        fill="white"/>
                </svg>
              </Stack>
              <Stack sx={{
                fontSize: '24px',
                fontWeight: '700',
                lineHeight: '32px',
                marginTop: '40px',
                marginBottom: '16px',
              }}>
                Earn $ATF
              </Stack>
              <Stack sx={{
                fontSize: '16px',
                fontWeight: '400',
                lineHeight: '22px',
                textAlign: 'center',
              }}>If you make a profit, you will earn $ATF.</Stack>
            </Stack>

            <Stack sx={{
              alignItems: 'center',
              maxWidth: '368px',
              width: '100%',
            }}>
              <Stack>
                <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path opacity="0.7" fillRule="evenodd" clipRule="evenodd"
                        d="M36.1502 0.80006L36.0001 0.6875L35.8501 0.80006L18.9249 13.4981L1.61826 25.6709L1.46484 25.7788L1.52553 25.9563L1.9492 27.1952L1.93694 27.2419L1.96796 27.2501L8.3719 45.977L8.37314 45.9806L14.6009 66.1982L14.6561 66.3775L14.8437 66.3746L15.1292 66.3702L14.7943 66.8588L15.2067 67.1415L15.7418 66.3608L35.9963 66.05H36.004L56.2718 66.361L56.7927 67.1392L57.2082 66.8611L56.8798 66.3704L57.1566 66.3746L57.3441 66.3775L57.3993 66.1982L63.6284 45.9769L63.6295 45.9733L70.0322 27.2504L70.0649 27.2417L70.0518 27.1928L70.4747 25.9563L70.5354 25.7788L70.382 25.6709L53.0784 13.5004L53.0753 13.4981L36.1502 0.80006ZM69.6454 26.8361L69.9409 25.972L52.7845 13.9048L52.7782 13.9004L52.7783 13.9003L36.0001 1.31257L19.2219 13.9003L19.2158 13.9049L19.2157 13.9048L2.05932 25.972L2.35431 26.8346L36.0005 35.676V2.00015H36.5005V35.6747L69.6454 26.8361ZM2.54856 27.4027L8.84624 45.8188L8.84872 45.8261L8.84861 45.8261L15.0236 65.8718L15.4756 65.8649L35.8435 36.1517L2.54856 27.4027ZM16.0882 65.8555L35.9963 65.5501L36.004 65.5499L36.004 65.5501L55.9337 65.8558L36.248 36.4459L16.0882 65.8555ZM56.5416 65.8651L56.9767 65.8718L63.1516 45.8261L63.1539 45.8188L63.154 45.8188L69.4507 27.4055L36.6527 36.1516L56.5416 65.8651Z"
                        fill="#030308" strokeOpacity="0.8"/>
                  <circle cx="36" cy="36" r="2" fill="#030308" strokeOpacity="0.8"/>
                  <circle cx="36" cy="2" r="2" fill="#030308" strokeOpacity="0.8"/>
                  <circle cx="15" cy="66" r="2" fill="#030308" strokeOpacity="0.8"/>
                  <circle cx="57" cy="66" r="2" fill="#030308" strokeOpacity="0.8"/>
                  <circle cx="70" cy="26" r="2" fill="#030308" strokeOpacity="0.8"/>
                  <circle cx="2" cy="26" r="2" fill="#030308" strokeOpacity="0.8"/>
                  <circle cx="36" cy="36" r="16" fill="#F69C00"/>
                  <path fillRule="evenodd" clipRule="evenodd"
                        d="M41.5 38.0192V36.5H44.5V42C44.5 42.8284 43.8284 43.5 43 43.5C42.1716 43.5 41.5 42.8284 41.5 42V38.0192ZM40 45.5H43C44.933 45.5 46.5 43.933 46.5 42V35.5C46.5 34.9477 46.0523 34.5 45.5 34.5H41.5V27.5C41.5 26.9477 41.0523 26.5 40.5 26.5H27.5C26.9477 26.5 26.5 26.9477 26.5 27.5V41.5C26.5 43.7091 28.2909 45.5 30.5 45.5H40ZM31.5 32C31.2239 32 31 32.2239 31 32.5V33.5C31 33.7761 31.2239 34 31.5 34H36.5C36.7761 34 37 33.7761 37 33.5V32.5C37 32.2239 36.7761 32 36.5 32H31.5ZM31 36.5C31 36.2239 31.2239 36 31.5 36H36.5C36.7761 36 37 36.2239 37 36.5V37.5C37 37.7761 36.7761 38 36.5 38H31.5C31.2239 38 31 37.7761 31 37.5V36.5Z"
                        fill="white"/>
                </svg>
              </Stack>
              <Stack sx={{
                fontSize: '24px',
                fontWeight: '700',
                lineHeight: '32px',
                marginTop: '40px',
                marginBottom: '16px',
              }}>
                Burn $ATF
              </Stack>
              <Stack sx={{
                fontSize: '16px',
                fontWeight: '400',
                lineHeight: '22px',
                textAlign: 'center',
              }}>If you incur losses, your $ATF will be burned to the system.</Stack>
            </Stack>
          </Stack>
          <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} sx={{
            marginTop: '134px',
            backgroundColor: '#35373D',
            width: '100%',
            color: 'white',
            fontSize: '24px',
            fontWeight: '700',
            lineHeight: '22px',
            padding: '0 48px 0 40px',
            borderRadius: '12px',
          }}>
            <div>A Trading Model CAN Eliminate Market Maker and LP Costs</div>
            <svg width="192" height="80" viewBox="0 0 192 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g opacity="0.4">
                <path d="M189.853 34.7036C192.716 37.6846 192.716 42.3154 189.853 45.2965L137.783 99.5254C132.848 104.665 124 101.265 124 94.229L124 -14.229C124 -21.2647 132.849 -24.6649 137.783 -19.5254L189.853 34.7036Z" fill="url(#paint0_linear_16570_56119)"/>
                <path opacity="0.56" d="M127.853 34.7036C130.716 37.6846 130.716 42.3154 127.853 45.2965L75.7834 99.5254C70.8485 104.665 62 101.265 62 94.229L62 -14.229C62 -21.2647 70.8485 -24.6649 75.7834 -19.5254L127.853 34.7036Z" fill="url(#paint1_linear_16570_56119)"/>
                <path opacity="0.3" d="M65.8532 34.7036C68.7156 37.6846 68.7156 42.3154 65.8532 45.2965L13.7834 99.5254C8.8485 104.665 -3.15858e-07 101.265 0 94.229L4.869e-06 -14.229C5.18485e-06 -21.2647 8.8485 -24.6649 13.7834 -19.5254L65.8532 34.7036Z" fill="url(#paint2_linear_16570_56119)"/>
              </g>
              <defs>
                <linearGradient id="paint0_linear_16570_56119" x1="192" y1="40" x2="124" y2="40" gradientUnits="userSpaceOnUse">
                  <stop stop-color="white" stop-opacity="0.6"/>
                  <stop offset="1" stop-color="white" stop-opacity="0"/>
                </linearGradient>
                <linearGradient id="paint1_linear_16570_56119" x1="130" y1="40" x2="62" y2="40" gradientUnits="userSpaceOnUse">
                  <stop stop-color="white" stop-opacity="0.6"/>
                  <stop offset="1" stop-color="white" stop-opacity="0"/>
                </linearGradient>
                <linearGradient id="paint2_linear_16570_56119" x1="68" y1="40" x2="-5.92169e-07" y2="40" gradientUnits="userSpaceOnUse">
                  <stop stop-color="white" stop-opacity="0.6"/>
                  <stop offset="1" stop-color="white" stop-opacity="0"/>
                </linearGradient>
              </defs>
            </svg>
          </Stack>
        </Stack>
        <Stack zIndex={10} sx={{
          marginTop: '120px',
          fontWeight: '700',
          fontSize: '32px',
          lineHeight: '44px'
        }}>Advantages of ArithFi</Stack>
        <Stack direction={'row'} zIndex={10} gap={'24px'} marginTop={'48px'} marginBottom={'120px'}>
          <Stack direction={'row'} spacing={'8px'} alignItems={'center'} sx={{
            padding: '16px 24px',
            fontSize: '16px',
            fontWeight: '400',
            lineHeight: '22px',
            boxShadow: '0px 8px 40px 0px rgba(9, 26, 178, 0.10)',
            borderRadius: '8px',
          }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="16" height="16" rx="4" fill="#2BB55A"/>
              <path fillRule="evenodd" clipRule="evenodd"
                    d="M12.2537 4.99775C12.416 5.16085 12.4154 5.42467 12.2523 5.587L6.80955 11.0037C6.64699 11.1654 6.38426 11.1654 6.2217 11.0037L3.74775 8.54154C3.58464 8.37921 3.58401 8.1154 3.74633 7.95229C3.90866 7.78918 4.17248 7.78855 4.33559 7.95088L6.51563 10.1205L11.6644 4.99633C11.8275 4.83401 12.0913 4.83464 12.2537 4.99775Z"
                    fill="white"/>
            </svg>
            <div>No LPs</div>
          </Stack>
          <Stack direction={'row'} spacing={'8px'} alignItems={'center'} sx={{
            padding: '16px 24px',
            fontSize: '16px',
            fontWeight: '400',
            lineHeight: '22px',
            boxShadow: '0px 8px 40px 0px rgba(9, 26, 178, 0.10)',
            borderRadius: '8px',
          }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="16" height="16" rx="4" fill="#2BB55A"/>
              <path fillRule="evenodd" clipRule="evenodd"
                    d="M12.2537 4.99775C12.416 5.16085 12.4154 5.42467 12.2523 5.587L6.80955 11.0037C6.64699 11.1654 6.38426 11.1654 6.2217 11.0037L3.74775 8.54154C3.58464 8.37921 3.58401 8.1154 3.74633 7.95229C3.90866 7.78918 4.17248 7.78855 4.33559 7.95088L6.51563 10.1205L11.6644 4.99633C11.8275 4.83401 12.0913 4.83464 12.2537 4.99775Z"
                    fill="white"/>
            </svg>
            <div>
              No Market Makers
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
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="16" height="16" rx="4" fill="#2BB55A"/>
              <path fillRule="evenodd" clipRule="evenodd"
                    d="M12.2537 4.99775C12.416 5.16085 12.4154 5.42467 12.2523 5.587L6.80955 11.0037C6.64699 11.1654 6.38426 11.1654 6.2217 11.0037L3.74775 8.54154C3.58464 8.37921 3.58401 8.1154 3.74633 7.95229C3.90866 7.78918 4.17248 7.78855 4.33559 7.95088L6.51563 10.1205L11.6644 4.99633C11.8275 4.83401 12.0913 4.83464 12.2537 4.99775Z"
                    fill="white"/>
            </svg>
            <div>
              0 Slippage
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
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="16" height="16" rx="4" fill="#2BB55A"/>
              <path fillRule="evenodd" clipRule="evenodd"
                    d="M12.2537 4.99775C12.416 5.16085 12.4154 5.42467 12.2523 5.587L6.80955 11.0037C6.64699 11.1654 6.38426 11.1654 6.2217 11.0037L3.74775 8.54154C3.58464 8.37921 3.58401 8.1154 3.74633 7.95229C3.90866 7.78918 4.17248 7.78855 4.33559 7.95088L6.51563 10.1205L11.6644 4.99633C11.8275 4.83401 12.0913 4.83464 12.2537 4.99775Z"
                    fill="white"/>
            </svg>
            <div>
              Infinite Liquidity
            </div>
          </Stack>
        </Stack>
      </Stack>
      <Stack alignItems={'center'} position={'relative'}>
        <Stack width={'100%'} paddingTop={'140px'} paddingBottom={'140px'} zIndex={10} alignItems={'center'} sx={{
          background: 'linear-gradient(180deg, #EBF5FF 0%, #FFF 100%)'
        }}>
          <Stack direction={'row'} maxWidth={'1200px'} width={'100%'}>
            <Stack gap={'40px'} maxWidth={'600px'} width={'100%'}>
              <Stack fontSize={'32px'} fontWeight={'700'} lineHeight={'44px'}>Why is this considered the next-generation
                trading model?</Stack>
              <Stack fontSize={'16px'} fontWeight={'400'} lineHeight={'22px'}>If a Centralized Exchange (CEX) wants to
                introduce new asset pairs, such as GOLD futures, for futures trading, they typically require market
                makers to provide liquidity; otherwise, high slippage can occur during trading. However, if only 10
                users are interested in trading this new asset, the profits may not cover the costs of market making.
                <br/>
                <br/>
                In ArithFi's trading model, the cost of adding new asset pairs, like GOLD futures, for futures trading,
                is approximately $1 per day, and it offers unlimited liquidity with zero slippage. Even if only one user
                wishes to trade, we can provide support.
                <br/>
                <br/>
                ArithFi can meet the needs of long-tail users.</Stack>
            </Stack>
            <Stack>
            </Stack>
          </Stack>
        </Stack>
        <Stack maxWidth={'1200px'} marginTop={'120px'} bgcolor={'white'} width={'100%'} height={'640px'} border={'1px solid #F2F2F2'} zIndex={10}>
          icon
        </Stack>
        <Stack width={'100%'} marginTop={'80px'} fontSize={'20px'} fontWeight={'700'} lineHeight={'28px'} height={'128px'} justifyContent={'center'} zIndex={10}
               sx={{
                 backgroundColor: '#292E3D',
                 color: 'white',
               }}
               alignItems={'center'}>
          <Stack maxWidth={'1200px'} width={'100%'} px={'40px'} direction={'row'} justifyContent={'space-between'}
                 alignItems={'center'}>
            <Stack gap={'25px'} direction={'row'} alignItems={"center"}>
              <Stack>
                Eliminate market makers and LPs in trading
              </Stack>
              <Stack>
                <svg width="192" height="124" viewBox="0 0 192 124" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g opacity="0.2">
                    <path
                      d="M189.853 56.7036C192.716 59.6846 192.716 64.3154 189.853 67.2965L137.783 121.525C132.848 126.665 124 123.265 124 116.229L124 7.77105C124 0.735255 132.849 -2.66492 137.783 2.47458L189.853 56.7036Z"
                      fill="url(#paint0_linear_16570_56182)"/>
                    <path opacity="0.56"
                          d="M127.853 56.7036C130.716 59.6846 130.716 64.3154 127.853 67.2965L75.7834 121.525C70.8485 126.665 62 123.265 62 116.229L62 7.77105C62 0.735255 70.8485 -2.66492 75.7834 2.47458L127.853 56.7036Z"
                          fill="url(#paint1_linear_16570_56182)"/>
                    <path opacity="0.3"
                          d="M65.8532 56.7036C68.7156 59.6846 68.7156 64.3154 65.8532 67.2965L13.7834 121.525C8.8485 126.665 -3.15858e-07 123.265 0 116.229L4.869e-06 7.77105C5.18485e-06 0.735255 8.8485 -2.66492 13.7834 2.47458L65.8532 56.7036Z"
                          fill="url(#paint2_linear_16570_56182)"/>
                  </g>
                  <defs>
                    <linearGradient id="paint0_linear_16570_56182" x1="192" y1="62" x2="124" y2="62"
                                    gradientUnits="userSpaceOnUse">
                      <stop stopColor="white" stopOpacity="0.6"/>
                      <stop offset="1" stopColor="white" stopOpacity="0"/>
                    </linearGradient>
                    <linearGradient id="paint1_linear_16570_56182" x1="130" y1="62" x2="62" y2="62"
                                    gradientUnits="userSpaceOnUse">
                      <stop stopColor="white" stopOpacity="0.6"/>
                      <stop offset="1" stopColor="white" stopOpacity="0"/>
                    </linearGradient>
                    <linearGradient id="paint2_linear_16570_56182" x1="68" y1="62" x2="-5.92169e-07" y2="62"
                                    gradientUnits="userSpaceOnUse">
                      <stop stopColor="white" stopOpacity="0.6"/>
                      <stop offset="1" stopColor="white" stopOpacity="0"/>
                    </linearGradient>
                  </defs>
                </svg>
              </Stack>
            </Stack>
            <Stack>
              <Stack direction={'row'} spacing={'12px'} style={{
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
                  Start Trading
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
        <Stack position={'absolute'} bottom={0} zIndex={0} width={'100%'}>
          <img src={'/images/home_bg2.png'} alt={''} style={{
            width: '100%'
          }} />
        </Stack>
      </Stack>
    </Stack>
  )
}

export default Home