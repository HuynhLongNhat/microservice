import { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import Sidebar from "./Sidebar";
import { getAllProduct } from "@/service/productService";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [sidebarProducts, setSidebarProducts] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    getListProduct();
  }, []);

  const getListProduct = async () => {
    const res = await getAllProduct();
    if (res && res.data && res.data.DT) {
      setProducts(res.data.DT);
    }
  };

  const handleAddToSidebar = (product) => {
    setSidebarProducts((prevProducts) => {
      const existingProduct = prevProducts.find((p) => p.id === product.id);
      if (existingProduct) {
        return prevProducts.map((p) =>
          p.id === product.id
            ? { ...p, quantity: Math.min(p.quantity + 1, product.quantity) } // Kiểm tra giới hạn số lượng
            : p
        );
      }
      return [...prevProducts, { ...product, quantity: 1 }];
    });
    setIsSidebarOpen(true); // Mở Sidebar
  };

  const handleUpdateQuantity = (id, quantity) => {
    setSidebarProducts((prevProducts) =>
      prevProducts.map((p) => {
        if (p.id === id) {
          const newQuantity = Math.max(
            0,
            Math.min(
              quantity,
              products.find((product) => product.id === id).quantity
            )
          );
          return { ...p, quantity: newQuantity };
        }
        return p;
      })
    );
  };

  const handleRemoveFromSidebar = (id) => {
    setSidebarProducts((prevProducts) =>
      prevProducts.filter((p) => p.id !== id)
    );
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false); // Đóng Sidebar
  };

  return (
    <div className="relative">
      {/* Danh sách sản phẩm */}
      <div className="p-4 flex flex-wrap -mx-2">
        {products.map((product) => (
          <div key={product.id} className="w-full sm:w-1/2 lg:w-1/3 px-2 mb-4">
            <ProductItem
              id={product.id}
              name={product.name}
              description={product.description}
              price={product.price}
              quantity={product.quantity}
              onClick={() => handleAddToSidebar(product)}
            />
          </div>
        ))}
      </div>

      {/* Sidebar */}
      {isSidebarOpen && (
        <Sidebar
          products={sidebarProducts}
          onUpdateQuantity={handleUpdateQuantity}
          onRemove={handleRemoveFromSidebar}
          onClose={handleCloseSidebar}
        />
      )}
    </div>
  );
};

export default ProductList;
