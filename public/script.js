const client_id = 'b7b1599fede843508b1a61beb3778038';
const client_secret = 'b49f44d4fadd439685508e73017eb7c2';

async function getToken() {
  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      body: 'grant_type=client_credentials',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + btoa(client_id + ':' + client_secret),
      },
    });
    const token = await response.json();
    return token.access_token;
  } catch (e) {
    console.log(e);
  }
}

const request = async (url, method) => {
  const token = await getToken();
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ` + token,
  };
  try {
    const response = await fetch(url, {
      method: method,
      headers: headers,
    });

    return response.json();
  } catch (err) {
    console.error('Error', err);
  }
};

const $artist = document.querySelector('#artist');

async function getArtistAlbums() {
  const url = "https://api.spotify.com/v1/artists/3vf8X2CaHnkcVAp6NC9C7d/albums?limit=7"
  return await request(url, 'GET');
}

const artist = getArtistAlbums();

artist.then((data) => {
  data.items.forEach((item) => {
    $artist.insertAdjacentHTML(
      'beforeend',
      `<div class="mix">
              <div>
                <img class="mix-image" src="${item.images[0].url}">
              </div>
              <div class="mix-name">
                ${item.name}
                <div class="mix-author">
                ${item.artists[0].name}
                </div>
              </div>
        </div>`,
    );
  });
});

const $albums = document.querySelector('#albums');

async function getAlbums() {
  const url = "https://api.spotify.com/v1/albums?ids=6VGOayoZVPmoySlmKiybdP,7hDvB29vtfPYypzxaxnMpT," +
    "3WjMbvQtYuRi4iSqWoEZc9,2rXSX9cNm16YW6OD3KqHcc"
  return await request(url, 'GET');
}

const albums = getAlbums();

albums.then((data) => {
  data.albums.forEach((item) => {
    $albums.insertAdjacentHTML(
      'beforeend',
      `<div class="mix">
              <div>
                <img class="mix-image" src="${item.images[0].url}">
              </div>
              <div class="mix-name">
                ${item.name}
                <div class="mix-author">
                ${item.artists[0].name}
                </div>
              </div>
        </div>`,
    );
  });
});

const $songs = document.querySelector('#songs');

async function getSongs() {
  const url = "https://api.spotify.com/v1/tracks?ids=5L2qd1EBfNQJBW0FivYmXj,53shWqZYUcOCTM8bn6Z2nM," +
    "74rl89i6GlqWwOFVlBtEh9,6C7u9jJW3wgRNYZJ6Q3Mbi,0AWdqiBSPYoFbb2MbxuOuI,14xvuQEQgv98UzA2jGWLWW"
  return await request(url, 'GET');
}

const songs = getSongs();

songs.then((data) => {
  data.tracks.forEach((item) => {
    $songs.insertAdjacentHTML(
      'beforeend',
      `<div class="song">
        <div>
          <img class="song-image" src="${item.album.images[0].url}">
        </div>
        <div class="song-name">
        ${item.name}
          </div>
      </div>`,
    );
  });
})

const $playlists = document.querySelector('#artist');

async function getPlaylistsDora() {
  const url = "https://api.spotify.com/v1/playlists/37i9dQZF1DZ06evO1gK520"
  return await request(url, 'GET');
}

async function getPlaylistsGone() {
  const url = "https://api.spotify.com/v1/playlists/37i9dQZF1DZ06evO0a8Sf0"
  return await request(url, 'GET');
}

async function getPlaylistsBuda() {
  const url = "https://api.spotify.com/v1/playlists/37i9dQZF1DZ06evO0WIxdn"
  return await request(url, 'GET');
}

async function getPlaylistsDepo() {
  const url = "https://api.spotify.com/v1/playlists/37i9dQZF1DZ06evO4gUoF4"
  return await request(url, 'GET');
}

const playlistsDora = getPlaylistsDora();
const playlistGone = getPlaylistsGone();
const playlistBuda = getPlaylistsBuda();
const playlistDepo = getPlaylistsDepo()
const thisIs = [playlistsDora, playlistGone, playlistBuda, playlistDepo];
const $thisIs = document.querySelector('#mixes');

thisIs.forEach((value) => value.then((data) => {
  $thisIs.insertAdjacentHTML(
    'beforeend',
    `<div class="mix">
          <div>
            <img class="mix-image" src="${data.images[0].url}">
          </div>
          <div class="mix-name">
            ${data.name}
             <div class="mix-author">
                ${data.description}  
              </div>
          </div>
        </div>`,
  );
}))

const $recently = document.querySelector('#recentlyListen');

async function getRecentlyListenAlbums() {
  const url = "https://api.spotify.com/v1/albums?ids=3KCTalNYMYwD9LroSWFYrd,0XJ2GHflMl75zuofYfuARg"
  return await request(url, 'GET');
}

const recentlyAlbums = getRecentlyListenAlbums();

recentlyAlbums.then((data) => {
  data.albums.forEach((item) => {
    $recently.insertAdjacentHTML(
      'beforeend',
      `<div class="mix">
              <div>
                <img class="mix-image" src="${item.images[0].url}">
              </div>
              <div class="mix-name">
                ${item.name}
                <div class="mix-author">
                ${item.artists[0].name}
                </div>
              </div>
        </div>`,
    );
  });
});

async function getRecentlyListenSongs() {
  const url = "https://api.spotify.com/v1/tracks?ids=0z58HQdBeOGPCveLYfX6lO,1YADTnjt9bhRYc2Qm6ymDn,7vfWiNojqSxwOgcRR4hVo5"
  return await request(url, 'GET');
}

const recentlySongs = getRecentlyListenSongs();

recentlySongs.then((data) => {
  data.tracks.forEach((item) => {
    $recently.insertAdjacentHTML(
      'beforeend',
      `<div class="mix">
              <div>
                <img class="mix-image" src="${item.album.images[0].url}">
              </div>
              <div class="mix-name">
                ${item.name}
                <div class="mix-author">
                ${item.artists[0].name}
                </div>
              </div>
        </div>`,
    );
  });
})

playlistsDora.then((data) => {
  $recently.insertAdjacentHTML(
    'beforeend',
    `<div class="mix">
        <div>
          <img class="mix-image" src="${data.images[0].url}">
        </div>
        <div class="mix-name">
          ${data.name}
           <div class="mix-author">
              ${data.description}  
            </div>
        </div>
      </div>`,
  );
  $next.insertAdjacentHTML(
    'beforeend',
    `<div class="mix">
        <div>
          <img class="mix-image" src="${data.images[0].url}">
        </div>
        <div class="mix-name">
          ${data.name}
           <div class="mix-author">
              ${data.description}  
            </div>
        </div>
      </div>`,
  );
})

const $next = document.querySelector('#next');

async function getSongsNext() {
  const url = "https://api.spotify.com/v1/tracks?ids=7D8k995g6jdie4NF1E7Tpu,53shWqZYUcOCTM8bn6Z2nM,75XM03G3WuW8vTRhJ7B3Hu"
  return await request(url, 'GET');
}

const songsNext = getSongsNext();

songsNext.then((data) => {
  data.tracks.forEach((item) => {
    $next.insertAdjacentHTML(
      'beforeend',
      `<div class="mix">
        <div>
          <img class="mix-image" src="${item.album.images[0].url}">
        </div>
        <div class="mix-name">
          ${item.name}
          <div class="mix-author">
              ${item.artists[0].name}
          </div>
        </div>
      </div>`,
    );
  });
})

async function getAlbumsNext() {
  const url = "https://api.spotify.com/v1/albums?ids=1xh6IrXOzHT1Y7anMOzdiz,3m6zmxm0tQNLUTBFB5PJTR,1hNThSGNjabAId8CnNuI4L"
  return await request(url, 'GET');
}

const albumsNext = getAlbumsNext();

albumsNext.then((data) => {
  data.albums.forEach((item) => {
    $next.insertAdjacentHTML(
      'beforeend',
      `<div class="mix">
            <div>
              <img class="mix-image" src="${item.images[0].url}">
            </div>
            <div class="mix-name">
              ${item.name}
              <div class="mix-author">
              ${item.artists[0].name}
              </div>
            </div>
      </div>`,
    );
  });
});