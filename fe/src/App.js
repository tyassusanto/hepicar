import logo from './logo.svg';
import './App.css';
import LoginComponent from './components/LoginComponent';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ReqAuth from './components/Auth/ReqAuth';
import Auth from './components/Auth/Auth';
import Main from './components/Main';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/login'
            element={
              <ReqAuth>
                <LoginComponent />
              </ReqAuth>
            }
          >
          </Route>
          <Route path='/' element={
            <Auth>
            <Main />
            </Auth>
          } />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
