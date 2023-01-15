import Visualizer from './components/Visualizer.js'
import SpotifyAuth from './components/SpotifyAuth.js'
import SpotifyGetArtist from './components/SpotifyGetArtist.js';
import SpotifyGetTrack from './components/SpotifyGetTrack.js';
import './App.css';

function App() {

  return (
    <>
    <SpotifyAuth />
    <SpotifyGetArtist />
    <SpotifyGetTrack />
    </>
  );
}

export default App;
