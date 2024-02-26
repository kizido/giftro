"use client";
import { useEffect, useState } from "react";

export default function page() {
  const [isFirstTimeUser, setIsFirstTimeUser] = useState(false);

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
        setIsFirstTimeUser(responseData);
      } catch (e) {
        console.log(e);
      }
    };
    checkIsFirstTimeUser();
  }, []);
  return <div>{isFirstTimeUser ? <p>WELCOME TO DASHBOARD</p> : <p>Onboarding</p>}</div>;
}
