import React from 'react'
import { Grid } from '@mui/material'
import SpotifyAuth from './components/SpotifyAuth.js'

const Login = () => {
  return (
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
        <SpotifyAuth />
    </Grid>   
   
</Grid> 
  )
}

export default Login