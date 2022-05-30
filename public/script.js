var redirect_uri = "http://localhost:3000/";

const client_id = 'b7b1599fede843508b1a61beb3778038';
const client_secret = 'b49f44d4fadd439685508e73017eb7c2';

const AUTHORIZE = "https://accounts.spotify.com/authorize";
const TOKEN = "https://accounts.spotify.com/api/token";

var access_token = null;
var refresh_token = null;

function requestAuthorization(){
    let url = AUTHORIZE;
    url += "?client_id=" + client_id;
    url += "&response_type=code";
    url += "&redirect_uri=" + encodeURI(redirect_uri);
    url += "&show_dialog=true";
    url += "&scope=user-read-private user-read-email user-modify-playback-state user-read-playback-position user-library-read streaming user-read-playback-state user-read-recently-played playlist-read-private playlist-modify-private";
    window.location.href = url; 
}

function onPageLoad(){
    if ( window.location.search.length > 0 ){
        handleRedirect();
    }
}
function handleRedirect(){
    let code = getCode();
    fetchAccessToken(code);
    window.history.pushState("", "", redirect_uri);
}

function fetchAccessToken( code ){
    let body = "grant_type=authorization_code";
    body += "&code=" + code; 
    body += "&redirect_uri=" + encodeURI(redirect_uri);
    body += "&client_id=" + client_id;
    body += "&client_secret=" + client_secret;
    callAuthorizationApi(body);
}

