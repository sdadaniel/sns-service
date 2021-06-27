const axios = require("axios");
const dateFormat = require("dateformat")

exports.get_post = async (req, res) => {
  const url = process.env.API_ROOT + "/post/read/" + req.user.idNumber
  const contents = await axios.get(url)
  contents.data.map(item => {
    item.updatedAt = dateFormat(Date.parse(item.updatedAt), "fullDate")
    item.createdAt = dateFormat(Date.parse(item.createdAt), "fullDate")
  })
  res.render("member/post.html", {
    contents: contents.data
  })
}
exports.post_post = async (req, res, next) => {
  const data = {
    category: req.body.category,
    title: req.body.title,
    description: req.body.description,
    id: req.user.id,
    idNumber: req.user.idNumber
  }
  try {
    var url = process.env.API_ROOT + "/post/write"
    await axios({
      method: "post",
      url,
      data
    }).then(() => {
      res.redirect("/member/post.html")
    })
  } catch (e) {
    next(e)
  }
}

exports.post_mypage_edit = async (req, res, next) => {
  const url = process.env.API_ROOT + "/user/edit"
  const data = {
    id: req.user.id,
    email: req.body.email,
    address: req.body.address,
  }
  if (req.file) {
    data.thumbnail = req.file.destination.replace("uploads", "img") + req.file.filename;
  }

  try {
    const result = await axios({
      url,
      data,
      method: "post"
    })


    res.redirect("/member/mypage.html")
  } catch (e) {
    next(e)
  }
}