import UserTable from "@/components/userTable";
import SalbarTable from "@/components/salbarTable";
import React from "react";

export default function userPage() {
  return (
    <div className=" max-w-[1200px] ml-[200px]">
      <h1 className="mt-[20px] font-bold text-xl">Салбар 1</h1>
      <h1 className="mt-[20px] font-bold">Үлдэгдэл бараа</h1>
      <SalbarTable />
      <h1 className="mt-[20px] font-bold">Үндсэн агууллах</h1>
      <UserTable />
    </div>
  );
}
