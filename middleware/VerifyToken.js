import jwt from "jsonwebtoken";

export const verifyToken = (allowedRoles) => (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.sendStatus(403);
    }

    // Periksa peran pengguna
    const userRole = decoded.role; // Asumsi peran disimpan dalam payload

    // Sesuaikan peran yang diharapkan dengan peran pengguna
    if (!allowedRoles.includes(userRole)) {
      return res.sendStatus(403); // Tidak memiliki peran yang diharapkan
    }

    // Setel informasi pengguna di req untuk penggunaan lebih lanjut
    req.email = decoded.email;
    req.role = decoded.role;

    // Lanjutkan ke middleware atau handler berikutnya
    next();
  });
};

// Contoh penggunaan middleware untuk memeriksa peran "admin" atau "user"
export const verifyAdminOrUserToken = verifyToken(["admin", "user"]);
export const verifyAnalisisKelayakan = verifyToken("analisis_kelayakan");
