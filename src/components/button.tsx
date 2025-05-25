import clsx from "clsx";
import type { FC } from "react";
import LoadingCircular from "./loading-circular";

interface ButtonProps {
  color?: string;
  text?: string;
  className?: string;
  isLoading?: boolean;
  type?: "button" | "submit" | "reset";
}

const Button: FC<ButtonProps> = ({
  color = "bg-green-700",
  text,
  isLoading,
  className,
  type = "button",
}) => {
  return (
    <button type={type} className={clsx("rounded-lg border-none text-white", color, className)}>
        {isLoading ? <LoadingCircular /> : text}
      </button>
  );
};

export default Button;
