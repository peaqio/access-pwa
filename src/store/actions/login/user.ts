import axios, { AxiosPromise } from 'axios';
import { BACKEND_URL } from '../../../const/backend';
import { ILogin } from '../../../interfaces/login';
import { actions } from './actions';

export const FETCH_DATA_START = () => ({
  type: actions.FETCH_DATA_START,
});

export const FETCH_DATA_SUCCESS = (data: ILogin) => ({
  type: actions.FETCH_DATA_SUCCESS,
  data,
});

export const FETCH_DATA_FAILURE = () => ({
  type: actions.FETCH_DATA_FAILURE,
});

let fetchRequest: AxiosPromise;

export const FETCH_DATA = (uid: string) => {
  return (dispatch) => {
    dispatch(FETCH_DATA_START());

    fetchRequest = axios.get(`${BACKEND_URL}/v1/user/${uid}?api=v1`, {
      validateStatus(status) {
        return status < 400;
      },
    });

    return fetchRequest
      .then((response) => {
        dispatch(FETCH_DATA_SUCCESS(response.data));

        return response;
      })
      .catch((err) => {
        dispatch(FETCH_DATA_FAILURE());

        throw err;
      })
      .finally(() => (fetchRequest = undefined));
  };
};
