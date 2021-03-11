import fs from "fs";
import path from "path";
const config = require('../config/config.js');
import { Sequelize } from "sequelize";


const basename = path.basename(__filename);
const db = {};
const sequelize = new Sequelize(config.database, config.username, config.password,{
    host: config.host,
    dialect: config.dialect,
} );

fs.readdirSync(__dirname)
    .filter(
        (file) => file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    )
    .forEach((file) => {
        const model = require(path.join(__dirname, file))(sequelize);
        db[model.name] = model;
    });

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

try {
    sequelize.authenticate()
    console.log('DB connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

export default db;
