import React from 'react'
import App from './App.js'
import { Grid } from '@mui/material'
import { useState } from 'react';
import SpotifyAuth from './components/SpotifyAuth.js'

const Login = () => {

    const [ token, setToken ] = useState("");

    return (
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
    </>
    )
}

export default Login