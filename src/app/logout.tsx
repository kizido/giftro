"use client";

import { signOut } from "next-auth/react";

export default function Logout() {
  return (
    <div className="flex gap-2">
      <span
        className="text-secondary-foreground bg-secondary p-2 text-2xl cursor-pointer rounded-md"
        onClick={() => {
          signOut();
        }}
      >
        Logout
      </span>
    </div>
  );
}
