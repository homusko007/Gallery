import {
  SEARCH_REQUEST,
  SEARCH_REQUEST_SUCCESS,
  SEARCH_REQUEST_SUCCESS_AFTER,
  SEARCH_REQUEST_ERROR,
} from './searchAction';

const initialState = {
  loading: false,
  searchPhotos: [],
  error: '',
  page: 1,
};

export const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SEARCH_REQUEST_SUCCESS:
      return {
        loading: false,
        searchPhotos: action.searchPhotos,
        page: action.page,
        error: '',
      };
    case SEARCH_REQUEST_SUCCESS_AFTER:
      return {
        loading: false,
        searchPhotos: [...state.searchPhotos, ...action.searchPhotos],
        page: action.page,
        error: '',
      };
    case SEARCH_REQUEST_ERROR:
      return {
        ...state,
        loading: false,
        searchPhotos: [],
        error: action.error,
      };
    default:
      return state;
  }
};
