import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "No session found." });
  }
  const body: string = await request.json();

  if(body === "POPULAR") {
    // LOAD THE MOST LIKED PRODUCTS
  }
}
