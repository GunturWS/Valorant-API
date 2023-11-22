import { Router } from "express";
import { getPlayerKD } from "../controllers/viewController.js";

const viewRouter = Router();

viewRouter.get("/", getPlayerKD);

export default viewRouter;
