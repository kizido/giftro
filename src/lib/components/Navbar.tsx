import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import Logout from "@/app/logout";
import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";

export default async function Navbar() {
  const session = await getServerSession(authOptions);
  return (
    <nav className="fixed w-full h-20 bg-gray-800 flex items-center justify-between p-8">
      <div>
        <Link
          href={!!session ? "/dashboard" : "/"}
          className="text-white md:text-4xl text-2xl"
        >
          Gift App
        </Link>
      </div>
      {!session && (
        <div className="flex justify-center md:gap-8 gap-4">
          <Link href="/login" className="text-white md:text-2xl text-xl">
            Login
          </Link>
          <Link href="/signup" className="text-white md:text-2xl text-xl">
            Sign Up
          </Link>
        </div>
      )}
      {!!session && (
        <div className="flex items-center gap-4">
          <h2 className="text-gray-400 text-xl">Hello, {session.username}!</h2>
          <Logout />
        </div>
      )}
    </nav>
  );
}
