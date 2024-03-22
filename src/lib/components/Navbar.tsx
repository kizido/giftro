import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import Logout from "@/app/logout";
import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";

export default async function Navbar() {
  const session = await getServerSession(authOptions);
  return (
    <nav className="fixed w-full h-20 bg-background border-b z-50">
      <div className="container max-w-[70rem] flex items-center justify-center gap-12 py-4 px-1">
        <Link
          href={!!session ? "/dashboard" : "/"}
          className="text-foreground md:text-2xl text-xl flex-1"
        >
          Gift App
        </Link>
        {!session && (
          <div className="flex justify-center md:gap-8 gap-4">
            <Link
              href="/login"
              className="bg-secondary text-secondary-foreground p-2 md:text-lg text-md rounded-md"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="bg-primary text-primary-foreground p-2 md:text-lg text-md rounded-md"
            >
              Sign Up
            </Link>
          </div>
        )}
        {!!session && (
          <>
            <Link href={"/dashboard"} className="text-semibold text-md">
              Home
            </Link>
            <Link href={"/friends"} className="text-semibold text-md">
              Friends
            </Link>
            <Link href={"/my-list"} className="text-semibold text-md">
              My List
            </Link>
            <Link
              href={"/upcoming-birthdays"}
              className="text-semibold text-md"
            >
              Upcoming Birthdays
            </Link>
            <Link href={"/profile"} className="text-semibold text-md">
              Profile
            </Link>
            <Logout />
          </>
        )}
      </div>
    </nav>
  );
}
