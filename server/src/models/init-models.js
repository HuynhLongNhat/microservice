var DataTypes = require("sequelize").DataTypes;
var _order_reports = require("./order_reports");
var _orders = require("./orders");
var _other_items = require("./other_items");
var _product_reports = require("./product_reports");
var _products = require("./products");
var _users = require("./users");

function initModels(sequelize) {
  var order_reports = _order_reports(sequelize, DataTypes);
  var orders = _orders(sequelize, DataTypes);
  var other_items = _other_items(sequelize, DataTypes);
  var product_reports = _product_reports(sequelize, DataTypes);
  var products = _products(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  product_reports.belongsTo(order_reports, {
    as: "order_report",
    foreignKey: "order_report_id",
  });
  product_reports.belongsTo(products, {
    as: "product",
    foreignKey: "product_id",
  });
  order_reports.hasMany(product_reports, {
    as: "product_reports",
    foreignKey: "order_report_id",
  });
  order_reports.belongsTo(orders, { as: "order", foreignKey: "order_id" });
  orders.hasMany(order_reports, {
    as: "order_reports",
    foreignKey: "order_id",
  });
  orders.hasMany(other_items, { as: "other_items", foreignKey: "order_id" });
  other_items.belongsTo(orders, { as: "order", foreignKey: "order_id" });
  other_items.belongsTo(products, { as: "product", foreignKey: "product_id" });
  products.hasMany(other_items, {
    as: "other_items",
    foreignKey: "product_id",
  });
  products.hasMany(product_reports, {
    as: "product_reports",
    foreignKey: "product_id",
  });

  return {
    order_reports,
    orders,
    other_items,
    product_reports,
    products,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
