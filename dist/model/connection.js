"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = require("../config/config");
const sequelizeConnection = new sequelize_1.Sequelize(config_1.dbConfig.database, config_1.dbConfig.username, config_1.dbConfig.password, {
    host: config_1.dbConfig.host,
    port: config_1.dbConfig.port,
    dialect: config_1.dbConfig.dialect,
});
exports.default = sequelizeConnection;
//# sourceMappingURL=connection.js.map