'use client';

import React from 'react';
import {
  Box,
  TextField,
  MenuItem,
  Button,
  Typography,
  Paper,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import ContactNumberField from '@/components/inputs/ContactNumberField';
import ButtonStyled from '@/components/Button';
import { BUTTON_TYPE, BUTTON_VARIANT_TYPE } from '@/utils/constants';

const AddGuestForm = () => {
  const formik = useFormik({
    initialValues: {
      visitor_name: '',
      mobile: '',
      number_of_visitors: '',
      vehicle_type: '',
      vehicle_number: '',
      purpose: '',
    },
    validationSchema: Yup.object({
      visitor_name: Yup.string().required('Visitor name is required'),
      mobile: Yup.string().required('Mobile number is required'),
      number_of_visitors: Yup.number().min(1).required(),
      purpose: Yup.string().required('Purpose is required'),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: 'calc(100vh - 64px)', // minus header
        p: { xs: 2, md: 4 },
        backgroundColor: '#f7f9fb',
      }}
    >
      <Paper
        elevation={2}
        sx={{
          maxWidth: 1200,
          mx: 'auto',
          p: { xs: 2, md: 4 },
          borderRadius: 2,
        }}
      >
        <Typography variant='h4' mb={4}>
          Add Guest
        </Typography>

        <Box component='form' onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label='Visitor Name'
                name='visitor_name'
                value={formik.values.visitor_name}
                onChange={formik.handleChange}
                error={
                  formik.touched.visitor_name &&
                  Boolean(formik.errors.visitor_name)
                }
                helperText={
                  formik.touched.visitor_name && formik.errors.visitor_name
                }
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label='Mobile Number'
                name='mobile'
                type='tel'
                slotProps={{
                  input: {
                    inputMode: 'numeric',
                  },
                }}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '');
                  if (value.length <= 10) {
                    formik.setFieldValue('mobile', value);
                  }
                }}
                value={formik.values.mobile}
                error={formik.touched.mobile && Boolean(formik.errors.mobile)}
                helperText={formik.touched.mobile && formik.errors.mobile}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type='number'
                label='Number of Visitors'
                name='number_of_visitors'
                value={formik.values.number_of_visitors}
                onChange={formik.handleChange}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                select
                label='Vehicle Type'
                name='vehicle_type'
                value={formik.values.vehicle_type}
                onChange={formik.handleChange}
              >
                <MenuItem value=''>None</MenuItem>
                <MenuItem value='CAR'>Car</MenuItem>
                <MenuItem value='BIKE'>Bike</MenuItem>
                <MenuItem value='AUTO'>Auto</MenuItem>
              </TextField>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label='Vehicle Number'
                name='vehicle_number'
                value={formik.values.vehicle_number}
                onChange={formik.handleChange}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label='Purpose'
                name='purpose'
                value={formik.values.purpose}
                onChange={formik.handleChange}
                error={formik.touched.purpose && Boolean(formik.errors.purpose)}
                helperText={formik.touched.purpose && formik.errors.purpose}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <ButtonStyled
                type={BUTTON_TYPE.SUBMIT}
                variant={BUTTON_VARIANT_TYPE.OUTLINED}
                text='Add Guest'
                // onClick={() => {
                //   formik.handleSubmit();
                //   console.log('Login button clicked');
                // }}
                mt={1.2}
                fullWidth
                width='100%'
                // loading={loading}
              />
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
};

export default AddGuestForm;
