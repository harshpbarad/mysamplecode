import { DataTypes, Model } from "sequelize";
import sequelizeConnection from "../connection";

class User extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public mobile!: string;

  public status!: boolean;

  public readonly created_at!: Date;
  public readonly last_updated!: Date;

  static validPassword: (password: string, hash: string) => boolean;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING,
    },
    last_name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.INTEGER,
      defaultValue: 2,
    },
    isMailVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
  },
  {
    sequelize: sequelizeConnection,
    tableName: "users",
    createdAt: "created_at",
    updatedAt: "last_updated",
  }
);

User.validPassword = (password: string, userPassword: string) => {
  if (password === userPassword) {
    return true
  } else {
    return false
  }
};

export default User;
