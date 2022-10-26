import React from 'react';
import { NavLink } from 'react-router-dom';
import style from 'components/AppBar/style.module.css';
import { useSelector } from 'react-redux';
import { authSelectors } from 'redux/auth';

export default function AppNavigation() {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);
  return (
    <div className={style.container}>
      <NavLink
        className={({ isActive }) =>
          [style.navLink, isActive ? style.active : ''].join(' ')
        }
        to={'/'}
        key={'home'}
        end
      >
        Home
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          [
            style.navLink,
            isLoggedIn ? (isActive ? style.active : '') : style.disabled,
          ].join(' ')
        }
        to={'/contacts'}
        key={'contacts'}
      >
        Contacts
      </NavLink>
    </div>
  );
}
