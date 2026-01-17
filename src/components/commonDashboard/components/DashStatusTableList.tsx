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

const DashStatusTableList = ({
  data,
  columns,
  title,
  color,
}: {
  data: any[];
  columns: any;
  title: string;
  color: string;
}) => {
  return (
    <div>
      <Stack direction={'row'} spacing={2} mt={{ xs: 3, md: 4 }} mb={1}>
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
      </Stack>
      <CommonTable columns={columns} loading={false} maxHeight={370}>
        {_map(data, (row, index) => (
          <TableRow key={index} hover>
            <TableCell>{row?.name}</TableCell>
            <TableCell>{row?.mobile}</TableCell>
            <TableCell>{row?.appartment}</TableCell>
            <TableCell align='center'>{row?.numberOfVisitors}</TableCell>
            <TableCell>{row?.purpose}</TableCell>
            <TableCell>{row?.vehicle}</TableCell>
            <TableCell>{row?.gate}</TableCell>
            <TableCell align='center'>{row?.createdAt}</TableCell>
            <TableCell>{row?.visitTime}</TableCell>
          </TableRow>
        ))}
      </CommonTable>
    </div>
  );
};

export default DashStatusTableList;
