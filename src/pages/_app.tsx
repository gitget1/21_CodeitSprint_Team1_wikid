import type { AppProps } from 'next/app';
import '@/styles/globals.css';

import PageLayout from '@/components/layout/PageLayout';
import SnackbarContainer from '@/components/ui/Snackbar/Snackbar';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PageLayout>
      <Component {...pageProps} />
      <SnackbarContainer />
    </PageLayout>
  );
}
