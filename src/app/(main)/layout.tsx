'use client';

// Components
import CommonLayout from '@/components/commonLayout';
import { Box } from '@mui/material';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CommonLayout>
      <Box px={{ xs: '5%', md: '10%' }} my={2}>
        {children}
      </Box>
    </CommonLayout>
  );
}
