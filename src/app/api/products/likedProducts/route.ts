import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { ListItem } from "@/components/ui/wishList";

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({
      error: "No session found to retrieve liked products.",
    });
  }

  try {
    const request = await sql`
        SELECT asin, title
        FROM products
        WHERE likerIds @> ARRAY[${session.id}::varchar]`;
    const requestRows = request.rows;
    const likedItems: ListItem[] = requestRows.map((row) => {
        return {
            asin: row.asin,
            name: row.title,
        };
    })
    return NextResponse.json(likedItems);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Was unable to retrieve liked products."});
  }
}
