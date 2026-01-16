import useAuth from '@/contexts/useAuth';
import { checkRole } from '@/utils/commonFunction';
import { USER_ROLES } from '@/utils/constants';
import { notFound, usePathname } from 'next/navigation';
import { PropsWithChildren, useEffect } from 'react';

const UserRoleGuard = ({ children }: PropsWithChildren) => {
  const { userRole } = useAuth();
  const pathname = usePathname();

  useEffect(() => {
    if (
      pathname.startsWith('/owner-dashboard') &&
      checkRole([USER_ROLES.GUARD, USER_ROLES.ADMIN], userRole)
    ) {
      return notFound();
    }
    if (
      pathname.startsWith('/guard-dashboard') &&
      checkRole([USER_ROLES.OWNER, USER_ROLES.ADMIN], userRole)
    ) {
      return notFound();
    }
    if (
      pathname.startsWith('/admin-dashboard') &&
      checkRole([USER_ROLES.OWNER, USER_ROLES.GUARD], userRole)
    ) {
      return notFound();
    }
  }, [userRole, pathname]);

  return children;
};

export default UserRoleGuard;
