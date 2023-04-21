import {CARDS_REQUEST, CARDS_REQUEST_ERROR,
  CARDS_REQUEST_SUCCESS, CARDS_REQUEST_SUCCESS_AFTER
} from './cardsAction';

const initialState = {
  loading: false,
  cards: [],
  error: '',
  page: 1,
};

export const cardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CARDS_REQUEST:
      return {
        ...state,
        loading: true,
        error: '',
      };
    case CARDS_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        cards: action.cards,
        error: '',
        page: action.page,
      };
    case CARDS_REQUEST_SUCCESS_AFTER:
      return {
        ...state,
        loading: false,
        cards: [...state.cards, ...action.cards],
        error: '',
        page: action.page,
      };
    case CARDS_REQUEST_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
        page: 0,
      };
    default:
      return state;
  }
};
