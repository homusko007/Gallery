import axios from 'axios';
import {urlToken} from '../../api/token';

export const REQUEST_TOKEN = 'REQUEST_TOKEN';
export const REQUEST_TOKEN_SUCCESS = 'REQUEST_TOKEN_SUCCESS';
export const REQUEST_TOKEN_ERROR = 'REQUEST_TOKEN_ERROR';
export const DELETE_TOKEN = 'DELETE_TOKEN';
export const UPDATE_TOKEN = 'UPDATE_TOKEN';

export const updateToken = (token) => ({
  type: UPDATE_TOKEN,
  token,
});

export const tokenRequest = () => ({
  type: REQUEST_TOKEN,
});

export const tokenRequestSuccess = (data) => ({
  type: REQUEST_TOKEN_SUCCESS,
  token: data,
});

export const tokenRequestError = (error) => ({
  type: REQUEST_TOKEN_ERROR,
  error,
});

export const deleteToken = () => ({
  type: DELETE_TOKEN,
  token: '',
});

export const tokenRequestAsync = () => (dispatch) => {
  if (localStorage.getItem('Bearer')) {
    return dispatch(updateToken(localStorage.getItem('Bearer')));
  }

  const url = new URL(location.href); // получим адреснуюю строку
  const code = url.searchParams.get('code');
  urlToken.searchParams.append('code', code);

  if (code) {
    dispatch(tokenRequest());
    axios.post(`${urlToken}`)
      .then(({data}) => {
        dispatch(tokenRequestSuccess(data.access_token));
      })
      .catch((err) => {
        dispatch(tokenRequestError(err.message));
      });
    const url = new URL(location);
    url.searchParams.delete('code');
    history.pushState(null, document.title, url);
  } else {
    return;
  }
};
