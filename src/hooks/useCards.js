import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {cardsRequestAsync} from '../store/card/cardsAction';

export const useCards = () => {
  const cardsData = useSelector(state => state.cardsReducer.cards);
  const loading = useSelector(state => state.cardsReducer.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(cardsRequestAsync({page: 1}));
  }, []);

  return [cardsData, loading];
};
