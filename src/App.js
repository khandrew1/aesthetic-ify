import Visualizer from './components/Visualizer.js'
import SpotifyAuth from './components/SpotifyAuth.js'
import SpotifyGetTrack from './components/SpotifyGetTrack.js';
import { useState } from 'react';
import { Grid } from '@mui/material';
import SpotifyWebPlayback from './components/SpotifyWebPlayback.js';
import './App.css';

function App() {

  const [ token, setToken ] = useState("");

  return (
    <>
    <Visualizer />
    <Grid container direction="column" justifyContent="center" alignItems="center">
      <SpotifyGetTrack token={token} setToken={setToken} />
      <SpotifyAuth token={token} setToken={setToken} />
    </Grid> 
    </> 
  );
}

export default App;
