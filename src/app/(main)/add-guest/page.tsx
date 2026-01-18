'use client';
import { useApiQueries } from '@/api';
import AddGurstForm from '@/components/commonModules/AddGuests.tsx';
import { getHouseListing } from '@/redux/slices/commonSlice';
import React, { useEffect } from 'react';
import { RootState, dispatch, useSelector } from '@/redux/store';
import _isEmpty from 'lodash/isEmpty';

const AddGurstPage = () => {
  const { getHouseListingLoading, getHouseListingData, getHouseListingError } =
    useSelector((state: RootState) => state.commonSlice);
  const { getListQuery, addUpdateQuery, fetchQuery } = useApiQueries();

  const getSocietyHouseList = async () => {
    const res = await addUpdateQuery(
      '/house/society/list',
      {
        societyId: '65a001000000000000000001',
      },
      'get'
    );
    console.log('res', res);
  };

  useEffect(() => {
    if (
      _isEmpty(getHouseListingData) &&
      !getHouseListingLoading &&
      !getHouseListingError
    ) {
      getSocietyHouseList();
    }
  }, [getHouseListingLoading, getHouseListingData, getHouseListingError]);

  return (
    <div>
      <AddGurstForm />
    </div>
  );
};

export default AddGurstPage;
