const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  const orders_reports = sequelize.define(
    "orders_reports",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "orders",
          key: "id",
        },
      },
      total_revenue: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      total_cost: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      total_profit: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "orders_reports",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
        {
          name: "order_id",
          using: "BTREE",
          fields: [{ name: "order_id" }],
        },
      ],
    }
  );
  orders_reports.associate = (models) => {
    orders_reports.belongsTo(models.orders, {
      as: "order",
      foreignKey: "order_id",
    });
    orders_reports.hasMany(models.product_reports, {
      as: "product_reports",
      foreignKey: "order_report_id",
    });
  };

  return orders_reports;
};
