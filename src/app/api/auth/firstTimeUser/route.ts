import { sql } from "@vercel/postgres";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const session = await getServerSession();

  if (!!session) {
    const response = await sql`
    SELECT * FROM users WHERE email=${session?.user?.email}`;
    const user = response.rows[0];
    return NextResponse.json(user.is_first_time_user);
  }
  return NextResponse.json(
    "Can't determine first time user. No session available."
  );
}

type FirstTimeUserBody = {
  is_first_time_user: boolean;
};

export async function POST(request: Request) {
  const body: FirstTimeUserBody = await request.json();
  const { is_first_time_user } = body;
  const session = await getServerSession();

  ("FIRST TIME USER NEW VALUE:" + is_first_time_user);
  if (!session) {
    return NextResponse.json(
      {
        error:
          "Not able to change is_first_time_user because sesison could not be established.",
      },
      { status: 500 }
    );
  }

  await sql`
    UPDATE users SET is_first_time_user = ${is_first_time_user} WHERE email=${session.user?.email}`;

  return NextResponse.json(
    { message: "User's first time user field set to false" },
    { status: 200 }
  );
}
