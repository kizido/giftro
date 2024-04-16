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
      <div className="pt-4 w-60 h-4/5 border border-black">
        <h2 className="text-center font-semibold">Upcoming Events</h2>
      </div>

      {/* Trending/Popular Items */}
      <div className="px-24 py-24 w-full self-start flex flex-wrap justify-center gap-x-12 gap-y-12">
        <div className="w-44 h-28 border border-black"></div>
        <div className="w-44 h-28 border border-black"></div>
        <div className="w-44 h-28 border border-black"></div>
        <div className="w-44 h-28 border border-black"></div>
        <div className="w-44 h-28 border border-black"></div>
        <div className="w-44 h-28 border border-black"></div>
        <div className="w-44 h-28 border border-black"></div>
        <div className="w-44 h-28 border border-black"></div>
      </div>

      {/* Recent Friend Activity */}
      <div className="pt-4 w-60 h-4/5 border border-black">
        <h2 className="text-center font-semibold">Recent Activity</h2>
      </div>
      {isFirstTimeUser && modalOpen && (
        <OnboardingModal onClose={() => setModalOpen(false)} />
      )}
    </div>
  );
}
