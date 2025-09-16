import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('accessToken')?.value;
  console.log('Token HTTP-only:', token); // só funciona em ambiente Edge

  return NextResponse.next();
}
