import style from './Header.module.css';
import Layout from '../Layout';
import Avatar from './Avatar';
import Search from './Search';
import Auth from './Auth';
import Heading from './Heading';
import {ReactComponent as LikeIcon} from '../image/like.svg';
import {useNavigate} from 'react-router-dom';
// import {Link} from 'react-router-dom';

export const Header = () => {
  const navigate = useNavigate();
  return (
    <header className={style.header}>
      <Layout>
        <div className={style.gridContainer}>
          <Avatar />
          <Heading />
          <button className={style.link}
            onClick={() => {
              navigate(`/likes`);
            }}>
            <LikeIcon />
          </button>
          <Search/>
          <Auth />
        </div>
      </Layout>
    </header>
  );
};
