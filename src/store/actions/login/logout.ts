import { CLEAR_TOKEN } from '../token';
import { CLEAR_REFRESH_TOKEN } from './refresh-token';
import Router from 'next/router';

export const LOGOUT_ACTION_TYPE = 'LOGOUT';

export const LOGOUT = () => {
  return (dispatch) => {
    CLEAR_TOKEN()();
    CLEAR_REFRESH_TOKEN()();

    dispatch({
      type: LOGOUT_ACTION_TYPE,
    });

    Router.push('/login');
  };
};
