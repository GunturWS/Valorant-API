import { Router } from "express";
import {
  deleteAgent,
  getAgentById,
  getAllAgent,
  insertAgent,
  updateAgent,
} from "../controllers/agentController.js";

const agentRouter = Router();

agentRouter.get("/", getAllAgent);
agentRouter.get("/:agent_id", getAgentById);
agentRouter.post("/", insertAgent);
agentRouter.put("/", updateAgent);
agentRouter.delete("/", deleteAgent);

export default agentRouter;
