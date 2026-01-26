'use client';

import { Box, Container, Typography, Divider, Paper } from '@mui/material';

const PrivacyPolicy = () => {
  return (
    <Box
      sx={{
        backgroundColor: 'var(--body-background-color)',
        color: 'var(--body-text-color)',
        py: { xs: 4, md: 6 },
      }}
    >
      <Container maxWidth='md'>
        <Paper
          elevation={0}
          sx={{
            backgroundColor: 'var(--card-background-color)',
            p: { xs: 3, md: 4 },
            border: '1px solid var(--border-color)',
            borderRadius: 2,
          }}
        >
          <Typography variant='h4' fontWeight={600} gutterBottom>
            Privacy Policy
          </Typography>

          <Typography
            component='p'
            sx={{ color: 'var(--text-muted-color)', mb: 3 }}
          >
            Last updated: January 2026
          </Typography>

          <Divider sx={{ mb: 4, borderColor: 'var(--divider-color)' }} />

          <Typography variant='h6' gutterBottom>
            1. Information We Collect
          </Typography>
          <Typography
            component='p'
            sx={{ mb: 3, color: 'var(--text-secondary-color)' }}
          >
            We collect personal information such as your name, mobile number,
            email address, and other details provided while using our platform.
          </Typography>

          <Typography variant='h6' gutterBottom>
            2. How We Use Your Information
          </Typography>
          <Typography
            component='p'
            sx={{ mb: 3, color: 'var(--text-secondary-color)' }}
          >
            The information collected is used to operate, improve, and maintain
            our services, communicate with users, and ensure platform security.
          </Typography>

          <Typography variant='h6' gutterBottom>
            3. Data Security
          </Typography>
          <Typography
            component='p'
            sx={{ mb: 3, color: 'var(--text-secondary-color)' }}
          >
            We use reasonable security practices to protect your personal data
            from unauthorized access, misuse, or disclosure.
          </Typography>

          <Typography variant='h6' gutterBottom>
            4. Third-Party Services
          </Typography>
          <Typography
            component='p'
            sx={{ mb: 3, color: 'var(--text-secondary-color)' }}
          >
            We may share limited information with trusted third-party services
            only when required for functionality or legal obligations.
          </Typography>

          <Typography variant='h6' gutterBottom>
            5. User Rights
          </Typography>
          <Typography
            component='p'
            sx={{ mb: 3, color: 'var(--text-secondary-color)' }}
          >
            You have the right to access, update, or request deletion of your
            personal data by contacting us.
          </Typography>

          <Typography variant='h6' gutterBottom>
            6. Changes to This Policy
          </Typography>
          <Typography
            component='p'
            sx={{ color: 'var(--text-secondary-color)' }}
          >
            We may update this Privacy Policy from time to time. Changes will be
            effective once posted on this page.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default PrivacyPolicy;
