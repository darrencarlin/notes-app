import type { InputHTMLAttributes, FC } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

const Input: FC<Props> = ({ ...props }) => {
  return <input {...props} className="w-full bg-gray-700 p-4 mb-4" />;
};

export default Input;
