import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { NextResponse } from "next/server";
import {
  TCreateEvent,
  createEventSchema,
  createEventSchemaDateString,
} from "@/lib/types";
import { sql } from "@vercel/postgres";

export async function POST(request: Request) {
  // Verifies the session
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ errors: "No session could be found." });
  }

  // Verifies data body is of correct type
  const body: unknown = await request.json();
  const result = createEventSchemaDateString.safeParse(body);
  let zodErrors = {};
  if (!result.success) {
    result.error.issues.forEach((issue) => {
      zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
    });
  }
  if (Object.keys(zodErrors).length > 0) {
    return NextResponse.json({ errors: zodErrors });
  }

  // Create a new event
  await sql`
  INSERT INTO events
  (creator_id, event_name, event_date, giftees, event_gifts, budget, annual)
  VALUES (${session.id}, ${result.data?.eventName}, ${
    result.data?.eventDate.split("T")[0]
  }, ${result.data?.giftee}, ${result.data?.eventGifts}, ${
    result.data?.budget
  }, ${result.data?.annual})`;
  return NextResponse.json({ message: "Event has been successfully created." });
}
