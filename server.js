const app = require('./app.js');

app.set("PORT", 80);

app.listen(app.get("PORT"), function () {
  console.log('Express listening on port', app.get("PORT"));
});
