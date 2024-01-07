"use server"
// import { PrismaClient } from '@prisma/client'
// const prisma = new PrismaClient()
import { prisma } from "@/app/prismaInstance";

export async function createTodo(body:{
    name:string,
    desc:string
}) {
    const { name, desc } = body;
    console.log(name,"+",desc)
    console.log("In fx to add to-do");
    //console.log(process.env.DATABASE_URL);
    console.log("After fx to add to-do");
    try {
         //await prisma.toDo.deleteMany();return;
    const todo = await prisma.toDo.create({data:{name:name,desc:desc}});
    console.log("todo-prisma ",todo)
    
    } catch (error) {
        console.log(error)
    }
    await prisma.$disconnect();
}