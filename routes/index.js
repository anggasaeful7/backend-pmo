import express from "express";
import {
  getUsers,
  Register,
  Login,
  Logout,
  deleteUser,
  updateUser,
  getUsersbyId,
} from "../controllers/Users.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import upload from "../middleware/multer.js";
import {
  createUsulanAplikasi,
  deleteUsulanAplikasi,
  fullUsulanWithVerifikasiandUserbyId,
  getUsulanAplikasi,
  getUsulanAplikasiById,
  getUsulanWithVerifikasiandUser,
  getUsulanWithVerifikasiandUserWithTipe,
  getUsulanWithVerifikasiandUserbyId,
  klikDetailUsulan,
  setujuUsulan,
} from "../controllers/Usulan.js";
import { createVerifikasi } from "../controllers/Verifikasi.js";
import { cetakDokumen, createDokumen } from "../controllers/Dokumen.js";
import {
  showUsulanAplikasi,
  showCatatanById,
  showCatatanByTipe,
} from "../controllers/Show.js";
import { createPendampingan } from "../controllers/Pendampingan.js";
import {
  createAudit,
  deleteAudit,
  getAudit,
  getAuditbytipe,
  setujuUsulanAudit,
  showAudit,
  showAuditbyId,
  showAuditbytipe,
  showUsulan,
} from "../controllers/Audit.js";

const router = express.Router();

router.get("/users", getUsers);
router.post("/users", Register);
router.post("/login", Login);
router.get("/token", refreshToken);
router.delete("/logout", verifyToken, Logout);
router.delete("/users/:id", deleteUser);
router.put("/users/:id", updateUser);
router.get("/users/:id", getUsersbyId);

// usulan
router.get("/usulan", getUsulanAplikasi);
router.post(
  "/usulan",
  upload.fields([
    { name: "surat_skpd", maxCount: 1 },
    { name: "lampiran_kak", maxCount: 1 },
  ]),
  createUsulanAplikasi
);
router.get("/usulan/:id", getUsulanAplikasiById);
router.get("/usulan/show", verifyToken, showUsulan);
router.get("/usulanver/:tipe", getUsulanWithVerifikasiandUserWithTipe);
router.get("/usulanver", getUsulanWithVerifikasiandUser);
router.get("/verifikasi/:id/full", fullUsulanWithVerifikasiandUserbyId);
router.delete("/usulan/:id", verifyToken, deleteUsulanAplikasi);

// Verifikasi
router.post("/verifikasi", createVerifikasi);
router.post("/verifikasi/:id/detail", klikDetailUsulan);
router.post("/verifikasi/:id/setuju", setujuUsulan);
router.get("/verifikasi/:id/show", getUsulanWithVerifikasiandUserbyId);

// Dokumen
router.post("/dokumen", createDokumen);
router.get("/dokumen/cetak/:id", cetakDokumen);

// Pendampingan
router.post("/pendampingan", createPendampingan);

// Show
router.get("/show/:id/:tipe", showCatatanById);
router.get("/show/:id/:tipe/catatan", showCatatanByTipe);

// Audit
router.get("/audit", showAudit);
router.get("/audit/:tipe", showAuditbytipe);
router.get("/audit/:id", showAuditbyId);
router.put("/audit/:id/setuju", setujuUsulanAudit);
router.get("/admin/audit", getAudit);
router.get("/admin/audit/:tipe", getAuditbytipe);
router.post("/audit", upload.single("surat_skpd"), createAudit);
router.put("/audit/:id", upload.single("surat_skpd"), createAudit);
router.put("/audit/:id", deleteAudit);

export default router;
