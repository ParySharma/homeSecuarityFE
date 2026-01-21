'use client';
import { useApiQueries } from '@/api';
import AddGurstForm from '@/components/commonModules/AddGuests.tsx';
import {
  getHouseListing,
  getSocietesListingRequest,
} from '@/redux/slices/commonSlice';
import { RootState, dispatch, useSelector } from '@/redux/store';
import _isEmpty from 'lodash/isEmpty';

const AddGurstPage = () => {
  const { getListQuery, addUpdateQuery, fetchQuery } = useApiQueries();

  const getSocietyList = async () => {
    const param = {
      // guard_id: user?.guard_id,
    };
    await dispatch(getSocietesListingRequest(addUpdateQuery, param));
  };

  return (
    <div>
      <AddGurstForm
        handleGetSocietyList={() => {
          getSocietyList();
        }}
      />
    </div>
  );
};

export default AddGurstPage;
