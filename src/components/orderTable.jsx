import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast"; // For displaying notifications

function OrderTable() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/order");
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching order data:", error);
        toast.error("Failed to fetch order data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const updateOrder = async (orderCount, productId, orderId) => {
    try {
      // Fetch the product to get its current count
      const mainProductResponse = await axios.get(`/api/product/${productId}`);
      const currentProductCount = mainProductResponse.data.data.count;

      // Calculate the new count for the product
      const newProductCount = currentProductCount - orderCount;

      // Update the product with the new count
      await axios.put(`/api/product/${productId}`, { count: newProductCount });

      // Delete the order since it's completed
      await axios.delete(`/api/order/${orderId}`);

      // Update the local data to reflect the order deletion
      setData((prevData) => prevData.filter((order) => order._id !== orderId));

      toast.success("Order successfully confirmed!");
      window.location.reload(false);
    } catch (error) {
      console.error("Error updating order:", error);
      toast.error("Failed to confirm order.");
    }
  };

  const handleClick = (orderCount, productId, orderId) => {
    updateOrder(orderCount, productId, orderId); // Confirm and delete the order
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="w-full">
      <div className="px-4 md:px-10 py-4 md:py-7">
        <div className="sm:flex items-center justify-between">
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">
            Захиалгын хүсэлт
          </p>
        </div>
      </div>
      <div className="bg-white px-4 md:px-10 pb-5">
        <div className="overflow-x-auto">
          <table className="w-full whitespace-nowrap">
            <thead>
              <tr className="text-sm leading-none text-gray-600 h-16">
                <th className="text-left">Захиалгын дугаар</th>
                <th className="text-left">Бүтээгдэхүүний нэр</th>
                <th className="text-left">Тоо ширхэг</th>
                <th className="text-left">Огноо</th>
                <th className="text-left">Төлөв</th>
              </tr>
            </thead>
            <tbody>
              {data.map((order) => (
                <tr
                  key={order._id}
                  className="text-sm leading-none text-gray-600 h-16"
                >
                  <td className="pl-4">{order._id}</td>
                  <td className="pl-4">{order?.productId?.name}</td>
                  <td className="pl-4">{order.orderCount}</td>
                  <td className="pl-4">
                    {new Date(order.createdAt).toDateString()}
                  </td>
                  <td className="pl-4">
                    <button
                      onClick={() =>
                        handleClick(
                          order.orderCount,
                          order.productId?._id,
                          order?._id
                        )
                      }
                      className="p-3 text-white bg-blue-500 rounded-2xl"
                    >
                      Батлах
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default OrderTable;
