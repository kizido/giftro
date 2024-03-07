"use client";
import OnboardingModal from "@/lib/components/OnboardingModal";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";

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
      console.log("Response: " + responseData);
      setIsFirstTimeUser(responseData);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      {isFirstTimeUser && modalOpen && (
        <OnboardingModal onClose={() => setModalOpen(false)} />
      )}
    </div>
  );
}
