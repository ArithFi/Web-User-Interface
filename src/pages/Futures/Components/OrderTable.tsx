import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { FC, useMemo } from "react";
import { Share } from "../../../components/icons";
import MainButton from "../../../components/MainButton/MainButton";
import useFuturesOrder from "../../../hooks/useFuturesOrder";

import ShareNewOrderModal from "../../Dashboard/Modal/ShareNewOrderModal";
import {
  FuturesModalInfo,
  FuturesModalType,
  FuturesOrderService,
} from "../OrderList";
import FuturesOrderShare from "./FuturesOrderShare";
import OrderTablePosition from "./OrderTablePosition";
import FuturesTableTitle from "./TableTitle";
import { Trans, t } from "@lingui/macro";

interface FuturesOrderListProps {
  dataArray: Array<FuturesOrderService>;
  buttonCallBack: (value: FuturesModalInfo) => void;
  updateList: () => void;
  style?: React.CSSProperties;
}

const EditIcon = (
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M4 8C4 5.79086 5.79086 4 8 4H22C23.1046 4 24 4.89543 24 6C24 7.10457 23.1046 8 22 8H8V40H40V26C40 24.8954 40.8954 24 42 24C43.1046 24 44 24.8954 44 26V40C44 42.2092 42.2092 44 40 44H8C5.79088 44 4 42.2092 4 40V8Z"
      fill="#333333"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M34.6947 4C35.2254 3.9999 35.7344 4.21074 36.1096 4.5861L43.4145 11.8942C44.1952 12.6752 44.1952 13.941 43.4145 14.722L22.7317 35.4139C22.3566 35.7892 21.8478 36 21.3172 36H14C12.8954 36 12 35.1046 12 34V26.7199C12 26.1899 12.2104 25.6815 12.5849 25.3065L33.28 4.58663C33.6551 4.21114 34.164 4.0001 34.6947 4ZM34.6956 8.82958L16 27.5476V32H20.4885L39.1722 13.3081L34.6956 8.82958Z"
      fill="#333333"
    />
  </svg>
);

const OrderTable: FC<FuturesOrderListProps> = ({ ...props }) => {
  const rows = props.dataArray.map((item, index) => {
    return (
      <OrderTableRow
        key={`OrderTable + ${index}`}
        data={item}
        buttonCallBack={props.buttonCallBack}
        updateList={props.updateList}
      />
    );
  });
  const noOrder = useMemo(() => {
    if (props.dataArray.length === 0) {
      return true;
    }
    return false;
  }, [props.dataArray.length]);
  return (
    <FuturesTableTitle
      dataArray={[
        t`Symbol`,
        t`Actual Margin`,
        t`Open Price`,
        t`Stop Order`,
        t`Time`,
        t`Operate`,
      ]}
      style={props.style}
      noOrder={noOrder}
    >
      {rows}
    </FuturesTableTitle>
  );
};

interface OrderTableRowProps {
  data: FuturesOrderService;
  buttonCallBack: (value: FuturesModalInfo) => void;
  updateList: () => void;
}

const OrderTableRow: FC<OrderTableRowProps> = ({ ...props }) => {
  const {
    tokenName,
    isLong,
    lever,
    showLimitPrice,
    showBalance,
    mainButtonTitle,
    mainButtonLoading,
    mainButtonDis,
    mainButtonAction,
    showShareOrderModal,
    setShowShareOrderModal,
    shareOrder,
    tp,
    sl,
    openTime,
  } = useFuturesOrder(props.data, props.updateList);
  return (
    <TableRow
      sx={(theme) => ({ "&: hover": { background: theme.normal.bg1 } })}
    >
      <ShareNewOrderModal
        value={shareOrder}
        open={showShareOrderModal}
        onClose={() => {
          setShowShareOrderModal(false);
        }}
      />
      <TableCell>
        <OrderTablePosition
          tokenName={tokenName}
          isLong={isLong}
          lever={lever}
        />
      </TableCell>
      <TableCell>
        <Stack
          direction={"row"}
          spacing={"4px"}
          alignItems={"flex-end"}
          sx={(theme) => ({
            "& p": {
              fontWeight: 700,
              fontSize: 14,
              color: theme.normal.text0,
            },
          })}
        >
          <p>{showBalance}ATF</p>
        </Stack>
      </TableCell>
      <TableCell>
        <Box
          component={"p"}
          sx={(theme) => ({
            fontWeight: 700,
            fontSize: 14,
            color: theme.normal.text0,
          })}
        >
          {showLimitPrice}USDT
        </Box>
      </TableCell>
      <TableCell>
        <Stack spacing={"8px"} direction={"row"} alignItems={"center"}>
          <Stack
            spacing={"4px"}
            sx={(theme) => ({
              "& p": {
                fontSize: 12,
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
              {tp}USDT
            </Box>
            <Box component={"p"}>
              <span>
                <Trans>SL</Trans>
              </span>
              {sl}USDT
            </Box>
          </Stack>
          <Box
            sx={(theme) => ({
              width: "12px",
              height: "12px",
              cursor: "pointer",
              "& svg": {
                width: "12px",
                height: "12px",
                display: "block",
                "& path": {
                  fill: theme.normal.text2,
                },
              },
              "&:hover svg path": {
                fill: theme.normal.text0,
              },
              "&:active svg path": {
                fill: theme.normal.text0,
              },
            })}
            component={"button"}
            onClick={() =>
              props.buttonCallBack({
                data: props.data,
                type: FuturesModalType.trigger,
              })
            }
          >
            {EditIcon}
          </Box>
        </Stack>
      </TableCell>
      <TableCell>
        <Stack
          spacing={"4px"}
          sx={(theme) => ({
            fontWeight: "400",
            fontSize: "12px",
            lineHeight: "16px",
            color: theme.normal.text0,
          })}
        >
          <Box>{openTime[0]}</Box>
          <Box>{openTime[1]}</Box>
        </Stack>
      </TableCell>
      <TableCell>
        <Stack direction={"row"} justifyContent={"flex-end"} spacing={"8px"}>
          <MainButton
            title={t`Limit`}
            onClick={() =>
              props.buttonCallBack({
                data: props.data,
                type: FuturesModalType.editLimit,
              })
            }
            style={{
              width: "auto",
              height: "36px",
              minWidth: "65px",
              fontSize: 12,
              paddingLeft: `12px`,
              paddingRight: `12px`,
              borderRadius: `8px`,
            }}
          />
          <MainButton
            title={mainButtonTitle}
            isLoading={mainButtonLoading}
            disable={mainButtonDis}
            onClick={mainButtonAction}
            style={{
              width: "auto",
              height: "36px",
              minWidth: "65px",
              fontSize: 12,
              paddingLeft: `12px`,
              paddingRight: `12px`,
              borderRadius: `8px`,
            }}
          />
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

export default OrderTable;
