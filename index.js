import express from "express";
import cors from "cors";
import db from "./configs/connections.js";
import { config } from "dotenv";
import bodyParser from "body-parser";
import playerRouter from "./routes/playerRouter.js";
import agentRouter from "./routes/agentRouter.js";
import statusRouter from "./routes/statusRouter.js";
import mapRouter from "./routes/mapRouter.js";
import pertandinganRouter from "./routes/pertandinganRouter.js";

config();
const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());
app.use("/api/valorant/players", playerRouter);
app.use("/api/valorant/agents", agentRouter);
app.use("/api/valorant/status", statusRouter);
app.use("/api/valorant/maps", mapRouter);
app.use("/api/valorant/pertandingans", pertandinganRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${2000}/api/v1`);
  db.connect((er) => {
    if (er) throw er;
    console.log("database terhubung");
  });
});
