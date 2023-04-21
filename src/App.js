import Header from './components/Header';
import Main from './components/Main';
import {useDispatch} from 'react-redux';
import {tokenRequestAsync} from './store/token/tokenAction';
import {Route, Routes} from 'react-router-dom';
// import {getToken} from './api/token';

const App = () => {
  const dispatch = useDispatch();
  dispatch(tokenRequestAsync());
  return (
    <Routes>
      <Route path='*' element={
        <>
          <Header />
          <Main />
        </>
      }
      />
    </Routes>
  );
};
export default App;
