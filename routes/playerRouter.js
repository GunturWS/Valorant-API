import { Router } from "express";
import {
  insertPlayer,
  getAllPlayer,
  deletePlayer,
  updatePlayer,
  getPlayerById,
} from "../controllers/playerController.js";

const playerRouter = Router();

playerRouter.get("/", getAllPlayer);
playerRouter.get("/:player_id", getPlayerById);
playerRouter.post("/", insertPlayer);
playerRouter.put("/", updatePlayer);
playerRouter.delete("/:player_id", deletePlayer);

export default playerRouter;
