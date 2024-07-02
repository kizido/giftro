"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export default function Logout() {
  return (
    <div className="flex gap-2">
      <Button
        // className="text-secondary-foreground p-2 text-2xl cursor-pointer rounded-md"
        variant="outline"
        onClick={() => {
          signOut();
        }}
      >
        Logout
      </Button>
    </div>
  );
}
