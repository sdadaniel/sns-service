const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const axios = require("axios");
const bcrypt = require("bcrypt");
const app = require("../app")


module.exports = () => {

  const authenticateUser = async (id, password, done) => {

    try {
      //아이디 확인
      var api_path = `http://localhost:3000` + "/api/user/id/";
      const exUser = await axios.get(api_path + id);
      console.log(exUser.data)
      if (!exUser.data) {

        return done(null, false, {
          message: '존재하지 않는 회원입니다.'
        })
      }

      //비밀번호 확인
      const check_password = await bcrypt.compare(password, exUser.data.password)
      console.log(check_password)
      if (check_password) {
        return done(null, exUser.data)
      } else {
        return done(null, false, {
          message: "비밀번호가 일치하지 않습니다."
        })
      }
    } catch (e) {
      console.error(e);
      done(e)
    }
  }

  passport.use(new LocalStrategy({
    usernameField: 'id',
  }, authenticateUser))
  passport.serializeUser((user, done) => done(null, user.id))
  passport.deserializeUser(async (id, done) => {
    var api_path = `http://localhost:3000` + "/api/user/id/";
    const exUser = await axios.get(api_path + id);
    return done(null, exUser.data)
  })
}