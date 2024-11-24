import { log } from "console";
import dotenv from "dotenv";
import { Sequelize } from "sequelize";

// Load environment variables
dotenv.config();

const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  dialect: 'postgres'
});

const testDbConnection = async () => {
  try {
    await sequelize.authenticate();
    log("DB connected Successfully");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export default { sq: sequelize, testDbConnection };