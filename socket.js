const SocketIO = require("socket.io")

module.exports = (server) => {
  const io = SocketIO(server, {
    path: "/socket.io"
  })

  io.on("connection", (socket) => {
    console.log("client Connected")
  })

}