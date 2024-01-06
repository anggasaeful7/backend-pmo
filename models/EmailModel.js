import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Email = db.define(
  "usulan_email",
  {
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nama_aplikasi: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
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
    nomor_surat: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    tanggal_surat: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    surat_skpd: {
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

export default Email;
