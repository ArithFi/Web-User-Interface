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
import useTheme from "../../../../hooks/useTheme";
import {Stack} from "@mui/material";
import numeral from 'numeral';
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
  const {data} = useSWR(`${serviceBaseURL(chainsData.chainId)}/dashboard/personal/volume?walletAddress=${props.address}&from=${from}&to=${to}&copy=3`,
    (url: string) => fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": signature?.signature || ""
      }
    })
      .then((res) => res.json())
      .then((res: any) => res.data))

  return (
    <Stack height={'100%'} width={'100%'}>
      {
        props.simple && data?.length > 0 && (
          <Stack sx={() => ({
            fontSize: '18px',
            lineHeight: '24px',
            fontWeight: '700',
            color: "#F9F9F9",
          })}>{Number(data[data.length - 1]?.cumulative ?? 0).toFixed(2)
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
              <YAxis yAxisId={'left'} orientation={'left'} width={30} hide={props.simple} axisLine={false} tickLine={false}
                     tickFormatter={(value, index) => {
                       return numeral(value).format('0a').toUpperCase()
                     }}
                     tick={{fontSize: '10px'}}/>
            )
          }
          {
            !!props.show && (
              <YAxis domain={['dataMin', 'dataMax']} width={30} hide={props.simple} yAxisId={'right'} orientation={'right'} axisLine={false}
                     tickFormatter={(value, index) => {
                       return numeral(value).format('0a').toUpperCase()
                     }}
                     tickLine={false} tick={{fontSize: '10px'}}/>
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
          {
            !props.simple && !!props.show && (
              <Legend
                wrapperStyle={{
                  fontSize: '14px',
                }}
                formatter={(value: any) => {
                  return value.replace(/[A-Z]/g, ' $&').toLowerCase()
                }}
              />
            )
          }
          <Bar dataKey="openLong" yAxisId={'left'} barSize={20} fill={nowTheme.normal.success} stackId="a"
               unit={' ATF'} minPointSize={1}
          />
          <Bar dataKey="closeLong" yAxisId={'left'} barSize={20} fill={nowTheme.normal.success_light_active}
               stackId="a" unit={' ATF'}/>
          <Bar dataKey="openShort" yAxisId={'left'} barSize={20} fill={nowTheme.normal.danger}
               stackId="a" unit={' ATF'}/>
          <Bar dataKey="closeShort" yAxisId={'left'} barSize={20} fill={nowTheme.normal.danger_light_active}
               stackId="a" unit={' ATF'}/>
          <Line type="monotone" yAxisId={'right'} dataKey="cumulative" stroke="#EAAA00" dot={false}
                strokeWidth={2} unit={' ATF'}/>
        </ComposedChart>
      </ResponsiveContainer>
    </Stack>
  )
}

export default ReCharts