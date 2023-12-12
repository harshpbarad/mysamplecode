import sequelizeConnection from "./connection";
import User from "./models/User";

const isDev = process.env.NODE_ENV === "development";

export const modelList = {
  User,
};

const dbInit = async () => {
  try {
    await sequelizeConnection.sync({ alter: isDev });
    return { success: true };
  } catch (error) {
    throw error;
  }
};
export default dbInit;
