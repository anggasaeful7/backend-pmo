import { DataTypes } from "sequelize";
import sequelize from "../config/Database.js";

const Pendampingan = sequelize.define(
  "Pendampingan",
  {
    id_usulan: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    api: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    api_lainnya: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fungsional: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fungsional_lainnya: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pentest: {
      type: DataTypes.STRING,
      allowNull: true,
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
