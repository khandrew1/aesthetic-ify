import SpotifyAuth from './components/SpotifyAuth.js'
import SpotifyGetTrack from './components/SpotifyGetTrack.js';
import { useState } from 'react';
import { Grid } from '@mui/material';
import SpotifyWebPlayback from './components/SpotifyWebPlayback.js';
import Visualizer from './components/Visualizer.js';
import './App.css';

function App() {

  const [ token, setToken ] = useState("");

  return (
    <>
    {token ? 
    <>
    <div style={{margin: 'auto', width: '50%', paddingTop: '8%'}}>
      <Visualizer height={window.innerHeight/4} width={window.innerWidth/2}/>
    </div>
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
