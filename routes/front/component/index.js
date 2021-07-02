const {
  Router
} = require('express');
const router = Router();
const thumb = require("./thumb")
router.use("/thumb", thumb)


module.exports = router;