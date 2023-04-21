import {API_URL, ACCESS_KEY} from '../api/const';
import axios from 'axios';

const UPDATE_LIKE = 'UPDATE_LIKE';

export const updateLike = () => ({
  type: UPDATE_LIKE,
});


export const updateLikeAsync = (liked, id) => (dispatch, getState) => {
  const token = getState().tokenReducer.token;

  axios({
    method: liked ? 'delete' : 'post',
    url: `${API_URL}/photos/${id}/like?client_id=${ACCESS_KEY}`,
    headers: {
      Authorization: `Bearer ${token}`
    },
  })
    .then(response => response.json())
    .then((data) => dispatch(updateLike()))
    .catch(error =>
      ({error: error.toString()}));
};

