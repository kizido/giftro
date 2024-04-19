"use client";
import OnboardingModal from "@/lib/components/OnboardingModal";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { useDebounceValue } from "@/hooks/useDebounceValue";
import { QueryResultRow } from "@vercel/postgres";

export default function Page() {
  const [isFirstTimeUser, setIsFirstTimeUser] = useState(false);
  const [modalOpen, setModalOpen] = useState(true);

  const [filterState, setFilterState] = useState('trending');

  useEffect(() => {
    checkIsFirstTimeUser();
  }, []);
  

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

  return (
    <div className="w-full h-full flex justify-between items-center px-72">
      {/* Upcoming Events */}
      <div className="pt-4 px-4 w-80 h-4/5 shadow-[0_0_8px_0px_rgba(0,0,0,0.5)] rounded-lg flex flex-col gap-4 bg-gray-50">
        <h2 className="text-center font-semibold">Upcoming Events</h2>
        <p>May 12 - Mother's Day</p>
        <p>June 14 - Kyle's Birthday</p>
      </div>

      {/* Trending/Popular Items */}
      <div className="px-24 pt-24 w-full self-start">
        {/* Item Filters */}
        <div className="w-full self-start flex flex-wrap justify-center gap-x-12 gap-y-12 content-box">
          <div className={`flex justify-center items-center w-36 h-28 border-2 border-black bg-red-200 cursor-pointer ${filterState === 'trending' ? 'border-4 border-yellow-200' : ''}`} onClick={() => setFilterState('trending')}>
            <h2 className="font-semibold">Trending</h2>
          </div>
          <div className={`flex justify-center items-center w-36 h-28 border-2 border-black bg-blue-200 cursor-pointer ${filterState === 'popular' ? 'border-4 border-yellow-200' : ''}`} onClick={() => setFilterState('popular')}>
            <h2 className="text-center py-10 font-semibold">Most Popular</h2>
          </div>
          <div className={`flex justify-center items-center w-36 h-28 border-2 border-black bg-orange-200 cursor-pointer ${filterState === 'seasonal' ? 'border-4 border-yellow-200' : ''}`} onClick={() => setFilterState('seasonal')}>
            <h2 className="text-center py-10 font-semibold">Seasonal</h2>
          </div>
          <div className={`flex justify-center items-center w-36 h-28 border-2 border-black bg-green-200 cursor-pointer ${filterState === 'holiday' ? 'border-4 border-yellow-200' : ''}`} onClick={() => setFilterState('holiday')}>
            <h2 className="text-center py-10 font-semibold">Mother's Day</h2>
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
