const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  const users = sequelize.define(
    "users",
    {
      IdUser: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      UserName: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      Password: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      Token: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "users",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "IdUser" }],
        },
      ],
    }
  );
  return users;
};
