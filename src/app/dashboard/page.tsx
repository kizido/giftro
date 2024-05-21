"use client";
import OnboardingModal from "@/lib/components/OnboardingModal";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { useDebounceValue } from "@/hooks/useDebounceValue";
import { QueryResultRow } from "@vercel/postgres";
import EventDisplayModal from "@/components/ui/eventDisplayModal";
import { TCreateEvent } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { ItemWithLikeInfo } from "../my-list/page";
import SearchCard from "@/components/ui/searchCard";

export type TEventDisplay = {
  event_id: number;
  event_name: string;
  event_date: string;
  giftees: string;
  event_gifts: string;
  budget: string;
  annual: boolean;
};
export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function Page() {
  const [isFirstTimeUser, setIsFirstTimeUser] = useState(false);
  const [modalOpen, setModalOpen] = useState(true);

  const [filterState, setFilterState] = useState("POPULAR");
  const [eventDisplayModal, setEventDisplayModal] = useState(false);

  const [displayedEvent, setDisplayedEvent] = useState<TEventDisplay | null>(
    null
  );
  const [upcomingEvents, setUpcomingEvents] = useState<TEventDisplay[]>([]);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [responseItems, setResponseItems] = useState<ItemWithLikeInfo[]>([]);

  useEffect(() => {
    checkIsFirstTimeUser();
    loadPopularProducts();
    loadUpcomingEvents();
  }, []);

  useEffect(() => {
    console.log(upcomingEvents);
  }, [upcomingEvents]);

  const loadPopularProducts = async () => {
    try {
      const request = await fetch("/api/loadProducts", {
        method: "POST",
        body: JSON.stringify(filterState),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await request.json();
      console.log(response);
      if (!response.error) {
        setResponseItems(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const searchAmazon = async () => {
    try {
      const request = await fetch("/api/searchAmazon", {
        method: "POST",
        body: JSON.stringify(searchQuery),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await request.json();
      if (!response.error) {
        setResponseItems(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkIsFirstTimeUser = async () => {
    try {
      const response = await fetch("/api/auth/firstTimeUser", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseData = await response.json();
      setIsFirstTimeUser(responseData);
    } catch (e) {
      console.log(e);
    }
  };

  const loadUpcomingEvents = async () => {
    try {
      const response = await fetch("/api/events", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseData = await response.json();
      setUpcomingEvents(responseData);
    } catch (error) {
      console.log(error);
    }
  };

  const DisplayCards = () => {
    return responseItems.map((item, index) => (
      <SearchCard key={item.ASIN} index={index} item={item} />
    ));
  };

  return (
    <div className="w-full h-full flex justify-between items-center px-72">
      {/* Upcoming Events */}
      <div className="pt-4 px-4 w-80 h-4/5 shadow-[0_0_8px_0px_rgba(0,0,0,0.5)] rounded-lg flex flex-col gap-4 bg-gray-50">
        {/* Event Display Modal */}
        {eventDisplayModal && (
          <EventDisplayModal
            onClose={() => {
              setDisplayedEvent(null);
              setEventDisplayModal(false);
            }}
            event={displayedEvent}
          />
        )}

        <h2 className="text-center font-semibold">Upcoming Events</h2>
        {upcomingEvents
          .sort(
            (a, b) =>
              new Date(a.event_date).getTime() -
              new Date(b.event_date).getTime()
          )
          .map((event) => (
            <p
              key={event.event_id}
              className="cursor-pointer hover:text-gray-400"
              onClick={() => {
                setDisplayedEvent(event);
                setEventDisplayModal(true);
              }}
            >
              {months[new Date(event.event_date).getMonth()]}{" "}
              {new Date(event.event_date).getDate()} - {event.event_name}
            </p>
          ))}
      </div>

      {/* Trending/Popular Items */}
      <div className="px-24 pt-24 w-full self-start">
        {/* Item Filters */}
        <div className="w-full self-start flex flex-wrap justify-center gap-x-12 gap-y-12 content-box">
          <div
            className={`flex justify-center items-center w-36 h-28 border-2 border-black bg-blue-200 cursor-pointer ${
              filterState === "POPULAR" ? "border-4 border-yellow-200" : ""
            }`}
            onClick={() => setFilterState("POPULAR")}
          >
            <h2 className="text-center py-10 font-semibold">Most Popular</h2>
          </div>
          <div
            className={`flex justify-center items-center w-36 h-28 border-2 border-black bg-red-200 cursor-pointer ${
              filterState === "TRENDING" ? "border-4 border-yellow-200" : ""
            }`}
            onClick={() => setFilterState("TRENDING")}
          >
            <h2 className="font-semibold">Trending</h2>
          </div>
          <div
            className={`flex justify-center items-center w-36 h-28 border-2 border-black bg-orange-200 cursor-pointer ${
              filterState === "SEASONAL" ? "border-4 border-yellow-200" : ""
            }`}
            onClick={() => setFilterState("SEASONAL")}
          >
            <h2 className="text-center py-10 font-semibold">Seasonal</h2>
          </div>
          <div
            className={`flex justify-center items-center w-36 h-28 border-2 border-black bg-green-200 cursor-pointer ${
              filterState === "HOLIDAY" ? "border-4 border-yellow-200" : ""
            }`}
            onClick={() => setFilterState("HOLIDAY")}
          >
            <h2 className="text-center py-10 font-semibold">Mothers Day</h2>
          </div>
        </div>

        {/* Recommended Items */}

        {/* Gift Searching Area */}
        <div className="w-full lg:w-[36rem] xl:w-[45rem]">
          {/* Search Bar and Categories */}
          <div className={`py-4 flex flex-col gap-2 bg-white z-30`}>
            <Input
              className="h-14 text-md"
              placeholder="Search for gifts here..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  searchAmazon();
                }
              }}
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
          <div className="flex justify-start flex-wrap gap-6">
            {responseItems && DisplayCards()}
          </div>
        </div>
      </div>

      {/* Recent Friend Activity */}
      <div className="pt-4 px-4 w-80 h-4/5 shadow-[0_0_8px_0px_rgba(0,0,0,0.5)] rounded-lg flex flex-col gap-4 bg-gray-50">
        <h2 className="text-center font-semibold">Recent Activity</h2>
        <p>Kieran liked Logitech Headset</p>
        <p>Junnelle liked PopMart Figure</p>
      </div>
      {isFirstTimeUser && modalOpen && (
        <OnboardingModal onClose={() => setModalOpen(false)} />
      )}
    </div>
  );
}
