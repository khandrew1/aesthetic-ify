import React from "react";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import axios from "axios";
// import "../App.css";

const SpotifyGetTrack = (props) => {
  const [currentTrack, setCurrentTrack] = useState(""); // used to store the name of the current track
  const [currentArtist, setCurrentArtist] = useState([{}]); // used to store the name of the current artist
  const [currentAlbum, setCurrentAlbum] = useState(""); // used to store the URL to the current album art

  let token = window.localStorage.getItem("token");

  useEffect(() => {
    let interval = setInterval(async () => {
      // interval in order to continuously make API calls to keep page up to date
      const { data } = await axios.get(
        "https://api.spotify.com/v1/me/player/currently-playing", // gets currently playing track from the Spotify API
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCurrentTrack(data.item.name); // sets the current track to the name
      setCurrentArtist(data.item.artists); // sets the name of the artists
      setCurrentAlbum(data.item.album.images[1].url); // sets the album to the 300x300 album art
    }, 500);

    return () => {
      clearInterval(interval); // clears interval for efficiency
    };
  });

  /* used for testing purposes */
  const logCurrentArtist = () => {
    console.log(currentArtist);
  };

  const artistNames = currentArtist.map((artist, idx) =>
    idx < currentArtist.length - 1 ? <>{artist.name}, </> : <>{artist.name}</>
  );

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <img
          src={currentAlbum}
          style={{ height: 256, width: 256 }}
          alt="loading..."
        />
        <Box sx={{ flexDirection: "column", alignSelf: "center", pl: 2 }}>
          <Box>{currentTrack}</Box>
          <Box>{artistNames}</Box>
        </Box>
      </Box>
    </>
  );
};

export default SpotifyGetTrack;
