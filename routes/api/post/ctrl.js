const db = require("../../../models")
const {
  sequelize,
} = require("../../../models")
const {
  Op
} = require("sequelize")


exports.post_write = async (req, res, next) => {
  const {
    category,
    title,
    description,
    idNumber
  } = req.body

  console.log(description);
  console.log("-----------")
  console.log(description.replace("\n", "<br>"));

  try {
    await db.Post.create({
      title,
      category,
      description,
      UserIdNumber: idNumber,
    })
    return res.text()
  } catch (e) {
    next(e)
  }
}

exports.get = async (req, res, next) => {
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
        attributes: ["id", "thumbnail", "idNumber"]
      }],
      limit: pagingSize,
      offset
    })
    res.send(contents)
  } catch (e) {
    next(e)
  }
}
exports.get_list_id = async (req, res, next) => {
  const userIdNumber = req.params.userIdNumber;

  const data = await db.Post.findAll({
    where: {
      userIdNumber,
    },
    attributes: ["idNumber", "title", "category"]
  })
  res.send(data)
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

exports.get_search_keyword = async (req, res, next) => {
  const keyword = decodeURIComponent(req.params.keyword)
  var result = await db.Post.findAll({
    where: {
      [Op.or]: [{
        title: {
          [Op.regexp]: `${keyword}`
        }
      }, {
        description: {
          [Op.regexp]: `${keyword}`
        }
      }]
    }
  })
  res.send(result)
}

exports.get_search_count_keyword = async (req, res, next) => {
  const keyword = decodeURIComponent(req.params.keyword)
  var result = await db.Post.findAll({
    where: {
      [Op.or]: [{
        title: {
          [Op.regexp]: `${keyword}`
        }
      }, {
        description: {
          [Op.regexp]: `${keyword}`
        }
      }]
    },
    attributes: [
      [sequelize.fn('COUNT', sequelize.col('*')), 'total']
    ]
  })
  res.send(result[0])
}

exports.get_detail = async (req, res, next) => {


  var result = await db.Post.findOne({
    where: {
      idNumber: req.query.id
    },
    include: [{
      model: db.User,
      attributes: ["id", "thumbnail", "idNumber"]
    }],

  })
  res.send(result)
}