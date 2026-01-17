'use client';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Skeleton,
} from '@mui/material';
import React from 'react';
import _map from 'lodash/map';

interface Column {
  label: string;
  align?: 'left' | 'center' | 'right';
  width?: number | string;
}

interface CommonTableProps {
  columns: any[];
  children: React.ReactNode;
  loading?: boolean;
  maxHeight?: number;
  skeletonRows?: number;
}

const CommonTable = ({
  columns,
  children,
  loading = false,
  maxHeight = 420,
  skeletonRows = 5,
}: CommonTableProps) => {
  return (
    <Paper
      sx={{
        borderRadius: 3,
        overflow: 'hidden',
        backgroundColor: 'var(--card-background-color)',
      }}
    >
      <TableContainer sx={{ maxHeight }}>
        <Table stickyHeader>
          {/* TABLE HEADER */}
          <TableHead>
            <TableRow>
              {_map(columns, (col, index) => (
                <TableCell
                  key={index}
                  align={col.align ?? 'left'}
                  sx={{
                    fontWeight: 600,
                    backgroundColor: 'var(--table-header-bg, #f5f5f5)',
                    whiteSpace: 'nowrap',
                    width: col.width,
                  }}
                >
                  {col.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          {/* TABLE BODY */}
          <TableBody>
            {loading
              ? _map(Array.from({ length: skeletonRows }), (_, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {_map(columns, (_, colIndex) => (
                      <TableCell key={colIndex}>
                        <Skeleton height={28} />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              : children}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default CommonTable;
