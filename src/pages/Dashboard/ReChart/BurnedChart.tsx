import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart, Line
} from 'recharts';
import {FC} from "react";
import useSWR from "swr";
import useTheme from "../../../hooks/useTheme";
import numeral from "numeral";
import {useNetwork} from "wagmi";
import {serviceBaseURL} from "../../../lib/ArithFiRequest";
import useArithFi from "../../../hooks/useArithFi";

type ReChartsProps = {
  from?: string
  to?: string
}

const ReCharts: FC<ReChartsProps> = ({...props}) => {
  const {nowTheme} = useTheme()
  const {chainsData, signature} = useArithFi()
  const to = props.to ?? new Date().toLocaleDateString().replaceAll('/', '-')
  const from = props.from ?? new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000).toLocaleDateString().replaceAll('/', '-')

  const {data} = useSWR(`${serviceBaseURL(chainsData.chainId)}/arithfi/dashboard/entirety/burned?from=${from}&to=${to}`,
    (url: string) => fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": signature?.signature || ""
      }
    })
      .then((res) => res.json())
      .then((res: any) => res.data))

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart
        data={data}
        syncId={'dashboard'}
      >
        <CartesianGrid strokeDasharray="3 3" stroke={nowTheme.normal.border} />
        <XAxis dataKey="date" scale="auto" axisLine={false} tickLine={false} tickSize={4} tick={{fontSize: '10px'}}/>
        <YAxis yAxisId={'left'} orientation={'left'} axisLine={false} tickLine={false}
               tickFormatter={(value, index) => {
                 return numeral(value).format('0a').toUpperCase()
               }} width={30}
               tick={{fontSize: '10px', strokeWidth: 1}}/>
        <YAxis domain={['dataMin', 'dataMax']} yAxisId={'right'} orientation={'right'} axisLine={false} tickLine={false}
               tickFormatter={(value, index) => {
                 return numeral(value).format('0a').toUpperCase()
               }} width={30}
               tick={{fontSize: '10px', strokeWidth: 1}}/>
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
        <Legend
          wrapperStyle={{
            fontSize: '14px',
          }}
          formatter={(value: any) => {
            return value.replace(/[A-Z]/g, ' $&').toLowerCase()
          }}
        />
        <Bar yAxisId={'left'} dataKey="daily" barSize={20} fill={nowTheme.normal.success} stackId="a"
             unit={' ATF'} minPointSize={1}/>
        <Line yAxisId={'right'} type="monotone" dataKey="cumulative" stroke={nowTheme.normal.primary} dot={false} strokeWidth={2} unit={' ATF'}/>
      </ComposedChart>
    </ResponsiveContainer>
  )
}

export default ReCharts