import { Router } from "express";
import { getPlayerView } from "../controllers/viewController.js";

const viewRouter = Router();

// viewRouter.get("/", getPlayerKD);
viewRouter.get("/", getPlayerView);

export default viewRouter;
