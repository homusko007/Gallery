import style from './Autor.module.css';
import PropTypes from 'prop-types';

export const Autor = ({autor}) => (
  <a className={style.card__author} href={autor.links.html}>
    <img className={style.author__photo} src={autor.profile_image.medium} />
  </a>
);

Autor.propTypes = {
  autor: PropTypes.any,
};

