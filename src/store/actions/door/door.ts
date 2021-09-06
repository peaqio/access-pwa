import { IDoor } from '../../../interfaces/door';
import axios, { AxiosPromise } from 'axios';
import { BACKEND_URL } from '../../../const/backend';
import { actions } from './actions';

export const GET_DOORS_START = () => ({
  type: actions.GET_DOORS_START,
});

export const GET_DOORS_SUCCESS = (doors: IDoor[]) => ({
  type: actions.GET_DOORS_SUCCESS,
  doors,
});

export const GET_DOORS_FAILED = () => ({
  type: actions.GET_DOORS_FAILED,
});

let request: AxiosPromise;

export const GET_DOORS = (uid: string) => {
  return (dispatch) => {
    dispatch(GET_DOORS_START());

    return (request =
      request ||
      axios
        .all([
          axios.post(
            `${BACKEND_URL}/v1/providers/user/${uid}`,
            {
              userid: uid,
              api: 'v1',
            },
            {
              validateStatus(status) {
                return status < 400;
              },
            },
          ),
          axios.get(`${BACKEND_URL}/v1/keysRelation/${uid}?api=v1`, {
            validateStatus(status) {
              return status < 400;
            },
          }),
        ])
        .then(([response, relationResponse]) => {
          console.log(response.data.providers, relationResponse.data.relations);

          if (
            relationResponse.data.relations.length &&
            response.data.providers.length
          ) {
            const relations = relationResponse.data.relations;

            dispatch(
              GET_DOORS_SUCCESS(
                response.data.providers
                  .map((provider) => {
                    return {
                      ...provider,
                      cpk: relations
                        .filter(
                          (relation) => provider.id === relation.providerid,
                        )
                        .map((relation) => relation.cpk)[0],
                    };
                  })
                  .filter((provider) => provider.cpk)
                  .sort((a, b) => a.name.localeCompare(b.name)),
              ),
            );

            return response;
          }

          dispatch(GET_DOORS_SUCCESS([]));

          return response;
        })
        .catch((err) => {
          dispatch(GET_DOORS_FAILED());

          throw err;
        })
        .finally(() => (request = undefined)));
  };
};

export const SELECT_DOOR = (door: IDoor) => ({
  type: actions.SELECT_DOOR,
  door,
});
