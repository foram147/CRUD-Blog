import express from "express";
import cors from "cors";
import authorsRouter from "./authors/authors.js";

const server = express();
const port = 3000;

server.use(cors());
server.use(express.json());
server.use("/authors", authorsRouter);
server.listen(port, () => {
  console.log(`server is running on ${port}`);
});
