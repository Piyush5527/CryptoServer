import dotenv from "dotenv";
dotenv.config();
import express from "express";
import db from "./config/db.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
