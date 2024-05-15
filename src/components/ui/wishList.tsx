import { ItemWithLikeInfo } from "@/app/my-list/page";
import { useEffect, useState } from "react";
import WishListItem from "./wishListItem";

export type ListItem = {
  asin: string;
  name?: string;
};

type WishListProps = {
  listItems: ListItem[];
  removeFromWishList: (asin: string) => void;
};

const WishList = ({ listItems, removeFromWishList }: WishListProps) => {
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
            onClose={() => removeFromWishList(item.asin)}
          />
        ))}
      </div>
    </div>
  );
};

export default WishList;
