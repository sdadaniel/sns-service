const {
  Router
} = require('express');
const router = Router();
const ctrl = require("./ctrl")

//Read POST
router.get("/", ctrl.get)
router.get("/count/", ctrl.get_count)  //get total number of posts for pagenation
router.get("/detail", ctrl.get_detail) //get a post for detail.html


router.get("/search/:keyword", ctrl.get_search_keyword) //search post with keyword
router.get("/search/count/:keyword", ctrl.get_search_count_keyword)
router.get("/list/:userIdNumber", ctrl.get_list_id)
router.get("/read/:userIdNumber", ctrl.get_read_id)

//Create POST
router.post("/write", ctrl.post_write)

//Delete POST
router.delete("/delete/:idNumber", ctrl.delete__delete)











module.exports = router;