import { Router } from "express";
import {
  deleteStatus,
  getAllStatus,
  getStatusById,
  insertStatus,
  updateStatus,
} from "../controllers/statusController.js";

const statusRouter = Router();

statusRouter.get("/", getAllStatus);
statusRouter.get("/:status_id", getStatusById);
statusRouter.post("/", insertStatus);
statusRouter.put("/", updateStatus);
statusRouter.delete("/", deleteStatus);

export default statusRouter;
