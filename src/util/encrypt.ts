import bcrypt from "bcrypt";

export const encryptSync = (password: string) => {
  return bcrypt.hashSync(password, 3);
};

export const compareSync = (password: string, hash: string) => {
  return bcrypt.compareSync(password, hash);
};