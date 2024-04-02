import { Attributes, useState } from "react";
import styles from "../../app/ui/modal.module.css";
import OnboardingModal from "@/lib/components/OnboardingModal";

type SearchCardProps = {
  imageUrl: string;
  index: number;
  itemName: string;
  itemPrice: string;
  redirectUrl: string;
};

const SearchCard = ({
  imageUrl,
  index,
  itemName,
  itemPrice,
  redirectUrl,
}: SearchCardProps) => {
  const titleDisplayedCharacters = 14;
  const [productModalOpen, setProductModalOpen] = useState(false);

  return (
    <div>
      <div
        className="relative w-[162px] h-[222px] my-2 rounded-lg overflow-hidden shadow-[0_0_8px_0px_rgba(0,0,0,0.2)] cursor-pointer"
        onClick={() => setProductModalOpen(true)}
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
              <img
                src="https://static-cdn.drawnames.com/Content/Assets/icon-like-liked.svg"
                className="inline mb-1 mr-2"
              />
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
      {productModalOpen && (
        <div className="fixed inset-0 bg-gray-400 bg-opacity-40 z-40 flex justify-center items-center">
          <div className="w-[62rem] h-[36rem] bg-white rounded-3xl shadow-[0_0_8px_0px_rgba(0,0,0,0.2)] flex">
            <div className="h-full w-7/12 bg-white">
              <img
                className="w-full h-full object-contain"
                src={imageUrl}
                alt={`Large Image`}
              />
            </div>
            <div className="h-full w-5/12 py-4 pl-12 pr-24 bg-gray-100 flex flex-col gap-2 relative">
              <h2 className="text-lg font-bold">{itemName}</h2>
              <a
                href={redirectUrl}
                target="_blank"
                rel="noopener noreferrer" // Added for security
                className="h-12 w-full p-4 bg-white rounded-xl flex justify-between items-center cursor-pointer hover:underline"
              >
                <p className="font-semibold">Amazon</p>
                <p className="text-blue-500">{itemPrice}</p>
              </a>
              <img src="https://static-cdn.drawnames.com/Content/Assets/icon-close.svg" width={40} className="absolute top-4 right-4 cursor-pointer" onClick={() => setProductModalOpen(false)}/>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchCard;
