const express = require("express");
const app = express();
const http = require("http");

const server = http.createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    transports: ["websocket"],
  },
  allowEIO3: true,
});

app.get("/", (req, res) => {
  res.send("Express on Vercel");
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("cursorMove", (data) => {
    // console.log("Cursor moved:", data);
    // Broadcast cursor position to all clients except the sender
    socket.broadcast.emit("otherCursors", data);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
