'use client';

import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import ProfileMenu from './ProfileMenu';
import { headerStyle } from './headerStyle';
import Notification from './Notification';
import HeaderMenu from './HeaderMenu';

const Header = () => {
  return (
    <Box sx={headerStyle}>
      {/* Left: Logo + Title */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0 }}>
        <Image
          src='/logo/logo-3.png'
          alt='Home Security'
          width={44}
          height={44}
          priority
          style={{
            objectFit: 'contain',
          }}
        />
      </Box>

      <Box
        sx={{
          // flexGrow: 1,
          textAlign: 'center',
          display: { xs: 'none', md: 'block' },
        }}
      >
        <HeaderMenu />
      </Box>

      {/* Right: Profile */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Notification />
        <ProfileMenu />
      </Box>
    </Box>
  );
};

export default Header;
