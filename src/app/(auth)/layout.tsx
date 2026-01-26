'use client';

import styled from '@emotion/styled';
import Box from '@mui/material/Box';
// Common Components
import useAuth from '@/contexts/useAuth';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { setTheme } from '@/utils/theme';

import Stack from '@mui/material/Stack';
import useMediaQuery from '@mui/material/useMediaQuery';
import Typography from '@mui/material/Typography';
// import {
//   SCREEN_SOLUTION,
//   REFRESH_TOKEN_KEY,
//   THEME,
// } from '@common/constants/defaults';
import {
  setLocalStorage,
  setLoginResponse,
  setRefreshToken,
  // setTabSettings,
  setUserMeta,
  // TAB_SETTINGS_KEY,
} from '@/utils/localStorage';
import moment from 'moment';
import clsx from 'clsx';
import { SCREEN_SOLUTION, THEME } from '@/utils/constants';
import { GuestGuard } from '@/guard/GuestGuard';
// import { ZomoHealthLoginLogoIcon } from '@/images/login';

const BoxStyled: any = styled(Box)`
  background-color: var(--body-background-color);

  .login-background {
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-color: #ebf4f1;
    background-size: cover;
    min-height: 100vh;

    ${SCREEN_SOLUTION.MOBILE} {
      min-height: 100svh;
    }
  }

  .web-screen {
    background-image: url('/images/auth/bg.png');

    background-position: center bottom;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .mobile-screen {
    background-image: url('/images/auth/mobile_bg.png');
    background-position: center bottom;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .mobile-logo {
      padding-top: 12%;
      margin: 0 auto;
      // position: absolute;
      // top: 12%;
      // left: 50%;
      // transform: translate(-50%, -50%);
      svg {
        width: 279px;
        height: 29px;
      }
    }
  }
`;
export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { initialize } = useAuth();
  // const isMobile = useMediaQuery(SCREEN_SOLUTION.MOBILE);
  // const isTablet = useMediaQuery(SCREEN_SOLUTION.TABLET);
  // const isDesktop = useMediaQuery(SCREEN_SOLUTION.DESKTOP);
  // const pathname = usePathname();

  // useEffect(() => {
  //   if ('serviceWorker' in navigator) {
  //     const firebaseConfig = encodeURIComponent(
  //       JSON.stringify({
  //         apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
  //         authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  //         projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  //         storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  //         messagingSenderId: process.env.NEXT_PUBLIC_MESSAGIND_SENDER_ID,
  //         appId: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_APP_ID,
  //       })
  //     );
  //     let scriptURL = `/firebase-messaging-sw.js?firebaseConfig=${firebaseConfig}`;

  //     navigator.serviceWorker
  //       .register(scriptURL)
  //       .then((registration) => {
  //         // Handle successful registration
  //       })
  //       .catch((err) => {
  //         // Handle registration error
  //       });
  //   }
  // }, []);

  const handleStorage = (key: string, value: any) => {
    switch (key) {
      // case REFRESH_TOKEN_KEY:
      //   setRefreshToken(value);
      //   break;
      case 'user_meta':
        setUserMeta(JSON.parse(value));
        break;
      case 'user_data':
        setLoginResponse(JSON.parse(value));
        break;
      case 'companySettings':
        setLocalStorage(key, JSON.parse(value));
        break;
      case 'activeplugins':
      case 'healthForms':
      case 'sideMenuSettings':
        setLocalStorage(key, value);
        break;
      // case TAB_SETTINGS_KEY:
      //   setTabSettings(value);
      // break;
      default:
        initialize();
        break;
    }
  };

  const handleStorageEvent = (event: any) => {
    if (event.key && !event.oldValue && event.newValue) {
      handleStorage(event.key, event.newValue);
    }
  };

  useEffect(() => {
    setTheme(THEME.LIGHT, false);
    window.addEventListener('storage', handleStorageEvent);

    return () => {
      window.removeEventListener('storage', handleStorageEvent);
    };
  }, []);

  // const renderChild = () => {
  //   return <BoxStyled>{children}</BoxStyled>;
  // };

  // return pathname?.includes('/reset-password') ? (
  //   renderChild()
  // ) : (
  return <GuestGuard>{children}</GuestGuard>;
  // );
}
