import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

export default function MyLists() {
  return (
    <div className="container max-w-[72rem] h-screen gap-12 mt-8">
      <div className="h-full flex justify-between">
        {/* Gift Searching Area */}
        <div className="w-[45rem]">
          <h1 className="text-3xl font-semibold">Gift Finder</h1>
          <div className="py-4 flex flex-col gap-2">
            <Input
              className="h-14 text-md"
              placeholder="Search for gifts here..."
            />
            <div className="flex flex-wrap gap-2 justify-start items-center">
              <Button
                iconUrl="https://static-cdn.drawnames.com//Content/Assets/chevron-gray.svg"
                iconRotation={90}
                variant="secondary"
                className="font-semibold"
              >
                Category
              </Button>
              <Button
                variant="secondary"
                iconUrl="https://static-cdn.drawnames.com//Content/Assets/chevron-gray.svg"
                iconRotation={90}
                className="font-semibold"
              >
                Shop
              </Button>
              <Button
                variant="secondary"
                iconUrl="https://static-cdn.drawnames.com//Content/Assets/chevron-gray.svg"
                iconRotation={90}
                className="font-semibold"
              >
                Price
              </Button>
              <Button
                variant="secondary"
                iconUrl="https://static-cdn.drawnames.com//Content/Assets/chevron-gray.svg"
                iconRotation={90}
                className="font-semibold"
              >
                Age
              </Button>
              <Button
                variant="secondary"
                iconUrl="https://static-cdn.drawnames.com//Content/Assets/chevron-gray.svg"
                iconRotation={90}
                className="font-semibold"
              >
                Gender
              </Button>
              <h3 className="ml-1 text-md text-semibold text-blue-500 cursor-pointer hover:underline">
                Clear all filters
              </h3>
            </div>
          </div>
        </div>

        {/* Wish List Area */}
        <div className="w-[24rem] border border-black border-dashed"></div>
      </div>
    </div>
  );
}
