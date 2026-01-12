'use client';

import ButtonStyled from '@/components/Button';
import ContactNumberField from '@/components/inputs/ContactNumberField';
import PasswordField from '@/components/inputs/PasswordField';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';
import { useFormik } from 'formik';
import Image from 'next/image';
import * as Yup from 'yup';

const LoginSchema = Yup.object({
  number: Yup.string()
    .matches(/^[0-9]{10}$/, 'Enter a valid 10-digit mobile number')
    .required('Number is required'),
  password: Yup.string().required('Password is required'),
});

const Login = () => {
  const formik = useFormik({
    initialValues: {
      number: '',
      password: '',
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      console.log('Login values:', values);
    },
  });

  return (
    <>
      <Box
        sx={{
          minHeight: '100vh',
          bgcolor: '#f5f6fa',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            width: '100%',
            maxWidth: 400,
            p: 4,
            borderRadius: 2,
            textAlign: 'center',
          }}
        >
          <Image src={'/logo/logo-3.png'} alt='Logo' width={150} height={150} />
          <Typography variant='h5' fontWeight={600} textAlign='center'>
            Login
          </Typography>

          {/* IMPORTANT: use form tag with handleSubmit */}
          <ContactNumberField
            formik={formik}
            name='number'
            label='Contact Number'
            placeholder='Enter your contact number'
          />

          <PasswordField formik={formik} name='password' label='Password' />

          <ButtonStyled
            fullWidth
            type='submit'
            variant='contained'
            text='Login'
            onClick={formik.handleSubmit}
            sx={{ mt: 3 }}
          />
        </Paper>
      </Box>
    </>
  );
};

export default Login;
