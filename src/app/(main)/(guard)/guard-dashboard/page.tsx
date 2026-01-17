'use client';
import CommonDashboard from '@/components/commonDashboard/CommonDashboard';
import useAuth from '@/contexts/useAuth';
import { visitorsMockData } from '@/utils/mockData';
import { Box, Button, Typography } from '@mui/material';
import React from 'react';

const Dashbaord = () => {
  const { logout } = useAuth();

  const data = visitorsMockData;

  return (
    <Box
      sx={{
        padding: 4,
      }}
    >
      <CommonDashboard data={data} />
    </Box>
  );
};

export default Dashbaord;
