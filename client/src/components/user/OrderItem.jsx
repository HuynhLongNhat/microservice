/* eslint-disable react/prop-types */

const OrderItem = ({ index, name, description, price, quantity }) => {
  return (
    <tr>
      <td className="border px-4 py-2 text-center">{index}</td>
      <td className="border px-4 py-2">{name}</td>
      <td className="border px-4 py-2">{description}</td>
      <td className="border px-4 py-2 text-center">{price}$</td>
      <td className="border px-4 py-2 text-center">{quantity}</td>
      <td className="border px-4 py-2 text-center">
        {(price * quantity).toFixed(2)}$
      </td>
    </tr>
  );
};

export default OrderItem;
