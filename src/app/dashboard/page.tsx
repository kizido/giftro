"use client";
import OnboardingModal from "@/lib/components/OnboardingModal";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { useDebounceCallback } from "@/hooks/useDebounceCallback";
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
  const [itemPage, setItemPage] = useState<number>(1);
  const [popularPage, setPopularPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [responseItems, setResponseItems] = useState<ItemWithLikeInfo[]>([]);

  useEffect(() => {
    checkIsFirstTimeUser();
    loadPopularProducts();
    loadUpcomingEvents();
  }, []);

  useEffect(() => {
    setItemPage(1);
    setPopularPage(1);
  }, [searchQuery]);

  const loadPopularProducts = async () => {
    setIsLoading(true);
    try {
      const request = await fetch("/api/loadProducts/" + popularPage, {
        method: "POST",
        body: JSON.stringify(filterState),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await request.json();
      if (!response.error) {
        if (Array.isArray(response)) {
          if (popularPage > 1) {
            setResponseItems((prevItems) => [...prevItems, ...response]);
          } else {
            setResponseItems(response);
          }
        } else {
          console.error("Response is not an array:", response);
        }
        setPopularPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const searchAmazon = async () => {
    setIsLoading(true);
    try {
      const request = await fetch("/api/searchAmazon/" + searchQuery, {
        method: "POST",
        body: JSON.stringify(itemPage),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await request.json();
      if (!response.error) {
        if (Array.isArray(response)) {
          if (itemPage > 1) {
            setResponseItems((prevItems) => [...prevItems, ...response]);
          } else {
            setResponseItems(response);
          }
        } else {
          console.error("Response is not an array:", response);
        }
        setItemPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
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

  const debouncedSearchAmazon = useDebounceCallback(searchAmazon, 1500, {
    leading: true,
    trailing: false,
  });
  const debouncedSearchPopular = useDebounceCallback(
    loadPopularProducts,
    1500,
    {
      leading: true,
      trailing: false,
    }
  );

  const handleProductScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 2) {
      if (searchQuery !== "" && !isLoading) {
        debouncedSearchAmazon();
      }
    }
  };
  const handlePopularScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 2) {
      if (searchQuery === "" && !isLoading) {
        debouncedSearchPopular();
      }
    }
  };

  useEffect(() => {
    if (searchQuery === "") {
      window.addEventListener("scroll", handlePopularScroll);
      return () => window.removeEventListener("scroll", handlePopularScroll);
    } else {
      window.addEventListener("scroll", handleProductScroll);
      return () => window.removeEventListener("scroll", handleProductScroll);
    }
  }, [isLoading]);

  useEffect(() => {
    const getBirthdayEvents = async () => {
      try {
        const response = await fetch("/api/events/birthdays", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const responseData = await response.json();
        console.log(responseData);
      } catch (error) {
        console.log(error);
      }
    };
    getBirthdayEvents();
  }, []);

  const DisplayCards = () => {
    return responseItems.map((item, index) => (
      <SearchCard key={item.ASIN} index={index} item={item} />
    ));
  };

  return (
    <div className="h-full container max-w-[22rem] sm:max-w-[30rem] md:max-w-[45rem] lg:max-w-[80rem] xl:max-w-[90rem] gap-4 mt-8">
      <div className="h-full flex justify-center">
        {/* Upcoming Events */}
        {/* <div className="pt-4 px-4 w-64 h-5/6 shadow-[0_0_8px_0px_rgba(0,0,0,0.5)] rounded-lg flex flex-col gap-4 bg-gray-50">
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
        </div> */}

        {/* Gift Searching Area */}
        <div className="w-full lg:w-[36rem] xl:w-[45rem]">
          {/* Trending/Popular Items */}
          <div className="w-full self-start">
            {/* Item Filters */}
            {/* <div className="w-full flex justify-between content-box">
              <div
                className={`w-20 h-16 md:w-24 md:h-18 lg:w-32 lg:h-24 xl:w-36 xl:h-28 flex justify-center items-center border-2 border-black bg-blue-200 cursor-pointer ${
                  filterState === "POPULAR" ? "border-4 border-yellow-200" : ""
                }`}
                onClick={() => setFilterState("POPULAR")}
              >
                <h2 className="text-center py-10 font-semibold">
                  Most Popular
                </h2>
              </div>
              <div
                className={`w-20 h-16 md:w-24 md:h-18 lg:w-32 lg:h-24 xl:w-36 xl:h-28 flex justify-center items-center border-2 border-black bg-red-200 cursor-pointer ${
                  filterState === "TRENDING" ? "border-4 border-yellow-200" : ""
                }`}
                onClick={() => setFilterState("TRENDING")}
              >
                <h2 className="font-semibold">Trending</h2>
              </div>
              <div
                className={`w-20 h-16 md:w-24 md:h-18 lg:w-32 lg:h-24 xl:w-36 xl:h-28 flex justify-center items-center border-2 border-black bg-orange-200 cursor-pointer ${
                  filterState === "SEASONAL" ? "border-4 border-yellow-200" : ""
                }`}
                onClick={() => setFilterState("SEASONAL")}
              >
                <h2 className="text-center py-10 font-semibold">Seasonal</h2>
              </div>
              <div
                className={`w-20 h-16 md:w-24 md:h-18 lg:w-32 lg:h-24 xl:w-36 xl:h-28 flex justify-center items-center border-2 border-black bg-green-200 cursor-pointer ${
                  filterState === "HOLIDAY" ? "border-4 border-yellow-200" : ""
                }`}
                onClick={() => setFilterState("HOLIDAY")}
              >
                <h2 className="text-center py-10 font-semibold">Mothers Day</h2>
              </div>
            </div> */}
          </div>

          {/* Search Bar and Categories */}
          {/* <div className={`${scrolled ? `w-full h-[136px]` : ""}`}></div> */}
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
            {/* <div className="flex flex-wrap gap-2 justify-start items-center">
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
            </div> */}
          </div>
          {/* Searched Items */}
          <div className="flex justify-start flex-wrap gap-6">
            {responseItems && DisplayCards()}
          </div>
        </div>
        {/* Recent Friend Activity */}
        {/* <div className="pt-4 px-4 w-64 h-5/6 shadow-[0_0_8px_0px_rgba(0,0,0,0.5)] rounded-lg flex flex-col gap-4 bg-gray-50">
          <h2 className="text-center font-semibold">Recent Activity</h2>
          <p>Kieran liked Logitech Headset</p>
          <p>Junnelle liked PopMart Figure</p>
        </div>
        {isFirstTimeUser && modalOpen && (
          <OnboardingModal onClose={() => setModalOpen(false)} />
        )} */}
      </div>
    </div>
  );
}
