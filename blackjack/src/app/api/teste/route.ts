
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const req = await request.json();
  // const prisma = new PrismaClient();
  return NextResponse.json( req );
}