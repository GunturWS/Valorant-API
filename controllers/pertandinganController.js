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
