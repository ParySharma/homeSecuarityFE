'use client';
import useAuth from '@/contexts/useAuth';
import { Button, Typography } from '@mui/material';
import React from 'react';

const Dashbaord = () => {
  const { logout } = useAuth();
  return (
    <div>
      <Typography variant='h4'>Dashboard</Typography>
      <Button
        variant='contained'
        color='primary'
        onClick={() => {
          logout();
        }}
      >
        log out
      </Button>
    </div>
  );
};

export default Dashbaord;
