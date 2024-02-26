"use client";
import { TSignUpSchema, loginSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";

export default function Form() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<TSignUpSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: TSignUpSchema) => {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseData = await response.json();
    if (!response.ok) {
      alert("Server validation error occurred!");
      return;
    } else if (responseData.errors) {
      console.log("VALIDATION ERRORS");
      const errors = responseData.errors;
      if (errors.email) {
        setError("email", {
          type: "server",
          message: errors.email,
        });
      } else if (errors.password) {
        setError("password", {
          type: "server",
          message: errors.password,
        });
      } else {
        alert("Something went wrong!");
      }
    } else {
      router.push("/login");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex justify-center"
    >
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
        <input
          {...register("email")}
          type="email"
          className="h-10 p-4 rounded"
        />
        {errors.email && (
          <p className="text-red-600">{`${errors.email.message}`}</p>
        )}

        <div className="flex justify-between items-center">
          <h3 className="text-lg">Password</h3>
          <h4 className="cursor-pointer hover:underline text-sm text-teal-300">
            Show password
          </h4>
        </div>
        <input
          {...register("password")}
          type="password"
          className="mb-4 p-4 h-10 rounded"
        />
        {errors.password && (
          <p className="text-red-600">{`${errors.password.message}`}</p>
        )}

        <div className="flex justify-end">
          <button type="submit" className="w-28 h-12 bg-blue-400 font-bold">
            Join Now
          </button>
        </div>
      </div>
    </form>
  );
}
