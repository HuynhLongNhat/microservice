import productService from "../service/product/productService.js";

const getAllProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    return res.status(200).json({
      EM: "Lấy danh sách sản phẩm thành công",
      EC: 0,
      DT: products,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      EM: "Lỗi server khi lấy danh sách sản phẩm",
      EC: -1,
      DT: null,
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({
        EM: "Sản phẩm không tồn tại",
        EC: 1,
        DT: null,
      });
    }
    return res.status(200).json({
      EM: "Lấy thông tin sản phẩm thành công",
      EC: 0,
      DT: product,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      EM: "Lỗi server khi lấy thông tin sản phẩm",
      EC: -1,
      DT: null,
    });
  }
};

const createProduct = async (req, res) => {
  try {
    const newProduct = await productService.createProduct(req.body);
    return res.status(201).json({
      EM: "Tạo sản phẩm mới thành công",
      EC: 0,
      DT: newProduct,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      EM: "Lỗi khi tạo sản phẩm mới",
      EC: -1,
      DT: null,
    });
  }
};

const updateProduct = async (req, res) => {
  console.log(req.body);
  try {
    const updatedProduct = await productService.updateProduct(
      req.params.id,
      req.body
    );
    if (!updatedProduct) {
      return res.status(404).json({
        EM: "Sản phẩm không tồn tại",
        EC: 1,
        DT: null,
      });
    }
    return res.status(200).json({
      EM: "Cập nhật sản phẩm thành công",
      EC: 0,
      DT: updatedProduct,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      EM: "Lỗi khi cập nhật sản phẩm",
      EC: -1,
      DT: null,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await productService.deleteProduct(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({
        EM: "Sản phẩm không tồn tại",
        EC: 1,
        DT: null,
      });
    }
    return res.status(200).json({
      EM: "Xóa sản phẩm thành công",
      EC: 0,
      DT: null,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      EM: "Lỗi server khi xóa sản phẩm",
      EC: -1,
      DT: null,
    });
  }
};

export default {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
