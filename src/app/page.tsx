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

  useLayoutEffect(() => {
    if (!pathname.startsWith('/')) return;

    if (!accessToken) {
      router.push('/login');
      return;
    }
    switch (userDetails?.role) {
      case USER_ROLES.ADMIN:
        router.push('/admin-dashboard');
        break;
      case USER_ROLES.GUARD:
        router.push('/guard-dashboard');
        break;
      case USER_ROLES.OWNER:
        router.push('/owner-dashboard');
        break;
      default:
        router.push('/dashboard');
    }
  }, []);

  return NULL;
};

export default LandingPage;
