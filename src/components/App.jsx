import ContactsView from 'views/ContactsView/ContactsView';
import HomeView from 'views/HomeView/HomeView';
import LoginView from 'views/Login&RegisterView/LoginView';
import RegisterView from 'views/Login&RegisterView/RegisterView';
import NotFoundView from 'views/404/404view';

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
  const isRefreshing = useSelector(authSelectors.getIsRefreshing);
  console.log(isLoggedIn);

  return (
    !isRefreshing && (
      <div className={style.app}>
        <AppBar />

        <Routes>
          <Route path="/" element={<HomeView />} exact />
          <Route
            path="/register"
            element={
              isLoggedIn ? (
                <Navigate replace to="/contacts" />
              ) : (
                <RegisterView />
              )
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
          <Route path="*" element={<NotFoundView />} />
        </Routes>
      </div>
    )
  );
}
