import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ComposedChart,
} from "recharts";
import {FC, useMemo} from "react";
import useSWR from "swr";
import useTheme from "../../../../hooks/useTheme";
import {CustomTooltip} from "./CustomTooltip";
import numeral from "numeral";
import {Stack} from "@mui/system";
import {serviceBaseURL} from "../../../../lib/ArithFiRequest";
import useArithFi from "../../../../hooks/useArithFi";

type ChartsProps = {
  address: string | undefined;
  from?: string;
  to?: string;
  simple?: boolean;
  show?: boolean;
};

const ReCharts: FC<ChartsProps> = ({...props}) => {
  const {nowTheme} = useTheme();
  const {chainsData, signature} = useArithFi();
  const to = props.to ?? new Date().toLocaleDateString().replaceAll("/", "-");
  const from =
    props.from ??
    new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000)
      .toLocaleDateString()
      .replaceAll("/", "-");

  const {data} = useSWR(
    `${serviceBaseURL(chainsData.chainId)}/dashboard/personal/return?walletAddress=${
      props.address
    }&from=${from}&to=${to}&copy=0`,
    (url: string) =>
      fetch(url, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": signature?.signature || ""
        }
      })
        .then((res) => res.json())
        .then((res: any) => res.data)
        .then((res) => res.map((item: any) => ({
          date: item.date,
          daily: item.daily,
          get: item.daily >= 0 ? item.daily : 0,
          loss: item.daily < 0 ? item.daily : 0,
        })))
  );

  const lastNumber = useMemo((() => {
    if (data && data.length > 0) {
      return data[data.length - 1]?.daily || 0
    } else {
      return 0
    }
  }), [data])

  return (
    <Stack width={"100%"} height={"100%"}>
      {props.simple && data?.length > 0 && (
        <Stack
          sx={() => ({
            fontSize: "18px",
            lineHeight: "24px",
            fontWeight: "700",
            color: "#F9F9F9",
          })}
        >
          {lastNumber.toFixed(2)}{" "}
          ATF
        </Stack>
      )}
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} syncId={"personal"}>
          {!props.simple && (
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={nowTheme.normal.border}
            />
          )}
          {
            !!props.show && (
              <XAxis
                dataKey="date"
                scale="auto"
                axisLine={false}
                hide={props.simple}
                tickLine={false}
                tick={{fontSize: "10px"}}
              />
            )}
          {
            !!props.show && (
              <YAxis
                axisLine={false}
                tickLine={false}
                hide={props.simple}
                width={30}
                tickFormatter={(value, index) => {
                  return numeral(value).format("0a").toUpperCase();
                }}
                tick={{fontSize: "10px"}}
              />
            )}
          {!props.simple && !!props.show && <Tooltip content={<CustomTooltip/>}/>}
          <Bar
            dataKey="get"
            barSize={20}
            fill={nowTheme.normal.success}
            unit={" ATF"}
            minPointSize={1}
            stackId={"a"}
          />
          <Bar
            dataKey="loss"
            barSize={20}
            fill={nowTheme.normal.danger}
            unit={" ATF"}
            stackId={"a"}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </Stack>
  );
};

export default ReCharts;
