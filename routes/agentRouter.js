import { Router } from "express";
import { deleteAgent, getAllAgent, insertAgent, updateAgent } from "../controllers/agentController.js";

const agentRouter = Router();

agentRouter.get("/", getAllAgent);
agentRouter.post("/", insertAgent);
agentRouter.put("/", updateAgent);
agentRouter.delete("/", deleteAgent);

export default agentRouter;
