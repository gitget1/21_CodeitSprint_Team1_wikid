import type { AppProps } from 'next/app';

import '@/styles/globals.css';
import { SnackbarProvider } from '@/components/ui';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SnackbarProvider>
      <Component {...pageProps} />
    </SnackbarProvider>
  );
}
