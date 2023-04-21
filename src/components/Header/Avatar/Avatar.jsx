// import {useSelector} from 'react-redux';
import style from './Avatar.module.css';
import {useAuth} from '../../../hooks/useAuth';
import {ReactComponent as AvatarIcon} from '../../image/login.svg';

export const Avatar = () => {
  const [auth, loading] = useAuth();

  return (
    <div className={style.container}>
      {loading ? (
        'Загрузка'
        ) :
        auth.username ? ( // пустой {} тоже выводит true
      <>
        <div className={style.wrap} >
          <img className={style.img} src={auth.profile_image.medium}
            title={auth.username} alt={`Аватар ${auth.username}`} />
        </div>
      </>
          ) : (
            <AvatarIcon className={style.svg} />
          )
      }
    </div>
  );
};
