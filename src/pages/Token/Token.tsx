import {Stack} from "@mui/system";
import {Link} from "react-router-dom";
import {Trans} from "@lingui/macro";
import useReadSwapAmountOut from "../../contracts/Read/useReadSwapContractOnBsc";
import {BigNumber} from "ethers";
import {useEffect} from "react";

const Token = () => {
  const {
    uniSwapAmountOut,
    uniSwapAmountOutRefetch,
    uniSwapAmountOutIsLoading,
  } = useReadSwapAmountOut(BigNumber.from("1".stringToBigNumber(18)!), ['0x00000000bA2ca30042001aBC545871380F570B1F', '0x55d398326f99059fF775485246999027B3197955']);

  const price = (uniSwapAmountOut?.[1].div(BigNumber.from("1".stringToBigNumber(12)!)).toNumber() || 0) / 1e6

  useEffect(() => {
    const time = setInterval(() => {
      uniSwapAmountOutRefetch();
    }, 10 * 1000);
    return () => {
      clearInterval(time);
    };
  }, [uniSwapAmountOutRefetch]);

  return (
    <Stack width={'100%'} alignItems={'center'} paddingTop={'24px'} px={'16px'} sx={{
      background: 'linear-gradient(180deg, #EBF5FF 0%, #FFF 100%)',
    }}>
      <Stack width={'100%'} maxWidth={'1200px'} alignItems={'center'}>
        <Stack py={'12px'} direction={'row'} borderBottom={'1px solid rgba(28, 28, 35, 0.08)'} fontSize={'14px'}
               width={'100%'}
               sx={(theme) => ({
                 [theme.breakpoints.down('sm')]: {
                   display: 'none'
                 }
               })}
               lineHeight={'20px'} fontWeight={'400'} color={'#03030899'} alignItems={'center'}>
          <Link to={"/home"}>
            <Stack padding={'4px 8px'} sx={{
              cursor: 'pointer',
              color: '#03030899',
              '&:hover': {
                color: '#F69C00'
              }
            }}>
              <Trans>
                Home
              </Trans>
            </Stack>
          </Link>
          <Stack>/</Stack>
          <Stack padding={'4px 8px'} color={'#030308'}>
            <Trans>
              Where to buy $ATF
            </Trans>
          </Stack>
        </Stack>
        <Stack fontSize={['24px', '24px', '48px']} lineHeight={['32px', '32px', '60px']} fontWeight={'700'}
               mt={['16px', '16px', '40px']}>
          <Trans>
            Where to buy $ATF
          </Trans>
        </Stack>
        <Stack fontSize={['14px', '14px', '16px']} lineHeight={['20px', '20px', '22px']} fontWeight={'400'}
               color={'#03030899'} mt={'16px'}
               maxWidth={'640px'} textAlign={'center'}>
          <Trans>
            You can buy $ATF from exchanges or wallets directly.CEXs let you buy crypto using fiat. They hold $ATF you
            buy
            until you send it to a wallet you control. Or your can buy $ATF peer-to-peer on DEXs to lets you keep your
            funds in your hands.
          </Trans>
        </Stack>
        <Stack width={['100%', '100%', '640px']} mt={['24px', '24px', '40px']} padding={['20px', '20px', '40px']}
               bgcolor={'#CFF5D0'} border={'1px solid #2ECD3C'}
               borderRadius={'12px'} gap={'16px'} alignItems={'center'}>
          <Stack fontSize={['14px', '14px', '16px']} lineHeight={['20px', '20px', '22px']} fontWeight={'700'}
                 color={'#03030899'} direction={'row'}
                 gap={'8px'} alignItems={'center'}>
            <Stack>
              <Trans>
                CURRENT ATF PRICE (USD)
              </Trans>
            </Stack>
            {/*<NESTTooltipFC title={<Stack alignItems={'center'}>*/}
            {/*  <Stack fontSize={'14px'} lineHeight={'20px'} fontWeight={'700'}>*/}
            {/*    <Trans>*/}
            {/*      Data source:*/}
            {/*    </Trans>*/}
            {/*  </Stack>*/}
            {/*  <Stack fontSize={'12px'} lineHeight={'16px'} fontWeight={'400'} color={'#F69C00'}>*/}
            {/*    pancakeswap.com*/}
            {/*  </Stack>*/}
            {/*</Stack>}/>*/}
          </Stack>
          <Stack fontSize={['28px', '28px', '48px']} lineHeight={['40px', '40px', '60px']} fontWeight={'700'}
                 color={'#030308'}>${uniSwapAmountOutIsLoading ? '-' : price}</Stack>
          {/*<Stack direction={'row'} gap={'8px'} alignItems={'center'}>*/}
          {/*  <Stack fontSize={'20px'} lineHeight={'28px'} fontWeight={'700'} color={'#2ECD3C'}>0.04%</Stack>*/}
          {/*  <Stack fontSize={'16px'} lineHeight={'22px'} fontWeight={'700'} color={'#03030899'}>*/}
          {/*    (LAST 24 HOURS)*/}
          {/*  </Stack>*/}
          {/*</Stack>*/}
        </Stack>
        <Stack width={['100%', '100%', '640px']} direction={['column', 'column', 'row']} gap={['12px', '12px', '24px']}
               mt={['24px', '24px', '40px']}>
          <Stack width={'100%'}>
            <Link to={'https://pancakeswap.finance/swap?outputCurrency=0x00000000bA2ca30042001aBC545871380F570B1F&inputCurrency=0x55d398326f99059fF775485246999027B3197955'} target={'_blank'}>
              <Stack padding={'24px 40px'} borderRadius={'12px'} width={'100%'} alignItems={'center'} gap={'12px'} sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.80)',
                color: '#030308',
                "&:hover": {
                  backgroundColor: '#FFF',
                  color: '#F69C00',
                  boxShadow: '0px 8px 20px 0px rgba(9, 26, 178, 0.05)',
                  cursor: 'pointer',
                },
              }}>
                <img src={'/images/home_icon14.svg'} alt={''} height={'64px'} width={'64px'}/>
                <Stack fontSize={'16px'} lineHeight={'22px'} fontWeight={'700'}>
                  <Trans>
                    Pancake
                  </Trans>
                </Stack>
              </Stack>
            </Link>
          </Stack>
          <Stack width={'100%'}>
            <Link to={'/swap'}>
              <Stack padding={'24px 40px'} borderRadius={'12px'} width={'100%'} alignItems={'center'} gap={'12px'} sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.80)',
                color: '#030308',
                "&:hover": {
                  backgroundColor: '#FFF',
                  color: '#F69C00',
                  boxShadow: '0px 8px 20px 0px rgba(9, 26, 178, 0.05)',
                  cursor: 'pointer',
                },
              }}>
                <img src={'/images/home_icon15.svg'} alt={''} height={'64px'} width={'64px'}/>
                <Stack fontSize={'16px'} lineHeight={'22px'} fontWeight={'700'}>
                  <Trans>
                    ArithFi Swap
                  </Trans>
                </Stack>
              </Stack>
            </Link>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default Token