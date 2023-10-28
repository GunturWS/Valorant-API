import { Router } from "express";
import {
  insertPlayer,
  getAllPlayer,
  deletePlayer,
  updatePlayer,
} from "../controllers/playerController.js";

const playerRouter = Router();

playerRouter.get("/", getAllPlayer);
playerRouter.post("/", insertPlayer);
playerRouter.put("/", updatePlayer);
playerRouter.delete("/", deletePlayer);

export default playerRouter;
