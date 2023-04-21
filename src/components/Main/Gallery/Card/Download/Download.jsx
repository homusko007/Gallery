import style from './Download.module.css';
import PropTypes from 'prop-types';

export const Download = (links) => (
  <a className={style.card__download} href={links.link} download={true}></a>
);

Download.propTypes = {
  links: PropTypes.object,
};
