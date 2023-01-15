import React from 'react'
import { useState } from 'react';
import { Button } from '@mui/material'
import axios from 'axios';

const SpotifyGetTrack = () => {

    let token = window.localStorage.getItem("token");

    const [ currentTrack, setCurrentTrack ] = useState("");

    const getTrack = async () => {
        const {data} = await axios.get("https://api.spotify.com/v1/me/player/currently-playing",
            {headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setCurrentTrack(data);
    }

    const logCurrentTrack = () => {
        getTrack();
        console.log(currentTrack.item.name);
    }


    return (
        <>
            <Button onClick={logCurrentTrack} variant="contained">Get Track</Button>
        </>
    )
}

export default SpotifyGetTrack