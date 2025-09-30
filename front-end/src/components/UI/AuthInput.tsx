import React, { type FC } from "react";

interface IAuthInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  name: string;
  type: string;
}

const AuthInput: FC<IAuthInputProps> = ({
  value,
  onChange,
  placeholder,
  name,
  type,
}) => {
  return (
    <input
      className="w-full outline-0 rounded-[8px] border border-gray-200 p-2"
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required
    />
  );
};

export default AuthInput;
