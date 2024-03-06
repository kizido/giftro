import React, { useState } from "react";
import styles from "../../app/ui/modal.module.css";
import TagsInput from "./TagsInput";
import { useForm } from "react-hook-form";

export type TOnboardSurvey = {
  birthMonth: string;
  birthDay: string;
  birthYear: string;
  hobbies: string[];
};

type OnboardingModalProps = {
  // isOpen: boolean;
  onClose: () => void; // Define onClose as a function that doesn't return anything
};

export default function OnboardingModal({
  // isOpen,
  onClose,
}: OnboardingModalProps) {
  // if (!isOpen) {
  //   return null;
  // }

  const [onboardStep, setOnboardStep] = useState<number>(0);
  const FormPageTitles = ["Getting to know you...", "Interests"];

  const { register, handleSubmit, setValue } = useForm<TOnboardSurvey>();

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
                  {...register("birthMonth", {
                    required: "Must input a birth month",
                  })}
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
            <TagsInput setValue={setValue} />
          </form>
        );
        break;
      default:
        break;
    }
  };

  const onSubmit = (data: TOnboardSurvey) => {
    const { birthMonth, birthDay, birthYear, hobbies } = data;
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
              onClick={() => setOnboardStep((curStep) => curStep + 1)}
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
        {/* {FormDisplay()} */}
      </div>
    </div>
  );
}
