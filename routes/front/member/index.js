const {
  Router
} = require('express');
const router = Router();
const ctrl = require("./ctrl")
const multer = require("multer");
const fs = require("fs")
const path = require("path");



//multer setting
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "uploads/user/profile")
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname)
      const filename = path.basename(req.session.passport.user);
      cb(null, filename + ext)
    }
  }),
  // limits: {
  //   fileSize: 5 * 1024 * 1024
  // }
})

try {
  fs.readdirSync("uploads/user/profile")
} catch (e) {
  fs.mkdirSync("uploads/user/profile", {
    recursive: true
  })
}


// 마이페이지
router.get("/mypage.html", (req, res) => {
  res.render("member/mypage.html")
})

router.get("/mypage_edit.html", async (req, res) => {
  res.render("member/mypage_edit.html")
})
router.post("/mypage_edit.html", upload.single("thumbnail"), ctrl.post_mypage_edit)

// 포스팅페이지
router.get("/post.html", ctrl.get_post)
router.post("/post.html", ctrl.post_post)

router.get("/post/write.html", ctrl.get_write)

router.get("/post/detail.html/:idNumber", ctrl.get_detail)










module.exports = router;