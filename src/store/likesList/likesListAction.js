import {API_URL, ACCESS_KEY} from '../../api/const';
import axios from 'axios';

export const LIKES_LIST_REQUEST = 'LIKES_LIST_REQUEST';
export const LIKES_LIST_REQUEST_SUCCESS = 'LIKES_LIST_REQUEST_SUCCESS';
export const LIKES_LIST_REQUEST_ERROR = 'LIKES_LIST_REQUEST_ERROR';

export const likesListRequest = () => ({
  type: LIKES_LIST_REQUEST,
});

export const likesListRequestSuccess = (data) => ({
  type: LIKES_LIST_REQUEST_SUCCESS,
  photos: data,
});

export const likesListRequestError = (error) => ({
  type: LIKES_LIST_REQUEST_ERROR,
  error,
});

export const likesListRequestAsync = (username) => (dispatch, getState) => {
  const token = getState().tokenReducer.token;
  const loading = getState().likesListReducer.loading;
  const url = `${API_URL}/users/${username}/likes?client_id=${ACCESS_KEY}`;

  if (loading || !token) return;
  dispatch(likesListRequest());

  axios(`${url}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(({data}) =>
      dispatch(likesListRequestSuccess(data))
    )
    .catch((err) => {
      dispatch(likesListRequestError(err.toString()));
    });
};
