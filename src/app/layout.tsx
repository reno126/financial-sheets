import { Metadata } from 'next';
import './globals.css';
import Providers from './providers';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { NavBar } from '@/components/Navigation/NavBar';
import { navigationConfig } from '@/config/global';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <AppRouterCacheProvider>
        <html lang="en">
          <body className="h-screen bg-gradient-to-t from-gray-100 to-neutral-400">
            <main className="mx-auto h-full w-2/3 bg-slate-200 p-4">
              <nav>
                <NavBar navConfig={navigationConfig} />
              </nav>
              {children}
            </main>
          </body>
        </html>
      </AppRouterCacheProvider>
    </Providers>
  );
}

export const metadata: Metadata = {
  title: 'Financial sheets',
  description: 'Testing some new front-end features based on simply UI app',
};
