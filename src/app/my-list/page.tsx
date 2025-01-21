"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { SearchResultItem } from "paapi5-typescript-sdk";
import SearchCard from "@/components/ui/searchCard";
import WishList, { ListItem } from "@/components/ui/wishList";
import { useDebounceCallback } from "@/hooks/useDebounceCallback";

export type ItemWithLikeInfo = SearchResultItem & {
  likes: number;
  isLikedByUser: boolean;
};

export default function MyLists() {
  const [scrolled, setScrolled] = useState(false);
  const [responseItems, setResponseItems] = useState<ItemWithLikeInfo[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [listItems, setListItems] = useState<ListItem[]>([]);
  const [itemPage, setItemPage] = useState<number>(1);
  const [popularPage, setPopularPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [filterState, setFilterState] = useState("POPULAR");

  useEffect(() => {
    const getListItems = async () => {
      try {
        const request = await fetch("/api/products/likedProducts", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const response = await request.json();
        if (!response.error) {
          const likedItems: ListItem[] = response;
          setListItems(likedItems);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getListItems();
    loadPopularProducts();
  }, []);

  async function removeFromWishList(asin: string) {
    try {
      setListItems(listItems.filter((item) => asin !== item.asin));
      await fetch("/api/products/likedProducts", {
        method: "POST",
        body: JSON.stringify(asin),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      const threshold = 68; // Set the scroll threshold in pixels

      if (offset > threshold) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    // Add the scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up the scroll event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setItemPage(1);
    setPopularPage(1);
  }, [searchQuery]);

  const loadPopularProducts = async () => {
    setIsLoading(true);
    try {
      const request = await fetch("/api/loadProducts/" + popularPage, {
        method: "POST",
        body: JSON.stringify(filterState),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await request.json();
      if (!response.error) {
        if (Array.isArray(response)) {
          if (popularPage > 1) {
            setResponseItems((prevItems) => [...prevItems, ...response]);
          } else {
            setResponseItems(response);
          }
        } else {
          console.error("Response is not an array:", response);
        }
        setPopularPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const searchAmazon = async () => {
    setIsLoading(true);
    try {
      const request = await fetch("/api/searchAmazon/" + searchQuery, {
        method: "POST",
        body: JSON.stringify(itemPage),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await request.json();
      if (!response.error) {
        if (Array.isArray(response)) {
          if (itemPage > 1) {
            setResponseItems((prevItems) => [...prevItems, ...response]);
          } else {
            setResponseItems(response);
          }
        } else {
          console.error("Response is not an array:", response);
        }
        setItemPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const debouncedSearchAmazon = useDebounceCallback(searchAmazon, 1500, {
    leading: true,
    trailing: false,
  });
  const debouncedSearchPopular = useDebounceCallback(
    loadPopularProducts,
    1500,
    {
      leading: true,
      trailing: false,
    }
  );

  const handleProductScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 2) {
      if (searchQuery !== "" && !isLoading) {
        debouncedSearchAmazon();
      }
    }
  };
  const handlePopularScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 2) {
      if (searchQuery === "" && !isLoading) {
        debouncedSearchPopular();
      }
    }
  };

  useEffect(() => {
    if (searchQuery === "") {
      window.addEventListener("scroll", handlePopularScroll);
      return () => window.removeEventListener("scroll", handlePopularScroll);
    } else {
      window.addEventListener("scroll", handleProductScroll);
      return () => window.removeEventListener("scroll", handleProductScroll);
    }
  }, [isLoading]);

  const DisplayCards = () => {
    return responseItems.map((item, index) => (
      <SearchCard
        key={item.ASIN}
        index={index}
        item={item}
        addToWishList={(newItem) => setListItems([...listItems, newItem])}
        removeFromWishList={(removedItem) =>
          setListItems(
            listItems.filter((listItem) => listItem.asin !== removedItem.asin)
          )
        }
      />
    ));
  };

  return (
    <div className="container max-w-[22rem] sm:max-w-[30rem] md:max-w-[45rem] lg:max-w-[62rem] xl:max-w-[72rem] gap-4 mt-8">
      <div className="h-full flex justify-center lg:justify-between">
        {/* Gift Searching Area */}
        <div className="w-full lg:w-[36rem] xl:w-[45rem]">
          <h1 className="text-3xl font-semibold">Gift Finder</h1>
          {/* Search Bar and Categories */}
          <div className={`${scrolled ? `w-full h-[136px]` : ""}`}></div>
          <div
            className={`py-4 flex flex-col gap-2 bg-white z-30 ${
              scrolled ? "fixed top-20 w-[45rem]" : ""
            }`}
          >
            <Input
              className="h-14 text-md"
              placeholder="Search for gifts here..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  searchAmazon();
                }
              }}
            />
            {/* <div className="flex flex-wrap gap-2 justify-start items-center">
              <Button
                iconUrl="https://static-cdn.drawnames.com//Content/Assets/chevron-gray.svg"
                iconRotation={90}
                variant="secondary"
                className="font-semibold"
              >
                Category
              </Button>
              <Button
                variant="secondary"
                iconUrl="https://static-cdn.drawnames.com//Content/Assets/chevron-gray.svg"
                iconRotation={90}
                className="font-semibold"
              >
                Price
              </Button>
              <Button
                variant="secondary"
                iconUrl="https://static-cdn.drawnames.com//Content/Assets/chevron-gray.svg"
                iconRotation={90}
                className="font-semibold"
              >
                Age
              </Button>
              <Button
                variant="secondary"
                iconUrl="https://static-cdn.drawnames.com//Content/Assets/chevron-gray.svg"
                iconRotation={90}
                className="font-semibold"
              >
                Gender
              </Button>
              <h3 className="ml-1 text-md text-semibold text-blue-500 cursor-pointer hover:underline overflow-y-hided">
                Clear all filters
              </h3>
            </div> */}
          </div>
          {/* Searched Items */}
          <div className="flex justify-start flex-wrap gap-6">
            {responseItems && DisplayCards()}
          </div>
        </div>

        {/* Wish List Area */}
        <div className="hidden lg:inline-block w-[24rem] h-[calc(100vh-112px)]">
          <div className="fixed w-[24rem] bottom-10 top-32 overflow-y-scroll rounded-3xl shadow-[0_0_8px_0px_rgba(0,0,0,0.2)]">
            <WishList
              listItems={listItems}
              removeFromWishList={removeFromWishList}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
