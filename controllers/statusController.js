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

// export const updatePlayer = (req, res) => {
//   const { body } = req;
//   try {
//     db.query(
//       `CALL update_player('${body.id_player}', '${body.nickname}', '${body.ACS}', '${body.kills}', '${body.deaths}', '${body.assists}')`,
//       (err, results) => {
//         res.status(200).json({
//           status: "success",
//           message: "Data Player Berhasil di Update ",
//         });
//       }
//     );
//   } catch (error) {
//     errorServer(res, error);
//   }
// };

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
