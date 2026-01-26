'use client';

import CommonTable from '@/components/table/CommonTable';
import {
  Box,
  Divider,
  Stack,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import React from 'react';
import _map from 'lodash/map';
import moment from 'moment';
import _isEmpty from 'lodash/isEmpty';

const DashStatusTableList = ({
  data,
  columns,
  title,
  color,
  loading,
}: {
  data: any[];
  columns: any;
  title?: string;
  color: string;
  loading?: boolean;
}) => {
  return (
    <div>
      <Stack direction={'row'} spacing={2} mb={1}>
        {title && (
          <>
            <Divider
              orientation='vertical'
              variant='middle'
              flexItem
              sx={{
                borderWidth: 3,
                borderRadius: 8,
                borderColor: color,
              }}
            />
            <Typography variant='h6' sx={{ mb: 2, mt: 4, fontWeight: 600 }}>
              {title} ({data?.length})
            </Typography>
          </>
        )}
      </Stack>
      <CommonTable columns={columns} loading={loading} maxHeight={370}>
        {_isEmpty(data) ? (
          <TableRow>
            <TableCell colSpan={columns.length} align='center'>
              No data available
            </TableCell>
          </TableRow>
        ) : (
          _map(data, (row, index) => (
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
            </TableRow>
          ))
        )}
      </CommonTable>
    </div>
  );
};

export default DashStatusTableList;
