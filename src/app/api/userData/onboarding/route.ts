import { TOnboardSurvey } from "@/lib/types";
import { sql } from "@vercel/postgres";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const session = await getServerSession();
    const { birthMonth, birthDay, birthYear, hobbies }: TOnboardSurvey =
      await request.json();

    if (!!session) {
      const userBirthday = `${birthYear}-${birthMonth.padStart(
        2,
        "0"
      )}-${birthDay.padStart(2, "0")}`;

      const userResult = await sql`
      SELECT id FROM users WHERE LOWER(Email) = LOWER(${session.user?.email})`;
      const userId = userResult.rows[0].id;

      if (userId) {
        await sql`
        UPDATE users SET Birthday = ${userBirthday} WHERE Id = ${userId}`;

        const hobby = hobbies[0];
        console.log(hobby);
        // await sql`
        // INSERT INTO userhobbies (userid, hobby)
        // VALUES (${userId}, ${hobby})`;

        for (const hobby of hobbies) {
          await sql`
          INSERT INTO userhobbies (userid, hobby)
          VALUES (${userId}, ${hobby})
        `;
        }
      }
    }
    return NextResponse.json(
      { message: "Birthday updated successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating birthday", error);
    return NextResponse.json(
      { error: "There was an error updating the birthday." },
      {
        status: 500,
      }
    );
  }
}
