import type { InputHTMLAttributes, FC } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Input: FC<Props> = ({ className, ...props }) => {
  return <input {...props} className={className ?? "w-full bg-gray-700 p-4 mb-4"} />;
};

export default Input;
