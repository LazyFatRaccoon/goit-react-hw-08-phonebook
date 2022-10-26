import React from 'react';
import { useSelector } from 'react-redux';
import { authOperations, authSelectors } from '../../../redux/auth';
import style from '../style.module.css';
import { useDispatch } from 'react-redux';

export default function UserMenu() {
  const userEmail = useSelector(authSelectors.getUserEmail);
  const dispatch = useDispatch();

  return (
    <div className={[style.container, style.userContainer].join(' ')}>
      <span className={style.email}>{userEmail}</span>
      <button
        className={style.logout}
        onClick={() => dispatch(authOperations.logout())}
        type="button"
      >
        logout
      </button>
    </div>
  );
}
