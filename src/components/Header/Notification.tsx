'use client';

import React from 'react';
import {
  Badge,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Paper,
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import useAuth from '@/contexts/useAuth';

const Notification = () => {
  const { user } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  // Dummy notifications for demo
  const notifications = [
    { id: 1, text: 'New message from John', type: 'success' },
    { id: 2, text: 'Server will be down at 2 AM', type: 'warning' },
    { id: 3, text: 'Payment failed', type: 'error' },
  ];

  const getColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'var(--success-color)';
      case 'warning':
        return 'var(--warning-color)';
      case 'error':
        return 'var(--error-color)';
      default:
        return 'var(--text-secondary-color)';
    }
  };

  return (
    <Box>
      {/* Notification Bell */}
      <IconButton
        onClick={handleOpen}
        sx={{
          color: 'var(--header-text-color)',
          backgroundColor: 'var(--primary-button-back-opacity)',
          '&:hover': { backgroundColor: 'var(--primary-button-back-opacity)' },
          width: 35,
          height: 35,
        }}
      >
        <Badge badgeContent={notifications.length} color='error'>
          <NotificationsIcon />
        </Badge>
      </IconButton>

      {/* Notification Dropdown */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            sx: {
              mt: 1,
              minWidth: 300,
              bgcolor: 'var(--card-background-color)',
              border: '1px solid var(--border-color)',
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
              borderRadius: 2,
            },
          },
        }}
      >
        <Typography sx={{ px: 2, py: 1, fontWeight: 600 }}>
          Notifications
        </Typography>
        {notifications.map((notif) => (
          <MenuItem key={notif.id} onClick={handleClose} sx={{ py: 1 }}>
            <Paper
              sx={{
                p: 1,
                bgcolor: 'var(--body-background-color)',
                borderRadius: 1,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  bgcolor: getColor(notif.type),
                  mr: 1.5,
                }}
              />
              <Typography
                sx={{ fontSize: 14, color: 'var(--text-secondary-color)' }}
              >
                {notif.text}
              </Typography>
            </Paper>
          </MenuItem>
        ))}
        {notifications.length === 0 && (
          <Typography sx={{ px: 2, py: 1, color: 'var(--text-muted-color)' }}>
            No notifications
          </Typography>
        )}
      </Menu>
    </Box>
  );
};

export default Notification;
