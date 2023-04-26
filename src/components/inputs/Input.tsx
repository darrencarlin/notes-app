import type { InputHTMLAttributes, FC } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  className?: string;
}

const Input: FC<Props> = ({ label, className, ...props }) => {
  return (
    <>
      <label className="sr-only">{label}</label>
      <input {...props} className={className ?? "w-full bg-gray-700 p-4 mb-4"} />
    </>
  );
};

export default Input;
