const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  const order_reports = sequelize.define(
    "order_reports",
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
        references: {
          model: "orders",
          key: "id",
        },
      },
      total_revenue: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      total_cost: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      total_profit: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "order_reports",
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
  order_reports.associate = (models) => {
    order_reports.hasMany(models.product_reports, {
      as: "product_reports",
      foreignKey: "order_report_id",
    });
    order_reports.belongsTo(models.orders, {
      as: "order",
      foreignKey: "order_id",
    });
  };
  return order_reports;
};
