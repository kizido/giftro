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
    SET likes = CASE
                    WHEN likerIds @> ARRAY[${session?.id}::varchar]
                    THEN likes - 1
                    ELSE likes + 1
                  END,
        likerIds = CASE
                       WHEN likerIds @> ARRAY[${session?.id}::varchar]
                       THEN array_remove(likerIds, ${session?.id}::varchar)
                       ELSE array_append(likerIds, ${session?.id}::varchar)
                     END
    WHERE asin = ${asin};`;
    
    return NextResponse.json({ message: "Likes changed successfully." });
  }
  return NextResponse.json({ error: "Product ASIN or session not defined." });
}
