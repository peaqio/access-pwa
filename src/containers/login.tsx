import React, { useEffect } from 'react';
import { NextPage, NextPageContext } from 'next';
import {
  LOGIN_SUCCESS,
  LOGIN,
  GET_REFRESH_TOKEN,
} from '../store/actions/login';
import Router from 'next/router';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { GET_TOKEN } from '../store/actions/token';
import { IStore } from '../interfaces/store';
import { useAuthInterceptor } from '../utils/interceptors/auth';

export const withLogin = <
  P extends {
    dispatch: Dispatch;
    children?: React.ReactNode;
    loading: boolean;
    error: boolean;
    token: string;
    uid: string;
  }
>(
  Component: NextPage<P>,
  { targetURL, reverse } = {
    targetURL: '/login',
    reverse: true,
  },
) => {
  const LoginCheck = (
    dispatch: Dispatch,
    ctx?: NextPageContext & { uid?: string },
  ) => {
    const access_token = GET_TOKEN(ctx)();
    const refresh_token = GET_REFRESH_TOKEN(ctx)();

    if (access_token) {
      const uid = jwtDecode(access_token).uid;

      if (ctx) {
        ctx.uid = uid;
      }

      dispatch(
        LOGIN_SUCCESS(
          {
            access_token,
            refresh_token,
          },
          uid,
        ),
      );
    }

    if (((!!access_token || 0) && 1) ^ ((reverse || 0) && 1)) {
      if (ctx && ctx.req) {
        ctx.res.writeHead(302, {
          Location: targetURL,
        });

        ctx.res.end();
      } else {
        if (Router.route !== targetURL) {
          Router.replace(targetURL);
        }
      }
    }
  };

  const PageComponent: NextPage = connect(
    mapStateToProps,
    mapDispatchToProps,
  )(
    // @ts-ignore
    (props: P) => {
      useEffect(() => {
        LoginCheck(props.dispatch);
      }, []);

      useEffect(() => {
        return useAuthInterceptor(props.dispatch);
      }, []);

      const OnLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        LOGIN((e.target as any).email.value, (e.target as any).password.value)(
          props.dispatch,
        );

        return false;
      };

      return (
        <Component
          {...props}
          onLogin={OnLogin}
          loading={props.loading}
          error={props.error}
        />
      );
    },
  ) as any;

  function mapDispatchToProps(dispatch: Dispatch) {
    return { dispatch };
  }

  function mapStateToProps(state, props) {
    return {
      ...props,
      loading: state.Login.loading,
      error: state.Login.error,
      uid: state.Login.uid,
      token: state.Login.token,
    };
  }

  PageComponent.getInitialProps = async (
    ctx: NextPageContext & { store: IStore; ejectInterceptor: () => void },
  ) => {
    let props = {};

    if (Component.getInitialProps) {
      props = await Component.getInitialProps(ctx);
    }

    ctx.ejectInterceptor = useAuthInterceptor(ctx.store.dispatch, ctx);

    LoginCheck(ctx.store.dispatch, ctx);

    return props;
  };

  return PageComponent;
};
