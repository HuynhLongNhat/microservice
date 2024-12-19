import { useLocation } from "react-router-dom";
import OrderItem from "./OrderItem";
import OrderDetail from "./OrderDetail";

const Order = () => {
  const location = useLocation();
  const { products = [], totalPrice = 0 } = location.state || {};

  return (
    <div className="flex flex-col md:flex-row mt-3 gap-4 p-4">
      {/* Bảng danh sách sản phẩm */}
      <div className="md:w-2/3">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">STT</th>
              <th className="border px-4 py-2">Tên sản phẩm</th>
              <th className="border px-4 py-2">Mô tả</th>
              <th className="border px-4 py-2">Đơn giá</th>
              <th className="border px-4 py-2">Số lượng</th>
              <th className="border px-4 py-2">Tổng giá</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <OrderItem
                key={product.id}
                index={index + 1}
                name={product.name}
                description={product.description}
                price={product.price}
                quantity={product.quantity}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Hiển thị thông tin chi tiết đơn hàng */}
      <div className="md:w-1/3">
        <OrderDetail totalPrice={totalPrice} orderItems={products} />
      </div>
    </div>
  );
};

export default Order;
