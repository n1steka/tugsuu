import React from 'react'
import { useForm } from "react-hook-form"
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/router';
import Link from "next/link"
export default function User() {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        if (data.name === "user@gmail.com" && data.password === "user") {
            toast.success("Амжилттай нэвтэрлээ")
            router.push('/userPage');
        } else {
            return toast.error("Нэвтрэх нэр эсвэл нууц үг буруу байна ")
        }

    };



    return (
        <div className='mt-[300px] '>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <h1 className=' w-full flex justify-center mb-8 text-xl'> Хэрэглэгч </h1>
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto text-black">
                <div className="relative z-0 w-full mb-5 group ">
                    <input type="text" name="text" id="text"
                        {...register("name")}
                        className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer  text-black" placeholder=" " required />
                    <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"> Нэр : </label>
                </div>
                <div className="relative z-0 w-full mb-5 group text-black">
                    <input type="password"  {...register("password")} name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"> Нууц үг : </label>
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> Нэвтрэх </button>
            </form>
        </div>
    )
}
