import {PHOTO_REQUEST, PHOTO_REQUEST_ERROR,
  PHOTO_REQUEST_SUCCESS, PHOTO_CHANGE_LIKE,
} from './photoAction';

const initialState = {
  status: '',
  photo: {},
  error: '',
  likeByUser: false,
  likeCount: null,
};

export const photoReducer = (state = initialState, action) => {
  switch (action.type) {
    case PHOTO_REQUEST:
      return {
        ...state,
        status: 'loading',
        error: '',
      };
    case PHOTO_REQUEST_SUCCESS:
      return {
        status: 'loaded',
        photo: action.photo,
        likeByUser: action.photo.liked_by_user,
        likeCount: action.photo.likes,
        error: '',
      };
    case PHOTO_CHANGE_LIKE:
      return {
        ...state,
        likeByUser: action.likeByUser,
        likeCount: action.likeCount,
        error: '',
      };
    case PHOTO_REQUEST_ERROR:
      return {
        status: 'error',
        error: action.error,
      };
    default:
      return state;
  }
};
