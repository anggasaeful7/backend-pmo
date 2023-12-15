import express from "express";
import { getUsers, Register, Login, Logout } from "../controllers/Users.js";
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
import { createDokumen } from "../controllers/Dokumen.js";
import { showUsulanAplikasi } from "../controllers/Show.js";

const router = express.Router();

router.get("/users", verifyToken, getUsers);
router.post("/users", Register);
router.post("/login", Login);
router.get("/token", refreshToken);
router.delete("/logout", Logout);

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
router.get("/usulan/show", verifyToken, showUsulanAplikasi);
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

export default router;
