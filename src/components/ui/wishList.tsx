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
        if(!response.error) {
            const likedItems: ListItem[] = response;
            setListItems(likedItems);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getListItems();
  }, []);

  return (
    <div className="p-4 w-full h-full">
      {listItems.map((item) => (
        <WishListItem key={item.asin} wishListItem={item} />
      ))}
      <button className="block p-2 bg-gray-200">Add Item</button>
    </div>
  );
};

export default WishList;
