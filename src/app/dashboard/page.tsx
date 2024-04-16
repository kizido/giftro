"use client";
import OnboardingModal from "@/lib/components/OnboardingModal";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { useDebounceValue } from "@/hooks/useDebounceValue";
import { QueryResultRow } from "@vercel/postgres";

export default function Page() {
  const [isFirstTimeUser, setIsFirstTimeUser] = useState(false);
  const [modalOpen, setModalOpen] = useState(true);

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
    <div className="w-full h-full flex justify-between items-center px-20">
      {/* Upcoming Events */}
      <div className="pt-4 px-4 w-72 h-4/5 shadow-[0_0_8px_0px_rgba(0,0,0,0.5)] rounded-lg flex flex-col gap-4">
        <h2 className="text-center font-semibold">Upcoming Events</h2>
        <p>May 12 - Mother's Day</p>
        <p>June 14 - Kyle's Birthday</p>
      </div>

      {/* Trending/Popular Items */}
      <div className="px-24 py-24 w-full self-start flex flex-wrap justify-center gap-x-12 gap-y-12">
        <div className="w-44 h-28 border border-black">
          <h2 className="text-center py-10 font-semibold">Trending</h2>
        </div>
        <div className="w-44 h-28 border border-black">
          <h2 className="text-center py-10 font-semibold">Most Popular</h2>
        </div>
        <div className="w-44 h-28 border border-black">
          <h2 className="text-center py-10 font-semibold">Seasonal</h2>
        </div>
        <div className="w-44 h-28 border border-black">
          <h2 className="text-center py-10 font-semibold">Mother's Day</h2>
        </div>
        {/* <div className="w-44 h-28 border border-black"></div>
        <div className="w-44 h-28 border border-black"></div>
        <div className="w-44 h-28 border border-black"></div>
        <div className="w-44 h-28 border border-black"></div> */}
      </div>

      {/* Recent Friend Activity */}
      <div className="pt-4 w-72 h-4/5 shadow-[0_0_8px_0px_rgba(0,0,0,0.5)] rounded-lg">
        <h2 className="text-center font-semibold">Recent Activity</h2>
      </div>
      {isFirstTimeUser && modalOpen && (
        <OnboardingModal onClose={() => setModalOpen(false)} />
      )}
    </div>
  );
}
