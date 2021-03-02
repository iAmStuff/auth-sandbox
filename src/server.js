import express from "express";
import authRouter from "./modules/authRouter.js";
import { connect, disconnect } from "./database.js";

connect();
const server = express();
const PORT = 5000;

server.use(express.json());
server.use("/auth", authRouter);

server.use("*", (req, res) => {
  return res.status(404).json({ error: "Route not found" });
});

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
