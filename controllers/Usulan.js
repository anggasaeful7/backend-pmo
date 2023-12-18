import jwt from "jsonwebtoken";
import Usulan from "../models/UsulanModel.js";
import Users from "../models/UserModel.js";
import Verifikasi from "../models/VerifikasiModel.js";
import axios from "axios";
import { Sequelize } from "sequelize";

export const createUsulanAplikasi = async (req, res) => {
  // `id_user`  , `jenis_pengajuan`  , `nama_aplikasi`  , `latar_belakang`  , `tujuan`  , `kepemilikan`  , `teknis`  , `npengembang1` , `npengembang2` , `lama_pengembangan`  , `sumber_anggaran`  , `besar_anggaran`  , `sumberdanalain` , `kategori_klaster`  , `klaster_lainnya` , `bahasa_pemrograman`  , `bahasa_pemrograman_lainnya` , `jenis_platform`  , `database` (10) , `database_lainnya` , `penyimpanan`  , `lokasi_server` , `lokasi_cloud` , `alasan_penyimpanan`  , `spesifikasi_cpu`  , `spesifikasi_ram`  , `spesifikasi_memory`  , `sumber_data`  , `integrasi`  , `alasan_integrasi`  , `format_penukaran`  , `surat_skpd`  , `lampiran_kak`  , `pertanyaan1`  , `pertanyaan2`  , `pertanyaan3`
  const {
    id_user,
    jenis_pengajuan,
    alasan_pengembangan,
    nama_aplikasi,
    latar_belakang,
    tujuan,
    kepemilikan,
    teknis,
    npengembang1,
    npengembang2,
    lama_pengembangan,
    sumber_anggaran,
    besar_anggaran,
    sumberdanalain,
    kategori_klaster,
    klaster_lainnya,
    bahasa_pemrograman,
    bahasa_pemrograman_lainnya,
    jenis_platform,
    database,
    database_lainnya,
    penyimpanan,
    lokasi_server,
    lokasi_cloud,
    alasan_penyimpanan,
    spesifikasi_cpu,
    spesifikasi_ram,
    spesifikasi_memory,
    sumber_data,
    integrasi,
    alasan_integrasi,
    format_penukaran,
    domain,
    pertanyaan1,
    pertanyaan2,
    pertanyaan3,
  } = req.body;

  const uploadedFileName = req.files["surat_skpd"][0].filename;
  const uploadedFileName2 = req.files["lampiran_kak"][0].filename;

  try {
    const usulan = await Usulan.create({
      id_user,
      jenis_pengajuan,
      alasan_pengembangan,
      nama_aplikasi,
      latar_belakang,
      tujuan,
      kepemilikan,
      teknis,
      npengembang1,
      npengembang2,
      lama_pengembangan,
      sumber_anggaran,
      besar_anggaran,
      sumberdanalain,
      kategori_klaster,
      klaster_lainnya,
      bahasa_pemrograman,
      bahasa_pemrograman_lainnya,
      jenis_platform,
      database,
      database_lainnya,
      penyimpanan,
      lokasi_server,
      lokasi_cloud,
      alasan_penyimpanan,
      spesifikasi_cpu,
      spesifikasi_ram,
      spesifikasi_memory,
      sumber_data,
      integrasi,
      alasan_integrasi,
      format_penukaran,
      domain,
      pertanyaan1,
      pertanyaan2,
      pertanyaan3,
      surat_skpd: uploadedFileName,
      lampiran_kak: uploadedFileName2,
    });

    axios.post("http://localhost:1212/verifikasi", {
      id_usulan: usulan.id,
      status: "pending",
      tipe: "verifikasi_administrasi",
    });

    res.status(201).json({
      message: "Usulan aplikasi berhasil dibuat",
      data: usulan,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getUsulanAplikasi = async (req, res) => {
  try {
    const usulan = await Usulan.findAll({
      where: { deletedAt: null },
    });
    res.json({
      status: "success",
      message: "Usulan successfully loaded",
      data: usulan,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getUsulanAplikasiById = async (req, res) => {
  try {
    const usulan = await Usulan.findOne({
      where: { id: req.params.id, deletedAt: null },
    });
    res.json({
      status: "success",
      message: "Usulan successfully loaded",
      data: usulan,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getUsulanWithVerifikasiandUserWithTipe = async (req, res) => {
  try {
    const tipe = req.params.tipe;
    const usulan = await Usulan.findAll({
      where: { deletedAt: null },
      attributes: ["id", "createdAt", "updatedAt"],
      include: [
        {
          model: Users,
          attributes: ["id", "nama", "skpd"],
        },
        {
          model: Verifikasi,
          attributes: [
            "id",
            "status",
            "tipe",
            "waktu_verifikasi",
            "catatan",
            "createdAt",
            "UpdatedAt",
          ],
          where: {
            tipe: tipe,
            deletedAt: null,
          },
        },
      ],
    });

    res.json({
      status: "success",
      message: "Usulan successfully loaded",
      data: usulan,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getUsulanWithVerifikasiandUser = async (req, res) => {
  try {
    const usulan = await Usulan.findAll({
      where: { deletedAt: null },
      attributes: ["id", "createdAt", "updatedAt"],
      include: [
        {
          model: Users,
          attributes: ["id", "nama", "skpd"],
        },
        {
          model: Verifikasi,
          attributes: [
            "id",
            "status",
            "tipe",
            "catatan",
            "waktu_verifikasi",
            "createdAt",
            "UpdatedAt",
          ],
          where: { deletedAt: null },
        },
      ],
    });
    res.json({
      status: "success",
      message: "Usulan successfully loaded",
      data: usulan,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getUsulanWithVerifikasiandUserbyId = async (req, res) => {
  try {
    const id = req.params.id;
    const usulan = await Usulan.findOne({
      where: { deletedAt: null, id: id },
      include: [
        {
          model: Users,
          attributes: ["id", "nama", "skpd"],
        },
        {
          model: Verifikasi,
          attributes: [
            "id",
            "status",
            "tipe",
            "waktu_verifikasi",
            "catatan",
            "createdAt",
            "UpdatedAt",
            "deletedAt",
          ],
          where: { deletedAt: null },
        },
      ],
    });
    res.json({
      status: "success",
      message: "Usulan successfully loaded",
      data: usulan,
    });
  } catch (error) {
    console.log(error);
  }
};

export const fullUsulanWithVerifikasiandUserbyId = async (req, res) => {
  try {
    const id = req.params.id;
    const usulan = await Usulan.findOne({
      where: { id: id },
      include: [
        {
          model: Users,
          attributes: ["id", "nama", "skpd"],
        },
        {
          model: Verifikasi,
          attributes: [
            "id",
            "status",
            "tipe",
            "waktu_verifikasi",
            "catatan",
            "createdAt",
            "UpdatedAt",
            "deletedAt",
          ],
        },
      ],
    });
    res.json({
      status: "success",
      message: "Usulan successfully loaded",
      data: usulan,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteUsulanAplikasi = async (req, res) => {
  try {
    const usulan = await Usulan.destroy({
      where: { id: req.params.id },
    });
    res.json({
      status: "success",
      message: "Usulan successfully deleted",
      data: usulan,
    });
  } catch (error) {
    console.log(error);
  }
};

export const klikDetailUsulan = async (req, res) => {
  // Update createdAt Verifikasi
  const id = req.params.id;
  // Ambil waktu saat ini tanggal,bulan,tahun

  try {
    const verifikasi = await Verifikasi.update(
      {
        waktu_verifikasi: Sequelize.fn("NOW"),
      },
      {
        where: {
          id: id,
        },
      }
    );
    res.json({
      status: "success",
      message: "Verifikasi successfully updated",
      data: verifikasi,
    });
  } catch (error) {
    console.log(error);
  }
};

export const setujuUsulan = async (req, res) => {
  // Update createdAt Verifikasi
  const id = req.params.id;
  const {
    id_usulan,
    tipe,
    status,
    catatan,
    nama,
    nip,
    jabatan,
    api,
    api_lainnya,
    fungsional,
    fungsional_lainnya,
    pentest,
    pentest_lainnya,
    resume,
  } = req.body;
  // Ambil waktu saat ini tanggal,bulan,tahun
  const date = new Date();
  const tahun = date.getFullYear();
  const bulan = date.getMonth();
  const tanggal = date.getDate();

  const waktu_verifikasi = tanggal + "-" + bulan + "-" + tahun;

  try {
    const verifikasi = await Verifikasi.update(
      {
        status: status,
        catatan: catatan,
        updatedAt: waktu_verifikasi,
        deletedAt: Sequelize.fn("NOW"),
      },
      {
        where: {
          id: id,
        },
      }
    );

    if (tipe == "analisis_teknis") {
      await axios.post("http://localhost:1212/verifikasi", {
        id_usulan: id_usulan,
        tipe: "analisis_teknis_aplikasi",
        status: "pending",
      });

      await axios.post("http://localhost:1212/verifikasi", {
        id_usulan: id_usulan,
        tipe: "analisis_teknis_keamanan",
        status: "pending",
      });

      await axios.post("http://localhost:1212/verifikasi", {
        id_usulan: id_usulan,
        tipe: "analisis_teknis_integrasi",
        status: "pending",
      });

      await axios.post("http://localhost:1212/verifikasi", {
        id_usulan: id_usulan,
        tipe: "analisis_teknis_data",
        status: "pending",
      });

      await axios.post("http://localhost:1212/verifikasi", {
        id_usulan: id_usulan,
        tipe: "analisis_teknis_infrastruktur",
        status: "pending",
      });
    } else if (tipe == "validasi_teknis") {
      await axios.post("http://localhost:1212/verifikasi", {
        id_usulan: id_usulan,
        tipe: "validasi_teknis_pki",
        status: "pending",
      });
      await axios.post("http://localhost:1212/verifikasi", {
        id_usulan: id_usulan,
        tipe: "validasi_teknis_data",
        status: "pending",
      });
      await axios.post("http://localhost:1212/verifikasi", {
        id_usulan: id_usulan,
        tipe: "validasi_teknis_infrastruktur",
        status: "pending",
      });
    } else if (tipe == "verifikasi_administrasi") {
      await axios.post("http://localhost:1212/dokumen", {
        id_usulan: id_usulan,
        id_verifikasi: id,
        nama: nama,
        nip: nip,
        jabatan: jabatan,
        status: status,
      });

      await axios.post("http://localhost:1212/verifikasi", {
        id_usulan: id_usulan,
        tipe: tipe,
        status: "pending",
      });
    } else if (tipe == "hosting") {
      await axios.post("http://localhost:1212/pendampingan", {
        id_usulan: id_usulan,
        fungsional: fungsional,
        fungsional_lainnya: fungsional_lainnya,
        api: api,
        api_lainnya: api_lainnya,
        pentest: pentest,
        pentest_lainnya: pentest_lainnya,
        resume: resume,
      });
      await axios.post("http://localhost:1212/verifikasi", {
        id_usulan: id_usulan,
        tipe: tipe,
        status: "pending",
      });
    } else if (tipe == "") {
      console.log("Tipe tidak ada");
    } else {
      await axios.post("http://localhost:1212/verifikasi", {
        id_usulan: id_usulan,
        tipe: tipe,
        status: "pending",
      });
    }

    res.json({
      status: "success",
      message: "Verifikasi successfully updated",
      data: verifikasi,
    });
  } catch (error) {
    console.log(error);
  }
};
