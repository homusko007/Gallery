// import {useState} from 'react';
import style from './Auth.module.css';
import {ReactComponent as EnterIcon} from '../../image/enter.svg';
import {ReactComponent as ExitIcon} from '../../image/exit.svg';
import {urlAuth} from '../../../api/auth';
import {useDispatch} from 'react-redux';
import {deleteToken} from '../../../store/token/tokenAction';
import {useAuth} from '../../../hooks/useAuth';

export const Auth = () => {
  const [auth, loading, clearAuth] = useAuth();
  const dispatch = useDispatch();

  const getLogout = () => {
    dispatch(deleteToken());
    clearAuth();
  };

  return (
    <div className={style.container}>
      {loading ? (
        'Загрузка'
        ) :
          auth.username ? (
       <button className={style.logout}
         onClick={getLogout}>
         <ExitIcon className={style.svg} />
       </button>
       ) : (
      <a className={style.authLink}
        href={urlAuth}>
        <EnterIcon className={style.svg} />
      </a>
    )}
    </div>
  );
};


/*   return (
    <div className={style.container}>
      {loading ? (
        'Загрузка'
        ) :
          auth.username ? ( // пустой {} тоже выводит true
      <>
        <button className={style.btn} onClick={() => setLogout(!logout)}>
          <img className={style.img} src={auth.profile_image.medium}
            title={auth.username} alt={`Аватар ${auth.username}`} />
        </button>
        <Link to="/likes" className={style.link}>
          {auth.username}
        </Link>
        {logout && (
          <button className={style.logout}
            onClick={getLogout}>
          выйти
          </button>)}
      </>
            ) : (
      <a className={style.authLink}
        href={urlAuth}>
        <LoginIcon className={style.svg} />
      </a>
    )}
    </div>
  );
};
        */
