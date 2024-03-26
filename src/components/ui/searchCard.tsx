import { Attributes } from "react";

type SearchCardProps = {
  imageUrl: string;
  index: number;
};

const SearchCard = ({ imageUrl, index }: SearchCardProps) => {
  return (
    <div className="w-[162px] h-[222px] my-2 border-2 border-gray rounded-lg overflow-hidden">
      <div className="w-full h-[166px]">
        <img
          className="w-full h-full object-contain"
          src={imageUrl}
          alt={`Item ${index + 1}`}
        />
      </div>
      <div className="w-full h-[60px] bg-gray-100 flex flex-col">
        <p className="text-sm">Product Name</p>
        <p className="text-lg text-black font-semibold">${(Math.random() * 50).toFixed()}.{(Math.random() * 99).toFixed()}</p>
      </div>
    </div>
  );
};

export default SearchCard;
