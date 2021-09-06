import { AnyAction } from 'redux';
import { IDoorStore } from '../../interfaces/door';
import { actions } from '../actions/door';

export const Door = (
  state: IDoorStore = {
    loading: false,
    error: false,
    selected: null,
    doors: [],
    time: 0,
  },
  action: AnyAction,
) => {
  switch (action.type) {
    case actions.GET_DOORS_START:
    case actions.ACCESS_DOOR_START:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case actions.GET_DOORS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        doors: action.doors,
      };
    case actions.GET_DOORS_FAILED:
    case actions.ACCESS_DOOR_FAILED:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case actions.SELECT_DOOR:
      return {
        ...state,
        selected: action.door,
      };
    case actions.ACCESS_DOOR_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        time: action.time + 6000,
      };
    default:
      return state;
  }
};
