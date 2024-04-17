import {Stack} from "@mui/system";
import useWindowWidth from "../../../hooks/useWindowWidth";
import {Link} from "react-router-dom";
import {Trans} from "@lingui/macro";

const DownloadAppButton = () => {
  const {isBigMobile} = useWindowWidth();

  if (!isBigMobile) return <></>

  return (
    <Stack style={{
      position: "fixed",
      bottom: "80px",
      width: "100%",
      padding: "0 20px",
      zIndex: 999,
    }}>
      <Link to={`/home?download`} target={"_blank"}>
        <Stack
          style={{
            backgroundColor: "#EAAA004D",
            padding: "12px",
            borderRadius: "24px",
            color: "white",
            fontSize: "14px",
            lineHeight: "20px",
            fontWeight: "400",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "8px",
            justifyContent: "center",
          }}
        >
          <Stack>
            <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="0.5" width="24" height="24" rx="4" fill="#171A1F"/>
              <circle cx="12.5" cy="12" r="12" fill="#171A1F"/>
              <path
                d="M12.6829 5.625H9.12543L4.75781 17.6249H7.15221L8.79006 13.125H15.4126L14.5937 10.875H9.60899L10.7009 7.875H13.5018L12.6829 5.625Z"
                fill="white"/>
              <path d="M16.6938 7.87494L15.8749 5.625H13.4805L14.2994 7.87494H16.6938Z" fill="#F69C00"/>
              <path d="M14.5742 8.625H16.9686L20.2444 17.625H17.85L14.5742 8.625Z" fill="white"/>
            </svg>
          </Stack>
          <Stack>
            <Trans>
              Open APP, 0 slippage trading at any time
            </Trans>
          </Stack>
        </Stack>
      </Link>
    </Stack>
  )
}

export default DownloadAppButton