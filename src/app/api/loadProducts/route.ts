import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import {
  GetItemsRequest,
  Host,
  PartnerType,
  Region,
} from "paapi5-typescript-sdk";
import { ItemWithLikeInfo } from "@/app/my-list/page";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "No session found." });
  }
  const body: string = await request.json();

  if (body === "POPULAR") {
    // LOAD THE MOST LIKED PRODUCTS
    const popularItems = await sql`
    SELECT *
    FROM products
    ORDER BY likes DESC
    LIMIT 10`;

    // CONSOLIDATE LIKED PRODUCT LIST INTO ASIN ARRAY
    let asinArray: string[] = popularItems.rows.map((row) => row.asin);

    // USE ASIN STRING AS BODY OF REQUEST TO AMAZON API
    try {
      const amazonRequest = new GetItemsRequest(
        {
          ItemIds: asinArray,
          ItemIdType: "ASIN",
          Resources: [
            "Images.Primary.Large",
            "Images.Variants.Large",
            "Offers.Listings.Price",
            "ItemInfo.ByLineInfo",
            "ItemInfo.Classifications",
            "ItemInfo.ProductInfo",
            "ItemInfo.Title",
            "BrowseNodeInfo.BrowseNodes",
          ],
        },
        "shufflebirdco-20",
        PartnerType.ASSOCIATES,
        "AKIAJUDJSHRMOK7KVLEQ",
        "4SjclgzbbUc1IUHljQiK2scP7E8+87OkKA5zkTbk",
        Host.UNITED_STATES,
        Region.UNITED_STATES
      );
      const data = await amazonRequest.send();
      if (data.ItemsResult === undefined) {
        return NextResponse.json({ error: "No search result found." });
      }
  
      const responseItems = data.ItemsResult.Items;
      const sessionId = session.id.toString();
      const enrichedItems: ItemWithLikeInfo[] = responseItems.map((item) => {
        // Find the matching productInfoRow for the current item
        const matchingProductInfo = popularItems.rows.find(
          (productRow) => productRow.asin === item.ASIN
        );
        const likerIds: string = matchingProductInfo
          ? matchingProductInfo.likerids.toString()
          : "";
        const likerIdsArray: string[] = likerIds
          .split(",")
          .map((id) => id.trim());
  
        // Return a new object combining the original item properties
        // with likes and isLikedByUser, defaulting to 0 and false if not found
        return {
          ...item, // Spread the original item properties
          likes: matchingProductInfo ? matchingProductInfo.likes : 0, // Default to 0 if no match is found
          isLikedByUser: likerIdsArray.includes(sessionId), // Default to false if no match is found
        };
      });

      return NextResponse.json(enrichedItems);
    } catch (error) {
      console.log(error);
    }
  }
  return NextResponse.json({ error: "No products loaded." });
}
