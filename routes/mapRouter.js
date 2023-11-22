import { Router } from "express";
import {
  deleteMap,
  getAllMap,
  getMapById,
  insertMap,
  updateMap,
} from "../controllers/mapController.js";

const mapRouter = Router();

mapRouter.get("/", getAllMap);
mapRouter.get("/:map_id", getMapById);
mapRouter.post("/", insertMap);
mapRouter.put("/", updateMap);
mapRouter.delete("/", deleteMap);

export default mapRouter;
