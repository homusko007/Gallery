import {combineReducers, createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from '@redux-devtools/extension';
import {tokenReducer, tokenMiddleware} from './token/tokenReducer';
import {authReducer} from './auth/authReducer';
import {cardsReducer} from './cards/cardsReducer';
import {photoReducer} from './photo/photoReducer';
import {likesListReducer} from './likesList/likesListReducer';
import {searchReducer} from './search/searchReducer';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  cardsReducer,
  tokenReducer,
  authReducer,
  photoReducer,
  likesListReducer,
  searchReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(tokenMiddleware, thunk)),
);
