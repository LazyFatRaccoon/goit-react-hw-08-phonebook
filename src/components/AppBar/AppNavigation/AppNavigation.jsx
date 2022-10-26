import React from 'react';
import { NavLink } from 'react-router-dom';
import style from 'components/AppBar/style.module.css';

export default function AppNavigation() {
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
          [style.navLink, isActive ? style.active : ''].join(' ')
        }
        to={'/contacts'}
        key={'contacts'}
      >
        Contacts
      </NavLink>
    </div>
  );
}
