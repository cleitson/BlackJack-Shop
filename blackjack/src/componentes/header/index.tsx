"use client";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

 function Header() {
  const { user, logout } = useAuth();
  return (
    <header className="flex h-16 px-2 py-4 bg-zinc-900 text-white">
      <div className="flex items-center justify-between w-full mx-auto max-w-7xl">
        <p>BlackJack</p>
        <div>
          {user && (
            <div className="flex flex-row items-center gap-4">
              <img src={user.picture} alt={user.firstName} className="w-8 h-8 rounded-full" />
              <p className="text-sm">Bem vindo, {user.firstName} o seu saldo atual é {user.score}</p>
            </div>
          )}
        </div>
        <nav>
          <ul className="flex items-center gap-4 justify-center">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              {!user ? (
                <Link href="/login">Login</Link>
              ) : (
                <button onClick={logout} className="cursor-pointer">Logout</button>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
