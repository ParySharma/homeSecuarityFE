'use client';

// Libraries
import { useLayoutEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

// Utils
import { getAccessToken } from '@/utils/localStorage';
import { NULL, USER_ROLES } from '@/utils/constants';
import { decodeJWT } from '@/utils/jwt';

const LandingPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const accessToken = getAccessToken();

  useLayoutEffect(() => {
    if (!pathname.startsWith('/')) return;
    if (!accessToken) {
      router.push('/login');
      return;
    }

    const userDetails = decodeJWT(accessToken);
    switch (userDetails?.role_id) {
      default:
        return router.push('/dashboard');
    }
  }, []);

  return NULL;
};

export default LandingPage;
