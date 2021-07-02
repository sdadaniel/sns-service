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
const user = require("./user")
const search = require("./search")
const post = require("./post")
const component = require("./component")

router.use("/member", isLoggedIn, member)
router.use("/user", user)
router.use("/post", post)
router.use("/search", search)
router.use("/component",component)
router.get("/", ctrl.get)


module.exports = router;