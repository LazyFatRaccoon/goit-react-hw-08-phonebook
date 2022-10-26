import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import authOperations from 'redux/auth/authOperations';
import style from './registerStyle.module.css';

export default function RegisterView() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const changeHandler = ({ target: { name, value } }) => {
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      default:
        console.log('switch in RegisterView is broken');
    }
  };
  const submitHandler = e => {
    e.preventDefault();
    dispatch(authOperations.register({ name, email, password }));
    setName('');
    setEmail('');
    setPassword('');
  };
  return (
    <div>
      <p>Register</p>
      <form className={style.form} autoComplete="off" onSubmit={submitHandler}>
        <label name="name">
          Name
          <input
            type="text"
            name="name"
            value={name}
            onChange={changeHandler}
          />
        </label>
        <label name="email">
          Email
          <input
            type="email"
            name="email"
            value={email}
            onChange={changeHandler}
          />
        </label>
        <label name="password">
          Password
          <input
            type="text"
            name="password"
            value={password}
            onChange={changeHandler}
          />
        </label>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
