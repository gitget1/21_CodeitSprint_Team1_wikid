import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { AppProps } from 'next/app';
import { useState } from 'react';

import '@/styles/globals.css';
import { nexonGothic } from '@/styles/nexonfont';
import PageLayout from '@/components/layout/PageLayout';
import SnackbarContainer from '@/components/ui/Snackbar/Snackbar';
import AlertDialogContainer from '@/components/ui/AlertDialog/AlertDialogContainer';

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
      <div className={nexonGothic.variable}>
        <PageLayout>
          <Component {...pageProps} />
        </PageLayout>
        <SnackbarContainer />
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
