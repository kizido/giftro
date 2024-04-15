import { ItemWithLikeInfo } from "@/app/my-list/page";
import { useEffect, useState } from "react";
import WishListItem from "./wishListItem";

export type ListItem = {
  asin: string;
  name?: string;
};

type WishListProps = {
  items: ItemWithLikeInfo[];
};
const WishList = ({ items }: WishListProps) => {
  const [listItems, setListItems] = useState<ListItem[]>([]);

  useEffect(() => {
    const getListItems = async () => {

    }

    const modifiedItems: ListItem[] = items.map((item) => {
      return {
        asin: item.ASIN,
        name: item.ItemInfo?.Title?.DisplayValue,
      };
    });
    setListItems(modifiedItems);
  }, [items]);

  return (
    <div className="w-full h-full">
      {listItems.map((item) => (
        <WishListItem key={item.asin} wishListItem={item} />
      ))}
    </div>
  );
};

export default WishList;
