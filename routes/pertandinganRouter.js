import { Router } from "express";
import { getAllPertandingan } from "../controllers/pertandinganController.js";

const pertandinganRouter = Router();

pertandinganRouter.get("/", getAllPertandingan);

export default pertandinganRouter;
