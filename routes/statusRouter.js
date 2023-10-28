import { Router } from "express";
import { deleteStatus, getAllStatus, insertStatus } from "../controllers/statusController.js";

const statusRouter = Router();

statusRouter.get("/", getAllStatus);
statusRouter.post("/", insertStatus);
statusRouter.delete("/", deleteStatus);

export default statusRouter;
