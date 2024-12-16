var DataTypes = require("sequelize").DataTypes;
var _orders = require("./orders");
var _orders_reports = require("./orders_reports");
var _otheritems = require("./otheritems");
var _product_reports = require("./product_reports");
var _products = require("./products");
var _users = require("./users");

function initModels(sequelize) {
  var orders = _orders(sequelize, DataTypes);
  var orders_reports = _orders_reports(sequelize, DataTypes);
  var otheritems = _otheritems(sequelize, DataTypes);
  var product_reports = _product_reports(sequelize, DataTypes);
  var products = _products(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  orders_reports.belongsTo(orders, { as: "order", foreignKey: "order_id"});
  orders.hasMany(orders_reports, { as: "orders_reports", foreignKey: "order_id"});
  product_reports.belongsTo(orders_reports, { as: "order_report", foreignKey: "order_report_id"});
  orders_reports.hasMany(product_reports, { as: "product_reports", foreignKey: "order_report_id"});
  product_reports.belongsTo(products, { as: "product", foreignKey: "product_id"});
  products.hasMany(product_reports, { as: "product_reports", foreignKey: "product_id"});

  return {
    orders,
    orders_reports,
    otheritems,
    product_reports,
    products,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
