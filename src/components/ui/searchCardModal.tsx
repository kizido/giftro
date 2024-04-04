import { Key, useState } from "react";

type SearchCardModalProps = {
  item: any;
  price: string;
  onClose: () => void;
};
const SearchCardModal = ({ item, price, onClose }: SearchCardModalProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<
    Key | null | undefined
  >(null);

  return (
    <div
      className="fixed inset-0 bg-gray-400 bg-opacity-40 z-40 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="relative flex flex-col lg:flex-row lg:w-[62rem] lg:h-[36rem] w-[24rem] h-full bg-white shadow-[0_0_8px_0px_rgba(0,0,0,0.2)] rounded-3xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src="https://static-cdn.drawnames.com/Content/Assets/icon-close.svg"
          width={40}
          className="absolute top-4 right-4 cursor-pointer"
          onClick={onClose}
        />
        <div className="h-2/5 w-full lg:h-full lg:w-7/12 bg-white">
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
        <div className="w-full lg:h-full lg:w-5/12 py-4 pl-12 pr-20 bg-gray-100 flex flex-col gap-1">
          {item.Images.Variants !== undefined && (
            <div className="hidden lg:flex flex-wrap justify-start">
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

          <div>
            <span className="text-xs block">
              {item.ItemInfo!.ByLineInfo!.Brand!.DisplayValue!}
            </span>
            <span className="text-xs">
              {item &&
              item.ItemInfo &&
              item.ItemInfo.ProductInfo &&
              item.ItemInfo.ProductInfo.Size
                ? item.ItemInfo?.ProductInfo?.Size?.DisplayValue +
                  " | " +
                  item.ItemInfo!.ProductInfo!.Color!.DisplayValue! +
                  " - "
                : item.ItemInfo?.Classifications?.ProductGroup?.DisplayValue +
                  " - "}
            </span>
            <span className="text-xs">
              {item.BrowseNodeInfo!.BrowseNodes[0]!.ContextFreeName!}
            </span>
          </div>

          <a
            href={item!.DetailPageURL}
            target="_blank"
            rel="noopener noreferrer" // Added for security
            className="h-12 w-full p-4 bg-white rounded-xl flex justify-between items-center cursor-pointer hover:underline"
          >
            <p className="font-semibold">Amazon</p>
            <p className="text-blue-500">
              {price}
            </p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default SearchCardModal;
