import {Stack} from "@mui/system";
import {FC, useMemo} from "react";
import {ETHLogo} from "../../components/icons";
import useSWR from "swr";
import {Link} from "react-router-dom";
import {serviceBaseURL} from "../../lib/ArithFiRequest";
import useArithFi from "../../hooks/useArithFi";

export const TradeCard: FC<{
  pair1: string,
  pair2: string,
  mobile?: boolean,
}> = ({pair1, pair2, mobile}) => {
  const TokenLogo = useMemo(() => {
    const token = `${pair1}/${pair2}`?.getToken()
    return token ? token.icon : ETHLogo
  }, [pair1, pair2]);
  const {chainsData} = useArithFi();

  const {data: price,} = useSWR(`${serviceBaseURL(chainsData.chainId)}/oracle/price?product=${pair1}/${pair2}`,
    (url: string) => fetch(url).then((res) => res.json()).then((res) => res?.data), {
      refreshInterval: 1000,
    });

  const {data: price24h} = useSWR(`${serviceBaseURL(chainsData.chainId)}/oracle/ticker24hr?product=${pair1}/${pair2}`,
    (url: string) => fetch(url).then((res) => res.json()).then((res) => Number(res?.data?.priceChangePercent || 0)), {
      refreshInterval: 1000,
    })

  if (mobile) {
    return (
      <Link to={`/futures?pt=${pair1}%2F${pair2}`}>
        <Stack direction={'row'} alignItems={'center'} py={'20px'} sx={{
          cursor: 'pointer',
          '&:hover': {
            '#trade-button': {
              backgroundColor: 'rgba(246, 156, 0, 1)',
              color: '#F9F9F9',
            },
          },
        }}>
          <Stack width={'100%'} direction={'row'} alignItems={'center'}>
            <Stack sx={{
              svg: {
                width: '24px',
                height: '24px',
              }
            }}>
              <TokenLogo/>
            </Stack>
            <Stack sx={{
              marginLeft: '8px',
              color: '#F9F9F9',
              fontSize: '14px',
              lineHeight: '20px',
              fontWeight: '700',
            }}>
              {pair1}
            </Stack>
            <Stack sx={{
              color: '#F9F9F9',
              fontSize: '12px',
              lineHeight: '16px',
              fontWeight: '400',
            }}>
              /{pair2}
            </Stack>
          </Stack>
          <Stack pr={'12px'} flexShrink={0} sx={{
            textAlign: 'end',
            color: '#F9F9F9',
            fontSize: '14px',
            lineHeight: '20px',
            fontWeight: '700',
          }}>
            {price ? price.toFixed(`${pair1}/${pair2}`.getTokenPriceDecimals()) : '-'}
          </Stack>
          <Stack flexShrink={0} sx={{
            backgroundColor: price24h && price24h > 0 ? 'rgba(43, 181, 90, 1)' : 'rgba(232, 66, 98, 1)',
            textAlign: 'center',
            padding: '6px 16px',
            color: 'white',
            fontSize: '14px',
            lineHeight: '16px',
            fontWeight: '700',
            borderRadius: '4px',
            minWidth: '88px',
          }}>
            {price24h && price24h > 0 ? '+' : ''}{price24h?.toFixed(2)}%
          </Stack>
        </Stack>
      </Link>
    )
  } else {
    return (
      <Link to={`/futures?pt=${pair1}%2F${pair2}`}>
        <Stack direction={'row'} alignItems={'center'} p={'20px'} sx={{
          cursor: 'pointer',
          color: '#F9F9F9',
          '&:hover': {
            '#trade-button': {
              backgroundColor: 'rgba(246, 156, 0, 1)',
              color: 'rgba(3, 3, 8, 1)',
            }
          },
        }}>
          <Stack width={'100%'} direction={'row'} alignItems={'center'} gap={'8px'} sx={{
            svg: {
              width: '24px',
              height: '24px',
            }
          }}>
            <TokenLogo/>
            <Stack>
              {pair1}/{pair2}
            </Stack>
          </Stack>
          <Stack textAlign={'end'} pr={'4px'} flexShrink={0}>
            {price ? price.toFixed(`${pair1}/${pair2}`.getTokenPriceDecimals()) : '-'}
          </Stack>
          <Stack width={'106px'} textAlign={'end'} pr={'40px'} flexShrink={0} sx={(theme) => ({
            color: price24h && price24h > 0 ? 'rgba(43, 181, 90, 1)' : 'rgba(232, 66, 98, 1)',
          })}>
            {price24h && price24h > 0 ? '+' : ''}{price24h?.toFixed(2)}%
          </Stack>
          <Stack id={'trade-button'} flexShrink={0} px={'12px'} py={'5px'} sx={{
            color: 'rgba(234, 170, 0, 1)',
            borderRadius: '4px',
            border: '1px solid rgba(234, 170, 0, 0.4)',
          }}>
            Trade
          </Stack>
        </Stack>
      </Link>
    )
  }
}