import Verifikasi from "../models/VerifikasiModel.js";
import Users from "../models/UserModel.js";
import { Op, Sequelize } from "sequelize";
import jwt from "jsonwebtoken";
import Email from "../models/EmailModel.js";

export const getEmail = async (req, res) => {
  try {
    const audit = await Email.findAll({
      where: { deletedAt: null },
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
        },
      ],
    });
    res.json({
      status: "success",
      message: "Audit successfully fetched",
      data: audit,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getEmailById = async (req, res) => {
  try {
    const { id } = req.params;
    const audit = await Email.findOne({
      where: {
        id,
        deletedAt: null,
      },
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
        },
      ],
    });
    res.json({
      status: "success",
      message: "Audit successfully fetched",
      data: audit,
    });
  } catch (error) {
    console.log(error);
  }
};

export const createEmail = async (req, res) => {
  // id_user, nama_aplikasi, tipe_audit, nama_pic, nomor_pic, nomor_surat, tanggal_surat, surat_skpd
  try {
    const {
      id_user,
      nama_aplikasi,
      email,
      nama_pic,
      nomor_pic,
      nomor_surat,
      tanggal_surat,
    } = req.body;
    const uploadedFileName = req.file.filename;

    const audit = await Email.create({
      id_user,
      nama_aplikasi,
      email,
      nama_pic,
      nomor_pic,
      nomor_surat,
      tanggal_surat,
      surat_skpd: uploadedFileName,
    });
    axios.post("http://localhost:1212/verifikasi", {
      id_usulan: usulan.id,
      status: "pending",
      tipe: "verifikasi_administrasi",
    });
    res.json({
      status: "success",
      message: "Audit successfully created",
      data: audit,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateEmail = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      id_user,
      nama_aplikasi,
      email,
      nama_pic,
      nomor_pic,
      nomor_surat,
      tanggal_surat,
    } = req.body;
    const uploadedFileName = req.file.filename;

    const audit = await Email.update(
      {
        id_user,
        nama_aplikasi,
        email,
        nama_pic,
        nomor_pic,
        nomor_surat,
        tanggal_surat,
        surat_skpd: uploadedFileName,
      },
      {
        where: {
          id,
        },
      }
    );
    res.json({
      status: "success",
      message: "Audit successfully updated",
      data: audit,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteEmail = async (req, res) => {
  try {
    const { id } = req.params;
    const audit = await Email.destroy({
      where: {
        id,
      },
    });
    res.json({
      status: "success",
      message: "Audit successfully deleted",
      data: audit,
    });
  } catch (error) {
    console.log(error);
  }
};

export const showEmail = async (req, res) => {
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
      const id = decoded.userId;

      // Dapatkan parameter bulan dan tahun dari query
      const { month, year } = req.query;

      // Bangun objek kriteria untuk filter
      const filterCriteria = {
        id_user: id,
      };

      // Tambahkan filter untuk bulan jika disediakan
      if (month) {
        filterCriteria.createdAt = {
          [Op.and]: [
            Sequelize.where(
              Sequelize.fn("MONTH", Sequelize.col("created_at")),
              month
            ),
            Sequelize.where(
              Sequelize.fn("YEAR", Sequelize.col("created_at")),
              year
            ),
          ],
        };
      }

      // Gunakan userId dan filterCriteria untuk mengambil laporan dari database
      Email.findAll({
        where: filterCriteria,
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
          },
        ],
      })
        .then((laporan) => {
          // Kirim respons dengan data laporan
          res.json({
            status: "success",
            message: "Laporan berhasil dimuat",
            data: laporan,
          });
        })
        .catch((error) => {
          // Tangani kesalahan jika terjadi kesalahan saat mengambil laporan
          res
            .status(500)
            .json({ message: "Terjadi kesalahan saat mengambil Usulan Audit" });
        });
    });
  } catch (error) {
    console.log(error);
  }
};

export const showEmailbyId = async (req, res) => {
  try {
    const { id } = req.params;
    const audit = await Email.findOne({
      where: {
        id,
        deletedAt: null,
      },
    });
    res.json({
      status: "success",
      message: "Audit successfully fetched",
      data: audit,
    });
  } catch (error) {
    console.log(error);
  }
};

export const setujuUsulanEmail = async (req, res) => {
  const id = req.params.id;
  const { id_usulan, tipe, status, catatan } = req.body;

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
    await axios.post(`http://localhost:1212/verifikasi/${id}/setuju`, {
      id_usulan: id,
      tipe: "rekomendasi",
      status: "pending",
    });
    res.json({
      status: "success",
      message: "Verifikasi successfully updated",
      data: verifikasi,
    });
  } catch (error) {
    console.log(error);
  }
};
