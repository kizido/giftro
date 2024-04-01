import { Attributes } from "react";

type SearchCardProps = {
  imageUrl: string;
  index: number;
  itemName: string;
  itemPrice: string;
};

const SearchCard = ({
  imageUrl,
  index,
  itemName,
  itemPrice,
}: SearchCardProps) => {
  const titleDisplayedCharacters = 14;
  return (
    <div
      className="relative w-[162px] h-[222px] my-2 rounded-lg overflow-hidden shadow-[0_0_8px_0px_rgba(0,0,0,0.2)]"
      onClick={() => console.log(itemName + " CLICKED")}
    >
      <div className="w-full h-[166px]">
        <img
          className="w-full h-full object-contain"
          src={imageUrl}
          alt={`Item ${index + 1}`}
        />
      </div>
      <footer className="w-full h-[56px] bg-gray-100 flex flex-col p-2">
        <p className="text-sm">
          {itemName.length > titleDisplayedCharacters
            ? itemName.substring(0, titleDisplayedCharacters) + "..."
            : itemName}
        </p>
        <div className="flex justify-between">
          <p className="text-md text-black font-bold">{itemPrice}</p>
          <div>
            <img src="https://static-cdn.drawnames.com/Content/Assets/icon-like-liked.svg" className="inline mb-1 mr-2"/>
            <p className="inline text-md text-blue-500 font-bold">{2}</p>
          </div>
        </div>
      </footer>
      <div className="absolute top-[140px] right-[8px] w-[45px] h-[45px] rounded-full bg-white shadow-[0_0_8px_0px_rgba(0,0,0,0.2)] flex items-center justify-center">
        <img
          src="https://static-cdn.drawnames.com/Content/Assets/icon-like-unliked.svg"
          width={20}
          height={19}
          className="mt-1"
        />
      </div>
    </div>
  );
};

export default SearchCard;
