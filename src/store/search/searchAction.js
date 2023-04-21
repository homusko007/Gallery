import {API_URL, ACCESS_KEY} from '../../api/const';
import axios from 'axios';

export const SEARCH_REQUEST = 'SEARCH_REQUEST';
export const SEARCH_REQUEST_SUCCESS = 'SEARCH_REQUEST_SUCCESS';
export const SEARCH_REQUEST_SUCCESS_AFTER = 'SEARCH_REQUEST_SUCCESS_AFTER';
export const SEARCH_REQUEST_ERROR = 'SEARCH_REQUEST_ERROR';

export const searchRequest = (search) => ({
  type: SEARCH_REQUEST,
  search,
});

export const searchRequestSuccess = (data, newPage) => ({
  type: SEARCH_REQUEST_SUCCESS,
  searchPhotos: data,
  page: newPage + 1,
});

export const searchRequestSuccessAfter = (data, newPage) => ({
  type: SEARCH_REQUEST_SUCCESS_AFTER,
  searchPhotos: data,
  page: newPage + 1,
});

export const searchRequestError = (error) => ({
  type: SEARCH_REQUEST_ERROR,
  error,
});


export const searchRequestAsync = (search) => (dispatch, getState) => {
  const token = getState().tokenReducer.token;
  const page = getState().searchReducer.page;
  const loading = getState().searchReducer.loading;
  const url = `${API_URL}/search/photos?query=${search}
  &client_id=${ACCESS_KEY}&per_page=30&page=${page}`;
  const headers = {};

  if (loading) return;

  dispatch(searchRequest());

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  } else {
    headers.Authorization = `Client-ID ${ACCESS_KEY}`;
  }
  axios(`${url}`, {
    headers,
  })
    .then(({data}) => {
      if (page > 1) {
        dispatch(searchRequestSuccessAfter(data.results, page));
      } else {
        dispatch(searchRequestSuccess(data.results, page));
      }
    })
    .catch((err) => {
      dispatch(searchRequestError(err.message));
    });
};
