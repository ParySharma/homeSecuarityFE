// 'use client';
import type { Metadata } from 'next';
import { Epilogue, Roboto } from 'next/font/google';
import '@/styles/globals.css';
import AuthProvider from '@/contexts/Provider';
import SnackbarProvider from '@/app/snackbarProvider';
import ReduxProvider from '@/redux/Provider';
import ThemeProvider from '@/app/themeProvider';

const roboto = Epilogue({
  weight: ['300', '400', '500', '700', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
});

const metaTitle = 'Home Security System Dashboard';
const metaDescription =
  'A home security system dashboard built with Next.js and Material-UI.';

const metaImage = `${process.env.NEXT_PUBLIC_FRONT_END_URL}/images/open_graph_banner.png`;

export const metadata: Metadata = {
  title: metaTitle,
  description: metaDescription,
  openGraph: {
    title: metaTitle,
    description: metaDescription,
    url: process.env.NEXT_PUBLIC_FRONT_END_URL,
    type: 'website',
    images: [
      {
        url: metaImage,
        width: 1200,
        height: 630,
        alt: metaTitle,
      },
    ],
  },
  twitter: {
    title: metaTitle,
    description: metaDescription,
    card: 'summary_large_image',
    images: [metaImage],
  },
  robots:
    process.env.NEXT_PUBLIC_ENV === 'production'
      ? 'index, follow'
      : 'noindex, nofollow',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log('RootLayout Rendered');

  return (
    <html lang='en' className={roboto.className}>
      <body suppressHydrationWarning={true}>
        <ReduxProvider>
          <AuthProvider>
            {/* <ThemeProvider> */}
            <SnackbarProvider>{children}</SnackbarProvider>
            {/* </ThemeProvider> */}
          </AuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
