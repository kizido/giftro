import { ListItem } from "./wishList";

type WishListItemProps = {
  wishListItem: ListItem;
  onClose: () => void;
};
const WishListItem = ({ wishListItem, onClose }: WishListItemProps) => {

  return (
    <div className="relative w-full mb-4 p-2 border border-black flex items-center">
      <img
        src="https://static-cdn.drawnames.com/Content/Assets/icon-close.svg"
        width={20}
        className="absolute top-2 right-2 cursor-pointer"
        onClick={onClose}
        alt="Wish List Item"
      />
      <div className="w-11/12">
        <h2>{wishListItem.name ?? wishListItem.asin}</h2>
      </div>
    </div>
  );
};

export default WishListItem;
