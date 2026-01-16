// Libraries
import useAuth from '@/contexts/useAuth';
import { NULL, USER_ROLES } from '@/utils/constants';
import { useRouter, useSearchParams } from 'next/navigation';
import { useLayoutEffect } from 'react';

// Common Components
// import LoadingScreen from '@/components/LoadingScreen';

// Utils

export const GuestGuard = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { isAuthenticated, isInitialized, userRole } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect');
  console.log(userRole, 'userRole in GuestGuard=======================');

  useLayoutEffect(() => {
    if (!isInitialized || !isAuthenticated) return;

    if (redirectUrl) {
      router.push(redirectUrl);
      return;
    }

    switch (userRole) {
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
  }, [isAuthenticated, isInitialized, userRole, redirectUrl, router]);

  if (!isInitialized) {
    return (
      <div>
        {/* <LoadingScreen /> */}
        Loading...
      </div>
    );
  }

  if (isAuthenticated) {
    return NULL; // Prevent rendering children while redirecting
  }

  return children;
};
