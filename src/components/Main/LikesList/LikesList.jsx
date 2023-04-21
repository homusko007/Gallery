import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {Preloader} from '../../../UI/Preloader/Preloader';
import {likesListRequestAsync} from '../../../store/likesList/likesListAction';
import {useAuth} from '../../../hooks/useAuth';
import style from './LikesList.module.css';
import Card from '../Gallery/Card';
import Masonry from 'react-masonry-css';
import {Outlet} from 'react-router-dom';


export const LikesList = () => {
  const token = useSelector(state => state.tokenReducer.token);
  const [auth] = useAuth();
  const photos = useSelector(state => state.likesListReducer.photos);
  const loading = useSelector(state => state.likesListReducer.loading);
  const dispatch = useDispatch();
  const navigation = useNavigate();

  useEffect(() => {
    if (!token) {
      navigation('/');
    }
    dispatch(likesListRequestAsync(auth.username));
  }, [auth]);

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    750: 2,
    550: 1
  };

  return (
    <>
      {photos ? (
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className={style.masonryGrid}
          columnClassName={style.masonryGridColumn}>
          {photos.map((data) => (
            <li key={`${data.id}`}>
              <Card
                card={data}
              />
            </li>
          ))}
          {loading &&
            <div className={style.more}><Preloader /></div>}
          <Outlet/>
        </Masonry>
    ) :
    (<p>Что-то не так </p>)}
    </>
  );
};
