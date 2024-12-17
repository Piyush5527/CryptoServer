import fs from "fs";
import path from "path";
import { Sequelize } from "sequelize";
import { fileURLToPath, pathToFileURL } from "url";
import process from "process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const basename = path.basename(__filename);
const configPath = path.resolve(__dirname, "../config/config.json");
const configData = JSON.parse(fs.readFileSync(configPath, "utf-8"));
const env = process.env.NODE_ENV || "development";

console.log(`Running in environment: ${env}`);

const config = configData[env];
const db = {};
let sequelize;

// Initialize Sequelize instance
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const initializeModels = async () => {
  // Read all the model files in the directory except the current file
  const files = fs.readdirSync(__dirname)
      .filter(file =>
          file.indexOf(".") !== 0 &&
          file !== basename &&
          file.slice(-3) === ".js" &&
          file.indexOf(".test.js") === -1
      );

  // Dynamically import and initialize models
  for (const file of files) {
    const modelPath = pathToFileURL(path.join(__dirname, file)).href;
    const modelModule = await import(modelPath);
    const model = modelModule.default || modelModule; // Handle `default` or `module.exports`
    const modelInstance = model(sequelize, Sequelize.DataTypes);
    db[modelInstance.name] = modelInstance;
  }

  // Set up associations between models
  Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  // Attach Sequelize instance and Sequelize library to db object
  db.sequelize = sequelize;
  db.Sequelize = Sequelize;
};

await initializeModels();

export default db; // Export at the **top level**
