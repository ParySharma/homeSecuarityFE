'use client';

import React, { useState } from 'react';
import { AppBar, Toolbar, Button, Box, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import useAuth from '@/contexts/useAuth';
import { USER_ROLES } from '@/utils/constants';

const HeaderMenu = () => {
  const router = useRouter();
  const { userRole } = useAuth();
  const [selectedMenu, setSelectedMenu] = useState<number | null>(1);

  const getMenuItems = (role: string) => {
    switch (role) {
      case USER_ROLES.ADMIN:
        return [
          { id: 1, label: 'Dashboard', path: '/admin-dashboard' },
          { id: 2, label: 'Add Guest', path: '/add-guest' },
          { id: 3, label: 'Guests List', path: '/guests-list' },
        ];
      case USER_ROLES.OWNER:
        return [
          { id: 1, label: 'Dashboard', path: '/owner-dashboard' },
          { id: 2, label: 'Add Guest', path: '/add-guest' },
          { id: 3, label: 'Guests List', path: '/guests-list' },
        ];
      case USER_ROLES.GUARD:
        return [
          { id: 1, label: 'Dashboard', path: '/guard-dashboard' },
          { id: 2, label: 'Add Guest', path: '/add-guest' },
          { id: 3, label: 'Guests List', path: '/guests-list' },
        ];
      default:
        return [];
    }
  };

  const menuItems = getMenuItems(userRole || '');

  return (
    <AppBar
      position='static'
      sx={{
        backgroundColor: 'transparent',
        color: 'var(--body-text-color)',
        boxShadow: 'none',
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          {menuItems.map((item) => {
            return (
              <Button
                key={item.id}
                onClick={() => {
                  setSelectedMenu(item.id);
                  router.push(item.path);
                }}
                sx={{
                  color: 'var(--body-text-color)',
                  textTransform: 'none',
                  fontSize: '1.2rem',
                  fontWeight: selectedMenu === item.id ? 700 : 500,
                  borderBottom:
                    selectedMenu === item.id
                      ? '2px solid var(--primary-button-background-color)'
                      : 'none',
                  '&:hover': {
                    backgroundColor: 'var(--primary-button-back-opacity)',
                  },
                }}
              >
                {item.label}
              </Button>
            );
          })}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderMenu;
