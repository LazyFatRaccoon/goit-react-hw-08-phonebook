import React from 'react';

import AppNavigation from './AppNavigation';
import AuthNavigation from './AuthNavigation';
import UserMenu from './UserMenu';
import { useSelector } from 'react-redux';
import authSelectors from 'redux/auth/authSelectors';

import style from './style.module.css';

export default function AppBar() {
  const isLoggedIn = useSelector(
    authSelectors.getIsLoggedIn
  );
  return (
    <div className={style.navBar}>
      <AppNavigation />
      {!isLoggedIn && <AuthNavigation />}
      {isLoggedIn && <UserMenu />}
    </div>
  );
}
