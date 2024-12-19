/* eslint-disable react/prop-types */
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/card";

const ProductItem = ({ id, name, description, price, quantity, onClick }) => {
  return (
    <Card className="w-full min-h-52 max-w-sm bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{name}</CardTitle>
        <CardDescription className="text-gray-500 text-sm">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <span className="text-gray-700 font-medium">Price:</span>
          <span className="text-green-600 font-bold">{price}$</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-700 font-medium">Quantity:</span>
          <span className="text-blue-600 font-bold">{quantity}</span>
        </div>
        {/* Add to cart button */}
        <button
          onClick={() => onClick(id)}
          className="mt-4 py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add to cart
        </button>
      </CardContent>
    </Card>
  );
};

export default ProductItem;
