"use client";

import Link from "next/link";
import { FormEvent } from "react";

export default function Form() {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const response = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex justify-center">
      <div className="w-70 flex flex-col gap-2">
        <h1 className="mt-8 font-bold text-3xl">Create an account</h1>
        <h3 className="text-xl text-gray-200">It&apos;s free!</h3>

        <hr className="mb-4 border border-slate-300"></hr>

        <div className="mb-8">
          <h4 className="inline text-sm text-gray-200">
            Do you already have an account?{" "}
          </h4>
          <Link href="/login" className="inline text-sm text-teal-300">
            Log in
          </Link>
        </div>

        <h3 className="text-lg">E-Mail</h3>
        <input type="email" name="email" className="h-10 p-4 rounded"></input>

        <div className="flex justify-between items-center">
          <h3 className="text-lg">Password</h3>
          <h4 className="cursor-pointer hover:underline text-sm text-teal-300">
            Show password
          </h4>
        </div>
        <input
          type="password"
          name="password"
          className="mb-4 p-4 h-10 rounded"
        ></input>

        <div className="flex justify-end">
          <button type="submit" className="w-28 h-12 bg-blue-400 font-bold">
            Join Now
          </button>
        </div>
      </div>
    </form>
  );
}
