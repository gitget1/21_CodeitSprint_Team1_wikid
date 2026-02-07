import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { AppProps } from 'next/app';
import { useState } from 'react';

import '@/styles/globals.css';

import PageLayout from '@/components/layout/PageLayout';

import SnackbarContainer from '@/components/ui/Snackbar/Snackbar';


export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1분
            retry: 1,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <PageLayout>
        <Component {...pageProps} />
        <SnackbarContainer />
      </PageLayout>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>

  );
}
