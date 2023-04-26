import type { FC, TextareaHTMLAttributes } from "react";
import classNames from "classnames";

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  height?: boolean;
}

const TextArea: FC<Props> = ({ label, height = false, ...props }) => {
  const classnames = classNames(
    {
      "h-96": height,
    },
    "w-full bg-gray-700 p-4 mb-4 resize-none"
  );

  return (
    <>
      <label className="sr-only">{label}</label>
      <textarea {...props} className={classnames} />
    </>
  );
};

export default TextArea;
