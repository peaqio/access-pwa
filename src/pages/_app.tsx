import React from 'react';
import App, { AppInitialProps } from 'next/app';
import CssBaseline from '@material-ui/core/CssBaseline';
import withRedux from 'next-redux-wrapper';
import { initializeStore } from '../store';
import { Provider } from 'react-redux';
import { IStore } from '../interfaces/store';
import { NextComponentType, NextPageContext } from 'next';
import { Router } from 'next/router';
import { theme } from 'access-pwa-styleguide/src/theme';
import { ThemeProvider } from '@material-ui/core/styles';
import FontFace from 'access-pwa-styleguide/src/components/font-face';
import Icons from 'access-pwa-styleguide/src/components/icons';
import { PageTransition } from 'next-page-transitions';
import { Loader } from 'access-pwa-styleguide/src/components/atoms/loader';
import { BodyStyle } from '../global-style';

export default withRedux(initializeStore, {
  debug: false && process.env.NODE_ENV !== 'production',
})(
  class UIApp extends App<
    AppInitialProps & {
      Component: NextComponentType<NextPageContext, any, {}>;
      router: Router;
      store: IStore;
    }
  > {
    static async getInitialProps({ Component, router, ctx }) {
      const props = {
        pageProps: {
          ...(Component.getInitialProps
            ? await Component.getInitialProps(ctx)
            : {}),
        },
      };

      if (ctx.ejectIntercptor && ctx.req && ctx.res) {
        ctx.ejectInterceptor();
      }

      if (ctx.ejectErrorIntercptor && ctx.req && ctx.res) {
        ctx.ejectErrorInterceptor();
      }

      return props;
    }

    componentDidMount(): void {
      // Remove the server-side injected CSS.
      const jssStyles: HTMLElement = document.querySelector('#jss-server-side');
      if (jssStyles) {
        jssStyles.parentNode.removeChild(jssStyles);
      }
    }

    render() {
      const { Component, pageProps, store, router } = this.props;

      return (
        <>
          <CssBaseline />
          <FontFace />
          <BodyStyle />
          <Icons />
          <ThemeProvider theme={theme}>
            <Provider store={store}>
              <PageTransition
                pageTransitionDelayEnter={true}
                timeout={500}
                skipInitialTransition={true}
                classNames="page-transition"
                loadingComponent={<Loader />}
                loadingDelay={0}
              >
                <Component {...pageProps} key={router.route} />
              </PageTransition>
            </Provider>
          </ThemeProvider>
        </>
      );
    }
  },
);
