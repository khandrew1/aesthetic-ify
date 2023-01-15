
import React from 'react';
import soundFile from './music/are you sleeping alone again_.mp3';
import { Button } from '@mui/material'
import { useRef, useEffect } from 'react';

const Visualizer = () => {

    const canvasRef = useRef(null);
    const contextRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        let analyser;
        let bufferLength;
        let dataArray;
        let barWidth;
        let x = 0;
        let barHeight = 0;

        function handleError(err) {
            console.log('You must give access to your mic in order to proceed');
        }

        async function getAudio() {
            let stream = await navigator.mediaDevices
            .getUserMedia({ audio: true })
            .catch(handleError);

            const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            analyser = audioCtx.createAnalyser();
            const source = audioCtx.createMediaStreamSource(stream);
            source.connect(analyser);
            console.log("analyser: " + analyser);
            analyser.fftSize = 128;
            bufferLength = analyser.frequencyBinCount;
            dataArray = new Uint8Array(bufferLength);
            barWidth = canvas.width / 2 / bufferLength;
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

            animate();
        }

        getAudio();

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

    });

    return (
        <>
            <canvas ref={canvasRef} />
        </>
    );
}

export default Visualizer