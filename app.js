import express from "express";
const app = express();
const port = 3000;
import { readFileSync } from "fs";

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  // const user = readFileSync("data/user.json", "utf-8");
  // const data = JSON.parse(user);
  res.render("index", {
    nama: "Neoline",
    data,
  });
});

app.get("/playlist", (req, res) => {
  // const data = readFileSync("data/playlists/playlist.json", "utf-8");
  // const playlist = JSON.parse(data);
  res.render("playlist", {
    playlist,
  });
});

app.get("/playlist_detail/:id", (req, res) => {
  const data = readFileSync("data/playlists/playlist.json", "utf-8");
  const id = req.params.id;
  const playlist = JSON.parse(data);
  const playlist_detail = playlist.find((item) => item.id === id);

  // Get tracks from playlist name
  const tracks = readFileSync("data/tracks/" + playlist_detail.name + ".json", "utf-8");
  const tracks_detail = JSON.parse(tracks);

  res.render("playlist_detail", {
    playlist_detail,
    tracks_detail,
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
