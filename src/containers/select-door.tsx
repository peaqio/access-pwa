import { connect } from 'react-redux';
import { IDoor } from '../interfaces/door';
import { Dispatch } from 'redux';
import { GET_DOORS, SELECT_DOOR } from '../store/actions/door/door';
import Router from 'next/router';
import React, { useEffect, useState } from 'react';
import { NextPage, NextPageContext } from 'next';
import { IStore } from '../interfaces/store';

export const withSelectDoor = <
  P extends {
    doors: IDoor[];
    dispatch: Dispatch;
    router: typeof Router;
    uid: string;
    loading?: boolean;
    pageTransitionReadyToEnter?: () => void;
  }
>(
  Component: NextPage<P>,
) => {
  function mapStateToProps(state, props) {
    return {
      ...props,
      doors: state.Door.doors,
      loading: state.Door.loading || state.Login.loading,
    };
  }

  function mapDispatchToProps(dispatch: Dispatch) {
    return {
      dispatch,
    };
  }

  function loadDoors(uid, dispatch, props?) {
    return GET_DOORS(uid)(dispatch).then((response) => {
      if (props && props.pageTransitionReadyToEnter && !props.loading) {
        props.pageTransitionReadyToEnter();
      }

      return response;
    });
  }

  const PageComponent: NextPage = connect(
    mapStateToProps,
    mapDispatchToProps,
  )(
    // @ts-ignore
    (props: P) => {
      const [isFirstCall, setIsFirstCall] = useState(true);

      useEffect(() => {
        if (!props.loading && props.uid && !props.doors.length && isFirstCall) {
          setIsFirstCall(false);
          loadDoors(props.uid, props.dispatch, props);
        }
      }, [props.uid, props.doors, props.loading, isFirstCall]);

      const onSelect = (door: IDoor) => {
        props.dispatch(SELECT_DOOR(door));
        Router.push('/door');
      };

      return (
        <Component onSelect={onSelect} loading={props.loading} {...props} />
      );
    },
  );

  PageComponent.getInitialProps = async (
    ctx: NextPageContext & { store: IStore; uid?: string },
  ) => {
    let props = {};

    if (Component.getInitialProps) {
      props = await Component.getInitialProps(ctx);
    }

    if (ctx.uid) {
      await loadDoors(ctx.uid, ctx.store.dispatch);
    }

    return props;
  };

  return PageComponent;
};
