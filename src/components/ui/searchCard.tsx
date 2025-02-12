import { useEffect, useState } from "react";
import SearchCardModal from "./searchCardModal";
import { ItemWithLikeInfo } from "@/app/my-list/page";
import { ListItem } from "./wishList";

type SearchCardProps = {
  index: number;
  item: ItemWithLikeInfo;
  addToWishList?: (item: ListItem) => void;
  removeFromWishList?: (item: ListItem) => void;
};

const SearchCard = ({
  index,
  item,
  addToWishList,
  removeFromWishList,
}: SearchCardProps) => {
  const titleDisplayedCharacters = 14;
  const [productModalOpen, setProductModalOpen] = useState(false);

  const [formattedPrice, setFormattedPrice] = useState<string>("");
  const [productLikes, setProductLikes] = useState(item.likes);
  const [productIsLiked, setProductIsLiked] = useState(item.isLikedByUser);

  useEffect(() => {
    if (item?.Offers?.Listings[0]?.Price?.DisplayAmount !== undefined) {
      const originalPrice: string = item.Offers.Listings[0].Price.DisplayAmount;
      const firstSpaceIndex: number = originalPrice.indexOf(" ");

      if (firstSpaceIndex !== -1) {
        setFormattedPrice(originalPrice.substring(0, firstSpaceIndex));
      } else {
        setFormattedPrice(originalPrice);
      }
    }
  }, [item]);

  const likeProduct = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (productIsLiked) {
      setProductLikes(productLikes - 1);
      const removedItem = {
        asin: item.ASIN,
        name: item.ItemInfo?.Title?.DisplayValue,
      };
      console.log("REMOVING A LIKE");
      if (removeFromWishList) {
        console.log("ACTUALLY REMOVING A LIKE");
        removeFromWishList(removedItem);
      }
    } else {
      setProductLikes(productLikes + 1);
      const newItem = {
        asin: item.ASIN,
        name: item.ItemInfo?.Title?.DisplayValue,
      };
      if (addToWishList) {
        addToWishList(newItem);
      }
    }
    setProductIsLiked(!productIsLiked);
    try {
      const request = await fetch("/api/products/" + item.ASIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div
        className="relative w-[162px] h-[222px] my-2 rounded-lg shadow-[0_0_8px_0px_rgba(0,0,0,0.2)] cursor-pointer"
        onClick={() => setProductModalOpen(true)}
      >
        <div className="w-full h-[166px]">
          <img
            className="w-full h-full object-contain"
            src={item.Images?.Primary?.Large?.URL}
            alt={`Item ${index + 1}`}
          />
        </div>
        <footer className="w-full h-[56px] bg-gray-100 flex flex-col p-2">
          <p className="text-sm">
            {item.ItemInfo!.Title!.DisplayValue.length >
            titleDisplayedCharacters
              ? item.ItemInfo!.Title!.DisplayValue.substring(
                  0,
                  titleDisplayedCharacters
                ) + "..."
              : item.ItemInfo!.Title!.DisplayValue}
          </p>
          <div className="flex justify-between">
            <p className="text-md text-black font-bold">{formattedPrice}</p>
            <div>
              <img
                src="https://static-cdn.drawnames.com/Content/Assets/icon-like-liked.svg"
                className="inline mb-1 mr-2"
              />

              {/* PRODUCT LIKES */}
              <p className="inline text-md text-blue-500 font-bold">
                {productLikes}
              </p>
            </div>
          </div>
        </footer>
        <div
          onClick={(e) => likeProduct(e)}
          className="absolute top-[140px] right-[8px] w-[45px] h-[45px] rounded-full bg-white shadow-[0_0_8px_0px_rgba(0,0,0,0.2)] flex items-center justify-center select-none"
        >
          {productIsLiked ? (
            <img
              src="https://static-cdn.drawnames.com/Content/Assets/icon-like-liked.svg"
              width={20}
              height={19}
              className="mt-1"
            />
          ) : (
            <img
              src="https://static-cdn.drawnames.com/Content/Assets/icon-like-unliked.svg"
              width={20}
              height={19}
              className="mt-1"
            />
          )}
        </div>
      </div>
      {productModalOpen && (
        <SearchCardModal
          item={item}
          onClose={() => setProductModalOpen(false)}
          price={formattedPrice}
        />
      )}
    </div>
  );
};

export default SearchCard;
