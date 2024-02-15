import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ComposedChart, Line
} from 'recharts';
import {FC} from "react";
import useSWR from "swr";
import useTheme from "../../../../hooks/useTheme";
import {Stack} from "@mui/material";
import numeral from "numeral";
import {serviceBaseURL} from "../../../../lib/ArithFiRequest";
import useArithFi from "../../../../hooks/useArithFi";

type ChartsProps = {
  address: string | undefined
  from?: string
  to?: string
  simple?: boolean
  show?: boolean
}
const ReCharts: FC<ChartsProps> = ({...props}) => {
  const {nowTheme} = useTheme()
  const {chainsData, signature} = useArithFi()
  const to = props.to ?? new Date().toLocaleDateString().replaceAll('/', '-')
  const from = props.from ?? new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000).toLocaleDateString().replaceAll('/', '-')
  const {data} = useSWR(`${serviceBaseURL(chainsData.chainId)}/dashboard/personal/asset?walletAddress=${props.address}&from=${from}&to=${to}&copy=0`,
    (url: string) => fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": signature?.signature || ""
      }
    })
      .then((res) => res.json())
      .then((res: any) => res.data)
      .then((res) => res.map((item: any) => ({
        date: item.date,
        value: item?.available_balance + item?.copy_balance + item?.position_value_copy + item?.position_value_self
      })))
  )

  return (
    <Stack width={'100%'} height={'100%'}>
      {
        props.simple && data?.length > 0 && (
          <Stack sx={() => ({
            fontSize: '18px',
            lineHeight: '24px',
            fontWeight: '700',
            color: "#F9F9F9",
          })}>{Number(data[data.length - 1]?.daily ?? 0).toLocaleString('en-US', {
            maximumFractionDigits: 2,
          })
          } ATF</Stack>
        )
      }
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={data}
          syncId={'personal'}
        >
          {
            !props.simple && (
              <CartesianGrid strokeDasharray="3 3" stroke={nowTheme.normal.border}/>
            )
          }
          {
            !!props.show && (
              <XAxis dataKey="date" scale="auto" axisLine={false} hide={props.simple} tickLine={false} tick={{fontSize: '10px'}}/>
            )
          }
          {
            !!props.show && (
              <YAxis axisLine={false} tickLine={false} hide={props.simple} width={30}
                     tickFormatter={(value, index) => {
                       return numeral(value).format('0a').toUpperCase()
                     }}
                     tick={{fontSize: '10px'}}/>
            )
          }
          {
            !props.simple && !!props.show && (
              <Tooltip
                itemStyle={{
                  fontSize: '12px',
                  color: '#000',
                }}
                contentStyle={{
                  backgroundColor: '#fff',
                  color: '#000',
                  fontWeight: 700,
                  borderRadius: '12px',
                  border: `1px solid ${nowTheme.normal.border}`,
                }}
                labelStyle={{
                  fontSize: '12px',
                  fontWeight: 400,
                  color: '#000',
                }}
                formatter={(value: any) => Number(value).toLocaleString('en-US', {
                  maximumFractionDigits: 2,
                })}
              />
            )
          }
          <Line type="monotone" dataKey="value" stroke={nowTheme.normal.primary} dot={false} strokeWidth={2} unit={' ATF'}/>
        </ComposedChart>
      </ResponsiveContainer>
    </Stack>
  )
}

export default ReCharts