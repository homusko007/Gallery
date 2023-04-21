import {useParams} from 'react-router-dom';
import Date from './Date';
import Author from './Author';
import Like from './Like';
import style from './Photo.module.css';
import {useSelector, useDispatch} from 'react-redux';
import {useEffect} from 'react';
import {photoRequestAsync} from '../../../store/photo/photoAction';
import {Preloader} from '../../../UI/Preloader/Preloader';
import ErrorPage from '../ErrorPage';
// import {API_URL_PHOTOS} from '../../../api/const';


export const Photo = () => {
  const {id} = useParams();
  // const token = useSelector(state => state.tokenReducer.token);
  const {status, photo} = useSelector(state => state.photoReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(photoRequestAsync(id));
  }, []);

  /* const downloadPhoto = (id, link) => {
    const url = `${API_URL_PHOTOS}/${id}/download`;


    fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-disposition': 'attachment',
      }
    }).then(data => data.blob())
      .then((blob) => {
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = 'img.txt';
        console.log(link);
        document.body.appendChild(link);
        link.click();
        link.remove();
      });
  };

  const downloadClickHandler = () => {
    downloadPhoto(id);
  };*/

  return (
    <div className={style.wapper}>
      {status === 'loading' && <Preloader />}
      {status === 'error' && <ErrorPage />}
      {status === 'loaded' && (
        <>
          <img className={style.picture}
            src={photo.urls.full} alt={photo.alt_description}/>
          <Date date={photo.created_at}/>
          <Author user={photo.user} />
          <div className={style.control}>
            <Like likes={photo.likes} liked={photo.liked_by_user} id={id}/>
            <a className={style.download}
              href={photo.urls.full} download={true}
            >
            </a>
          </div>
        </>
      )}
    </div>
  );
};
