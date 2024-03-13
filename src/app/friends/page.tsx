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
  const [loadedFriendRequests, setLoadedFriendRequests] = useState<
    QueryResultRow[]
  >([]);

  useEffect(() => {
    loadFriendRequests();
  }, []);
  useEffect(() => {
    console.log("DEBOUNCE: " + debouncedSearchQuery);
    if (debouncedSearchQuery) {
      // Make api fetch request for users
      loadQueriedUsers();
    } else if (debouncedSearchQuery === "") {
      setLoadedUsers([]);
    }
  }, [debouncedSearchQuery]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchQuery(value);
    updateDebouncedSearchQuery(value);
  };
  const loadQueriedUsers = async () => {
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
  const loadFriendRequests = async () => {
    try {
      const response = await fetch("/api/friendRequests", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { requests } = await response.json();
      setLoadedFriendRequests(requests);
    } catch (error) {
      console.log(error);
    }
  };

  const addFriend = async (receiverId: string) => {
    try {
      await fetch("/api/friendRequests", {
        method: "POST",
        body: JSON.stringify({ receiverId }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  const acceptFriendRequest = async (senderId: string) => {
    try {
      await fetch("/api/friendRequests", {
        method: "PATCH",
        body: JSON.stringify({ senderId }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      loadFriendRequests();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full flex justify-center">
      <section className="mt-8 w-1/4 h-screen">
        <Input
          type="search"
          className="bg-input border-2 border-border outline-black"
          placeholder="Search for friends..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <div className="mt-4 h-2/5 flex flex-col gap-4 border-2 py-4 px-20">
          {loadedUsers.map((user: QueryResultRow) => (
            <div key={user.id} className="flex justify-between">
              <span>{user.username}</span>
              <button onClick={() => addFriend(user.id)}>Add</button>
            </div>
          ))}
        </div>
        <div className="mt-4 h-2/5 flex flex-col gap-4 border-2 py-4 px-20">
          <h1 className="self-center bold text-2xl">My Friend Requests</h1>
          {loadedFriendRequests.map((requester: QueryResultRow) => (
            <div key={requester.id} className="flex justify-between">
              <span>{requester.username}</span>
              <button onClick={() => acceptFriendRequest(requester.id)}>
                Accept
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
