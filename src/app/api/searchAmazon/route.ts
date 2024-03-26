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
      { ItemCount: 10, Keywords: body, Resources: ["Images.Primary.Medium", "Offers.Listings.Price", "ItemInfo.Title"] },
      "shufflebirdco-20",
      PartnerType.ASSOCIATES,
      "AKIAJUDJSHRMOK7KVLEQ",
      "4SjclgzbbUc1IUHljQiK2scP7E8+87OkKA5zkTbk",
      Host.UNITED_STATES,
      Region.UNITED_STATES
    );
    const data = await amazonRequest.send();
    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error });
  }
}
