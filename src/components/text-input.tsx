import clsx from "clsx";
import { Eye, EyeOff } from "lucide-react";
import { useState, type ChangeEvent, type FC, type ReactNode } from "react";
import { useFormContext, type RegisterOptions } from "react-hook-form";

interface TextInputProps {
  label?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  name?: string;
  classTextInput?: string;
  classInput?: string;
  prefixIcon?: ReactNode;
  isFull?: boolean;
  rules?: RegisterOptions;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const TextInput: FC<TextInputProps> = (request) => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const fieldError = errors[request.name ?? ""]?.message as string | undefined;

  return (
    <div
      className={clsx(
        "flex flex-col items-start gap-1",
        request.isFull && "w-full",
        request.classTextInput
      )}
    >
      {request.label && (
        <label className="text-sm font-medium">{request.label}</label>
      )}
      <div className="relative w-full">
        <input
          type={
            request.type === "password"
              ? showPassword
                ? "text"
                : "password"
              : request.type
          }
          placeholder={request.placeholder}
          defaultValue={request.value}
          {...(request.name ? register(request.name, request.rules) : {})}
          className={clsx(
            "rounded-md border px-2 py-2 border-primary",
            fieldError ? "border-red-500" : "border-gray-50",
            request.isFull && "w-full",
            request.classInput
          )}
          onChange={request.onChange}
        />
        {request.type === "password" && (
          <div
            className="absolute bg-transparent right-4 top-1/2 -translate-y-1/2 text-gray-500"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </div>
        )}
        {request.prefixIcon && (
          <div
            className="absolute bg-transparent right-4 top-1/2 -translate-y-1/2 text-gray-500"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {/* {showPassword ? <EyeOff size={18} /> : <Eye size={18} />} */}
            {request.prefixIcon}
          </div>
        )}
      </div>
      {fieldError && (
        <span className="flex justify-start text-xs font-bold text-red-500">
          {fieldError}
        </span>
      )}
    </div>
  );
};

export default TextInput;
