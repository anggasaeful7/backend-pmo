import Usulan from "../models/UsulanModel.js";
import jwt from "jsonwebtoken";

export const showUsulanAplikasi = async (req, res) => {
  //   const token = req.headers.authorization;
  //   // Memsihkan token dari prefix 'Bearer '
  //   const cleanToken = token.replace("Bearer ", "");
  //   try {
  //     if (!cleanToken) {
  //       // Token tidak ditemukan, kirim respons 401 (Unauthenticated)
  //       return res.status(401).json({ message: "Token tidak ditemukan" });
  //     }
  //     jwt.verify(cleanToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
  //       if (err) {
  //         // Token tidak valid, kirim respons 401 (Unauthenticated)
  //         return res.status(401).json({ message: "Token tidak valid" });
  //       }
  //       // Token valid, 'decoded' berisi informasi yang telah didekode, termasuk userId
  //       const userId = decoded.id_user;
  //       // Gunakan userId untuk mengambil laporan dari database
  //       Usulan.findAll({
  //         where: {
  //           id_user: userId,
  //           deletedAt: null,
  //         },
  //       })
  //         .then((laporan) => {
  //           // Kirim respons dengan data laporan
  //           res.json({
  //             status: "success",
  //             message: "Usulan berhasil dimuat",
  //             data: laporan,
  //           });
  //         })
  //         .catch((error) => {
  //           // Tangani kesalahan jika terjadi kesalahan saat mengambil laporan
  //           res
  //             .status(500)
  //             .json({ message: "Terjadi kesalahan saat mengambil usulan" });
  //         });
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }

  res.json({
    status: "success",
    message: "Usulan berhasil dimuat",
    data: "Usulan",
  });
};
