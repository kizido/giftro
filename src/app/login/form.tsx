"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export default function Form() {
    const router = useRouter();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const response = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    console.log({ response });
    if(!response?.error) {
        router.push("/");
        router.refresh();
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="w-full min-w-48 p-4 pt-6 md:pt-24 flex flex-col md:flex-row items-center md:items-start justify-center gap-2 md:gap-8"
    >
      <div className="w-full max-w-[28rem] p-2 flex flex-col gap-2">
        <h1 className="mb-4 text-3xl font-semibold">Log in</h1>
        <hr className="border border-slate-300"></hr>
        <h3 className="text-base">E-Mail</h3>
        <input type="email" name="email" className="p-4 h-10 rounded"></input>

        <div className="flex justify-between">
          <h3 className="text-base">Password</h3>
          <Link
            href="/forgotpassword"
            className="text-sm text-blue-700 underline"
          >
            Forgot password?
          </Link>
        </div>
        <input
          type="password"
          name="password"
          className="p-4 mb-4 h-10 rounded"
        ></input>

        <div className="flex items-center">
          <input type="checkbox" className="mr-2 h-6 w-6 rounded-lg" />
          <h4 className="inline">Remember my login</h4>
        </div>

        <div className="flex justify-end">
          <button type="submit" className="w-28 h-12 bg-blue-400 font-bold">
            Log In
          </button>
        </div>
      </div>
      <div className="w-full max-w-[28rem] p-2 flex flex-col gap-2">
        <h1 className="mb-4 text-3xl font-semibold">Sign Up</h1>

        <hr className="border border-slate-300"></hr>

        <h3 className="font-semibold">
          New to Gift App? Sign up now to start finding perfect gifts for your
          loved ones!
        </h3>

        <div className="flex justify-end">
          <Link
            href="/signup"
            className="w-28 h-12 bg-blue-400 font-bold flex items-center justify-center"
          >
            Join Now
          </Link>
        </div>
      </div>
    </form>
  );
}
