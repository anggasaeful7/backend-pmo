import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Dokumen = db.define(
  "dokumen",
  {
    id_usulan: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_verifikasi: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tipe: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    nama: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    nip: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    jabatan: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(15),
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

export default Dokumen;
