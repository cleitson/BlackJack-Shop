import { cookies } from "next/headers";
import Link from "next/link";

export default async function Home() {
  // const cookieStore = await cookies();
  // const token = cookieStore.get("accessToken")?.value;
  // if (!token)
  //   return (
  //     <div className="flex flex-col items-center justify-items-center min-h-screen gap-16  sm:p-20">
  //       <div>
  //         <h1 className="text-center">Acesso Negado</h1>
  //       <p className="text-center">
  //         Você precisa estar logado para acessar esta página.
  //       </p>
  //       </div>
  //       <div className="w-fit bg-zinc-900 text-white rounded-md px-4 py-2 mt-4 hover:bg-zinc-700 transition">
  //         <Link href="/login" className="btn">
  //           Login
  //         </Link>
  //       </div>
  //     </div>
  //   );

  return (
    <div>
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <div className="flex flex-wrap justify-center">
          <Link href="/blackjack">Iniciar jogo</Link>
        </div>
      </div>
    </div>
  );
}
