import { NextPage, NextPageContext } from 'next';
import { IErrorStore } from '../interfaces/error';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { useErrorInterceptor } from '../utils/interceptors/error';
import { IStore } from '../interfaces/store';
import { Snackbar } from 'access-pwa-styleguide/src/components/atoms/snackbar';
import { HIDE_ERROR } from '../store/actions/error';
import { Icon } from 'access-pwa-styleguide/src/components/atoms/access-icon';

export const withDisplayError = <
  P extends {
    error: Partial<Pick<IErrorStore, 'open' | 'isConnectionError' | 'status'>>;
    dispatch: Dispatch;
  }
>(
  Component: NextPage<P>,
) => {
  const PageComponent: NextPage = connect(
    mapStateToProps,
    mapDispatchToProps,
  )((props: P) => {
    const [message, setMessage] = useState('');
    const [open, setOpen] = useState(false);

    useEffect(() => {
      if (props.error.open) {
        if (props.error.status >= 500) {
          setMessage('Service unavailable, server error');
        } else if (props.error.status >= 400) {
          setMessage('Service unavailable, client error');
        } else if (props.error.isConnectionError) {
          setMessage('Please check your internet connection');
        } else {
          return;
        }
      }

      setOpen(props.error.open);
    }, [props.error.status, props.error.isConnectionError, props.error.open]);

    useEffect(() => {
      return useErrorInterceptor(props.dispatch);
    }, []);

    const handleClose = () => {
      props.dispatch(HIDE_ERROR());
    };

    return (
      <>
        <Component {...props} />
        <Snackbar
          message={
            <React.Fragment>
              <div className="severity">
                <Icon icon="exclamation-1" />
              </div>
              {message}
            </React.Fragment>
          }
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          autoHideDuration={6000}
          onClose={handleClose}
          open={open}
        />
      </>
    );
  });

  function mapDispatchToProps(dispatch: Dispatch) {
    return { dispatch };
  }

  function mapStateToProps(state, props) {
    return {
      ...props,
      error: state.Error,
    };
  }

  PageComponent.getInitialProps = async (
    ctx: NextPageContext & { ejectErrorInterceptor: () => void; store: IStore },
  ) => {
    ctx.ejectErrorInterceptor = useErrorInterceptor(ctx.store.dispatch);

    if (Component.getInitialProps) {
      return await Component.getInitialProps(ctx);
    }
  };

  return PageComponent;
};
