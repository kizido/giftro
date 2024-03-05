import React, { useState } from "react";
import styles from "../../app/ui/modal.module.css";

type OnboardingModalProps = {
  isOpen: boolean;
  onClose: () => void; // Define onClose as a function that doesn't return anything
  // children: React.ReactNode; // React.ReactNode covers anything that is renderable
};

export default function OnboardingModal({
  isOpen,
  onClose,
}: // children,
OnboardingModalProps) {
  if (!isOpen) {
    return null;
  }

  const [onboardStep, setOnboardStep] = useState<number>(0);
  const FormPageTitles = ["Getting to know you...", "Interests"];

  const [hobbies, setHobbies] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === " " || event.key === ",") {
      event.preventDefault(); // Prevent default to avoid space or comma being added
      const newHobby = inputValue.trim();

      if (newHobby && !hobbies.includes(newHobby)) {
        setHobbies([...hobbies, newHobby]);
        setInputValue("");
      }
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const removeHobby = (index: number) => {
    setHobbies(hobbies.filter((_, i) => i !== index));
  };

  const FormDisplay = () => {
    switch (onboardStep) {
      case 0:
        return (
          <form className="flex flex-col items-center">
            <label className="mb-2 text-xl">When is your birthday?</label>
            <div className="flex gap-2">
              <div>
                <label>Month</label>
                <input className="block mb-4 w-12 h-8 px-2 text-center border-2 border-black" placeholder="mm"/>
              </div>
              <div>
                <label>Day</label>
                <input className="block mb-4 w-10 h-8 px-2 text-center border-2 border-black" placeholder="dd"/>
              </div>
              <div>
                <label>Year</label>
                <input className="block mb-4 w-16 h-8 px-2 text-center border-2 border-black" placeholder="yyyy"/>
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
            <div>
              <div className="flex flex-wrap gap-2 p-2">
                {hobbies.map((hobby, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    {hobby}
                    <button
                      onClick={() => removeHobby(index)}
                      className="bg-red-500 rounded-full px-1"
                    >
                      x
                    </button>
                  </div>
                ))}
              </div>
              <input
                type="text"
                value={inputValue}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                className="border-2 border-gray-300 rounded p-2"
                placeholder="Enter hobbies"
              />
            </div>
          </form>
        );
        break;
      default:
        break;
    }
  };

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div>
          <div className="flex justify-center gap-4">
            <span className="inline-block rounded-full h-8 w-8 bg-cyan-300"></span>
            <span
              className={`inline-block rounded-full h-8 w-8 ${
                onboardStep < 1 ? "bg-white" : "bg-cyan-300"
              }`}
            ></span>
            {/* <span
              className={`inline-block rounded-full h-8 w-8 ${
                onboardStep < 2 ? "bg-white" : "bg-cyan-300"
              }`}
            ></span> */}
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
              onClick={() => console.log("Survey submitted")}
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
