import fs from "fs";
import path, { dirname } from "path";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import Dokumen from "../models/DokumenModel.js";
import { fileURLToPath } from "url";
import axios from "axios";

export const createDokumen = async (req, res) => {
  try {
    const { id_usulan, id_verifikasi, tipe, nama, nip, jabatan, status } =
      req.body;
    const dokumen = await Dokumen.create({
      id_usulan: id_usulan,
      id_verifikasi: id_verifikasi,
      tipe: tipe,
      nama: nama,
      nip: nip,
      jabatan: jabatan,
      status: status,
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
    const id = req.params.id;
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

    const udata = await axios.get(`http://localhost:1212/verifikasi/4/full`);

    const circularReplacer = () => {
      const seen = new WeakSet();
      return (key, value) => {
        if (typeof value === "object" && value !== null) {
          if (seen.has(value)) {
            return "[Circular]";
          }
          seen.add(value);
        }
        return value;
      };
    };

    // Check if the necessary properties exist before accessing nested properties

    const udataString = JSON.stringify(udata.data.data, circularReplacer());
    const parsedUdata = JSON.parse(udataString);

    // res.json({
    //   udata: parsedUdata.verifikasi_aplikasis[1].catatan,
    // });

    // Sample data to be replaced in the document
    const data = {
      nama: parsedUdata.verifikasi_aplikasis[0].dokumens[0].nama || "",
      nip: parsedUdata.verifikasi_aplikasis[0].dokumens[0].nip || "",
      jabatan: parsedUdata.verifikasi_aplikasis[0].dokumens[0].jabatan || "",
      status: parsedUdata.verifikasi_aplikasis[11].status || "",
      nama_aplikasi: parsedUdata.nama_aplikasi || "",
      id: parsedUdata.id || "",
      tanggal: Date.now(),
      skpd: parsedUdata.user.skpd || "",
      nama_opd: parsedUdata.user.nama || "",
      no_hp: parsedUdata.user.no_hp || "",
      catatan_kelayakan: parsedUdata.verifikasi_aplikasis[1].catatan || "",
      catatan_aplikasi: parsedUdata.verifikasi_aplikasis[3].catatan || "",
      catatan_keamanan: parsedUdata.verifikasi_aplikasis[4].catatan || "",
      catatan_integrasi: parsedUdata.verifikasi_aplikasis[5].catatan || "",
      catatan_data: parsedUdata.verifikasi_aplikasis[6].catatan || "",
      catatan_infrastruktur: parsedUdata.verifikasi_aplikasis[7].catatan || "",
    };

    // Rest of your code remains unchanged

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

    res.download(outputFilePath, "SURAT REKOMENDASI TEKNIS.docx");
  } catch (error) {
    console.error("Error processing document:", error.message);
    res.status(500).send("Internal Server Error");
  }
};
