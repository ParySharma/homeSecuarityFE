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
import { RootState, useSelector } from '@/redux/store';

const CommonDashboard = () => {
  const { visitorsListingLoading, visitorsListingData, visitorsListingError } =
    useSelector((state: RootState) => state.commonSlice);

  const countMap = {
    totalApproved: {
      value:
        visitorsListingData?.filter((item: any) => item?.status === 'APPROVED')
          ?.length || 0,
      icon: <CheckCircleIcon />,
      gradient: 'linear-gradient(135deg, #43cea2, #185a9d)',
    },
    totalPending: {
      value:
        visitorsListingData?.filter((item: any) => item?.status === 'PENDING')
          ?.length || 0,
      icon: <HourglassEmptyIcon />,
      gradient: 'linear-gradient(135deg, #f7971e, #ffd200)',
    },
    totalRejected: {
      value:
        visitorsListingData?.filter((item: any) => item?.status === 'REJECTED')
          ?.length || 0,
      icon: <CancelIcon />,
      gradient: 'linear-gradient(135deg, #ff416c, #ff4b2b)',
    },
    totalVisitors: {
      value: visitorsListingData?.length || 0,
      icon: <PeopleAltIcon />,
      gradient: 'linear-gradient(135deg, #667eea, #764ba2)',
    },
  };

  const dashTablesData = [
    {
      title: 'Approved Visitors',
      color: '#185a9d',
      filterStatus: 'APPROVED',
    },
    {
      title: 'Pending Visitors',
      color: '#ffd200',
      filterStatus: 'PENDING',
    },
    {
      title: 'Rejected Visitors',
      color: '#ff4b2b',
      filterStatus: 'REJECTED',
    },
  ];

  const columns = [
    { label: 'Sr. No.' },
    { label: 'Name' },
    { label: 'Mobile' },
    // { label: 'Appartmen' },
    { label: 'Visitors', align: 'center' },
    { label: 'Purpose' },
    { label: 'Vehical' },
    // { label: 'Gate' },
    { label: 'Date time Enter/Exit', align: 'center' },
    // { label: 'Time' },
    { label: 'Status' },
    // { label: 'Actions' },
  ];

  const approvedList = visitorsListingData?.filter(
    (item: any) => item?.status === 'APPROVED'
  );
  const pendingList = visitorsListingData?.filter(
    (item: any) => item?.status === 'PENDING'
  );
  const rejectedList = visitorsListingData?.filter(
    (item: any) => item?.status === 'REJECTED'
  );

  return (
    <Box>
      {/* Dashboard Cards */}
      <DashCards countMap={countMap} />

      {_map(dashTablesData, (tableData: any, index) => {
        return (
          <CardComponent sx={{ mt: 2.5 }} key={index}>
            <DashStatusTableList
              title={tableData?.title}
              data={
                tableData?.filterStatus === 'PENDING'
                  ? pendingList
                  : tableData?.filterStatus === 'APPROVED'
                  ? approvedList
                  : rejectedList
              }
              columns={columns}
              color={tableData?.color}
              loading={visitorsListingLoading}
            />
          </CardComponent>
        );
      })}
    </Box>
  );
};

export default CommonDashboard;
