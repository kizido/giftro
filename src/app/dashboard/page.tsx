"use client";
import OnboardingModal from "@/lib/components/OnboardingModal";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { useDebounceValue } from "@/hooks/useDebounceValue";
import { QueryResultRow } from "@vercel/postgres";

export default function Page() {
  const session = useSession();
  const [isFirstTimeUser, setIsFirstTimeUser] = useState(false);
  const [modalOpen, setModalOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debouncedSearchQuery, updateDebouncedSearchQuery] = useDebounceValue(
    searchQuery,
    500
  );
  const [loadedUsers, setLoadedUsers] = useState<QueryResultRow[]>([]);

  useEffect(() => {
    checkIsFirstTimeUser();
  }, []);
  useEffect(() => {
    console.log("DEBOUNCE: " + debouncedSearchQuery);
    if (debouncedSearchQuery) {
      // Make api fetch request for users
      loadUsers();
    }
  }, [debouncedSearchQuery]);

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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchQuery(value);
    updateDebouncedSearchQuery(value);
  };
  const loadUsers = async () => {
    try {
      console.log("LOADING USERS");
      const response = await fetch(`/api/users?query=${debouncedSearchQuery}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("USERS LOADED");
      const { retrievedUsers } = await response.json();
      console.log("USERS RETRIEVED");
      setLoadedUsers(retrievedUsers);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full pt-20 flex justify-center">
      <section className="mt-8 w-1/4">
        <Input
          type="search"
          className="bg-white"
          placeholder="Search for friends..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <>
          {loadedUsers.map((user: QueryResultRow, index: number) => (
            // Ensure each element has a unique key, using index as a fallback
            <span key={user.id}>{user.username}</span>
          ))}
        </>
      </section>
      {isFirstTimeUser && modalOpen && (
        <OnboardingModal onClose={() => setModalOpen(false)} />
      )}
    </div>
  );
}
