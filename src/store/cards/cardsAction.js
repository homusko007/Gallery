import {API_URL, ACCESS_KEY} from '../../api/const';
import axios from 'axios';

export const CARDS_REQUEST = 'CARDS_REQUEST';
export const CARDS_REQUEST_SUCCESS = 'CARDS_REQUEST_SUCCESS';
export const CARDS_REQUEST_ERROR = 'CARDS_REQUEST_ERROR';
export const CARDS_REQUEST_SUCCESS_AFTER = 'CARDS_REQUEST_SUCCESS_AFTER';

export const cardsRequest = () => ({
  type: CARDS_REQUEST,
});

export const cardsRequestSuccess = (data, newPage) => ({
  type: CARDS_REQUEST_SUCCESS,
  cards: data,
  page: newPage + 2,
});

export const cardsRequestError = (error) => ({
  type: CARDS_REQUEST_ERROR,
  error,
});

export const cardsRequestSuccessAfter = (data, newPage) => ({
  type: CARDS_REQUEST_SUCCESS_AFTER,
  cards: data,
  page: newPage + 2,
});


export const cardsRequestAsync = (newPage) => (dispatch, getState) => {
  const page = newPage || getState().cardsReducer.page;
  const token = getState().tokenReducer.token;
  const url =
   `${API_URL}/photos?client_id=${ACCESS_KEY}&per_page=20&page=${page}`;
  const loading = getState().cardsReducer.loading;
  const headers = {};

  if (loading) return;

  dispatch(cardsRequest());
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  } else {
    headers.Authorization = `Client-ID ${ACCESS_KEY}`;
  }

  axios(`${url}`, { // без заголовка не возвращаются лайки
    headers,
  })
    .then((data) => {
      if (page > 1) {
        dispatch(cardsRequestSuccessAfter(data.data, page));
      } else {
        dispatch(cardsRequestSuccess(data.data, page));
      }
    })
    .catch((err) => {
      dispatch(cardsRequestError(err.message));
    });
};


export const changeLike = (liked, id) => (dispatch, getState) => {
  const token = getState().tokenReducer.token;
  const url = `${API_URL}/photos/${id}/like?client_id=${ACCESS_KEY}`;

  fetch(url, {
    method: liked ? 'DELETE' : 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then((data) => data.json())
    .then(data => console.log(data)
    )
    .catch((err) => {
      dispatch(cardsRequestError(err.message));
    });
};
