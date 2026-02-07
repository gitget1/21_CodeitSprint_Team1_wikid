import type { AppProps } from 'next/app';

import '@/styles/globals.css';

import { nexonGothic } from "@/styles/nexonfont";

import PageLayout from '@/components/layout/PageLayout';
import SnackbarContainer from '@/components/ui/Snackbar/Snackbar';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={nexonGothic.variable}>
      <PageLayout>
        <Component {...pageProps} />
        <SnackbarContainer />
      </PageLayout>
    </div>
  );
}
