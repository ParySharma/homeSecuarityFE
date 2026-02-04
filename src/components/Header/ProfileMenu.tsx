import * as React from 'react';
import {
  Box,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import useAuth from '@/contexts/useAuth';
import { useRouter } from 'next/navigation';

export default function ProfileMenu() {
  const { logout, user } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();

  const handleOpen = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

  const handleProfileClick = () => {
    handleClose();
    router.push('/profile');
  };

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Tooltip title=''>
          <IconButton onClick={handleOpen} size='small'>
            <Avatar
              sx={{
                width: 35,
                height: 35,
                bgcolor: 'var(--primary-button-background-color)',
                color: 'var(--primary-button-text-color)',
                fontWeight: 600,
              }}
            >
              {user?.user_meta?.name?.charAt(0)?.toUpperCase() || 'U'}
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        slotProps={{
          paper: {
            sx: {
              mt: 1.5,
              minWidth: 220,
              borderRadius: 2,
              background: 'var(--card-background-color)',
              color: 'var(--body-text-color)',
              backdropFilter: 'blur(12px)',
              border: '1px solid var(--border-color)',
              boxShadow: '0 12px 30px rgba(0,0,0,0.35)',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                right: 16,
                width: 10,
                height: 10,
                background: 'var(--card-background-color)',
                transform: 'translateY(-50%) rotate(45deg)',
                borderLeft: '1px solid var(--border-color)',
                borderTop: '1px solid var(--border-color)',
              },
            },
          },
        }}
      >
        <MenuItem
          sx={menuItemSX}
          onClick={() => {
            handleProfileClick();
          }}
        >
          <Avatar sx={avatarSX} />
          <Typography>Profile</Typography>
        </MenuItem>

        {/* <MenuItem sx={menuItemSX} onClick={handleClose}>
          <Avatar sx={avatarSX} />
          <Typography>My account</Typography>
        </MenuItem> */}

        {/* <Divider sx={{ borderColor: 'var(--divider-color)' }} /> */}

        {/* <MenuItem sx={menuItemSX} onClick={handleClose}>
          <ListItemIcon sx={iconSX}>
            <PersonAdd fontSize='small' />
          </ListItemIcon>
          Add another account
        </MenuItem>

        <MenuItem sx={menuItemSX} onClick={handleClose}>
          <ListItemIcon sx={iconSX}>
            <Settings fontSize='small' />
          </ListItemIcon>
          Settings
        </MenuItem> */}

        <MenuItem
          sx={{ ...menuItemSX, color: 'var(--error-color)' }}
          onClick={() => {
            handleClose();
            logout();
          }}
        >
          <ListItemIcon sx={{ ...iconSX, color: 'var(--error-color)' }}>
            <Logout fontSize='small' />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}

/* ================= SX REUSABLE STYLES ================= */

const menuItemSX = {
  gap: 1.5,
  borderRadius: 1,
  mx: 0.5,
  my: 0.3,
  '&:hover': {
    backgroundColor: 'var(--primary-button-back-opacity)',
  },
};

const avatarSX = {
  width: 28,
  height: 28,
  bgcolor: 'var(--primary-button-background-color)',
  fontSize: 14,
};

const iconSX = {
  color: 'var(--text-secondary-color)',
  minWidth: 36,
};
