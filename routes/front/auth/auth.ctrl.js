const bcrypt = require("bcryptjs")
const db = require("../../../models")
const axios = require("axios")
exports.post_join = async (req, res, next) => {
  const {
    id,
    password,
    password_check,
    email,
    name,
    address
  } = req.body;

  
  // check Id duplicate
  var api_path = req.headers.origin + "/api/user/id"
  const check_id = await axios.get(api_path + "/" + id);

  if (check_id.data) {
    return res.redirect("/auth/join.html?error=이미 있는 아이디입니다.")
  }



  // check email
  var api_path = req.headers.origin + "/api/user/email"
  const check_email = await axios.get(api_path + "/" + email);
  if (check_email.data) {
    return res.redirect("/auth/join.html?error=이미 존재하는 이메일입니다.")
  }


  // check password
  if (password == "") {
    return res.redirect("/auth/join.html?error=비밀번호를 입력해주세요.")
  }


  if (password_check != password) {
    return res.redirect("/auth/join.html?error=비밀번호가 일치하지 않습니다.")
  }


  // create User
  try {
    var api_path = req.headers.origin + "/api/user/create";
    const hashedPassword = await bcrypt.hash(password, 10);
    const data = {
      id,
      password: hashedPassword,
      email,
      name,
      address
    }

    await axios({
      url: api_path,
      method: 'post',
      data
    }).then(res.render("auth/join_result", {
      id
    }))
  } catch (e) {
    next(e)
  }
}

//로그인
exports.post_login = async (req, res) => {

  res.send(req.body)
}