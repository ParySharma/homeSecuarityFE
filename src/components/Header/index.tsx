'use client';

import React, { useState } from 'react';
import {
  Box,
  IconButton,
  Drawer,
  Typography,
  Chip,
  Tooltip,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Image from 'next/image';

import ProfileMenu from './ProfileMenu';
import Notification from './Notification';
import HeaderMenu from './HeaderMenu';
import { headerStyle } from './headerStyle';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import QuickAddButton from './QuickAddButton';
import useAuth from '@/contexts/useAuth';
import { InfoOutline } from '@mui/icons-material';
const Header = () => {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  return (
    <>
      <Box sx={headerStyle}>
        {/* LEFT: Mobile Menu Icon + Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {/* Mobile Hamburger */}
          <IconButton
            onClick={() => setOpen(true)}
            sx={{ display: { xs: 'flex', md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          <Image
            src='/logo/logo-3.png'
            alt='Home Security'
            width={44}
            height={44}
            priority
            style={{ objectFit: 'contain' }}
          />
        </Box>

        {/* CENTER: Desktop Menu */}
        <Box
          sx={{
            textAlign: 'center',
            display: { xs: 'none', md: 'block' },
          }}
        >
          <HeaderMenu variant='desktop' />
        </Box>

        {/* RIGHT: Notifications + Profile */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Chip
            label={user?.assigned_SocietieName}
            variant='outlined'
            sx={{
              span: {
                lineHeight: 1.2,
                fontSize: '0.875rem',
                color: 'var(--primary-button-background-color)',
              },
              display: { xs: 'none', md: 'flex' },
            }}
          />
          <Tooltip title='Quick add guest'>
            <IconButton
              onClick={() => {}}
              size='small'
              sx={{
                color: 'var(--header-text-color)',
                backgroundColor: 'var(--primary-button-back-opacity)',
                '&:hover': {
                  backgroundColor: 'var(--primary-button-back-opacity)',
                },
                width: 35,
                height: 35,
              }}
            >
              <InfoOutline />
            </IconButton>
          </Tooltip>

          <QuickAddButton />
          <Notification />
          <ProfileMenu />
        </Box>
      </Box>

      {/* MOBILE SIDE MENU */}
      <Drawer
        anchor='left'
        open={open}
        onClose={() => setOpen(false)}
        slotProps={{
          paper: {
            sx: {
              width: 260,
              p: 2,
              backgroundColor: 'var(--card-background-color)',
            },
          },
        }}
      >
        {/* Drawer Header */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 2,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Image
              src='/logo/logo-3.png'
              alt='Home Security'
              width={36}
              height={36}
            />
            <Typography fontWeight={600}>Home Security</Typography>
          </Box>

          <IconButton onClick={() => setOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Mobile Menu Items */}
        <HeaderMenu variant='mobile' onItemClick={() => setOpen(false)} />
      </Drawer>
    </>
  );
};

export default Header;
