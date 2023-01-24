import SpotifyAuth from "./components/SpotifyAuth.js";
import SpotifyGetTrack from "./components/SpotifyGetTrack.js";
import { useState } from "react";
import { Typography, Box } from "@mui/material";
import Visualizer from "./components/Visualizer.js";
import "./App.css";

function App() {
  const [token, setToken] = useState("");

  return (
    <>
      {token ? (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "90vh",
              flexDirection: "column",
            }}
          >
            <Visualizer
              height={window.innerHeight / 4}
              width={window.innerWidth / 2}
            />
            <SpotifyGetTrack token={token} setToken={setToken} />
          </Box>

          <Box sx={{ position: "absolute", bottom: 0 }}>
            <SpotifyAuth token={token} setToken={setToken} />
          </Box>
        </>
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "100vh",
              flexDirection: "column",
            }}
          >
            <Typography sx={{ fontStyle: "italic", p: 1 }} variant="h4">
              aesthetic-ify
            </Typography>
            <SpotifyAuth token={token} setToken={setToken} />
          </Box>
        </>
      )}
    </>
  );
}

export default App;
