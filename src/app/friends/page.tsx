"use client";
import { Input } from "@/components/ui/input";
import { useDebounceValue } from "@/hooks/useDebounceValue";
import { QueryResultRow } from "@vercel/postgres";
import React, { useEffect, useState } from "react";

export default function Friends() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debouncedSearchQuery, updateDebouncedSearchQuery] = useDebounceValue(
    searchQuery,
    500
  );
  const [loadedUsers, setLoadedUsers] = useState<QueryResultRow[]>([]);

  useEffect(() => {
    console.log("DEBOUNCE: " + debouncedSearchQuery);
    if (debouncedSearchQuery) {
      // Make api fetch request for users
      loadUsers();
    } else if (debouncedSearchQuery === "") {
      setLoadedUsers([]);
    }
  }, [debouncedSearchQuery]);

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

  const addFriend = async () => {
    try {
      const response = await fetch("/api/friends", {
        method: "POST",
        body: JSON.stringify({ receiver: "Junnelle" }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full flex justify-center">
      <section className="mt-8 w-1/4">
        <Input
          type="search"
          className="bg-white"
          placeholder="Search for friends..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <div className="mt-4 flex flex-col gap-4">
          {loadedUsers.map((user: QueryResultRow) => (
            <div key={user.id} className="flex justify-between">
              <span>{user.username}</span>
              <button onClick={addFriend}>Add</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
