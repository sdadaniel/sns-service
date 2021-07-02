const SocketIO = require("socket.io")

module.exports = (server) => {
  const io = SocketIO(server, {
    path: "/socket.io"
  })

  io.on("connection", (socket) => {
    console.log("클라이언트 접속")
  })

}