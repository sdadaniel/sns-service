const {
  Router
} = require('express');
const router = Router();
const ctrl = require("./ctrl")
router.get("/", ctrl.get)
router.post("/write", ctrl.post_write)
router.get("/count/", ctrl.get_count)
router.get("/detail", ctrl.get_detail)
router.get("/list/:userIdNumber", ctrl.get_list_id)
router.get("/read/:userIdNumber", ctrl.get_read_id)
router.get("/search/:keyword", ctrl.get_search_keyword)
router.get("/search/count/:keyword", ctrl.get_search_count_keyword)

router.delete("/delete/:idNumber", ctrl.delete__delete)











module.exports = router;