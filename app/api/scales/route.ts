import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";
import { Data } from "@/app/scales-create/page";

export async function GET(request: NextApiRequest, response: NextApiResponse) {
    const scales = await prisma.scale.findMany({
        include: {
            members: true,
            songs: true,
        },
        orderBy: {
            date: 'desc'
        }
    });

    return NextResponse.json(scales);
}

export async function POST(request: NextRequest) {
    try {
        const data = await request.json() as Data;

        const scale = await prisma.scale.create({
            data: {
                title: data.title,
                description: data.description,
                date: new Date(data.date).toISOString(),
                members: {
                    createMany: { data: data.members.map(member => ({ name: member })) }
                },
                songs: {
                    createMany: { data: data.songs.map(song => ({ name: song })) }
                },
            }
        });

        return NextResponse.json({ data: scale }, { status: 200 });
    } catch (error) {
        if (error instanceof PrismaClientValidationError)
            return NextResponse.json({ error: 'Escala não criada.' }, { status: 400 });

        return NextResponse.json({ error: 'Erro interno do servidor.' }, { status: 500 });
    }
}
