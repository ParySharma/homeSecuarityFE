'use client';
import { useApiQueries } from '@/api';
import CardComponent from '@/components/Card';
import { getVisitorsListingRequest } from '@/redux/slices/commonSlice';
import { RootState, dispatch, useSelector } from '@/redux/store';
import React, { useEffect } from 'react';
import _isEmpty from 'lodash/isEmpty';
import DashStatusTableList from '@/components/commonDashboard/components/DashStatusTableList';
import CommonTable from '@/components/table/CommonTable';
import { Stack, TableCell, TableRow } from '@mui/material';
import _map from 'lodash/map';
import moment from 'moment';
import IconButton from '@/components/IconButton';
import EditIcon from '@mui/icons-material/Edit';

const columns = [
  { label: 'Name' },
  { label: 'Mobile' },
  // { label: 'Appartmen' },
  { label: 'Visitors', align: 'center' },
  { label: 'Purpose' },
  { label: 'Vehical' },
  // { label: 'Gate' },
  { label: 'Date', align: 'center' },
  { label: 'Time' },
  { label: 'Actions' },
];

const GuestList = () => {
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
    <CardComponent title='Guests List'>
      <CommonTable
        columns={columns}
        loading={visitorsListingLoading}
        maxHeight={430}
      >
        {_map(visitorsListingData, (row, index) => (
          <TableRow key={index} hover>
            <TableCell>{row?.visitor_name}</TableCell>
            <TableCell>{row?.mobile}</TableCell>
            {/* <TableCell>{row?.appartment}</TableCell> */}
            <TableCell align='center'>{row?.number_of_visitors}</TableCell>
            <TableCell>{row?.purpose}</TableCell>
            <TableCell>
              {row?.vehicle_type} ({row?.vehicle_number})
            </TableCell>
            {/* <TableCell>{row?.gate}</TableCell> */}
            <TableCell align='center'>
              {moment(row?.entry_time).format('Do, MMM YYYY')}
            </TableCell>
            <TableCell>{moment(row?.visitTime).format('h:mm A')}</TableCell>
            <TableCell>
              <Stack direction='row' spacing={1}>
                <IconButton icon='edit' />
                <IconButton icon='delete' />
              </Stack>
            </TableCell>
          </TableRow>
        ))}
      </CommonTable>
    </CardComponent>
  );
};

export default GuestList;
