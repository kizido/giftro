import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import Logout from "@/app/logout";
import { Button } from "@/components/ui/button";
import CreateEventButton from "@/components/ui/createEventButton";
import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";
import HamburgerMenu from "./HamburgerMenu";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";

export default async function Navbar() {
  const session = await getServerSession(authOptions);

  return (
    <nav className="fixed w-full h-20 bg-background border-b z-30">
      <div className="h-full px-16 xl:px-32 flex items-center justify-between py-4">
        <Link
          href={!!session ? "/dashboard" : "/"}
          className="text-foreground text-xl"
        >
          Gift App
        </Link>
        {!!session && (
          <>
            <div className="hidden lg:flex gap-8 xl:gap-12 items-center">
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
              <CreateEventButton />
            </div>

            <div className="hidden lg:block">
              <Logout />
            </div>
            <div className="lg:hidden flex items-center gap-4">
              <CreateEventButton />
              <HamburgerMenu />
            </div>
          </>
        )}
        {!session && (
          <>
            <Button variant="outline">
              <Link href="/login">Login</Link>
            </Button>
            <Button variant="default">
              <Link href="/signup">Sign Up</Link>
            </Button>
          </>
        )}
      </div>
    </nav>
  );
}
