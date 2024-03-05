import React, { useState, KeyboardEvent, ChangeEvent, useRef } from "react";

const TagsInput: React.FC = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  // Event handlers will be defined here
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === "," || e.key === " ") {
      e.preventDefault(); // Prevent the default to avoid submitting forms
      if (!inputValue.trim()) return; // Ignore empty input
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
    if (e.key === "Backspace" && inputValue === "" && tags.length > 0) {
      setTags(tags.slice(0, -1));
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div
      className="relative p-2 h-24 w-3/4 flex items-start flex-wrap bg-white overflow-y-scroll border border-gray-300 rounded cursor-text"
      onClick={() => inputRef.current?.focus()}
    >
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
        ref={inputRef}
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