function callAuthorizationApi(body){
    let xhr = new XMLHttpRequest();
    xhr.open("POST", TOKEN, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Authorization', 'Basic ' + btoa(client_id + ":" + client_secret));
    xhr.send(body);
    xhr.onload = handleAuthorizationResponse;
}

function handleAuthorizationResponse(){
    if ( this.status == 200 ){
        var data = JSON.parse(this.responseText);
        console.log(data);
        var data = JSON.parse(this.responseText);
        if ( data.access_token != undefined ){
            access_token = data.access_token;
            localStorage.setItem("access_token", access_token);
        }
        if ( data.refresh_token  != undefined ){
            refresh_token = data.refresh_token;
            localStorage.setItem("refresh_token", refresh_token);
        }
        onPageLoad();
    }
    else {
        console.log(this.responseText);
        alert(this.responseText);
    }
}

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

const $artist = document.querySelector('#artist');

async function getArtistAlbums() {
    const limit = 7;
    const token = await getToken();
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/artists/3vf8X2CaHnkcVAp6NC9C7d/albums?limit=${limit}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        },
      );
      return response.json();
    } catch (e) {
      console.log(e);
    }
}

  const artist = getArtistAlbums();

  artist.then((data) => {
    console.log(data.items);
    data.items.forEach((item) => {
      console.log(item);
      $artist.insertAdjacentHTML(
        'beforeend',
        `
        <div class="mix">
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
    const token = await getToken();
    try {
      const response = await fetch(
        "https://api.spotify.com/v1/albums?ids=6VGOayoZVPmoySlmKiybdP,7hDvB29vtfPYypzxaxnMpT,"+
        "3WjMbvQtYuRi4iSqWoEZc9,2rXSX9cNm16YW6OD3KqHcc",
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        },
      );
      return response.json();
    } catch (e) {
      console.log(e);
    }   
  }
  
  const albums = getAlbums();

  albums.then((data) => {
    console.log(data.albums);
    data.albums.forEach((item) => {
      console.log(item);
      $albums.insertAdjacentHTML(
        'beforeend',
        `
        <div class="mix">
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
  const token = await getToken();
  try {
    const response = await fetch(
      "https://api.spotify.com/v1/tracks?ids=5L2qd1EBfNQJBW0FivYmXj,53shWqZYUcOCTM8bn6Z2nM," +
      "74rl89i6GlqWwOFVlBtEh9,6C7u9jJW3wgRNYZJ6Q3Mbi,0AWdqiBSPYoFbb2MbxuOuI,14xvuQEQgv98UzA2jGWLWW",
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      },
    );
    return response.json();
  } catch (e) {
    console.log(e);
  }
}

const songs = getSongs();

songs.then((data) => {
  console.log(data.tracks);
  data.tracks.forEach((item) => {
    console.log(item);
    $songs.insertAdjacentHTML(
      'beforeend',
      `
      <div class="song">
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
      const token = await getToken();
      try {
        const response = await fetch(
          `https://api.spotify.com/v1/playlists/37i9dQZF1DZ06evO1gK520`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + token,
            },
          },
        );
        return response.json();
      } catch (e) {
        console.log(e);
      }
  }

    async function getPlaylistsGone() {
      const token = await getToken();
      try {
        const response = await fetch(
          `https://api.spotify.com/v1/playlists/37i9dQZF1DZ06evO0a8Sf0`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + token,
            },
          },
        );
        return response.json();
      } catch (e) {
        console.log(e);
      }
  }

  async function getPlaylistsBuda() {
    const token = await getToken();
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/playlists/37i9dQZF1DZ06evO0WIxdn`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        },
      );
      return response.json();
    } catch (e) {
      console.log(e);
    }
}

async function getPlaylistsDepo() {
  const token = await getToken();
  try {
    const response = await fetch(
      `https://api.spotify.com/v1/playlists/37i9dQZF1DZ06evO4gUoF4`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      },
    );
    return response.json();
  } catch (e) {
    console.log(e);
  }
}

  const playlistsDora = getPlaylistsDora();
  const playlistGone = getPlaylistsGone();
  const playlistBuda = getPlaylistsBuda();
  const playlistDepo = getPlaylistsDepo()
  const thisIs  = [playlistsDora,playlistGone,playlistBuda,playlistDepo];
  const $thisIs = document.querySelector('#mixes');

  thisIs.forEach((value)=>value.then((data) => {
    console.log(data);
      $thisIs.insertAdjacentHTML(
        'beforeend',
        `
        <div class="mix">
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
    const token = await getToken();
    try {
      const response = await fetch(
        "https://api.spotify.com/v1/albums?ids=3KCTalNYMYwD9LroSWFYrd,0XJ2GHflMl75zuofYfuARg",
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        },
      );
      return response.json();
    } catch (e) {
      console.log(e);
    }   
  }

  const recentlyAlbums = getRecentlyListenAlbums();

  recentlyAlbums.then((data) => {
    console.log(data.albums);
    data.albums.forEach((item) => {
      console.log(item);
      $recently.insertAdjacentHTML(
        'beforeend',
        `
        <div class="mix">
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
    const token = await getToken();
    try {
      const response = await fetch(
        "https://api.spotify.com/v1/tracks?ids=0z58HQdBeOGPCveLYfX6lO,1YADTnjt9bhRYc2Qm6ymDn,7vfWiNojqSxwOgcRR4hVo5",
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        },
      );
      return response.json();
    } catch (e) {
      console.log(e);
    }
  }

const recentlySongs = getRecentlyListenSongs();

recentlySongs.then((data) => {
  console.log(data.tracks);
  data.tracks.forEach((item) => {
    console.log(item);
    $recently.insertAdjacentHTML(
      'beforeend',
      `
      <div class="mix">
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
  console.log(data);
    $recently.insertAdjacentHTML(
      'beforeend',
      `
      <div class="mix">
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
      `
      <div class="mix">
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
  const token = await getToken();
  try {
    const response = await fetch(
      "https://api.spotify.com/v1/tracks?ids=7D8k995g6jdie4NF1E7Tpu,53shWqZYUcOCTM8bn6Z2nM,75XM03G3WuW8vTRhJ7B3Hu",
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      },
    );
    return response.json();
  } catch (e) {
    console.log(e);
  }
}

const songsNext = getSongsNext();

songsNext.then((data) => {
  console.log(data.tracks);
  data.tracks.forEach((item) => {
    console.log(item);
    $next.insertAdjacentHTML(
      'beforeend',
      `
      <div class="mix">
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
  const token = await getToken();
  try {
    const response = await fetch(
      "https://api.spotify.com/v1/albums?ids=1xh6IrXOzHT1Y7anMOzdiz,3m6zmxm0tQNLUTBFB5PJTR,1hNThSGNjabAId8CnNuI4L",
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      },
    );
    return response.json();
  } catch (e) {
    console.log(e);
  }   
}

const albumsNext = getAlbumsNext();

albumsNext.then((data) => {
  console.log(data.albums);
  data.albums.forEach((item) => {
    console.log(item);
    $next.insertAdjacentHTML(
      'beforeend',
      `
      <div class="mix">
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