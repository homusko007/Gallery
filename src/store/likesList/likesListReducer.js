import {LIKES_LIST_REQUEST,
  LIKES_LIST_REQUEST_SUCCESS,
  LIKES_LIST_REQUEST_ERROR,
} from './likesListAction';

const initialState = {
  loading: false,
  photos: [],
  error: '',
};

export const likesListReducer = (state = initialState, action) => {
  switch (action.type) {
    case LIKES_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LIKES_LIST_REQUEST_SUCCESS:
      return {
        loading: false,
        photos: action.photos,
        error: '',
      };
      /* case LIKES_LIST_REQUEST_LOGOUT:
        return {
          ...state,
          loading: false,
          photos: [],
          error: '',
        };*/
    case LIKES_LIST_REQUEST_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
