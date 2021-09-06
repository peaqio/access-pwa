import axios, { AxiosPromise } from 'axios';
import { BACKEND_URL } from '../../../const/backend';
import { actions } from './actions';

let request: AxiosPromise;

export const ACCESS_DOOR_START = () => ({
  type: actions.ACCESS_DOOR_START,
});

export const ACCESS_DOOR_SUCCESS = (time: number) => ({
  type: actions.ACCESS_DOOR_SUCCESS,
  time,
});

export const ACCESS_DOOR_FAILED = () => ({
  type: actions.ACCESS_DOOR_FAILED,
});

export const ACCESS_DOOR = (ppk: string, cpk: string) => {
  return (dispatch) => {
    dispatch(ACCESS_DOOR_START());

    return (request =
      request ||
      axios
        .post(BACKEND_URL + '/v1/access', {
          api: 'v1',
          relation: {
            ppk,
            cpk,
          },
        })
        .then((response) => {
          dispatch(
            ACCESS_DOOR_SUCCESS(
              parseInt(response.data.timestamp, 10) || Date.now(),
            ),
          );
          return response;
        })
        .catch((err) => {
          dispatch(ACCESS_DOOR_FAILED());

          throw err;
        })
        .finally(() => (request = undefined)));
  };
};
