const authSocket = require("./middleware/authSocket");
const newConnectionHandler = require("./sockerHandlers/newConnectionHandler");

const registerSockerServer = (server) => {
  const io = require("socket.io")(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.use((socket, next) => {
    authSocket(socket, next);
  });

  io.on("connection", (socket) => {
    console.log("user conne", socket.id);

    newConnectionHandler(socket, io);
  });
};

module.exports = {
  registerSockerServer,
};