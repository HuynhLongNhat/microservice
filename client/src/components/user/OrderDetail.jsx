import { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { createOrder, createOrderItem } from "@/service/orderService";
import { useNavigate } from "react-router-dom";

const OrderDetail = ({ totalPrice, orderItems }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [status, setStatus] = useState("pending"); // Initial status set to "pending"
  const navigate = useNavigate();

  const handleCheckout = async () => {
    try {
      setIsLoading(true); // Bắt đầu trạng thái loading
      setStatus("pending"); // Trạng thái ban đầu là "pending"

      // Bước 1: Chờ 5 giây trước khi tạo đơn hàng
      setTimeout(async () => {
        // Bước 2: Tạo đơn hàng sau 5 giây với trạng thái "completed"
        const orderResponse = await createOrder({
          customer_name: name,
          customer_email: email,
          total_amount: totalPrice,
          status: "completed", // Trạng thái đơn hàng là "completed"
        });

        const orderId = orderResponse.data.DT.id;

        // Bước 3: Sau khi đơn hàng được tạo, thêm sản phẩm vào đơn hàng
        for (const item of orderItems) {
          await createOrderItem({
            order_id: orderId,
            product_id: item.id,
            product_name: item.name,
            quantity: item.quantity,
            unit_price: item.price,
            totalPrice: item.quantity * item.price,
          });
        }

        setStatus("completed"); // Cập nhật trạng thái đơn hàng thành "completed" (mặc dù đã được set trước đó khi tạo đơn hàng)
        setIsLoading(false); // Kết thúc trạng thái loading

        alert("Order and items created successfully!");
        navigate("/products"); // Điều hướng người dùng đến trang sản phẩm
      }, 5000); // 5 giây sau sẽ thực hiện tạo đơn hàng và thêm các sản phẩm
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("Failed to create order or items!");
      setIsLoading(false); // Kết thúc trạng thái loading nếu có lỗi
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white border border-gray-300 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Order Details</h1>
      <div>
        <div className="mb-3">
          <Label className="mb-2">Customer Name</Label>
          <Input
            type="text"
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
        </div>

        <div className="mb-3">
          <Label className="mb-2">Customer Email</Label>
          <Input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-3 grid grid-cols-2 gap-4">
          <div>
            <Label className="block text-sm font-medium mb-2">
              Total Amount
            </Label>
            <p className="font-medium text-lg">{totalPrice}$</p>
          </div>
          <div>
            <Label className="block text-sm font-medium mb-2">Status</Label>
            <p
              className={`font-medium text-lg ${
                status === "pending"
                  ? "text-yellow-500"
                  : status === "completed"
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </p>
          </div>
        </div>

        <div className="mt-6">
          <Button
            disabled={isLoading} // Disable button when loading
            className={`w-full ${
              isLoading
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
            onClick={handleCheckout}
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin h-5 w-5 mr-3"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 2v6m0 0l-4-4m4 4l4-4m8 10a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Processing...
              </span>
            ) : (
              "Checkout"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
