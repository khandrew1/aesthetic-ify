import React from 'react';
import { useEffect, useState } from 'react';
import { Grid, Box } from '@mui/material'
import axios from 'axios';
import Visualizer from './Visualizer.js';
import '../App.css';

const SpotifyGetTrack = (props) => {

    const [ currentTrack, setCurrentTrack ] = useState("");
    const [ currentArtist, setCurrentArtist ] = useState("");
    const [ currentAlbum, setCurrentAlbum ] = useState("");

    let token = window.localStorage.getItem("token");

    useEffect(() => {
        let interval = setInterval( async () => {
            const {data} = await axios.get("https://api.spotify.com/v1/me/player/currently-playing",
                {headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setCurrentTrack(data.item.name);
            setCurrentArtist(data.item.artists[0].name);
            setCurrentAlbum(data.item.album.images[1].url);
        }, 1000);

        return () => {
            clearInterval(interval);
        }
    });

    const logCurrentArtist = () => {
        console.log(currentArtist);
    }

    return (
        <>
        <div style={{margin: 'auto', width: '50%', paddingTop: '8%'}}>
            <Visualizer height={window.innerHeight/4} width={window.innerWidth/2}/>
        </div>
            <Grid container justifyContent="center" 
                alignItems="center" rowSpacing={3}>

                    <Grid item xs={2}>
                        <img src={currentAlbum} style= {{height: 256, width: 256}}/>
                    </Grid>

                    <Grid>
                        <h1>{currentTrack}</h1>
                        <h2>{currentArtist}</h2>
                    </Grid>

                </Grid>
        </>
    )

    //{props.token ? <h1>{currentTrack} - {currentArtist}</h1> : <h1>Please login</h1>}
}

export default SpotifyGetTrack;