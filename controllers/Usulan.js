import jwt from "jsonwebtoken";
import Usulan from "../models/UsulanModel.js";
import Users from "../models/UserModel.js";
import Verifikasi from "../models/VerifikasiModel.js";

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

export const showUsulanAplikasi = async (req, res) => {
  const token = req.headers.authorization;
  // Memsihkan token dari prefix 'Bearer '
  const cleanToken = token.replace("Bearer ", "");

  try {
    if (!cleanToken) {
      // Token tidak ditemukan, kirim respons 401 (Unauthenticated)
      return res.status(401).json({ message: "Token tidak ditemukan" });
    }
    jwt.verify(cleanToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        // Token tidak valid, kirim respons 401 (Unauthenticated)
        return res.status(401).json({ message: "Token tidak valid" });
      }

      // Token valid, 'decoded' berisi informasi yang telah didekode, termasuk userId
      const userId = decoded.id_user;

      // Gunakan userId untuk mengambil laporan dari database
      Usulan.findAll({
        where: {
          id_user: userId,
          deletedAt: null,
        },
      })
        .then((laporan) => {
          // Kirim respons dengan data laporan
          res.json({
            status: "success",
            message: "Usulan berhasil dimuat",
            data: laporan,
          });
        })
        .catch((error) => {
          // Tangani kesalahan jika terjadi kesalahan saat mengambil laporan
          res
            .status(500)
            .json({ message: "Terjadi kesalahan saat mengambil usulan" });
        });
    });
  } catch (error) {
    console.log(error);
  }
};

export const getUsulanWithVerifikasiandUserWithTipe = async (req, res) => {
  try {
    const tipe = req.params.tipe;
    const usulan = await Users.findAll({
      where: { deletedAt: null },
      attributes: ["id", "nama", "skpd"],
      include: [
        {
          model: Usulan,
          attributes: ["id", "createdAt", "updatedAt"],
          include: [
            {
              model: Verifikasi,
              attributes: [
                "id",
                "status",
                "tipe",
                "waktu_verifikasi",
                "createdAt",
                "UpdatedAt",
              ],
              where: { tipe: tipe },
            },
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

export const getUsulanWithVerifikasiandUser = async (req, res) => {
  try {
    const usulan = await Users.findAll({
      where: { deletedAt: null },
      attributes: ["id", "nama", "skpd"],
      include: [
        {
          model: Usulan,
          attributes: ["id", "createdAt", "updatedAt"],
          include: [
            {
              model: Verifikasi,
              attributes: ["id", "status", "tipe", "waktu_verifikasi"],
            },
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
  const date = new Date();
  const tahun = date.getFullYear();
  const bulan = date.getMonth();
  const tanggal = date.getDate();

  const waktu_verifikasi = tanggal + "-" + bulan + "-" + tahun;

  try {
    const verifikasi = await Verifikasi.update(
      {
        waktu_verifikasi: waktu_verifikasi,
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
  const { tipe, status } = req.body;
  // Ambil waktu saat ini tanggal,bulan,tahun
  const date = new Date();
  const tahun = date.getFullYear();
  const bulan = date.getMonth();
  const tanggal = date.getDate();

  const waktu_verifikasi = tanggal + "-" + bulan + "-" + tahun;

  try {
    const verifikasi = await Verifikasi.update(
      {
        tipe: tipe,
        status: status,
        updateAt: waktu_verifikasi,
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
