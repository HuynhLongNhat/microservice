const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  const product_reports = sequelize.define(
    "product_reports",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      order_report_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "order_reports",
          key: "id",
        },
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "products",
          key: "id",
        },
      },
      total_sold: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      revenue: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      cost: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      profit: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "product_reports",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
        {
          name: "order_report_id",
          using: "BTREE",
          fields: [{ name: "order_report_id" }],
        },
        {
          name: "product_id",
          using: "BTREE",
          fields: [{ name: "product_id" }],
        },
      ],
    }
  );
  product_reports.associate = (models) => {
    product_reports.belongsTo(models.order_reports, {
      as: "order_report",
      foreignKey: "order_report_id",
    });
    product_reports.belongsTo(models.products, {
      as: "product",
      foreignKey: "product_id",
    });
  };
  return product_reports;
};
