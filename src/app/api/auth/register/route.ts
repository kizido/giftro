import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { sql } from "@vercel/postgres";
import { loginSchema, signUpSchema } from "@/lib/types";

export async function POST(request: Request) {
  const body: unknown = await request.json();
  const result = signUpSchema.safeParse(body);

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
    const { email, username, password } = result.data;
    const hashedPassword = await hash(password, 10);

    // Check for if email / username already exist
    const existingEmail = await sql`
        SELECT * FROM users WHERE email = ${email} LIMIT 1`;
    if (existingEmail.rowCount > 0) {
      return NextResponse.json({
        errors: {
          email: "Email has already been taken.",
        },
      });
    }
    const existingUsername = await sql`
        SELECT * FROM users WHERE username = ${username} LIMIT 1`;
    if (existingUsername.rowCount > 0) {
      return NextResponse.json({
        errors: {
          username: "Username has already been taken.",
        },
      });
    }

    // Add new user to database
    await sql`
        INSERT INTO users (email, username, password)
        VALUES (${email}, ${username}, ${hashedPassword})`;
  } catch (e) {
    console.log({ e });
  }
  return NextResponse.json({ message: "Success" });
}
