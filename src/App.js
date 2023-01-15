import Visualizer from './components/Visualizer.js'
import SpotifyAuth from './components/SpotifyAuth.js'
import SpotifyGetArtist from './components/SpotifyGetArtist.js';
import SpotifyGetTrack from './components/SpotifyGetTrack.js';
import SpotifyWebPlayback from './components/SpotifyWebPlayback.js';
import './App.css';

function App() {

  let token = window.localStorage.getItem("token");

  const logAudioDevices = () => {
    console.log(navigator.mediaDevices.enumerateDevices());
  }

  // return (
  //   <>
  //   {logAudioDevices()}
  //   <SpotifyAuth />
  //   <SpotifyGetArtist />
  //   <SpotifyGetTrack />
  //   <Visualizer />
  //   </>
  // );

  return (
    <>
    <Visualizer />
    </>
  );
}

export default App;
