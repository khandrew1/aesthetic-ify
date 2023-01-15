import React from 'react';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material'
import axios from 'axios';

const SpotifyGetArtist = () => {

    const [ currentTrack, setCurrentTrack ] = useState("");

    let token = window.localStorage.getItem("token");

    const getTrack = async () => {
        const {data} = await axios.get("https://api.spotify.com/v1/me/player/currently-playing",
            {headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setCurrentTrack(data);
    }

    const logCurrentArtist = () => {
        getTrack();
        console.log(currentTrack.item.artists[0].name);
    }

    return (
        <>
            <Button onClick={logCurrentArtist} variant="contained">Get Artist</Button>
        </>
    )
}

export default SpotifyGetArtist