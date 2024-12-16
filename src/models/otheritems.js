const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "otheritems",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      order_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      product_name: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      unit_price: {
        type: DataTypes.DECIMAL(10, 0),
        allowNull: true,
      },
      total_price: {
        type: DataTypes.DECIMAL(10, 0),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "otheritems",
      timestamps: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
      ],
    }
  );
};
