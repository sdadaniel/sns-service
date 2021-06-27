const {
  Router
} = require('express');
const router = Router();
const user = require("./user")
const post = require("./post")

router.use("/user",user)
router.use("/post",post)
// router.use("/content",(req,res)=>{res.send("aa")})

module.exports = router;