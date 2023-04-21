import style from './Card.module.css';
import PropTypes from 'prop-types';
import Like from './Like';
import {Link} from 'react-router-dom';
import LoadImg from '../../../../UI/Preloader/LoadImg';

export const Card = ({card}) => {
  const {
    id,
    user,
    urls,
    likes,
    links,
    liked_by_user: liked,
    alt_description: description,
    width,
    height
  } = card;

  return (
    <div className={style.card}>
      <Link className={style.grid_item} to={`photo/${id}`}>
        <LoadImg src={urls.small} alt={description}
          className={style.image} height={height}
          width={width}/>
      </Link>
      <a className={style.card__author} href={user.links.html}
        target="_blank" rel="noreferrer noopener">
        <img className={style.author__photo} src={user.profile_image.medium}/>
      </a>
      <Like likes={likes} liked={liked} id={id}/>
      <a className={style.card__download} href={links.download}
        target='_blank' rel='noreferrer' download={true}></a>
    </div>
  );
};

Card.propTypes = {
  card: PropTypes.object,
};

