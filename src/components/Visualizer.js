import React from 'react';
import soundFile from './music/testSong.mp3';
import { Button } from '@mui/material'
import { useRef, useEffect } from 'react';

const Visualizer = () => {

    const audio1 = new Audio(soundFile);

    const canvasRef = useRef(null);
    const contextRef = useRef(null);

    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    let audioSource = null;
    let analyser = null;

    const playSong = () => {
        if (audio1.paused) {
            audioCtx.resume();
            audio1.play();
        } else {
            audio1.pause();
        }
    }

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
        const barWidth = canvas.width / 2 / bufferLength;

        let x = 0;
        let barHeight = 0;
        function animate() {
            x = 0;
            context.clearRect(0, 0, canvas.width, canvas.height);
            analyser.getByteFrequencyData(dataArray);
            drawVisualizer({
                bufferLength,
                dataArray,
                barWidth
            })
            requestAnimationFrame(animate);
        }

        const drawVisualizer = ({
            bufferLength,
            dataArray,
            barWidth
        }) => {
            let barHeight;   
            for (let i = 0; i < bufferLength; i++) {
                barHeight = dataArray[i];
                const red = (i * barHeight) / 10;
                const green = (i * 4);
                const blue = barHeight / 4 - 12;
                context.fillStyle = `rgb(${red}, ${green}, ${blue})`;
                context.fillRect(
                    canvas.width / 2 - x,
                    canvas.height - barHeight,
                    barWidth,
                    barHeight
                );
                x += barWidth;
            }

            for (let i = 0; i < bufferLength; i++) {
                barHeight = dataArray[i];
                const red = (i * barHeight) / 10;
                const green = (i * 4);
                const blue = barHeight / 4 - 12;
                context.fillStyle = `rgb(${red}, ${green}, ${blue})`;
                context.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
                x += barWidth;
            }
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