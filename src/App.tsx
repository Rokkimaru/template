import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { client_id, client_secret } from './clientId';
import Header from './header';
import LeftBar from './left-bar';
import Footer from './footer';
import Song from './song';
import Mix from './mix';
import {IContent, ISong} from './interfaces'

function App() {
  const [token, setToken] = useState('');
  const [albums, setAlbums] = useState<IContent[]>([]);
  const [artists, setArtists] = useState<IContent[]>([]);
  const [songs, setSongs] = useState<ISong[]>([]);
  const [recentlyAlbums, setRecentlyAlbums] = useState<IContent[]>([]);
  const [recentlySongs, setRecentlySongs] = useState<ISong[]>([]);
  const [nextAlbums, setNextAlbums] = useState<IContent[]>([]);
  const [nextSongs, setNextSongs] = useState<ISong[]>([]);

  useEffect(() => {
    const data = new URLSearchParams();
    data.append('grant_type', 'client_credentials');
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + btoa(client_id + ':' + client_secret),
    };
    axios
      .post('https://accounts.spotify.com/api/token', data, {
        headers: headers,
      })
      .then((response) => {
        setToken(response.data.access_token);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  
  useEffect(() => {
    axios
      .get("https://api.spotify.com/v1/artists/3vf8X2CaHnkcVAp6NC9C7d/albums?limit=7", {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      })
      .then((response) => {
        setArtists(response.data.items);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  useEffect(() => {
    axios
      .get("https://api.spotify.com/v1/tracks?ids=5L2qd1EBfNQJBW0FivYmXj,53shWqZYUcOCTM8bn6Z2nM," +
      "74rl89i6GlqWwOFVlBtEh9,6C7u9jJW3wgRNYZJ6Q3Mbi,0AWdqiBSPYoFbb2MbxuOuI,14xvuQEQgv98UzA2jGWLWW", {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      })
      .then((response) => {
        setSongs(response.data.tracks);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  useEffect(() => {
    axios
      .get("https://api.spotify.com/v1/albums?ids=6VGOayoZVPmoySlmKiybdP,7hDvB29vtfPYypzxaxnMpT,"+
      "3WjMbvQtYuRi4iSqWoEZc9,2rXSX9cNm16YW6OD3KqHcc", {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      })
      .then((response) => {
        setAlbums(response.data.albums);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  useEffect(() => {
    axios
      .get("https://api.spotify.com/v1/albums?ids=3KCTalNYMYwD9LroSWFYrd,0XJ2GHflMl75zuofYfuARg", {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      })
      .then((response) => {
        setRecentlyAlbums(response.data.albums);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  useEffect(() => {
    axios
      .get("https://api.spotify.com/v1/tracks?ids=0z58HQdBeOGPCveLYfX6lO,1YADTnjt9bhRYc2Qm6ymDn,7vfWiNojqSxwOgcRR4hVo5", {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      })
      .then((response) => {
        setRecentlySongs(response.data.tracks);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token])

  useEffect(() => {
    axios
      .get("https://api.spotify.com/v1/albums?ids=1xh6IrXOzHT1Y7anMOzdiz,3m6zmxm0tQNLUTBFB5PJTR,1hNThSGNjabAId8CnNuI4L", {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      })
      .then((response) => {
        setNextAlbums(response.data.albums);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  useEffect(() => {
    function result(){
      axios
      .get("https://api.spotify.com/v1/tracks?ids=7D8k995g6jdie4NF1E7Tpu,53shWqZYUcOCTM8bn6Z2nM,75XM03G3WuW8vTRhJ7B3Hu", {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      })
      .then((response) => {
        setNextSongs(response.data.tracks);
      })
      .catch((error) => {
        console.log(error);
      });
    }
    result()
  }, [token])

  return (
    <div className="App">
      <Header/>
      <LeftBar/>
      <main className="content">
        <div className="music">
          {token ? (
            <>
              <h1>Доброго времени суток</h1>
              <section className="songs" id="songs">
                {songs.map(({ id, name, album }) => {
                  return <Song key={id} image={album.images[0].url} name={name} />;
                })}
              </section>
              <h2 className="music-head">Только для тебя, user</h2>
              <section className="mixes" id="albums">
                {albums.map(({ id, name, images, artists }) => {
                  return <Mix key={id} image={images[0].url} name={name} desc={artists[0].name} />;
                })}
              </section>
              <h2 className="music-head">Недавно просулшано</h2>
              <section className="mixes" id="recentlyListen">
                {recentlySongs.map(({ id, name, artists, album }) => {
                  return <Mix key={id} image={album.images[0].url} name={name} desc={artists[0].name} />;
                })}
                {recentlyAlbums.map(({ id, name, artists, images }) => {
                  return <Mix key={id} image={images[0].url} name={name} desc={artists[0].name} />;
                })}
              </section>
              <h2 className="music-head">Слушаем дальше?
                <p className = "substr">Подборки хитов по исполнителям.</p>
              </h2>
              <section className="mixes" id="next">
                {nextSongs.map(({ id, name, artists, album }) => {
                  return <Mix key={id} image={album.images[0].url} name={name} desc={artists[0].name} />;
                })}
                {nextAlbums.map(({ id, name, images, artists }) => {
                  return <Mix key={id} image={images[0].url} name={name} desc={artists[0].name} />;
                })}
              </section>
              <h2 className="music-head">Похоже на то, что вы слушаете</h2>
              <section className="mixes" id="artist">
                {artists.map(({ id, name, artists, images }) => {
                  return <Mix key={id} image={images[0].url} name={name} desc={artists[0].name} />;
                })}
              </section>
            </>
          ): (
            <div>Sorry</div>
          )}
        </div>
      </main>
      <Footer/>
    </div>
  );
}

export default App;
