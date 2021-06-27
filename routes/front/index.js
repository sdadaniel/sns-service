const {
  Router
} = require('express');
const router = Router();
const ctrl = require("./ctrl")
const {
  isLoggedIn,
  isNotLoggedIn
} = require("../middlewares/islogin")

const member = require('./member')
router.use("/member", isLoggedIn, member)
router.get("/", ctrl.get)

module.exports = router;