'use client';
import useAuth from '@/contexts/useAuth';
import { Button } from '@mui/material';
import React from 'react';

const Dashboard = () => {
  const { logout, user } = useAuth();

  return (
    <div>
      <h1>Dashboard</h1>
      <Button
        variant='contained'
        color='primary'
        onClick={() => {
          logout();
        }}
      >
        logout
      </Button>
    </div>
  );
};

export default Dashboard;
