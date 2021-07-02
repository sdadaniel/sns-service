const axios = require("axios");
const dateFormat = require("dateformat");


const {
  fn_dateFormat
} = require("../../middlewares/fn")

exports.get_post = async (req, res) => {

  //get all postList
  var url = process.env.API_ROOT + "/post/list/" + req.user.idNumber
  const list = (await axios.get(url)).data
  var post_list = {};
  list.map(elem => {
    let category = elem.category.toLocaleLowerCase()
    if (post_list[category] == undefined) {
      post_list[category] = [elem]
    } else {
      post_list[category].push(elem)
    }
  })

  //get all post
  var url = process.env.API_ROOT + "/post/read/" + req.user.idNumber
  const contents = await axios.get(url)
  contents.data.map(item => {
    item.updatedAt = dateFormat(Date.parse(item.updatedAt), "fullDate")
    item.createdAt = dateFormat(Date.parse(item.createdAt), "fullDate")
  })

  res.render("member/post.html", {
    contents: contents.data,
    post_list
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


exports.get_detail = async (req, res, next) => {
  //get all postList
  var url = process.env.API_ROOT + "/post/list/" + req.user.idNumber
  const list = (await axios.get(url)).data
  var post_list = {};
  list.map(elem => {
    let category = elem.category.toLocaleLowerCase()
    if (post_list[category] == undefined) {
      post_list[category] = [elem]
    } else {
      post_list[category].push(elem)
    }
  })

  //get product data

  var url = process.env.API_ROOT + `/post/detail?id=${req.params.idNumber}`
  const content = fn_dateFormat([(await axios.get(url)).data])

  res.render("member/post_detail.html", {
    content: content[0],
    post_list
  })

}


exports.get_write = async (req, res) => {
  //get all postList
  var url = process.env.API_ROOT + "/post/list/" + req.user.idNumber
  const list = (await axios.get(url)).data
  var post_list = {};
  list.map(elem => {
    let category = elem.category.toLocaleLowerCase()
    if (post_list[category] == undefined) {
      post_list[category] = [elem]
    } else {
      post_list[category].push(elem)
    }
  })

  res.render("member/post_write.html", {
    post_list
  })
}

exports.post_mypage_edit = async (req, res, next) => {
  const url = process.env.API_ROOT + "/user/edit"
  const data = {
    id: req.user.id,
    email: req.body.email,
    address: req.body.address,
  }

  if (req.file) {
    data.thumbnail = "/" + req.file.destination.replace("uploads", "img") + "/" + req.file.filename;
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