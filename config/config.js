module.exports = {
  "development": {
    "username": process.env.DB_DEV_USER,
    "password": process.env.DB_DEV_PASSWORD,
    "database": "nodejs",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.DB_PRODUCTION_USER,
    "password": process.env.DB_PRODUCTION_PASSWORD,
    "database": "nodejs_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}