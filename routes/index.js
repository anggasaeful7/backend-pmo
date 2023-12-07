import express from "express";
import { getUsers, Register, Login, Logout } from "../controllers/Users.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import upload from "../middleware/multer.js";
import {
  createUsulanAplikasi,
  deleteUsulanAplikasi,
  getUsulanAplikasi,
  getUsulanAplikasiById,
  showUsulanAplikasi,
} from "../controllers/Usulan.js";

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
router.delete("/usulan/:id", verifyToken, deleteUsulanAplikasi);

export default router;
