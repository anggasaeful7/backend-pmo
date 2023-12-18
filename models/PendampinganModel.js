import { DataTypes } from "sequelize";
import sequelize from "../config/Database.js";

const Pendampingan = sequelize.define(
  "Pendampingan",
  {
    id_pendampingan: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    api: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    api_lainnya: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fungsional: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fungsional_lainnya: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pentest: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pentest_lainnya: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
  }
);

export default Pendampingan;
