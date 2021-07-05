const {
  Router
} = require('express');
const router = Router();

const api = require("./api")
const front = require("./front")

router.use((req, res, next) => {
  res.locals.user = req.user;
  next();
})

router.use("/api", api)
router.use('/', front);

module.exports = router;