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
import LogoutIcon from "@/app/logoutIcon";

export default async function Navbar() {
  const session = await getServerSession(authOptions);

  return (
    <nav className="fixed w-full h-20 bg-background border-b z-30">
      <div className="h-full px-4 md:px-16 xl:px-32 flex items-center justify-between py-4">
        <Link
          href={!!session ? "/dashboard" : "/"}
          className="text-foreground text-xl w-22"
        >
          Giftro
        </Link>
        {!!session && (
          <>
            <div className="hidden lg:flex gap-8 xl:gap-12 items-center">
              <Link
                href={"/dashboard"}
                className="text-semibold text-md hover:scale-105"
              >
                Home
              </Link>
              <Link
                href={"/friends"}
                className="text-semibold text-md hover:scale-105"
              >
                Friends
              </Link>
              <Link
                href={"/my-list"}
                className="text-semibold text-md hover:scale-105"
              >
                My List
              </Link>
              {/* <Link
                href={"/upcoming-birthdays"}
                className="text-semibold text-md hover:scale-105"
              >
                Upcoming Birthdays
              </Link> */}
              {/* <Link
                href={"/profile"}
                className="text-semibold text-md hover:scale-105"
              >
                Profile
              </Link> */}
              <CreateEventButton />
            </div>

            <div className="hidden lg:block">
              <Logout />
            </div>

            <div className="lg:hidden flex items-center gap-4 sm:gap-8">
              {/* IconHome, IconFriends, IconList, IconCalendar, IconPictureInPictureTopFilled */}
              <Link
                href={"/dashboard"}
                className="text-semibold text-md hover:scale-105"
              >
                <IconHome className="hover:scale-105 cursor-pointer" />
              </Link>
              <Link
                href={"/friends"}
                className="text-semibold text-md hover:scale-105"
              >
                <IconFriends className="hover:scale-105 cursor-pointer" />
              </Link>
              <Link
                href={"/my-list"}
                className="text-semibold text-md hover:scale-105"
              >
                <IconList className="hover:scale-105 cursor-pointer" />
              </Link>
              {/* <Link
                href={"/upcoming-birthdays"}
                className="text-semibold text-md hover:scale-105"
              >
                <IconCalendar className="hover:scale-105 cursor-pointer" />
              </Link>
              <Link
                href={"/profile"}
                className="text-semibold text-md hover:scale-105"
              >
                <IconUserCircle className="hover:scale-105 cursor-pointer" />
              </Link> */}
              {/* <CreateEventButton /> */}
            </div>

            <div className="flex lg:hidden">
              <LogoutIcon />
            </div>
          </>
        )}
        {!session && (
          <div className="flex gap-4 md:gap-8">
            <Link href="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link href="/signup">
              <Button variant="default">Sign Up</Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
