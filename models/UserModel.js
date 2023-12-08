import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Usulan from "./UsulanModel.js";

const { DataTypes } = Sequelize;

const Users = db.define(
  "users",
  {
    nama: {
      type: DataTypes.STRING,
    },
    skpd: {
      type: DataTypes.STRING,
    },
    ktp: {
      type: DataTypes.STRING,
    },
    nip: {
      type: DataTypes.STRING,
    },
    foto: {
      type: DataTypes.STRING,
    },
    alamat: {
      type: DataTypes.STRING,
    },
    no_hp: {
      type: DataTypes.STRING,
    },
    unit_kerja: {
      type: DataTypes.STRING,
    },
    jabatan: {
      type: DataTypes.STRING,
    },
    hak_akses: {
      type: DataTypes.STRING,
    },
    aktif: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    username: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    refresh_token: {
      type: DataTypes.TEXT,
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

export default Users;
