import axios from 'axios';
import { Dispatch, AnyAction } from 'redux';
import { DISPLAY_ERROR } from '../../store/actions/error';

export const useErrorInterceptor = (dispatch: Dispatch<AnyAction>) => {
  const displayErrorInterceptor = axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      let isOnline;

      if (typeof window !== 'undefined') {
        isOnline = navigator.onLine;
      }

      if (error && error.config && error.config.url) {
        if (
          !(error.config.url.indexOf('/v1/register/login') !== -1
            ? error.response && error.response.status === 401
            : false)
        ) {
          dispatch(
            DISPLAY_ERROR(error.response && error.response.status, !isOnline),
          );
        }
      }

      return Promise.reject(error);
    },
  );

  return () => {
    axios.interceptors.response.eject(displayErrorInterceptor);
  };
};
