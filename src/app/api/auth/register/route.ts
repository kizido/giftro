import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { sql } from "@vercel/postgres";
import { loginSchema } from "@/lib/types";

export async function POST(request: Request) {
  const body: unknown = await request.json();
  const result = loginSchema.safeParse(body);

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
    const { email, password } = result.data;
    const hashedPassword = await hash(password, 10);
    await sql`
        INSERT INTO users (email, password)
        VALUES (${email}, ${hashedPassword})
    `;
  } catch (e) {
    console.log({ e });
  }
  return NextResponse.json({ message: "Success" });
}
