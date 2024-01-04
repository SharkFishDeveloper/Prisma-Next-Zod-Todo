"use client"

import { z } from "zod";
import { Button } from "@/components/ui/button"
import { ReactNode, useState } from 'react';
import { toast } from 'react-toastify';

export default function Home() {
  const [loading,setLoading] = useState(false);
  const [name,setName] = useState("");
  const [desc,setDesc] = useState("");

  const todoSchema =z.object({
    name:z.string().min(6,{message:"Name should be atleat 6 letters long !!"}),
    description:z.string().min(10,{message:"Description should be atleat 10 letters long !!"}).max(100,{message:"Description is too long"})
  });
  const handleClick = (e:React.ChangeEvent<HTMLInputElement>)=>{
    setLoading(true);
    try {
     const result = todoSchema.parse({name:name,description:desc});
    console.log("result ,",result);
    setLoading(false);
    toast.success("Success !!")
  } catch (error) {
    if(error instanceof z.ZodError){
      const errorMessages = error.errors.map((a)=>a.message)
      console.log(errorMessages);
      errorMessages.forEach((e)=>{
      toast.warning(e);
      }
      )
    }
    setLoading(false);
   }
  }


  return (   
   <div className="bg-slate-200 flex flex-col h-[100vh] w-[100vw] p-5 text-center">
    <h1 className="text-3xl text-grey-700 font-semibold p-5">
    To-Do powered by <span className="text-blue-400 text-3xl font-bold">Prisma</span>
    </h1>
    <br />
    <span className="text-xl font-bold text-teal-500">Create a todo</span>
    <br />
    <input type="text" value={name} name='name' className=" p-3 my-5  mx-auto focus-none h-[3rem] w-[20rem] rounded-xl shadow-2xl" placeholder='Enter name of task' onChange={(e)=>setName(e.target.value)}/>
    <input type="text" value={desc} className="my-5 mx-auto p-3 focus-none h-[3rem] w-[20rem] rounded-xl shadow-2xl" placeholder='Enter description ' onChange={(e)=>setDesc(e.target.value)}/>
    <br />
    <Button variant="outline" className="h-[2.5rem] w-[6rem] mx-auto" onClick={handleClick}>Create todo</Button>
   </div>
  )
}
