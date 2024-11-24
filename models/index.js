import fs from "fs";
import path from "path";
import { Sequelize } from "sequelize";
import { fileURLToPath } from "url";
import process from "process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const basename = path.basename(__filename);
const configPath = path.resolve(__dirname, "../config/config.json");
const configData = JSON.parse(fs.readFileSync(configPath, "utf-8"));
const config = configData[process.env.NODE_ENV || "development"];

const db = {};
let sequelize;

// Initialize Sequelize instance
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Dynamically load models
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach(async (file) => {
    const modelPath = path.join("file:",__dirname, file);
    const model = await import(modelPath); // Dynamically import the model
    const modelInstance = model.default(sequelize, Sequelize.DataTypes); // Invoke the model function
    db[modelInstance.name] = modelInstance; // Add the model to db
  });

// Set associations if defined
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Add sequelize and Sequelize to db object
db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
