'use client';

import React, { useEffect, useState } from 'react';
import { Box, TextField, MenuItem, Stack } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import ButtonStyled from '@/components/Button';
import { BUTTON_TYPE, BUTTON_VARIANT_TYPE } from '@/utils/constants';
import AddFormSvg from '@/assets/forms/addForm';
import CommonInputField from '@/components/inputs/CommonInputField';
import CardComponent from '@/components/Card';
import { useApiQueries } from '@/api';
import { RootState, dispatch, useSelector } from '@/redux/store';
import {
  getHouseListing,
  getHouseListingData,
  getVisitorsListingRequest,
} from '@/redux/slices/commonSlice';
import useAuth from '@/contexts/useAuth';
import { useErrorToast } from '@/utils/serverError';
import { useRouter } from 'next/navigation';
import { getFloorListing, getwingslist } from '@/utils/commonFunction';

const vehicalTypeOptions = [
  { value: 'CAR', label: 'Car' },
  { value: 'BIKE', label: 'Bike' },
  { value: 'AUTO', label: 'Auto' },
];

const AddGuestForm = ({
  handleGetSocietyList,
}: {
  handleGetSocietyList: () => void;
}) => {
  const {
    houseListingLoading,
    houseListingData,
    houseListingError,
    societesListingLoading,
    societesListingData,
    societesListingError,
  } = useSelector((state: RootState) => state.commonSlice);
  const { user } = useAuth();
  const router = useRouter();
  const { addUpdateQuery, getListQuery } = useApiQueries();
  const successToast = useErrorToast('success');
  const errorToast = useErrorToast('error');
  const [formLoading, setFormLoading] = useState(false);
  const assigned_SocietyId = user?.assigned_SocietyId || '';

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
      wing_id: '',
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
      society_id: !assigned_SocietyId
        ? Yup.string().required('Society is required')
        : Yup.string(),
      house_id: Yup.string().required('House is required'),
      wing_id: Yup.string().required('Wing is required'),
    }),
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      const params = {
        visitor_name: values?.visitor_name,
        mobile: values?.mobile,
        number_of_visitors: values?.number_of_visitors,
        vehicle_type: values?.vehicle_type,
        vehicle_number: values?.vehicle_number,
        purpose: values?.purpose,
        house_id: values?.house_id,
        guard_id: user?.guard_id,
        status: 'PENDING',
      };
      setFormLoading(true);
      try {
        const res: any = await addUpdateQuery('/guard/visitor/create', params);
        if (res?.data?.success) {
          formik.resetForm();
          successToast(res?.data?.message || 'Guest added successfully');
          dispatch(getVisitorsListingRequest(addUpdateQuery, {}));
          router.push('/guests-list');
          setFormLoading(false);
        } else {
          errorToast(res?.data?.message || 'Something went wrong');
          setFormLoading(false);
        }
      } catch (error) {
        errorToast(error);
        setFormLoading(false);
      }
    },
  });

  useEffect(() => {
    if (assigned_SocietyId) {
      formik.setFieldValue('society_id', assigned_SocietyId);
      dispatch(getHouseListingData([]));
      dispatch(
        getHouseListing(addUpdateQuery, {
          societyId: assigned_SocietyId.toString(),
        })
      );
    }
  }, [assigned_SocietyId]);

  const wingsListng = getwingslist(user?.assigned_Societie?.wings_set || '');
  const floorsListng = getFloorListing(
    user?.assigned_Societie?.numbers_of_floor,
    user?.assigned_Societie?.rooms_per_floor,
    'Floor {floor}0{unit}'
  );

  console.log(floorsListng, 'floorsListng====');

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
                  endIcon={formik?.values?.vehicle_type ? '✖' : undefined}
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
              {formik?.values?.vehicle_type && (
                <CommonInputField
                  formik={formik}
                  name='vehicle_number'
                  placeholder='Vehicle Number'
                />
              )}

              {assigned_SocietyId ? null : (
                <Stack direction='row' spacing={2}>
                  <CommonInputField
                    formik={formik}
                    name='society_id'
                    placeholder='Select Society'
                    label='Society'
                    select
                    options={societesListingData}
                    obJectKeys={'name'}
                    endIcon={formik?.values?.society_id ? '✖' : undefined}
                    endIconClick={() => {
                      formik.setFieldValue('society_id', '');
                      formik.setFieldValue('house_id', '');
                      dispatch(getHouseListingData([]));
                      formik.setFieldValue('wing_id', '');
                    }}
                    endIconStyle={{ cursor: 'pointer' }}
                    onDropdownOpen={() => {
                      handleGetSocietyList();
                    }}
                    onSelectChange={(value) => {
                      formik.setFieldValue('society_id', value?._id || '');
                      formik.setFieldValue('house_id', '');
                      formik.setFieldValue('wing_id', '');
                      dispatch(
                        getHouseListing(addUpdateQuery, {
                          societyId: value?._id.toString(),
                        })
                      );
                    }}
                    loading={societesListingLoading}
                  />
                </Stack>
              )}

              <Stack direction='row' spacing={2}>
                <CommonInputField
                  formik={formik}
                  name='wing_id'
                  placeholder='Select Wing'
                  label='Select Wing'
                  select
                  options={wingsListng}
                  obJectKeys={'label'}
                  endIcon={formik?.values?.wing_id ? '✖' : undefined}
                  endIconClick={() => {
                    formik.setFieldValue('wing_id', '');
                    formik.setFieldValue('house_id', '');
                  }}
                  endIconStyle={{ cursor: 'pointer' }}
                  onDropdownOpen={() => {
                    formik.setFieldValue('house_id', '');
                  }}
                  onSelectChange={(value) => {
                    formik.setFieldValue('wing_id', value?.value || '');
                    // formik.setFieldValue('house_id', '');
                  }}
                  loading={societesListingLoading}
                />

                <CommonInputField
                  formik={formik}
                  name='house_id'
                  placeholder='Select House'
                  label='Select House'
                  select
                  options={floorsListng}
                  obJectKeys={'label'}
                  endIcon={formik?.values?.house_id ? '✖' : undefined}
                  endIconClick={() => formik.setFieldValue('house_id', '')}
                  endIconStyle={{ cursor: 'pointer' }}
                  loading={houseListingLoading}
                  onSelectChange={(value) => {
                    formik.setFieldValue('house_id', value?._id || '');
                  }}
                  noOptionAsset={'Please select an society first'}
                />
              </Stack>

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
                loading={formLoading}
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
