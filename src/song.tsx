import React from 'react';

export default function card(props: { image: string; name: string }) {
    return (
      <div className="song">
      <div>
        <img className="song-image" src={props.image} alt="song-img"/>
      </div>
      <div className="song-name">
      {props.name}
        </div>
    </div>
    );
  }