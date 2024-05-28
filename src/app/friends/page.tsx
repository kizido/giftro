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

  const [friends, setFriends] = useState<string[]>([]);

  useEffect(() => {
    const loadFriends = async () => {
      try {
        const request = await fetch("/api/friends", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const requestedFriends = await request.json();
        const friendNames = requestedFriends.map(
          (friend: { friend_name: string }) => friend.friend_name
        );
        setFriends(friendNames);
      } catch (error) {
        console.log(error);
      }
    };
    loadFriends();
    loadFriendRequests();
  }, []);

  useEffect(() => {
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

  const declineFriendRequest = async (senderId: string) => {
    try {
      await fetch("/api/friendRequests", {
        method: "DELETE",
        body: JSON.stringify(senderId),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const removeFriend = async (friendName: string) => {
    try {
      const response = await fetch("/api/friends", {
        method: "DELETE",
        body: JSON.stringify(friendName),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseMessage = await response.json();
      if (!responseMessage.error) {
        setFriends(friends.filter((friend) => friend !== friendName));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full flex justify-center gap-4">
      {/* My Friends Section */}
      <section className="mt-4 w-1/4 h-screen">
        <div className="mt-4 h-4/5 flex flex-col gap-4 border-2 py-4 px-20 overflow-y-auto">
          <h1 className="self-center bold text-lg text-center">My Friends</h1>
          {friends.map((friend) => (
            <div className="flex justify-between items-center" key={friend}>
              <p>{friend}</p>
              <p
                className="text-red-500 cursor-pointer"
                onClick={() => removeFriend(friend)}
              >
                X
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Friend Request Section */}
      <section className="mt-8 w-1/4 h-screen">
        <Input
          type="search"
          className="bg-input border-2 border-border outline-black"
          placeholder="Add a Friend..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        {/* Add Friend */}
        <div className="mt-4 h-2/5 flex flex-col gap-4 border-2 py-4 px-20 overflow-y-auto">
          {loadedUsers.map((user: QueryResultRow) => (
            <div key={user.id} className="flex justify-between">
              <span>{user.username}</span>
              <button onClick={() => addFriend(user.id)}>Add</button>
            </div>
          ))}
        </div>
        {/* Incoming Friend Requests */}
        <div className="mt-4 h-2/5 flex flex-col gap-4 border-2 py-4 px-20 overflow-y-auto">
          <h1 className="self-center bold text-lg text-center">
            Incoming Friend Requests
          </h1>
          {loadedFriendRequests.map((requester: QueryResultRow) => (
            <div key={requester.id} className="flex justify-between">
              <span>{requester.username}</span>
              <div>
                <button
                  className="text-green-400 mr-3"
                  onClick={() => acceptFriendRequest(requester.id)}
                >
                  Accept
                </button>
                <button
                  className="text-red-400"
                  onClick={() => declineFriendRequest(requester.id)}
                >
                  Decline
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
