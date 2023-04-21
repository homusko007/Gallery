import style from './Like.module.css';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
// import {updateLikeAsync} from '../../../../../store/likeReducer';
import {useState} from 'react';
import {updateLikeAsync} from '../../../../../store/likeReducer';
import cn from 'classnames';
// import {changeLike} from '../../../../../store/cards/cardsAction';


export const Like = ({likes, id, liked}) => {
  const token = useSelector(state => state.tokenReducer.token);
  const [isLiked, setIsLiked] = useState(liked);
  const [isLikes, setIsLikes] = useState(likes);
  const dispatch = useDispatch();

  /* useEffect(() => {
    cards.forEach(el => {
      if (el.id === id) {
        setIsLiked(el.liked_by_user);
        setIsLikes(el.likes);
      }
    });
  }, [isLiked]);*/


  const handleClick = () => {
    if (token) {
      dispatch(updateLikeAsync(liked, id));
      if (isLiked) {
        setIsLiked(false);
        setIsLikes(likes - 1);
      } else {
        setIsLiked(true);
        setIsLikes(likes + 1);
      }
      if (isLikes === likes - 1) {
        setIsLikes(isLikes + 1);
        setIsLiked(true);
      }
      if (isLikes === likes + 1) {
        setIsLikes(isLikes - 1);
        setIsLiked(false);
      }
    } else {
      alert('Вы не авторизованы');
    }
  };

  /* useEffect(() => {
  dispatch(updateLikeAsync(liked, id));
  }, []);*/

  return (
    <button className={cn(style.btn, isLiked ? style.liked : style.unliked)}
      onClick={handleClick} aria-label='Поставить лайк'>
      {isLikes}
    </button>

  );
};

Like.propTypes = {
  likes: PropTypes.number,
  liked: PropTypes.bool,
  id: PropTypes.string,
};
