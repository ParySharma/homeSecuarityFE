'use client';

import { useEffect, useLayoutEffect } from 'react';
import useAuth from '@/contexts/useAuth';
import { useRouter } from 'next/navigation';
import { getLoginPopupStatus } from '@/utils/localStorage';
import useMediaQuery from '@mui/material/useMediaQuery';
import { SCREEN_SOLUTION, USER_ROLES } from '@/utils/constants';
import { AuthGuard } from '@/guard/AuthGuard';
import { checkRole } from '@/utils/commonFunction';
import UserRoleGuard from '@/guard/UserRoleGuard';

export default function CommonLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { logout, user, userRole, companySettings } = useAuth();
  const isMobile = useMediaQuery(SCREEN_SOLUTION.MOBILE);
  console.log(userRole, 'userRoleuserRole=====');

  const router = useRouter();
  const loginPopupCheck = getLoginPopupStatus();

  const handleStorageEvent = (event: StorageEvent) => {
    if (!event.key && !event.oldValue && !event.newValue) {
      logout(user?.email);
    }
  };

  // useLayoutEffect(() => {
  //   if (checkRole([USER_ROLES.ADMIN], userRole) && loginPopupCheck) {
  //     router.push('/dashboard');
  //   }
  // }, []);

  useEffect(() => {
    window.addEventListener('storage', handleStorageEvent);
    return () => {
      window.removeEventListener('storage', handleStorageEvent);
    };
  }, []);

  return (
    <AuthGuard>
      {/* <LanguageProvider> */}
      {/* <PopupModels> */}
      <UserRoleGuard>
        {/* <Header /> */}
        {/* <Container
              component={'main'}
              sx={{
                transition: 'all 0.5s ease 0s',
                minHeight: isMobile
                  ? 'calc(100svh - 300px)'
                  : 'calc(100vh - 200px)',
              }}
            > */}
        {children}
        {/* </Container>
            <Footer /> */}
      </UserRoleGuard>
      {/* </PopupModels> */}
      {/* </LanguageProvider> */}
    </AuthGuard>
  );
}
