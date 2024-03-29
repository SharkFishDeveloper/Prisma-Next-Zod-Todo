"use client"

import { z } from "zod";
import { Button } from "@/components/ui/button"
import { ReactNode, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { createTodo } from "./action/create-todo";
import { FetchTodo } from "./action/fetch-todo";
import axios from "axios";


export default function Home() {
  const [loading,setLoading] = useState(false);
  const [name,setName] = useState("");
  const [desc,setDesc] = useState("");
  const [data, setData] = useState<{id:number; name: string; desc: string;date:Date }[]>([]);
  const [resp,setResp] = useState("");
  const [count,setCount] = useState(0);

  const todoSchema =z.object({
    name:z.string().min(6,{message:"Name should be atleat 6 letters long !!"}),
    description:z.string().min(10,{message:"Description should be atleat 10 letters long !!"}).max(100,{message:"Description is too long"})
  });



  const handleClick =async (e:React.ChangeEvent<HTMLInputElement>)=>{
    setLoading(true);
    try {
     const result = todoSchema.parse({name:name,description:desc});
     console.log("result ,",result);
      const res = await createTodo({name,desc});
      setResp(res);
     setLoading(false);
     setName("");
     setDesc("");
    toast.success("Success !!");
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
  const handleDone =async (id:number)=>{
    try {
      
      const response = await axios.delete(`/api/todo/deletetodo/${id}`);
      toast.success("Task deleted ^_^ ");
      setCount(count+1);
    } catch (error) {
      toast.error("Could't delete it !!");
      toast.warning(`ID:${id}`)
    }
  }

  useEffect(()=>{
    setLoading(true)
   
  const fetchData = async () => {
    try {
      const res = await FetchTodo();
      console.log("typeof ",typeof res.res);
      setData(res.res.reverse());
    } catch (error) {
      console.error("Error fetching TODO:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
  },[resp,count])
  
  console.log("VIP ,",data);

  return (   
   <div className="bg-slate-200 flex flex-col h-[100vh] w-[100vw] p-5 text-center flex-1 flex-grow">
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
    <br />
    {loading && 
    <div className=" mt-5 flex mx-auto items-center justify-center space-x-2 bg-black h-[2rem] w-[8rem] rounded-3xl ">
    <p className="font-semibold text-white text-sm">Loading...</p>
    <span className="h-4 w-4 animate-spin rounded-full border-solid border-blue-700 border-t-2"></span>
  </div>
  }
  {data && data.map((item,index)=>
  <div key={item.id} 
  // style={{ backgroundColor: colr ? '#34D399' : '#718096' }}
  className="bg-gray-400 w-[80%] sm:w-[40%]  h-[10rem] rounded-3xl mx-auto text-white text-left p-5 mt-6 ">
    <div className="flex justify-between">
    <h1><span className="font-bold ">Name</span> - {item.name}</h1>
    <span className="cursor-pointer font-bold  text-green-500" onClick={()=>handleDone(item.id)}>Done</span>
    </div>
    <p>Created on - {item.date.toString().substring(0,10)}</p>
    <div className="break-all max-h-[6rem]">
    <span className="font-bold">Description</span> - {item.desc}
  </div>
  </div>
  )
   }
   </div>
  )
}
