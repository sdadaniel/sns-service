const express = require('express');
const cookiePareser = require("cookie-parser");
const morgan = require("morgan");
const session = require("express-session");
const flash = require('express-flash');
const path = require("path");
const nunjucks = require("nunjucks");
const dotenv = require('dotenv');
const passport = require('passport');
dotenv.config();
const passportConfig = require("./passport");
const redis = require("redis")
const RedisStore = require("connect-redis")(session)

const {
  sequelize
} = require("./models");

class App {
  constructor() {
    this.app = express();
    this.middleWare();

    //Mysql Connection
    this.dbconnection();
    this.getRouteing();
    this.errorHandling();
  }

  
  dbconnection() {
    sequelize.sync({
        force: false
      })
      .then(() => {
        console.log("db Connected");
      }).catch((err) => {
        console.log("db connection failed");
      });
  }

  middleWare() {
    this.app.set("view engine", "html")
    nunjucks.configure("views", {
      express: this.app,
      watch: true,
    })

    this.app.use(morgan('dev'));
    this.app.use(express.static(path.join(__dirname, 'public')));
    this.app.use("/img", express.static(path.join(__dirname, 'uploads')));

    this.app.use(express.json());
    this.app.use(express.urlencoded({
      extended: false
    }));


    this.app.use(cookiePareser(process.env.COOKIE_SECRET))
    this.app.use(flash());

    const redisClient = redis.createClient({
      url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
      password: process.env.REDIS_PASSWORD
    })

    this.app.use(session({
      resave: false,
      saveUninitialized: 0,
      secret: process.env.COOKIE_SECRET,
      store: new RedisStore({
        client: redisClient
      })
    }));

    this.app.use(passport.initialize());
    this.app.use(passport.session());
    passportConfig(passport);
  }

  getRouteing() {
    this.app.use(require('./routes'))
  }

  errorHandling() {
    this.app.use((req, res, next) => {
      var e = new Error()
      e.status = 404;
      next(e)
    })

    this.app.use((err, req, res, next) => {
      res.render("error/error.html", {
        error: err
      })
    })

  }

}

module.exports = new App().app;