import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
/* eslint-disable react/prop-types */
const Sidebar = ({ products, onUpdateQuantity, onRemove, onClose }) => {
  const navigate = useNavigate();
  const totalPrice = products.reduce((total, product) => {
    return total + product.price * product.quantity;
  }, 0);

  const handleCheckout = () => {
    navigate("/order", { state: { products, totalPrice } });
  };
  return (
    <div className="fixed top-0 right-0 w-80 h-full bg-white shadow-xl border-l border-gray-300 p-6 z-50 overflow-y-auto">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-lg"
        aria-label="Close Sidebar"
      >
        ✕
      </button>

      <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Cart</h2>

      {/* Danh sách sản phẩm */}
      {products.length === 0 ? (
        <p className="text-gray-500">No products in your cart.</p>
      ) : (
        products.map((product) => (
          <div
            key={product.id}
            className="mb-4 border-b pb-4 border-gray-200 flex items-center"
          >
            <div className="flex-grow">
              <p className="text-gray-800 font-semibold">{product.name}</p>
              <p className="text-sm text-gray-500">
                ${product.price} x {product.quantity}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              {/* Nút giảm số lượng */}
              <button
                className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                onClick={() =>
                  onUpdateQuantity(product.id, product.quantity - 1)
                }
                disabled={product.quantity <= 1} // Disable button if quantity is 1
              >
                -
              </button>
              <span className="w-8 text-center">{product.quantity}</span>
              {/* Nút tăng số lượng */}
              <button
                className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                onClick={() =>
                  onUpdateQuantity(product.id, product.quantity + 1)
                }
                disabled={
                  product.quantity >= product.stockQuantity // Disable if quantity exceeds max stock
                }
              >
                +
              </button>
            </div>
            {/* Nút xóa sản phẩm */}
            <button
              className="ml-4 text-red-500 hover:text-red-700"
              onClick={() => onRemove(product.id)}
            >
              ✕
            </button>
          </div>
        ))
      )}

      {/* Hiển thị tổng giá trị */}
      <p className="mt-4 text-lg font-semibold text-gray-800">
        Total: ${totalPrice.toFixed(2)}
      </p>

      <Button
        className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        onClick={() => handleCheckout()}
      >
        Checkout
      </Button>
    </div>
  );
};
export default Sidebar;
