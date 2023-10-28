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
