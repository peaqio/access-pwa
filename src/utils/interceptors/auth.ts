import axios from 'axios';
import { GET_TOKEN } from '../../store/actions/token';
import { LOGOUT } from '../../store/actions/login/logout';
import { REFRESH_TOKEN, GET_REFRESH_TOKEN } from '../../store/actions/login';
import { Dispatch, AnyAction } from 'redux';
import { NextPageContext } from 'next';

export const useAuthInterceptor = (
  dispatch: Dispatch<AnyAction>,
  ctx?: NextPageContext,
) => {
  const authInterceptor = axios.interceptors.request.use(
    async (config: any) => {
      if (config.url.indexOf('/v1/register/login') === -1) {
        const token = GET_TOKEN(ctx)();

        if (token !== null && !config.headers.Authorization) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }

      return config;
    },
  );

  const refreshTokenInterceptor = axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      const refresh_token = GET_REFRESH_TOKEN(ctx)();

      if (
        refresh_token != null &&
        error &&
        error.config &&
        error.config.url &&
        error.config.url.indexOf('/v1/auth/refresh') === -1 &&
        error.response &&
        error.response.status === 401
      ) {
        return REFRESH_TOKEN(refresh_token)(dispatch).then(
          (response) => {
            const token = response.data.access_token;
            const config = error.config;

            if (token !== null) {
              config.headers.Authorization = `Bearer ${token}`;
            }

            return axios.request(config);
          },
          () => {
            LOGOUT()(dispatch);
            return Promise.reject(error);
          },
        );
      }
      return Promise.reject(error);
    },
  );

  return () => {
    axios.interceptors.request.eject(authInterceptor);
    axios.interceptors.response.eject(refreshTokenInterceptor);
  };
};
