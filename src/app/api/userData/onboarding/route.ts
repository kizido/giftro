import { TOnboardSurvey, onboardSurveySchema } from "@/lib/types";
import { sql } from "@vercel/postgres";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // Establish that there is a session, exit if there is none
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: "No session established." });
  }

  // Clarify that request body abides by schema
  const body: unknown = await request.json();
  const result = onboardSurveySchema.safeParse(body);

  // Exit with specific input errors if any exist
  let zodErrors = {};
  if (!result.success) {
    result.error.issues.forEach((issue) => {
      zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
    });
    return NextResponse.json(
      Object.keys(zodErrors).length > 0
        ? { errors: zodErrors }
        : { success: true }
    );
  }

  try {
    const { birthDay, birthMonth, birthYear, hobbies } = result.data;
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

      await sql`
        DELETE FROM userhobbies WHERE userid = ${userId}`;

      for (const hobby of hobbies) {
        if (typeof hobby === "string") {
          await sql`
            INSERT INTO userhobbies (userid, hobby)
            VALUES (${userId}, ${hobby})`;
        }
      }
    }
    return NextResponse.json(
      { message: "Onboarding survey submitted successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "There was an error submitting the onboarding survey." },
      { status: 500 }
    );
  }
}
