// Libraries
import useAuth from '@/contexts/useAuth';
import { useRouter, usePathname } from 'next/navigation';
import { useLayoutEffect, useState } from 'react';

// Common Components
import { NULL } from '@/utils/constants';

export const AuthGuard = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { isAuthenticated, isInitialized, logoutFlag } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useLayoutEffect(() => {
    if (!isInitialized) return;

    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isInitialized, logoutFlag, pathname, router]);

  if (!isInitialized) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='loader'>Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return NULL; // Prevent rendering children while redirecting
  }

  return children;
};
