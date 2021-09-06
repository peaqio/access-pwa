import axios, { AxiosPromise } from 'axios';
import { BACKEND_URL } from '../../../const/backend';
import { SAVE_TOKEN } from '../token';
import { actions } from './actions';
import { parseCookies, setCookie, destroyCookie } from 'nookies';
import { NextPageContext } from 'next';

export const REFRESH_TOKEN_START = () => ({
  type: actions.REFRESH_TOKEN_START,
});

export const REFRESH_TOKEN_SUCCESS = (data: {
  access_token: string;
  refresh_token: string;
}) => ({
  type: actions.REFRESH_TOKEN_SUCCESS,
  access_token: data.access_token,
  refresh_token: data.refresh_token,
});

export const REFRESH_TOKEN_FAILURE = () => ({
  type: actions.REFRESH_TOKEN_FAILURE,
});

export const GET_REFRESH_TOKEN = (
  ctx?: NextPageContext & { cookies?: any },
) => {
  return () => {
    return parseCookies(ctx).refresh_token;
  };
};

export const SAVE_REFRESH_TOKEN = (
  refresh_token: string,
  ctx?: NextPageContext,
) => {
  return () => {
    setCookie(ctx, 'refresh_token', refresh_token, {
      path: '/',
    });
  };
};

export const CLEAR_REFRESH_TOKEN = (ctx?: NextPageContext) => {
  return () => {
    destroyCookie(ctx, 'refresh_token');
  };
};

let fetchRequest: AxiosPromise;

export const REFRESH_TOKEN = (refresh_token: string, ctx?: NextPageContext) => {
  return (dispatch) => {
    dispatch(REFRESH_TOKEN_START());

    fetchRequest = axios.post(
      BACKEND_URL + '/v1/auth/refresh',
      {
        refresh_token,
        api: 'v1',
      },
      {
        validateStatus(status) {
          return status < 400;
        },
      },
    );

    return fetchRequest
      .then((response) => {
        dispatch(REFRESH_TOKEN_SUCCESS(response.data));

        SAVE_TOKEN(response.data.access_token, ctx)();
        SAVE_REFRESH_TOKEN(response.data.refresh_token, ctx)();

        return response;
      })
      .catch((err) => {
        dispatch(REFRESH_TOKEN_FAILURE());

        throw err;
      })
      .finally(() => (fetchRequest = undefined));
  };
};
