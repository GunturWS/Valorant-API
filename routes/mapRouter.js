import { Router } from "express";
import { getAllMap } from "../controllers/mapController.js";

const mapRouter = Router();

mapRouter.get("/", getAllMap);

export default mapRouter;
