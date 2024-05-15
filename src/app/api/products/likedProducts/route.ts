import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { ListItem } from "@/components/ui/wishList";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({
      error: "No session found to retrieve liked products.",
    });
  }
  const asin: string = await request.json();

  try {
    await sql`
    UPDATE products
    SET likes = CASE
                    WHEN likerIds @> ARRAY[${session?.id}::varchar]
                    THEN likes - 1
                  END,
        likerIds = CASE
                    WHEN likerIds @> ARRAY[${session?.id}::varchar]
                    THEN array_remove(likerIds, ${session?.id}::varchar)
                  END
    WHERE asin = ${asin};`;
    return NextResponse.json({ message: "Product removed from wish list." });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: "Failed to remove product from wish list.",
    });
  }
}
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
    });
    return NextResponse.json(likedItems);
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: "Was unable to retrieve liked products.",
    });
  }
}
