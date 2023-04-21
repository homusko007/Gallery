import style from './Author.module.css';
import PropTypes from 'prop-types';

export const Author = ({user}) => {
  const {
    links,
    profile_image: avatar,
    bio,
    name,
    location,
  } = user;

  return (
    <div className={style.author}>
      <a href={links.html} target="_blank" rel="noreferrer noopener">
        <img className={style.avatar} src={avatar.medium}
          alt={bio}
        />
      </a>
      <div className={style.info}>
        <p className={style.title}>
          {name}
        </p>
        <div className={style.location}>{location}</div>
        <div className={style.online}></div>
      </div>
    </div>
  );
};

Author.propTypes = {
  user: PropTypes.object,
};

