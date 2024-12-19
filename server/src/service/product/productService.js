import db from "../../models/index.js";

const getAllProducts = async () => {
  return await db.products.findAll({
    attributes: ["id", "name", "description", "price", "quantity"],
  });
};

const getProductById = async (id) => {
  return await db.products.findByPk(id);
};

const createProduct = async (productData) => {
  const { name, description, price, quantity } = productData;

  if (!name || !price || !quantity) {
    throw new Error("Missing required fields: name, price, or quantity");
  }

  return await db.products.create({
    name,
    description,
    price,
    quantity,
  });
};

const updateProduct = async (id, productData) => {
  const product = await db.products.findByPk(id);
  if (!product) {
    return null;
  }

  await product.update(productData);
  return product;
};

const deleteProduct = async (id) => {
  const product = await db.products.findByPk(id);
  if (!product) {
    return null;
  }

  await product.destroy();
  return product;
};

export default {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
