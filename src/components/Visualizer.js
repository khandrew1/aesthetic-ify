import React from 'react';
import soundFile from './music/testSong.mp3';
import { Button } from '@mui/material'
import { useRef, useEffect, useState } from 'react';

const Visualizer = () => {

    const audio1 = new Audio(soundFile);

    const playSong = () => {
        if (audio1.paused) {
            audio1.play();
        } else {
            audio1.pause();
        }
    }

    const canvasRef = useRef(null);
    const contextRef = useRef(null);

    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    let audioSource = null;
    let analyser = null;

    audioSource = audioCtx.createMediaElementSource(audio1);
    analyser = audioCtx.createAnalyser();
    audioSource.connect(analyser);
    analyser.connect(audioCtx.destination);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        analyser.fftSize = 128;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        const barWidth = canvas.width / bufferLength;

        let x = 0;
        let barHeight = 0;
        function animate() {
            x = 0;
            context.clearRect(0, 0, canvas.width, canvas.height);
            analyser.getByteFrequencyData(dataArray);
            for (let i = 0; i < bufferLength; i++) {
                barHeight = dataArray[i];
                context.fillStyle = "black";
                context.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
                x += barWidth;
            }

            requestAnimationFrame(animate);
        }

        animate();

    });

    return (
        <>
            <Button onClick={playSong} variant="contained">Play</Button>
            <canvas ref={canvasRef} />
        </>
    );
}

export default Visualizer