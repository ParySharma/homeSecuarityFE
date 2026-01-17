'use client';

import React, { useState } from 'react';
import { Box, IconButton, Drawer, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Image from 'next/image';

import ProfileMenu from './ProfileMenu';
import Notification from './Notification';
import HeaderMenu from './HeaderMenu';
import { headerStyle } from './headerStyle';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import QuickAddButton from './QuickAddButton';
const Header = () => {
  const [open, setOpen] = useState(false);

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
