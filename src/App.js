import Visualizer from './components/Visualizer.js'
import SpotifyAuth from './components/SpotifyAuth.js'
import SpotifyGetTrack from './components/SpotifyGetTrack.js';
import Login from './Login.js';
import { useState } from 'react';
import { Grid } from '@mui/material';
import SpotifyWebPlayback from './components/SpotifyWebPlayback.js';
import './App.css';

function App() {

  const [ token, setToken ] = useState("");

  return (
    <>
    {token ? 
    <>
    <Grid container direction="column" justifyContent="center" alignItems="center">
      <SpotifyGetTrack token={token} setToken={setToken} />
    </Grid>
    <SpotifyAuth token={token} setToken={setToken} />
    </>
    : 
    <>
      <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '100vh' }}
      >
          <h1><i>aesthetic-ify</i></h1>

          <Grid item xs={3}> 
              <SpotifyAuth token={token} setToken={setToken} />
          </Grid>
      
      </Grid>
    </>}
    </> 
  );
}

export default App;
