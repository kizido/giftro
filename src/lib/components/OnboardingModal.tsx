import React, { useEffect, useState } from "react";
import styles from "../../app/ui/modal.module.css";
import TagsInput from "./TagsInput";
import { useForm } from "react-hook-form";
import { TOnboardSurvey, onboardSurveySchema } from "../types";
import { zodResolver } from "@hookform/resolvers/zod";

type OnboardingModalProps = {
  onClose: () => void; // Define onClose as a function that doesn't return anything
};

export default function OnboardingModal({ onClose }: OnboardingModalProps) {
  const [onboardStep, setOnboardStep] = useState<number>(0);
  const FormPageTitles = ["Getting to know you...", "Interests"];

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    setError,
    trigger,
  } = useForm<TOnboardSurvey>({
    resolver: zodResolver(onboardSurveySchema),
  });

  const watchedHobbies = watch("hobbies") || [];

  const FormDisplay = () => {
    switch (onboardStep) {
      case 0:
        return (
          <form className="flex flex-col items-center">
            <label className="mb-2 text-xl">When is your birthday?</label>
            <div className="flex gap-2">
              <div>
                <label>Month</label>
                <input
                  className="block mb-4 w-14 h-8 px-2 text-center border-2 border-black"
                  placeholder="mm"
                  {...register("birthMonth")}
                />
              </div>
              <div>
                <label>Day</label>
                <input
                  className="block mb-4 w-10 h-8 px-2 text-center border-2 border-black"
                  placeholder="dd"
                  {...register("birthDay")}
                />
              </div>
              <div>
                <label>Year</label>
                <input
                  className="block mb-4 w-16 h-8 px-2 text-center border-2 border-black"
                  placeholder="yyyy"
                  {...register("birthYear")}
                />
              </div>
            </div>
            {(errors.birthDay || errors.birthMonth || errors.birthYear) && (
              <p className="text-red-600">Must be a real date</p>
            )}
          </form>
        );
        break;
      case 1:
        return (
          <form className="flex flex-col items-center">
            <label className="block pb-1 text-xl">
              What are your main hobbies?
            </label>
            {/* <textarea className="w-2/3 p-1 mb-4 resize-none leading-4" spellCheck={false} /> */}
            <TagsInput setValue={setValue} watchedTags={watchedHobbies} />
            {errors.hobbies && <p>{errors.hobbies.message}</p>}
          </form>
        );
        break;
      default:
        break;
    }
  };

  const handleNext = async () => {
    const validateCurrentStep = await trigger([
      "birthMonth",
      "birthDay",
      "birthYear",
    ]); // Include fields to validate for the current step
    if (validateCurrentStep) {
      setOnboardStep((curStep) => curStep + 1); // Move to next step only if validation passes
    }
    // Otherwise, errors are already set by react-hook-form and will be displayed
  };
  const onSubmit = async (data: TOnboardSurvey) => {
    const response = await fetch("/api/userData/onboarding", {
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
      const errors = responseData.errors;
      if (errors.birthMonth) {
        setError("birthMonth", {
          type: "server",
          message: errors.birthMonth,
        });
      } else if (errors.birthDay) {
        setError("birthDay", {
          type: "server",
          message: errors.birthDay,
        });
      } else if (errors.birthYear) {
        setError("birthYear", {
          type: "server",
          message: errors.birthYear,
        });
      } else if (errors.hobbies) {
        setError("hobbies", {
          type: "server",
          message: errors.hobbies,
        });
      } else {
        alert("Something went wrong!");
      }
    } else {
      // Set first time user to false (to avoid repeat surveys on every login)
      await fetch("/api/auth/firstTimeUser", {
        method: "POST",
        body: JSON.stringify({ is_first_time_user: false }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      // After first time user set to false, tell dashboard to re-check first time user value
      onClose();
    }
  };

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div>
          <div className="flex justify-center gap-4">
            <span className="inline-block rounded-full h-8 w-8 bg-slate-800"></span>
            <span
              className={`inline-block rounded-full h-8 w-8 ${
                onboardStep < 1 ? "bg-white" : "bg-slate-800"
              }`}
            ></span>
          </div>
          <h1 className="mt-4 text-2xl text-center font-bold">
            {FormPageTitles[onboardStep]}
          </h1>
        </div>

        {FormDisplay()}

        <div className="flex justify-center gap-4">
          <button
            className="px-4 py-2 bg-white font-semibold disabled:bg-gray-100"
            onClick={() => setOnboardStep((curStep) => curStep - 1)}
            disabled={onboardStep < 1}
          >
            Prev
          </button>
          {onboardStep < 1 ? (
            <button
              className="px-4 py-2 bg-white font-semibold disabled:bg-gray-100"
              onClick={handleNext}
              disabled={onboardStep > 0}
            >
              Next
            </button>
          ) : (
            <button
              className="px-4 py-2 bg-white font-semibold disabled:bg-gray-100"
              onClick={handleSubmit(onSubmit)}
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
