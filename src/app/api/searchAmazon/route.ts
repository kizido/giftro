import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import {
  SearchItemsRequest,
  PartnerType,
  Host,
  Region,
} from "paapi5-typescript-sdk";

export async function POST(request: Request) {
  const body: string = await request.json();

  try {
    const amazonRequest = new SearchItemsRequest(
      {
        ItemCount: 10,
        Keywords: body,
        Resources: [
          "Images.Primary.Medium",
          "Offers.Listings.Price",
          "ItemInfo.Title",
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
    const responseItems = data.SearchResult.Items;
    responseItems.forEach(item => console.log("Response Item: " + item.ASIN));

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

    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error });
  }
}
