import db from "../configs/connections.js";
import { errorServer } from "../utils/errorRes.js";

export const getAllPertandingan = (req, res) => {
  const { body } = req;
  try {
    db.query("CALL get_all_pertandingans();", (err, results) => {
      res.status(200).json({
        status: "success",
        payload: results[0],
      });
    });
  } catch (error) {
    errorServer(res, error);
  }
};

export const getPertandinganById = (req, res) => {
  const { pertandingan_id } = req.params;
  db.query(`CALL select_pertandingan(${pertandingan_id})`, (err, results) => {
    if (err) {
      res.status(500).json({
        status: "error",
        message: "Gagal mengambil member",
        error: err.message,
      });
    } else {
      if (results[0].length > 0) {
        res.json({
          status: "success",
          message: `Agent ID ${pertandingan_id} berhasil ditemukan`,
          payload: results[0][0], // Mengambil data pertama dari hasil
        });
      } else {
        res.status(404).json({
          status: "error",
          message: `Agent ID ${pertandingan_id} tidak ditemukan`,
        });
      }
    }
  });
};

export const insertPertandingan = (req, res) => {
  const { body } = req;
  try {
    db.query(
      `CALL insert_pertandingan('${body.id_pertandingan}', '${body.pertandingan}')`,
      (err, results) => {
        res.status(201).json({
          status: "success",
          message: "Create new hero succesfully",
        });
      }
    );
  } catch (error) {
    errorServer(res, error);
  }
};

export const updatePertandingan = (req, res) => {
  const { body } = req;

  // Pastikan ID yang diberikan ada
  if (!body.id_pertandingan) {
    return res.status(400).json({
      status: "error",
      message: "ID Player harus disertakan untuk melakukan pembaruan",
    });
  }

  try {
    // Lakukan pembaruan dan periksa berapa banyak baris yang terpengaruh
    db.query(
      `UPDATE pertandingan SET
      pertandingan = '${body.pertandingan}'
      WHERE id_pertandingan = '${body.id_pertandingan}'`,
      (updateErr, updateResults) => {
        if (updateErr) {
          return errorServer(res, updateErr);
        }

        // Periksa apakah ada baris yang diperbarui
        const rowCount = updateResults.affectedRows;

        if (rowCount === 0) {
          // ID Player tidak ditemukan
          return res.status(404).json({
            status: "error",
            message: "ID Player tidak ditemukan",
          });
        }

        res.status(200).json({
          status: "success",
          message: "Data Player Berhasil di Update",
        });
      }
    );
  } catch (error) {
    errorServer(res, error);
  }
};
