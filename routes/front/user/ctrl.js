const axios = require("axios")
const db = require("../../../models")

exports.get_profile = async (req, res) => {
  // 사용자 정보 조회
  var url = process.env.API_ROOT + "/user/idnumber/" + req.query.id
  const result = await axios.get(url)
  if (req.user !== undefined) {
    if (req.query.id == req.user.idNumber) {
      // 본인 프로필 조회
      return res.redirect("/member/mypage.html")
    } else {
      // 타 유저 프로필 조회
      const follow = req.user.Followings.find(elem => elem.idNumber == req.query.id)
      follow && (isFollowing = true) || (isFollowing = false)

      res.render("user/profile.html", {
        profile: result.data[0],
        isFollowing
      })
    }
  } else {
    // 비회원
    res.render("user/profile.html", {
      profile: result.data[0],
    })
  }
}

exports.get_profile_follow = async (req, res, next) => {
  const user = req.query.user;
  const profile = req.query.profile
  if (user.length == 0) {
    return res.redirect("/auth/login.html?error=로그인이 필요합니다.")
  } else {
    var url = process.env.API_ROOT + "/user/follower/"
    var data = {
      user,
      profile
    }
    await axios({
      url,
      data,
      method: "post"
    }).then(() => {
      res.redirect(req.headers.referer);
    }).catch(e => {
      next(e)
    })
  }
}

exports.get_profile_unfollow = async (req, res, next) => {
  const user = req.query.user;
  const profile = req.query.profile
  console.log("bbb")
  var url = process.env.API_ROOT + "/user/unfollower/"
  var data = {
    user,
    profile
  }
  await axios({
    url,
    data,
    method: "post"
  }).then((result) => {

    res.redirect(req.headers.referer);

  }).catch(e => {
    next(e)
  })
}