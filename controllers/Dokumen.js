import Dokumen from "../models/DokumenModel.js";

export const createDokumen = async (req, res) => {
  try {
    const { id_usulan, id_verifikasi, tipe, nama, nip, jabatan, status } =
      req.body;
    const dokumen = await Dokumen.create({
      id_usulan,
      id_verifikasi,
      tipe,
      nama,
      nip,
      jabatan,
      status,
    });
    res.json({
      status: "success",
      message: "Dokumen successfully created",
      data: dokumen,
    });
  } catch (error) {
    console.log(error);
  }
};
