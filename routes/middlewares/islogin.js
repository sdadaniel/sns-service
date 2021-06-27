exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next()
  } else {
    res.redirect("/")
    // res.status(403).send("로그인이 필요합니다.");
  }
}

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next()
  } else {
    // const message = encodeURIComponent("이미 로그인이 ㄷ");
    // res.redirect(`/?error=${message}`)
    res.redirect("/")
  }
}

