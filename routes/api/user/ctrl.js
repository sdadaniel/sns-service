const db = require("../../../models");

const multer = require("multer")

exports.get_id = async (req, res) => {
  const options = {
    id: req.params.id
  }
  const {
    all
  } = req.query;
  const result = all ? await db.User.findAll({
    where: options
  }) : await db.User.findOne({
    where: options
  })
  res.send(result)
}

exports.get_email = async (req, res) => {
  const options = {
    email: req.params.email
  }
  const {
    all
  } = req.query;
  const result = all ? await db.User.findAll({
    where: options
  }) : await db.User.findOne({
    where: options
  })
  res.send(result)
}

exports.post_create = async (req, res) => {
  const {
    id,
    password,
    email,
    address,
    name
  } = req.body

  await db.User.create({
    id,
    password,
    email,
    address,
    name
  }).then(() => {
    res.text();

  }).catch((e) => {
    next(e)

  })
}


exports.post_edit = async (req, res, next) => {
  const {id,email,address,thumbnail} = req.body

  var updateObject = {
    address,
    email,
    thumbnail
  }

  try {
    db.User.update(updateObject, {
      where: {
        id
      }
    })
    return res.text();
  } catch (e) {
    next(e)

  }
}


exports.post_edit_thumbnail = (req, res) => {
  db.User.update({
    thumbnail: req.params.thumb,
  }, {
    where: {
      id: req.session.passport.user
    }
  }).then(() => {
    return null
  }).catch(e => {
    next(e)
  })
}
exports.get_edit_thumbnail = (req, res) => {

  db.User.update({
    thumbnail: req.params.thumb,
  }, {
    where: {
      id: req.session.passport.user
    }
  }).then(() => {
    return null
  })
}