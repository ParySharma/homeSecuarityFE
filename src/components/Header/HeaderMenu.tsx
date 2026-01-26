'use client';

import React, { useState } from 'react';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import { useRouter, usePathname } from 'next/navigation';
import useAuth from '@/contexts/useAuth';
import { getMenuItems } from '@/utils/commonFunction';
import _map from 'lodash/map';

interface HeaderMenuProps {
  variant?: 'desktop' | 'mobile';
  onItemClick?: () => void;
}

const HeaderMenu = ({ variant = 'desktop', onItemClick }: HeaderMenuProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const { userRole } = useAuth();

  const menuItems = getMenuItems(userRole || '');

  const isMobile = variant === 'mobile';

  return (
    <AppBar
      position='static'
      sx={{
        backgroundColor: 'transparent',
        color: 'var(--body-text-color)',
        boxShadow: 'none',
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'flex-start' : 'center',
          gap: isMobile ? 1 : 2,
          px: isMobile ? 0 : 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            width: '100%',
          }}
        >
          {_map(menuItems, (item) => {
            const isActive = pathname === item?.path;

            return (
              <Button
                key={item?.id}
                fullWidth={isMobile}
                onClick={() => {
                  router.push(item?.path);
                  onItemClick?.();
                }}
                sx={{
                  justifyContent: isMobile ? 'flex-start' : 'center',
                  textAlign: 'left',
                  px: isMobile ? 2 : 1.5,
                  py: 1,
                  color: isActive
                    ? 'var(--primary-button-background-color)'
                    : 'var(--body-text-color)',
                  textTransform: 'none',
                  fontSize: '1rem',
                  fontWeight: isActive ? 700 : 500,
                  borderRight:
                    isMobile && isActive
                      ? '4px solid var(--primary-button-background-color)'
                      : 'none',
                  borderBottom:
                    !isMobile && isActive
                      ? '2px solid var(--primary-button-background-color)'
                      : 'none',
                  borderRadius: isMobile ? 2 : 0,
                  '&:hover': {
                    backgroundColor: 'var(--primary-button-back-opacity)',
                    color: '#fff',
                  },
                }}
              >
                {item?.label}
              </Button>
            );
          })}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderMenu;
