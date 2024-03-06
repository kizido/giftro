import { TOnboardSurvey } from "@/lib/types";
import { sql } from "@vercel/postgres";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const session = await getServerSession();
    const { birthMonth, birthDay, birthYear }: TOnboardSurvey =
      await request.json();

    if (!!session) {
      const userBirthday = `${birthYear}-${birthMonth.padStart(
        2,
        "0"
      )}-${birthDay.padStart(2, "0")}`;

      await sql`
        UPDATE users SET Birthday = ${userBirthday} WHERE Email = ${session.user?.email}
    `;
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
