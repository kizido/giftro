import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import Logout from "@/app/logout";
import { Button } from "@/components/ui/button";
import CreateEventButton from "@/components/ui/createEventButton";
import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";
import {
  IconHome,
  IconFriends,
  IconList,
  IconCalendar,
  IconUserCircle,
  IconLogout,
  IconClipboardPlus,
} from "@tabler/icons-react";
import HamburgerMenu from "./HamburgerMenu";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";

export default async function Navbar() {
  const session = await getServerSession(authOptions);

  return (
    <nav className="fixed w-full h-20 bg-background border-b z-30">
      <div className="h-full px-4 md:px-16 xl:px-32 flex items-center justify-between py-4">
        <Link
          href={!!session ? "/dashboard" : "/"}
          className="text-foreground text-xl w-22"
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

            <div className="lg:hidden flex items-center gap-4 sm:gap-8">
              {/* IconHome, IconFriends, IconList, IconCalendar, IconPictureInPictureTopFilled */}
              <IconHome />
              <IconFriends />
              <IconList />
              <IconCalendar />
              <IconUserCircle />
              <IconClipboardPlus />
              {/* <HamburgerMenu /> */}
            </div>

            <div className="flex lg:hidden">
              <IconLogout />
            </div>
          </>
        )}
        {!session && (
          <div className="flex gap-4 md:gap-8">
            <Button variant="outline">
              <Link href="/login">Login</Link>
            </Button>
            <Button variant="default">
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
