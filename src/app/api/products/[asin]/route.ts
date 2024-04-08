import { sql } from "@vercel/postgres";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";

export async function POST(
  req: Request,
  { params }: { params: { asin: string } }
) {
  const session = await getServerSession(authOptions);
  const asin = params.asin;
  if (asin !== undefined && session?.id !== undefined) {
    await sql`
    UPDATE products
    SET likes = likes + 1,
        likerIds = array_append(likerIds, ${session?.id}::varchar)
    WHERE asin = ${asin}
    AND NOT (likerIds @> ARRAY[${session?.id}::varchar])`;
    const response = await sql`
    SELECT likes
    FROM products
    WHERE asin = ${asin}`;
    const productLikes = response.rows[0].likes;
    return NextResponse.json({ likes: productLikes });
  }
  return NextResponse.json({ error: "Product ASIN or session not defined." });
}
