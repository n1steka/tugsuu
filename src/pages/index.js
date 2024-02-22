import Image from "next/image";
import { Inter } from "next/font/google";
import TanStackTable from "@/components/TanStackTable";
import Form from "@/components/Form";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
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
      <TanStackTable />
    </div>
  );
}
