'use client';
import { useApiQueries } from '@/api';
import CommonDashboard from '@/components/commonDashboard/CommonDashboard';
import { getVisitorsListingRequest } from '@/redux/slices/commonSlice';
import { RootState, dispatch, useSelector } from '@/redux/store';
import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import _isEmpty from 'lodash/isEmpty';

const Dashbaord = () => {
  const { addUpdateQuery, getListQuery } = useApiQueries();
  const { visitorsListingLoading, visitorsListingData, visitorsListingError } =
    useSelector((state: RootState) => state.commonSlice);

  const fetchVisitorsListing = async () => {
    dispatch(getVisitorsListingRequest(addUpdateQuery, {}));
  };

  useEffect(() => {
    if (
      _isEmpty(visitorsListingData) &&
      !visitorsListingLoading &&
      !visitorsListingError
    ) {
      fetchVisitorsListing();
    }
  }, [visitorsListingData, visitorsListingLoading]);

  return (
    <Box>
      <CommonDashboard />
    </Box>
  );
};

export default Dashbaord;
