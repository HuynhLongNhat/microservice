"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Mỗi Order có nhiều OrderItem
      Order.hasMany(models.OtherItem, {
        foreignKey: "order_id", // Khóa ngoại trong bảng OtherItem
        as: "otherItems", // Alias khi truy vấn
      });
    }
  }
  Order.init(
    {
      customer_name: DataTypes.STRING,
      customer_email: DataTypes.STRING,
      total_amount: DataTypes.DECIMAL,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
