import db from "../configs/connections.js";
import { errorServer } from "../utils/errorRes.js";

export const getAllAgent = (req, res) => {
  const { body } = req;
  try {
    db.query("CALL get_all_agents();", (err, results) => {
      res.status(200).json({
        status: "success",
        payload: results[0],
      });
    });
  } catch (error) {
    errorServer(res, error);
  }
};

export const getAgentById = (req, res) => {
  const { agent_id } = req.params;
  db.query(`CALL select_agent(${agent_id})`, (err, results) => {
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
          message: `Agent ID ${agent_id} berhasil ditemukan`,
          payload: results[0][0],
        });
      } else {
        res.status(404).json({
          status: "error",
          message: `Agent ID ${agent_id} tidak ditemukan`,
        });
      }
    }
  });
};

export const insertAgent = (req, res) => {
  const { body } = req;
  try {
    db.query(
      `CALL insert_agent ('${body.id_agent}', '${body.agent}', '${body.country}')`,
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

export const updateAgent = (req, res) => {
  const { body } = req;

  if (!body.id_agent) {
    return res.status(400).json({
      status: "error",
      message: "ID Player harus disertakan untuk melakukan pembaruan",
    });
  }

  try {
    db.query(
      `UPDATE agent SET
      agent = '${body.agent}',
      country = '${body.country}'
      WHERE id_agent = '${body.id_agent}'`,
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

export const deleteAgent = (req, res) => {
  const { body } = req;
  try {
    db.query(`CALL delete_agent('${body.id_agent}')`, (err, results) => {
      if (err) {
        errorServer(res, err);
      } else if (results.affectedRows === 0) {
        res.status(404).json({
          status: "error",
          message: "Data sudah tidak ada",
        });
      } else {
        res.status(200).json({
          status: "success",
          message: "ID Berhasil di Delete",
        });
      }
    });
  } catch (error) {
    errorServer(res, error);
  }
};
