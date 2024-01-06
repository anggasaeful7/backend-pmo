import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Helpdesk = db.define(
  "usulan_helpdesk",
  {
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nama_aplikasi: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    pertanyaan: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    jenis: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    nama_pic: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    nomor_pic: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    tipe: {
      type: DataTypes.DATEONLY,
      allowNull: true,
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

export default Helpdesk;
