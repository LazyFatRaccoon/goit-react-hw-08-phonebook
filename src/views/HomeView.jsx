import React from 'react';
import raccoon from './raccoon1.png';
import style from './homeStyle.module.css';

export default function HomeView() {
  console.log(raccoon);
  return (
    <div className={style.div}>
      <img className={style.img} src={raccoon} alt="adsad" />
      <p className={style.text}>
        Hello, this is a training project, data on the backend is cleared once a
        month. I strongly do not recommend using this application to store
        important data
      </p>
    </div>
  );
}
