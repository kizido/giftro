import { ListItem } from "./wishList";

type FriendWishListModalProps = {
  onClose: () => void;
  friendName: string;
  wishList: ListItem[];
};

const FriendWishListModal = ({
  onClose,
  friendName,
  wishList
}: FriendWishListModalProps) => {
  return (
    <div className="fixed inset-0 bg-gray-400 bg-opacity-40 z-40 flex justify-center items-center py-4">
      <div
        className="relative px-8 py-4 flex flex-col justify-start items-start lg:w-[36rem] lg:h-[48rem] w-[24rem] h-full bg-white shadow-[0_0_8px_0px_rgba(0,0,0,0.2)] rounded-3xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="mb-8">
          <h1 className="font-semibold text-3xl">{friendName}'s Wish List</h1>
          <img
            src="https://static-cdn.drawnames.com/Content/Assets/icon-close.svg"
            width={40}
            className="absolute top-4 right-4 cursor-pointer"
            onClick={onClose}
          />
        </header>

        <div className="flex flex-col gap-4">{wishList.map((item, index) => (<div key={index}>{item.name}</div>))}</div>
      </div>
    </div>
  );
};

export default FriendWishListModal;
