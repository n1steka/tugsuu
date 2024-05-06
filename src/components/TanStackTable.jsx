import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";

const TanStackTable = () => {
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await axios.get("/api/product");
        setData(response.data.data);
      } catch (err) {
        console.error("Error fetching products:", err);
        toast.error("Failed to fetch products.");
      }
    };

    loadData();
  }, []);

  const deleteItem = async (id) => {
    try {
      await axios.delete(`/api/product/${id}`);
      setData((prevData) => prevData.filter((item) => item._id !== id));
      toast.success("Successfully deleted!");
    } catch (err) {
      console.error("Error deleting product:", err);
      toast.error("Failed to delete product.");
    }
  };

  const openModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setIsModalOpen(false);
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
            <th>Устгах</th>
          </tr>
        </thead>
        <tbody>
          {data.map((product) => (
            <tr key={product._id} className="bg-white border-b">
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                {product.name}
              </td>
              <td
                className={`px-6 py-4 ${
                  product.count < 10 ? "text-red-500" : ""
                }`}
              >
                {product.count}
              </td>
              <td className="px-6 py-4">
                {product.price !== undefined ? product.price.toFixed(2) : "-"}
              </td>
              <td className="px-6 py-4">
                {product.createdAt
                  ? new Date(product.createdAt).toDateString()
                  : "-"}
              </td>
              <td>
                <button
                  onClick={() => openModal(product)}
                  className="p-1 bg-sky-500 text-white rounded-full w-24"
                >
                  Засах
                </button>
              </td>
              <td>
                <button
                  onClick={() => deleteItem(product._id)}
                  className="p-1 bg-red-600 text-white rounded-full w-8"
                >
                  X
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal} item={selectedItem} />
      )}
    </div>
  );
};

const Modal = ({ isOpen, onClose, item }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: item?.name,
      count: item?.count,
      price: item?.price,
    },
  });

  const onSubmit = async (formData) => {
    try {
      const response = await axios.put(`/api/product/${item._id}`, formData);
      if (response.status === 201) {
        toast.success("Successfully updated!");
        onClose(); // Close the modal on success
        window.location.reload(false);
      }
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product.");
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-xl">
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
              className="border-2 py-1 px-2"
              {...register("count", { required: true })}
            />
            {errors.count && <span className="text-red-500">Required</span>}
          </div>
          <div className="mb-4">
            <label className="font-semibold">Үнэ:</label>
            <input
              type="number"
              className="border-2 py-1 px-2"
              {...register("price", { required: true })}
            />
            {errors.price && <span className="text-red-500">Required</span>}
          </div>
          <div className="mb-4">
            <label className="font-semibold">Нэр:</label>
            <input
              type="text"
              className="border-2 py-1 px-2"
              {...register("name", { required: true })}
            />
            {errors.name && <span className="text-red-500">Required</span>}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="p-2 bg-blue-500 text-white rounded-2xl"
            >
              Засах
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

export default TanStackTable;
