// 'use client';
import type { Metadata } from 'next';
import { CssBaseline } from '@mui/material';
import './globals.css';

export const metadata: Metadata = {
  title: 'Home Secuarity',
  description:
    'A home security system dashboard built with Next.js and Material-UI.',
};

export default function RootLayout({ children }: any) {
  return (
    <html lang='en'>
      <body>
        {/* <ThemeProviders> */}
        <CssBaseline />
        {children}
        {/* </ThemeProviders> */}
      </body>
    </html>
  );
}
