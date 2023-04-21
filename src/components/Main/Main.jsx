import style from './Main.module.css';
import Layout from '../Layout';
import Gallery from './Gallery';
import Photo from './Photo';
import ErrorPage from './ErrorPage';
import LikesList from './LikesList';
import Search from './Search';
import {Route, Routes} from 'react-router-dom';

export const Main = () => (
  <main className={style.main}>
    <Layout>
      <Routes>
        <Route path='/' element={<Gallery />} />
        <Route path='/photo/:id' element={<Photo />} />
        <Route path='/likes' element={<LikesList />} />
        <Route path='/search/:search' element={<Search />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </Layout>
  </main>
);

