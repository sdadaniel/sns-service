const {
  Router
} = require('express');
const router = Router();
const axios = require("axios")
const {
  fn_dateFormat
} = require("../../middlewares/fn");



router.use("/detail", async (req, res, next) => {

  let url = process.env.API_ROOT + `/post/detail?id=${req.query.id}`
  await axios.get(url)
    .then(result => {
      const content = fn_dateFormat([result.data])
      res.render("post/detail.html", {
        content:content[0]
      })
    })
    .catch(e => {
      next(e)
    })




})

module.exports = router;