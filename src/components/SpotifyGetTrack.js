import React from 'react';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material'
import axios from 'axios';

const SpotifyGetTrack = () => {

    const [ currentTrack, setCurrentTrack ] = useState("");
    const [ currentArtist, setCurrentArtist ] = useState("");

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
        }, 2000);

        return () => {
            clearInterval(interval);
        }
    });

    const logCurrentArtist = () => {
        console.log(currentArtist);
    }

    return (
        <>
            <h1>{currentTrack} - {currentArtist}</h1>
        </>
    )
}

export default SpotifyGetTrack;