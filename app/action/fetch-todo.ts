"use server"
// import { PrismaClient } from '@prisma/client'
// const prisma = new PrismaClient()
import { prisma } from "@/app/prismaInstance";
export async function FetchTodo() {

    try {
       

        const res = await prisma.toDo.findMany();
        return {res}
    } catch (error) {
        console.log("Error fetching ",error);
    }
    await prisma.$disconnect();
}