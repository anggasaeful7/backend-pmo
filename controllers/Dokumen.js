import fs from "fs";
import path, { dirname } from "path";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import Dokumen from "../models/DokumenModel.js";
import { fileURLToPath } from "url";

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

export const cetakDokumen = async (req, res) => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    // Navigasi dari controllers ke public
    const filePath = path.resolve(
      __dirname,
      "..",
      "public",
      "template",
      "Surat_Rekomendasi_Usulan_Pembuatan_Aplikasi_PENGAJUAN_0004.docx"
    );

    // Baca isi file
    const content = fs.readFileSync(filePath, "binary");
    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    // Sample data to be replaced in the document
    const data = {
      nama: "John",
      nip: "Doe",
      jabatan: "0652455478",
      status: "New Website",
      nama_aplikasi: "New Website",
    };

    doc.render(data);

    const buf = doc.getZip().generate({
      type: "nodebuffer",
      compression: "DEFLATE",
    });

    const outputFilePath = path.resolve(
      __dirname,
      "..",
      "public",
      "dokumen",
      "surat"
    );
    fs.writeFileSync(outputFilePath, buf);

    res.download(outputFilePath, "output.docx");
  } catch (error) {
    console.error("Error processing document:", error.message);
    res.status(500).send("Internal Server Error");
  }
};
