import { Attributes, Key, useState } from "react";
import styles from "../../app/ui/modal.module.css";
import OnboardingModal from "@/lib/components/OnboardingModal";
import { SearchResultItem } from "paapi5-typescript-sdk";

type SearchCardProps = {
  index: number;
  item: any;
};

const SearchCard = ({ index, item }: SearchCardProps) => {
  const titleDisplayedCharacters = 14;
  const [productModalOpen, setProductModalOpen] = useState(false);

  const [selectedImageIndex, setSelectedImageIndex] = useState<
    Key | null | undefined
  >(null);

  return (
    <div>
      <div
        className="relative w-[162px] h-[222px] my-2 rounded-lg overflow-hidden shadow-[0_0_8px_0px_rgba(0,0,0,0.2)] cursor-pointer"
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
            <p className="text-md text-black font-bold">
              {item!.Offers!.Listings[0]!.Price!.DisplayAmount!}
            </p>
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
        <div className="fixed inset-0 bg-gray-400 bg-opacity-40 z-40 flex justify-center items-center" onClick={() => setProductModalOpen(false)}>
          <div className="w-[62rem] h-[36rem] bg-white rounded-3xl shadow-[0_0_8px_0px_rgba(0,0,0,0.2)] flex" onClick={(e) => e.stopPropagation()}>
            <div className="h-full w-7/12 bg-white">
              <img
                className="w-full h-full object-contain"
                src={selectedImageIndex === null ? item.Images?.Primary?.Large?.URL : item.Images?.Variants[selectedImageIndex as number].Large?.URL}
                alt={`Large Image`}
              />
            </div>
            <div className="h-full w-5/12 py-4 pl-12 pr-20 bg-gray-100 flex flex-col gap-2 relative">
              {item.Images.Variants !== undefined && (
                <div className="flex flex-wrap justify-start">
                  <div
                    className={`w-[60px] h-[60px] m-[5px] cursor-pointer ${
                      selectedImageIndex === null
                        ? "border-2 border-blue-400"
                        : ""
                    }`}
                    onClick={() => setSelectedImageIndex(null)}
                  >
                    <img
                      src={item.Images?.Primary?.Large?.URL}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  {item.Images!.Variants!.map(
                    (
                      variant: { Large: { URL: string | undefined } },
                      idx: Key | null | undefined
                    ) => (
                      <div
                        key={idx}
                        className={`w-[60px] h-[60px] m-[5px] cursor-pointer ${
                          selectedImageIndex === idx
                            ? "border-2 border-blue-400"
                            : ""
                        }`}
                        onClick={() => setSelectedImageIndex(idx)}
                      >
                        <img
                          src={variant.Large.URL}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    )
                  )}
                </div>
              )}
              <h2 className="text-lg font-bold">
                {item.ItemInfo?.Title?.DisplayValue}
              </h2>
              <a
                href={item!.DetailPageURL}
                target="_blank"
                rel="noopener noreferrer" // Added for security
                className="h-12 w-full p-4 bg-white rounded-xl flex justify-between items-center cursor-pointer hover:underline"
              >
                <p className="font-semibold">Amazon</p>
                <p className="text-blue-500">
                  {item!.Offers!.Listings[0]!.Price!.DisplayAmount!}
                </p>
              </a>
              <img
                src="https://static-cdn.drawnames.com/Content/Assets/icon-close.svg"
                width={40}
                className="absolute top-4 right-4 cursor-pointer"
                onClick={() => setProductModalOpen(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchCard;
