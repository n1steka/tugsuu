import React from "react";
import TanStackTable from "@/components/TanStackTable";
import Form from "@/components/Form";
import OrderTable from "@/components/orderTable";
export default function create() {
  return (
    <div>
      <nav>
        <div className="h-24 bg-blue-600  ">
          <ul className="p-6 font-medium text-white text-xl ">
            <li>Бараа бүртгэх хэсэг</li>
          </ul>
        </div>
      </nav>
      <Form />
      <div className="max-w-[1200px] ml-12 flex">
        <h1 className=" font-semibold -mb-16">Бараа бүтээгдэхүүн</h1>
        <div className="">
          <TanStackTable />
        </div>
        <div className=" ml-4">
          <OrderTable />
        </div>
      </div>
    </div>
  );
}
