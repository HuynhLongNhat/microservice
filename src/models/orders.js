const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  const orders = sequelize.define(
    "orders",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      customer_name: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      customer_email: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      total_amount: {
        type: DataTypes.DECIMAL(10, 0),
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "orders",
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
  orders.associate = (models) => {
    orders.hasMany(models.orders_reports, {
      as: "orders_reports",
      foreignKey: "order_id",
    });
  };
  return orders;
};
