const passport = require('passport');
const {
  isLoggedIn,
  isNotLoggedIn
} = require("../middlewares/islogin")
const {
  Router
} = require('express');
const router = Router();
const ctrl = require("./auth.ctrl")


//로그인
router.get("/login.html", isNotLoggedIn, (req, res) => {
  res.render("auth/login.html")
})

router.post('/login.html', isNotLoggedIn, passport.authenticate("local", {
  successRedirect: '/',
  failureRedirect: '/auth/login.html',
  failureFlash: true
}))

//로그아웃
router.get("/logout.html", isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect("/")
})


//회원가입
router.get("/join.html", isNotLoggedIn, (req, res) => {
  res.render("auth/join.html")
})

router.post("/join.html", ctrl.post_join)

module.exports = router;