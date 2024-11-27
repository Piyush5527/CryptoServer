import dotenv from "dotenv";
dotenv.config();
import express from "express";
import bodyParser from "body-parser";
const app = express();
const PORT = process.env.PORT || 3000;
import models from "./models/index.js";
import users from "./routes/users.js";
import errorHandler from "./middleware/error-handler-middleware.js";


//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorHandler);

//routes
app.use("/users", users);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});