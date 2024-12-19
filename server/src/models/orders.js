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
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        field: "created_at",
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: "updated_at",
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
    orders.hasMany(models.order_reports, {
      as: "order_reports",
      foreignKey: "order_id",
    });
    orders.hasMany(models.other_items, {
      as: "other_items",
      foreignKey: "order_id",
    });
  };
  return orders;
};
