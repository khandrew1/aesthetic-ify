import React from 'react'
import { useEffect, useState } from 'react';
import { Button } from '@mui/material'
import axios from 'axios';

const SpotifyAuth = () => {
    const CLIENT_ID = "ffcdeee6fca447a897b48405c63d2761"; // Client ID grabbed from Spotify Developer Dashboard
    const REDIRECT_URI = "http://localhost:3000"; // Redirects to local server
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"; // Directs user to authorize their Spotify account for use
    const RESPONSE_TYPE = "token";
  
    const [ token, setToken ] = useState(""); // token state to check if user is logged in

    const [ searchKey, setSearchKey ] = useState("");
    const [ artists, setArtists ] = useState([]);
  
    useEffect(() => {
      const hash = window.location.hash;
      let token = window.localStorage.getItem("token");
  
      if (!token && hash) { // checks if we have no token but a hash
        token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1] // finds the token in the hash
  
        window.location.hash = ""; // resets link
        window.localStorage.setItem("token", token); // saves token to local storage
      }
  
      setToken(token); // sets the token state to true
  
    }, []);
  
    const logout = (() => {
      setToken(""); // resets token for logout
      window.localStorage.removeItem("token"); // removes token from local storage
    });
    
    const searchArtists = (async (e) => {
        e.preventDefault();
        const {data} = await axios.get("https://api.spotify.com/v1/search",
            {headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                q: searchKey,
                type: "artist"
            }
        });
        setArtists(data.artists.items);
    });

    const renderArtists = () => {
        return artists.map(artist => (
            <div key={artist.id}>
                {artist.images.length ? <img width={"100%"} src={artist.images[0].url} alt=""/> : <div>No Image</div>}
                {artist.name}
            </div>
        ))
    }

  return (
    <>
        {!token ? 
            <Button variant="contained" href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=user-read-currently-playing`}>Login to Spotify</Button> 
            : <Button onClick={logout} variant="contained">Logout</Button>}
    </>
  );
}

export default SpotifyAuth