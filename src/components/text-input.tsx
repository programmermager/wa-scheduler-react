import clsx from "clsx";
import type { ChangeEvent, FC } from "react";

interface TextInputProps {
  label?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  name?: string;
  className?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const TextInput: FC<TextInputProps> = ({
  label,
  type = "text",
  placeholder,
  value,
  name,
  className,
  onChange,
}) => {
  return (
    <div className="flex flex-col items-start gap-1 w-full">
      {label && <label className="text-sm font-medium">{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={onChange}
        className={clsx(
          "rounded-md border border-gray-50 px-2 py-2",
          className
        )}
      />
    </div>
  );
};

export default TextInput;
