import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";

const UserTable = () => {
  const [data, setData] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await axios.get("/api/product");
        setData(response.data.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        toast.error("Failed to fetch products.");
      }
    };

    loadData();
  }, []);

  const deleteItem = async (id) => {
    try {
      await axios.delete(`/api/product/${id}`);
      toast.success("Product deleted successfully!");
      setData((prevData) => prevData.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Error deleting product:", err);
      toast.error("Failed to delete product.");
    }
  };

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsOpen(true);
    console.log("product id -------", product);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="relative overflow-x-auto">
      <Toaster position="top-center" reverseOrder={false} />
      <table className="w-full text-sm text-left text-gray-500 my-24">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th>Нэр</th>
            <th>Тоо ширхэг</th>
            <th>Үнэ</th>
            <th>Бүртгэгдсэн огноо</th>
            <th>Засах</th>
          </tr>
        </thead>
        <tbody>
          {data.map((product) => (
            <tr key={product._id} className="bg-white border-b">
              <td className="px-6 py-4">{product.name}</td>
              <td className="px-6 py-4">{product.count}</td>
              <td className="px-6 py-4">
                <input type="number" defaultValue={product.price} />
              </td>
              <td className="px-6 py-4">
                {new Date(product.createdAt).toDateString()}
              </td>
              <td>
                <button
                  onClick={() => openModal(product)}
                  className="p-1 bg-sky-500 text-white rounded-full w-[150px]"
                >
                  Захиалга хийх
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isOpen && (
        <Modal isOpen={isOpen} onClose={closeModal} product={selectedProduct} />
      )}
    </div>
  );
};

const Modal = ({ isOpen, onClose, product }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    try {
      const input = {
        ...formData,
        productId: product._id,
      };

      const response = await axios.post("/api/order", input);
      if (response) {
        toast.success("Order placed successfully!");
        onClose(); // Close the modal upon success
      }
    } catch (error) {
      console.error("Error submitting order:", error);
      toast.error("Failed to place order.");
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg relative w-full max-w-xl">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="font-semibold">Тоо ширхэг:</label>
            <input
              type="number"
              min="1"
              step="1"
              className="border-2 py-1 px-2"
              {...register("orderCount", { required: true })}
            />
            {errors.orderCount && (
              <span className="text-red-500">Required</span>
            )}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="p-2 bg-blue-500 text-white rounded-2xl"
            >
              Баталгаажуулах
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 bg-red-500 text-white rounded-2xl ml-2"
            >
              Хаах
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserTable;
