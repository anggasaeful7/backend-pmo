import Usulan from "./UsulanModel.js";
import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Verifikasi = db.define(
  "verifikasi_aplikasi",
  {
    id_usulan: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tipe: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    catatan: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    waktu_verifikasi: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
      field: "waktu_verifikasi",
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
      field: "deleted_at",
    },
  },
  {
    paranoid: false,
    freezeTableName: true,
  }
);

export default Verifikasi;
