import { ListItem } from "./wishList";

type WishListItemProps = {
    wishListItem: ListItem;
}
const WishListItem = ({wishListItem}: WishListItemProps) => {

    return (<div className="w-full mb-4 p-2 border border-black flex items-center">
        <h2>{wishListItem.name ?? wishListItem.asin}</h2>
    </div>);
}

export default WishListItem;