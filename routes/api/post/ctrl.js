const db = require("../../../models")
const {
  sequelize
} = require("../../../models")


exports.post_write = async (req, res, next) => {
  const {
    category,
    title,
    description,
    idNumber
  } = req.body

  try {
    await db.Post.create({
      title,
      category,
      description,
      UserIdNumber: idNumber
    })
    return res.text()
  } catch (e) {
    next(e)
  }
}


exports.get_read = async (req, res, next) => {
  try {
    

    const pagingSize = parseInt(req.query.pagingSize ? req.query.pagingSize : 10);
    const page = parseInt(req.query.page ? req.query.page : 1);
    const offset = (page - 1) * pagingSize;

    const contents = await db.Post.findAll({
      order: [
        ['updatedAt', 'DESC']
      ],
      include: [{
        model: db.User,
        attributes: ["id", "thumbnail"]
      }],
      limit: pagingSize,
      offset
    })
    res.send(contents)
  } catch (e) {
    next(e)
  }
}

exports.get_read_id = async (req, res, next) => {
  try {
    const userIdNumber = req.params.userIdNumber;
    const contents = await db.Post.findAll({
      where: {
        UserIdNumber: userIdNumber
      },
      order: [
        ['updatedAt', 'DESC']
      ]
    })

    res.send(contents)

  } catch (e) {
    next(e)
  }
}

exports.get_count = async (req, res, next) => {
  db.Post.findAll({
      attributes: [
        [sequelize.fn('COUNT', sequelize.col('*')), 'total']
      ]
    })
    .then(result => {
      res.send(result[0])
    })
    .catch(e => {
      res.json("에러")
    })
}