import React from 'react'
import TanStackTable from "@/components/TanStackTable";
import Form from "@/components/Form";
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
            <TanStackTable />
        </div>
    )
}
