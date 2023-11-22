import db from "../configs/connections.js";
import { errorServer } from "../utils/errorRes.js";
// import playerModel from "../models/playerModel.js";

export const getAllPlayer = (req, res) => {
  try {
    db.query("CALL get_all_players();", (err, results) => {
      res.status(200).json({
        status: "success",
        payload: results[0],
      });
    });
  } catch (error) {
    errorServer(res, error);
  }
};

export const getPlayerById = (req, res) => {
  const { player_id } = req.params;
  db.query(`CALL select_player(${player_id})`, (err, results) => {
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
          message: `Member dengan ID ${player_id} berhasil ditemukan`,
          payload: results[0][0], // Mengambil data pertama dari hasil
        });
      } else {
        res.status(404).json({
          status: "error",
          message: `Member dengan ID ${player_id} tidak ditemukan`,
        });
      }
    }
  });
};

export const insertPlayer = (req, res) => {
  const { body } = req;
  try {
    db.query(
      `CALL insert_player ('${body.id_player}', '${body.nickname}', '${body.ACS}', '${body.kills}', '${body.deaths}', '${body.assists}')`,
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

export const updatePlayer = (req, res) => {
  const { body } = req;

  // Pastikan ID yang diberikan ada
  if (!body.id_player) {
    return res.status(400).json({
      status: "error",
      message: "ID Player harus disertakan untuk melakukan pembaruan",
    });
  }

  try {
    // Lakukan pembaruan dan periksa berapa banyak baris yang terpengaruh
    db.query(
      `UPDATE player SET
       nickname = '${body.nickname}',
       ACS = '${body.ACS}',
       kills = '${body.kills}',
       deaths = '${body.deaths}',
       assists = '${body.assists}'
       WHERE id_player = '${body.id_player}'`,
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

export const deletePlayer = (req, res) => {
  const { params } = req;
  const playerId = params.p_player_id;

  // Pastikan ID yang diberikan ada
  if (!playerId) {
    return res.status(400).json({
      status: "error",
      message: "ID Player harus disertakan untuk melakukan penghapusan",
    });
  }

  try {
    // Lakukan penghapusan
    db.query(`CALL delete_player('${playerId}')`, (deleteErr, deleteResults) => {
      if (deleteErr) {
        return errorServer(res, deleteErr);
      }

      // Periksa apakah ada baris yang dihapus
      const rowCount = deleteResults.affectedRows;

      if (rowCount === 0) {
        // ID Player tidak ditemukan
        return res.status(404).json({
          status: "error",
          message: "ID Player tidak ditemukan",
        });
      }

      res.status(200).json({
        status: "success",
        message: "Data Player Berhasil di Hapus",
      });
    });
  } catch (error) {
    errorServer(res, error);
  }
};
