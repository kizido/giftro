"use client";
import OnboardingModal from "@/lib/components/OnboardingModal";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Page() {
  const [isFirstTimeUser, setIsFirstTimeUser] = useState(false);
  const [showOnboardingModal, setShowOnboardingModal] = useState(false);
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
      {modalOpen && <OnboardingModal onClose={() => setModalOpen(false)} />}
    </div>
  );
}
