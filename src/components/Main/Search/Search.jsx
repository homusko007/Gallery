import style from './Search.module.css';
import Masonry from 'react-masonry-css';
import Card from '../Gallery/Card';
import ErrorPage from '../ErrorPage';
import {Preloader} from '../../../UI/Preloader/Preloader';
import {useSelector, useDispatch} from 'react-redux';
import {searchRequestAsync} from '../../../store/search/searchAction';
import {useEffect, useRef} from 'react';
import {useParams} from 'react-router-dom';

export const Search = () => {
  const {search} = useParams();
  const searchPhotos = useSelector(state =>
    state.searchReducer.searchPhotos);
  const loading = useSelector(state => state.searchReducer.loading);
  const endList = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(searchRequestAsync(search));
  }, [search]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        dispatch(searchRequestAsync(search));
      }
    }, {
      rootMargin: '100px',
    });

    observer.observe(endList.current);

    return () => {
      if (endList.current) {
        observer.unobserve(endList.current);
      }
    };
  }, [endList.current]);

  const breakpoints = {
    default: 4,
    1100: 3,
    750: 2,
    550: 1,
  };
  useEffect(() => {
    dispatch(searchRequestAsync(search));
  }, [search]);

  return (
    <>
      {searchPhotos ? (
      <Masonry
        breakpointCols={breakpoints}
        className={style.masonryGrid}
        columnClassName={style.masonryGridColumn}>
        {searchPhotos.map((data) => (
          <li key={`${data.id}`}>
            <Card
              card={data}
            />
          </li>
        ))}
        {loading &&
          <div className={style.more}><Preloader /></div>}
        <li ref={endList} className={style.end}/>
      </Masonry>
      ) :
      (<ErrorPage />)}
    </>
  );
};
