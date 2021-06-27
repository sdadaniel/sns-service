const {
  Router
} = require('express');
const router = Router();

const api = require("./api")
const auth = require("./auth")
const front = require("./front")
const test = require("./test")

router.use((req, res, next) => {
  res.locals.user = req.user;
  next();
})
router.use("/test", test)
router.use("/api", api)
router.use("/auth", auth)
router.use('/', front);



module.exports = router;