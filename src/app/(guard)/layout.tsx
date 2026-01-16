'use client';

// Components
import CommonLayout from '@/components/commonLayout';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <CommonLayout>{children}</CommonLayout>;
}
