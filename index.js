import dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
const PORT = process.env.PORT || 3000;
import users from "./routes/users.js";
import errorHandler from "./middleware/error-handler-middleware.js";
import cors from "cors";
import corsOption from "./config/cors-config.js";

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOption));


//routes
app.use("/users", users);

//Global Error Handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


