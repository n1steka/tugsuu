import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
const TanStackTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('/api/product')
      .then((res) => setData(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  const deleteItem = (id) => {
    axios.delete(`/api/product/${id}`).then((res) => toast.success('Амжилттай устгагдлаа!')).catch(err => console.log(err));
  }

  return (
    <div className="relative overflow-x-auto">
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 my-24">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
            <th>
              Устгах
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((el) => (
            <tr key={el._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {el.name}
              </td>
              <td className="px-6 py-4">{el.count}</td>
              <td className="px-6 py-4">{el.price}</td>
              <td>  <button onClick={() => deleteItem(el._id)} className=" p-1 bg-red-600 text-white  rounded-full w-8"> x</button> </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TanStackTable;
