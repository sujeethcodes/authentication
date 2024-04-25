const Sequelize = require("sequelize");
const DB = require("../config/db");
const profile = require("../model/profile")
const accounts = DB.define(
  "accounts",
  {
    id: {
      field: "id",
      type: Sequelize.DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    userId: {
      field: "userId",
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
    },
    emailId: {
      field: "emailId",
      type: Sequelize.DataTypes.STRING,
    },
    password: {
      field: "password",
      type: Sequelize.DataTypes.STRING,
    },
    user:{
      field: "user",
      type: Sequelize.DataTypes.STRING,
      defaultValue: "user" 
    },
    isAdmin:{
      field: "isAdmin",
      type: Sequelize.DataTypes.BOOLEAN,
      defaultValue: false 
    },
    emailVerified: {
      field: "emailVerified",
      type: Sequelize.DataTypes.BOOLEAN,
      defaultValue: false 
    },
    isDeleted: {
      field: "isDeleted",
      type: Sequelize.DataTypes.BOOLEAN,
      defaultValue: false 
    },
    login: {
      field: "login",
      type: Sequelize.DataTypes.BOOLEAN,
      defaultValue: false 
    },
    logOut: {
      field: "logOut",
      type: Sequelize.DataTypes.BOOLEAN,
      defaultValue: false 
    }
  },
  {
    timestamps: false,
    tableName: "accounts"
  }
);

accounts.belongsTo(profile, {
  foreignKey: "userId",
  targetKey: "userId",
  constraints: false,
});

module.exports = accounts;
