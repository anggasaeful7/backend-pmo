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
import Pendampingan from "./models/PendampinganModel.js";
import Audit from "./models/AuditModel.js";
import Helpdesk from "./models/HelpdeskModel.js";
import Integrasi from "./models/IntegrasiModel.js";
import Interkoneksi from "./models/InterkoneksiModel.js";
import Medsos from "./models/MedsosModel.js";
import Domain from "./models/DomainModel.js";
import Email from "./models/EmailModel.js";

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
Users.hasMany(Audit, { foreignKey: "id_user" });
Audit.belongsTo(Users, { foreignKey: "id_user" });
Users.hasMany(Helpdesk, { foreignKey: "id_user" });
Helpdesk.belongsTo(Users, { foreignKey: "id_user" });
Users.hasMany(Integrasi, { foreignKey: "id_user" });
Integrasi.belongsTo(Users, { foreignKey: "id_user" });
Users.hasMany(Interkoneksi, { foreignKey: "id_user" });
Interkoneksi.belongsTo(Users, { foreignKey: "id_user" });
Users.hasMany(Medsos, { foreignKey: "id_user" });
Medsos.belongsTo(Users, { foreignKey: "id_user" });
Users.hasMany(Domain, { foreignKey: "id_user" });
Domain.belongsTo(Users, { foreignKey: "id_user" });
Users.hasMany(Email, { foreignKey: "id_user" });
Email.belongsTo(Users, { foreignKey: "id_user" });
Usulan.hasMany(Verifikasi, { foreignKey: "id_usulan" });
Verifikasi.belongsTo(Usulan, { foreignKey: "id_usulan" });
Audit.hasMany(Verifikasi, { foreignKey: "id_usulan" });
Verifikasi.belongsTo(Audit, { foreignKey: "id_usulan" });
Helpdesk.hasMany(Verifikasi, { foreignKey: "id_usulan" });
Verifikasi.belongsTo(Helpdesk, { foreignKey: "id_usulan" });
Integrasi.hasMany(Verifikasi, { foreignKey: "id_usulan" });
Verifikasi.belongsTo(Integrasi, { foreignKey: "id_usulan" });
Interkoneksi.hasMany(Verifikasi, { foreignKey: "id_usulan" });
Verifikasi.belongsTo(Interkoneksi, { foreignKey: "id_usulan" });
Medsos.hasMany(Verifikasi, { foreignKey: "id_usulan" });
Verifikasi.belongsTo(Medsos, { foreignKey: "id_usulan" });
Domain.hasMany(Verifikasi, { foreignKey: "id_usulan" });
Verifikasi.belongsTo(Domain, { foreignKey: "id_usulan" });
Email.hasMany(Verifikasi, { foreignKey: "id_usulan" });
Verifikasi.belongsTo(Email, { foreignKey: "id_usulan" });
// USULAN DIATAS
Verifikasi.hasMany(Dokumen, { foreignKey: "id_verifikasi" });
Dokumen.belongsTo(Verifikasi, { foreignKey: "id_verifikasi" });

// VERIFIKASI DIATAS
Verifikasi.hasOne(Pendampingan, { foreignKey: "id_verifikasi" });
Pendampingan.belongsTo(Verifikasi, { foreignKey: "id_verifikasi" });

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(cookieParser());
app.use(express.json());
app.use(router);
app.use("/dokumen", express.static("public/dokumen"));
app.use("/surat", express.static("public/surat"));
app.use("/template", express.static("public/template"));

// Users.sync();
// Usulan.sync();
// Verifikasi.sync();
// Dokumen.sync();
// Dokumen.sync();
// Pendampingan.sync();
// Audit.sync();
// Helpdesk.sync();
// Integrasi.sync();
// Interkoneksi.sync();
// Medsos.sync();
// Domain.sync();
// Email.sync();

app.listen(1212, () => console.log("Server running at port 1212"));
