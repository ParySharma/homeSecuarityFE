'use client';
import { useApiQueries } from '@/api';
import CardComponent from '@/components/Card';
import {
  getVisitorsListingRequest,
  markVisitorExitData,
  markVisitorExitRequest,
} from '@/redux/slices/commonSlice';
import { RootState, dispatch, useSelector } from '@/redux/store';
import React, { useEffect } from 'react';
import _isEmpty from 'lodash/isEmpty';
import _map from 'lodash/map';
import moment from 'moment';

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
  Typography,
  Divider,
} from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton from '@/components/IconButton';
import StatusChip from '@/components/StatusChip';
import { useErrorToast } from '@/utils/serverError';

const GuestList = () => {
  const { addUpdateQuery } = useApiQueries();
  const successToast = useErrorToast('success');
  const errorToast = useErrorToast('error');

  const {
    visitorsListingLoading,
    visitorsListingData,
    visitorsListingError,
    visitorExitData,
    visitorExitLoading,
    visitorExitError,
  } = useSelector((state: RootState) => state.commonSlice);

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

  const handleExitVisitor = (row: any) => {
    dispatch(markVisitorExitRequest(addUpdateQuery, { id: row?._id }));
  };

  useEffect(() => {
    if (!_isEmpty(visitorExitData) && !visitorExitLoading) {
      console.log('1');
      if (!visitorExitError) {
        console.log('2');
        successToast(visitorExitData?.message);
        fetchVisitorsListing();
        dispatch(markVisitorExitData(null));
      } else {
        console.log('3');
        errorToast(visitorExitData?.message || 'Something went wrong');
        fetchVisitorsListing();
        dispatch(markVisitorExitData(null));
      }
    }
  }, [visitorExitData, visitorExitLoading]);
  console.log(visitorExitData, 'visitorsListingData');

  return (
    <CardComponent title='Guests List'>
      <Stack spacing={1.5}>
        {_map(visitorsListingData, (row, index) => (
          <Accordion
            key={row?._id}
            sx={{
              boxShadow: 'none',
              borderBottom: '1.5px dashed',
              borderColor: 'divider',
              '&:before': { display: 'none' },
            }}
          >
            {/* ===== SUMMARY ===== */}
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel1a-content'
              id='panel1a-header'
            >
              <Stack
                direction='row'
                spacing={2}
                alignItems='flex-start'
                width='100%'
                justifyContent='space-between'
              >
                <Stack>
                  <Stack
                    minWidth={{
                      xs: '50px',
                      sm: '100px',
                      md: '150px',
                      lg: '200px',
                    }}
                  >
                    <Typography
                      fontWeight={600}
                      maxWidth={{
                        xs: '100px',
                        sm: '150px',
                        md: '200px',
                        lg: '250px',
                      }}
                      noWrap
                    >
                      {index + 1}. {row?.visitor_name}
                    </Typography>
                  </Stack>

                  <Typography
                    fontSize={'0.785rem'}
                    ml={2}
                    sx={{
                      display: {
                        xs: 'block',
                        sm: 'block',
                        md: 'none',
                        lg: 'none',
                      },
                    }}
                  >
                    {row?.wing_id}-{row?.house_number}{' '}
                  </Typography>
                </Stack>
                <Typography
                  fontSize={'0.785rem'}
                  ml={2}
                  sx={{
                    display: {
                      xs: 'none',
                      sm: 'none',
                      md: 'block',
                      lg: 'block',
                    },
                  }}
                >
                  {row?.wing_id}-{row?.house_number}{' '}
                </Typography>
                <Typography
                  color='text.secondary'
                  sx={{
                    display: {
                      xs: 'none',
                      sm: 'none',
                      md: 'block',
                      lg: 'block',
                    },
                  }}
                >
                  {row?.mobile}
                </Typography>

                <Typography>
                  {moment(row?.entry_time).format('DD MMM')}
                </Typography>
                <Stack direction='row' spacing={1} alignItems='center'>
                  <StatusChip status={row?.status} />

                  {!row?.exit_time ? (
                    <IconButton
                      icon='exit'
                      onClick={(e: any) => {
                        handleExitVisitor(row);
                        e.stopPropagation();
                      }}
                      loading={visitorExitLoading}
                    />
                  ) : (
                    <StatusChip status={'exited'} />
                  )}
                </Stack>
              </Stack>
            </AccordionSummary>

            {/* ===== DETAILS ===== */}
            <AccordionDetails>
              <Stack spacing={1}>
                <Typography>
                  <strong>Name:</strong> {row?.visitor_name}
                </Typography>
                <Typography>
                  <strong>Contact Number:</strong> {row?.mobile}
                </Typography>
                <Typography>
                  <strong>Address:</strong> {row?.wing_id}-{row?.house_number}
                </Typography>
                <Typography>
                  <strong>Number of Visitors:</strong> {row?.number_of_visitors}
                </Typography>

                <Typography>
                  <strong>Purpose:</strong> {row?.purpose}
                </Typography>

                <Typography>
                  <strong>Vehicle:</strong> {row?.vehicle_type} (
                  {row?.vehicle_number || 'N/A'})
                </Typography>

                <Divider />

                <Typography>
                  <strong>Status:</strong> <StatusChip status={row?.status} />
                </Typography>
                <Typography>
                  <strong>Entry Date:</strong>{' '}
                  {moment(row?.entry_time).format('Do MMM YYYY')}
                </Typography>

                <Typography>
                  <strong>Entry Time:</strong>{' '}
                  {moment(row?.visitTime).format('h:mm A')}
                </Typography>

                <Typography>
                  <strong>Exit Time:</strong>{' '}
                  {row?.exit_time
                    ? moment(row?.exit_time).format('h:mm A')
                    : 'Not exited yet'}
                </Typography>
              </Stack>
            </AccordionDetails>
          </Accordion>
        ))}
      </Stack>
    </CardComponent>
  );
};

export default GuestList;
