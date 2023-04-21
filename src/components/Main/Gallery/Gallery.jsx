import style from './Gallery.module.css';
import Card from './Card';
import Masonry from 'react-masonry-css';
import {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Preloader} from '../../../UI/Preloader/Preloader';
import {cardsRequestAsync} from '../../../store/cards/cardsAction';
import ErrorPage from '../ErrorPage';
// import {useParams} from 'react-router-dom';


export const Gallery = () => {
  const cardsData = useSelector(state => state.cardsReducer.cards);
  const loading = useSelector(state => state.cardsReducer.loading);
  const endList = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(cardsRequestAsync());
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        dispatch(cardsRequestAsync());
      }
    }, {
      rootMargin: '300px',
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


  return (
    <>
      {cardsData ? (
      <Masonry
        breakpointCols={breakpoints}
        className={style.masonryGrid}
        columnClassName={style.masonryGridColumn}>
        {cardsData.map((card) => (
          <li key={card.id}>
            <Card card={card} />
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

/* } <div>
      <Masonry
        breakpointCols={breakpoints}
        className={style.masonry_grid}
        columnClassName={style.masonry_grid_column}>
        {cardsData.map((card) => (
          <Card key={card.id} card={card} />
        ))}
        <div ref={endList} className={style.end}>1111</div>
      </Masonry>
        </div>*/
