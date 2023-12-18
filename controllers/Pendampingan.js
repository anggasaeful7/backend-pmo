import Pendampingan from "../models/PendampinganModel.js";

export const createPendampingan = async (req, res) => {
  const {
    api,
    api_lainnya,
    fungsional,
    fungsional_lainnya,
    pentest,
    pentest_lainnya,
  } = req.body;
  try {
    const pendampingan = await Pendampingan.create({
      api,
      api_lainnya,
      fungsional,
      fungsional_lainnya,
      pentest,
      pentest_lainnya,
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
