const {
  Router
} = require('express');
const router = Router();

const ctrl = require("./ctrl")



router.get("/profile.html", ctrl.get_profile)
router.get("/profile/follow", ctrl.get_profile_follow)
router.get("/profile/unfollow", ctrl.get_profile_unfollow)



module.exports = router;