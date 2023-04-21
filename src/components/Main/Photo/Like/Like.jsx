import style from './Like.module.css';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {changeLike} from '../../../../store/photo/photoAction';

export const Like = () => {
  const token = useSelector(state => state.tokenReducer.token);
  const likeCount = useSelector(state => state.photoReducer.likeCount);
  const likeByUser = useSelector(state => state.photoReducer.likeByUser);
  const {id} = useParams();
  const dispatch = useDispatch();

  const toggleLike = () => {
    if (!token) {
      alert('Вам нужно авторизоваться');
    } else {
      dispatch(changeLike(likeByUser, id));
    }
  };

  return (
    <button
      className={likeByUser ? style.like_btn_active : style.like_btn}
      onClick={toggleLike}
    >{likeCount}</button>
  );
};


/* import style from './Like.module.css';
import {useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {updateLikeAsync} from '../../../../store/likeReducer';
import {useState} from 'react';
import cn from 'classnames';

export const Like = ({likes, liked, id}) => {
  const token = useSelector(state => state.tokenReducer.token);
  const [isLiked, setIsLiked] = useState(liked);
  const [isLikes, setIsLikes] = useState(likes);
  const dispatch = useDispatch();


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


  return (
    <button className={cn(style.btn, isLiked ?
    style.like_btn_active : style.like_)}
    onClick={handleClick} aria-label='Поставить лайк'>
      {isLikes}
    </button>

  );
};

Like.propTypes = {
  likes: PropTypes.number,
  liked: PropTypes.bool,
  id: PropTypes.string,
}; */
