const {
  Router
} = require('express');
const router = Router();
const ctrl = require("./ctrl")
const fs = require("fs");
const multer = require("multer")
const path = require("path")

const db = require("../../../models");
const axios = require("axios")






//조회
router.get("/id/:id", ctrl.get_id)
router.get("/email/:email", ctrl.get_email)

//생성
router.post("/create", ctrl.post_create)

//수정
router.post("/edit", ctrl.post_edit)







module.exports = router;