import Stack from "@mui/material/Stack";
import {Link, useLocation, useSearchParams} from "react-router-dom";
import {t} from "@lingui/macro";
import useSWR from "swr";
import {useAccount} from "wagmi";
import {serviceBaseURL} from "../../../lib/ArithFiRequest";
import useArithFi from "../../../hooks/useArithFi";

const Menu = () => {
  const location = useLocation();
  const { chainsData, signature } = useArithFi();
  let [searchParams] = useSearchParams();
  const q = searchParams.get('address');
  const { address } = useAccount();

  const {data: isKol} = useSWR(
    (q || address)
      ? `${serviceBaseURL(chainsData.chainId)}/invite/is-kol-whitelist?walletAddress=${
        q || address
      }`
      : undefined,
    (url: any) =>
      fetch(url)
        .then((res) => res.json())
        .then((res: any) => res.value)
  );

  const {data: isCopyKol} = useSWR(
    (q || address)
      ? `${serviceBaseURL(chainsData.chainId)}/copy/kol/get?kolAddress=${q || address}` : undefined,
    (url: any) =>
      fetch(url, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": signature?.signature || ""
        }
      })
        .then((res) => res.json())
        .then(res => !!res.data)
  )

  const menu = [
    {
      path: ['/account', '/account/assets', '/account/assets/overview'],
      name: t`Assets`,
      icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_18102_112028)">
          <path fillRule="evenodd" clipRule="evenodd"
                d="M10.2614 0.755931C10.5802 0.571837 10.988 0.681087 11.1721 0.999948L12.7095 3.66291C12.8287 3.86929 12.8286 4.12358 12.7093 4.3299C12.5901 4.53621 12.3698 4.66317 12.1314 4.66291L5.99311 4.65625C5.69151 4.65592 5.42769 4.45315 5.34979 4.16178C5.27189 3.87041 5.39931 3.56303 5.6605 3.41223L10.2614 0.755931ZM8.47721 3.32561L10.9767 3.32833L10.3507 2.24396L8.47721 3.32561Z"
                fill="currentColor" fillOpacity="0.8"/>
          <path fillRule="evenodd" clipRule="evenodd"
                d="M0.666504 4.66662C0.666504 3.93022 1.26346 3.33328 1.99984 3.33328H13.9998C14.7362 3.33328 15.3332 3.93023 15.3332 4.66662V13.9999C15.3332 14.7363 14.7362 15.3333 13.9998 15.3333H1.99984C1.26346 15.3333 0.666504 14.7363 0.666504 13.9999V4.66662ZM13.9998 4.66662H1.99984V13.9999H13.9998V4.66662Z"
                fill="currentColor" fillOpacity="0.8"/>
          <path fillRule="evenodd" clipRule="evenodd"
                d="M9.33317 9.33328C9.33317 8.01435 10.4462 6.99995 11.7498 6.99995H14.6665C15.0347 6.99995 15.3332 7.29843 15.3332 7.66662V10.9999C15.3332 11.3681 15.0347 11.6666 14.6665 11.6666H11.7498C10.4462 11.6666 9.33317 10.6522 9.33317 9.33328ZM11.7498 8.33328C11.1205 8.33328 10.6665 8.81128 10.6665 9.33328C10.6665 9.85528 11.1205 10.3333 11.7498 10.3333H13.9998V8.33328H11.7498Z"
                fill="currentColor" fillOpacity="0.8"/>
          <path fillRule="evenodd" clipRule="evenodd"
                d="M14.6665 4.83328C15.0347 4.83328 15.3332 5.13176 15.3332 5.49995V13.4999C15.3332 13.8681 15.0347 14.1666 14.6665 14.1666C14.2983 14.1666 13.9998 13.8681 13.9998 13.4999V5.49995C13.9998 5.13176 14.2983 4.83328 14.6665 4.83328Z"
                fill="currentColor" fillOpacity="0.8"/>
        </g>
        <defs>
          <clipPath id="clip0_18102_112028">
            <rect width="16" height="16" fill="currentColor"/>
          </clipPath>
        </defs>
      </svg>,
      show: true,
    },
    {
      path: ['/account/futures'],
      name: t`Futures`,
      icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd"
              d="M11.6665 8.33329V9.34612V12C11.6665 12.5522 12.1142 13 12.6665 13C13.2188 13 13.6665 12.5522 13.6665 12V8.33329H11.6665ZM10.3332 9.34612V8.33329V6.99996V2.99996H2.99984V11.6666C2.99984 12.403 3.59679 13 4.33317 13H10.5577C10.4137 12.6969 10.3332 12.3578 10.3332 12V9.34612ZM12.6665 14.3333H10.6665H4.33317C2.86041 14.3333 1.6665 13.1394 1.6665 11.6666V2.33329C1.6665 1.9651 1.96498 1.66663 2.33317 1.66663H10.9998C11.368 1.66663 11.6665 1.9651 11.6665 2.33329V6.99996H14.3332C14.7014 6.99996 14.9998 7.29844 14.9998 7.66663V12C14.9998 13.2886 13.9552 14.3333 12.6665 14.3333ZM4.6665 5.66663C4.6665 5.48253 4.81574 5.33329 4.99984 5.33329H8.33317C8.51726 5.33329 8.6665 5.48253 8.6665 5.66663V6.33329C8.6665 6.51739 8.51726 6.66663 8.33317 6.66663H4.99984C4.81574 6.66663 4.6665 6.51739 4.6665 6.33329V5.66663ZM4.99984 7.99996C4.81574 7.99996 4.6665 8.1492 4.6665 8.33329V8.99996C4.6665 9.18405 4.81574 9.33329 4.99984 9.33329H8.33317C8.51726 9.33329 8.6665 9.18405 8.6665 8.99996V8.33329C8.6665 8.1492 8.51726 7.99996 8.33317 7.99996H4.99984Z"
              fill="currentColor"/>
      </svg>,
      show: true,
    },
    {
      path: ['/account/copy'],
      name: t`Copy Trading`,
      icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd"
              d="M5.27083 2.33333C5.12126 2.33333 5 2.45459 5 2.60417V3.66667H10.7292C11.6151 3.66667 12.3333 4.38488 12.3333 5.27083V11H13.3958C13.5454 11 13.6667 10.8787 13.6667 10.7292V2.60417C13.6667 2.45459 13.5454 2.33333 13.3958 2.33333H5.27083ZM12.3333 12.3333H13.3958C14.2818 12.3333 15 11.6151 15 10.7292V2.60417C15 1.71821 14.2818 1 13.3958 1H5.27083C4.38488 1 3.66667 1.71821 3.66667 2.60417V3.66667H2.60417C1.71821 3.66667 1 4.38488 1 5.27083V13.3958C1 14.2818 1.71821 15 2.60417 15H10.7292C11.6151 15 12.3333 14.2818 12.3333 13.3958V12.3333ZM2.60417 5C2.45459 5 2.33333 5.12126 2.33333 5.27083V13.3958C2.33333 13.5454 2.45459 13.6667 2.60417 13.6667H10.7292C10.8787 13.6667 11 13.5454 11 13.3958V5.27083C11 5.12126 10.8787 5 10.7292 5H2.60417Z"
              fill="currentColor"/>
      </svg>,
      show: true
    },
  ]
  const kolMenu = [
    {
      path: ['/account/referral'],
      name: t`Referral`,
      icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd"
              d="M3.3335 4.3335C3.3335 2.67664 4.67664 1.3335 6.3335 1.3335C7.99035 1.3335 9.3335 2.67664 9.3335 4.3335C9.3335 5.99035 7.99035 7.3335 6.3335 7.3335C4.67664 7.3335 3.3335 5.99035 3.3335 4.3335ZM6.3335 2.66683C5.41302 2.66683 4.66683 3.41302 4.66683 4.3335C4.66683 5.25397 5.41302 6.00016 6.3335 6.00016C7.25397 6.00016 8.00016 5.25397 8.00016 4.3335C8.00016 3.41302 7.25397 2.66683 6.3335 2.66683ZM6.23831 8.66683H9.00016C9.36835 8.66683 9.66683 8.96531 9.66683 9.3335C9.66683 9.70169 9.36835 10.0002 9.00016 10.0002H6.26683C5.5091 10.0002 4.98089 10.0007 4.56966 10.0343C4.16623 10.0672 3.93443 10.1287 3.75886 10.2181C3.38253 10.4099 3.07657 10.7159 2.88482 11.0922C2.79536 11.2678 2.73391 11.4996 2.70095 11.903C2.67144 12.2642 2.66745 12.7156 2.66691 13.3335H9.00016C9.36835 13.3335 9.66683 13.632 9.66683 14.0002C9.66683 14.3684 9.36835 14.6668 9.00016 14.6668H2.00016C1.63197 14.6668 1.3335 14.3684 1.3335 14.0002L1.3335 13.5716C1.33349 12.8491 1.33348 12.2663 1.37204 11.7944C1.41174 11.3085 1.49562 10.8817 1.69681 10.4869C2.01638 9.85967 2.52631 9.34971 3.15354 9.03013C3.54839 8.82895 3.97519 8.74507 4.46109 8.70537C4.93301 8.66682 5.51578 8.66682 6.23831 8.66683ZM11.3335 11.0002V9.66683H12.6668V11.0002H14.0002V12.3335H12.6668V13.6668H11.3335V12.3335H10.0002V11.0002H11.3335Z"
              fill="#F9F9F9" fillOpacity="0.35"/>
      </svg>,
      show: isKol
    },
    {
      path: ['/account/profitsharing'],
      name: t`Profit Sharing`,
      icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd"
              d="M5.27083 2.33333C5.12126 2.33333 5 2.45459 5 2.60417V3.66667H10.7292C11.6151 3.66667 12.3333 4.38488 12.3333 5.27083V11H13.3958C13.5454 11 13.6667 10.8787 13.6667 10.7292V2.60417C13.6667 2.45459 13.5454 2.33333 13.3958 2.33333H5.27083ZM12.3333 12.3333H13.3958C14.2818 12.3333 15 11.6151 15 10.7292V2.60417C15 1.71821 14.2818 1 13.3958 1H5.27083C4.38488 1 3.66667 1.71821 3.66667 2.60417V3.66667H2.60417C1.71821 3.66667 1 4.38488 1 5.27083V13.3958C1 14.2818 1.71821 15 2.60417 15H10.7292C11.6151 15 12.3333 14.2818 12.3333 13.3958V12.3333ZM2.60417 5C2.45459 5 2.33333 5.12126 2.33333 5.27083V13.3958C2.33333 13.5454 2.45459 13.6667 2.60417 13.6667H10.7292C10.8787 13.6667 11 13.5454 11 13.3958V5.27083C11 5.12126 10.8787 5 10.7292 5H2.60417Z"
              fill="#F9F9F9" fillOpacity="0.35"/>
        <path
          d="M4.66667 7.66667C4.66667 7.48257 4.81591 7.33333 5 7.33333H8.33333C8.51743 7.33333 8.66667 7.48257 8.66667 7.66667V8.33333C8.66667 8.51743 8.51743 8.66667 8.33333 8.66667H5C4.81591 8.66667 4.66667 8.51743 4.66667 8.33333V7.66667Z"
          fill="#F9F9F9" fillOpacity="0.35"/>
        <path
          d="M5 10C4.81591 10 4.66667 10.1492 4.66667 10.3333V11C4.66667 11.1841 4.81591 11.3333 5 11.3333H8.33333C8.51743 11.3333 8.66667 11.1841 8.66667 11V10.3333C8.66667 10.1492 8.51743 10 8.33333 10H5Z"
          fill="#F9F9F9" fillOpacity="0.35"/>
      </svg>,
      show: isCopyKol
    },
  ]


  return (
    <Stack gap={'8px'}>
      <Stack fontSize={'16px'} fontWeight={'700'} lineHeight={'22px'} gap={'8px'}>
        {
          menu?.filter((item) => item.show)?.map((item) => (
            <Link to={`${item.path[0]}?${searchParams.toString()}`} key={item.name}>
              <Stack px={'24px'} py={'20px'} direction={'row'} alignItems={"center"} gap={'8px'} sx={(theme) => ({
                color: item.path.includes(location.pathname) ? theme.normal.text0 : theme.normal.text2,
                width: 200,
                borderRadius: '8px',
                cursor: 'pointer',
                backgroundColor: item.path.includes(location.pathname) ? theme.normal.bg1 : null,
                svg: {
                  path: {
                    fill: theme.normal.text0,
                    fillOpacity: item.path.includes(location.pathname) ? 0.8 : 0.35,
                  }
                },
                "&: hover": {
                  color: theme.normal.text0,
                  backgroundColor: theme.normal.grey_hover,
                  svg: {
                    path: {
                      fill: theme.normal.text0,
                      fillOpacity: 0.8,
                    }
                  }
                },
              })}>
                {item.icon}
                {item.name}
              </Stack>
            </Link>
          ))
        }
      </Stack>
      {
        (isKol || isCopyKol) && (
          <Stack sx={(theme) => ({
            height: '1px',
            borderBottom: `1px solid ${theme.normal.border}`,
          })}></Stack>
        )
      }
      <Stack fontSize={'16px'} fontWeight={'700'} lineHeight={'22px'} gap={'8px'}>
        {
          kolMenu?.filter((item) => item.show)?.map((item) => (
            <Link to={`${item.path[0]}?${searchParams.toString()}`} key={item.name}>
              <Stack px={'24px'} py={'20px'} direction={'row'} alignItems={"center"} gap={'8px'} sx={(theme) => ({
                color: item.path.includes(location.pathname) ? theme.normal.text0 : theme.normal.text2,
                width: 200,
                borderRadius: '8px',
                cursor: 'pointer',
                backgroundColor: item.path.includes(location.pathname) ? theme.normal.bg1 : null,
                svg: {
                  path: {
                    fill: theme.normal.text0,
                    fillOpacity: item.path.includes(location.pathname) ? 0.8 : 0.35,
                  }
                },
                "&: hover": {
                  color: theme.normal.text0,
                  backgroundColor: theme.normal.bg1,
                  svg: {
                    path: {
                      fill: theme.normal.text0,
                      fillOpacity: 0.8,
                    }
                  }
                },
              })}>
                {item.icon}
                {item.name}
              </Stack>
            </Link>
          ))
        }
      </Stack>
    </Stack>
  )
}

export default Menu