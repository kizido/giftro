import { Input } from "@/components/ui/input";
import React from "react";

export default function MyLists() {
  return (
    <div className="container max-w-[72rem] h-screen gap-12 mt-8">
      <div className="h-full flex justify-between">
        {/* Gift Searching Area */}
        <div className="w-[45rem] border border-black border-dashed">
          <h1 className="text-3xl font-semibold">Gift Finder</h1>
          <Input />
        </div>

        {/* Wish List Area */}
        <div className="w-[24rem] border border-black border-dashed"></div>
      </div>
    </div>
  );
}
