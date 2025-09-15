import Link from "next/link";
import React from "react";

function Header() {
  return (
    <header className="flex h-16 px-2 py-4 bg-zinc-900 text-white">
      <div className="flex items-center justify-between w-full mx-auto max-w-7xl">
        <div>BlackJack</div>
        <nav>
          <ul className="flex items-center gap-4 justify-center">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/login">Login</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
