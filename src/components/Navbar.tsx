import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <nav className="w-full h-16 bg-gray-800 flex items-center justify-between p-8">
      <div>
        <Link href="/" className="text-white">
          Gift App
        </Link>
      </div>
      <div className="flex justify-center gap-8">
        <Link href="/" className="text-white">
          Login
        </Link>
        <Link href="/" className="text-white">
          Sign Up
        </Link>
      </div>
    </nav>
  );
}
