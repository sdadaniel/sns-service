const {
  Router
} = require('express');
const router = Router();
const nunjucks = require("nunjucks")

router.get("/", (req, res) => {
  
  // var template = nunjucks.compile("/test/index.html")
  // const a = template.render()
  var template = nunjucks.render("test/index.html")
  res.send(template)
})





module.exports = router;