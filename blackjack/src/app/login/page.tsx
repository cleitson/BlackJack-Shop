"use client";

import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {

  const { login } = useAuth();

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:3001/auth/google";
  };

  return (
    <div className="mx-auto flex flex-col min-h-[calc(100vh-4rem)] items-center justify-center gap-2">
      <h2 className="w-full text-[2rem] leading-10 font-semibold text-center">
        login to play
      </h2>
      <button
        onClick={handleGoogleLogin}
        className="w-fit bg-zinc-900 text-white rounded-md px-4 py-2 mt-4 hover:bg-zinc-700 transition"
      >
        Login with Google
        <img
          src="/google_icon.svg"
          alt="Google Logo"
          className="inline-block w-4 h-4 ml-2"
        />
      </button>
    </div>
  );
}
