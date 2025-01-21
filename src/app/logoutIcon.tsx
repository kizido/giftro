"use client";

import { Button } from "@/components/ui/button";
import { IconLogout } from "@tabler/icons-react";
import { signOut } from "next-auth/react";

export default function LogoutIcon() {
  return <IconLogout onClick={() => signOut()} />;
}
