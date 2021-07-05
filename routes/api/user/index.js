const {
  Router
} = require('express');
const router = Router();
const ctrl = require("./ctrl")

//Read User
router.get("/ids", ctrl.get_ids)
router.get("/id/:id", ctrl.get_id)
router.get("/email/:email", ctrl.get_email)
router.get("/idnumber/:idnumber", ctrl.get_idNumber)
router.get("/followings", ctrl.get_followings)

//Create User
router.post("/create", ctrl.post_create)

//Edit User
router.post("/edit", ctrl.post_edit)

// Async functions from front web side
router.post("/follower", ctrl.post_follower)
router.post("/unfollower", ctrl.post_unfollower)









module.exports = router;