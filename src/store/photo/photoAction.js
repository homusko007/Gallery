import {API_URL, ACCESS_KEY} from '../../api/const';
import axios from 'axios';
// import {useParams} from 'react-router-dom';

export const PHOTO_REQUEST = 'PHOTO_REQUEST';
export const PHOTO_REQUEST_SUCCESS = 'PHOTO_REQUEST_SUCCESS';
export const PHOTO_REQUEST_ERROR = 'PHOTO_REQUEST_ERROR';
export const PHOTO_CHANGE_LIKE = 'PHOTO_CHANGE_LIKE';


export const changeLikeByUser = (data) => ({
  type: PHOTO_CHANGE_LIKE,
  likeByUser: data.liked_by_user,
  likeCount: data.likes,
});

export const photoRequest = () => ({
  type: PHOTO_REQUEST,
});

export const photoRequestSuccess = (data) => ({
  type: PHOTO_REQUEST_SUCCESS,
  photo: data,
  likeByUser: data.like_by_user,
  likeCount: data.likes,
// page: data.page,
});

export const photoRequestError = (error) => ({
  type: PHOTO_REQUEST_ERROR,
  error,
});

export const photoRequestAsync = (id) => (dispatch, getState) => {
  const token = getState().tokenReducer.token;
  const url = `${API_URL}/photos/${id}?client_id=${ACCESS_KEY}`;
  dispatch(photoRequest());
  const headers = {};

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  } else {
    headers.Authorization = `Client-ID ${ACCESS_KEY}`;
  }

  axios(`${url}`, { // без заголовка не возвращаются лайки
    headers,
  })
    .then(({data}) =>
      dispatch(photoRequestSuccess(data)))
    .catch((err) => {
      dispatch(photoRequestError(err.message));
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
    .then((data) => dispatch(changeLikeByUser(data.photo)))
    .catch((err) => {
      dispatch(photoRequestError(err.message));
    });
};

/* export const downloadPhoto = (id) => (getState) => {
  const token = getState().tokenReducer.token;
  // const url = `${API_URL}/photos/${id}/download`;
  console.log(token);

  /* fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(data => data.blob())
    .then((blob) => {
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.src = downloadUrl;
      console.log(link);
      link.setAttribute(
        'download',
      );
      document.body.appendChild(link);
      link.click();
      // downloadUrl.parentNode.removeChild(downloadUrl);
      link.remove();
    });
};*/

