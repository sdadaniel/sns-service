const app = require('./app.js');

app.set("PORT", process.env.PORT || 7000);

app.listen(app.get("PORT"), function () {
  console.log('Express listening on port', app.get("PORT"));
});