import { Sequelize } from "sequelize";

import { dbConfig } from "../config/config";

const sequelizeConnection = new Sequelize(
    dbConfig.database as string,
    dbConfig.username as string,
    dbConfig.password,
    {
        host: dbConfig.host,
        port: dbConfig.port,
        dialect: dbConfig.dialect,
    }
);

export default sequelizeConnection;
