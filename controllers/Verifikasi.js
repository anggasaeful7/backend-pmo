import Verifikasi from "../models/VerifikasiModel.js";

export const createVerifikasi = async (req, res) => {
  try {
    const { id_usulan, tipe, catatan, status, waktu_verifikasi } = req.body;
    const verifikasi = await Verifikasi.create({
      id_usulan,
      tipe,
      catatan,
      status,
      waktu_verifikasi,
    });
    res.json({
      status: "success",
      message: "Verifikasi successfully created",
      data: verifikasi,
    });
  } catch (error) {
    console.log(error);
  }
};
