import db from "../configs/connections.js";
import { errorServer } from "../utils/errorRes.js";

export const getAllMap = (req, res) => {
  const { body } = req;
  try {
    db.query("CALL get_all_maps();", (err, results) => {
      res.status(200).json({
        status: "success",
        payload: results[0],
      });
    });
  } catch (error) {
    errorServer(res, error);
  }
};

export const getMapById = (req, res) => {
  const { map_id } = req.params;
  db.query(`CALL select_map(${map_id})`, (err, results) => {
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
          message: `Agent ID ${map_id} berhasil ditemukan`,
          payload: results[0][0],
        });
      } else {
        res.status(404).json({
          status: "error",
          message: `Agent ID ${map_id} tidak ditemukan`,
        });
      }
    }
  });
};

export const insertMap = (req, res) => {
  const { body } = req;
  try {
    db.query(`CALL insert_map ('${body.id_map}', '${body.map}')`, (err, results) => {
      res.status(201).json({
        status: "success",
        message: "Create new hero succesfully",
      });
    });
  } catch (error) {
    errorServer(res, error);
  }
};

export const updateMap = (req, res) => {
  const { body } = req;

  if (!body.id_map) {
    return res.status(400).json({
      status: "error",
      message: "ID Player harus disertakan untuk melakukan pembaruan",
    });
  }

  try {
    db.query(
      `UPDATE map SET
      map = '${body.map}'
      WHERE id_map = '${body.id_map}'`,
      (updateErr, updateResults) => {
        if (updateErr) {
          return errorServer(res, updateErr);
        }

        const rowCount = updateResults.affectedRows;

        if (rowCount === 0) {
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

export const deleteMap = (req, res) => {
  const { body } = req;
  try {
    db.query(`CALL delete_map('${body.id_map}')`, (err, results) => {
      res.status(200).json({
        status: "success",
        message: "ID Behasil di Delete",
      });
    });
  } catch (error) {
    errorServer(res, error);
  }
};
