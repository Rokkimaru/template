import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { client_id, client_secret } from './clientId';
import Header from './header';
import LeftBar from './left-bar';
import Footer from './footer';
import Song from './song';
import Mix from './mix';
import { IContent, ISong } from './interfaces'
import { Section } from './section';

function App() {
  const [token, setToken] = useState('');
  const [albums, setAlbums] = useState<IContent[]>([]);
  const [artists, setArtists] = useState<IContent[]>([]);
  const [nextAlbums, setNextAlbums] = useState<IContent[]>([]);
  const [recentlySongs, setRecentlySongs] = useState<ISong[]>([]);
  const [songs, setSongs] = useState<ISong[]>([]);

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

  function useRequest(url: string, action: (value: AxiosResponse<any, any>) => void) {
    useEffect(() => {
      axios
        .get(url, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        })
        .then(action)
        .catch((error) => {
          console.log(error);
        });
    }, [token]);
  }

  useRequest(
    "https://api.spotify.com/v1/artists/3vf8X2CaHnkcVAp6NC9C7d/albums?limit=7",
    response => setArtists(response.data.items)
  );

  useRequest(
    "https://api.spotify.com/v1/tracks?ids=5L2qd1EBfNQJBW0FivYmXj,53shWqZYUcOCTM8bn6Z2nM," +
    "74rl89i6GlqWwOFVlBtEh9,6C7u9jJW3wgRNYZJ6Q3Mbi,0AWdqiBSPYoFbb2MbxuOuI,14xvuQEQgv98UzA2jGWLWW",
    response => setSongs(response.data.tracks)
  );

  useRequest(
    "https://api.spotify.com/v1/albums?ids=6VGOayoZVPmoySlmKiybdP,7hDvB29vtfPYypzxaxnMpT," +
    "3WjMbvQtYuRi4iSqWoEZc9,2rXSX9cNm16YW6OD3KqHcc",
    response => setAlbums(response.data.albums)
  );

  useRequest(
    "https://api.spotify.com/v1/tracks?ids=0z58HQdBeOGPCveLYfX6lO,1YADTnjt9bhRYc2Qm6ymDn,7vfWiNojqSxwOgcRR4hVo5",
    response => setRecentlySongs(response.data.tracks)
  );

  useRequest(
    "https://api.spotify.com/v1/albums?ids=1xh6IrXOzHT1Y7anMOzdiz,3m6zmxm0tQNLUTBFB5PJTR,1hNThSGNjabAId8CnNuI4L",
    response => setNextAlbums(response.data.albums)
  );

  return (
    <div className="App">
      <Header />
      <LeftBar />
      <main className="content">
        <div className="music">
          {token ? (
            <>
              <h1>Доброго времени суток</h1>
              <Section
                headerText=""
                sectionId="songs"
                content={songs.map(({ id, name, album }) => {
                  return <Song key={id} image={album.images[0].url} name={name} />;
                })}
                sectionClass="songs"
              />
              <Section
                headerText="Только для тебя, user"
                sectionId="albums"
                content={albums.map(({ id, name, images, artists }) => {
                  return <Mix key={id} image={images[0].url} name={name} desc={artists[0].name} />;
                })}
                sectionClass="mixes"
              />
              <Section
                headerText="Недавно просулшано"
                sectionId="recentlyListen"
                content={recentlySongs.map(({ id, name, artists, album }) => {
                  return <Mix key={id} image={album.images[0].url} name={name} desc={artists[0].name} />;
                })}
                sectionClass="mixes"
              />
              <Section
                headerText="Слушаем дальше?"
                sectionId="next"
                content={nextAlbums.map(({ id, name, images, artists }) => {
                  return <Mix key={id} image={images[0].url} name={name} desc={artists[0].name} />;
                })}
                sectionClass="mixes"
                underHeader="Подборки хитов по исполнителям."
              />
              <Section
                headerText="Похоже на то, что вы слушаете"
                sectionId="artist"
                content={artists.map(({ id, name, artists, images }) => {
                  return <Mix key={id} image={images[0].url} name={name} desc={artists[0].name} />;
                })}
                sectionClass="mixes"
              />
            </>
          ) : (
            <div>Sorry</div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;