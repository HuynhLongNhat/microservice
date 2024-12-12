import db from "../../models/index.js";

const getAllProducts = async () => {
  return await db.Product.findAll();
};

const getProductById = async (id) => {
  return await db.Product.findByPk(id);
};

const createProduct = async (productData) => {
  const { name, description, price, quantity } = productData;

  if (!name || !price || !quantity) {
    throw new Error("Missing required fields: name, price, or quantity");
  }

  return await db.Product.create({
    name,
    description,
    price,
    quantity,
  });
};

const updateProduct = async (id, productData) => {
  console.log("Update Product :", id, productData);
  const product = await db.Product.findByPk(id);
  if (!product) {
    return null;
  }

  await product.update(productData);
  return product;
};

const deleteProduct = async (id) => {
  const product = await db.Product.findByPk(id);
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
