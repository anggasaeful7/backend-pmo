import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Token = db.define(
  "token",
  {
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    skpd: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    tujuan: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    durasi: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
      field: "deleted_at",
    },
  },
  {
    paranoid: true,
    freezeTableName: true,
  }
);

export default Token;
