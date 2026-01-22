import { Box, Stack, TableCell, TableRow, Typography } from '@mui/material';
import React from 'react';
import _map from 'lodash/map';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import DashCards from './components/DashCards';
import CommonTable from '../table/CommonTable';
import DashStatusTableList from './components/DashStatusTableList';
import CardComponent from '../Card';

const CommonDashboard = ({ data }: { data: any[] }) => {
  const countMap = {
    totalPending: {
      value: data?.filter((item) => item?.status === 3)?.length || 0,
      icon: <HourglassEmptyIcon />,
      gradient: 'linear-gradient(135deg, #f7971e, #ffd200)',
    },
    totalVisitors: {
      value: data?.length || 0,
      icon: <PeopleAltIcon />,
      gradient: 'linear-gradient(135deg, #667eea, #764ba2)',
    },
    totalRejected: {
      value: data?.filter((item) => item?.status === 2)?.length || 0,
      icon: <CancelIcon />,
      gradient: 'linear-gradient(135deg, #ff416c, #ff4b2b)',
    },
    totalApproved: {
      value: data?.filter((item) => item?.status === 1)?.length || 0,
      icon: <CheckCircleIcon />,
      gradient: 'linear-gradient(135deg, #43cea2, #185a9d)',
    },
  };

  const columns = [
    { label: 'Name' },
    { label: 'Mobile' },
    { label: 'Appartmen' },
    { label: 'Visitors', align: 'center' },
    { label: 'Purpose' },
    { label: 'Vehical' },
    { label: 'Gate' },
    { label: 'Date', align: 'center' },
    { label: 'Time' },
  ];

  const approvedList = data?.filter((item) => item?.status === 1);
  const pendingList = data?.filter((item) => item?.status === 3);
  const rejectedList = data?.filter((item) => item?.status === 2);

  return (
    <Box>
      {/* Dashboard Cards */}
      <DashCards countMap={countMap} />

      {/* Pending Visitors List */}
      <CardComponent sx={{ mt: 2.5 }}>
        <DashStatusTableList
          title='Pending Visitors'
          data={pendingList}
          columns={columns}
          color={'#ffd200'}
        />
      </CardComponent>

      {/* Approved Visitors List */}
      <CardComponent sx={{ mt: 2.5 }}>
        <DashStatusTableList
          title='Approved Visitors'
          data={approvedList}
          columns={columns}
          color={'#185a9d'}
        />
      </CardComponent>

      {/* Rejected Visitors List */}
      <CardComponent sx={{ mt: 2.5 }}>
        <DashStatusTableList
          title='Rejected Visitors'
          data={rejectedList}
          columns={columns}
          color={'#ff4b2b'}
        />
      </CardComponent>
    </Box>
  );
};

export default CommonDashboard;
