const express = require("express")
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
const server = require("http").createServer(app);
const gamesController = require("./controllers/games")
app.use('/games', gamesController)


const io = require("socket.io")(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });
io.on('connection', socket => {

    socket.join('room1');
    io.to("room1").emit('admin-message', `${socket.id} has joined`)

    socket.on('new-message', ({ username, message }) => {
        io.in("room1").emit('incoming-message', { username, message });
    })

    // *************************************************************************************
    // HANDLE USER ENTERS ROOM

    socket.on("disconnect", () => {
        console.log(`${socket.id} ${socket.handshake.address} disconnected`);
        io.to("room1").emit('admin-message', `${socket.id} has left`)
    });
});

module.exports = server