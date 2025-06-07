const rooms = {};

function socketHandlers(io, socket) {
  console.log(`🧠 Client connected: ${socket.id}`);

  socket.on("create-room", (roomCode) => {
    rooms[roomCode] = [];
    socket.join(roomCode);
    console.log(`Room created: ${roomCode}`);
  });

  socket.on("join-room", ({ roomCode, name }) => {
    if (!rooms[roomCode]) return;

    const player = { id: socket.id, name };
    rooms[roomCode].push(player);
    socket.join(roomCode);
    io.to(roomCode).emit("player-list-updated", rooms[roomCode]);

    console.log(`${name} joined room ${roomCode}`);
  });

  socket.on("get-players", (roomCode) => {
    if (rooms[roomCode]) {
      socket.emit("player-list-updated", rooms[roomCode]);
    }
  });

  socket.on("disconnect", () => {
    for (const roomCode in rooms) {
      rooms[roomCode] = rooms[roomCode].filter((p) => p.id !== socket.id);
      io.to(roomCode).emit("player-list-updated", rooms[roomCode]);
    }
    console.log(`💨 Disconnected: ${socket.id}`);
  });
}

module.exports = socketHandlers;
