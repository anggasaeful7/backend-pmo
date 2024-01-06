import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Medsos = db.define(
  "usulan_medsos",
  {
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nama_aplikasi: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    twitter: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    url_twitter: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    instagram: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    url_instagram: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    youtube: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    url_youtube: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    lainnya: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    url_lainnya: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    catatan: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    nama_pic: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    nomor_pic: {
      type: DataTypes.STRING(100),
      allowNull: true,
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

export default Medsos;
