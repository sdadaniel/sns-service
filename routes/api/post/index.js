const {
  Router
} = require('express');
const router = Router();
const ctrl = require("./ctrl")
router.post("/write", ctrl.post_write)

router.get("/count/", ctrl.get_count)
router.get("/read/", ctrl.get_read)
router.get("/read/:userIdNumber", ctrl.get_read_id)









module.exports = router;