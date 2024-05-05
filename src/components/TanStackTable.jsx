import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";

const TanStackTable = () => {
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const loadData = () => {
    axios
      .get("/api/product")
      .then((res) => setData(res.data.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadData();
  }, []);

  const deleteItem = (id) => {
    axios
      .delete(`/api/product/${id}`)
      .then((res) => {
        toast.success("Амжилттай устгагдлаа!");
        setData((prevData) => prevData.filter((item) => item._id !== id));
      })
      .catch((err) => console.log(err));
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative overflow-x-auto">
      <Toaster position="top-center" reverseOrder={false} />
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 my-24">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
          <tr>
            <th scope="col" className="px-6 py-3">
              Нэр
            </th>
            <th scope="col" className="px-6 py-3">
              Тоо ширхэг
            </th>
            <th scope="col" className="px-6 py-3">
              Үнэ
            </th>
            <th scope="col" className="px-6 py-3">
              Бүртгэгдсэн огноо
            </th>
            <th>Засах</th>
            <th>Устгах</th>
          </tr>
        </thead>
        <tbody>
          {data.map((el) => (
            <tr key={el._id} className="bg-white border-b  ">
              <td
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
              >
                {el.name}
              </td>
              <td
                className={`px-6 py-4 ${el.count < 10 ? "text-red-500" : ""}`}
              >
                {el.count}
              </td>
              <td className="px-6 py-4">
                <input type="number" defaultValue={el.price} />
              </td>
              <td className="px-6 py-4">{el?.cratedAt.slice(0, 10)}</td>
              <td>
                <button
                  onClick={() => setIsOpen(true)}
                  className="p-1 bg-sky-500 text-white rounded-full w-24"
                >
                  засах
                </button>
              </td>
              <td>
                <button
                  onClick={() => deleteItem(el._id)}
                  className="p-1 bg-red-600 text-white rounded-full w-8"
                >
                  x
                </button>
              </td>
              <Modal isOpen={isOpen} onClose={closeModal} item={el} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Modal = ({ isOpen, onClose, item }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      console.log(data);
      const response = await axios.put(`/api/product/${item._id}`, data);
      if (response) {
        toast.success("Амжилттай");
        console.log(response.data.data);
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  console.log(item);

  return (
    <>
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-[1200px] p-12">
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
              <div>
                <ul>
                  <li>
                    {" "}
                    <span className=" font-semibold"> Тоо ширхэг :</span>{" "}
                    <input
                      type="text"
                      className="border-2 py-1 mb-2 ml-12"
                      defaultValue={item.count}
                      {...register("count")}
                    />{" "}
                  </li>
                  <li>
                    {" "}
                    <span className=" font-semibold">Үнэ : </span>{" "}
                    <input
                      type="text"
                      className="border-2 py-1 ml-[100px] mb-2 "
                      defaultValue={item.price}
                      {...register("price")}
                    />{" "}
                  </li>
                  <li>
                    {" "}
                    <span className=" font-semibold">Нэр : </span>{" "}
                    <input
                      type="text"
                      className="border-2 py-1 ml-[100px] mb-2 "
                      defaultValue={item.name}
                      {...register("name")}
                    />{" "}
                  </li>
                </ul>
              </div>
              <button
                type="submit"
                className="p-2 bg-blue-500 text-white rounded-2xl"
              >
                Засах
              </button>
              <button
                onClick={onClose}
                className="p-2 bg-red-500 text-white rounded-2xl ml-2"
              >
                Хаах
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default TanStackTable;
