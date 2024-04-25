require("dotenv").config()
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
 process.env.MYSQL_DB,
 process.env.MYSQL_USERNAME,
 process.env.MYSQL_PASSWORD,

  {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    logging: false,
    dialect: "mysql",
    dialectModule: require("mysql2"),
  }
);

let connection;

if (!connection)
  sequelize
    .authenticate()
    .then(() => {
      console.log("DB_RUNNING_SUCCESSFULLY");
      connection = true;
    })
    .catch((err) => {
      console.error("Unable to connect to the database:", err);
    });

module.exports = sequelize;