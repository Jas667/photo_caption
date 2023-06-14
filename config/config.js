const fs = require('fs');

module.exports = {
  development: {
    username: "postgres",
    password: "postgres",
    database: "photo_caption",
    host: "localhost",
    dialect: "postgres",
    jwtSecret: "secret"
  },
  test: {
    username: "postgres",
    password: "postgres",
    database: "photo_caption",
    host: "localhost",
    dialect: "postgres",
    jwtSecret: "secret"
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql",
    jwtSecret: "secret"
  }
}
