import nprogress from 'nprogress/nprogress.css';
import Router from 'next/router';
import NProgress from 'nprogress';
import { Provider as EffectorProvider } from 'effector-react/ssr';
import app from '@/models/app';
import React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { useLogger, useScope } from '@/lib/effector-setup';
import { Global } from '@emotion/react';
import { globalStyles } from '@/globalStyles';

NProgress.configure({
  showSpinner: false,
  trickleSpeed: 300,
});

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props;

  const scope = useScope(app, pageProps.initialState);

  useLogger(app);

  return (
    <EffectorProvider value={scope}>
      <React.Fragment>
        <Head>
          <title>My page</title>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
          <style dangerouslySetInnerHTML={{ __html: nprogress }} />
        </Head>
        <Global styles={globalStyles} />
        <Component {...pageProps} />
      </React.Fragment>
    </EffectorProvider>
  );
}