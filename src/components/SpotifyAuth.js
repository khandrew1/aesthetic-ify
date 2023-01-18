import React from "react";
import { useEffect } from "react";
import { Button } from "@mui/material";

const SpotifyAuth = (props) => {
  const CLIENT_ID = "ffcdeee6fca447a897b48405c63d2761"; // Client ID grabbed from Spotify Developer Dashboard
  const REDIRECT_URI = "http://localhost:3000"; // Redirects to local server
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"; // Directs user to authorize their Spotify account for use
  const RESPONSE_TYPE = "token";

  // token is grabbed from parent

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      // checks if we have no token but a hash
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1]; // finds the token in the hash

      window.location.hash = ""; // resets link
      window.localStorage.setItem("token", token); // saves token to local storage
    }

    props.setToken(token); // sets the token state to true
  }, []);

  const logout = () => {
    props.setToken(""); // resets token for logout
    window.localStorage.removeItem("token"); // removes token from local storage
  };

  return (
    <>
      {!props.token ? (
        <Button
          variant="contained"
          href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=user-read-currently-playing streaming user-read-email user-read-private`}
        >
          Login to Spotify
        </Button>
      ) : (
        <Button
          onClick={logout}
          variant="outlined"
          style={{ position: "absolute", bottom: 0 }}
        >
          Log out
        </Button>
      )}
    </>
  );
};

export default SpotifyAuth;
