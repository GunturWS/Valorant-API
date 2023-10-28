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

// export const insertAgent = (req, res) => {
//   const { body } = req;
//   try {
//     // Cek apakah data sudah ada dalam database
//     db.query(`SELECT id_agent FROM agent WHERE id_agent = ('${body.id_agent}')`, (err, results) => {
//       if (err) {
//         errorServer(res, err);
//       } else {
//         if (results.length > 0) {
//           // Data sudah ada, kirim respons dengan pesan "Data Sudah Ditambahkan"
//           res.status(400).json({
//             status: "error",
//             message: "Data Sudah Ditambahkan",
//           });
//         } else {
//           // Data belum ada, lakukan penyisipan data
//           db.query(
//             `CALL insert_agent ('${body.id_agent}', '${body.agent}', '${body.country}')`,
//             (err, results) => {
//               if (err) {
//                 errorServer(res, err);
//               } else {
//                 res.status(201).json({
//                   status: "success",
//                   message: "Create new hero successfully",
//                 });
//               }
//             }
//           );
//         }
//       }
//     });
//   } catch (error) {
//     errorServer(res, error);
//   }
// };

// export const updateAgent = (req, res) => {
//   const { body } = req;
//   try {
//     db.query(
//       `CALL update_agent('${body.id_agent}', '${body.agent}', '${body.country}');`,
//       (err, results) => {
//         if (err) {
//           // Handle any errors that occur during the query
//           errorServer(res, err);
//         } else {
//           if (results.affectedRows === 0) {
//             // No data was updated, meaning the data doesn't exist
//             res.status(404).json({
//               status: "error",
//               message: "Data sudah tidak ada",
//             });
//           } else {
//             // Data was successfully updated
//             res.status(200).json({
//               status: "success",
//               message: "Update Berhasil",
//             });
//           }
//         }
//       }
//     );
//   } catch (error) {
//     // Handle other types of errors
//     errorServer(res, error);
//   }
// };

export const updateAgent = (req, res) => {
  const { body } = req;
  try {
    db.query(
      `CALL update_agent('${body.id_agent}', '${body.agent}', '${body.country}');`,
      (err, results) => {
        res.status(200).json({
          status: "success",
          message: "Update Berhasil",
        });
      }
    );
  } catch (error) {
    errorServer(res, error);
  }
};

// export const updateAgent = (req, res) => {
//   const { body } = req;
//   try {
//     db.query(
//       `CALL update_agent('${body.id_agent}', '${body.agent}', '${body.country}');`,
//       (err, results) => {
//         if (err) {
//           errorServer(res, err);
//         } else if (results.affectedRows === 0) {
//           res.status(404).json({
//             status: "error",
//             message: "Data sudah tidak ada",
//           });
//         } else {
//           res.status(200).json({
//             status: "success",
//             message: "Update Berhasil",
//           });
//         }
//       }
//     );
//   } catch (error) {
//     errorServer(res, error);
//   }
// };

export const deleteAgent = (req, res) => {
  const { body } = req;
  try {
    db.query(`CALL delete_agent('${body.id_agent}')`, (err, results) => {
      res.status(200).json({
        status: "success",
        message: "ID Berhasil di Delete",
      });
    });
  } catch (error) {
    errorServer(res, error);
  }
};

// export const deleteAgent = (req, res) => {
//   const { body } = req;
//   try {
//     db.query(`CALL delete_agent('${body.id_agent}')`, (err, results) => {
//       if (err) {
//         // Error occurred during the database query
//         errorServer(res, err);
//       } else if (results.affectedRows === 0) {
//         // No data was deleted, meaning the data doesn't exist
//         res.status(404).json({
//           status: "error",
//           message: "Data sudah tidak ada",
//         });
//       } else {
//         // Data was successfully deleted
//         res.status(200).json({
//           status: "success",
//           message: "ID Berhasil di Delete",
//         });
//       }
//     });
//   } catch (error) {
//     // Handle other types of errors
//     errorServer(res, error);
//   }
// };
