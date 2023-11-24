import db from "../configs/connections.js";
import { errorServer } from "../utils/errorRes.js";

// export const getPlayerKD = (req, res) => {
//   try {
//     db.query("SELECT * FROM player_kd_view", (error, results, fields) => {
//       if (error) {
//         res.status(500).json({
//           status: "error",
//           message: "Internal Server Error",
//         });
//         throw error;
//       }

//       res.json({
//         status: "success",
//         data: results,
//       });
//     });
//   } catch (error) {
//     errorServer(res, error);
//   }
// };

export const getPlayerView = (req, res) => {
  try {
    db.query("SELECT * FROM player_map_view", (error, results, fields) => {
      if (error) {
        res.status(500).json({
          status: "error",
          message: "Internal Server Error",
        });
        throw error;
      }

      res.json({
        status: "success",
        data: results,
      });
    });
  } catch (error) {
    errorServer(res, error);
  }
};