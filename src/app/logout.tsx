"use client";

import { signOut } from "next-auth/react";

export default function Logout() {
  return (
    <div className="flex gap-2">
      <span
        className="text-white text-2xl cursor-pointer"
        onClick={() => {
          signOut();
        }}
      >
        Logout
      </span>
    </div>
  );
}
