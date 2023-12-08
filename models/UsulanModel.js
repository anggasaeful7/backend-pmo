import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";
import Verifikasi from "./VerifikasiModel.js";

const { DataTypes } = Sequelize;

const Usulan = db.define(
  "usulan_aplikasi",
  {
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    jenis_pengajuan: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    alasan_pengembangan: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    nama_aplikasi: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    latar_belakang: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    tujuan: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    kepemilikan: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    teknis: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    npengembang1: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    npengembang2: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    lama_pengembangan: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sumber_anggaran: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    besar_anggaran: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sumberdanalain: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    kategori_klaster: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    klaster_lainnya: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    bahasa_pemrograman: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    bahasa_pemrograman_lainnya: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    jenis_platform: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    database: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    database_lainnya: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    penyimpanan: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    lokasi_server: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    lokasi_cloud: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    alasan_penyimpanan: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    spesifikasi_cpu: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    spesifikasi_ram: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    spesifikasi_memory: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    sumber_data: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    integrasi: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    alasan_integrasi: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    format_penukaran: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    domain: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    surat_skpd: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    lampiran_kak: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    pertanyaan1: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    pertanyaan2: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    pertanyaan3: {
      type: DataTypes.STRING(10),
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

export default Usulan;
