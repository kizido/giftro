import Logout from "@/app/logout";
import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";

export default async function Navbar() {
  const session = await getServerSession();
  return (
    <nav className="fixed w-full h-20 bg-gray-800 flex items-center justify-between p-8">
      <div>
        <Link href="/" className="text-white text-4xl">
          Gift App
        </Link>
      </div>
      {!session && <div className="flex justify-center gap-8">
        <Link href="/login" className="text-white text-2xl">
          Login
        </Link>
        <Link href="/signup" className="text-white text-2xl">
          Sign Up
        </Link>
      </div>}
      {!!session && <Logout />}
    </nav>
  );
}
