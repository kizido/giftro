import React, { useState, KeyboardEvent, ChangeEvent } from "react";

const TagsInput: React.FC = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  // Event handlers will be defined here
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === "," || e.key === " ") {
      e.preventDefault(); // Prevent the default to avoid submitting forms
      if (!inputValue.trim()) return; // Ignore empty input
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
    // Implement backspace logic if needed
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="relative bg-white h-24 w-3/4 border border-gray-300 rounded p-2 flex items-start flex-wrap overflow-y-scroll">
      {tags.map((tag, index) => (
        <span key={index} className="bg-gray-200 rounded px-2 py-1 text-sm m-1">
          {tag}
          <span
            onClick={() => setTags(tags.filter((_, i) => i !== index))}
            className="ml-2 cursor-pointer"
          >
            &times;
          </span>
        </span>
      ))}
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="flex-1 min-w-[100px] outline-none p-1"
        placeholder={tags.length === 0 ? "Enter hobbies..." : ""}
      />
    </div>
  );
};

export default TagsInput;
