import Visualizer from './components/Visualizer.js'
import SpotifyAuth from './components/SpotifyAuth.js'
import SpotifyGetTrack from './components/SpotifyGetTrack.js';
import { Grid } from '@mui/material';
import SpotifyWebPlayback from './components/SpotifyWebPlayback.js';
import './App.css';

function App() {

  let token = window.localStorage.getItem("token");

  return (
    <>
    <Visualizer />
    <Grid container direction="column" justifyContent="center" alignItems="center">
      <SpotifyGetTrack />
      <SpotifyAuth />
    </Grid> 
    </> 
  );
}

export default App;
