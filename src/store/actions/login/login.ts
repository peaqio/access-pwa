import axios, { AxiosPromise } from 'axios';
import { BACKEND_URL } from '../../../const/backend';
import Router from 'next/router';
import jwtDecode from 'jwt-decode';
import { SAVE_TOKEN } from '../token';
import { SAVE_REFRESH_TOKEN } from './refresh-token';
import { actions } from './actions';

export const LOGIN_START = () => ({
  type: actions.LOGIN_START,
});

export const LOGIN_SUCCESS = (
  data: {
    access_token: string;
    refresh_token: string;
  },
  uid: string,
) => ({
  type: actions.LOGIN_SUCCESS,
  access_token: data.access_token,
  refresh_token: data.refresh_token,
  uid,
});

export const LOGIN_FAILURE = (error: any) => ({
  type: actions.LOGIN_FAILURE,
  error,
});

let request: AxiosPromise;

export const LOGIN = (email: string, password: string) => {
  return (dispatch) => {
    // Setup loader
    dispatch(LOGIN_START());

    return (request =
      request ||
      axios
        .post(
          BACKEND_URL + '/v1/register/login',
          {
            api: 'v1',
            email,
            password,
          },
          {
            validateStatus(status) {
              return status < 400;
            },
          },
        )
        .then((response) => {
          if (response.data.access_token) {
            const uid = jwtDecode(response.data.access_token).uid;

            dispatch(LOGIN_SUCCESS(response.data, uid));
            SAVE_TOKEN(response.data.access_token)();
            SAVE_REFRESH_TOKEN(response.data.refresh_token)();
            Router.push('/');
          }

          return response;
        })
        .catch((err) => {
          if (err && err.response && err.response.status === 401) {
            dispatch(LOGIN_FAILURE(true));
          } else {
            dispatch(LOGIN_FAILURE(false));
          }

          throw err;
        })
        .finally(() => (request = undefined)));
  };
};
