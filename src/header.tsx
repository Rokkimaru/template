import React from 'react';

export default function header(){
    return  (
        <header className="header">
        <div className="top-bar">
          <div className="arrows">
            <button className="left  arrow" title="Назад"></button>
            <button className="right  arrow" title="Вперед"></button>
          </div>
          <div className="tarif">
            <button className="change-tarif">Сменить тариф</button>
          </div>
            <button className="account">
              <img className="account-image" src='./images/account.png' alt="img"/>
              <span>Аккаунт</span>
              <img className="account-image" src="./images/arrow_down.png" alt="img"/>
            </button>
        </div>
      </header>
    );
}
