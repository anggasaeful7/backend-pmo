import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import db from "./config/Database.js";
import router from "./routes/index.js";
import Users from "./models/UserModel.js";
import Usulan from "./models/UsulanModel.js";
import Verifikasi from "./models/VerifikasiModel.js";
import Dokumen from "./models/DokumenModel.js";
dotenv.config();
const app = express();

try {
  await db.authenticate();
  console.log("Database Connected...");
} catch (error) {
  console.error(error);
}
Users.hasMany(Usulan, { foreignKey: "id_user" });
Usulan.belongsTo(Users, { foreignKey: "id_user" });
Usulan.hasMany(Verifikasi, { foreignKey: "id_usulan" });
Verifikasi.belongsTo(Usulan, { foreignKey: "id_usulan" });
Verifikasi.hasMany(Dokumen, { foreignKey: "id_verifikasi" });
Dokumen.belongsTo(Verifikasi, { foreignKey: "id_verifikasi" });

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(cookieParser());
app.use(express.json());
app.use(router);
app.use("/dokumen", express.static("public/dokumen"));

// Users.sync();
// Usulan.sync();
// Verifikasi.sync();
// Dokumen.sync();

app.listen(1212, () => console.log("Server running at port 1212"));
