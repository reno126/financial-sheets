import { Metadata } from 'next';
import './globals.css';
import Providers from './providers';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { Suspense } from 'react';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <Suspense>
        <AppRouterCacheProvider>
          <html lang="en">
            <body className="bg-emerald-950">
              <main className="mx-auto max-w-5xl bg-emerald-50 p-4">{children}</main>
            </body>
          </html>
        </AppRouterCacheProvider>
      </Suspense>
    </Providers>
  );
}

export const metadata: Metadata = {
  title: 'Financial sheets',
  description: 'Testing some new front-end features based on simply UI app',
};

