"use client";
import OnboardingModal from "@/lib/components/OnboardingModal";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { useDebounceValue } from "@/hooks/useDebounceValue";
import { QueryResultRow } from "@vercel/postgres";
import EventDisplayModal from "@/components/ui/eventDisplayModal";
import { TCreateEvent } from "@/lib/types";

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

  const [filterState, setFilterState] = useState("trending");
  const [eventDisplayModal, setEventDisplayModal] = useState(false);

  const [displayedEvent, setDisplayedEvent] = useState<TEventDisplay | null>(
    null
  );
  const [upcomingEvents, setUpcomingEvents] = useState<TEventDisplay[]>([]);

  useEffect(() => {
    checkIsFirstTimeUser();
    loadUpcomingEvents();
  }, []);

  useEffect(() => {
    console.log(upcomingEvents);
  }, [upcomingEvents]);

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
        {upcomingEvents.map((event) => (
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
        {/* <p
          className="cursor-pointer hover:text-gray-400"
          onClick={() => setEventDisplayModal(true)}
        >{`May 12 - Mother's Day`}</p>
        <p
          className="cursor-pointer hover:text-gray-400"
          onClick={() => setEventDisplayModal(true)}
        >{`June 14 - Kyle's Birthday`}</p> */}
      </div>

      {/* Trending/Popular Items */}
      <div className="px-24 pt-24 w-full self-start">
        {/* Item Filters */}
        <div className="w-full self-start flex flex-wrap justify-center gap-x-12 gap-y-12 content-box">
          <div
            className={`flex justify-center items-center w-36 h-28 border-2 border-black bg-red-200 cursor-pointer ${
              filterState === "trending" ? "border-4 border-yellow-200" : ""
            }`}
            onClick={() => setFilterState("trending")}
          >
            <h2 className="font-semibold">Trending</h2>
          </div>
          <div
            className={`flex justify-center items-center w-36 h-28 border-2 border-black bg-blue-200 cursor-pointer ${
              filterState === "popular" ? "border-4 border-yellow-200" : ""
            }`}
            onClick={() => setFilterState("popular")}
          >
            <h2 className="text-center py-10 font-semibold">Most Popular</h2>
          </div>
          <div
            className={`flex justify-center items-center w-36 h-28 border-2 border-black bg-orange-200 cursor-pointer ${
              filterState === "seasonal" ? "border-4 border-yellow-200" : ""
            }`}
            onClick={() => setFilterState("seasonal")}
          >
            <h2 className="text-center py-10 font-semibold">Seasonal</h2>
          </div>
          <div
            className={`flex justify-center items-center w-36 h-28 border-2 border-black bg-green-200 cursor-pointer ${
              filterState === "holiday" ? "border-4 border-yellow-200" : ""
            }`}
            onClick={() => setFilterState("holiday")}
          >
            <h2 className="text-center py-10 font-semibold">Mothers Day</h2>
          </div>
        </div>

        {/* Recommended Items */}
        <div className="w-full flex flex-wrap"></div>
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
