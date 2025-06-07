const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const socketHandlers = require("./socketHandlers");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log(`🧠 Client connected: ${socket.id}`);
  socketHandlers(io, socket); // ✅ this now works
});

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
