'use client';

import React from 'react';
import { Box, TextField, MenuItem, Stack } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import ButtonStyled from '@/components/Button';
import { BUTTON_TYPE, BUTTON_VARIANT_TYPE } from '@/utils/constants';
import BarTitle from '@/components/BarTitle';
import AddFormSvg from '@/assets/forms/addForm';
import CommonInputField from '@/components/inputs/CommonInputField';
import CardComponent from '@/components/Card';
import { useApiQueries } from '@/api';
import { RootState, useSelector } from '@/redux/store';

const vehicalTypeOptions = [
  { value: 'CAR', label: 'Car' },
  { value: 'BIKE', label: 'Bike' },
  { value: 'AUTO', label: 'Auto' },
];

const AddGuestForm = ({
  handleGetSocietyList,
  societyList,
}: {
  handleGetSocietyList: () => void;
  societyList: any[];
}) => {
  const { getHouseListingLoading, getHouseListingData, getHouseListingError } =
    useSelector((state: RootState) => state.commonSlice);
  const { addUpdateQuery, getListQuery } = useApiQueries();
  console.log(societyList, 'societyListsocietyListsocietyList');

  const formik = useFormik({
    initialValues: {
      visitor_name: '',
      mobile: '',
      number_of_visitors: '',
      vehicle_type: '',
      vehicle_number: '',
      purpose: '',
      society_id: '',
      house_id: '',
    },
    validationSchema: Yup.object({
      visitor_name: Yup.string().required('Visitor name is required'),
      mobile: Yup.string().required('Mobile number is required'),
      number_of_visitors: Yup.number()
        .min(1)
        .required('Number of visitors is required'),
      purpose: Yup.string().required('Purpose is required'),
      vehicle_type: Yup.string().required('Vehicle type is required'),
      vehicle_number: Yup.string().when(
        'vehicle_type',
        (vehicleType, schema) => {
          return vehicleType
            ? schema.required('Vehicle number is required')
            : schema.notRequired();
        }
      ),
      society_id: Yup.string().required('Society is required'),
      house_id: Yup.string().required('House is required'),
    }),
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      const params = {
        visitor_name: values.visitor_name,
        mobile: values.mobile,
        number_of_visitors: values.number_of_visitors,
        vehicle_type: values.vehicle_type,
        vehicle_number: values.vehicle_number,
        purpose: values.purpose,
        house_id: '',
        guard_id: '',
        status: 'PENDING',
      };
      console.log(params, '==============');
      return;
      const addformsrep: any = await addUpdateQuery(
        'activitytracker/submit-forms/create',
        params
      );
      if (addformsrep?.data?.success === 1) {
        console.log('Guest added successfully');

        formik.resetForm();
      } else {
        console.log('Error adding guest');
      }
    },
  });

  return (
    <CardComponent title='Add Guest'>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={4}>
        {/* Left Form Section */}
        <Stack flex={1}>
          <Box component='form' onSubmit={formik.handleSubmit}>
            <Stack spacing={2}>
              <CommonInputField
                formik={formik}
                name='visitor_name'
                placeholder='Visitor Name'
                type='text'
              />

              <CommonInputField
                formik={formik}
                name='mobile'
                placeholder='Mobile Number'
                type='tel'
                maxDigits={10}
              />
              <Stack direction='row' spacing={2}>
                <CommonInputField
                  formik={formik}
                  name='vehicle_type'
                  placeholder='Vehicle Type'
                  label='Vehicle Type'
                  select
                  options={vehicalTypeOptions}
                  endIcon={formik?.values.vehicle_type ? '✖' : undefined}
                  endIconClick={() => formik.setFieldValue('vehicle_type', '')}
                  endIconStyle={{ cursor: 'pointer' }}
                />
                <CommonInputField
                  formik={formik}
                  name='number_of_visitors'
                  placeholder='Number of Visitors'
                  type='number'
                  maxDigits={4}
                />
              </Stack>

              <Stack direction='row' spacing={2}>
                <CommonInputField
                  formik={formik}
                  name='society_id'
                  placeholder='Select Society'
                  label='Society'
                  select
                  options={societyList}
                  obJectKeys={'name'}
                  endIcon={formik?.values.society_id ? '✖' : undefined}
                  endIconClick={() => formik.setFieldValue('society_id', '')}
                  endIconStyle={{ cursor: 'pointer' }}
                  onDropdownOpen={() => {
                    handleGetSocietyList();
                  }}
                />
                <CommonInputField
                  formik={formik}
                  name='house_id'
                  placeholder='Select House'
                  label='House'
                  select
                  options={vehicalTypeOptions}
                  endIcon={formik?.values.house_id ? '✖' : undefined}
                  endIconClick={() => formik.setFieldValue('house_id', '')}
                  endIconStyle={{ cursor: 'pointer' }}
                />
              </Stack>

              {formik?.values.vehicle_type && (
                <CommonInputField
                  formik={formik}
                  name='vehicle_number'
                  placeholder='Vehicle Number'
                />
              )}

              <CommonInputField
                formik={formik}
                name='purpose'
                placeholder='Purpose'
                multiline
                rows={3}
              />

              <ButtonStyled
                type={BUTTON_TYPE.SUBMIT}
                variant={BUTTON_VARIANT_TYPE.OUTLINED}
                text='Add Guest'
                fullWidth
                mt={1}
              />
            </Stack>
          </Box>
        </Stack>

        {/* Right Illustration */}
        <Stack
          flex={1}
          alignItems='center'
          justifyContent='center'
          display={{ xs: 'none', md: 'flex' }}
        >
          <AddFormSvg />
        </Stack>
      </Stack>
    </CardComponent>
  );
};

export default AddGuestForm;
