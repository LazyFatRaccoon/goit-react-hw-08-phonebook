import ContactsView from 'views/ContactsView';
import HomeView from 'views/HomeView';
import LoginView from 'views/LoginView';
import RegisterView from 'views/RegisterView';
//import PrivateRoute from './AppBar/PrivateRoute';

import AppBar from './AppBar';

import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router';

import { authOperations, authSelectors } from 'redux/auth';
import { useDispatch, useSelector } from 'react-redux';

import style from './appStyle.module.scss';

export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authOperations.fetchCurrentUser());
  }, [dispatch]);

  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);
  console.log(isLoggedIn);

  return (
    <div className={style.app}>
      <AppBar />

      <Routes>
        <Route path="/" element={<HomeView />} exact />
        <Route
          path="/register"
          element={
            isLoggedIn ? <Navigate replace to="/contacts" /> : <RegisterView />
          }
        />
        <Route
          path="/login"
          element={
            isLoggedIn ? <Navigate replace to="/contacts" /> : <LoginView />
          }
        />
        <Route
          path="/contacts"
          element={
            isLoggedIn ? <ContactsView /> : <Navigate replace to="/login" />
          }
        />
      </Routes>
    </div>
  );
}
