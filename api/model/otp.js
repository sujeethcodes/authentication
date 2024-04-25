const Sequelize = require("sequelize");
const DB = require("../config/db");
const otp = DB.define(
  "otp",
  {
    id: {
      field: "id",
      type: Sequelize.DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    emailId: {
        field: "emailId",
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
    otp: {
      field: "otp",
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      field: "createdAt",
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    expiredAt: {
      field: "expiredAt",
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
   
  },
  {
    timestamps: false,
    tableName: "otp"
  }
);

module.exports = otp;
