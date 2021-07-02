const {
  Router
} = require('express');
const router = Router();
const db = require("../../../../models")
const Sequelize = require("sequelize")

router.get("/stars", (req, res) => {
  const idNumber = req.query.id
  //@flag value :1  => already checked stars
  //@flag value :0  => plus stars attribute
  const flag = req.query.flag == 0 ? +1 : -1
  db.Post.update({
    stars: Sequelize.literal(`stars+(${flag})`)
  }, {
    where: {
      idNumber
    }
  }).then((data) => {
    res.send(data)
  })
})


module.exports = router;