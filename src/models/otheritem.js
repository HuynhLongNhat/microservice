"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OtherItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Mỗi OtherItem thuộc về một Order
      OtherItem.belongsTo(models.Order, {
        foreignKey: "order_id", // Khóa ngoại trong bảng OtherItem
        as: "order", // Alias khi truy vấn
      });

      // Mỗi OtherItem thuộc về một Product
      OtherItem.belongsTo(models.Product, {
        foreignKey: "product_id", // Khóa ngoại trong bảng OtherItem
        as: "product", // Alias khi truy vấn
      });
    }
  }
  OtherItem.init(
    {
      order_id: DataTypes.INTEGER,
      product_id: DataTypes.INTEGER,
      product_name: DataTypes.STRING,
      quantity: DataTypes.INTEGER,
      unit_price: DataTypes.DECIMAL,
      total_price: DataTypes.DECIMAL,
    },
    {
      sequelize,
      modelName: "OtherItem",
    }
  );
  return OtherItem;
};
