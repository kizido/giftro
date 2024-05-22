import { QueryResultRow, sql } from "@vercel/postgres";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import {
  SearchItemsRequest,
  PartnerType,
  Host,
  Region,
  SearchResultItem,
} from "paapi5-typescript-sdk";
import { authOptions } from "../../auth/[...nextauth]/options";
import { ItemWithLikeInfo } from "@/app/my-list/page";

export async function POST(
  request: Request,
  { params }: { params: { query: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Session could not be found." });
  }
  const query = params.query;
  const page: number = await request.json();

  try {
    const amazonRequest = new SearchItemsRequest(
      {
        ItemCount: 10,
        ItemPage: page,
        Keywords: query,
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
    // Collect data and verify there is a result
    const data = await amazonRequest.send();
    if (data.SearchResult === undefined) {
      return NextResponse.json({ error: "No search result found." });
    }
    const responseItems = data.SearchResult.Items;

    // Insert queried items into DB if not already there
    await sql`
    INSERT INTO products (asin, title)
    VALUES (${responseItems[0].ASIN}, ${responseItems[0].ItemInfo?.Title?.DisplayValue}),
    (${responseItems[1].ASIN}, ${responseItems[1].ItemInfo?.Title?.DisplayValue}),
    (${responseItems[2].ASIN}, ${responseItems[2].ItemInfo?.Title?.DisplayValue}),
    (${responseItems[3].ASIN}, ${responseItems[3].ItemInfo?.Title?.DisplayValue}),
    (${responseItems[4].ASIN}, ${responseItems[4].ItemInfo?.Title?.DisplayValue}),
    (${responseItems[5].ASIN}, ${responseItems[5].ItemInfo?.Title?.DisplayValue}),
    (${responseItems[6].ASIN}, ${responseItems[6].ItemInfo?.Title?.DisplayValue}),
    (${responseItems[7].ASIN}, ${responseItems[7].ItemInfo?.Title?.DisplayValue}),
    (${responseItems[8].ASIN}, ${responseItems[8].ItemInfo?.Title?.DisplayValue}),
    (${responseItems[9].ASIN}, ${responseItems[9].ItemInfo?.Title?.DisplayValue})
    ON CONFLICT (asin) DO NOTHING;`;

    // Load like data for designated asins
    const productInfo = await sql`
    SELECT asin, likes, likerids
    FROM products
    WHERE asin
    IN (${responseItems[0].ASIN}, ${responseItems[1].ASIN}, ${responseItems[2].ASIN}, 
      ${responseItems[3].ASIN}, ${responseItems[4].ASIN}, ${responseItems[5].ASIN}, 
      ${responseItems[6].ASIN}, ${responseItems[7].ASIN}, ${responseItems[8].ASIN}, 
      ${responseItems[9].ASIN})`;

    const productInfoRows = productInfo.rows;
    const sessionId = session.id.toString();
    const enrichedItems: ItemWithLikeInfo[] = responseItems.map((item) => {
      // Find the matching productInfoRow for the current item
      const matchingProductInfo = productInfoRows.find(
        (info) => info.asin === item.ASIN
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
    return NextResponse.json({ error });
  }
}
