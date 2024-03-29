const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const axios = require("axios");
const bcrypt = require("bcryptjs");

module.exports = () => {
  const authenticateUser = async (id, password, done) => {
    try {
      //Check User width ID
      var api_path = process.env.API_ROOT + "/user/id/";
      const exUser = await axios.get(api_path + id);
      if (!exUser.data) {
        return done(null, false, {
          message: 'No User.'
        })
      }

      // Check Password
      const check_password = await bcrypt.compare(password, exUser.data.password)
      console.log(check_password)
      if (check_password) {
        return done(null, exUser.data)
      } else {
        return done(null, false, {
          message: "Wrong Password."
        })
      }
    } catch (e) {
      done(e)
    }
  }

  passport.use(new LocalStrategy({
    usernameField: 'id',
  }, authenticateUser))
  passport.serializeUser((user, done) => done(null, user.id))
  passport.deserializeUser(async (id, done) => {
    var api_path = process.env.API_ROOT + "/user/id/";
    const exUser = await axios.get(api_path + id);
    return done(null, exUser.data)
  })
}