import { Router } from "express";
import {
  getAllPertandingan,
  getPertandinganById,
  insertPertandingan,
  updatePertandingan,
} from "../controllers/pertandinganController.js";

const pertandinganRouter = Router();

pertandinganRouter.get("/", getAllPertandingan);
pertandinganRouter.get("/:pertandingan_id", getPertandinganById);
pertandinganRouter.post("/", insertPertandingan);
pertandinganRouter.put("/", updatePertandingan);

export default pertandinganRouter;
