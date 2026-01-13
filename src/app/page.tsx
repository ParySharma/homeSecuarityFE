'use client';

// Libraries
import { useLayoutEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

// Utils
import { getAccessToken, getUserMeta } from '@/utils/localStorage';
import { NULL, USER_ROLES } from '@/utils/constants';

const LandingPage = () => {
  console.log('Landing Page');

  const router = useRouter();
  const pathname = usePathname();
  const accessToken = getAccessToken();
  const userDetails = getUserMeta();
  console.log(accessToken, 'accessToken');

  useLayoutEffect(() => {
    if (!pathname.startsWith('/')) return;

    if (!accessToken) {
      router.push('/login');
      return;
    }

    switch (userDetails?.role) {
      // case USER_ROLES.ADMIN:
      //   return router.push(ORG_ROUTE.DASHBOARD);
      case USER_ROLES.OWNER:
        return router.push('/dashboard');

      default:
        return router.push('/dashboard');
    }
  }, []);

  return NULL;
};

export default LandingPage;
