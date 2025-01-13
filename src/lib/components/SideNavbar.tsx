"use client";
import React from "react";
import Link from "next/link";

export default function SideNavbar() {
  return (
    <div className="flex flex-col items-start p-4 gap-4 h-screen w-64 border-r-2 border-black fixed">
      <Link href={"/dashboard"} className="text-semibold text-xl">
        Home
      </Link>
      {/* <Link href={"/profile"} className="text-semibold text-xl">
        Profile
      </Link> */}
      <Link href={"/friends"} className="text-semibold text-xl">
        Friends
      </Link>
      <Link href={"/my-list"} className="text-semibold text-xl">
        My List
      </Link>
      <Link href={"/upcoming-birthdays"} className="text-semibold text-xl">
        Upcoming Birthdays
      </Link>
    </div>
  );
}
