import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { FC, useMemo } from "react";
import { Share } from "../../../components/icons";
import ShareMyOrderModal from "../../Dashboard/Modal/ShareMyOrderModal";
import { FuturesModalInfo } from "../OrderList";
import FuturesOrderShare from "./FuturesOrderShare";
import OrderTablePosition from "./OrderTablePosition";
import FuturesTableTitle from "./TableTitle";
import { Trans, t } from "@lingui/macro";
import useFuturesHistory, {
  FuturesHistoryService,
} from "../../../hooks/useFuturesHistory";

interface FuturesHistoryListProps {
  dataArray: Array<FuturesHistoryService>;
  buttonCallBack: (value: FuturesModalInfo) => void;
  style?: React.CSSProperties;
}

const HistoryTable: FC<FuturesHistoryListProps> = ({ ...props }) => {
  const rows = props.dataArray.map((item, index) => {
    return (
      <HistoryTableRow
        key={`HistoryTable + ${index}`}
        data={item}
        buttonCallBack={props.buttonCallBack}
      />
    );
  });
  const noOrder = useMemo(() => {
    return props.dataArray.length === 0;
  }, [props.dataArray.length]);

  return (
    <FuturesTableTitle
      dataArray={[
        t`Symbol`,
        t`Realized PnL`,
        t`Size`,
        t`Margin`,
        t`Open Price`,
        t`Close Price`,
        t`Founding Fee`,
        t`TP/SL`,
        t`Open Time`,
        t`Close Time`,
        t`Operate`,
      ]}
      noOrder={noOrder}
      helps={[
        {
          index: 1,
          helpInfo: (
            <p>
              <Trans>Including funding amounts.</Trans>
            </p>
          ),
        },
        {
          index: 2,
          helpInfo: (
            <p>
              <Trans>Leverage*Initial Margin</Trans>
            </p>
          ),
        },
        {
          index: 3,
          helpInfo: (
            <p>
              <Trans>Initial Margin + Added Margin,Added Margin is the margin for Add the user's position.</Trans>
            </p>
          ),
        },
      ]}
      style={props.style}
      noNeedPadding
    >
      {rows}
    </FuturesTableTitle>
  );
};

const tdNoPadding = {
  padding: "0px !important",
};

interface HistoryTableRowProps {
  data: FuturesHistoryService;
  buttonCallBack: (value: FuturesModalInfo) => void;
}
const HistoryTableRow: FC<HistoryTableRowProps> = ({ ...props }) => {
  const {
    isLong,
    lever,
    tp,
    sl,
    showOpenPrice,
    showPercent,
    isRed,
    showShareOrderModal,
    setShowShareOrderModal,
    shareOrder,
    showClosePrice,
    showSize,
    showMargin,
    openTime,
    closeTime,
    showRealizedPnL,
    showF,
  } = useFuturesHistory(props.data);

  return (
    <TableRow
      sx={(theme) => ({ "&: hover": { background: theme.normal.bg1 } })}
    >
      <ShareMyOrderModal
        value={shareOrder}
        open={showShareOrderModal}
        onClose={() => {
          setShowShareOrderModal(false);
        }}
        isClosed={true}
      />
      <TableCell>
        <OrderTablePosition
          tokenPair={props.data.tokenPair}
          isLong={isLong}
          lever={lever}
          status={props.data.status}
        />
      </TableCell>
      <TableCell sx={tdNoPadding}>
        <Stack spacing={"4px"}>
          <Box
            sx={(theme) => ({
              fontWeight: 700,
              fontSize: 10,
              color: isRed ? theme.normal.danger : theme.normal.success,
            })}
          >
            {showRealizedPnL}
          </Box>
          <Box
            sx={(theme) => ({
              display: "block",
              fontWeight: 400,
              fontSize: 12,
              color: isRed ? theme.normal.danger : theme.normal.success,
            })}
          >
            {`(${showPercent}%)`}
          </Box>
        </Stack>
      </TableCell>
      <TableCell sx={tdNoPadding}>
        <Box
          component={"p"}
          sx={(theme) => ({
            fontWeight: 700,
            fontSize: 10,
            color: theme.normal.text0,
          })}
        >
          {showSize}
        </Box>
      </TableCell>
      <TableCell sx={tdNoPadding}>
        <Box
          component={"p"}
          sx={(theme) => ({
            fontWeight: 700,
            fontSize: 10,
            color: theme.normal.text0,
          })}
        >
          {showMargin}
        </Box>
      </TableCell>
      <TableCell sx={tdNoPadding}>
        <Box
          component={"p"}
          sx={(theme) => ({
            fontWeight: 700,
            fontSize: 10,
            color: theme.normal.text0,
          })}
        >
          {showOpenPrice}
        </Box>
      </TableCell>
      <TableCell sx={tdNoPadding}>
        <Box
          component={"p"}
          sx={(theme) => ({
            fontWeight: 700,
            fontSize: 10,
            color: theme.normal.text0,
          })}
        >
          {showClosePrice}
        </Box>
      </TableCell>
      <TableCell sx={tdNoPadding}>
        <Box
          component={"p"}
          sx={(theme) => ({
            fontWeight: 700,
            fontSize: 10,
            color: theme.normal.text0,
          })}
        >
          {showF}
        </Box>
      </TableCell>

      <TableCell sx={tdNoPadding}>
        <Stack
          spacing={"4px"}
          sx={(theme) => ({
            "& p": {
              fontSize: 10,
              fontWeight: 400,
              color: theme.normal.text0,
            },
            "& span": { marginRight: "4px", color: theme.normal.text2 },
          })}
        >
          <Box component={"p"}>
            <span>
              <Trans>TP</Trans>
            </span>
            {tp}
          </Box>
          <Box component={"p"}>
            <span>
              <Trans>SL</Trans>
            </span>
            {sl}
          </Box>
        </Stack>
      </TableCell>
      <TableCell sx={tdNoPadding}>
        <Stack
          spacing={"4px"}
          sx={(theme) => ({
            fontWeight: "400",
            fontSize: "10px",
            lineHeight: "16px",
            color: theme.normal.text0,
          })}
        >
          <Box>{openTime[0]}</Box>
          <Box>{openTime[1]}</Box>
        </Stack>
      </TableCell>
      <TableCell sx={tdNoPadding}>
        <Stack
          spacing={"4px"}
          sx={(theme) => ({
            fontWeight: "400",
            fontSize: "10px",
            lineHeight: "16px",
            color: theme.normal.text0,
          })}
        >
          <Box>{closeTime[0]}</Box>
          <Box>{closeTime[1]}</Box>
        </Stack>
      </TableCell>
      <TableCell>
        <Stack direction={"row"} justifyContent={"flex-end"} spacing={"8px"}>
          <FuturesOrderShare
            component={"button"}
            onClick={() => setShowShareOrderModal(true)}
          >
            <Share />
          </FuturesOrderShare>
        </Stack>
      </TableCell>
    </TableRow>
  );
};

export default HistoryTable;
