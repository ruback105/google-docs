import React from "react";

export type InputProps = {
  type: string;
  placeholder: string;
  value: string | number;
  onChange: any;
  onKeyDown?: () => void;
};

const Input: React.FC<InputProps> = ({
  type,
  placeholder,
  value,
  onChange,
  onKeyDown,
}) => {
  return (
    <input
      className="w-full outline-none"
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(e) => {
        e.key === "Enter" && onKeyDown;
      }}
    />
  );
};

export default Input;
