import React from "react";

interface ToggleSwitchProps {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ id, checked, onChange }) => {
  return (
    <div className="relative inline-block w-12 h-6 align-middle select-none transition duration-200 ease-in">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="absolute opacity-0 w-0 h-0"
      />
      <label
        htmlFor={id}
        className={`block cursor-pointer bg-gray-300 h-6 w-12 rounded-full transition-colors duration-200 ease-in ${
          checked ? "bg-green-500" : "bg-gray-300"
        }`}
      >
        <span
          className={`absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition-transform duration-200 ease-in ${
            checked ? "translate-x-6" : "translate-x-0"
          }`}
        ></span>
      </label>
    </div>
  );
};

export default ToggleSwitch;
