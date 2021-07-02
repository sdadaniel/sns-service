const { default: axios } = require('axios');
const {
  Router
} = require('express');
const db = require('../../../models');
const router = Router();
const ctrl = require("./ctrl")

//조회
router.get("/ids", ctrl.get_ids)
router.get("/id/:id", ctrl.get_id)
router.get("/email/:email", ctrl.get_email)
router.get("/idnumber/:idnumber", ctrl.get_idNumber)
router.get("/followings", ctrl.get_followings)
// router.post("/chatting", async (req, res) => {

//   const targetId = req.body.targetId
//   const user = req.user.idNumber

//   console.log(user, targetId)
  
//   const targetIdNumber = await axios.get(process.env.API_ROOT+"/user/id/"+targetId)
//   console.log(targetIdNumber.data.idNumber)
//   res.send("aa")

// })
//생성
router.post("/create", ctrl.post_create)

//수정
router.post("/edit", ctrl.post_edit)

router.post("/follower", ctrl.post_follower)
router.post("/unfollower", ctrl.post_unfollower)









module.exports = router;