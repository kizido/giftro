import { Attributes } from "react";

type SearchCardProps = {
  imageUrl: string;
  index: number;
  itemName: string;
  itemPrice: string;
};

const SearchCard = ({ imageUrl, index, itemName, itemPrice }: SearchCardProps) => {
    const titleDisplayedCharacters = 14;
  return (
    <div className="w-[162px] h-[222px] my-2 rounded-lg overflow-hidden shadow-[0_0_8px_0px_rgba(0,0,0,0.2)]">
      <div className="w-full h-[166px]">
        <img
          className="w-full h-full object-contain"
          src={imageUrl}
          alt={`Item ${index + 1}`}
        />
      </div>
      <div className="w-full h-[56px] bg-gray-100 flex flex-col p-2">
        <p className="text-sm">{itemName.length > titleDisplayedCharacters ? itemName.substring(0, titleDisplayedCharacters) + '...' : itemName}</p>
        <p className="text-md text-black font-bold">{itemPrice}</p>
      </div>
    </div>
  );
};

export default SearchCard;
