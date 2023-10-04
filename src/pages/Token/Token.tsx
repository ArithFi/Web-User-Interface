import {Stack} from "@mui/system";

const Token = () => {
  return (
    <Stack width={'100%'} alignItems={'center'} paddingTop={'24px'} sx={{
      background: 'linear-gradient(180deg, #EBF5FF 0%, #FFF 100%)',
    }}>
      <Stack width={'100%'} maxWidth={'1200px'} alignItems={'center'}>
        <Stack py={'12px'} direction={'row'} borderBottom={'1px solid rgba(28, 28, 35, 0.08)'} fontSize={'14px'} width={'100%'}
               lineHeight={'20px'} fontWeight={'400'} color={'#03030899'} alignItems={'center'}>
          <Stack padding={'4px 8px'}>Home</Stack>
          <Stack>/</Stack>
          <Stack padding={'4px 8px'} color={'#030308'}>Where to buy $ATF</Stack>
        </Stack>
        <Stack fontSize={'48px'} lineHeight={'60px'} fontWeight={'700'} mt={'40px'}>
          Where to buy $ATF
        </Stack>
        <Stack fontSize={'16px'} lineHeight={'22px'} fontWeight={'400'} color={'#03030899'} mt={'16px'} maxWidth={'640px'} textAlign={'center'}>
          You can buy $ATF from exchanges or wallets directly.CEXs let you buy crypto using fiat. They hold $ATF you buy until you send it to a wallet you control. Or your can buy $ATF peer-to-peer on DEXs to lets you keep your funds in your hands.
        </Stack>
        <Stack width={'640px'} mt={'40px'} padding={'40px'} bgcolor={'#CFF5D0'} border={'1px solid #2ECD3C'} borderRadius={'12px'} gap={'16px'} alignItems={'center'}>
          <Stack fontSize={'16px'} lineHeight={'22px'} fontWeight={'700'} color={'#03030899'}>CURRENT ATF PRICE (USD)</Stack>
          <Stack fontSize={'48px'} lineHeight={'60px'} fontWeight={'700'}  color={'#030308'}>$0.02593</Stack>
          <Stack direction={'row'} gap={'8px'} alignItems={'center'}>
            <Stack fontSize={'20px'} lineHeight={'28px'} fontWeight={'700'} color={'#2ECD3C'}>0.04%</Stack>
            <Stack fontSize={'16px'} lineHeight={'22px'} fontWeight={'700'} color={'#03030899'}>
              (LAST 24 HOURS)
            </Stack>
          </Stack>
        </Stack>
        <Stack width={'640px'} direction={'row'} gap={'24px'} mt={'40px'}>
          <Stack padding={'24px 40px'} borderRadius={'12px'} width={'100%'} alignItems={'center'} gap={'12px'} sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.80)',
            "&:hover": {
              backgroundColor: '#FFF',
              color: '#F69C00',
              boxShadow: '0px 8px 20px 0px rgba(9, 26, 178, 0.05)',
              cursor: 'pointer',
            },
          }}>
            <img src={'/images/home_icon14.svg'} alt={''} height={'64px'} width={'64px'} />
            <Stack fontSize={'16px'} lineHeight={'22px'} fontWeight={'700'}>Pancake</Stack>
          </Stack>
          <Stack padding={'24px 40px'} borderRadius={'12px'} width={'100%'} alignItems={'center'} gap={'12px'} sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.80)',
            "&:hover": {
              backgroundColor: '#FFF',
              color: '#F69C00',
              boxShadow: '0px 8px 20px 0px rgba(9, 26, 178, 0.05)',
              cursor: 'pointer',
            },
          }}>
            <img src={'/images/home_icon15.svg'} alt={''}  height={'64px'} width={'64px'}/>
            <Stack fontSize={'16px'} lineHeight={'22px'} fontWeight={'700'}>ArithFi Swap</Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default Token