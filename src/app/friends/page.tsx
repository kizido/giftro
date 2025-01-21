"use client";
import { Button } from "@/components/ui/button";
import CreateEventModal from "@/components/ui/createEventModal";
import FriendWishListModal from "@/components/ui/friendWishListModal";
import { Input } from "@/components/ui/input";
import { ListItem } from "@/components/ui/wishList";
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
  const [friendsLoaded, setFriendsLoaded] = useState(false);

  const [showFriendWishListModal, setShowFriendWishListModal] = useState(false);
  const [wishListFriendName, setWishListFriendName] = useState<string>("");
  const [friendWishList, setFriendWishList] = useState<ListItem[]>([]);

  useEffect(() => {
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
  useEffect(() => {
    if(friendWishList.length > 0) {
      setShowFriendWishListModal(true);
    }
  }, [friendWishList])

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
      if (friendNames.length > 0) {
        setFriendsLoaded(true);
      } else {
        setFriendsLoaded(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
      loadFriends();
    } catch (error) {
      console.log(error);
    }
  };

  const declineFriendRequest = async (senderId: string) => {
    try {
      const response = await fetch("/api/friendRequests", {
        method: "DELETE",
        body: JSON.stringify(senderId),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseMessage = await response.json();
      if (!responseMessage.error) {
        loadFriendRequests();
      }
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

  const showFriendWishList = async (username: string) => {
    // Retrieve friend's wish list items
    // Open Modal with wish list items
    try {
      // Get ID of user with username
      const idResponse = await fetch("/api/userIdFromName", {
        method: "POST",
        body: JSON.stringify(username),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const userId = await idResponse.json();

      const wishListResponse = await fetch(
        "/api/products/friendLikedProducts",
        {
          method: "POST",
          body: JSON.stringify(userId),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const wishList: ListItem[] = await wishListResponse.json();
      setFriendWishList(wishList);
    } catch (error) {
      console.log(error);
    }
    setWishListFriendName(username);
  };

  return (
    <div className="w-full h-full flex justify-center px-2 gap-1 sm:gap-4 min-w-[360px]">
      {/* My Friends Section */}
      <section className="py-8 w-1/4 h-full min-w-44">
        <div className="h-full flex flex-col gap-4 border-2 py-4 px-4 lg:px-12 overflow-y-auto">
          <h1 className="self-center bold text-base lg:text-lg text-center text-primary">
            My Friends
          </h1>
          {friends.length > 0 || !friendsLoaded ? (
            friends.map((friend) => (
              <div className="flex justify-between items-center" key={friend}>
                <p className="text-xs md:text-sm lg:text-base">{friend}</p>
                <div className="flex gap-2 items-center">
                  <button
                    className="border-2 rounded px-1 py-0.5 text-xs md:text-sm"
                    onClick={() => showFriendWishList(friend)}
                  >
                    View List
                  </button>
                  <p
                    className="text-sm lg:text-base text-red-500 cursor-pointer"
                    onClick={() => removeFriend(friend)}
                  >
                    X
                  </p>
                </div>
              </div>
            ))
          ) : (
            <span className="text-sm text-center text-gray-400">
              You have no friends added.
            </span>
          )}
        </div>
      </section>

      {/* Friend Request Section */}
      <section className="py-8 w-1/4 h-full min-w-44 flex flex-col">
        <div className="flex-1 flex flex-col overflow-y-auto">
          <Input
            type="search"
            className="bg-input border-2 border-border outline-black place"
            placeholder="Add a Friend..."
            value={searchQuery}
            onChange={handleSearchChange}
            ringOff
          />
          {/* Add Friend */}
          <div className="mt-4 flex flex-col gap-4 border-2 py-4 px-4 lg:px-12 overflow-y-scroll flex-1">
            {loadedUsers.map((user: QueryResultRow) => (
              <div key={user.id} className="flex items-center justify-between">
                <span className="text-sm lg:text-base">{user.username}</span>
                <button
                  className="border border-black px-1 md:px-2 py-1 text-xs lg:text-sm bg-gray-200 hover:bg-gray-300"
                  onClick={() => addFriend(user.id)}
                >
                  Add
                </button>
              </div>
            ))}
            {loadedUsers.length < 1 && (
              <span className="text-sm text-center text-gray-400">
                Search for friends!
              </span>
            )}
          </div>
        </div>
        {/* Incoming Friend Requests */}
        <div className="mt-4 flex flex-col gap-4 border-2 py-4 px-4 lg:px-12 overflow-y-auto flex-1">
          <h1 className="self-center bold text-md lg:text-lg text-center text-primary">
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
          {loadedFriendRequests.length < 1 && (
            <span className="text-sm text-center text-gray-400">
              You have no friend requests.
            </span>
          )}
        </div>
      </section>
      {showFriendWishListModal && (
        <FriendWishListModal
          friendName={wishListFriendName}
          wishList={friendWishList}
          onClose={() => setShowFriendWishListModal(false)}
        />
      )}
    </div>
  );
}
