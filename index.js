import dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
const PORT = process.env.PORT || 3000;
import models from "./models/index.js";

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});