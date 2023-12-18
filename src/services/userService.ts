import { encryptSync } from "../util/encrypt";
import User from "../model/models/User";
import { Op } from "sequelize";

export const createUser = async (payload: any) => {
  payload.password = encryptSync(payload.password);
  const user = await User.create(payload);
  return user;
};

export const userExists = async (options: { email: string | null } = { email: null }) => {
  if (!options.email) {
    throw new Error("Please provide either of these options: email");
  }
  const where: any = {
    [Op.or]: [],
  };
  if (options.email) {
    where[Op.or].push({ email: options.email });
  }

  const users = await User.findAll({ where: where });
  return users.length > 0;
};

export const validatePassword = async (email: string, password: string) => {
  if (!email && !password) {
    throw new Error("Please provide email and password");
  }
  const where = {
    [Op.or]: [] as any,
  };

  if (email) {
    where[Op.or].push({ email: email });
  }

  const user: any = await User.findOne({ where });

  return User.validPassword(password, user.password);
};

export const validateAdmin = async (email: string, password: string) => {
  if (!email && !password) {
    throw new Error("Please provide email and password");
  }
  const where = {
    [Op.or]: [] as any,
  };

  if (email) {
    where[Op.or].push({ email: email });
  }

  const user: any = await User.findOne({ where });

  return User.validPassword(password, user.password);
};

export const findOneUser = async (options: any) => {
  if (!options.email && !options.id) {
    throw new Error("Please provide email");
  }
  const where = {
    [Op.or]: [] as any,
  };

  if (options.email) {
    where[Op.or].push({ email: options.email });
  }

  const user = await User.findOne({ where, attributes: { exclude: ["password"] } });
  return user;
};