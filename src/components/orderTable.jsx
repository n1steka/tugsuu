import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

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

  const deleteItem = async (id) => {
    try {
      await axios.delete(`/api/order/${id}`);
      setData((prevData) => prevData.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Error deleting product:", err);
      toast.error("Failed to delete product.");
    }
  };
  const updateOrder = async (orderCount, productId, orderId) => {
    try {
      const productResponse = await axios.get(`/api/product/${productId}`);
      const currentProductCount = productResponse.data.data.count;
      if (productResponse.data.data.count < orderCount) {
        return alert("Барааны үлдэгдэл хүрэлцэхгүй байна");
      }
      const newProductCount = currentProductCount - orderCount;

      await axios.put(`/api/product/${productId}`, { count: newProductCount });
      console.log("order _d", orderId);
      deleteItem(orderId);
      await axios.post(`/api/userProduct/`, { orderCount, productId });

      setData((prevData) => prevData.filter((order) => order._id !== orderId));

      toast.success("Order successfully confirmed!");
    } catch (error) {
      console.error("Error confirming order:", error);
      toast.error("Failed to confirm order.");
    }
  };

  const handleConfirmClick = (orderCount, productId, orderId) => {
    updateOrder(orderCount, productId, orderId);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (data.length === 0) {
    return (
      <div className="border p-2 border-yellow-700 font-semibold">
        Одоогоор захиалгын хүсэлт байхгүй байна!
      </div>
    );
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
                  key={order?._id}
                  className="text-sm leading-none text-gray-600 h-16"
                >
                  <td className="pl-4">{order?._id}</td>
                  <td className="pl-4">{order?.productId?.name}</td>
                  <td className="pl-4">{order?.orderCount}</td>
                  <td className="pl-4">
                    {new Date(order?.createdAt).toDateString()}
                  </td>
                  <td className="pl-4">
                    <button
                      onClick={() =>
                        handleConfirmClick(
                          order?.orderCount,
                          order?.productId._id,
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
