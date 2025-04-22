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

// ... (Your weather data fetching logic here)
// Example:
const fetchWeather = async () => {
    // Replace with your weather API call and data parsing
    const weatherData = { temperature: 25, condition: 'Sunny' };
    return weatherData;
}

io.on('connection', (socket) => {
    console.log('Client connected');

    const sendWeather = async () => {
        try {
            const weather = await fetchWeather();
            socket.emit('weatherUpdate', weather); // Send weather data to the client
        } catch (error) {
            console.error('Error fetching weather:', error);
        }
    }

    // Send initial weather data when a client connects
    sendWeather();

    // Periodically send weather updates (e.g., every 10 seconds)
    setInterval(sendWeather, 10000);

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
