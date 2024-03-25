"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

export default function MyLists() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      const threshold = 68; // Set the scroll threshold in pixels

      if (offset > threshold) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    // Add the scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up the scroll event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="container max-w-[20rem] sm:max-w-[30rem] md:max-w-[45rem] lg:max-w-[62rem] xl:max-w-[72rem] gap-4 mt-8">
      <div className="h-full flex justify-center lg:justify-between">
        {/* Gift Searching Area */}
        <div className="w-full lg:w-[36rem] xl:w-[45rem]">
          <h1 className="text-3xl font-semibold">Gift Finder</h1>
          {/* Search Bar and Categories */}
          <div className={`z-index${scrolled ? `w-full h-[136px]` : ""}`}></div>
          <div
            className={`py-4 flex flex-col gap-2 bg-white ${
              scrolled ? "fixed top-20 w-[45rem]" : ""
            }`}
          >
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
              <h3 className="ml-1 text-md text-semibold text-blue-500 cursor-pointer hover:underline overflow-y-hided">
                Clear all filters
              </h3>
            </div>
          </div>
          {/* Searched Items */}
          <div className="flex justify-evenly flex-wrap gap-6">
            <div className="w-40 h-48 my-2 border border-dashed"></div>
            <div className="w-40 h-48 my-2 border border-dashed"></div>
            <div className="w-40 h-48 my-2 border border-dashed"></div>
            <div className="w-40 h-48 my-2 border border-dashed"></div>
            <div className="w-40 h-48 my-2 border border-dashed"></div>
            <div className="w-40 h-48 my-2 border border-dashed"></div>
            <div className="w-40 h-48 my-2 border border-dashed"></div>
            <div className="w-40 h-48 my-2 border border-dashed"></div>
            <div className="w-40 h-48 my-2 border border-dashed"></div>
            <div className="w-40 h-48 my-2 border border-dashed"></div>
            <div className="w-40 h-48 my-2 border border-dashed"></div>
            <div className="w-40 h-48 my-2 border border-dashed"></div>
            <div className="w-40 h-48 my-2 border border-dashed"></div>
            <div className="w-40 h-48 my-2 border border-dashed"></div>
            <div className="w-40 h-48 my-2 border border-dashed"></div>
            <div className="w-40 h-48 my-2 border border-dashed"></div>
            <div className="w-40 h-48 my-2 border border-dashed"></div>
          </div>
        </div>

        {/* Wish List Area */}
        <div className="hidden lg:inline-block w-[24rem] h-[calc(100vh-112px)] ">
          <div className="fixed w-[24rem] border border-dashed bottom-10 top-32 overflow-y-scroll"></div>
        </div>
      </div>
    </div>
  );
}
