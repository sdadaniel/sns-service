const db = require("../../../models");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const user_include_option = [{
  model: db.User,
  as: "Followers",
  attributes: ["idNumber", "id"]
}, {
  model: db.User,
  as: "Followings",
  attributes: ["idNumber", "id"]
}]

exports.get_id = async (req, res) => {
  const options = {
    id: req.params.id
  }
  const result = await db.User.findOne({
    where: options,
    include: user_include_option
  })
  res.send(result)
}

exports.get_ids = async (req, res) => {
  var options = {
    idNumber: {
      [Op.or]: req.body
    }
  }
  const result = await db.User.findAll({
    where: options,
  })
  res.send(result);
}

exports.get_idNumber = async (req, res) => {
  try {
    const result = await db.User.findAll({
      where: {
        idNumber: req.params.idnumber
      },
      include: user_include_option
    })
    res.send(result)
  } catch (e) {
    console.log(e)
  }
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
  const {
    id,
    email,
    address,
    thumbnail
  } = req.body

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

exports.post_follower = async (req, res) => {
  const data = req.body;
  const user = await db.User.findOne({
    where: {
      idNumber: data.profile
    }
  });

  if (!user) {
    res.status(404).send('no user');
  }

  await user.addFollowers(data.user)
    .then(res.send("success"))
    .catch(e => {
      return res.error("error")
    })


}

exports.post_unfollower = async (req, res) => {

  const data = req.body;
  const user = await db.User.findOne({
    where: {
      idNumber: data.profile
    }
  });
  if (!user) {
    res.status(404).send('no user');
  }
  await user.removeFollowers(data.user)
    .then(res.send("success"))
    .catch(e => {
      res.send("error")
    })


}

exports.get_followings = async (req, res) => {

  var result = await db.User.findAll({
    where: {
      idNumber: req.user.idNumber
    },
    attributes: ["idNumber"],

    include: {
      model: db.User,
      as: "Followings",
      attributes: ["id", "thumbnail"]
    }
  })

  res.send(result[0].Followings)
}