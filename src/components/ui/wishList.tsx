import { ItemWithLikeInfo } from "@/app/my-list/page";
import { useEffect, useState } from "react";
import WishListItem from "./wishListItem";

export type ListItem = {
  asin: string;
  name?: string;
};

const WishList = () => {
  const [listItems, setListItems] = useState<ListItem[]>([]);

  useEffect(() => {
    const getListItems = async () => {
      try {
        const request = await fetch("/api/products/likedProducts", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const response = await request.json();
        if (!response.error) {
          const likedItems: ListItem[] = response;
          setListItems(likedItems);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getListItems();
  }, []);

  async function removeFromWishlist(asin: string) {
    try {
      await fetch("/api/products/likedProducts", {
        method: "POST",
        body: JSON.stringify(asin),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="w-full h-full">
      <div className="w-full bg-blue-400 p-4 mb-4">
        <h1 className="text-center font-bold text-2xl">My Wish List</h1>
      </div>
      <div className="px-4">
        {listItems.map((item) => (
          <WishListItem
            key={item.asin}
            wishListItem={item}
            onClose={() => removeFromWishlist(item.asin)}
          />
        ))}
      </div>
      {/* <button className="block p-2 bg-gray-200">Add Item</button> */}
    </div>
  );
};

export default WishList;
