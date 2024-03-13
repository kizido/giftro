import { sql } from "@vercel/postgres";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { NextResponse } from "next/server";

type FriendsRequestBody = {
  receiverId: string;
};

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  const body: FriendsRequestBody = await request.json();
  const { receiverId } = body;

  try {
    await sql`
    INSERT INTO user_friends (user_id, friend_user_id, status, created_at)
    VALUES (${session?.id}, ${receiverId}, 'pending', CURRENT_TIMESTAMP);`;
    return NextResponse.json({ message: "Friend successfully added." });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Friend request failed." });
  }
}

export async function GET() {
  const session = await getServerSession(authOptions);

  try {
    const result = await sql`
    SELECT users.*
    FROM users
    JOIN user_friends ON users.id = user_friends.user_id
    WHERE user_friends.friend_user_id = ${session?.id}
    AND user_friends.status = 'pending';`;
    const requests = result.rows;
    return NextResponse.json({ requests });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: "Friend requests could not be queried.",
    });
  }
}

type FriendAcceptRequestBody = {
  senderId: string;
};
export async function PATCH(request: Request) {
  const body: FriendAcceptRequestBody = await request.json();
  const session = await getServerSession(authOptions);
  const { senderId } = body;

  console.log("MY ID: " + session?.id);
  console.log("Recipient ID: " + senderId);

  try {
    await sql`
    UPDATE user_friends
    SET status = 'accepted'
    WHERE user_id = ${senderId}
    AND friend_user_id = ${session?.id}
    AND status = 'pending';`;

    return NextResponse.json({
      message: "Friend request accepted.",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: "Friend request could not be accepted.",
    });
  }
}
