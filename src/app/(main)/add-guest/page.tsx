'use client';
import { useApiQueries } from '@/api';
import AddGurstForm from '@/components/commonModules/AddGuests.tsx';
import { getHouseListing } from '@/redux/slices/commonSlice';
import React, { useEffect, useState } from 'react';
import { RootState, dispatch, useSelector } from '@/redux/store';
import _isEmpty from 'lodash/isEmpty';
import useAuth from '@/contexts/useAuth';

const AddGurstPage = () => {
  const { getHouseListingLoading, getHouseListingData, getHouseListingError } =
    useSelector((state: RootState) => state.commonSlice);
  const { user } = useAuth();
  const { getListQuery, addUpdateQuery, fetchQuery } = useApiQueries();

  const [societyList, setSocietyList] = useState<any>([]);

  const getSocietyHouseList = async () => {
    const param = {
      societyId: '65a001000000000000000001',
    };
    const res = await addUpdateQuery('/house/society/list', param);
    console.log('res', res);
  };
  console.log(user, 'useruser');

  const getSocietyList = async () => {
    const param = {
      // guard_id: user?.guard_id,
    };
    try {
      const res = await addUpdateQuery('/society/list', param);
      if (!_isEmpty(res)) {
        setSocietyList(res?.data?.data || []);
        getSocietyHouseList();
      }
    } catch (error) {
      console.error('Error fetching society list:', error);
    }
  };

  return (
    <div>
      <AddGurstForm
        handleGetSocietyList={() => {
          getSocietyList();
        }}
        societyList={societyList}
      />
    </div>
  );
};

export default AddGurstPage;
