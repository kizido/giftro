"use client";
import React, { useState } from "react";
import { IconMenu2, IconX } from "@tabler/icons-react";
import Link from "next/link";

type HamburgerMenuProps = {
  hamburgerNavOpen: boolean;
};
export default function HamburgerMenu() {
  const [isHamburgerMenuOpen, setIsHamburgerNavOpen] = useState(false);
  return (
    <div>
      <IconMenu2
        className="cursor-pointer"
        onClick={() => setIsHamburgerNavOpen(true)}
      />
      {isHamburgerMenuOpen && (
        <div className="absolute flex flex-col items-center p-4 gap-8 top-0 right-0 w-64 bg-white border border-slate-700">
          <IconX
            className="self-end cursor-pointer"
            onClick={() => setIsHamburgerNavOpen(false)}
          />
          <Link href={"/dashboard"} className="text-semibold text-md">
            Home
          </Link>
          <Link href={"/friends"} className="text-semibold text-md">
            Friends
          </Link>
          <Link href={"/my-list"} className="text-semibold text-md">
            My List
          </Link>
          <Link href={"/upcoming-birthdays"} className="text-semibold text-md">
            Upcoming Birthdays
          </Link>
          {/* <Link href={"/profile"} className="text-semibold text-md">
            Profile
          </Link> */}
        </div>
      )}
    </div>
  );
}
