"use client";
import OnboardingModal from "@/lib/components/OnboardingModal";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function page() {
  const [isFirstTimeUser, setIsFirstTimeUser] = useState(false);
  const [modalOpen, setModalOpen] = useState(true);

  useEffect(() => {
    const checkIsFirstTimeUser = async () => {
      try {
        const response = await fetch("/api/auth/firstTimeUser", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const responseData = await response.json();
        console.log("Response: " + responseData);
        setIsFirstTimeUser(responseData);
      } catch (e) {
        console.log(e);
      }
    };
    checkIsFirstTimeUser();
  }, []);
  return (
    <div>
      {
        <OnboardingModal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
          <form className="flex flex-col items-center">
            <h1 className="mb-4 text-2xl font-bold">
              Help us learn a little about you...
            </h1>
            <label className="block pb-1 text-xl">What year were you born? (optional)</label>
            <input className="mb-4 w-20 px-2 text-center"/>

            <button className="px-4 py-2 bg-gray-400 font-semibold">Next</button>
          </form>
        </OnboardingModal>
      }
    </div>
  );
}
