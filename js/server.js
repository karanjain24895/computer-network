const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
const fetchWeather = async () => {
    const weatherData = { temperature: 25, condition: 'Sunny' };
    return weatherData;
}

io.on('connection', (socket) => {
    console.log('Client connected');

    const sendWeather = async () => {
        try {
            const weather = await fetchWeather();
            socket.emit('weatherUpdate', weather); 
        } catch (error) {
            console.error('Error fetching weather:', error);
        }
    }

    
    sendWeather();

    setInterval(sendWeather, 10000);

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
