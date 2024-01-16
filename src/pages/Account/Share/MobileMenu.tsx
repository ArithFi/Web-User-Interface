import Stack from "@mui/material/Stack";
import {Link, useLocation, useSearchParams} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {t} from "@lingui/macro";
import useSWR from "swr";
import {useAccount} from "wagmi";

const Menu = () => {
  const location = useLocation();
  let [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get('address');
  const {address} = useAccount()
  const {data: isKol} = useSWR(
    (q || address)
      // TODO
      ? `https://db.arithfi.com/dashboardapi/invite/is-kol-whitelist/${
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
      // TODO
      ? `https://db.arithfi.com/arithfi/copy/kol/isKol?walletAddress=${q || address}` : undefined,
    (url: any) =>
      fetch(url)
        .then((res) => res.json())
        .then(res => res.value)
  )

  const menu = [
    {
      path: ['/account', '/account/assets', '/account/assets/overview'],
      name: t`Assets`,
      show: true,
    },
    {
      path: ['/account/futures'],
      name: t`Futures`,
      show: true,
    },
    {
      path: ['/account/copy'],
      name: t`Copy Trading`,
      show: true,
    },
    {
      path: ['/account/referral'],
      name: t`Referral`,
      show: isKol,
    },
    {
      path: ['/account/profitsharing'],
      name: t`Profit Sharing`,
      show: isCopyKol,
    },
  ]
  const [ position, setPosition] = useState(searchParams.get('position') ?? 0);
  const ref = useRef(null);

  useEffect(() => {
    if (position && ref?.current) {
      // @ts-ignore
      ref.current.scrollLeft = position
    }
  }, [ref]);

  return (
    <Stack width={'100%'} height={'44px'} alignItems={"center"} gap={'12px'} direction={'row'} px={'20px'} overflow={"scroll"} ref={ref}
           onScroll={(e) => {
             // @ts-ignore
             setPosition(e?.target?.scrollLeft);
             // @ts-ignore
             setSearchParams({
               ...searchParams,
               position: position
             })
           }}
           sx={(theme) => ({
             backgroundColor: theme.normal.bg1,
             borderBottom: `1px solid ${theme.normal.border}`,
           })}>
      {
        menu?.filter((item) => item.show)?.map((item) => (
          <Link to={`${item.path[0]}?${searchParams.toString()}`} key={item.name} style={{ height: '100%' }}>
            <Stack px={'12px'} fontSize={'16px'} fontWeight={'700'} lineHeight={'22px'} sx={(theme) => ({
              color: item.path.includes(location.pathname) ? theme.normal.primary : theme.normal.text0,
              cursor: 'pointer',
              height: '100%',
              justifyContent: 'center',
              borderBottom: item.path.includes(location.pathname) ? `2px solid ${theme.normal.primary}` : "none",
              whiteSpace: 'nowrap',
            })}>
              {item.name}
            </Stack>
          </Link>
        ))
      }
    </Stack>
  )
}

export default Menu