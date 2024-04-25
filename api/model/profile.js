const Sequelize = require("sequelize");
const DB = require("../config/db");
const profile = DB.define(
  "profile",
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
    firstName: {
      field: "firstName",
      type: Sequelize.DataTypes.STRING,
    },
    lastName: {
      field: "lastName",
      type: Sequelize.DataTypes.STRING,
      defaultValue: false 
    },
    isDeleted: {
      field: "isDeleted",
      type: Sequelize.DataTypes.BOOLEAN,
      defaultValue: false 
    },
    phoneNumber: {
      field: "phoneNumber",
      type: Sequelize.DataTypes.STRING,
      defaultValue: true 
    },
    companyName: {
      field: "companyName",
      type: Sequelize.DataTypes.STRING,
      defaultValue: false 
    },
    employeeId: {
        field: "employeeId",
        type: Sequelize.DataTypes.INTEGER,
        defaultValue: false 
      },
      role: {
        field: "role",
        type: Sequelize.DataTypes.STRING,
        defaultValue: false 
      }
  },
  {
    timestamps: false,
    tableName: "profile"
  }
);

module.exports = profile;
