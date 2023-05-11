import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { EventType, EventStatus } from "@/utils/types";

interface SelectInputProps {
  value: EventStatus | EventType;
  setValue: (value: string) => void;
  id: string;
  isRequired?: boolean;
  label: string;
  dropdownOptions: string[];
}

export const SelectInput: React.FC<SelectInputProps> = ({
  isRequired,
  label,
  id,
  value,
  setValue,
  dropdownOptions,
}) => {
  const dropdownRef = useRef(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeOption, setActiveOption] = useState(value);

  // add event listener to close dropdown when clicked outside
  const handleClickOutside = (event: any) => {
    if (
      dropdownRef.current &&
      showDropdown &&
      !dropdownRef.current?.contains(event.target)
    ) {
      setShowDropdown(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);


  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div className={`flex space-x-1 ${isRequired ? "mb-2" : "mb-3"}`}>
        <label className="text-sm text-blue-100" htmlFor={id}>
          {label}
        </label>
        {isRequired && <span className="text-red-500">*</span>}
      </div>
      <button
        className={`w-full outline-none text-left outline-offset-0 border border-blue-600 py-4 px-5 rounded font-bold text-white bg-blue-700 flex items-center justify-between`}
        onClick={(e) => {
          e.preventDefault();
          setShowDropdown(!showDropdown);
        }}
        id={id}
      >
        <span>{activeOption}</span>
        <Image
          src="/images/icon-carat-down.svg"
          alt="down"
          width={16}
          height={16}
        />
      </button>

      {showDropdown && (
        <div
          className={`absolute z-10 top-24 overflow-hidden right-6 flex flex-col w-[240px] rounded-lg items-start bg-blue-600 transition-all duration-200 divide-y divide-blue-700`}
        >
          {dropdownOptions.map((option, index) => {
            return (
              <div
                className={`hover:text-blue-500 text-white transition-opacity cursor-pointer duration-100 ease-out font-bold text-lg w-full text-left py-4 px-6
              ${showDropdown ? "opacity-100" : "opacity-0"}`}
                key={index}
                onClick={() => {
                  setActiveOption(option);
                  setShowDropdown(false);
                  setValue(option);
                }}
              >
                {option}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
