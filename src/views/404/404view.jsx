import React from 'react';
import style from './style.module.css';
import image from './raccoon4042.png';

export default function NotFoundView() {
  return (
    <div className={style.container}>
      <p>Sorry, but you miss the page</p>
      <img className={style.img} src={image} alt="raccoon 404" />
    </div>
  );
}
