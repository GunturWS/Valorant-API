import db from "../configs/connections.js";
import { errorServer } from "../utils/errorRes.js";

export const getAllStatus = (req, res) => {
  try {
    db.query("CALL get_all_status();", (err, results) => {
      res.status(200).json({
        status: "success",
        payload: results[0],
      });
    });
  } catch (error) {
    errorServer(res, error);
  }
};

export const getStatusById = (req, res) => {
  const { status_id } = req.params;
  db.query(`CALL select_status(${status_id})`, (err, results) => {
    if (err) {
      res.status(500).json({
        status: "error",
        message: "Gagal mengambil Status",
        error: err.message,
      });
    } else {
      if (results[0].length > 0) {
        res.json({
          status: "success",
          message: `Member Status ID ${status_id} berhasil ditemukan`,
          payload: results[0][0],
        });
      } else {
        res.status(404).json({
          status: "error",
          message: `Member Status ID ${status_id} tidak ditemukan`,
        });
      }
    }
  });
};

export const insertStatus = (req, res) => {
  const { body } = req;
  try {
    db.query(`CALL insert_status ('${body.id_status}', '${body.status}')`, (err, results) => {
      res.status(201).json({
        status: "success",
        message: "Create new hero succesfully",
      });
    });
  } catch (error) {
    errorServer(res, error);
  }
};

export const updateStatus = (req, res) => {
  const { body } = req;

  if (!body.id_status) {
    return res.status(400).json({
      status: "error",
      message: "ID Player harus disertakan untuk melakukan pembaruan",
    });
  }

  try {
    db.query(
      `UPDATE status SET
      status = '${body.status}'
      WHERE id_status = '${body.id_status}'`,
      (updateErr, updateResults) => {
        if (updateErr) {
          return errorServer(res, updateErr);
        }

        const rowCount = updateResults.affectedRows;

        if (rowCount === 0) {
          return res.status(404).json({
            status: "error",
            message: "ID Status tidak ditemukan",
          });
        }

        res.status(200).json({
          status: "success",
          message: "Data Status Berhasil di Update",
        });
      }
    );
  } catch (error) {
    errorServer(res, error);
  }
};

export const deleteStatus = (req, res) => {
  const { body } = req;
  try {
    db.query(`CALL delete_status('${body.id_status}')`, (err, results) => {
      res.status(200).json({
        status: "success",
        message: "ID Berhasil di Delete",
      });
    });
  } catch (error) {
    errorServer(res, error);
  }
};
