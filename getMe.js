import SpotifyWebApi from "spotify-web-api-node";
import fs from "fs";

const accessToken = "INSERT YOUR ACCESS TOKEN HERE";

const spotifyAPI = new SpotifyWebApi();
spotifyAPI.setAccessToken(accessToken);

// Get User Profile
function getMyData() {
  (async () => {
    const me = await spotifyAPI.getMe();
    // console.log(me.body.id);
    getMyProfiles();
    getUserPlaylists(me.body.id);
  })().catch((e) => {
    console.error(e);
  });
}

async function getMyProfiles() {
  const data = await spotifyAPI.getMe();
  // console.log(data.body);
  fs.writeFileSync("data/user.json", data.body);
}

// Get User Playlist
async function getUserPlaylists(userName) {
  const data = await spotifyAPI.getUserPlaylists(userName);

  // spotifyAPI.getUserPlaylists(userName).then(
  //   (data) => {
  //     let playlist = JSON.stringify(data.body.items);

  //     fs.writeFileSync("data/playlists/playlist.json", playlist);
  //   },
  //   (err) => {
  //     console.log("Error occured", err);
  //   }
  // );

  // let playlists = [];

  for (let playlist of data.body.items) {
    console.log(playlist.id + " : " + playlist.name);

    let tracks = await getPlaylistTracks(playlist.id, playlist.name);
    console.log(tracks);

    const tracksJSON = { tracks };
    let data = JSON.stringify(tracksJSON);
    // fs.writeFileSync("data/tracks/" + playlist.name + ".json", data);
  }
}

// Get User Playlist Tracks
async function getPlaylistTracks(playlistId, playlistName) {
  const data = await spotifyAPI.getPlaylistTracks(playlistId, {
    offset: 1,
    limit: 100,
    fields: "items,track,album(!external_urls,images)",
  });

  let tracks = [];

  for (let track_obj of data.body.items) {
    const track = track_obj.track;
    tracks.push(track);
    console.log(track.name + " : " + track);
  }

  return tracks;
}

getMyData();
