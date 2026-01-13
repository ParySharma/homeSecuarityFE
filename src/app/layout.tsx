// 'use client';
import type { Metadata } from 'next';
import { Epilogue, Roboto } from 'next/font/google';
import '@/styles/globals.css';
import AuthProvider from '@/contexts/Provider';
import SnackbarProvider from '@/app/snackbarProvider';

const roboto = Epilogue({
  weight: ['300', '400', '500', '700', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Home Secuarity',
  description:
    'A home security system dashboard built with Next.js and Material-UI.',
};

export default function RootLayout({ children }: any) {
  return (
    <html lang='en'>
      <body className={roboto.className}>
        {/* <CssBaseline /> */}
        <AuthProvider>
          <SnackbarProvider>{children}</SnackbarProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
