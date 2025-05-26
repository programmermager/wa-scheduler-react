import clsx from "clsx";
import type { FC } from "react";
import LoadingCircular from "./loading-circular";

interface ButtonProps {
  color?: string;
  text?: string;
  className?: string;
  isLoading?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

const Button: FC<ButtonProps> = ({
  color = "bg-green-700",
  text,
  isLoading,
  className,
  type = "button",
  onClick = () => {},
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={clsx(
        "rounded-lg border-none text-white min-w-fit",
        color,
        className
      )}
    >
      {isLoading ? <LoadingCircular /> : text}
    </button>
  );
};

export default Button;
