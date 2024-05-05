import UserTable from "@/components/userTable";
import SalbarTable from "@/components/salbarTable";
import React from "react";

export default function userPage() {
  return (
    <div className=" max-w-[1200px] ml-[200px]">
      <h1 className="mt-[20px] font-bold">Салбар</h1>
      <UserTable />
      <h1 className="mt-[20px] font-bold">Үлдэгдэл бараа</h1>
      <SalbarTable />
    </div>
  );
}
