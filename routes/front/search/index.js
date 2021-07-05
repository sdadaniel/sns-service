const {
  Router
} = require('express');
const router = Router();

const {
  fn_pagenation,fn_dateFormat
} = require("../../middlewares/fn")

router.get("/", async (req, res) => {

  //option for pagenation
  const page_option = {
    req,
    page: 1,
    pagingSize: 10,
    index_unit: 10,
    dataURL: process.env.API_ROOT + "/post/search/" + encodeURIComponent(req.query.keyword),
    countURL: process.env.API_ROOT + "/post/search/count/" + encodeURIComponent(req.query.keyword),
    dateFormat: "fullDate"
  }
  var {
    pagenation,
    contents,
  } = await fn_pagenation(page_option)

  contents = fn_dateFormat(contents, "fullDate")

  res.render("search/index.html", {
    contents,
    pagenation,
  })

})

module.exports = router;