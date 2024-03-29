const passport = require('passport');
const {
  isLoggedIn,
  isNotLoggedIn
} = require("../../middlewares/islogin")
const {
  Router
} = require('express');
const router = Router();
const ctrl = require("./auth.ctrl")


// Login
router.get("/login.html", isNotLoggedIn, (req, res) => {
  res.render("auth/login.html")
})

router.post('/login.html', isNotLoggedIn, passport.authenticate("local", {
  successRedirect: '/',
  failureRedirect: '/auth/login.html',
  failureFlash: true
}))

// Logout
router.get("/logout.html", isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect("/")
})


// Join
router.get("/join.html", isNotLoggedIn, (req, res) => {
  res.render("auth/join.html")
})
router.post("/join.html", ctrl.post_join)

module.exports = router;