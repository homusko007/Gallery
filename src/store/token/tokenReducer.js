import {
  UPDATE_TOKEN,
  REQUEST_TOKEN,
  REQUEST_TOKEN_SUCCESS,
  REQUEST_TOKEN_ERROR,
  DELETE_TOKEN,
} from './tokenAction';

const initialState = {
  loading: false,
  token: '',
  error: '',
};


export const tokenMiddleware = (store) => (next) => (action) => {
  if (action.type === UPDATE_TOKEN) {
    localStorage.setItem('Bearer', action.token);
  }

  if (action.type === REQUEST_TOKEN_SUCCESS) {
    localStorage.setItem('Bearer', action.token);
  }

  if (action.type === DELETE_TOKEN) {
    localStorage.setItem('Bearer', '');
  }

  next(action);
};

export const tokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_TOKEN:
      return {
        token: action.token,
      };
    case REQUEST_TOKEN:
      return {
        ...state,
        loading: true,
        error: '',
      };
    case REQUEST_TOKEN_SUCCESS:
      return {
        loading: false,
        token: action.token,
        error: '',
      };
    case REQUEST_TOKEN_ERROR:
      return {
        loading: false,
        token: '',
        error: action.error,
      };
    case DELETE_TOKEN:
      return {
        ...state,
        token: '',
        error: '',
      };

    default:
      return state;
  }
};
