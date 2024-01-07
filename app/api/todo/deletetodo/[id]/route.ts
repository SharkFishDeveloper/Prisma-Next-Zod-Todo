import { prisma } from "@/app/prismaInstance";
import { NextResponse } from "next/server";

export async function DELETE(req:Request,content:{params:{id:number}}){

    try {
        console.log(typeof content.params.id);
        const tid = +content.params.id;
        console.log(typeof tid);
        const deletedTodo = await prisma.toDo.delete({
            where:{
                id:tid
            }
        })
        return new NextResponse("Deleted")
    } catch (error) {
        console.log("error deleting => ",error)
        return new NextResponse(error.message)
    }
    finally {
        // Close the Prisma client connection
        await prisma.$disconnect();
      }
   
}