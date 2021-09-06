import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Door } from './reducers/door';
import { Login } from './reducers/login';
import axios from 'axios';
import { Error } from './reducers/error';

declare const window: any;

const composeEnhancers =
  typeof window !== 'undefined'
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    : compose;

export const initializeStore = (initialState: any) => {
  axios.interceptors.response.use(
    (response) => {
      if (response) {
        console.log(
          `[${new Date()}] [ SUCCESS ] [ ${response.status} ] ${
            response.config.url
          }`,
        );
      }

      return response;
    },
    (error) => {
      if (error) {
        console.error(
          `[${new Date()}] [ FAILED ] [${(error.response &&
            error.response.status) ||
            0}] ${error.config && error.config.url}`,
        );
      }

      return Promise.reject(error);
    },
  );

  return createStore(
    combineReducers({ Door, Login, Error }),
    initialState,
    composeEnhancers(applyMiddleware(thunk)),
  );
};
