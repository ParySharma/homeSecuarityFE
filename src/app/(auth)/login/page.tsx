'use client';

import ButtonStyled from '@/components/Button';
import ContactNumberField from '@/components/inputs/ContactNumberField';
import PasswordField from '@/components/inputs/PasswordField';
import CommonSwitchField from '@/components/switch/CommonSwitchField';
import { LOGININITIALVALUES } from '@/initialValues/loginIntialValues';
import { Box, Typography, Paper } from '@mui/material';
import { useFormik } from 'formik';
import Image from 'next/image';
import * as Yup from 'yup';
import useAuth from '@/contexts/useAuth';
import { useState } from 'react';
import { useErrorToast, useServerToast } from '@/utils/serverError';
import { BUTTON_TYPE, BUTTON_VARIANT_TYPE } from '@/utils/constants';
import LoginAssets from '@/assets/login/login_Assets';
import moment from 'moment';
import LoginAssets1 from '@/assets/login/login_Assets1';

const LoginSchema = Yup.object({
  mobile: Yup.string()
    .matches(/^[0-9]{10}$/, 'Enter a valid 10-digit mobile number')
    .required('Number is required'),
  password: Yup.string().required('Password is required'),
});

const Login = () => {
  const { login } = useAuth();
  const successToast = useErrorToast('success');
  const errorToast = useErrorToast('error');
  const serverErrorToast = useServerToast();

  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: LOGININITIALVALUES,
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      setLoading(true);
      const response: any = await login(
        values.mobile,
        values.password,
        values.isActive
      );

      if (response && response?.data?.success) {
        successToast(response?.data?.message || 'Login successful!');

        // Handle successful login (e.g., redirect to dashboard)
        setLoading(false);
      } else {
        console.log('Login failed:', response);
        errorToast(response?.message || 'Login failed. Please try again.');
        // Handle login failure (e.g., show error message)
        setLoading(false);
      }
    },
  });

  return (
    <>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage: 'url("/logo/login-bg4.jpg")',
          backgroundSize: 'cover',
          padding: 2,
          backgroundRepeat: 'no-repeat',
        }}
      >
        <Box
          position='absolute'
          left={50}
          top='50%'
          sx={{
            transform: 'translateY(-50%)',
            // animation: 'float 4s ease-in-out infinite',
            display: { xs: 'none', md: 'block' },
          }}
        >
          <LoginAssets />
        </Box>

        <Paper
          elevation={0}
          className='login-card'
          sx={{
            width: '100%',
            maxWidth: 400,
            p: 4,
            borderRadius: 5,
            textAlign: 'center',

            background: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 8px 32px rgba(31, 38, 135, 0.15)',
            position: 'relative',

            animation: 'fadeUp 0.8s ease-out',
          }}
        >
          <Image
            src={'/logo/logo-3.png'}
            alt='Logo'
            width={100}
            height={100}
            style={{
              transform: 'rotate(3deg)',
              position: 'absolute',
              top: '-70px',
              left: 'calc(50% - 55px)',
              transition: 'transform 0.3s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.animation = 'logoWobble 0.6s ease-in-out';
            }}
            onAnimationEnd={(e) => {
              e.currentTarget.style.animation = '';
            }}
          />
          <Typography
            variant='h5'
            fontWeight={600}
            textAlign='center'
            sx={{
              background: `linear-gradient(90deg,var(--primary-button-background-color),#C3C6C3)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Login
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            {/* IMPORTANT: use form tag with handleSubmit */}
            <ContactNumberField
              formik={formik}
              name='mobile'
              label='Contact Number'
              placeholder='Enter your contact number'
              inputTextColor='white'
            />

            <PasswordField
              formik={formik}
              name='password'
              label='Password'
              inputTextColor='white'
            />

            <Box textAlign={'left'}>
              <CommonSwitchField
                formik={formik}
                name='isActive'
                label='Remember me'
                labelColor='white'
              />
            </Box>

            <ButtonStyled
              type={BUTTON_TYPE.SUBMIT}
              variant={BUTTON_VARIANT_TYPE.OUTLINED}
              text='Login'
              // onClick={() => {
              //   formik.handleSubmit();
              //   console.log('Login button clicked');
              // }}
              mt={1.2}
              fullWidth
              width='100%'
              loading={loading}
            />
          </form>
          <Typography variant='body2' mt={2} sx={{ color: 'white' }}>
            {moment().format('YYYY')}© Home Security |{' '}
            <a href='./privacy-policy' target='_blank'>
              Privacy Policy
            </a>
          </Typography>
        </Paper>
      </Box>
    </>
  );
};

export default Login;
