import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function GET() {
  const BACKEND_URL = process.env.BACKEND_URL;
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  
  if (!token) return redirect("/login");
  console.log(`${BACKEND_URL}/user/me`, token);
  const res = await fetch(`${BACKEND_URL}/user/me`, {
    headers: {
      Authorization: token,
    },
  });

  const data = await res.json();
  return Response.json(data);
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
  return new Response(null, { status: 204 });
}