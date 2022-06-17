import React from 'react';

export default function leftBar() {
  return (
    <div className="left-bar">
      <div className="bar">
        <div className="logo" title="Spotify Clone">
          <a href="/">
            <img className="logo-image" src="./images/spotify_logo.png" alt="img"></img>
          </a>
        </div>
        <div>
          <ul className="menu">
            <li className="home  list menu-elem">
              <a className="link" href="/">
                <span>Главная</span>
              </a>
            </li>
            <li className="search  list menu-elem">
              <a className="link" href="/">
                <span>Поиск</span>
              </a>
            </li>
            <li className="mediateka  list menu-elem">
              <a className="link" href="/">
                <span>Моя медиатека</span>
              </a>
            </li>
          </ul>
        </div>
        <div className="playlist">
          <div className="add-playlist">
            <img src="./images/addplaylist.png" className="add-playlist-img" alt="img"></img>
            <span>Создать плейлист</span>
          </div>
          <div className="add-playlist">
            <img src="./images/heart.png" className="add-playlist-img" alt="img"></img>
            <span>Любимые треки</span>
          </div>
          <div className="my-playlist">
            <p>My first playlist</p>
          </div>
        </div>
        <div className="download">
          <span> Загрузить приложение</span>
        </div>
      </div>
    </div>
  );
}