import { actions } from '../actions/error';
import { AnyAction } from 'redux';
import { IErrorStore } from '../../interfaces/error';

export const Error = (
  state: IErrorStore = {
    status: null,
    isConnectionError: false,
    open: false,
  },
  action: AnyAction,
): IErrorStore => {
  switch (action && action.type) {
    case actions.HIDE_ERROR:
      return {
        ...state,
        open: false,
      };
    case actions.DISPLAY_ERROR:
      return {
        status: action.status,
        isConnectionError: action.isConnectionError,
        open: true,
      };
    default:
      return state;
  }
};
