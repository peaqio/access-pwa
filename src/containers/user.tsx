import React, { useEffect } from 'react';
import { NextPage, NextPageContext } from 'next';
import { Dispatch } from 'redux';
import { ILogin } from '../interfaces/login';
import { connect } from 'react-redux';
import { FETCH_DATA } from '../store/actions/login/user';
import { LOGOUT } from '../store/actions/login/logout';
import { IStore } from '../interfaces/store';

export const withUserData = <
  P extends {
    dispatch: Dispatch;
    token?: string;
    loading: boolean;
    userData: ILogin;
    uid: string;
    pageTransitionReadyToEnter?: () => void;
  }
>(
  Component: NextPage<P>,
) => {
  const loadUser = (uid, dispatch, props?) => {
    return FETCH_DATA(uid)(dispatch).then((response) => {
      if (props && props.pageTransitionReadyToEnter && !props.loading) {
        props.pageTransitionReadyToEnter();
      }

      return response;
    });
  };

  const PageComponent: NextPage = connect(
    mapStateToProps,
    mapDispatchToProps,
  )(
    // @ts-ignore
    (props: P) => {
      useEffect(() => {
        if (props.token && props.uid && !props.loading && !props.userData) {
          loadUser(props.uid, props.dispatch, props);
        }
      }, [props.token, props.uid, props.loading, props.userData]);

      const logout = () => {
        LOGOUT()(props.dispatch);
      };

      return <Component {...props} logout={logout} loading={props.loading} />;
    },
  ) as any;

  function mapStateToProps(state, props) {
    return {
      ...props,
      loading: state.Login.loading || state.Door.loading,
      token: state.Login.token,
      userData: state.Login.data,
      uid: state.Login.uid,
    };
  }

  function mapDispatchToProps(dispatch: Dispatch) {
    return { dispatch };
  }

  PageComponent.getInitialProps = async (
    ctx: NextPageContext & { store: IStore; uid: string },
  ) => {
    let props = {};

    if (Component.getInitialProps) {
      props = await Component.getInitialProps(ctx);
    }

    if (ctx.uid) {
      await loadUser(ctx.uid, ctx.store.dispatch);
    }

    return props;
  };

  return PageComponent;
};
