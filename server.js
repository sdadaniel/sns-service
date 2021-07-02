const app = require('./app.js');

app.set("PORT", 3000);

webSocket = require("./socket")
const server = app.listen(app.get("PORT"), function () {
  console.log('Express listening on port', app.get("PORT"));
});
webSocket(server)