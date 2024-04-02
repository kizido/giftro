import { Key, useState } from "react";

type SearchCardModalProps = {
  item: any;
  onClose: () => void;
};
const SearchCardModal = ({ item, onClose }: SearchCardModalProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<
    Key | null | undefined
  >(null);

  return (
    <div
      className="fixed inset-0 bg-gray-400 bg-opacity-40 z-40 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="flex lg:w-[62rem] lg:h-[36rem] w-[24rem] h-full bg-white shadow-[0_0_8px_0px_rgba(0,0,0,0.2)] rounded-3xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-full w-7/12 bg-white">
          <img
            className="w-full h-full object-contain"
            src={
              selectedImageIndex === null
                ? item.Images?.Primary?.Large?.URL
                : item.Images?.Variants[selectedImageIndex as number].Large?.URL
            }
            alt={`Large Image`}
          />
        </div>
        <div className="h-full w-5/12 py-4 pl-12 pr-20 bg-gray-100 flex flex-col gap-2 relative">
          {item.Images.Variants !== undefined && (
            <div className="flex flex-wrap justify-start">
              <div
                className={`w-[60px] h-[60px] m-[5px] cursor-pointer bg-white ${
                  selectedImageIndex === null ? "border-2 border-blue-400" : ""
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
                    className={`w-[60px] h-[60px] m-[5px] cursor-pointer bg-white ${
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
            onClick={onClose}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchCardModal;
