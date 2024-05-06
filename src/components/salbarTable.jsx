import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";

const SalbarTable = () => {
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await axios.get("/api/userProduct");
        setData(response.data.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        toast.error("Failed to load data.");
      }
    };

    loadData();
  }, []);

  const deleteItem = async (id) => {
    try {
      await axios.delete(`/api/userProduct/${id}`);
      toast.success("Successfully deleted!");
      setData((prevData) => prevData.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Error deleting item:", err);
      toast.error("Failed to delete item.");
    }
  };

  const openModal = (item) => {
    setSelectedItem(item);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedItem(null);
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
          {data.map((item) => (
            <tr key={item._id} className="bg-white border-b">
              <td className="px-6 py-4">{item.productId?.name}</td>
              <td className="px-6 py-4">{item.orderCount}</td>
              <td className="px-6 py-4">{item.productId?.price?.toFixed(2)}</td>
              <td className="px-6 py-4">
                {item.createdAt
                  ? new Date(item.createdAt).toDateString()
                  : "N/A"}
              </td>
              <td>
                <button
                  onClick={() => openModal(item)}
                  className="p-2 bg-sky-500 text-white rounded-full w-[150px]"
                >
                  Засах
                </button>
              </td>
              <td>
                <button
                  onClick={() => deleteItem(item._id)}
                  className="p-2 bg-red-500 text-white rounded-full w-[30px]"
                >
                  X
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isOpen && (
        <Modal isOpen={isOpen} onClose={closeModal} item={selectedItem} />
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
    defaultValues: { orderCount: item?.orderCount },
  });

  const onSubmit = async (formData) => {
    try {
      const response = await axios.put(
        `/api/userProduct/${item._id}`,
        formData
      );
      if (response.status === 200) {
        toast.success("Successfully updated!");
        onClose(); // Close the modal after success
      }
    } catch (error) {
      console.error("Error updating item:", error);
      toast.error("Failed to update item.");
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded shadow-lg w-full max-w-lg p-6">
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

export default SalbarTable;
