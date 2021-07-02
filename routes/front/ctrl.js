

const {
  fn_pagenation,fn_dateFormat
} = require("../middlewares/fn");


exports.get = async (req, res, next) => {
  const page_option = {
    req,
    page: 1,
    pagingSize: 10,
    index_unit: 10,
    dataURL: process.env.API_ROOT + "/post",
    countURL: process.env.API_ROOT + "/post/count",
  }

  var {
    pagenation,
    contents,
  } = await fn_pagenation(page_option)

  contents = fn_dateFormat(contents,"fullDate")

  res.render("index.html", {
    contents,
    pagenation,
  })
}