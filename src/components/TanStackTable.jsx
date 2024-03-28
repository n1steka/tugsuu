import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';

const TanStackTable = () => {
  const [data, setData] = useState([]);

  const loadData = () => {
    axios.get('/api/product')
      .then((res) => setData(res.data.data))
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    loadData();
  }, []);
  console.log(data);

  const deleteItem = (id) => {
    axios.delete(`/api/product/${id}`)
      .then((res) => {
        toast.success('Амжилттай устгагдлаа!');
        setData(prevData => prevData.filter(item => item._id !== id)); // Remove the deleted item from the state
      })
      .catch(err => console.log(err));
  }

  return (
    <div className="relative overflow-x-auto">
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
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
            </th>   <th scope="col" className="px-6 py-3">
              Бүртгэгдсэн огноо
            </th>
            <th>
              Засах
            </th>
            <th>
              Устгах
            </th>
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
              <td className="px-6 py-4">{el.count}</td>
              <td className="px-6 py-4">    <input type="number " defaultValue={el.price} /> </td>
              <td className="px-6 py-4">{el?.cratedAt.slice(0, 10)}</td>
              <td>  <button onClick={() => deleteItem(el._id)} className=" p-1 bg-sky-500 text-white  rounded-full w-24"> засах</button> </td>
              <td>  <button onClick={() => deleteItem(el._id)} className=" p-1 bg-red-600 text-white  rounded-full w-8"> x</button> </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TanStackTable;
