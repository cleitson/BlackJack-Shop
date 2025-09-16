import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const prisma = new PrismaClient();
  const deck = await prisma.card.findMany();

  return NextResponse.json(deck);
}
