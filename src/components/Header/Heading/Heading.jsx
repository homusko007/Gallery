import {useAuth} from '../../../hooks/useAuth';
import style from './Heading.module.css';

export const Heading = () => {
  const [auth, loading] = useAuth();

  return (
    <div className={style.container}>
      {loading ? (
        'Загрузка'
        ) :
        auth.username ? (
            <h2 className={style.heading}>
              {auth.name}
            </h2>
        ) : (
          <h2 className={style.heading}>Photo Gallery</h2>
        )}
    </div>
  );
};
