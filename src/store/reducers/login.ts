import { AnyAction } from 'redux';
import { ILoginStore } from '../../interfaces/login';
import { actions } from '../actions/login';
import { LOGOUT_ACTION_TYPE } from '../actions/login/logout';

export function Login(
  state: ILoginStore = {
    token: null,
    data: null,
    loading: false,
    error: false,
    refresh_token: null,
    uid: null,
  },
  action: AnyAction,
) {
  switch (action.type) {
    case actions.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        token: action.access_token,
        refresh_token: action.refresh_token,
        uid: action.uid,
      };

    case actions.LOGIN_START:
    case actions.FETCH_DATA_START:
      return {
        ...state,
        loading: true,
      };
    case actions.LOGIN_FAILURE:
    case actions.REFRESH_TOKEN_FAILURE:
    case actions.FETCH_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error === undefined || action.error,
      };
    case LOGOUT_ACTION_TYPE:
      return {
        token: null,
        data: null,
        loading: false,
        error: false,
        refresh_token: null,
        uid: null,
      };
    case actions.REFRESH_TOKEN_SUCCESS:
      return {
        ...state,
        refresh_token: action.refresh_token,
        token: action.access_token,
      };
    case actions.FETCH_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
      };

    default:
      return state;
  }
}
