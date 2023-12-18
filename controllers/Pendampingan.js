import Pendampingan from "../models/PendampinganModel.js";

export const createPendampingan = async (req, res) => {
  const {
    id_usulan,
    api,
    api_lainnya,
    fungsional,
    fungsional_lainnya,
    pentest,
    pentest_lainnya,
    resume,
  } = req.body;
  try {
    const pendampingan = await Pendampingan.create({
      id_usulan,
      api,
      api_lainnya,
      fungsional,
      fungsional_lainnya,
      pentest,
      pentest_lainnya,
      resume,
    });
    res.json({
      status: "success",
      message: "Pendampingan berhasil ditambahkan",
      data: pendampingan,
    });
  } catch (error) {
    console.log(error);
  }
};
