const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  const other_items = sequelize.define(
    "other_items",
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
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "products",
          key: "id",
        },
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
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      total_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "other_items",
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
        {
          name: "product_id",
          using: "BTREE",
          fields: [{ name: "product_id" }],
        },
      ],
    }
  );
  other_items.associate = (models) => {
    other_items.belongsTo(models.orders, {
      as: "order",
      foreignKey: "order_id",
    });
    other_items.belongsTo(models.products, {
      as: "product",
      foreignKey: "product_id",
    });
  };
  return other_items;
};
